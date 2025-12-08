# Codex Helpers

This directory houses helper scripts that Codex can invoke via function calling.

## Current helpers
- `list_todos(paths)` – returns TODO comments from the provided paths.
- `run_tests(target)` – runs `pytest` (or a subset) and emits JSON with stdout/stderr/return code.

## Registering functions
1. Keep the JSON schema for each helper in `functions.json` (name, description, parameter types).
2. When starting a session, load `functions.json` and pass it as the `functions` argument when you call the OpenAI Chat Completion API.
3. Each helper should be executable (see `list_todos.py` and `run_tests.py`) and return JSON that Codex can reason about.

## Running helpers locally
Invoke helpers directly for testing:
```
./codex_helpers/list_todos.py --paths 'docs/**/*.md'
./codex_helpers/run_tests.py --target tests/
```

## Logging & safety
- Wrap any destructive helpers with validation scripts (see `scripts/validate_ranges.py`).
- Log every helper invocation using `scripts/post_session_logger.sh` so you can trace what Codex asked for.
