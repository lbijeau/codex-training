# Exercise 4: Knowledge Transfer Patterns

## Objective

Learn to create portable knowledge assets that transfer Codex workflows between projects and teams.

## Background

Effective Codex integration isn't just about one project—it's about building reusable patterns, prompts, and helpers that accelerate work across projects. This exercise teaches you to build and share these assets.

## Part A: Build a Portable Prompt Library

**Task**: Create a library of reusable prompts for common workflows.

1. Create the prompt library structure:
   ```bash
   mkdir -p docs/maintainers/prompt_templates
   ```

2. Create a feature planning prompt:
   ```markdown
   <!-- docs/maintainers/prompt_templates/feature_plan.md -->
   # Feature Planning Prompt

   ## Purpose
   Generate a structured implementation plan for a new feature.

   ## Required Helpers
   - read_files: To gather context
   - run_tests: To verify baseline

   ## Constraints
   - Must consider security implications
   - Must identify affected tests
   - Must list dependencies

   ## Template

   ```
   You are planning the implementation of: [FEATURE_NAME]

   Context:
   - Project: [PROJECT_NAME]
   - Tech stack: [TECH_STACK]
   - Relevant files: [FILE_LIST]

   Create an implementation plan that includes:
   1. Overview of changes needed
   2. Files to create/modify
   3. New dependencies required
   4. Security considerations
   5. Test coverage requirements
   6. Rollback strategy

   Format as a numbered checklist.
   ```

   ## Example Usage
   ```
   You are planning the implementation of: User Authentication

   Context:
   - Project: MyApp
   - Tech stack: Node.js, Express, PostgreSQL
   - Relevant files: src/routes/auth.ts, src/models/user.ts

   [Rest of template...]
   ```

   ## Success Criteria
   - Plan is actionable with clear steps
   - Security is explicitly addressed
   - Test requirements are specified
   ```

3. Create a bug investigation prompt:
   ```markdown
   <!-- docs/maintainers/prompt_templates/bug_investigation.md -->
   # Bug Investigation Prompt

   ## Purpose
   Systematically investigate and diagnose a bug.

   ## Required Helpers
   - read_files: To examine relevant code
   - run_tests: To reproduce the issue

   ## Template

   ```
   Investigate this bug: [BUG_DESCRIPTION]

   Error message (if any): [ERROR_MESSAGE]

   Steps to reproduce:
   [STEPS]

   Expected behavior: [EXPECTED]
   Actual behavior: [ACTUAL]

   Investigate by:
   1. Identify the code path that produces this behavior
   2. Find where the actual behavior diverges from expected
   3. Propose a fix with minimal changes
   4. Identify tests to add/modify

   Show your reasoning step by step.
   ```

   ## Example Usage
   See Module 5 Quality exercises for debugging examples.
   ```

4. Create a prompt index:
   ```markdown
   <!-- docs/maintainers/prompt_templates/README.md -->
   # Prompt Template Library

   ## Available Templates

   | Template | Purpose | Helpers Used |
   |----------|---------|--------------|
   | feature_plan.md | Plan new feature implementation | read_files, run_tests |
   | bug_investigation.md | Systematic bug diagnosis | read_files, run_tests |
   | code_review.md | Review code for issues | read_files |
   | refactor_plan.md | Plan safe refactoring | read_files, run_tests |

   ## Usage

   1. Copy the template
   2. Fill in the bracketed sections
   3. Ensure required helpers are available
   4. Run with Codex

   ## Adding New Templates

   1. Create a new .md file in this directory
   2. Include: Purpose, Required Helpers, Template, Example
   3. Update this README
   4. Test with a real scenario

   ## Last Validated
   - Date: YYYY-MM-DD
   - Model: claude-3-opus
   ```

## Part B: Create Reusable Helper Modules

**Task**: Build helpers that work across different projects.

