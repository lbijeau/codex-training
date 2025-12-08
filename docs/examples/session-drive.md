# Example: Codex Feature Workflow

This walkthrough demonstrates a complete Codex session that blends prompt templates, helper invocations, guard rails, and validation scripting.

## Step 1: Start with a prompt template
Use `docs/prompt_templates/feature-plan.md` (rendered via `scripts/template_builder.py`) to set the task:
```
System: You are a Codex engineer focused on code quality.
User: Analyze the "component refresh" change, gather TODOs, propose fixes, and tell me what tests to run.
```
Register `codex_helpers/functions.json` with the API so Codex can call `list_todos` and `run_tests`.

## Step 2: Gather structured data
Codex replies with a `function_call` to `list_todos`:
```json
{
  "name": "list_todos",
  "arguments": {"paths": ["docs/**/*.md"]}
}
```
Run `./codex_helpers/list_todos.py --paths "docs/**/*.md"` and return the JSON results as a `function` message.

## Step 3: Let Codex plan
With the TODOs in context, ask:
```
User: Based on the TODOs, suggest 3 prioritized fixes with helper steps.
```
Codex describes the plan and may call `run_tests` (functionically) to validate assumptions.

## Step 4: Execute and validate
After Codex outputs diffs, apply them manually. Run `./codex_helpers/run_tests.py --target tests/` when requested. Feed the test JSON back into Codex so it can confirm the fix.

## Step 5: Run static checks
Run `bash scripts/run_static_checks.sh practice/static-checks` before you finalize edits so you can highlight duplicated logic, complexity deltas, or forbidden imports. Capture the warnings in `docs/templates/static-analysis-report.md` and paste the key lines into your Codex prompt along with the helper findings.

## Step 6: Log and summarize
Capture the session using `scripts/post_session_logger.sh`. Run `scripts/helper_usage.sh` afterward to verify which helpers fired.

## Reflect
Document lessons in `docs/playbook/scenarios.md` (see the "Prompt Thread" scenario) and add new patterns to `docs/patterns/speed/parallel-execution.md` when you notice improvements.
