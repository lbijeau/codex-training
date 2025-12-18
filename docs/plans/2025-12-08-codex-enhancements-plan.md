# Codex Enhancement Suite Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add examples, scripts, and templates that demonstrate working Codex sessions, helper operational tooling, and doc templates so the training repo has runnable artifacts supporting the narrative.

**Architecture:** Build three pillars: (1) example artifacts combining prompts and helper calls plus a helper usage dashboard and context sync scripts that keep `.codex/context.md` fresh, (2) a template-generator utility for prompts and a helper README template to document new functions, (3) documentation templates (prompt reviews, testing narratives) that tie the helper usage into the playbook and pattern library. Each pillar includes runnable scripts (Bash/Python) and Markdown docs describing how to use them.

**Tech Stack:** Bash/Python scripts, Markdown templates, `rg`/`python3` for file generation, log parsing.

### Task 1: Create runnable session example and helper catalog documentation

**Files:**
- Create: `docs/maintainers/playbook/scenarios.md`, `docs/helpers/README.md`
- Modify: `codex_helpers/README.md`
- Test: `scripts/helper_usage.sh`

**Step 1: Draft a session narrative MD that walks through prompt → helper → response sequence**
- Detail prompts, helper invocations, expected helper output, and follow-up response style.

**Step 2: Expand `codex_helpers/README.md` to include usage examples and mention new scripts/templates**

**Step 3: Add `scripts/helper_usage.sh` that reads `logs/session_history.log`, counts helper invocations, and prints a summary table

**Step 4: Run the helper usage script (no automated tests)

**Step 5: Note the example in playbook/pattern references**

### Task 2: Build automation scripts for context syncing and template rendering

**Files:**
- Create: `scripts/update_context.sh`, `scripts/template_builder.py`, `docs/maintainers/prompt_templates/README.md`
- Test: run the scripts manually

**Step 1: `update_context.sh` should gather git status, TODOs (via helper), and selected pattern summaries into `.codex/context.md`

**Step 2: `template_builder.py` renders prompt templates with placeholders and records used helpers

**Step 3: Document the prompt template workflow in `docs/maintainers/prompt_templates/README.md`

### Task 3: Provide new documentation templates for helper reviews and testing narratives

**Files:**
- Create: `docs/maintainers/templates/helper-doc-template.md`, `docs/maintainers/templates/prompt-review.md`, `docs/maintainers/templates/testing-report.md`
- Modify: `docs/maintainers/playbook/scenarios.md` to reference the templates
- Test: Demonstrate template usage (manual)

**Step 1: Build helper doc template describing schema, validation scripts, examples

**Step 2: Create prompt-review checklist template for evaluating prompts and helper coverage

**Step 3: Add testing-report template that records helper calls, tests run, results

**Step 4: Link these templates into the playbook and mention them in the new session example

### Task 4: Verification & Documentation

**Checks:**
- `rg -n 'helper_usage.sh|update_context.sh|template_builder.py|helper-doc-template' docs` show new files
- `bash scripts/helper_usage.sh` runs without error (prints summary)
- `bash scripts/update_context.sh` updates `.codex/context.md`
- `python scripts/template_builder.py` renders a sample prompt file
- `git status --short` only shows intended files
