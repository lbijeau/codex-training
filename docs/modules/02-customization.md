# Module 2: Advanced Customization

## Overview

OpenAI Codex is programmable through the way you build prompts, register helper functions, and operate outside the model. This module teaches you how to craft reusable prompt templates, wrap helper scripts as functions, and build a configuration that keeps your sessions consistent.

**Learning Objectives**:
- Create prompt templates that capture your team’s tone and constraints
- Register helper functions instead of assuming built-in skills or slash commands
- Design guard rails for unsafe operations (validation, logging, rate limits)
- Maintain a small configuration that documents trusted helpers and prompts

**Time**: 3-4 hours

---

## 1. Prompt Templates & Reusable Instructions

Because every Codex session starts from scratch, save the prompts you use frequently in a template library. Store them in `docs/prompt_templates/` (or `.codex/prompts/`) with placeholders for the task-specific pieces.

### Template structure example
```
# docs/prompt_templates/feature_request.md
System: You are Codex, a senior engineer helper.
User: I want to {{task}}. First, summarize the current issue, then propose the top three steps and the reason each is necessary.
```
Use a small templating script:
```bash
python helpers/render_prompt.py --template feature_request.md --task "refactor cache invalidation"
```
The renderer replaces `{{task}}` with the provided value, so sessions stay consistent.

### Why templates matter
- Prevents you from rewriting the same instruction each time
- Keeps tone and expectations uniform across teammates
- Lets you version prompts alongside code changes
- Makes it easy to rerun older sessions by reusing the template

### Template best practices
1. Keep the system message short and precise
2. Highlight the expected artifacts (summary, plan, tests)
3. Include constraints (time limit, safety boundaries)
4. Document which helper functions are available for the template

---

## 2. Function Wrappers Instead of Skills

Some platforms expose named skills and slash commands, but Codex expects you to implement those capabilities as helper functions and expose them via the `functions` parameter.

### Catalog your helpers
Create a manifest file (`codex_helpers/functions.json`) listing each helper’s schema:
```json
[
  {
    "name": "lint_code",
    "description": "Run the linter and return issues",
    "parameters": {
      "type": "object",
      "properties": {
        "paths": {
          "type": "array",
          "items": {"type": "string"}
        }
      },
      "required": ["paths"]
    }
  }
]
```
Every session loads this manifest and registers the functions with the API.

### Example helper implementation
```python
def lint_code(paths: list[str]) -> str:
    result = subprocess.run(["eslint"] + paths, capture_output=True, text=True)
    return json.dumps({"status": result.returncode, "output": result.stdout})
```
After running the helper, send its output back as a `function` message so Codex can reason over it.

### Replacement for slash commands
- Slash commands become shell scripts you run before/after a request.
- For example, `./scripts/plan_feature.sh` could gather git status, render a prompt template, and launch the session.
- Document these scripts in `README.md` or `docs/scripts.md` so teammates know what they do.

---

## 3. Guard Rails & Policies

Since the Codex API can generate anything you feed it, lock risky operations behind helpers:
- Validate arguments before running tests or editing files
- Encode policies (e.g., “never delete production data”) in helpers, not in prompts
- Log every invocation (who requested, which helper, what response)
- Track rate limits and throttle requests as needed

Example guard rail:
```python
def run_tests(target: str) -> dict:
    if target.startswith("/etc"):
        raise ValueError("Refusing to run tests on system directories")
    ...
```
Never expose the validation logic to Codex; keep it in the helper implementation.

---

## 4. Configuration & Context Files

Keep a lightweight configuration for your Codex sessions:
```
.codex/
├── prompts/              # Optional folder of prompt fragments
├── functions.json        # Manifest of helper functions
├── context.md           # Summary you prepend to every session
└── hooks/                # Scripts to run before/after sessions
```
Example `context.md`:
```
Project: Codex Training
Primary stack: Python + React
Current module: Module 2
```
Include the context file at the start of every session (`prefill_context.py --file .codex/context.md`). This mirrors the context-injection pattern but now lives in a file you control.

### Hooks you can build
- `session_start.sh`: prints the current git status
- `before_request.py`: ensures your helpers are registered
- `after_response.py`: archives the conversation for audit
These scripts run outside the API; Codex never executes them directly.

---

## 5. Documenting Customization Patterns

Add a subsection to `docs/playbook/index.md` describing how to:
1. Update the prompt template library
2. Register new helper functions
3. Run the wrapper scripts (e.g., `./scripts/start_session.sh`)
4. Validate function responses

For example, a playbook entry might look like:
```
Scenario: I need to refactor a component
Approach:
- Use `feature_refactor.md` template
- Call `list_todos` helper to gather open tasks
- After Codex suggests edits, run `run_tests`
```

---

## Next Steps
1. Create a prompt template for the feature you are working on
2. Add at least one helper function implementation to `codex_helpers/`
3. Update `codex_helpers/functions.json` and register the helper in your session script
4. Document the new helper in the playbook so teammates can reuse it
