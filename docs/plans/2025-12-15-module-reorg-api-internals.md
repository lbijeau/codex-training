# Module Reorder: Move API Internals to Advanced Section Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reorder modules so CLI-first topics lead, and API internals/customization move to later modules, updating all references and navigation accordingly.

**Architecture:** Rename/renumber module files and directory names to the new order, adjust front-matter titles, and update all cross-links (README, GETTING_STARTED, PROGRESS, exercises, diagrams, playbooks). Validate via search to ensure no stale module numbers remain.

**Tech Stack:** Markdown docs, shell/git tooling, `rg` for search/replace.

---

### Task 1: Map current modules and plan renames
**Files:**
- Read: `docs/modules/`
- Read: `README.md`, `GETTING_STARTED.md`, `PROGRESS.md`

**Steps:**
1. List existing modules (`ls docs/modules`) and note filenames and headings.
2. Build old→new mapping: introduce `01-getting-started` (new), shift speed/quality/planning/domain/collaboration/integration, and move internals/customization to `08-api-internals`, `09-api-customization`.
3. Decide whether to retain legacy aliases (optional symlinks or stub files) to avoid broken links; document decision in plan notes.
4. Record the mapping inside this plan (for later reference).

**Verification:** Mapping documented in plan and agreed before edits.

**Old → New Mapping (proposed)**
- New 01: `docs/modules/01-getting-started.md` (new stub; CLI basics + hands-on training links)
- Old 03-skills → New 02: `docs/modules/02-skills.md` (Skills & Reusable Workflows)
- Old 04-speed → New 03: `docs/modules/03-speed.md` (Speed & Efficiency Patterns)
- Old 05-quality → New 04: `docs/modules/04-quality.md` (Quality & Verification)
- Old 06-planning → New 05: `docs/modules/05-planning.md` (Planning & Execution)
- Old 07-domain → New 06: `docs/modules/06-domain.md` (Domain-Specific Patterns)
- Old 08-integration → New 07: `docs/modules/07-integration.md` (Advanced Integration)
- Old 01-internals → New 08: `docs/modules/08-api-internals.md` (Codex Code Internals; API-focused)
- Old 02-customization → New 09: `docs/modules/09-api-customization.md` (Customization & Extensions; API-focused)

**Stub/alias decision:** Default is no legacy stubs; instead, update all references. If any external links are discovered, add short “moved” stubs at the old paths.

### Task 2: Rename/retitle modules to new order
**Files:**
- Rename/modify: `docs/modules/NN-*.md` files according to mapping

**Steps:**
1. For each module file, rename to the new NN prefix and adjust top-level heading to match new numbering/title (e.g., `# Module 8: Advanced Integration` → `# Module 7: Advanced Integration`).
2. If adding `01-getting-started.md`, scaffold minimal content pointing to CLI basics/hands-on training (can be a short stub for now).
3. Update any intra-module self-references to the new module number/name.

**Verification:** Open each renamed file and confirm heading and filename align; `rg "Module [0-9]" docs/modules` shows only new numbering.

### Task 3: Update navigation and checklists
**Files:**
- Modify: `README.md`
- Modify: `GETTING_STARTED.md`
- Modify: `PROGRESS.md`
- Modify: `docs/exercises/**/README.md` (module navigation)
- Modify: `docs/examples/session-drive.md` (if module numbers referenced)

**Steps:**
1. Update module list order/links in README and GETTING_STARTED to reflect new numbering and titles.
2. Update module checklist in PROGRESS to the new order; carry over completion states if present.
3. Update any “What’s next”/navigation in exercises that reference module numbers.

**Verification:** `rg "Module [0-9]" README.md GETTING_STARTED.md PROGRESS.md docs/exercises` matches only new order; manual spot-check links render correctly.

### Task 4: Update diagrams and prompt/pattern references
**Files:**
- Modify: `README.md` mermaid diagram (if module nodes exist)
- Modify: any diagrams in `docs/modules/` that encode module numbers
- Modify: `docs/patterns/**`, `docs/playbook/**`, `docs/templates/**` if they reference module numbers

**Steps:**
1. Update mermaid diagrams to use new module numbering/labels.
2. Search in patterns/playbook/templates for module references and adjust.
3. Re-render any stored diagram images if needed (or note to regenerate).

**Verification:** `rg "Module [0-9]" docs/patterns docs/playbook docs/templates README.md` shows updated references; mermaid blocks reflect new numbering.

### Task 5: Clean up redirects/alias handling (optional safety)
**Files:**
- Optional stubs: `docs/modules/01-internals.md`, `docs/modules/02-customization.md` (if renamed), or redirect notes

**Steps:**
1. Decide whether to leave short “moved” notices in old paths (if kept) that point to the new module numbers.
2. If not keeping stubs, ensure no inbound links remain (search repo).

**Verification:** `rg "01-internals|02-customization" -g'*.md'` shows only intentional stubs or zero results.

### Task 6: Final validation and summary
**Files:**
- All touched above

**Steps:**
1. Run a global search for old module numbers/titles to confirm absence of stale references.
2. Preview README/GETTING_STARTED to ensure navigation flows logically.
3. Summarize changes and decisions in a short note (add to PROGRESS or commit message prep).

**Verification:** `rg "Module 0[12]" docs README.md GETTING_STARTED.md` returns nothing (unless intentional stubs); manual skim of README index looks consistent.

---

## Next Actions
- After plan approval, execute tasks using superpowers:executing-plans, committing after logical groups (e.g., renames + navigation updates).
- If stubs are added for legacy paths, note them in the commit message.
