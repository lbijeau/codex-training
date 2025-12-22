# AGENTS.md Permissions Guidance Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove or correct AGENTS.md permission/config claims so they match current Codex CLI behavior and clearly describe scope/precedence.

**Architecture:** Documentation-only changes in two files. Work proceeds by inventorying AGENTS.md permission claims, verifying against `codex --help` and current CLI behavior, and updating wording to avoid unsupported promises. Verification uses the existing unit test suite for exercise manifests.

**Tech Stack:** Markdown, Codex CLI, Python (unittest runner).

### Task 1: Inventory AGENTS.md permission claims

**Files:**
- Modify: `docs/modules/09-api-customization.md`
- Modify: `docs/exercises/02-skills/exercise-1.md`

**Step 1: Locate AGENTS.md permission/config claims**

Run: `rg -n "AGENTS.md|permission|approve|approval|trust" docs/modules/09-api-customization.md docs/exercises/02-skills/exercise-1.md`
Expected: List of statements to validate.

**Step 2: Verify current CLI behavior**

Run: `codex --help`
Expected: Confirm available configuration flags and the approval/sandbox model.

**Step 3: Note unsupported claims**

Action: Mark any claims implying AGENTS.md can grant permissions or persist trust without explicit CLI config.
Expected: Short list of lines to update.

### Task 2: Update docs to match verified behavior

**Files:**
- Modify: `docs/modules/09-api-customization.md`
- Modify: `docs/exercises/02-skills/exercise-1.md`

**Step 1: Replace unsupported permission guidance**

Action: Remove or rephrase claims so AGENTS.md is described as instruction/context only, unless verified otherwise.
Expected: No implicit permission grant language remains.

**Step 2: Clarify scope and precedence**

Action: Add or update wording about global vs project AGENTS.md scope (consistent with current CLI behavior).
Expected: Scope/precedence guidance is clear and consistent.

**Step 3: Add verification note**

Action: Add “Verified with Codex CLI v0.76.0” near updated guidance.
Expected: Version note included near the updated sections.

### Task 3: Validate and finalize

**Files:**
- Modify: `docs/modules/09-api-customization.md`
- Modify: `docs/exercises/02-skills/exercise-1.md`
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
git add docs/modules/09-api-customization.md docs/exercises/02-skills/exercise-1.md docs/plans/2025-12-21-agents-permissions-guidance.md
git commit -m "docs: correct AGENTS permission guidance"
```