1. Design a project-agnostic helper interface:
   ```python
   # codex_helpers/base.py
   """Base classes for Codex helpers."""

   import json
   import logging
   from abc import ABC, abstractmethod
   from dataclasses import dataclass
   from typing import Any

   logging.basicConfig(level=logging.INFO)
   logger = logging.getLogger(__name__)

   @dataclass
   class HelperResult:
       """Standard result format for all helpers."""
       success: bool
       data: Any = None
       error: str = None
       tokens: int = 0

       def to_json(self) -> str:
           return json.dumps({
               "success": self.success,
               "data": self.data,
               "error": self.error,
               "tokens": self.tokens
           }, indent=2)

   class BaseHelper(ABC):
       """Base class for all Codex helpers."""

       @property
       @abstractmethod
       def name(self) -> str:
           """Helper name for registration."""
           pass

       @property
       @abstractmethod
       def description(self) -> str:
           """Helper description for function manifest."""
           pass

       @abstractmethod
       def run(self, **kwargs) -> HelperResult:
           """Execute the helper."""
           pass

       def log(self, message: str):
           """Log helper activity."""
           logger.info(f"[{self.name}] {message}")
   ```

2. Create a portable file analyzer:
   ```python
   # codex_helpers/file_analyzer.py
   """Analyze files for common patterns - works in any project."""

   import re
   from pathlib import Path
   from collections import Counter
   from base import BaseHelper, HelperResult

   class FileAnalyzer(BaseHelper):
       name = "file_analyzer"
       description = "Analyze files for patterns, complexity, and issues"

       # Language-agnostic patterns
       PATTERNS = {
           "todo": r"TODO|FIXME|HACK|XXX",
           "long_line": r".{120,}",
           "trailing_whitespace": r"\s+$",
           "console_debug": r"console\.(log|debug)|print\(|debugger",
       }

       def run(self, path: str = ".", extensions: list = None) -> HelperResult:
           self.log(f"Analyzing files in {path}")

           extensions = extensions or [".py", ".js", ".ts", ".tsx"]
           results = {
               "files_analyzed": 0,
               "patterns_found": Counter(),
               "files_by_extension": Counter(),
               "largest_files": [],
           }

           for ext in extensions:
               for file_path in Path(path).rglob(f"*{ext}"):
                   if ".git" in str(file_path):
                       continue

                   results["files_analyzed"] += 1
                   results["files_by_extension"][ext] += 1

                   try:
                       content = file_path.read_text()
                       lines = len(content.splitlines())

                       # Track large files
                       if lines > 200:
                           results["largest_files"].append({
                               "path": str(file_path),
                               "lines": lines
                           })

                       # Find patterns
                       for pattern_name, pattern in self.PATTERNS.items():
                           matches = len(re.findall(pattern, content, re.MULTILINE))
                           if matches:
                               results["patterns_found"][pattern_name] += matches

                   except Exception as e:
                       self.log(f"Error reading {file_path}: {e}")

           # Sort largest files
           results["largest_files"].sort(key=lambda x: x["lines"], reverse=True)
           results["largest_files"] = results["largest_files"][:10]

           # Convert Counters to dicts for JSON
           results["patterns_found"] = dict(results["patterns_found"])
           results["files_by_extension"] = dict(results["files_by_extension"])

           return HelperResult(success=True, data=results)

   if __name__ == "__main__":
       import sys
       path = sys.argv[1] if len(sys.argv) > 1 else "."
       result = FileAnalyzer().run(path=path)
       print(result.to_json())
   ```

3. Document helper portability:
   ```markdown
   <!-- codex_helpers/README.md -->
   # Codex Helpers

   ## Portability Guide

   These helpers are designed to work across projects.

   ### Requirements
   - Python 3.10+
   - No project-specific dependencies

   ### Installation

   1. Copy `codex_helpers/` to your project
   2. Update `functions.json` with your project details
   3. Run `python codex_helpers/base.py` to verify

   ### Adapting to Your Project

   If a helper needs project-specific behavior:

   1. Create a subclass:
      ```python
      from file_analyzer import FileAnalyzer

      class MyProjectAnalyzer(FileAnalyzer):
          PATTERNS = {
              **FileAnalyzer.PATTERNS,
              "my_pattern": r"specific_to_my_project",
          }
      ```

   2. Register the subclass in `functions.json`

   ### Adding New Helpers

   1. Inherit from `BaseHelper`
   2. Implement `name`, `description`, and `run`
   3. Return `HelperResult` for consistency
   4. Add to `functions.json`
   5. Add tests in `tests/test_helpers.py`
   ```

## Part C: Create a Starter Kit

**Task**: Package everything into a reusable starter kit.

