# AGENTS.md Location Guidance Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Standardize AGENTS.md location and precedence wording across Module 9 and Module 2 exercises.

**Architecture:** Documentation-only edits: define a single canonical wording in Module 9, then align or reference it in exercises to avoid drift.

**Tech Stack:** Markdown docs.

### Task 1: Add canonical wording and precedence note in Module 9

**Files:**
- Modify: `docs/modules/09-api-customization.md`

**Step 1: Locate AGENTS.md location section**

Run: `rg -n "AGENTS.md - Project Instructions|Where to Put It" docs/modules/09-api-customization.md`

Expected: Table with `./AGENTS.md` and `~/.codex/AGENTS.md`.

**Step 2: Insert canonical wording**

Add this sentence immediately after the location table:

```
Project instructions live in `./AGENTS.md`. Global instructions live in `~/.codex/AGENTS.md`. Codex combines both, and project instructions take precedence.
```

**Step 3: Remove conflicting wording**

Replace any alternative precedence phrasing (e.g., "Project-level AGENTS.md takes precedence...") with the canonical sentence if present nearby.

**Step 4: Commit**

```bash
git add docs/modules/09-api-customization.md
git commit -m "docs: standardize AGENTS.md precedence note"
```

### Task 2: Align Exercise 1 wording and reference Module 9

**Files:**
- Modify: `docs/exercises/02-skills/exercise-1.md`

**Step 1: Update location instruction**

Change the first instruction under "Configure AGENTS.md" to:

```
Open or create `./AGENTS.md` (project) or `~/.codex/AGENTS.md` (global).
```

**Step 2: Add precedence note once**

Add the canonical sentence directly below that instruction, followed by a short reference:

```
Project instructions live in `./AGENTS.md`. Global instructions live in `~/.codex/AGENTS.md`. Codex combines both, and project instructions take precedence. See Module 9 for details.
```

**Step 3: Align hints**

Replace any "AGENTS.md not found" hints to mention both locations in the same order (`./AGENTS.md`, `~/.codex/AGENTS.md`).

**Step 4: Commit**

```bash
git add docs/exercises/02-skills/exercise-1.md
git commit -m "docs: align exercise 1 AGENTS.md location wording"
```

### Task 3: Align Exercise 4 and other references

**Files:**
- Modify: `docs/exercises/02-skills/exercise-4.md`

**Step 1: Replace generic AGENTS.md references**

Update "Add to your AGENTS.md" or similar phrases to:

```
Add to your project `./AGENTS.md` or global `~/.codex/AGENTS.md`.
```

**Step 2: Add a reference to Module 9**

Where guidance mentions location, append:

```
(See Module 9 for precedence.)
```

**Step 3: Commit**

```bash
git add docs/exercises/02-skills/exercise-4.md
git commit -m "docs: align exercise 4 AGENTS.md location wording"
```

### Task 4: Verify consistency

**Files:**
- `docs/modules/09-api-customization.md`
- `docs/exercises/02-skills/exercise-1.md`
- `docs/exercises/02-skills/exercise-4.md`

**Step 1: Verify wording**

Run: `rg -n "AGENTS.md" docs/modules/09-api-customization.md docs/exercises/02-skills`

Expected:
- Canonical sentence appears once in Module 9 and once in Exercise 1.
- No conflicting precedence statements.

**Step 2: Commit verification note (optional)**

No code changes expected; skip commit if clean.
