# Codex CLI Hands-on Training Track

Audience: new Codex CLI users (engineers) and product managers/trainers who need to guide or evaluate sessions. Format emphasizes practical labs with optional Jupyter integration.

## Modules (suggested order, ~90 minutes total)

- [01 Orientation](01-orientation.md) — goals, success criteria, what to expect.
- [02 Setup](02-setup.md) — install/auth/config, approvals/sandboxing checks, environment prep.
- [03 CLI Labs](03-cli-labs.md) — core hands-on labs for interactive TUI and `codex exec`.
- [04 Jupyter Lab](04-jupyter-lab.md) — companion workflow for using Codex alongside notebooks.
- [05 PM Playbook](05-pm-playbook.md) — heuristics and checklists for PMs/trainers running sessions.
- [06 Architecture and Concepts](06-architecture-and-concepts.md) — architecture deep dive, AGENTS/skills, MCP, sandbox/approvals.
- [07 Advanced Automation and SDK](07-advanced-automation-and-sdk.md) — exec automation, profiles/flags, execpolicy, observability, MCP client setup, TypeScript SDK primer.
- [Repo Review Findings](repo-review-findings.md) — upstream repo observations informing the training design.
- [Examples](examples/) — demo AGENTS and execpolicy files with usage instructions.

## Agenda (60–90 minutes)

- 5 min: [01 Orientation](01-orientation.md) and success criteria.
- 10–15 min: [02 Setup](02-setup.md) and approvals/sandbox checks.
- 25–30 min: [03 CLI Labs](03-cli-labs.md) with a small repo.
- 10 min: [05 PM Playbook](05-pm-playbook.md) discussion and wrap-up.
- 10–20 min: [06 Architecture and Concepts](06-architecture-and-concepts.md) plus [07 Advanced Automation and SDK](07-advanced-automation-and-sdk.md) for deeper dives.
- Optional +20–30 min: [04 Jupyter Lab](04-jupyter-lab.md) for notebook workflows.

## Facilitator Checklist

- Confirm `codex` is installed and `codex login` works on the demo machine.
- Pick a small, disposable repo for labs (toy app, kata, or sandbox repo).
- Keep approvals/sandboxing visible (use `--ask-for-approval on-request`).
- Decide whether to include the Jupyter lab and prep the notebook.
- Review `examples/` to show AGENTS/execpolicy patterns quickly.
- Plan a short debrief using the PM playbook checklist.

## Recommended Stopping Points

- After Module 03 for a focused 60-minute session.
- After Module 05 if the audience is mostly PMs/trainers.
- After Module 06 for a deeper technical session without automation.
- After Module 07 for the full end-to-end track.
