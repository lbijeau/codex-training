# Exercise 2: Multi-Tool Orchestration

## Objective

Learn to design and implement workflows that coordinate multiple tools for complex tasks.

## Background

Real-world Codex workflows often require orchestrating multiple tools: file readers, test runners, linters, API clients, and more. This exercise teaches you to compose these tools into coherent workflows.

## Part A: Identify Workflow Ingredients

**Task**: Map the components needed for a feature delivery workflow.

1. List the tools you might use:
   ```markdown
   ## Workflow Ingredient Inventory

   ### Information Gathering
   - [ ] File reading (code, docs, config)
   - [ ] Code search (grep, ripgrep)
   - [ ] Git history analysis
   - [ ] Issue/PR context (gh)

   ### Validation
   - [ ] Linter (eslint, flake8)
   - [ ] Type checker (tsc, mypy)
   - [ ] Test runner (jest, pytest)
   - [ ] Security scanner

   ### Output
   - [ ] Code generation
   - [ ] Documentation updates
   - [ ] PR creation
   - [ ] Changelog generation
   ```

2. For each tool, define:
   - Input format
   - Output format
   - Success/failure signals
   - Typical execution time

## Part B: Build Helper Functions

**Task**: Create reusable helper functions for your workflow.

1. Create a helpers directory:
   ```bash
   mkdir -p codex_helpers
   ```

2. Build a file reader helper:
   ```python
   # codex_helpers/read_files.py
   import json
   import sys
   from pathlib import Path

   def read_files(patterns: list[str]) -> dict:
       """Read files matching patterns and return content."""
       result = {
           "success": True,
           "files": {},
           "errors": []
       }

       for pattern in patterns:
           for path in Path(".").glob(pattern):
               try:
                   result["files"][str(path)] = path.read_text()
               except Exception as e:
                   result["errors"].append(f"{path}: {e}")

       result["success"] = len(result["errors"]) == 0
       return result

   if __name__ == "__main__":
       patterns = sys.argv[1:] or ["*.md"]
       print(json.dumps(read_files(patterns), indent=2))
   ```

3. Build a test runner helper:
   ```python
   # codex_helpers/run_tests.py
   import json
   import subprocess
   import sys

   def run_tests(test_path: str = "") -> dict:
       """Run tests and return structured results."""
       cmd = ["npm", "test"]
       if test_path:
           cmd.append(test_path)

       try:
           result = subprocess.run(
               cmd,
               capture_output=True,
               text=True,
               timeout=300
           )

           return {
               "success": result.returncode == 0,
               "stdout": result.stdout,
               "stderr": result.stderr,
               "exit_code": result.returncode
           }
       except subprocess.TimeoutExpired:
           return {
               "success": False,
               "error": "Tests timed out after 5 minutes"
           }
       except Exception as e:
           return {
               "success": False,
               "error": str(e)
           }

   if __name__ == "__main__":
       test_path = sys.argv[1] if len(sys.argv) > 1 else ""
       print(json.dumps(run_tests(test_path), indent=2))
   ```

4. Build a diff validator:
   ```python
   # codex_helpers/validate_diff.py
   import json
   import subprocess
   import sys

   SENSITIVE_PATTERNS = [
       ".env",
       "credentials",
       "secrets",
       "password",
       "api_key"
   ]

   def validate_diff(base: str = "main") -> dict:
       """Check diff for sensitive file changes."""
       result = subprocess.run(
           ["git", "diff", "--name-only", base],
           capture_output=True,
           text=True
       )

       changed_files = result.stdout.strip().split("\n")
       warnings = []

       for file in changed_files:
           for pattern in SENSITIVE_PATTERNS:
               if pattern in file.lower():
                   warnings.append(f"Sensitive file modified: {file}")

       return {
           "success": len(warnings) == 0,
           "changed_files": changed_files,
           "warnings": warnings,
           "file_count": len(changed_files)
       }

   if __name__ == "__main__":
       base = sys.argv[1] if len(sys.argv) > 1 else "main"
       print(json.dumps(validate_diff(base), indent=2))
   ```

## Part C: Create a Function Manifest

**Task**: Document your helpers for integration.

1. Create a functions manifest:
   ```json
   // codex_helpers/functions.json
   {
     "functions": [
       {
         "name": "read_files",
         "description": "Read files matching glob patterns",
         "parameters": {
           "type": "object",
           "properties": {
             "patterns": {
               "type": "array",
               "items": { "type": "string" },
               "description": "Glob patterns to match files"
             }
           },
           "required": ["patterns"]
         },
         "returns": {
           "type": "object",
           "properties": {
             "success": { "type": "boolean" },
             "files": { "type": "object" },
             "errors": { "type": "array" }
           }
         }
       },
       {
         "name": "run_tests",
         "description": "Run test suite and return results",
         "parameters": {
           "type": "object",
           "properties": {
             "test_path": {
               "type": "string",
               "description": "Optional specific test file to run"
             }
           }
         },
         "returns": {
           "type": "object",
           "properties": {
             "success": { "type": "boolean" },
             "stdout": { "type": "string" },
             "stderr": { "type": "string" }
           }
         }
       },
       {
         "name": "validate_diff",
         "description": "Validate git diff for sensitive changes",
         "parameters": {
           "type": "object",
           "properties": {
             "base": {
               "type": "string",
               "default": "main",
               "description": "Base branch to compare against"
             }
           }
         },
         "returns": {
           "type": "object",
           "properties": {
             "success": { "type": "boolean" },
             "warnings": { "type": "array" },
             "changed_files": { "type": "array" }
           }
         }
       }
     ]
   }
   ```

