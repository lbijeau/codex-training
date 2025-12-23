# Codex Examples & functions.json References Design

**Goal:** Remove or correct references to `.codex-examples/` and `.codex/functions.json` so docs match the repo layout.

**Scope:**
- Documentation files referencing `.codex-examples/` or `.codex/functions.json`.

**Out of Scope:**
- Adding new config files or changing CLI behavior

## Approach

- Inventory all references to `.codex-examples/` and `.codex/functions.json`.
- Standardize `.codex-examples/` references to the repo root path if it exists and matches content.
- Remove or replace `.codex/functions.json` references with current guidance (AGENTS.md + `~/.codex/skills/` or `~/.codex/config.toml`).
- Keep edits minimal and documentation-only.

## Verification

- `rg -n ".codex-examples|functions.json" README.md GETTING_STARTED.md docs`
- Only accurate `.codex-examples/` references remain.
- No references to `.codex/functions.json` remain.
