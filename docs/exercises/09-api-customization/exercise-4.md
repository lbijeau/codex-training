# Exercise 4: Build Session Automation Scripts

## Objective

Create comprehensive session start and end scripts that provide context and ensure quality.

## Background

Effective Codex sessions start with context and end with verification. Automation scripts ensure consistency and save time.

## Part A: Build a Session Start Script

**Task**: Create a script that gathers all relevant context at session start.

1. Create the script:
   ```bash
   #!/bin/bash
   # scripts/session_start.sh
   # Gathers context for a productive Codex session

   set -e

   echo "╔══════════════════════════════════════════════════════════════╗"
   echo "║             CODEX SESSION - Context Loading                   ║"
   echo "╚══════════════════════════════════════════════════════════════╝"
   echo ""

   # -------------------------------------------------------------------
   # Git Context
   # -------------------------------------------------------------------
   echo "📁 GIT STATUS"
   echo "─────────────────────────────────────────"
   echo "Branch:  $(git branch --show-current)"
   echo "Upstream: $(git rev-parse --abbrev-ref @{upstream} 2>/dev/null || echo 'none')"
   echo ""

   # Check for uncommitted changes
   CHANGES=$(git status --porcelain | wc -l | tr -d ' ')
   if [ "$CHANGES" -gt 0 ]; then
       echo "⚠️  Uncommitted changes: $CHANGES files"
       git status --short
   else
       echo "✅ Working directory clean"
   fi
   echo ""

   # Recent commits
   echo "📝 RECENT COMMITS"
   echo "─────────────────────────────────────────"
   git log --oneline -5
   echo ""

   # -------------------------------------------------------------------
   # Test Status
   # -------------------------------------------------------------------
   echo "🧪 TEST STATUS"
   echo "─────────────────────────────────────────"
   if npm test --silent 2>&1 | tail -5; then
       echo "✅ Tests passing"
   else
       echo "❌ Some tests failing"
   fi
   echo ""

   # -------------------------------------------------------------------
   # Code Quality
   # -------------------------------------------------------------------
   echo "🔍 CODE QUALITY"
   echo "─────────────────────────────────────────"

   # Count TODOs
   TODO_COUNT=$(grep -r "TODO\|FIXME\|HACK\|XXX" --include="*.ts" --include="*.js" src/ 2>/dev/null | wc -l | tr -d ' ')
   echo "TODOs/FIXMEs: $TODO_COUNT"

   # Check for TypeScript errors
   if command -v npx &> /dev/null && [ -f "tsconfig.json" ]; then
       TS_ERRORS=$(npx tsc --noEmit 2>&1 | grep -c "error TS" || echo "0")
       echo "TypeScript errors: $TS_ERRORS"
   fi

   # Lint status
   if [ -f "package.json" ] && grep -q '"lint"' package.json; then
       LINT_ERRORS=$(npm run lint --silent 2>&1 | grep -c "error" || echo "0")
       echo "Lint errors: $LINT_ERRORS"
   fi
   echo ""

   # -------------------------------------------------------------------
   # Project Context
   # -------------------------------------------------------------------
   echo "📋 PROJECT CONTEXT"
   echo "─────────────────────────────────────────"

   # Key files modified recently
   echo "Recently modified:"
   git diff --name-only HEAD~5 2>/dev/null | head -10 || echo "  (none)"
   echo ""

   # Open issues (if gh is available)
   if command -v gh &> /dev/null; then
       echo "🎫 OPEN ISSUES"
       echo "─────────────────────────────────────────"
       gh issue list --limit 5 2>/dev/null || echo "  (unable to fetch)"
       echo ""
   fi

   # -------------------------------------------------------------------
   # Summary
   # -------------------------------------------------------------------
   echo "═══════════════════════════════════════════════════════════════"
   echo "Ready to work. Run 'scripts/session_end.sh' when done."
   echo "═══════════════════════════════════════════════════════════════"
   ```

2. Make it executable:
   ```bash
   chmod +x scripts/session_start.sh
   ```

## Part B: Build a Session End Script

**Task**: Create a script that verifies quality and summarizes changes.

