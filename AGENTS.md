# Agent Guidelines & Development Rules

This document outlines the mandatory operational workflows, architectural principles, and coding standards for all AI agents working on this codebase.

---

## 1. Git Workflow & Branching Rules (Mandatory)

Every agent must follow this branch-and-PR lifecycle without exception:

1. **Always Branch from `main`**:
   - Before starting any new feature, bugfix, or content addition, ensure local `main` is up-to-date:
     ```bash
     git checkout main
     git pull origin main
     ```
   - Create a dedicated, descriptive feature branch:
     ```bash
     git checkout -b feat/<descriptive-name>    # For features or new content
     git checkout -b fix/<descriptive-name>     # For bug fixes
     git checkout -b docs/<descriptive-name>    # For documentation
     ```
2. **Never Commit Directly to `main`**:
   - `main` is protected production code. Direct commits or unreviewed pushes to `main` are strictly forbidden.
3. **Pull Request Protocol**:
   - After completing the implementation and passing all verifications (`npm run build`, `pnpm check`), push your feature branch and open a Pull Request against `main`.
   - Include a concise PR summary:
     - **Problem Solved**: What friction or feature this addresses.
     - **Changes Made**: High-level bullet points of modified/created files.
     - **Verification**: Exact commands run and proof of validation.
   - **Wait for Review**: Cuong will review and approve the PR before merging into `main`.

---

## 2. Clean Architecture & Dependency Injection (DI)

Design systems and components with clear boundaries, modularity, and testability:

1. **Separation of Concerns**:
   - **Presentation Layer** (`src/pages/`, `src/components/`, `src/layouts/`): Responsible purely for rendering UI and layout. Free of heavy business algorithms or raw data access.
   - **Domain / Business Logic**: Pure, framework-agnostic TypeScript functions and classes that encapsulate rules and algorithms.
   - **Data Access / Integration Layer**: Handles external APIs, search indexes, content loaders, or persistence.
2. **Dependency Injection (DI)**:
   - Always inject dependencies (clients, database connectors, embedders, storage providers) as constructor arguments or function parameters rather than hardcoding global singletons.
   - *Example*:
     ```typescript
     // ✅ Good: Dependency injected via interface
     export class ParentDocumentRetriever {
       constructor(
         private readonly vectorStore: VectorStore,
         private readonly docStore: DocStore,
         private readonly embedder: (text: string) => Promise<number[]>
       ) {}
     }
     
     // ❌ Bad: Hardcoded global dependencies inside methods
     export class ParentDocumentRetriever {
       async retrieve() {
         const client = new RedisGlobalSingleton(); // Tight coupling!
       }
     }
     ```
3. **Explicit Interfaces**:
   - Program to interfaces, not implementations. Define TypeScript interfaces for contracts to enable mockability in unit tests.

---

## 3. KISS, DRY & Human Readability

Write code that a human engineer will enjoy reading, debugging, and maintaining:

1. **KISS (Keep It Simple, Stupid)**:
   - Favor straightforward, readable code over clever one-liners or premature abstractions.
   - Avoid adding unnecessary configuration layers, indirection, or libraries when standard language primitives suffice.
2. **DRY (Don't Repeat Yourself)**:
   - Consolidate common utility functions and duplicated logic into shared, well-tested helper modules.
   - *Rule of Three*: Do not prematurely abstract code on the first duplication. Wait until a pattern repeats three times to extract an abstraction.
3. **Human Readability as a First-Class Citizen**:
   - **Intention-Revealing Naming**: Use clear, descriptive names for variables, functions, and files (e.g., `renderMermaidDiagrams()` instead of `doRender()`; `unrenderedElements` instead of `els`).
   - **Document the "Why", Not the "What"**: Comments should explain non-obvious constraints, architectural rationales, or browser/engine quirks (e.g., why `@vite-ignore` is used for standalone ESM bundles), not restate syntax.
   - **Small, Focused Functions**: Each function should perform a single logical task and stay under 30-50 lines where practical.

---

## 4. Content & Technical Documentation Standards

When authoring blog posts or technical documentation, agents must follow the workspace's **Documenting Skill** (`.agents/skills/documenting/SKILL.md`):

1. **The 4-Phase Narrative Arc**:
   - **Phase 1: The Problem**: Hook the reader immediately with the exact friction point and tangible outcome.
   - **Phase 2: The Status Quo**: Explain why naive/conventional workarounds fail under production conditions.
   - **Phase 3: The Implementation**: Deliver concrete, production-ready code accompanied by a **visual diagram** (Mermaid sequence, architecture, or flowchart).
   - **Phase 4: The Verification**: Provide executable reader-side test commands with expected outputs.
2. **Anti-Slop Rules**:
   - **Narrative Headings**: Use technical, domain-relevant titles (e.g., `## Why Sliding-Window Overlap Breaks Down`), NEVER literal headings like `## 1. Problem & Scope`.
   - **No Duplicate Titles or Metadata Callouts**: Never repeat `# Title` in markdown (handled by layout). Never add manual `> ⏱️ Read time ...` quote blocks (handled by layout).
3. **Thumbnails (Mandatory)**:
   - Generate a 16:9 technical editorial line-art thumbnail via `generate_image`.
   - Save to `public/images/<slug>.jpg` and link in frontmatter via `heroImage: "/images/<slug>.jpg"`.
4. **Under 5-Minute Read Time**:
   - Keep content between 500–800 words.
   - If a topic requires > 5 minutes, split into a multi-part series with bidirectional navigation breadcrumbs.
