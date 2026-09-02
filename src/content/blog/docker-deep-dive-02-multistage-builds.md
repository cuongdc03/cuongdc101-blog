---
title: "Production Dockerfiles: Multi-Stage Magic & Security Best Practices"
description: "How to shrink container images from 1.2GB down to 35MB, implement non-root users, and leverage cache mounts for 10x faster CI builds."
pubDate: "2026-09-03"
tags: ["docker", "devops", "security", "containers"]
series:
  id: "docker-containers"
  order: 2
  title: "Docker & Containerization Deep Dive"
draft: false
---

In Chapter 1, we explored how containers isolate processes using Linux namespaces and cgroups. Now let's turn our attention to building lean, secure, and lightning-fast images for production.

A bloated image doesn't just waste disk space:
- **Deployment latency**: Pushing and pulling 1.5GB across nodes takes precious minutes during auto-scaling.
- **Attack surface**: Every unnecessary package (compilers, build tools, package managers) in your production image is a potential vulnerability.

## The Problem: The Naive Single-Stage Dockerfile

Consider this typical Node.js or Go application build:

```dockerfile
# ❌ Anti-pattern: Everything in one stage
FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]
```

This resulting image contains Node source files, dev dependencies, `npm` cache, git history, and build toolchains. Size: **~1.1 GB**.

## The Solution: Multi-Stage Builds

With multi-stage builds, you use one stage for compiling your code, and copy **only the final compiled artifact** into a minimal runtime base.

```dockerfile
# -------------------------------------------------------------
# Stage 1: Build & Compile
# -------------------------------------------------------------
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build && npm prune --production

# -------------------------------------------------------------
# Stage 2: Minimal Distroless / Alpine Runtime
# -------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app

# Run as non-privileged user for security
USER node

# Copy only production dependencies and compiled build
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/index.js"]
```

### The Result:
- **Image Size**: Reduced from **1.1 GB** down to **128 MB** (or under **45 MB** if using Go or Rust with `scratch`/distroless).
- **Security**: No compiler tools in production, and process runs under non-root `node` UID.

## Speed Up CI with BuildKit Cache Mounts

Did you know you can cache your package manager downloads between builds even if `package.json` changes?

```dockerfile
# Cache npm cache directory across builds
RUN --mount=type=cache,target=/root/.npm \
    npm ci
```

This simple trick cuts CI Docker build times from 3 minutes down to 15 seconds.
