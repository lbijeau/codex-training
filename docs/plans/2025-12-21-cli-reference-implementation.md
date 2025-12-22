# CLI Reference Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a comprehensive CLI/TUI reference page and link it from the setup guide.

**Architecture:** Add a new markdown reference page in the hands-on training folder. Keep `02-setup.md` concise by linking to the new page and adjusting the existing quick reference to point to the fuller content.

**Tech Stack:** Markdown docs.

### Task 1: Gather CLI/TUI reference sources

**Files:**
- Modify: `docs/training/codex-cli-hands-on/cli-reference.md`
- Modify: `docs/training/codex-cli-hands-on/02-setup.md`

**Step 1: Capture CLI help output**

Run: `codex --help`
Expected: Help text listing flags, subcommands, and usage.

**Step 2: Capture exec/resume help output**

Run: `codex exec --help`
Expected: Help text listing exec-specific flags (e.g., `--json`, `--output-schema`).

Run: `codex resume --help`
Expected: Help text listing resume-specific flags.

**Step 3: Note any TUI slash commands**

Check the official CLI docs or existing training notes for current slash commands.
Expected: List of commands like `/help`, `/status`, `/skills`, `/diff`, `/undo`, etc.

**Step 4: Consolidate environment variables and config options**

Reference the official CLI/config docs for environment variables and config fields.
Expected: `CODEX_API_KEY`, `OPENAI_API_KEY`, `RUST_LOG`, plus config file keys and profiles.

**Step 5: Commit source notes (if needed)**

If you add any scratch notes, delete them before commit.

### Task 2: Add the standalone CLI/TUI reference page

**Files:**
- Create: `docs/training/codex-cli-hands-on/cli-reference.md`

**Step 1: Write the reference page**

Include:
- Versioning note (CLI version validated, potential drift).
- CLI usage synopsis and subcommands (`codex`, `codex exec`, `codex resume`).
- Comprehensive flags table.
- TUI slash commands table.
- Examples for single flags, combos, and `exec --json`.
- Environment variables reference.
- Config file reference (`~/.codex/config.toml`).
- Notes section for differences/gaps between help output and docs.

**Step 2: Review for clarity and skimmability**

Check headings, tables, and code blocks for consistent formatting.

**Step 3: Commit**

```bash
git add docs/training/codex-cli-hands-on/cli-reference.md
git commit -m "docs: add codex CLI/TUI reference"
```

### Task 3: Link the reference from setup docs

**Files:**
- Modify: `docs/training/codex-cli-hands-on/02-setup.md`

**Step 1: Add a short link near Quick Reference**

Add a sentence linking to `cli-reference.md` and note it is the full reference.

**Step 2: Adjust the quick reference if needed**

Keep the quick reference short. Remove anything that is duplicated in detail on the new page.

**Step 3: Commit**

```bash
git add docs/training/codex-cli-hands-on/02-setup.md
git commit -m "docs: link to full CLI/TUI reference"
```

### Task 4: Verify docs render and finalize

**Files:**
- Modify: `docs/training/codex-cli-hands-on/cli-reference.md`
- Modify: `docs/training/codex-cli-hands-on/02-setup.md`

**Step 1: Run any available doc checks (optional)**

Run: `python3 scripts/verify_exercises.py`
Expected: All checks pass (or only unrelated failures).

**Step 2: Manual review**

Ensure links resolve and the reference is easy to scan.

**Step 3: Commit if needed**

```bash
git add docs/training/codex-cli-hands-on/cli-reference.md docs/training/codex-cli-hands-on/02-setup.md
git commit -m "docs: polish cli reference"
```
