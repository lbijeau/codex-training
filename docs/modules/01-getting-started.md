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

## 5. From Commands to Workflows

You now know how to run Codex, approve commands, and manage sessions. But there's a big difference between *using* Codex and *mastering* it.

**The leap**: Instead of writing prompts from scratch every time, experts use **skills**—packaged workflows that encode proven techniques.

### Quick Example: Debugging

**Without skills** (ad-hoc prompting):
```
You: "Tests are failing, help me fix them"
Codex: [guesses at a fix]
You: "That didn't work"
Codex: [guesses again]
# 30 minutes of trial and error
```

**With skills** (systematic approach):
```
You: "Tests are failing. Use superpowers:systematic-debugging"
Codex: [follows proven 4-phase framework]
1. Reproduce → isolate the failure
2. Trace → find root cause
3. Hypothesize → form and test theory
4. Fix → solve and prevent regression
# Problem solved methodically
```

Skills turn "hoping it works" into "knowing the process."

### What You'll Learn Next

| Module | What It Unlocks |
|--------|-----------------|
| **Skills** | Reusable workflows for debugging, planning, quality |
| **Speed** | Parallel execution, context optimization |
| **Planning** | Breaking down complex work systematically |
| **Quality** | Verification, testing, code review patterns |
| **Domain** | Refactoring, legacy code, security, performance |
| **Integration** | GitHub CLI, CI/CD, multi-tool workflows |

---

## Next Steps

1. **[Module 2: Skills & Reusable Workflows](02-skills.md)** — Learn to use and create skills
2. Return to API modules (8–9) later if you need custom integrations
