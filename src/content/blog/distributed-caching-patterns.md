---
title: "Distributed Caching Patterns: Cache-Aside vs Write-Through"
description: "Deep dive into caching topologies, handling the thundering herd problem, cache invalidation strategies, and Redis data structures."
pubDate: "2026-09-02"
heroImage: "/images/distributed-caching.jpg"
tags: ["system-design", "architecture", "redis", "database"]
draft: false
---

There are only two hard things in Computer Science: cache invalidation and naming things.

Caching is the primary weapon in high-throughput architectures to reduce database read load and slash response latency from 50ms down to sub-millisecond territory. But choosing the wrong caching topology introduces silent data inconsistency and catastrophic stampedes.

## 1. The Cache-Aside Pattern (Lazy Loading)

In Cache-Aside, the application is responsible for coordinating reads and writes between the cache and storage.

```
       1. Read Cache
App ───────────────────> Cache (Redis)
 │                         │
 │ 2. Cache Miss           │
 ▼                         │
Database ──────────────────┘
       3. Populate Cache
```

### Read Flow:
1. App requests data from Redis.
2. If hit, return immediately.
3. If miss, fetch from primary database, write back into Redis with TTL, and return.

### Code Implementation

```typescript
async function getUserProfile(userId: string): Promise<UserProfile> {
  const cacheKey = `user:${userId}:profile`;
  
  // 1. Try cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // 2. Fetch from DB on miss
  const user = await db.users.findUnique({ where: { id: userId } });
  if (!user) throw new NotFoundError("User not found");

  // 3. Populate cache with 15-minute TTL
  await redis.setex(cacheKey, 900, JSON.stringify(user));
  
  return user;
}
```

## 2. Preventing Cache Stampede (Thundering Herd)

When a hot cache key expires while thousands of concurrent requests arrive simultaneously, all incoming requests miss the cache and slam the database simultaneously.

### Solution: Mutual Exclusion Lock (Mutex)

Only the first request acquires a distributed lock to refresh the cache; all other requests wait or receive a stale copy for a brief grace period:

```typescript
const lockAcquired = await redis.set(`lock:${cacheKey}`, "1", "NX", "EX", 5);
if (lockAcquired) {
  try {
    const data = await fetchFromDB();
    await redis.setex(cacheKey, TTL, JSON.stringify(data));
  } finally {
    await redis.del(`lock:${cacheKey}`);
  }
} else {
  // Wait briefly or return graceful stale fallback
  await sleep(50);
  return getCachedValue(cacheKey);
}
```

In our next writeup, we will examine **Write-Behind (Write-Back) Caching** and how to maintain eventual consistency across read replicas.
