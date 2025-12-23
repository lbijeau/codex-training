# CONTRIBUTING Directory Map Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update CONTRIBUTING.md directory map and references to match the current repo layout.

**Architecture:** Documentation-only edits; keep the tree high-level but accurate and ensure all referenced paths exist.

**Tech Stack:** Markdown docs.

### Task 1: Update directory tree in CONTRIBUTING.md

**Files:**
- Modify: `CONTRIBUTING.md`

**Step 1: Review current tree**

Run: `sed -n '110,150p' CONTRIBUTING.md`

Expected: Tree listing `docs/modules`, `docs/exercises`, `docs/plans`, `docs/maintainers`, `examples`, `practice`, `.codex-examples`.

**Step 2: Align maintainer description**

Update the `docs/maintainers/` comment to reflect the current contents (patterns, playbook, templates, prompt_templates).

**Step 3: Commit**

```bash
git add CONTRIBUTING.md
git commit -m "docs: align CONTRIBUTING directory map"
```

### Task 2: Verify paths exist

**Files:**
- `CONTRIBUTING.md`

**Step 1: Verify listed paths**

Run: `rg --files | rg -n "docs/maintainers|docs/modules|docs/exercises|docs/plans|examples|practice|\.codex-examples"`

Expected: All listed paths exist in the repo.

**Step 2: Commit verification note (optional)**

No code changes expected; skip commit if clean.
