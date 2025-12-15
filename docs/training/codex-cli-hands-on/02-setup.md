# Setup and Safety Checks

Prerequisites:
- Node 18+ or Homebrew access; shell with `curl`/`zsh`/`bash`.
- ChatGPT account with Codex access (preferred) or OpenAI API key as fallback.
- A small practice repo you can modify safely (e.g., a toy script).
- **Important:** Codex CLI requires running inside a Git repository to track changes and prevent destructive operations.

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
