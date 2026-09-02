# Cuong's Learning Journey Blog 🚀

A modern, lightning-fast personal learning blog and digital garden built with **Astro 5**, **Tailwind CSS**, and **TypeScript**.

Engineered specifically for developers who learn in public, featuring both **standalone articles** and **curated learning paths / series** with chapter-by-chapter progression.

---

## 🌟 Key Features

- ⚡ **Ultra-fast & Zero Client JS Default**: Built on Astro 5 SSG with sub-second page loads and 100 Lighthouse scores.
- 🗺️ **Learning Paths & Series**: Group posts into structured curricula (`/series`) with chapter navigation, syllabus overview, and progress indicators.
- 🎨 **Light / Dark Mode**: Seamless toggle with zero Flash of Unstyled Theme (FOUC) and persistent local storage.
- 🔍 **Instant Search**: Client-side fuzzy search dialog (`⌘K` or `/` shortcut) indexing titles, tags, and descriptions.
- 📝 **Type-safe Markdown / MDX**: Strict schema validation using Astro's Content Collections (`src/content.config.ts`).
- 💻 **Syntax Highlighting**: Shiki code themes with language badges and one-click copy buttons.
- 📑 **Sticky Table of Contents**: Automatically generated from H2/H3 headings with scroll-spy highlight.
- 🏷️ **Taxonomy & Tags**: Browse posts by technical categories (`/tags`).
- 📡 **Syndication**: Auto-generated RSS feed (`/rss.xml`) and sitemap (`/sitemap-index.xml`).

---

## 🛠️ Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Start local development server
pnpm dev
# -> http://localhost:4321

# 3. Type-check content and components
pnpm check

# 4. Build for production
pnpm build

# 5. Preview production build
pnpm preview
```

---

## ✍️ How to Publish Content

### 1. Adding a Standalone Blog Post

Create a new `.md` or `.mdx` file in `src/content/blog/`:

```markdown
---
title: "Solving the N+1 Query Problem in PostgreSQL"
description: "How to identify N+1 query patterns using EXPLAIN ANALYZE and resolve them with batching."
pubDate: "2026-09-10"
tags: ["database", "postgres", "performance"]
draft: false
---

Your content in standard Markdown or MDX here...
```

### 2. Adding a Chapter to an Existing Series

Include the `series` object in the frontmatter matching the series ID:

```markdown
---
title: "Chapter 3: Production Container Networking"
description: "Understanding bridge networks, overlay networks, and port forwarding."
pubDate: "2026-09-15"
tags: ["docker", "networking", "devops"]
series:
  id: "docker-containers"
  order: 3
  title: "Docker & Containerization Deep Dive"
draft: false
---

Chapter content goes here...
```

The blog will automatically:
- Add this post to the syllabus on the track page (`/series/docker-containers`).
- Generate Previous/Next navigation links linking Chapter 2 and Chapter 3.
- Display the series banner on the post page.

### 3. Creating a New Learning Track

Create a new JSON file in `src/content/series/<track-id>.json`:

```json
{
  "title": "Kubernetes from Ground Up",
  "description": "Mastering Pods, ReplicaSets, Services, Ingress, and Helm for production workloads.",
  "icon": "Layers",
  "level": "Intermediate",
  "estimatedHours": "8 hours",
  "order": 3
}
```

Then start creating posts in `src/content/blog/` setting `series.id: "kubernetes-ground-up"`.

---

## 🚀 Deployment

### GitHub Pages (Recommended)

1. Push your repository to GitHub (`https://github.com/cuongdc101/cuongdc101-blog`).
2. In your repo settings, go to **Settings > Pages > Build and deployment > Source** and select **GitHub Actions**.
3. Create `.github/workflows/deploy.yml` with Astro's standard deployment action.

### Vercel / Cloudflare Pages

Simply connect your GitHub repo to Vercel or Cloudflare Pages. Astro is detected automatically with zero configuration needed.
