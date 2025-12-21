# CONTRIBUTING Paths Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update `CONTRIBUTING.md` so its directory structure and path references match the current repo layout.

**Architecture:** Documentation-only changes in `CONTRIBUTING.md`. Work proceeds by inventorying referenced paths, mapping them to actual directories, and updating the doc accordingly. Verification uses the existing unittest suite.

**Tech Stack:** Markdown, Python (unittest runner).

### Task 1: Inventory path references

**Files:**
- Modify: `CONTRIBUTING.md`

**Step 1: Extract the documented directory tree**

Run: `rg -n "Directory Structure|docs/" CONTRIBUTING.md`
Expected: Lines describing the tree and path references.

**Step 2: Verify current repo paths**

Run: `rg --files` and compare against the tree entries.
Expected: Identify mismatches (e.g., `docs/maintainers` vs `docs/patterns`).

### Task 2: Update CONTRIBUTING.md

**Files:**
- Modify: `CONTRIBUTING.md`

**Step 1: Replace outdated paths**

Action: Update the directory tree and any path references to match actual repo paths.
Expected: `docs/maintainers/...` locations referenced correctly.

**Step 2: Recheck for stale paths**

Run: `rg -n "docs/(patterns|playbook|templates|prompt_templates)" CONTRIBUTING.md`
Expected: No references to non-existent directories.

### Task 3: Validate and finalize

**Files:**
- Modify: `CONTRIBUTING.md`
- Delete: `IMPLEMENTATION_PLAN.md`

**Step 1: Run existing tests**

Run: `python3 -m unittest tests/test_verify_exercises.py -v`
Expected: Tests pass.

**Step 2: Review diffs and confirm scope**

Run: `git status --short` and `git diff`
Expected: Only CONTRIBUTING.md and plan file changes.

**Step 3: Remove `IMPLEMENTATION_PLAN.md` after completion**

Run: `rm IMPLEMENTATION_PLAN.md`
Expected: Plan file removed once work is done.

**Step 4: Commit**

```bash
git add CONTRIBUTING.md docs/plans/2025-12-21-contributing-paths-alignment.md
git commit -m "docs: align contributing paths with repo layout"
```
