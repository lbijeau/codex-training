# Setup and Safety Checks

Prerequisites:
- Node 18+ or Homebrew access; shell with `curl`/`zsh`/`bash`.
- ChatGPT account with Codex access (preferred) or OpenAI API key as fallback.
- A small practice repo you can modify safely (e.g., a toy script).
- **Recommended:** Run inside a Git repository for change tracking and safety. Use `--skip-git-repo-check` to run outside a repo if needed.

Install Codex CLI (see [official README](https://github.com/openai/codex#readme)):
- `npm install -g @openai/codex` or `brew install --cask codex`
- Verify version: `codex --version` (this training validated with v0.72.x)

Sign-in options (see [authentication docs](https://github.com/openai/codex/blob/main/docs/authentication.md)):
- Preferred: `codex` → **Sign in with ChatGPT**.
- Alternative: export `OPENAI_API_KEY` (or `CODEX_API_KEY` for `codex exec`) then `codex` (usage-based billing path).
- Headless: follow the [headless machine guide](https://github.com/openai/codex/blob/main/docs/authentication.md#connecting-on-a-headless-machine).

Configuration (see [config docs](https://github.com/openai/codex/blob/main/docs/config.md)):
- Default config lives in `~/.codex/config.toml`.
- Flags you may demo: `--cd <path>` to target a repo; `--add-dir` for multi-repo; `--ask-for-approval/-a` to force approvals.
- MCP: mention where to point MCP servers if relevant (see [MCP integration](https://github.com/openai/codex/blob/main/docs/config.md#mcp-integration)).

Safety: sandboxing and approvals (see [sandbox docs](https://github.com/openai/codex/blob/main/docs/sandbox.md) and [execpolicy docs](https://github.com/openai/codex/blob/main/docs/execpolicy.md)):
- Show the workdir and writable roots at session start; explain approval policy.
- Demonstrate an approval prompt by asking Codex to run a harmless command (e.g., `ls` outside the repo) with approvals on.
- Execpolicy: highlight that repos can define rules to restrict actions.

Environment prep for labs:
- Pick a throwaway repo and run `codex --cd /path/to/repo`.
- Create or identify a simple file to edit (e.g., `hello.py` or `index.js`).
- Optional: spin up a Python venv for the Jupyter lab (`python -m venv .venv && source .venv/bin/activate && pip install jupyter`).

Readiness check:
- Run: `codex "echo hello from Codex and tell me my current working directory"` with approvals required.
- Confirm Codex prints the workdir and asks for approval before running commands.

---

## Quick Reference

### Common CLI Flags

| Flag | Description |
|------|-------------|
| `--cd <path>` | Set working directory to a specific repo |
| `--add-dir <path>` | Add additional directories for multi-repo work |
| `-a`, `--ask-for-approval` | Require approval before executing commands |
| `--full-auto` | Enable writes without approval (use with caution) |
| `--json` | Output structured JSON events (`codex exec` only) |
| `--output-schema <file>` | Validate output against JSON schema |
| `-o`, `--output-last-message` | Capture final response to file |
| `--sandbox <mode>` | Set sandbox: `read-only`, `workspace-write`, `danger-full-access` |
| `--profile <name>` | Use a named config profile |
| `--enable <feature>` | Enable experimental features (e.g., `--enable skills`) |

### TUI Slash Commands

| Command | Description |
|---------|-------------|
| `/help` | Show available commands |
| `/status` | Show session info (workdir, sandbox, session ID) |
| `/skills` | List available skills (if enabled) |
| `/clear` | Clear conversation history |
| `/compact` | Summarize and compress context |
| `/undo` | Undo last file change |
| `/diff` | Show pending changes |
| `/model` | Switch model mid-session |

### Config File (`~/.codex/config.toml`)

```toml
# Model settings
model = "codex-1"              # Default model
temperature = 0.7              # Response randomness (0-1)

# Safety defaults
sandbox = "workspace-write"    # read-only | workspace-write | danger-full-access
approval_policy = "on-failure" # untrusted | on-failure | on-request | never

# Features (experimental)
[features]
skills = true                  # Enable skills from ~/.codex/skills/

# Named profiles (use with --profile)
[profiles.safe]
sandbox = "read-only"
approval_policy = "untrusted"

[profiles.auto]
sandbox = "workspace-write"
approval_policy = "never"

# MCP server integration
[mcp.servers.memory]
command = "npx"
args = ["-y", "@anthropic/mcp-memory"]
```

For all config options, see the [official config docs](https://github.com/openai/codex/blob/main/docs/config.md).

For the full CLI reference, see the [official CLI docs](https://github.com/openai/codex/blob/main/docs/cli.md).
