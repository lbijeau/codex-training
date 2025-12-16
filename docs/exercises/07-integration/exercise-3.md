# Exercise 3: CI/CD Pipeline Integration

## Objective

Learn to integrate Codex workflows into CI/CD pipelines for automated validation and deployment.

## Background

Codex prepares changes; CI validates them. This separation ensures repeatability and safety. The model assists but never becomes the sole gatekeeper.

## Part A: Pre-Commit Automation

**Task**: Create scripts that run before Codex sessions and commits.

1. Create a session preparation script:
   ```bash
   #!/bin/bash
   # scripts/prepare_session.sh

   echo "=== Pre-Session Check ==="

   # Check for uncommitted changes
   if [ -n "$(git status --porcelain)" ]; then
       echo "⚠️  Uncommitted changes detected"
       git status --short
       echo ""
   fi

   # Check test status
   echo "## Test Status"
   if npm test --silent 2>/dev/null; then
       echo "✅ All tests passing"
   else
       echo "❌ Tests failing - fix before proceeding"
       exit 1
   fi

   # Check for TODOs in staged files
   echo ""
   echo "## Staged TODOs"
   git diff --cached --name-only | xargs grep -l "TODO" 2>/dev/null || echo "None"

   # Output context summary
   echo ""
   echo "## Session Context"
   echo "Branch: $(git branch --show-current)"
   echo "Last commit: $(git log -1 --oneline)"
   echo "Files changed from main: $(git diff main --name-only | wc -l | tr -d ' ')"
   ```

2. Create a pre-commit validation script:
   ```python
   #!/usr/bin/env python3
   # scripts/validate_commit.py
   """Validate changes before commit."""

   import subprocess
   import sys
   import re

   BLOCKED_PATTERNS = [
       (r"console\.log\(", "Remove console.log statements"),
       (r"debugger;", "Remove debugger statements"),
       (r"TODO.*HACK", "Resolve TODO HACK comments"),
       (r"password\s*=\s*['\"][^'\"]+['\"]", "Hardcoded password detected"),
   ]

   SENSITIVE_FILES = [
       ".env",
       "secrets",
       "credentials",
       ".pem",
       ".key",
   ]

   def get_staged_diff():
       result = subprocess.run(
           ["git", "diff", "--cached"],
           capture_output=True,
           text=True
       )
       return result.stdout

   def get_staged_files():
       result = subprocess.run(
           ["git", "diff", "--cached", "--name-only"],
           capture_output=True,
           text=True
       )
       return result.stdout.strip().split("\n")

   def check_patterns(diff: str) -> list[str]:
       issues = []
       for pattern, message in BLOCKED_PATTERNS:
           if re.search(pattern, diff):
               issues.append(f"❌ {message}")
       return issues

   def check_sensitive_files(files: list[str]) -> list[str]:
       issues = []
       for file in files:
           for sensitive in SENSITIVE_FILES:
               if sensitive in file.lower():
                   issues.append(f"⚠️  Sensitive file: {file}")
       return issues

   def main():
       diff = get_staged_diff()
       files = get_staged_files()

       issues = []
       issues.extend(check_patterns(diff))
       issues.extend(check_sensitive_files(files))

       if issues:
           print("Commit validation failed:")
           for issue in issues:
               print(f"  {issue}")
           sys.exit(1)

       print("✅ Commit validation passed")
       sys.exit(0)

   if __name__ == "__main__":
       main()
   ```

3. Set up as a Git hook:
   ```bash
   # .git/hooks/pre-commit
   #!/bin/bash
   python scripts/validate_commit.py
   ```

## Part B: GitHub Actions Workflow

**Task**: Create a GitHub Actions workflow that mirrors your local Codex workflow.

