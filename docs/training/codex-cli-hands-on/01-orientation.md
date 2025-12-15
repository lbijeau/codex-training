# Orientation

Objectives:
- Get comfortable launching Codex CLI and understanding what it can and cannot do.
- Learn the core safety model (sandboxing, approvals) and how to keep control.
- Set expectations for session flow, deliverables, and success checks.

What Codex CLI is (per `../codex/README.md`):
- Local coding agent that reads/writes your workspace, with optional MCP servers.
- Interactive TUI (`codex`), prompt-seeded runs (`codex "..."`), and automation mode (`codex exec`).
- Honors `AGENTS.md` memory, approval policies, and sandbox settings from the host.

What this training is *not*:
- It does not teach general AI prompting; it assumes basic prompt literacy.
- It does not cover Codex Web; focus stays on the CLI.
- It does not include IDE extensions; you stay in terminal + editor.

Success criteria for learners:
- Can install and sign in (ChatGPT login or API key fallback) and verify with a simple prompt.
- Can run at least two interactive labs and one `codex exec` automation without assistance.
- Can explain how approvals and sandboxing affect command execution.
- Can describe when to use AGENTS.md and when to adjust config flags (e.g., `--cd`, `--add-dir`).

Success criteria for PMs/trainers:
- Can evaluate if a learner kept safety prompts visible, justified approvals, and validated outputs.
- Can run the PM playbook questions to probe understanding of risks and best practices.
- Can map session outcomes to next steps (e.g., adding MCP servers, setting execpolicy).
