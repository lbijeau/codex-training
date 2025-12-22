# Exercise 1 Success Criteria Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add explicit success criteria and an example output snippet to `docs/exercises/03-speed/exercise-1.md`.

**Architecture:** Update the single exercise file to include a pass/fail checklist and a sample output block, keeping all changes local to the exercise content.

**Tech Stack:** Markdown documentation in `docs/exercises/03-speed`.

### Task 1: Review current exercise content

**Files:**
- Modify: `docs/exercises/03-speed/exercise-1.md`

**Step 1: Open the exercise**

Run: `sed -n '1,220p' docs/exercises/03-speed/exercise-1.md`
Expected: Current instructions and sections displayed.

**Step 2: Identify insertion point**

Find where to add Success Criteria and Example Output (typically near the end).
Expected: Clear spot identified for new sections.

**Step 3: Commit**

Run: `git add docs/plans/2025-12-22-exercise-1-success-criteria.md` then `git commit -m "docs: add exercise-1 success criteria plan"`
Expected: Plan committed for traceability.

### Task 2: Add success criteria and example output

**Files:**
- Modify: `docs/exercises/03-speed/exercise-1.md`

**Step 1: Add Success Criteria section**

Include measurable, sandbox-friendly pass/fail bullets.

**Step 2: Add Example Output or Transcript section**

Provide a short output snippet learners can compare against, noting that wording can vary slightly.

**Step 3: Self-review for clarity**

Confirm criteria are checkable without guesswork.

**Step 4: Commit**

Run: `git add docs/exercises/03-speed/exercise-1.md` then `git commit -m "docs: add success criteria to speed exercise"`
Expected: Exercise update committed.

### Task 3: Verification

**Files:**
- Modify: `docs/exercises/03-speed/exercise-1.md`

**Step 1: Re-read updated section**

Run: `sed -n '1,260p' docs/exercises/03-speed/exercise-1.md`
Expected: Success Criteria and Example Output sections present and clear.

**Step 2: Commit (if needed)**

If any tweaks are made, run: `git add docs/exercises/03-speed/exercise-1.md` then `git commit -m "docs: polish exercise-1 success criteria"`.
