# Advanced Automation and SDK Track

Use this module as an add-on after the core labs. Focus: automation with `codex exec`, richer config, observability, execpolicy, MCP client setup, and a TypeScript SDK primer.

## Automation with `codex exec`
- Modes: default read-only; `--full-auto` to enable writes; `--sandbox` to set sandbox explicitly.
- Structured outputs: `--json` to stream events (`command_execution`, `file_change`, `mcp_tool_call`, `agent_message`) and `--output-schema` to enforce JSON schema for the final message.
- Resume: `codex resume --last "follow-up prompt"` keeps context; re-specify flags if needed.
- Lab idea: pipe JSONL to `jq` to count file changes:
  ```bash
  codex exec --json "add a comment to hello.py" | jq -c 'select(.item.type=="file_change")'
  ```
- Lab idea: schema-enforced output:
  ```bash
  cat > /tmp/schema.json <<'EOF'
  {"type":"object","properties":{"summary":{"type":"string"},"files":{"type":"array","items":{"type":"string"}}},"required":["summary","files"],"additionalProperties":false}
  EOF
  codex exec "summarize the repo" --output-schema /tmp/schema.json -o /tmp/out.json
  cat /tmp/out.json
  ```

## Config profiles and feature flags
- Profiles in `config.toml` let you swap defaults (models, approvals, sandbox, features).
- Example snippet (model names may change; check `codex --help` for current options):
  ```toml
  [profile.demo]
  model = "codex-max"  # or current default model
  ask_for_approval = true
  sandbox_mode = "workspace-write"
  [profile.demo.features]
  skills = true
  project_doc_fallback_filenames = ["TEAM_GUIDE.md"]
  ```
- Lab idea: run `codex --profile demo --enable skills --cd /tmp/repo` and confirm skills and fallback AGENTS are recognized.

## Execpolicy advanced
- Validate rules before use: `codex execpolicy check --rules ~/.codex/rules/training.rules --pretty git push origin main`
- Combine rule files with multiple `--rules` flags to see merged decisions.
- Example “deny network install” rule:
  ```starlark
  prefix_rule(
      pattern = [["npm", "pnpm", "yarn"], "install", ["--registry", "--fetch-retries"]],
      decision = "forbidden",
      match = [["npm", "install", "--registry", "https://example.com"]],
  )
  ```

## Observability and tracing
- Logs: `~/.codex/log/codex-tui.log`; set `RUST_LOG=codex_core=debug` for deeper traces. Tail during a session:  
  `RUST_LOG=codex_core=debug codex ...` in one terminal; `tail -F ~/.codex/log/codex-tui.log` in another.
- Lab idea: run a failing command, inspect the log tail, and correlate with `--json` events from `codex exec`.

## MCP client setup
- Configure servers in `config.toml` (see [MCP integration](https://github.com/openai/codex/blob/main/docs/config.md#mcp-integration)). Example:
  ```toml
  [[mcp_servers]]
  name = "example-tools"
  command = "npx"
  args = ["example-mcp-server"]
  ```
- After enabling, tools appear in Codex (TUI or exec). Mention timeouts if using MCP inspector with `codex mcp-server`.
- Lab idea: add a simple server, then ask Codex to list MCP tools and call one.

## TypeScript SDK quickstart

> **Note:** The SDK package name and API may change. Verify the current package at [npmjs.com/@openai](https://www.npmjs.com/search?q=%40openai%20codex) or the [official Codex SDK docs](https://github.com/openai/codex).

- Minimal session starter (illustrative; verify current API):
  ```ts
  // Package name subject to change - verify at npmjs.com/@openai
  import { CodexClient } from "@openai/codex-sdk";

  const client = new CodexClient({ apiKey: process.env.OPENAI_API_KEY! });

  async function run() {
    const session = await client.sessions.start({
      prompt: "Summarize src/app.ts",
      model: "codex-max",  // Use current default model
      approvalPolicy: "never",
      sandbox: "read-only",
    });

    for await (const event of session.events()) {
      if (event.type === "file_change") {
        console.log("Changed:", event.item?.path);
      }
      if (event.type === "agent_message") {
        console.log(event.item?.text);
      }
    }
  }
  run();
  ```
- Lab idea: adapt to enforce a schema on the final message, or filter for `command_execution` events to build a simple audit log.

## Where OpenAI Node SDK fits (optional)
- The `openai` Node SDK (https://github.com/openai/openai-node) targets the general API (chat, files, assistants). Use it if you need to orchestrate Codex CLI alongside other OpenAI platform calls (e.g., summarizing outputs, managing files, or coordinating with assistants).  
- For controlling Codex runs directly, prefer the Codex TypeScript SDK above; keep `openai` as a companion when you need broader platform features.
- If including in training, position it as a separate layer: “Codex SDK for runs; OpenAI SDK for surrounding platform workflows.”

## Prompts and slash commands
- Define custom prompts (`prompts.md`) or slash commands for repeated training actions (e.g., `/plan`, `/safety`, `/mcp-list`).
- Exercise: create a slash command that asks Codex to show a plan and diff before any writes.