1. Create the workflow file:
   ```yaml
   # .github/workflows/codex-workflow.yml
   name: Codex Workflow Validation

   on:
     pull_request:
       branches: [main]
     push:
       branches: [main]

   jobs:
     validate:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
           with:
             fetch-depth: 0  # Full history for diff

         - name: Set up Node.js
           uses: actions/setup-node@v4
           with:
             node-version: '20'
             cache: 'npm'

         - name: Install dependencies
           run: npm ci

         - name: Run linter
           run: npm run lint

         - name: Run type check
           run: npm run typecheck

         - name: Run tests
           run: npm test

         - name: Validate diff
           if: github.event_name == 'pull_request'
           run: |
             python scripts/validate_commit.py || {
               echo "::error::Commit validation failed"
               exit 1
             }

     security:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4

         - name: Run security audit
           run: npm audit --audit-level=high

         - name: Check for secrets
           uses: trufflesecurity/trufflehog@main
           with:
             path: ./
             base: ${{ github.event.repository.default_branch }}
             head: HEAD
   ```

2. Add a workflow that runs Codex helpers:
   ```yaml
   # .github/workflows/helper-validation.yml
   name: Helper Validation

   on:
     pull_request:
       paths:
         - 'codex_helpers/**'
         - 'scripts/**'

   jobs:
     test-helpers:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4

         - name: Set up Python
           uses: actions/setup-python@v5
           with:
             python-version: '3.11'

         - name: Test read_files helper
           run: |
             output=$(python codex_helpers/read_files.py "*.md")
             echo "$output" | jq -e '.success == true'

         - name: Test validate_diff helper
           run: |
             output=$(python codex_helpers/validate_diff.py main)
             echo "$output" | jq -e '.success != null'

         - name: Validate function manifest
           run: |
             python -c "import json; json.load(open('codex_helpers/functions.json'))"
             echo "✅ functions.json is valid JSON"
   ```

## Part C: PR Composition Workflow

**Task**: Automate PR description generation using CI.

1. Create a changelog generator action:
   ```yaml
   # .github/workflows/pr-changelog.yml
   name: PR Changelog

   on:
     pull_request:
       types: [opened, synchronize]

   jobs:
     generate-changelog:
       runs-on: ubuntu-latest
       permissions:
         pull-requests: write
       steps:
         - uses: actions/checkout@v4
           with:
             fetch-depth: 0

         - name: Generate changelog
           id: changelog
           run: |
             # Get commits in this PR
             commits=$(git log --oneline origin/${{ github.base_ref }}..HEAD)

             # Categorize changes
             features=$(echo "$commits" | grep -E "^[a-f0-9]+ feat:" || true)
             fixes=$(echo "$commits" | grep -E "^[a-f0-9]+ fix:" || true)
             docs=$(echo "$commits" | grep -E "^[a-f0-9]+ docs:" || true)

             # Build changelog
             changelog="## Changelog\n\n"

             if [ -n "$features" ]; then
               changelog+="### ✨ Features\n$features\n\n"
             fi

             if [ -n "$fixes" ]; then
               changelog+="### 🐛 Fixes\n$fixes\n\n"
             fi

             if [ -n "$docs" ]; then
               changelog+="### 📚 Documentation\n$docs\n\n"
             fi

             # Output for next step
             echo "changelog<<EOF" >> $GITHUB_OUTPUT
             echo -e "$changelog" >> $GITHUB_OUTPUT
             echo "EOF" >> $GITHUB_OUTPUT

         - name: Comment on PR
           uses: actions/github-script@v7
           with:
             script: |
               github.rest.issues.createComment({
                 issue_number: context.issue.number,
                 owner: context.repo.owner,
                 repo: context.repo.repo,
                 body: `${{ steps.changelog.outputs.changelog }}`
               })
   ```

2. Create a PR template that expects CI validation:
   ```markdown
   <!-- .github/pull_request_template.md -->
   ## Summary
   <!-- Describe your changes -->

   ## Changes
   <!-- List key changes -->

   ## Test Plan
   - [ ] Unit tests pass (CI will verify)
   - [ ] Lint passes (CI will verify)
   - [ ] Type check passes (CI will verify)
   - [ ] Manual verification completed

   ## Validation
   <!-- CI will add validation results as comments -->

   ---
   🤖 This PR follows the Codex workflow. CI validates all changes.
   ```

## Part D: Failure Recovery Workflow

**Task**: Create a workflow that handles CI failures gracefully.

