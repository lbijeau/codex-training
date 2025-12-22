# AGENTS.md Location Consistency Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Standardize AGENTS.md location guidance across module and exercise docs to eliminate conflicting paths.

**Architecture:** Documentation-only changes in `docs/modules/09-api-customization.md` and `docs/exercises/02-skills/*`. Work proceeds by inventorying all location references, selecting a canonical wording, and updating all occurrences to match. Validation uses the existing unit test suite.

**Tech Stack:** Markdown, Python (unittest runner).

### Task 1: Inventory AGENTS.md location references

**Files:**
- Modify: `docs/modules/09-api-customization.md`
- Modify: `docs/exercises/02-skills/exercise-1.md`
- Modify: `docs/exercises/02-skills/README.md`
- Modify: `docs/exercises/02-skills/exercise-2.md`
- Modify: `docs/exercises/02-skills/exercise-3.md`
- Modify: `docs/exercises/02-skills/exercise-4.md`

**Step 1: Locate AGENTS.md references**

Run: `rg -n "AGENTS.md" docs/modules/09-api-customization.md docs/exercises/02-skills`
Expected: All location references listed.

**Step 2: Define canonical guidance**

Action: Use `./AGENTS.md` for project-level and `~/.codex/AGENTS.md` for global, with precedence note in module doc.
Expected: A single canonical wording to apply.

### Task 2: Update docs to match canonical guidance

**Files:**
- Modify: `docs/modules/09-api-customization.md`
- Modify: `docs/exercises/02-skills/*.md`

**Step 1: Replace conflicting paths**

Action: Update any `.codex/AGENTS.md` mentions to `./AGENTS.md` for project-level guidance.
Expected: All project-level references use `./AGENTS.md`.

**Step 2: Add precedence note (once)**

Action: Ensure module doc contains a single note on precedence (project over global).
Expected: No conflicting precedence descriptions remain.

### Task 3: Validate and finalize

**Files:**
- Modify: `docs/modules/09-api-customization.md`
- Modify: `docs/exercises/02-skills/*.md`
- Delete: `IMPLEMENTATION_PLAN.md`

**Step 1: Run existing tests**

Run: `python3 -m unittest tests/test_verify_exercises.py -v`
Expected: Tests pass.

**Step 2: Review diffs and confirm scope**

Run: `git status --short` and `git diff`
Expected: Only expected doc changes present.

**Step 3: Remove `IMPLEMENTATION_PLAN.md` after completion**

Run: `rm IMPLEMENTATION_PLAN.md`
Expected: Plan file removed once work is done.

**Step 4: Commit**

```bash
git add docs/modules/09-api-customization.md docs/exercises/02-skills/*.md docs/plans/2025-12-21-agents-location-consistency.md
git commit -m "docs: standardize AGENTS.md location guidance"
```
