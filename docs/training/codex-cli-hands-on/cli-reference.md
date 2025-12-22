# Codex CLI + TUI Reference

This page consolidates the local CLI help output and upstream docs for quick lookup. Local source: `codex --help` and `codex exec --help` from codex-cli 0.76.0. Upstream source: `docs/config.md`, `docs/exec.md`, and `docs/slash_commands.md` in the Codex repo. If anything differs, trust `codex --help` for your installed version.

Upstream docs:
- CLI and exec: https://github.com/openai/codex/blob/main/docs/exec.md
- Slash commands: https://github.com/openai/codex/blob/main/docs/slash_commands.md
- Config: https://github.com/openai/codex/blob/main/docs/config.md

## CLI usage

```
codex [OPTIONS] [PROMPT]
codex [OPTIONS] <COMMAND> [ARGS]
```

## CLI commands (codex --help)

| Command | Purpose |
| --- | --- |
| `exec` | Run Codex non-interactively (aliases: `e`) |
| `review` | Run a code review non-interactively |
| `login` | Manage login |
| `logout` | Remove stored authentication credentials |
| `mcp` | Run Codex as an MCP server and manage MCP servers (experimental) |
| `mcp-server` | Run the Codex MCP server (experimental) |
| `app-server` | Run the app server or related tooling (experimental) |
| `completion` | Generate shell completion scripts |
| `sandbox` | Run commands within a Codex-provided sandbox (aliases: `debug`) |
| `apply` | Apply latest Codex diff via `git apply` (aliases: `a`) |
| `resume` | Resume a previous interactive session |
| `cloud` | Browse tasks from Codex Cloud and apply changes locally (experimental) |
| `features` | Inspect feature flags |
| `help` | Show help for commands |

## Global CLI options (codex --help)

| Flag | Description |
| --- | --- |
| `-c`, `--config <key=value>` | Override config values (dotted keys supported) |
| `--enable <feature>` | Enable feature flags (repeatable) |
| `--disable <feature>` | Disable feature flags (repeatable) |
| `-i`, `--image <file>...` | Attach image(s) to the initial prompt |
| `-m`, `--model <model>` | Select model |
| `--oss` | Use open-source provider (checks LM Studio or Ollama) |
| `--local-provider <lmstudio|ollama>` | Choose local provider when using `--oss` |
| `-p`, `--profile <name>` | Use a named config profile |
| `-s`, `--sandbox <mode>` | Set sandbox: `read-only`, `workspace-write`, `danger-full-access` |
| `-a`, `--ask-for-approval <policy>` | Set approval policy: `untrusted`, `on-failure`, `on-request`, `never` |
| `--full-auto` | Alias for `-a on-request` + `--sandbox workspace-write` |
| `--dangerously-bypass-approvals-and-sandbox` | Skip approvals and sandboxing (dangerous) |
| `-C`, `--cd <dir>` | Set working directory |
| `--search` | Enable built-in web search tool |
| `--add-dir <dir>` | Add additional writable roots |
| `-h`, `--help` | Show help |
| `-V`, `--version` | Show version |

## Non-interactive mode (codex exec)

```
codex exec [OPTIONS] [PROMPT] [COMMAND]
```

### `codex exec` subcommands

| Command | Purpose |
| --- | --- |
| `resume` | Resume a previous session by id or use `--last` |
| `review` | Run a code review against the current repository |
| `help` | Show help |

### `codex exec` options (codex exec --help)

| Flag | Description |
| --- | --- |
| `--skip-git-repo-check` | Allow running outside a Git repo |
| `--output-schema <file>` | JSON Schema for final response |
| `--json` | Stream JSONL events to stdout |
| `-o`, `--output-last-message <file>` | Write final response to file |
| `--color <always|never|auto>` | Output color handling |
| All global flags | `-c`, `-m`, `-s`, `-a`, `--full-auto`, etc. |

## Common flag combinations

```
# Run non-interactive with full-auto approvals and JSONL output
codex exec --full-auto --json "summarize this repo"

# Enforce a schema and save the final JSON output
codex exec --output-schema schema.json -o out.json "extract project details"

# Target a repo and add another writable directory
codex --cd ./frontend --add-dir ../backend "compare API interfaces"
```

## TUI slash commands (interactive)

From upstream `docs/slash_commands.md` (may vary by version):

| Command | Purpose |
| --- | --- |
| `/model` | Choose model and reasoning effort |
| `/approvals` | Set approval policy during session |
| `/review` | Review current changes for issues |
| `/new` | Start a new chat in the current session |
| `/resume` | Resume an old chat |
| `/init` | Create an `AGENTS.md` file |
| `/compact` | Summarize conversation to reduce context |
| `/undo` | Undo the last turn |
| `/diff` | Show git diff (including untracked files) |
| `/mention` | Mention a file |
| `/status` | Show session config and token usage |
| `/mcp` | List configured MCP tools |
| `/experimental` | Open the experimental menu |
| `/skills` | Browse and insert skills (experimental) |
| `/logout` | Log out of Codex |
| `/quit` | Exit Codex |
| `/exit` | Exit Codex |
| `/feedback` | Send logs to maintainers |

## Environment variables

| Variable | Usage |
| --- | --- |
| `OPENAI_API_KEY` | API key for standard CLI usage when not using ChatGPT login |
| `CODEX_API_KEY` | API key for `codex exec` only (overrides CLI login) |
| `AZURE_OPENAI_API_KEY` | API key when using Azure provider (if configured) |
| `RUST_LOG` | Enable debug logging (example: `RUST_LOG=codex_core=debug`) |
| `CODEX_HOME` | Base directory for config, logs, and history (default: `~/.codex`) |

## config.toml essentials

Config file: `~/.codex/config.toml` (or `$CODEX_HOME/config.toml`). Most commonly used keys:

| Key | Notes |
| --- | --- |
| `model` | Model name (e.g., `gpt-5.1-codex-max`) |
| `model_provider` | Provider id (default `openai`) |
| `approval_policy` | `untrusted`, `on-failure`, `on-request`, `never` |
| `sandbox_mode` | `read-only`, `workspace-write`, `danger-full-access` |
| `features.<name>` | Feature flags (`--enable`/`--disable` writes here) |
| `profiles.<name>.*` | Profile-specific overrides (used with `--profile`) |
| `mcp_servers.<id>.*` | MCP server config (`command`, `args`, `env`, `url`, `enabled`) |
| `history.persistence` | `save-all` or `none` |
| `history.max_bytes` | History file size limit before compaction |
| `tui.animations` | Toggle TUI animations |
| `tui.notifications` | Enable/disable desktop notifications |
| `project_doc_max_bytes` | Max bytes read from `AGENTS.md` |
| `experimental_instructions_file` | Replace built-in instructions (experimental) |
| `cli_auth_credentials_store` | `file`, `keyring`, or `auto` for credential storage |

For the full reference, see upstream config docs linked above.
