# Demo Assets: AGENTS and Execpolicy

Use these samples during training to show how repo guardrails work. They are **opt-in** and not auto-loaded; copy them where you want them.

## AGENTS demo
- File: `AGENTS.demo.md`
- How to use: copy or symlink to your repo root as `AGENTS.md` before starting Codex:
  ```bash
  cp docs/training/codex-cli-hands-on/examples/AGENTS.demo.md ./AGENTS.md
  ```
- Remove after the session to avoid lingering constraints.

## Execpolicy demo
- File: `training.rules`
- How to use:
  ```bash
  mkdir -p ~/.codex/rules
  cp docs/training/codex-cli-hands-on/examples/training.rules ~/.codex/rules/
  # Optionally preview:
  codex execpolicy check --rules ~/.codex/rules/training.rules ls -la
  ```
- Codex loads all `.rules` files in `~/.codex/rules` at startup. Delete or move the file to disable it after the demo.

Recommended flow for the demo:
1) Show AGENTS content to explain instruction stacking.
2) Start Codex; highlight the detected AGENTS instructions.
3) Trigger a command that matches a `prompt` rule to show execpolicy enforcement.
4) Clean up: remove `AGENTS.md` and the rules file.
