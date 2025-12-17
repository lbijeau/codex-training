# Module 7: Advanced Integration

## Overview

Integrate Codex into real-world workflows: use GitHub CLI for seamless PR management, coordinate multiple tools, link into CI/CD, and transfer knowledge between projects.

**Learning Objectives**:
- Use `gh` CLI for GitHub operations (PRs, issues, checks)
- Design composite workflows that orchestrate multiple tools
- Plug Codex into CI/CD pipelines and automation
- Keep knowledge portable across projects

**Time**: 3-4 hours

---

## 1. GitHub CLI (`gh`) Integration

The GitHub CLI (`gh`) is one of the most powerful tools Codex can use. It provides direct access to GitHub's API for managing PRs, issues, checks, and more—all without leaving the terminal.

### Why `gh` Matters

| Without `gh` | With `gh` |
|--------------|-----------|
| "Go to GitHub and create a PR" | Codex creates the PR directly |
| Copy-paste issue details | Codex reads issue context automatically |
| Check CI status in browser | Codex monitors and responds to failures |
| Manual PR reviews | Codex fetches and analyzes PR diffs |

### Common `gh` Commands

#### Pull Requests

```bash
# Create a PR
gh pr create --title "Add user authentication" --body "## Summary\n- Added login\n- Added logout"

# List open PRs
gh pr list

# View PR details
gh pr view 123

# View PR diff
gh pr diff 123

# Check PR status (CI checks)
gh pr checks 123

# Merge a PR
gh pr merge 123 --squash

# Review PR comments
gh api repos/owner/repo/pulls/123/comments
```

#### Issues

```bash
# Create an issue
gh issue create --title "Bug: login fails" --body "Steps to reproduce..."

# List issues
gh issue list --label bug

# View issue details
gh issue view 456

# Close an issue
gh issue close 456 --reason completed
```

#### CI/CD Status

```bash
# View workflow runs
gh run list

# View specific run details
gh run view 789

# Watch a running workflow
gh run watch 789

# Re-run failed jobs
gh run rerun 789 --failed
```

### Example: PR Creation Workflow

```
You: "Create a PR for the changes on this branch"

Codex: I'll create a PR using the gh CLI.

First, let me check the branch status and recent commits...

Running: git status
Running: git log main..HEAD --oneline

Found 3 commits:
- abc123 feat: add user authentication
- def456 feat: add login form
- ghi789 test: add auth tests

Creating PR...

Running: gh pr create --title "feat: add user authentication" --body "$(cat <<'EOF'
## Summary
- Added user authentication system
- Added login/logout forms
- Added comprehensive tests

## Changes
- `src/auth/` - New authentication module
- `src/components/LoginForm.tsx` - Login UI
- `tests/auth.test.ts` - Test coverage

## Test Plan
- [x] Unit tests pass
- [x] Manual login/logout tested
- [ ] Review security implications

🤖 Generated with Codex
EOF
)"

PR created: https://github.com/owner/repo/pull/234
```

### Example: PR Review Workflow

```
You: "Review PR #234 for any issues"

Codex: I'll fetch and analyze PR #234.

Running: gh pr view 234
Running: gh pr diff 234

## PR #234: Add user authentication

### Changes Summary
- 12 files changed
- +847 lines, -23 lines
- Main changes in src/auth/

### Review Findings

**Security Concerns:**
1. `src/auth/session.ts:45` - JWT secret is hardcoded
   ```typescript
   const secret = "hardcoded-secret";  // Should use env var
   ```

2. `src/auth/login.ts:23` - No rate limiting on login attempts

**Code Quality:**
- Good test coverage (89%)
- Follows project conventions
- Types are well-defined

**Suggestions:**
1. Move JWT secret to environment variable
2. Add rate limiting middleware
3. Consider adding refresh token logic

Want me to add these as PR comments?
```

### Example: CI Failure Investigation

