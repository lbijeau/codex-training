# Exercise 2: Set Up Git Hooks & CI Automation

## Objective

Learn to automate quality checks using Git hooks and CI pipelines to complement your Codex workflows.

## Background

While Codex helps you write and review code, Git hooks and CI pipelines ensure consistent quality by automatically running checks before commits and on every push. This exercise teaches you to set up these automation tools.

## Part A: Set Up Husky and lint-staged

**Task**: Configure automatic formatting and linting on commit.

1. Install the required packages:
   ```bash
   npm install --save-dev husky lint-staged prettier eslint
   ```

2. Initialize husky:
   ```bash
   npx husky init
   ```

3. Configure lint-staged in `package.json`:
   ```json
   {
     "lint-staged": {
       "*.{ts,tsx,js,jsx}": [
         "prettier --write",
         "eslint --fix"
       ],
       "*.{json,md,yml,yaml}": [
         "prettier --write"
       ]
     }
   }
   ```

4. Update the pre-commit hook:
   ```bash
   echo 'npx lint-staged' > .husky/pre-commit
   ```

5. Test it:
   - Make a small change to a TypeScript file
   - Stage and commit
   - Verify the file was auto-formatted

## Part B: Create a Pre-Commit Quality Gate

**Task**: Add comprehensive checks before each commit.

1. Create a more thorough pre-commit hook:
   ```bash
   #!/bin/bash
   # .husky/pre-commit

   echo "🔍 Running pre-commit checks..."

   # Run lint-staged for formatting
   npx lint-staged || exit 1

   # Run type check on staged files
   echo "📝 Type checking..."
   npm run typecheck || exit 1

   # Run tests related to changed files (if using jest)
   echo "🧪 Running related tests..."
   STAGED_JS_FILES=$(git diff --cached --name-only --diff-filter=ACMR | grep -E '\.(ts|tsx|js|jsx)$' | tr '\n' ' ')
   if [ -n "$STAGED_JS_FILES" ]; then
     npx jest --bail --findRelatedTests $STAGED_JS_FILES --passWithNoTests || exit 1
   else
     echo "   No JS/TS files staged, skipping related tests"
   fi

   echo "✅ All checks passed!"
   ```

2. Make it executable:
   ```bash
   chmod +x .husky/pre-commit
   ```

3. Test by making a change that would fail type check or tests

## Part C: Set Up GitHub Actions CI

**Task**: Create a CI pipeline that runs on every push.

1. Create the workflow directory:
   ```bash
   mkdir -p .github/workflows
   ```

2. Create the CI workflow:
   ```yaml
   # .github/workflows/ci.yml
   name: CI

   on:
     push:
       branches: [main, develop]
     pull_request:
       branches: [main]

   jobs:
     lint:
       name: Lint & Format
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: '20'
             cache: 'npm'
         - run: npm ci
         - run: npm run lint
         - run: npx prettier --check "**/*.{ts,tsx,js,jsx,json,md}"

     typecheck:
       name: Type Check
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: '20'
             cache: 'npm'
         - run: npm ci
         - run: npm run typecheck

     test:
       name: Test
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: '20'
             cache: 'npm'
         - run: npm ci
         - run: npm test -- --coverage
         # Optional: Upload coverage (requires Codecov account setup)
         # - uses: codecov/codecov-action@v3
         #   if: always()
   ```

3. Create required npm scripts in `package.json`:
   ```json
   {
     "scripts": {
       "lint": "eslint src/",
       "typecheck": "tsc --noEmit",
       "test": "jest"
     }
   }
   ```

4. Commit and push to see the workflow run

## Part D: Create Helper Scripts for Codex Workflows

**Task**: Build shell scripts that combine Codex with automated checks.

1. Create a scripts directory:
   ```bash
   mkdir -p scripts
   ```

