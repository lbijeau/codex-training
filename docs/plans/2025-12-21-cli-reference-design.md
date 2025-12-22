# CLI Reference Design

## Goal
Provide a comprehensive, skimmable CLI/TUI reference for the Codex CLI training track without bloating the setup guide.

## Decision
Create a standalone reference page at `docs/training/codex-cli-hands-on/cli-reference.md` and add a prominent link from `docs/training/codex-cli-hands-on/02-setup.md`.

## Scope
- CLI commands and flags (from `codex --help` and official docs)
- TUI slash commands
- Examples for common flag combinations and usage patterns
- Environment variables (`CODEX_API_KEY`, `OPENAI_API_KEY`, `RUST_LOG`, etc.)
- Config file reference (`~/.codex/config.toml`), including profiles and MCP server configuration

## Structure
1. Overview and versioning note (CLI version tested, potential drift)
2. CLI usage synopsis and subcommands (`codex`, `codex exec`, `codex resume`)
3. Comprehensive flags reference (table)
4. TUI slash commands reference (table)
5. Examples (single flags, combinations, `exec --json`)
6. Environment variables reference
7. Config file reference
8. Notes on differences or gaps between help output and docs

## Sources
- Local `codex --help` output (preferred)
- Official CLI and config docs for additional details

## Testing
Doc-only change; verify via review and optional docs linting if available.