1. Create the starter kit structure:
   ```
   codex-starter-kit/
   ├── README.md
   ├── setup.sh
   ├── codex_helpers/
   │   ├── base.py
   │   ├── file_analyzer.py
   │   ├── test_runner.py
   │   ├── diff_validator.py
   │   └── functions.json
   ├── docs/
   │   └── prompt_templates/
   │       ├── README.md
   │       ├── feature_plan.md
   │       ├── bug_investigation.md
   │       └── code_review.md
   ├── scripts/
   │   ├── session_start.sh
   │   ├── validate_commit.py
   │   └── feature_workflow.sh
   └── .github/
       └── workflows/
           └── codex-workflow.yml
   ```

2. Create a setup script:
   ```bash
   #!/bin/bash
   # setup.sh - Initialize Codex workflow in a new project

   echo "Setting up Codex workflow..."

   # Create directories
   mkdir -p codex_helpers docs/maintainers/prompt_templates scripts

   # Copy helpers
   cp -r starter-kit/codex_helpers/* codex_helpers/

   # Copy prompt templates
   cp -r starter-kit/docs/maintainers/prompt_templates/* docs/maintainers/prompt_templates/

   # Copy scripts
   cp starter-kit/scripts/* scripts/
   chmod +x scripts/*.sh

   # Set up Git hooks
   if [ -d .git ]; then
       cp scripts/validate_commit.py .git/hooks/pre-commit
       chmod +x .git/hooks/pre-commit
       echo "✅ Pre-commit hook installed"
   fi

   # Create initial config
   cat > codex_helpers/config.json << 'EOF'
   {
     "project_name": "",
     "tech_stack": [],
     "test_command": "npm test",
     "lint_command": "npm run lint"
   }
   EOF

   echo ""
   echo "✅ Codex workflow initialized!"
   echo ""
   echo "Next steps:"
   echo "1. Edit codex_helpers/config.json with your project details"
   echo "2. Run scripts/session_start.sh to verify setup"
   echo "3. Review docs/maintainers/prompt_templates/ for available templates"
   ```

3. Create an onboarding guide:
   ```markdown
   <!-- README.md -->
   # Codex Starter Kit

   Get productive with Codex in any project in 5 minutes.

   ## Quick Start

   ```bash
   # Clone the starter kit
   git clone https://github.com/your-org/codex-starter-kit

   # Run setup in your project
   cd your-project
   ../codex-starter-kit/setup.sh
   ```

   ## What's Included

   ### Helpers (`codex_helpers/`)
   Pre-built functions for common tasks:
   - `file_analyzer`: Analyze code for patterns and issues
   - `test_runner`: Run tests with structured output
   - `diff_validator`: Validate changes before commit

   ### Prompt Templates (`docs/maintainers/prompt_templates/`)
   Tested prompts for common workflows:
   - Feature planning
   - Bug investigation
   - Code review

   ### Scripts (`scripts/`)
   Automation for your workflow:
   - `session_start.sh`: Gather context before Codex session
   - `validate_commit.py`: Pre-commit validation
   - `feature_workflow.sh`: End-to-end feature delivery

   ## Customization

   ### Add a Helper

   ```python
   from base import BaseHelper, HelperResult

   class MyHelper(BaseHelper):
       name = "my_helper"
       description = "Does something useful"

       def run(self, **kwargs) -> HelperResult:
           # Your logic here
           return HelperResult(success=True, data={})
   ```

   ### Add a Prompt Template

   Create `docs/maintainers/prompt_templates/my_template.md`:
   ```markdown
   # My Template

   ## Purpose
   What this template does.

   ## Template
   \`\`\`
   Your prompt here...
   \`\`\`
   ```

   ## Contributing

   See CONTRIBUTING.md for guidelines on adding helpers and templates.
   ```

## Part D: Document Cross-Project Patterns

**Task**: Create a patterns guide for knowledge sharing.

1. Create a patterns document:
   ```markdown
   <!-- docs/maintainers/patterns/README.md -->
   # Codex Integration Patterns

   Proven patterns for effective Codex workflows.

   ## Pattern: Session Context Loading

   **Problem**: Codex needs context to be effective.

   **Solution**: Always start sessions with context loading.

   ```bash
   # Run before every Codex session
   scripts/session_start.sh
   ```

   **Why it works**: Consistent context leads to consistent results.

   ---

   ## Pattern: Validation Sandwich

   **Problem**: Codex changes might introduce issues.

   **Solution**: Validate before AND after changes.

   ```
   1. Run tests (baseline)
   2. Make Codex changes
   3. Run tests (verify)
   4. Run validators (safety)
   5. Commit
   ```

   **Why it works**: Catches issues at multiple points.

   ---

   ## Pattern: Incremental Verification

   **Problem**: Large changes are hard to validate.

   **Solution**: Make small changes with frequent verification.

   ```
   1. Make ONE change
   2. Verify it works
   3. Commit
   4. Repeat
   ```

   **Why it works**: Small changes = small blast radius.

   ---

   ## Pattern: Helper Composition

   **Problem**: Complex workflows need multiple tools.

   **Solution**: Compose simple helpers into workflows.

   ```python
   # Good: Compose simple helpers
   files = read_files(["*.ts"])
   analysis = analyze_files(files)
   if analysis["issues"]:
       report = generate_report(analysis)

   # Bad: One mega-helper that does everything
   result = do_everything()
   ```

   **Why it works**: Simple pieces are easier to test and reuse.

   ---

   ## Anti-Patterns

   ### ❌ The Black Box

   **Problem**: Helper with no error output.
   **Fix**: Always return structured errors.

   ### ❌ The Kitchen Sink

   **Problem**: One prompt that tries to do everything.
   **Fix**: Break into focused, single-purpose prompts.

   ### ❌ The Assumption

   **Problem**: Assuming Codex output is correct without validation.
   **Fix**: Always verify with tests and validators.
   ```

---

## Hints

<details>
<summary>Hint 1: Version your knowledge assets</summary>

Track changes to prompts and helpers:
```markdown
## Changelog