```
You: "The CI is failing on PR #234. What's wrong?"

Codex: I'll check the CI status and investigate.

Running: gh pr checks 234

Checks for PR #234:
✓ lint (passed)
✓ typecheck (passed)
✗ test (failed)
✓ build (passed)

The test job failed. Let me get details...

Running: gh run view 12345 --log-failed

Failed test output:
  FAIL src/auth/login.test.ts
    ✕ should reject invalid credentials (45ms)

    Expected: "Invalid email or password"
    Received: "Invalid credentials"

The error message changed but the test wasn't updated.

Fix: Update the test expectation in src/auth/login.test.ts:67

```typescript
// Change this:
expect(error.message).toBe("Invalid email or password");

// To this:
expect(error.message).toBe("Invalid credentials");
```

Want me to make this fix and push?
```

### Example: Issue Triage

```
You: "Look at our open bugs and prioritize them"

Codex: I'll fetch and analyze open bug issues.

Running: gh issue list --label bug --state open --limit 20

Found 8 open bugs:

| # | Title | Age | Comments |
|---|-------|-----|----------|
| 89 | Login fails on Safari | 5 days | 12 |
| 87 | Memory leak in dashboard | 3 days | 3 |
| 85 | Incorrect date formatting | 7 days | 1 |
| 82 | Crash on empty cart | 2 weeks | 8 |

Let me analyze each for priority...

Running: gh issue view 89
Running: gh issue view 87

## Priority Recommendations

**P0 - Critical (fix immediately):**
- #89 Login fails on Safari - Blocks 15% of users

**P1 - High (this sprint):**
- #87 Memory leak - Causes crashes after 30min use
- #82 Crash on empty cart - Poor UX, easy fix

**P2 - Medium (next sprint):**
- #85 Date formatting - Cosmetic, low impact

Want me to add priority labels to these issues?
```

### Tips for Effective `gh` Usage

1. **Authenticate first**: Run `gh auth login` before using Codex with `gh`

2. **Use `gh api` for advanced queries**:
   ```bash
   # Get PR review comments
   gh api repos/owner/repo/pulls/123/comments

   # Get commit status
   gh api repos/owner/repo/commits/abc123/status
   ```

3. **Combine with other tools**:
   ```
   You: "Check if the tests pass locally, then create a PR if they do"

   Codex: Running tests first...
   npm test → All 47 tests pass

   Tests pass. Creating PR...
   gh pr create...
   ```

4. **Let Codex write detailed PR descriptions**: Codex can analyze your commits and generate comprehensive PR descriptions automatically.

---

## 2. Multi-Tool Workflows
> Need concrete syntax for registering/calling helpers? See Module 8 “Function Calling & Tool Wrappers” and the `functions.json` example in Module 3 for full code snippets.

### Workflow ingredients
A Codex-driven workflow typically coordinates:
- **Prompt templates** (`docs/prompt_templates/feature_plan.md`) to capture intent
- **Helper functions** (`codex_helpers/`) that read files, run tests, gather metrics
- **Validation scripts** (`scripts/validate.sh`) that ensure safety before accepting output
- **Logging hooks** that archive every session for traceability

### Example workflow: Feature delivery
```
1. Start session with a template that describes the new feature and available helpers
2. Codex runs functions:
   - `read_file` to grab relevant files
   - `grep` to spot mentions of the feature
   - `run_tests` to ensure the suite is green
3. Codex returns a plan + diff
4. You run `scripts/verify_diff.py` to ensure no sensitive files were touched
5. Commit the change + log metadata
6. Ask Codex to summarize the changelog and include it in the PR description
```
Each helper returns JSON so Codex can reason about structured data instead of raw text.

### Orchestrating multiple tools
Combine helper outputs manually:
1. Ask helper A for architecture stats
2. Ask helper B for test results
3. Feed both results into a follow-up prompt that stitches the insights together
This imitates parallel investigation without spawning multiple agents—just multiple prompts with curated inputs.

### Automation tips
- Build small wrappers for each helper so you can call them from the CLI and from your code
- Keep helper schemas in `codex_helpers/functions.json` so registering them with OpenAI is declarative
- Use logging imports to keep a chronological trace of which helper ran when

---

## 3. CI/CD Integration

### Principle
Let Codex prepare the change; let your CI validate it. The model should never be the only gatekeeper—CI ensures repeatability.