## Part D: Compose a Complete Workflow

**Task**: Orchestrate helpers into a feature delivery workflow.

1. Create a session start script:
   ```bash
   #!/bin/bash
   # scripts/session_start.sh

   echo "=== Codex Session Context ==="
   echo ""

   echo "## Git Status"
   git status --short

   echo ""
   echo "## Recent Commits"
   git log --oneline -5

   echo ""
   echo "## Open TODOs"
   grep -r "TODO" --include="*.ts" --include="*.js" -c 2>/dev/null || echo "None found"

   echo ""
   echo "## Test Status"
   npm test 2>&1 | tail -5

   echo ""
   echo "## Available Helpers"
   ls codex_helpers/*.py 2>/dev/null | xargs -I {} basename {} .py
   ```

2. Create a feature delivery workflow:
   ```bash
   #!/bin/bash
   # scripts/feature_workflow.sh

   set -e

   echo "Step 1: Gathering context..."
   python codex_helpers/read_files.py "src/**/*.ts" > /tmp/context.json

   echo "Step 2: Running tests..."
   python codex_helpers/run_tests.py > /tmp/test_results.json

   echo "Step 3: Validating changes..."
   python codex_helpers/validate_diff.py > /tmp/validation.json

   # Check validation result
   if [ "$(jq .success /tmp/validation.json)" = "false" ]; then
       echo "⚠️  Validation warnings:"
       jq -r '.warnings[]' /tmp/validation.json
       read -p "Continue anyway? (y/n) " answer
       [ "$answer" != "y" ] && exit 1
   fi

   echo "Step 4: Creating PR..."
   gh pr create --title "feat: $1" --body "$(cat <<EOF
   ## Summary
   $2

   ## Validation
   - Tests: $(jq .success /tmp/test_results.json)
   - Files changed: $(jq .file_count /tmp/validation.json)

   🤖 Generated with Codex workflow
   EOF
   )"

   echo "✅ Workflow complete!"
   ```

---

## Hints

<details>
<summary>Hint 1: JSON everywhere</summary>

Use JSON for all helper outputs:
- Machine-readable
- Easy to parse with `jq`
- Consistent structure
- Composable

```bash
python helper.py | jq '.success'
```
</details>

<details>
<summary>Hint 2: Fail fast, fail clearly</summary>

Each helper should:
- Return success/failure status
- Include error details
- Exit with proper codes
- Never silently fail

```python
return {
    "success": False,
    "error": "Specific error message",
    "details": {...}
}
```
</details>

<details>
<summary>Hint 3: Logging for debugging</summary>

Add logging to trace workflow execution:
```python
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info(f"Starting helper with args: {args}")
```
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Workflow Composition Principles

1. **Single Responsibility**: Each helper does one thing
2. **Consistent Interface**: All return JSON with `success` field
3. **Error Propagation**: Failures bubble up clearly
4. **Statelessness**: Helpers don't store state between calls

### Complete Feature Workflow

```
┌─────────────────┐
│ session_start   │ → Gather context
└────────┬────────┘
         ↓
┌─────────────────┐
│  read_files     │ → Load relevant code
└────────┬────────┘
         ↓
┌─────────────────┐
│  [Codex edits]  │ → Make changes
└────────┬────────┘
         ↓
┌─────────────────┐
│  run_tests      │ → Verify changes
└────────┬────────┘
         ↓
┌─────────────────┐
│ validate_diff   │ → Safety check
└────────┬────────┘
         ↓
┌─────────────────┐
│  gh pr create   │ → Submit work
└─────────────────┘
```

### Advanced Orchestration Pattern

```python
# codex_helpers/orchestrator.py
import json
from pathlib import Path
import subprocess

class WorkflowOrchestrator:
    def __init__(self):
        self.results = {}
        self.errors = []

    def run_helper(self, name: str, *args) -> dict:
        """Run a helper and store results."""
        cmd = ["python", f"codex_helpers/{name}.py", *args]
        result = subprocess.run(cmd, capture_output=True, text=True)

        try:
            output = json.loads(result.stdout)
        except json.JSONDecodeError:
            output = {"success": False, "error": result.stderr}

        self.results[name] = output
        if not output.get("success", False):
            self.errors.append(f"{name}: {output.get('error', 'Unknown error')}")

        return output

    def should_continue(self) -> bool:
        """Check if workflow should continue."""
        return len(self.errors) == 0

    def summary(self) -> dict:
        """Generate workflow summary."""
        return {
            "success": self.should_continue(),
            "steps_completed": list(self.results.keys()),
            "errors": self.errors
        }
```

### Key Insight

Multi-tool workflows succeed when:
- Each tool has a clear, limited responsibility
- All tools communicate via consistent formats
- The orchestrator handles coordination and errors
- Humans can intervene at checkpoints

### Workflow Pattern

```
1. Define workflow steps
2. Build/identify helpers for each step
3. Create function manifest
4. Build orchestration script
5. Add validation checkpoints
6. Document the workflow
```

</details>

---

## Reflection Questions

1. Which helpers would be most valuable for your daily work?
2. How do you balance automation with human oversight?
3. What validation steps are essential for your workflows?

---

**Next**: [Exercise 3: CI/CD Pipeline Integration](exercise-3.md)