1. Create a failure notification action:
   ```yaml
   # .github/workflows/failure-handler.yml
   name: Handle CI Failures

   on:
     workflow_run:
       workflows: ["Codex Workflow Validation"]
       types: [completed]

   jobs:
     on-failure:
       runs-on: ubuntu-latest
       if: ${{ github.event.workflow_run.conclusion == 'failure' }}
       steps:
         - uses: actions/checkout@v4

         - name: Get failure details
           id: failure
           run: |
             # Get failed run logs
             gh run view ${{ github.event.workflow_run.id }} --log-failed > /tmp/failure.log

             # Extract key error
             error=$(grep -A5 "Error:" /tmp/failure.log | head -10)
             echo "error<<EOF" >> $GITHUB_OUTPUT
             echo "$error" >> $GITHUB_OUTPUT
             echo "EOF" >> $GITHUB_OUTPUT
           env:
             GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

         - name: Comment failure details
           if: github.event.workflow_run.event == 'pull_request'
           uses: actions/github-script@v7
           with:
             script: |
               const prNumber = context.payload.workflow_run.pull_requests[0]?.number;
               if (prNumber) {
                 github.rest.issues.createComment({
                   issue_number: prNumber,
                   owner: context.repo.owner,
                   repo: context.repo.repo,
                   body: `## ❌ CI Failed\n\n\`\`\`\n${{ steps.failure.outputs.error }}\n\`\`\`\n\nRun \`gh run view ${{ github.event.workflow_run.id }} --log-failed\` for details.`
                 });
               }
   ```

2. Document the recovery process:
   ```markdown
   ## CI Failure Recovery

   When CI fails:

   1. **Check the failure comment** on your PR
   2. **Get detailed logs**: `gh run view <RUN_ID> --log-failed`
   3. **Fix locally**: Make necessary changes
   4. **Push fix**: `git push` triggers new CI run
   5. **If still failing**: Ask Codex for help with the error
   ```

---

## Hints

<details>
<summary>Hint 1: Workflow debugging</summary>

Debug GitHub Actions locally:
```bash
# Install act
brew install act

# Run workflow locally
act -j validate

# With secrets
act -s GITHUB_TOKEN=your-token
```
</details>

<details>
<summary>Hint 2: Cache dependencies</summary>

Always cache to speed up CI:
```yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
```
</details>

<details>
<summary>Hint 3: Parallel jobs</summary>

Run independent jobs in parallel:
```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    # ...
  test:
    runs-on: ubuntu-latest
    # ...
  build:
    needs: [lint, test]  # Wait for both
    # ...
```
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### CI/CD Integration Principles

1. **Mirror Local Workflows**: CI should run the same validations you run locally
2. **Fast Feedback**: Fail fast with clear error messages
3. **Automated Gates**: Enforce quality without manual intervention
4. **Recovery Paths**: Make failures actionable

### Complete CI Pipeline

```
┌─────────────────┐
│   PR Created    │
└────────┬────────┘
         ↓
┌─────────────────┐
│   Lint Check    │──→ Fail fast on style
└────────┬────────┘
         ↓
┌─────────────────┐
│   Type Check    │──→ Catch type errors
└────────┬────────┘
         ↓
┌─────────────────┐
│     Tests       │──→ Verify behavior
└────────┬────────┘
         ↓
┌─────────────────┐
│   Security      │──→ Audit dependencies
└────────┬────────┘
         ↓
┌─────────────────┐
│ Validation Pass │──→ Ready for review
└─────────────────┘
```

### Integration Pattern

```yaml
# Best practices workflow
jobs:
  quick-checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck

  tests:
    needs: quick-checks
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: [18, 20]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
      - run: npm ci
      - run: npm test

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm audit --audit-level=high
```

### Key Insight

CI/CD integration succeeds when:
- Local and CI workflows are consistent
- Failures provide actionable feedback
- Recovery paths are documented
- Human oversight remains possible

### CI/CD Pattern

```
1. Pre-commit hooks catch issues early
2. CI validates all changes consistently
3. Failures generate clear reports
4. Recovery workflow is documented
5. Humans can intervene when needed
```

</details>

---

## Reflection Questions

1. How do your CI validations compare to what you run locally?
2. What's the right balance between automated gates and human review?
3. How quickly can you recover from a CI failure?

---

**Next**: [Exercise 4: Knowledge Transfer Patterns](exercise-4.md)
