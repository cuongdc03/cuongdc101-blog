---
title: "Welcome to My Learning Journey: Why I Learn in Public"
description: "Why I decided to document every step of my software engineering path, the power of digital gardens, and what to expect from this site."
pubDate: "2026-09-01"
tags: ["meta", "career", "productivity"]
draft: false
---

Welcome to my personal corner of the web! 

For a long time, I took notes in private note-taking tools, fragmented markdown files, and scratchpads across multiple machines. But private notes often suffer from a common trap: they rarely get polished, they get forgotten, and they never get challenged or refined.

This blog is my commitment to **learning in public**.

## Why Learn in Public?

> "The best way to understand something is to explain it simply to someone else." — Richard Feynman

When you write notes solely for yourself, it is easy to gloss over edge cases or assume you understand something when you only understand the surface. When you structure your learning into tutorials and guides, three things happen:

1. **Active synthesis**: You are forced to connect the dots and eliminate fuzzy assumptions.
2. **Searchable second brain**: Instead of re-Googling the same tricky bug or architecture pattern six months later, you have your own vetted reference.
3. **Structured Roadmaps**: Rather than learning haphazardly, organizing my learnings into **Learning Paths & Series** keeps me accountable to master topics end-to-end.

## What You'll Find Here

On this blog, you will see content organized in two distinct ways:

- **Standalone Articles & TILs**: Focused deep dives into specific issues, developer productivity, or practical engineering experiments.
- **Curated Learning Paths**: Multi-part series designed to be read sequentially. For instance, my deep dives into container internals, distributed systems, and performance tuning.

```ts
// The learning loop
interface LearningJourney {
  explore: () => Promise<Concept>;
  build: (concept: Concept) => Promise<WorkingPrototype>;
  document: (experience: WorkingPrototype) => void;
  refine: () => void;
}
```

Stay tuned, explore the [Learning Paths](/series), and feel free to connect!