### v1.1.0 - 2024-01-15
- Added security considerations to feature_plan.md
- Updated file_analyzer patterns

### v1.0.0 - 2024-01-01
- Initial release
```
</details>

<details>
<summary>Hint 2: Test your prompts</summary>

Before sharing a prompt:
1. Use it on 3 different scenarios
2. Document edge cases
3. Note any model-specific behaviors
</details>

<details>
<summary>Hint 3: Keep portability notes</summary>

Document what needs changing:
```markdown
## Portability Notes

To use in a new project:
- [ ] Update test_command in config.json
- [ ] Adjust PATTERNS in file_analyzer.py
- [ ] Update CI workflow file paths
```
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Knowledge Transfer Principles

1. **Documentation > Memory**: Write it down
2. **Patterns > One-offs**: Extract reusable patterns
3. **Portable > Specific**: Design for reuse
4. **Tested > Theoretical**: Validate with real use

### Starter Kit Components

```
Essential Knowledge Assets
├── Prompts (docs/maintainers/prompt_templates/)
│   ├── Tested templates for common tasks
│   ├── Clear usage instructions
│   └── Required helper documentation
├── Helpers (codex_helpers/)
│   ├── Project-agnostic base classes
│   ├── Consistent result formats
│   └── Clear adaptation guides
├── Scripts (scripts/)
│   ├── Session automation
│   ├── Validation hooks
│   └── Workflow orchestration
└── Patterns (docs/maintainers/patterns/)
    ├── Proven approaches
    ├── Anti-patterns to avoid
    └── Adaptation guidelines
```

### Knowledge Sharing Workflow

```
1. Build something useful
   ↓
2. Extract reusable parts
   ↓
3. Document and test
   ↓
4. Package for portability
   ↓
5. Share with others
   ↓
6. Gather feedback
   ↓
7. Iterate and improve
```

### Key Insight

Knowledge transfer isn't about documenting everything—it's about identifying the 20% of knowledge that provides 80% of the value and making it easily accessible.

### Transfer Pattern

```
1. Identify reusable patterns
2. Extract and generalize
3. Document with examples
4. Package for easy adoption
5. Maintain and evolve
```

</details>

---

## Reflection Questions

1. What patterns from your work could benefit other projects?
2. How do you balance generalization with project-specific needs?
3. What would make your team more likely to adopt shared patterns?

---

## Module 7 Complete!

You've learned:
- GitHub CLI for seamless integration
- Multi-tool workflow orchestration
- CI/CD pipeline integration
- Knowledge transfer patterns

**Next Module**: [Module 8: API Internals](../../modules/08-api-internals.md)
