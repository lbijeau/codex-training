# Codex Docs Rewrite Plan

**Goal:** Ensure the training materials describe what OpenAI Codex actually offers—function calling, helper scripts, prompt templates, and summary workflows—so every module/exercise aligns with the current toolset.

**Architecture:** The work touches three layers:
1. `docs/modules/01-internals.md` becomes a primer on chat sessions, function-calling flows, and context management.
2. `docs/modules/02-customization.md` plus the Module 1 exercises pivot from hypothetical agents to prompt templates, helper manifests, and validation scripts.
3. Companion docs (`README.md`, `GETTING_STARTED.md`, `RESOURCES.md`, `PROGRESS.md`, `docs/maintainers/playbook`, `docs/maintainers/patterns`, `.codex-examples`, `docs/plans`) are updated so the narrative consistently highlights Codex-native workflows.

## Tasks

### Task 1: Audit legacy terminology

**Steps**:
1. Search for references to the older agent-style vocabulary across the docs, exercises, and plans.
2. List the affected sections and the keywords they still use.
3. Use the list to batch edits so we can remove the outdated language consistently.

### Task 2: Rebuild Module Core Content

**Files to modify**: `docs/modules/01-internals.md`, `docs/modules/02-customization.md`, `docs/modules/03-speed.md`, `docs/exercises/01-internals/exercise-3.md`, `docs/exercises/01-internals/exercise-5.md`, `docs/exercises/02-customization/README.md`

**Steps**:
1. Replace sections that described the old agent-style model with function calling prompts, helper wrappers, and context budgeting advice.
2. Adjust Module 2 exercises so they teach prompt templates, helper manifests, validation scripts, and session scripts.
3. Rewrite Module 3 patterns to frame speed as parallel requests, prompt pipelines, and helper coordination instead of multi-agent scaling.
4. Confirm each file no longer references the deprecated terminology by rerunning the same searches.

### Task 3: Align Supporting Docs

**Files**: `README.md`, `GETTING_STARTED.md`, `RESOURCES.md`, `PROGRESS.md`, `docs/maintainers/playbook/checklists.md`, `.codex-examples/README.md`, `.codex-examples/config.json`, `docs/maintainers/patterns/speed/*`, `docs/modules/06-domain.md`, `docs/modules/07-collaboration.md`, `docs/modules/08-integration.md`, `docs/plans/2025-12-07-codex-code-mastery-program-design.md`, `docs/plans/2025-12-07-codex-training-setup.md`

**Steps**:
1. Update narratives to mention prompt templates, helper functions, logging scripts, validation steps, and session summaries.
2. Remove any references to the older agent-style vocabulary.
3. Add new sections that describe how to build guard rails, register helper schemas, and coordinate prompts.
4. Adjust plan summaries and checklists so they read cohesively with the new content.

### Task 4: Verification & Cleanup

**Checks**:
- Run the legacy-term search command again to ensure nothing remains.
- `rg -n 'Codex Code' README.md GETTING_STARTED.md RESOURCES.md` should show the new theme.
- `rg -n '\.codex' docs` should verify `.codex` mentions make sense.
- `git status --short` should reflect only the intended changes.
