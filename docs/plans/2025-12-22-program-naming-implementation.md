# Program Naming Normalization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Standardize the program name to "Codex CLI Mastery Program" across README, GETTING_STARTED, and CONTRIBUTING.

**Architecture:** Documentation-only edit; replace inconsistent naming within the scoped files.

**Tech Stack:** Markdown docs.

### Task 1: Update program naming across scoped files

**Files:**
- Modify: `README.md`
- Modify: `GETTING_STARTED.md`
- Modify: `CONTRIBUTING.md`

**Step 1: Find occurrences**

Run: `rg -n "CLI Mastery|Code Mastery" README.md GETTING_STARTED.md CONTRIBUTING.md`

Expected: Any "Codex Code Mastery Program" occurrences.

**Step 2: Replace mismatches**

Replace any "Codex Code Mastery Program" occurrences with "Codex CLI Mastery Program".

**Step 3: Commit**

```bash
git add README.md GETTING_STARTED.md CONTRIBUTING.md
git commit -m "docs: normalize program naming"
```

### Task 2: Verify consistency

**Files:**
- `README.md`
- `GETTING_STARTED.md`
- `CONTRIBUTING.md`

**Step 1: Verify naming**

Run: `rg -n "CLI Mastery|Code Mastery" README.md GETTING_STARTED.md CONTRIBUTING.md`

Expected: Only "Codex CLI Mastery Program" remains.

**Step 2: Commit verification note (optional)**

No code changes expected; skip commit if clean.
