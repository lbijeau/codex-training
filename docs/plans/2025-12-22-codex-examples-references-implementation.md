# Codex Examples & functions.json References Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove or correct `.codex-examples/` and `.codex/functions.json` references so docs match actual repo paths.

**Architecture:** Documentation-only edits: align paths to existing repo structure and replace/remove unsupported file references.

**Tech Stack:** Markdown docs.

### Task 1: Update README references

**Files:**
- Modify: `README.md`

**Step 1: Find references**

Run: `rg -n "\.codex-examples|\.codex/functions.json" README.md`

Expected: Any mentions of `.codex-examples/` or `.codex/functions.json`.

**Step 2: Align .codex-examples references**

If references point to other paths, change to the repo root `.codex-examples/`.

**Step 3: Remove/replace .codex/functions.json references**

If present, remove the reference or replace with current configuration guidance (AGENTS.md + `~/.codex/skills/` or `~/.codex/config.toml`).

**Step 4: Commit**

```bash
git add README.md
git commit -m "docs: align codex examples references"
```

### Task 2: Verify README consistency

**Files:**
- `README.md`

**Step 1: Verify references**

Run: `rg -n "\.codex-examples|\.codex/functions.json" README.md`

Expected:
- `.codex-examples/` only appears with the repo root path.
- No `.codex/functions.json` references remain.

**Step 2: Commit verification note (optional)**

No code changes expected; skip commit if clean.
