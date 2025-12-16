# Module 1: Getting Started with Codex CLI

## Overview

Start here if you're new to Codex or using the Codex CLI. This module orients you to the CLI workflow, built-in tools, and the hands-on training path so you can deliver changes without writing custom API wrappers.

**Learning Objectives**:
- Install and configure Codex CLI
- Understand built-in tools (file read, apply_patch, shell)
- Run the hands-on training labs for confidence with the TUI/exec flows
- Know where to find helper catalogs and prompt templates in this repo

**Time**: 45-60 minutes

---

## 1. Install & Configure
- Follow `GETTING_STARTED.md` to install Codex CLI and authenticate.
- Verify access: `codex --version`, then run a hello-world prompt in a safe directory.

## 2. Core CLI Workflow
- Practice the Codex TUI: run `codex --cd /path/to/repo` and ask for a small change; approve/reject commands.
- Try `codex exec "prompt"` for non-interactive runs (good for scripted summaries).
- Learn built-in tools: file reads, apply_patch, shell commands, and image viewing.

## 2.1 CLI options you’ll use immediately
- `--cd <path>`: set the working repo (required for safety). Add `--add-dir <path>` to include a second repo.
- `-a` / `--ask-for-approval`: force approvals for every command. `--full-auto` removes approvals—avoid unless you’re sure.
- `--sandbox <mode>`: `read-only`, `workspace-write` (default), or `danger-full-access` (avoid unless necessary).
- `--profile <name>`: load a config profile from `~/.codex/config.toml` (e.g., `safe` vs `auto`).
- `--enable skills`: turn on the local skills catalog.
- `codex exec`: non-interactive mode; pair with `--json`, `--output-schema`, or `--output-last-message` to script runs.

### TUI slash commands to remember
- `/status`: show workdir, sandbox, approval policy, session ID.
- `/diff`, `/undo`: inspect/undo pending changes.
- `/compact`: summarize/trim context; `/clear`: clear chat history.
- `/model`: switch model; `/skills`: list enabled skills.

See also: `~/.codex/config.toml` for defaults and named profiles. For a full flag list, run `codex --help` or see the CLI docs.

## 3. Hands-on Training Path
- Walk through `docs/training/codex-cli-hands-on/README.md`.
- Complete the labs in `docs/training/codex-cli-hands-on/` (e.g., Jupyter lab helpers, prompt templates).

## 4. Helper Catalog & Templates
- Browse `codex_helpers/` and `docs/prompt_templates/` to see reusable helpers and prompts.
- Skim `docs/examples/session-drive.md` for an end-to-end session using helpers.

## 5. Next Steps
- Move on to [Module 2: Skills & Reusable Workflows](02-skills.md).
- Return to API modules (8–9) later if you need to build custom integrations.
