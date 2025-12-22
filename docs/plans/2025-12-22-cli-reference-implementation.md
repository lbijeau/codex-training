# CLI Reference Documentation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a standalone CLI/TUI reference page sourced from local `codex --help` and upstream docs, then link it from the setup guide.

**Architecture:** Create a single reference page under the hands-on training directory with sections for CLI flags, TUI commands, examples, env vars, and config keys. Update the setup guide to point to the new reference without bloating the setup flow.

**Tech Stack:** Markdown documentation in `docs/training/codex-cli-hands-on`.

### Task 1: Capture source references

**Files:**
- Create: `docs/training/codex-cli-hands-on/cli-reference.md`
- Modify: `docs/training/codex-cli-hands-on/cli-reference.md`

**Step 1: Run local help output capture**

Run: `codex --help`
Expected: CLI help text is available (or command not found; record outcome in the doc notes).

**Step 2: Fetch upstream docs**

Run: `curl -fsSL https://raw.githubusercontent.com/openai/codex/main/docs/cli.md` and `curl -fsSL https://raw.githubusercontent.com/openai/codex/main/docs/config.md`
Expected: Markdown files retrieved with upstream CLI/config references.

**Step 3: Summarize key lists**

Run: Manual extraction of flags, commands, and config keys into notes (no code change yet).
Expected: A short checklist of items to include in the reference page.

**Step 4: Commit**

Run: `git add docs/plans/2025-12-22-cli-reference-implementation.md` then `git commit -m "docs: add cli reference implementation plan"`
Expected: Plan committed for traceability.

### Task 2: Draft the CLI/TUI reference page

**Files:**
- Create: `docs/training/codex-cli-hands-on/cli-reference.md`

**Step 1: Write the initial reference structure**

Add sections for: overview/version notes, CLI flags (from `codex --help`), TUI slash commands, common combinations, environment variables, config.toml keys, and upstream links.

**Step 2: Fill in CLI flag details**

Populate flags and short examples using the local help output and upstream docs as needed.

**Step 3: Fill in TUI command list**

List known commands and short descriptions, noting any version caveats.

**Step 4: Capture env vars and config keys**

Document common environment variables and config keys with brief usage notes.

**Step 5: Self-review for clarity**

Ensure headings are consistent and examples are concise.

**Step 6: Commit**

Run: `git add docs/training/codex-cli-hands-on/cli-reference.md` then `git commit -m "docs: add codex cli and tui reference"`
Expected: New reference page committed.

### Task 3: Link from setup guide

**Files:**
- Modify: `docs/training/codex-cli-hands-on/02-setup.md`

**Step 1: Insert a short link in Quick Reference section**

Add a one-line link to the new reference page.

**Step 2: Commit**

Run: `git add docs/training/codex-cli-hands-on/02-setup.md` then `git commit -m "docs: link setup guide to cli reference"`
Expected: Setup guide points to the new reference page.

### Task 4: Verification

**Files:**
- Modify: `docs/training/codex-cli-hands-on/cli-reference.md`
- Modify: `docs/training/codex-cli-hands-on/02-setup.md`

**Step 1: Check Markdown links**

Run: `rg -n "cli-reference.md" docs/training/codex-cli-hands-on/02-setup.md`
Expected: Link present and correct.

**Step 2: Manual scan for accuracy**

Verify flag list and commands match sources; add a short note if local `codex --help` was unavailable.

**Step 3: Commit (if changes)**

Run: `git add docs/training/codex-cli-hands-on/cli-reference.md` and/or `docs/training/codex-cli-hands-on/02-setup.md`, then `git commit -m "docs: polish cli reference"` if needed.
