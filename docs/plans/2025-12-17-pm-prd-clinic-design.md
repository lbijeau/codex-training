# PM/PO PRD Clinic Training Design

## Purpose
Create a short, practical training track that helps PMs and POs move from web-based LLM chat to Codex CLI for drafting PRDs with repo context. The primary outcomes are:
- confident use of the CLI for PRD drafting and refinement
- ability to follow structured workflows without writing code
- improved prompt quality and collaboration readiness with engineers

## Scope
This track focuses on PRD artifacts only. It intentionally excludes implementation planning, engineering task breakdown, or deep code changes. The deliverables are updated PRD files inside the repo with clear evidence of repo context usage.

## Structure
Recommended format: a "PRD Clinic" mini-track with 3 to 5 short modules (20 to 30 minutes each). Each module produces a concrete PRD section in a workspace file (for example `practice/pm-prd/`).

Proposed modules:
1. Problem statement grounded in repo evidence
2. Goals, non-goals, and constraints
3. Scope and acceptance criteria
4. Risks, dependencies, and open questions
5. Optional peer review checklist and iteration

## Learning Flow
Each module follows a consistent pattern:
1. Why it matters (2 to 3 bullets)
2. What good looks like (short example excerpt)
3. Do this in the CLI (step-by-step commands and prompts)
4. Your turn (guided exercise)
5. Self-check (short checklist)

## Components
- PRD template in `docs/exercises/pm-prd/prd-template.md`
- Exercise guides in `docs/exercises/pm-prd/`
- Sample inputs in `docs/exercises/pm-prd/inputs/` to ensure training works even with sparse repo context
- Workspace target in `practice/pm-prd/` for learner output
- Rubric and checklist to validate outcomes quickly

## Data Flow
Inputs are repo artifacts such as README content, existing PRDs, and issue summaries. Outputs are edits to a PRD file. Learners should cite sources for each major claim to reinforce evidence-based drafting and highlight the CLI advantage of working directly with files.

## Evaluation
A PRD is considered complete when it includes:
- problem statement
- goals and non-goals
- scope and acceptance criteria
- risks and dependencies
- open questions
- citations to at least one repo source per major claim

Use a simple rubric with four dimensions: clarity, evidence, scope discipline, and actionability. Include a short reflection prompt to reinforce the CLI value over web chat.

## Risks and Mitigations
- Cognitive overload: limit CLI actions to a small, repeatable set (read file, edit file, summarize, refine).
- Generic outputs: require citations and provide a checklist for evidence.
- Weak repo context: provide synthetic inputs in the exercise folder.

## Success Criteria
- 80% of participants complete a full PRD section within the module timebox.
- Participants report increased confidence using the CLI instead of web chat.
- Peer reviewers can validate outputs using the provided checklist and rubric.
