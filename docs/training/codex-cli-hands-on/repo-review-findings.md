# Repo Review Findings (Codex CLI)

Target for this training: enable new Codex CLI users and PM/trainer audiences to run hands-on sessions confidently (install → safety → interactive labs → automation → Jupyter companion), with clear evaluation heuristics.

Evidence (from `../codex`):
- `README.md` highlights install commands, interactive TUI, `codex exec`, and links to docs.
- `docs/getting-started.md` covers CLI usage, resume flows, prompt-seeded runs, and tips (`--cd`, `--add-dir`, shell completions, image input).
- `docs/authentication.md` explains ChatGPT login vs API key and headless flows.
- `docs/config.md` details config file and MCP server setup.
- `docs/sandbox.md` and `docs/execpolicy.md` describe sandboxing, approvals, and policy rules.
- Documentation is comprehensive but leans reference-style; limited “do this now” lab scripts and no Jupyter pairing guidance.

Gap table (criterion → current → target → delta):
- Hands-on labs: Reference docs only → Need concrete lab scripts with prompts, approvals, validation → Missing structured labs.
- Jupyter workflow: No notebook pairing guidance → Need step-by-step Codex + notebook workflow with safety notes → Missing entirely.
- PM evaluation: No quick rubric → Need checklists and risk prompts for trainers/PMs → Missing rubric.
- Training packaging: Scattered docs → Need cohesive module path with timebox → Missing single-track packaging.

Root causes (5 Whys summary):
- Docs optimized for breadth, not curricula → New users lack a guided path.
- Safety model documented but not rehearsed → Approvals/sandboxing stay theoretical.
- Automation mode (`codex exec`) is documented but not practiced → Learners may overlook scripting value.
- Notebook users common in data workflows → No companion guidance leads to ad hoc, riskier usage.

Prioritized actions (impact × confidence ÷ effort):
1) Add modular hands-on labs (High impact, High confidence, Low–Med effort).  
2) Add Jupyter-oriented lab (Med impact, Med confidence, Med effort).  
3) Add PM/trainer playbook (Med impact, High confidence, Low effort).  
4) Package modules with timing and run guidance (Med impact, High confidence, Low effort).

Implemented in this repo:
- New training directory `docs/training/codex-cli-hands-on/` with modules for setup, CLI labs, Jupyter lab, and PM playbook.
- Lab scripts emphasize approvals, diffs, and validation to operationalize the safety model.
- Jupyter lab gives a minimal pairing workflow without overpromising notebook introspection.
- Architecture module covers AGENTS/skills, MCP client/server roles, sandbox/approvals, and observability.
- Advanced automation/SDK module adds exec JSON/schema usage, profiles/feature flags, execpolicy checks, MCP client setup, and TypeScript SDK primer.