1. Create the script:
   ```bash
   #!/bin/bash
   # scripts/session_end.sh
   # Verifies quality and summarizes session changes

   set -e

   echo "╔══════════════════════════════════════════════════════════════╗"
   echo "║             CODEX SESSION - Wrap Up                          ║"
   echo "╚══════════════════════════════════════════════════════════════╝"
   echo ""

   # -------------------------------------------------------------------
   # Changes Summary
   # -------------------------------------------------------------------
   echo "📝 CHANGES MADE"
   echo "─────────────────────────────────────────"
   git diff --stat
   echo ""

   echo "📁 FILES CHANGED"
   echo "─────────────────────────────────────────"
   git status --short
   echo ""

   # -------------------------------------------------------------------
   # Quality Verification
   # -------------------------------------------------------------------
   echo "🔍 QUALITY CHECK"
   echo "─────────────────────────────────────────"

   QUALITY_PASS=true

   # Run tests
   echo "Running tests..."
   if npm test --silent 2>&1; then
       echo "  ✅ Tests pass"
   else
       echo "  ❌ Tests FAIL"
       QUALITY_PASS=false
   fi

   # Run linter
   echo "Running linter..."
   if npm run lint --silent 2>&1; then
       echo "  ✅ Lint passes"
   else
       echo "  ❌ Lint FAILS"
       QUALITY_PASS=false
   fi

   # Run type check
   if [ -f "tsconfig.json" ]; then
       echo "Running type check..."
       if npx tsc --noEmit 2>&1; then
           echo "  ✅ Types pass"
       else
           echo "  ❌ Type errors"
           QUALITY_PASS=false
       fi
   fi

   echo ""

   # -------------------------------------------------------------------
   # New Issues Introduced
   # -------------------------------------------------------------------
   echo "⚠️  NEW ISSUES"
   echo "─────────────────────────────────────────"

   # Check for new TODOs in changed files
   NEW_TODOS=$(git diff | grep "^\+" | grep -E "TODO|FIXME|HACK" | wc -l | tr -d ' ')
   if [ "$NEW_TODOS" -gt 0 ]; then
       echo "New TODOs added: $NEW_TODOS"
       git diff | grep "^\+" | grep -E "TODO|FIXME|HACK" | head -5
   else
       echo "No new TODOs"
   fi

   # Check for console.logs in changed files
   NEW_CONSOLE=$(git diff | grep "^\+" | grep "console\." | wc -l | tr -d ' ')
   if [ "$NEW_CONSOLE" -gt 0 ]; then
       echo ""
       echo "⚠️  Console statements added: $NEW_CONSOLE"
   fi

   echo ""

   # -------------------------------------------------------------------
   # Commit Readiness
   # -------------------------------------------------------------------
   echo "📦 COMMIT READINESS"
   echo "─────────────────────────────────────────"

   if [ "$QUALITY_PASS" = true ]; then
       echo "✅ Ready to commit!"
       echo ""
       echo "Suggested commands:"
       echo "  git add ."
       echo "  git commit -m 'feat: your description'"
       echo "  git push"
   else
       echo "❌ Fix issues before committing"
       echo ""
       echo "Suggested commands:"
       echo "  npm test        # See test failures"
       echo "  npm run lint    # See lint errors"
       echo "  npx tsc         # See type errors"
   fi

   echo ""
   echo "═══════════════════════════════════════════════════════════════"
   ```

2. Make it executable:
   ```bash
   chmod +x scripts/session_end.sh
   ```

## Part C: Create a Validation Script

**Task**: Build a standalone validation script for use in CI and locally.