2. Create a review script:
   ```bash
   #!/bin/bash
   # scripts/review-changes.sh
   # Review staged changes with Codex and run checks

   set -e

   echo "📋 Staged changes:"
   git diff --cached --stat

   echo ""
   echo "🔍 Running Codex review..."
   codex "Review my staged changes. Focus on:
   1. Logic errors and bugs
   2. Security vulnerabilities
   3. Missing error handling
   4. Test coverage gaps

   Show the diff first, then provide specific feedback."

   echo ""
   echo "🧪 Running automated checks..."
   npm run lint
   npm run typecheck
   npm test -- --bail

   echo ""
   echo "✅ Review complete!"
   ```

3. Create a pre-PR script:
   ```bash
   #!/bin/bash
   # scripts/pre-pr.sh
   # Run before creating a pull request

   set -e

   echo "🚀 Pre-PR Checklist"
   echo "==================="

   echo ""
   echo "1️⃣ Running tests..."
   npm test || { echo "❌ Tests failed"; exit 1; }

   echo ""
   echo "2️⃣ Running linter..."
   npm run lint || { echo "❌ Lint failed"; exit 1; }

   echo ""
   echo "3️⃣ Running type check..."
   npm run typecheck || { echo "❌ Type check failed"; exit 1; }

   echo ""
   echo "4️⃣ Checking for debug code..."
   if grep -rn "console.log\|debugger" src/ --include="*.ts" --include="*.tsx"; then
     echo "⚠️  Found debug code - consider removing before PR"
   else
     echo "✅ No debug code found"
   fi

   echo ""
   echo "5️⃣ Checking for TODOs without tickets..."
   if grep -rn "TODO:" src/ --include="*.ts" --include="*.tsx" | grep -v "TODO(#"; then
     echo "⚠️  Found TODOs without ticket numbers"
   else
     echo "✅ All TODOs have ticket numbers"
   fi

   echo ""
   echo "==================="
   echo "✅ All checks passed! Ready for PR."
   ```

4. Make scripts executable:
   ```bash
   chmod +x scripts/*.sh
   ```

---

## Hints

<details>
<summary>Hint 1: Debugging hook failures</summary>

If your pre-commit hook fails unexpectedly:

```bash
# Run the hook manually to see output
./.husky/pre-commit

# Check husky is installed correctly
cat .husky/pre-commit

# Bypass hook temporarily (use sparingly!)
git commit --no-verify -m "emergency fix"
```
</details>

<details>
<summary>Hint 2: Testing CI locally</summary>

Use `act` to test GitHub Actions locally:

```bash
# Install act
brew install act

# Run the CI workflow
act push

# Run a specific job
act push -j test
```
</details>

<details>
<summary>Hint 3: Parallel checks in CI</summary>

Jobs in GitHub Actions run in parallel by default. To make one job depend on another:

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    # ...

  test:
    needs: lint  # Wait for lint to pass first
    runs-on: ubuntu-latest
    # ...
```
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Complete Setup Structure

```
project/
├── .husky/
│   └── pre-commit          # Runs lint-staged + checks
├── .github/
│   └── workflows/
│       └── ci.yml          # CI pipeline
├── scripts/
│   ├── review-changes.sh   # Codex review helper
│   └── pre-pr.sh          # Pre-PR checklist
├── package.json            # lint-staged config + scripts
└── .lintstagedrc.json     # (optional) separate lint-staged config
```

### Key Insight

Git hooks and CI pipelines serve different purposes:

| Tool | When | Purpose |
|------|------|---------|
| **lint-staged** | On commit | Fast formatting fixes |
| **Pre-commit hook** | On commit | Quick quality gate |
| **CI pipeline** | On push/PR | Comprehensive validation |
| **Helper scripts** | Manual | Combine Codex + automation |

### Workflow Pattern

```
1. Write code with Codex
   ↓
2. Run ./scripts/review-changes.sh (Codex review + checks)
   ↓
3. git commit (pre-commit hook auto-formats)
   ↓
4. Run ./scripts/pre-pr.sh (comprehensive checks)
   ↓
5. git push (CI runs full pipeline)
   ↓
6. Create PR
```

</details>

---

## Reflection Questions

1. How do Git hooks complement Codex's capabilities?
2. What checks should run locally vs. in CI?
3. How can you balance thorough checks with fast feedback?

---

**Next**: [Exercise 3: Configure MCP Servers](exercise-3.md)
