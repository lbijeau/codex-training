# Codex CLI Hands-on Training Track

Audience: new Codex CLI users (engineers) and product managers/trainers who need to guide or evaluate sessions. Format emphasizes practical labs with optional Jupyter integration.

Modules (suggested order, ~90 minutes total):
- `01-orientation.md` — goals, success criteria, what to expect.
- `02-setup.md` — install/auth/config, approvals/sandboxing checks, environment prep.
- `03-cli-labs.md` — core hands-on labs for interactive TUI and `codex exec`.
- `04-jupyter-lab.md` — companion workflow for using Codex alongside notebooks.
- `05-pm-playbook.md` — heuristics and checklists for PMs/trainers running sessions.
- `06-architecture-and-concepts.md` — architecture deep dive, AGENTS/skills, MCP, sandbox/approvals.
- `07-advanced-automation-and-sdk.md` — exec automation, profiles/flags, execpolicy, observability, MCP client setup, TypeScript SDK primer.
- `repo-review-findings.md` — upstream repo observations informing the training design.
- `examples/` — demo AGENTS and execpolicy files with usage instructions.

How to run this track:
- Allocate 60–90 minutes; add 20–30 more if doing the Jupyter lab live.
- Use a small, disposable repo for labs (e.g., a toy script or kata) to avoid risk.
- Keep Codex approvals/sandboxing visible so learners see how safety works.
- Close with PM-playbook discussion to reinforce evaluation skills.