1. Create the validation script:
   ```python
   #!/usr/bin/env python3
   # scripts/validate.py
   """Comprehensive validation script for code quality."""

   import subprocess
   import sys
   import re
   from pathlib import Path
   from dataclasses import dataclass
   from typing import List, Optional

   @dataclass
   class ValidationResult:
       name: str
       passed: bool
       message: str
       details: Optional[str] = None

   def run_command(cmd: list[str], capture: bool = True) -> tuple[int, str, str]:
       """Run a command and return exit code, stdout, stderr."""
       result = subprocess.run(
           cmd,
           capture_output=capture,
           text=True
       )
       return result.returncode, result.stdout, result.stderr

   def check_tests() -> ValidationResult:
       """Run test suite."""
       code, stdout, stderr = run_command(["npm", "test", "--", "--silent"])
       return ValidationResult(
           name="Tests",
           passed=code == 0,
           message="All tests pass" if code == 0 else "Tests failing",
           details=stderr if code != 0 else None
       )

   def check_lint() -> ValidationResult:
       """Run linter."""
       code, stdout, stderr = run_command(["npm", "run", "lint", "--", "--quiet"])
       return ValidationResult(
           name="Lint",
           passed=code == 0,
           message="No lint errors" if code == 0 else "Lint errors found",
           details=stdout if code != 0 else None
       )

   def check_types() -> ValidationResult:
       """Run TypeScript type check."""
       if not Path("tsconfig.json").exists():
           return ValidationResult(
               name="Types",
               passed=True,
               message="No TypeScript config found"
           )

       code, stdout, stderr = run_command(["npx", "tsc", "--noEmit"])
       errors = stdout.count("error TS")
       return ValidationResult(
           name="Types",
           passed=code == 0,
           message=f"No type errors" if code == 0 else f"{errors} type errors",
           details=stdout if code != 0 else None
       )

   def check_security_patterns() -> ValidationResult:
       """Check for security anti-patterns in changed files."""
       code, stdout, _ = run_command(["git", "diff", "--name-only"])
       changed_files = [f for f in stdout.strip().split("\n") if f]

       issues = []
       patterns = [
           (r"password\s*=\s*['\"][^'\"]+['\"]", "Hardcoded password"),
           (r"api[_-]?key\s*=\s*['\"][^'\"]+['\"]", "Hardcoded API key"),
           (r"eval\(", "Use of eval()"),
           (r"dangerouslySetInnerHTML", "XSS risk: dangerouslySetInnerHTML"),
       ]

       for file in changed_files:
           if not Path(file).exists():
               continue
           try:
               content = Path(file).read_text()
               for pattern, message in patterns:
                   if re.search(pattern, content, re.IGNORECASE):
                       issues.append(f"{file}: {message}")
           except Exception:
               pass

       return ValidationResult(
           name="Security",
           passed=len(issues) == 0,
           message="No security issues" if not issues else f"{len(issues)} security issues",
           details="\n".join(issues) if issues else None
       )

   def main():
       print("Running validation checks...")
       print("=" * 50)

       checks = [
           check_tests,
           check_lint,
           check_types,
           check_security_patterns,
       ]

       results: List[ValidationResult] = []
       for check in checks:
           result = check()
           results.append(result)

           status = "✅" if result.passed else "❌"
           print(f"{status} {result.name}: {result.message}")

           if result.details:
               for line in result.details.split("\n")[:5]:
                   print(f"   {line}")

       print("=" * 50)

       all_passed = all(r.passed for r in results)
       if all_passed:
           print("✅ All checks passed!")
           sys.exit(0)
       else:
           print("❌ Some checks failed")
           sys.exit(1)

   if __name__ == "__main__":
       main()
   ```

2. Make it executable:
   ```bash
   chmod +x scripts/validate.py
   ```

## Part D: Create a Workflow Script

**Task**: Combine all scripts into a complete feature workflow.

