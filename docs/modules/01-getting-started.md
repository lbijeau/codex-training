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

## 2.1 CLI Options Reference

### Starting a Session

| Flag | Description | Example |
|------|-------------|---------|
| `--cd <path>` | Set working directory (required) | `codex --cd ~/myproject` |
| `--add-dir <path>` | Include additional directory | `codex --cd ~/api --add-dir ~/shared` |
| `--resume` | Continue previous session | `codex --resume` |
| `--continue <id>` | Continue specific session | `codex --continue abc123` |
| `--model <name>` | Select model | `codex --model gpt-5.1-codex-max` |
| `--profile <name>` | Load config profile | `codex --profile safe` |

### Approval & Safety

| Flag | Description | When to Use |
|------|-------------|-------------|
| `-a` / `--ask-for-approval` | Approve every command | Learning, sensitive repos |
| `--full-auto` | No approvals needed | Trusted scripts only |
| `--sandbox read-only` | Can't write files | Exploration, code review |
| `--sandbox workspace-write` | Write to workdir + /tmp | Default, recommended |
| `--sandbox danger-full-access` | Full system access | Avoid unless necessary |

### Non-Interactive Mode (`codex exec`)

```bash
# Basic execution
codex exec "Summarize the README"

# Output to file
codex exec "List all TODO comments" > todos.txt

# JSON output for scripting
codex exec --json "Analyze the codebase structure"

# Extract just the final response
codex exec --output-last-message "What's the main entry point?"

# Parallel execution
codex exec "Check auth code" > auth.txt &
codex exec "Check api code" > api.txt &
wait
```

### Skills & Extensions

| Flag | Description |
|------|-------------|
| `--enable skills` | Enable skills catalog |
| `--disable-mcp` | Disable MCP servers |
| `--mcp-server <name>` | Enable specific MCP server |

### Session Management

```bash
# List recent sessions
codex sessions list

# Resume most recent
codex --resume

# Resume specific session
codex --continue <session-id>
```

### TUI Slash Commands

| Command | Description |
|---------|-------------|
| `/status` | Show workdir, sandbox, approval policy, session ID |
| `/diff` | Show pending file changes |
| `/undo` | Undo last change |
| `/compact` | Summarize and trim context |
| `/clear` | Clear chat history |
| `/model` | Switch model mid-session |
| `/skills` | List enabled skills |
| `/help` | Show all commands |

### Configuration File

Store defaults in `~/.codex/config.toml`:

```toml
# Default settings
model = "gpt-5.1-codex-max"
approval = "suggest"

# Named profiles
[profiles.safe]
approval = "always"
sandbox = "read-only"

[profiles.auto]
approval = "never"
sandbox = "workspace-write"
```

Use profiles: `codex --profile safe`

## 3. Hands-on Training Path
- Walk through `docs/training/codex-cli-hands-on/README.md`.
- Complete the labs in `docs/training/codex-cli-hands-on/` (e.g., Jupyter lab helpers, prompt templates).

## 4. Helper Catalog & Templates
- Browse `codex_helpers/` and `docs/prompt_templates/` to see reusable helpers and prompts.
- Skim `docs/examples/session-drive.md` for an end-to-end session using helpers.

## 5. Next Steps
- Move on to [Module 2: Skills & Reusable Workflows](02-skills.md).
- Return to API modules (8–9) later if you need to build custom integrations.
