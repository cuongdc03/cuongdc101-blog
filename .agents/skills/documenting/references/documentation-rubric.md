# Documentation Quality Rubric & Verification Checklist

Use this rubric before finalizing or publishing any documentation to guarantee adherence to the **Documenting Skill** guidelines.

---

## 1. The 4-Phase Narrative Audit

| Phase | Requirement | Pass Criteria | Status |
| :--- | :--- | :--- | :---: |
| **Phase 1: The Problem** | Explicit friction point stated in opening paragraphs. | Direct opening without throat-clearing. Reader knows what breaks within 30 seconds. Uses natural heading (e.g. `## The Embedding Dilemma`), NOT `## 1. Problem & Scope`. | [ ] |
| **Phase 2: The Status Quo** | Explains why conventional workarounds fail. | Covers why existing workarounds (naive code, basic configs, manual steps) fail under production stress or edge cases. Natural heading. | [ ] |
| **Phase 3: The Implementation** | Complete, copy-pasteable, production-ready solution. | No placeholder pseudo-code (`// TODO: write logic`). Accompanied by a visual diagram. Natural heading. | [ ] |
| **Phase 4: The Verification** | Reader-side validation with expected output. | Commands that the reader can execute from their terminal/browser, accompanied by the exact expected stdout/HTTP response. | [ ] |

---

## 2. Clean Editorial Structure & Reading Time (< 5 Minutes)

- [ ] **No Duplicate H1**: Markdown body does NOT begin with `# Title` (the layout already renders `{title}` as H1).
- [ ] **No Redundant Metadata Callouts**: No manual `> ⏱️ Read time: ... > 🎯 Goal: ...` blockquotes in the body (reading time, date, and description are rendered by layout).
- [ ] **Narrative Headings**: All headings are topic-specific and conversational (never literal names like `Phase 1`, `Phase 2`).
- [ ] **Word Count Check**: Document is between **500 and 800 words** (excluding large raw code blocks).
- [ ] **Single Focus**: Focuses on resolving **one specific problem**. Does not sprawl across unrelated architectural topics.

---

## 3. Visuals & Diagrams Check

- [ ] **Diagram Present**: Contains at least one clear visual element:
  - Mermaid flowchart for logic / decision trees
  - Mermaid sequence diagram for request lifecycles / protocol exchanges
  - Mermaid architecture diagram for service / component topology
  - Structured ASCII representation for memory / protocol framing
- [ ] **Valid Mermaid Syntax**: Fenced with ` ```mermaid `, labels with special characters (brackets/parentheses) properly quoted.
- [ ] **Render Verified**: Diagram successfully renders into an interactive SVG (not raw code text) in both light and dark themes.
- [ ] **Complexity Capped**: Diagram has between 3 and 7 entities/steps for rapid mental comprehension.

---

## 4. Thumbnail & Social Preview Check (Mandatory)

- [ ] **Hero Image Generated**: Generated 16:9 thumbnail via `generate_image` or custom asset.
- [ ] **Public Asset Saved**: Saved in `public/images/<topic-slug>.jpg` (or `.png`).
- [ ] **Frontmatter Configured**: `heroImage: "/images/<topic-slug>.jpg"` is set in frontmatter.
- [ ] **Visual Style**: Clean technical editorial / graphic novel line art or architectural schema, high contrast, readable in both light and dark modes.

---

## 5. Multi-Part Splitting Audit (If Topic > 5 Minutes)

If the topic could not fit within 5 minutes of cognitive load:

- [ ] **Self-Contained Parts**: Each part has its own working milestone and Phase 4 reader verification.
- [ ] **Top Breadcrumb Navigation**:
  - `Part X of Y` indicator.
  - Active links to Previous Part (if X > 1) and Next Part (if X < Y).
- [ ] **Bottom Transition Hook**: Explicit explanation of what problem Part X+1 solves.
- [ ] **Series Index Table**: Included at the bottom mapping the entire journey.