1. Create the workflow script:
   ```bash
   #!/bin/bash
   # scripts/feature_workflow.sh
   # Complete feature development workflow

   set -e

   FEATURE_NAME="$1"

   if [ -z "$FEATURE_NAME" ]; then
       echo "Usage: scripts/feature_workflow.sh <feature-name>"
       exit 1
   fi

   echo "╔══════════════════════════════════════════════════════════════╗"
   echo "║         FEATURE WORKFLOW: $FEATURE_NAME"
   echo "╚══════════════════════════════════════════════════════════════╝"

   # -------------------------------------------------------------------
   # Phase 1: Setup
   # -------------------------------------------------------------------
   echo ""
   echo "📋 PHASE 1: Setup"
   echo "─────────────────────────────────────────"

   # Create feature branch
   BRANCH_NAME="feature/$(echo "$FEATURE_NAME" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')"
   echo "Creating branch: $BRANCH_NAME"
   git checkout -b "$BRANCH_NAME" 2>/dev/null || git checkout "$BRANCH_NAME"

   # Run session start
   echo ""
   ./scripts/session_start.sh

   # -------------------------------------------------------------------
   # Phase 2: Development (manual)
   # -------------------------------------------------------------------
   echo ""
   echo "📝 PHASE 2: Development"
   echo "─────────────────────────────────────────"
   echo "Work with Codex to implement your feature."
   echo "When done, run: scripts/feature_workflow.sh --complete"
   echo ""

   if [ "$2" = "--complete" ]; then
       # -------------------------------------------------------------------
       # Phase 3: Validation
       # -------------------------------------------------------------------
       echo ""
       echo "🔍 PHASE 3: Validation"
       echo "─────────────────────────────────────────"

       python3 scripts/validate.py

       if [ $? -ne 0 ]; then
           echo "Fix validation issues before completing."
           exit 1
       fi

       # -------------------------------------------------------------------
       # Phase 4: Wrap Up
       # -------------------------------------------------------------------
       echo ""
       echo "📦 PHASE 4: Wrap Up"
       echo "─────────────────────────────────────────"

       ./scripts/session_end.sh

       echo ""
       read -p "Create commit? (y/n) " -n 1 -r
       echo ""

       if [[ $REPLY =~ ^[Yy]$ ]]; then
           git add .
           git commit -m "feat: $FEATURE_NAME"

           echo ""
           read -p "Push and create PR? (y/n) " -n 1 -r
           echo ""

           if [[ $REPLY =~ ^[Yy]$ ]]; then
               git push -u origin "$BRANCH_NAME"
               gh pr create --title "feat: $FEATURE_NAME" --body "## Summary

   Implements $FEATURE_NAME.

   ## Test Plan
   - [ ] Tests pass
   - [ ] Manual verification

   🤖 Created with Codex workflow"
           fi
       fi

       echo ""
       echo "✅ Feature workflow complete!"
   fi
   ```

2. Make it executable:
   ```bash
   chmod +x scripts/feature_workflow.sh
   ```

---

## Hints

<details>
<summary>Hint 1: Script organization</summary>

Organize scripts by purpose:
```
scripts/
├── session_start.sh    # Context gathering
├── session_end.sh      # Verification
├── validate.py         # Quality checks
├── feature_workflow.sh # Complete workflow
└── helpers/
    ├── git_utils.sh
    └── test_utils.sh
```
</details>

<details>
<summary>Hint 2: Error handling</summary>

Use `set -e` to exit on errors, but handle expected failures:
```bash
set -e

# This will exit if command fails
npm test

# This won't exit (|| true)
ERRORS=$(npm run lint 2>&1 | grep -c error || true)
```
</details>

<details>
<summary>Hint 3: Cross-platform compatibility</summary>

For scripts that run on multiple platforms:
```bash
# Use command -v instead of which
if command -v npm &> /dev/null; then
    npm test
fi

# Use $() instead of backticks
BRANCH=$(git branch --show-current)
```
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Complete Script Suite

```
scripts/
├── session_start.sh    # Run at session start
├── session_end.sh      # Run at session end
├── validate.py         # Quality validation
├── feature_workflow.sh # Complete workflow
└── README.md           # Script documentation
```

### Integration Points

```
┌─────────────────┐
│ session_start   │ ──→ Gather context
└────────┬────────┘
         ↓
┌─────────────────┐
│  Codex Session  │ ──→ Development work
└────────┬────────┘
         ↓
┌─────────────────┐
│    validate     │ ──→ Quality checks
└────────┬────────┘
         ↓
┌─────────────────┐
│  session_end    │ ──→ Summary + commit
└─────────────────┘
```

### Script Best Practices

1. **Clear output**: Use headers and separators
2. **Exit codes**: Return meaningful exit codes
3. **Error handling**: Handle expected failures gracefully
4. **Documentation**: Comment complex logic
5. **Portability**: Avoid bash-only features when possible

### Key Insight

Automation scripts create a consistent, reliable workflow:
- Every session starts with the same context
- Every session ends with the same verification
- Quality gates are enforced automatically
- Human oversight is maintained at key points

### Workflow Pattern

```
1. Start session (context)
   ↓
2. Do work (with Codex)
   ↓
3. Validate (automated)
   ↓
4. End session (summary)
   ↓
5. Commit (if ready)
```

</details>

---

## Reflection Questions

1. What context would you add to session_start.sh for your projects?
2. What additional validation would be valuable in validate.py?
3. How would you customize the workflow for different project types?

---

**Next**: [Exercise 5: Complete Customization Integration](exercise-5.md)
