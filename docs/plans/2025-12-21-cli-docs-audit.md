# CLI Docs Audit Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Align core documentation with verified Codex CLI flags/commands and add explicit version verification notes.

**Architecture:** This is a documentation-only change scoped to three core files. Work proceeds by inventorying all CLI references, verifying against `codex --help`, updating examples and language, and adding verification notes. Validation uses the existing lightweight exercise test to ensure no regressions in tooling.

**Tech Stack:** Markdown, Codex CLI, Python (unittest runner).

### Task 1: Inventory CLI references

**Files:**
- Modify: `docs/modules/01-getting-started.md`
- Modify: `README.md`
- Modify: `GETTING_STARTED.md`

**Step 1: List all CLI references in scope**

Run: `rg -n "codex " docs/modules/01-getting-started.md README.md GETTING_STARTED.md`
Expected: A list of command examples and flags to verify.

**Step 2: Record current CLI help/version**

Run: `codex --help` and `codex --version`
Expected: Current CLI help output and version string (capture for reference).

**Step 3: Note unverified or ambiguous examples**

Action: Mark any commands/flags that do not appear in `codex --help` for correction.
Expected: Short checklist of items to fix.

### Task 2: Update docs with verified commands

**Files:**
- Modify: `docs/modules/01-getting-started.md`
- Modify: `README.md`
- Modify: `GETTING_STARTED.md`

**Step 1: Edit CLI examples to match help output**

Action: Replace or remove any mismatched flags or commands.
Expected: All command examples align with `codex --help`.

**Step 2: Add verification notes**

Action: Add "Verified with Codex CLI vX.Y" near updated examples.
Expected: Each updated section includes a verification note.

**Step 3: Ensure phrasing avoids version overclaims**

Action: Remove fixed version claims unless verified.
Expected: No speculative or unverified statements remain.

### Task 3: Validate and finalize

**Files:**
- Modify: `docs/modules/01-getting-started.md`
- Modify: `README.md`
- Modify: `GETTING_STARTED.md`
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
git add docs/modules/01-getting-started.md README.md GETTING_STARTED.md
git commit -m "docs: align CLI examples with verified flags"
```