### Pre-commit automation
Wrap your workflow in scripts that run before you call Codex or commit:
- `scripts/session_start.sh` gathers git status, tests coverage, open issues
- `scripts/validate_diff.py` rejects risky modifications (e.g., editing production config)
- `scripts/run_helpers.py` exposes helper metadata for function calling

### Sample GitHub Actions snippet
```yaml
name: Codex Workflow
on: [pull_request]
jobs:
  codex:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Run helpers
        run: |
          python codex_helpers/list_todos.py
          python scripts/validate_diff.py --diff origin/main
      - name: Run tests
        run: pytest
      - name: Run linter
        run: flake8
```
Codex prepares the description, but CI validates before merging.

### PR composition workflow
1. Use Codex to generate a changelog (summary + list of tests)
2. Add the summary to your PR template
3. Let CI run the same tests Codex suggested (mirrors the function calls)
4. If CI fails, send the test output back to Codex for a follow-up fix prompt

---

## 4. Knowledge Transfer

### Portable prompt library
Store prompts that worked well in `docs/prompt_templates/` with metadata:
```
- prompt_name: feature_plan
  purpose: plan new feature rollout
  helpers: [read_file, run_tests]
  constraints: must mention security considerations
```
When starting a new repository, copy the prompts, tweak the `system` message, and reuse the helper manifest. Bundle them into a small “starter kit” with:
- `docs/prompt_templates/` export + a `README.md` that maps prompts → helpers → guardrails
- `codex_helpers/functions.json` plus a short `codex_helpers/README.md` that explains return schemas and timeouts
- A one-page “first run” script (e.g., `scripts/session_start.sh`) that prints git status, TODO counts, and helper availability so every session begins with the same context

### Helper reuse
Structure `codex_helpers/` so functions are agnostic to the repo:
- Accept file paths relative to root
- Return JSON with `success`, `details`, `tokens`
- Log input arguments for auditing

Maintain README sections describing how to add new helpers and register them in `functions.json` so teammates build consistent tooling.

### Cross-project onboarding
For every new project:
1. Copy `codex_helpers/` and update the manifest
2. Import prompt templates for common workflows (bug triage, release notes)
3. Document the helper names and their expected roles in `docs/playbook/scenarios.md`
4. Run `scripts/session_start.sh` to emit a quick status summary so each Codex session begins with baseline context
5. Add a freshness signal: stamp `docs/prompt_templates/README.md` with “Last validated on: YYYY-MM-DD” and note the model version used for validation
6. Capture portability gaps: if a helper assumes repo-specific paths or env vars, document the shim needed in `codex_helpers/README.md` so it is obvious what to swap out

---

## 5. Community Contribution

### Share your helpers
Publish your helper catalog on GitHub:
- Include usage examples, input/output schemas, and sample logs
- Tag contributions as `codex-helper` or `codex-prompt`
- Encourage others to fork the manifest and adapt it
 - Provide a `scripts/demo.sh` that runs a realistic helper call end-to-end so consumers can verify setup quickly

### Pattern sharing
Write about integration patterns in `docs/patterns/` or blog posts:
- “How we coordinate prompt batches for feature delivery”
- “Function catalogs we trust for CI safety”
- “Session orchestration for multi-step investigations”

### Open-source strategy
If you publish `codex_helpers`, include tests, docs, and license. Ask: Does it help other teams integrate Codex with their pipelines?
Minimum viable release checklist:
- `README` with install/setup (env vars, Python/Rust versions), safety notes, and expected outputs
- `functions.json` with accurate parameter types and examples
- Tests or a smoke script that exercises each helper and exits non-zero on failure
- `LICENSE` + `CONTRIBUTING.md` describing how to add helpers, schemas, and validation
- Changelog that records schema changes so downstream users can pin versions

Contribution intake tips:
- Add issue templates for “new helper proposal” and “schema change” that require sample payloads and security considerations
- Maintain a small “compatibility matrix” in the README (model version × helper version × known caveats)
- Publish sample logs of helper invocations (redacted) so others see expected shapes and error cases

---

## Next Steps
1. Build a helper, register it via `tools.json`, and use it in a Codex session
2. Update your CI workflow to reflect the same helpers (e.g., call the helper after tests)
3. Document the story in `docs/playbook/scenarios.md`
4. Share the pattern with others (Docs, README, blog snippet)
