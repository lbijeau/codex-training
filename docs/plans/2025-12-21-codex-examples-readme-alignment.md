# README Codex Examples Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ensure README.md does not reference missing `.codex-examples/` or `.codex/functions.json` assets (either add them or remove claims).

**Architecture:** Documentation-only changes in README.md. Work proceeds by inventorying references, deciding whether to add or remove, and updating text accordingly. Validation uses the existing unit test suite.

**Tech Stack:** Markdown, Python (unittest runner).

### Task 1: Inventory references and decide resolution

**Files:**
- Modify: `README.md`

**Step 1: Locate references**

Run: `rg -n "\.codex-examples|\.codex/functions.json" README.md`
Expected: Lines with references to missing assets.

**Step 2: Confirm asset presence**

Run: `rg --files -g '.codex-examples/*'` and `rg --files -g '.codex/functions.json'`
Expected: Confirm whether assets exist in the repo.

**Step 3: Decide add vs remove**

Action: Choose to remove references or add missing assets (prefer removal if assets are not required).
Expected: Decision captured for update.

### Task 2: Update README.md

**Files:**
- Modify: `README.md`

**Step 1: Replace or remove invalid references**

Action: Remove or update README sections referencing missing assets.
Expected: README only references existing paths.

**Step 2: Verify references**

Run: `rg -n "\.codex-examples|\.codex/functions.json" README.md`
Expected: No stale references remain.

### Task 3: Validate and finalize

**Files:**
- Modify: `README.md`
- Delete: `IMPLEMENTATION_PLAN.md`

**Step 1: Run existing tests**

Run: `python3 -m unittest tests/test_verify_exercises.py -v`
Expected: Tests pass.

**Step 2: Review diffs and confirm scope**

Run: `git status --short` and `git diff`
Expected: Only README.md and plan file changes.

**Step 3: Remove `IMPLEMENTATION_PLAN.md` after completion**

Run: `rm IMPLEMENTATION_PLAN.md`
Expected: Plan file removed once work is done.

**Step 4: Commit**

```bash
git add README.md docs/plans/2025-12-21-codex-examples-readme-alignment.md
git commit -m "docs: align README example references"
```
