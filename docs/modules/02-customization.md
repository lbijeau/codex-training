# Module 2: Advanced Customization

> **⚠️ Advanced / API Focus**: This module covers customizing the OpenAI Codex **API**—prompt templates, function wrappers, and configuration for programmatic integrations. **If you're using Codex CLI**, most of this is handled automatically. Start with the [CLI hands-on training](../training/codex-cli-hands-on/README.md) instead. The template patterns (Section 1) are useful for CLI users; Sections 2-4 are API-specific.

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

**Without templates** (inconsistent, error-prone):
```
# Monday: "You're a helpful coder. Fix the bug in auth.py"
# Tuesday: "As an expert Python dev, please look at the login issue"
# Wednesday: "Debug authentication" (forgot safety constraints!)
```

**With templates** (consistent, versioned):
```bash
# Everyone uses the same template
python render_prompt.py --template bug_fix.md --file="auth.py" --issue="login fails"
# Template includes safety constraints, expected output format, available helpers
```

### Template best practices

**1. Keep the system message short and precise**
```markdown
# ❌ Too verbose
System: You are an incredibly helpful AI assistant that specializes in Python
programming and will help the user with any coding task they have...

# ✅ Concise
System: You are a Python debugging assistant. Be direct. Show diffs.
```

**2. Highlight expected artifacts**
```markdown
User: Fix {{issue}} in {{file}}.

Output format:
1. Root cause (1-2 sentences)
2. Fix as a diff
3. Test to verify the fix
```

**3. Include constraints**
```markdown
Constraints:
- Do NOT refactor unrelated code
- Do NOT modify files outside src/
- Maximum 50 lines changed
```

**4. Document available helpers**
```markdown
Available functions:
- read_file(path): Read file contents
- run_tests(target): Run pytest on target
- git_diff(): Show uncommitted changes

Use these instead of asking me to paste code.
```

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

## Next Steps
1. Create a prompt template for the feature you are working on
2. Add at least one helper function implementation to `codex_helpers/`
3. Update `codex_helpers/functions.json` and register the helper in your session script
