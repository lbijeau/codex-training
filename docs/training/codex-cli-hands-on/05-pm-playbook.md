# PM / Trainer Playbook

Use this to evaluate sessions and coach learners. Focus on safety, clarity, and reproducibility rather than AI cleverness.

Session checklist:
- Was the workdir correct and visible? Did the learner confirm writable roots?
- Were approvals required for writes? Did the learner explain why each approval was granted?
- Did the learner keep commands minimal and review diffs before applying?
- Was an exit/resume flow demonstrated (e.g., `codex resume --last`)?
- Did the learner validate outputs (run tests, inspect files) rather than trust them?

Prompting heuristics:
- Ask for intent + constraints: “Add X, but do not touch Y; use pytest.”
- Keep scopes tight; avoid multi-request prompts that hide risks.
- Request diffs and planned commands before applying: “show me the plan and the diff.”
- Encourage “decline and revise” when Codex proposes risky commands.

Quality review prompts:
- “What commands will you run? Why are they safe here?”
- “How do we undo this if it goes wrong?” (Expect git or file backup answers.)
- “What verification will you run after the change?”
- “Which instructions would you add to AGENTS.md for this repo?”

Risk patterns to flag:
- Broad file writes without diffs; deleting directories; running package managers unnecessarily.
- Ambiguous workdir or multi-repo confusion without `--add-dir`.
- Missing approvals when policy expects them.
- No tests run after code changes; reliance on AI assertions only.

Outcome rubric:
- **Green:** approvals used, diffs reviewed, commands explained, tests/validation run.  
- **Yellow:** approvals used but weak validation; prompts too broad.  
- **Red:** unsafe commands approved, no validation, unclear workdir/scope.

Next-step recommendations:
- Add AGENTS.md with repo-specific guardrails.
- Define an execpolicy for high-sensitivity repos.
- Introduce MCP servers only after core workflows feel solid.
