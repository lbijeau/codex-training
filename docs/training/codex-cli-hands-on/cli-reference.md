# Codex CLI + TUI Reference

> Version note: validated against `codex-cli 0.76.0` (`codex --version`). CLI flags and TUI commands may drift; when in doubt run `codex --help`.

This reference is for the training track. Keep the setup guide short and use this for full details.

## CLI Usage

```bash
codex [OPTIONS] [PROMPT]
codex [OPTIONS] <COMMAND> [ARGS]
```

### Commands

| Command | Description |
|---------|-------------|
| `exec` | Run Codex non-interactively (automation mode). |
| `review` | Run a code review non-interactively. |
| `login` | Manage login. |
| `logout` | Remove stored authentication credentials. |
| `mcp` | Run Codex as an MCP server and manage MCP servers (experimental). |
| `mcp-server` | Run the Codex MCP server (stdio transport, experimental). |
| `app-server` | Run the app server or related tooling (experimental). |
| `completion` | Generate shell completion scripts. |
| `sandbox` | Run commands within a Codex-provided sandbox (alias: `debug`). |
| `apply` | Apply the latest diff produced by Codex as a `git apply` (alias: `a`). |
| `resume` | Resume a previous interactive session. |
| `cloud` | Browse tasks from Codex Cloud and apply changes locally (experimental). |
| `features` | Inspect feature flags. |
| `help` | Print help for a command. |

### Global Flags (from `codex --help`)

| Flag | Description |
|------|-------------|
| `-c`, `--config <key=value>` | Override a config value from `~/.codex/config.toml` (TOML parsed). |
| `--enable <feature>` | Enable a feature (repeatable). |
| `--disable <feature>` | Disable a feature (repeatable). |
| `-i`, `--image <file>...` | Attach image(s) to the initial prompt. |
| `-m`, `--model <model>` | Select model. |
| `--oss` | Use local open-source provider. |
| `--local-provider <provider>` | Select OSS provider (`lmstudio` or `ollama`). |
| `-p`, `--profile <config_profile>` | Use a named config profile from `config.toml`. |
| `-s`, `--sandbox <mode>` | Sandbox policy: `read-only`, `workspace-write`, `danger-full-access`. |
| `-a`, `--ask-for-approval <policy>` | Approval policy: `untrusted`, `on-failure`, `on-request`, `never`. |
| `--full-auto` | Alias for `-a on-request --sandbox workspace-write`. |
| `--dangerously-bypass-approvals-and-sandbox` | Skip approvals and sandboxing (dangerous). |
| `-C`, `--cd <dir>` | Set working directory. |
| `--search` | Enable web search tool (off by default). |
| `--add-dir <dir>` | Add additional writable directories. |
| `-h`, `--help` | Show help. |
| `-V`, `--version` | Show version. |

### `codex exec` Flags (from `codex exec --help`)

| Flag | Description |
|------|-------------|
| `-c`, `--config <key=value>` | Override config value (TOML parsed). |
| `--enable <feature>` | Enable a feature (repeatable). |
| `--disable <feature>` | Disable a feature (repeatable). |
| `-i`, `--image <file>...` | Attach image(s) to the initial prompt. |
| `-m`, `--model <model>` | Select model. |
| `--oss` | Use open-source provider. |
| `--local-provider <provider>` | Select OSS provider. |
| `-s`, `--sandbox <mode>` | Sandbox policy: `read-only`, `workspace-write`, `danger-full-access`. |
| `-p`, `--profile <config_profile>` | Use a named config profile. |
| `--full-auto` | Alias for `-a on-request --sandbox workspace-write`. |
| `--dangerously-bypass-approvals-and-sandbox` | Skip approvals and sandboxing (dangerous). |
| `-C`, `--cd <dir>` | Set working directory. |
| `--skip-git-repo-check` | Allow running outside a Git repo. |
| `--add-dir <dir>` | Add additional writable directories. |
| `--output-schema <file>` | Validate final response against JSON schema. |
| `--color <mode>` | `always`, `never`, `auto`. |
| `--json` | Emit JSONL events to stdout. |
| `-o`, `--output-last-message <file>` | Write last message to a file. |
| `-h`, `--help` | Show help. |
| `-V`, `--version` | Show version. |

### `codex resume` Flags (from `codex resume --help`)

| Flag | Description |
|------|-------------|
| `-c`, `--config <key=value>` | Override config value (TOML parsed). |
| `--last` | Resume most recent session without picker. |
| `--all` | Show all sessions (disable cwd filtering). |
| `--enable <feature>` | Enable a feature (repeatable). |
| `--disable <feature>` | Disable a feature (repeatable). |
| `-i`, `--image <file>...` | Attach image(s) to the prompt. |
| `-m`, `--model <model>` | Select model. |
| `--oss` | Use open-source provider. |
| `--local-provider <provider>` | Select OSS provider. |
| `-p`, `--profile <config_profile>` | Use a named config profile. |
| `-s`, `--sandbox <mode>` | Sandbox policy: `read-only`, `workspace-write`, `danger-full-access`. |
| `-a`, `--ask-for-approval <policy>` | Approval policy: `untrusted`, `on-failure`, `on-request`, `never`. |
| `--full-auto` | Alias for `-a on-request --sandbox workspace-write`. |
| `--dangerously-bypass-approvals-and-sandbox` | Skip approvals and sandboxing (dangerous). |
| `-C`, `--cd <dir>` | Set working directory. |
| `--search` | Enable web search tool (off by default). |
| `--add-dir <dir>` | Add additional writable directories. |
| `-h`, `--help` | Show help. |
| `-V`, `--version` | Show version. |

## TUI Slash Commands

| Command | Description |
|---------|-------------|
| `/help` | Show available commands. |
| `/status` | Show session info (workdir, sandbox, session ID). |
| `/skills` | List available skills (if enabled). |
| `/clear` | Clear conversation history. |
| `/compact` | Summarize and compress context. |
| `/undo` | Undo last file change. |
| `/diff` | Show pending changes. |
| `/model` | Switch model mid-session. |

## Examples

```bash
# Run interactive TUI in a specific repo
codex -C /path/to/repo

# Force approvals + workspace-write sandbox
codex -a on-request -s workspace-write "summarize README.md"

# Automation mode with JSON output
codex exec --full-auto --json "add a unit test for hello.py"

# Validate response shape (automation mode)
codex exec --output-schema schemas/response.json "summarize tests"

# Resume the most recent session
codex resume --last "continue the previous task"

# Add another writable directory
codex --add-dir ../shared "compare configs"
```

## Environment Variables

| Variable | Use |
|----------|-----|
| `OPENAI_API_KEY` | API key for Codex when using API-key auth. |
| `CODEX_API_KEY` | API key for `codex exec` usage-based billing path. |
| `RUST_LOG` | Increase logging verbosity (e.g., `RUST_LOG=codex_core=debug`). |

Log file note: TUI logs live at `~/.codex/log/codex-tui.log` (paths may vary on Windows/WSL).

## Config File (`~/.codex/config.toml`)

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

# MCP server integration (example)
[mcp.servers.memory]
command = "npx"
args = ["-y", "@anthropic/mcp-memory"]
```

## Notes

- Flags and subcommands are taken from local help output (`codex --help`, `codex exec --help`, `codex resume --help`).
- If the official docs disagree with this page, prefer the CLI help output for your installed version.

## References

- Official CLI docs: https://github.com/openai/codex/blob/main/docs/cli.md
- Config docs: https://github.com/openai/codex/blob/main/docs/config.md
