# Exercise 1: GitHub CLI Workflow Practice

## Objective

Master GitHub CLI (`gh`) commands for seamless PR and issue management directly from the terminal.

## Background

The GitHub CLI is one of the most powerful tools for Codex integration. It provides direct access to GitHub's API, eliminating context switches between terminal and browser.

## Part A: PR Creation Workflow

**Task**: Create a complete PR workflow using `gh` commands.

1. Set up a test scenario:
   ```bash
   # Create a feature branch
   git checkout -b feature/test-gh-workflow

   # Make a simple change (create a test file)
   echo "# Test File" > test-gh-workflow.md
   git add test-gh-workflow.md
   git commit -m "feat: add test file for gh workflow practice"
   ```

2. Explore PR creation options:
   ```bash
   # View available options
   gh pr create --help

   # Create PR interactively
   gh pr create

   # Or create with all options specified
   gh pr create \
     --title "feat: add test file for gh workflow practice" \
     --body "## Summary
   - Added test file for practicing gh CLI

   ## Test Plan
   - [x] File created successfully

   🤖 Generated with Codex"
   ```

3. Practice PR inspection commands:
   ```bash
   # List your open PRs
   gh pr list --author @me

   # View PR details
   gh pr view <PR_NUMBER>

   # View PR diff
   gh pr diff <PR_NUMBER>

   # Check CI status
   gh pr checks <PR_NUMBER>
   ```

## Part B: Issue Management

**Task**: Practice issue creation and triage workflows.

1. Create test issues:
   ```bash
   # Create a bug report
   gh issue create \
     --title "Bug: Test issue for practice" \
     --body "## Description
   This is a test issue for practicing gh CLI.

   ## Steps to Reproduce
   1. N/A - test issue

   ## Expected Behavior
   N/A" \
     --label "bug"

   # Create a feature request
   gh issue create \
     --title "Feature: Test enhancement request" \
     --body "## Description
   Test feature request for gh CLI practice." \
     --label "enhancement"
   ```

2. Practice issue queries:
   ```bash
   # List all open issues
   gh issue list

   # Filter by label
   gh issue list --label bug

   # View issue details
   gh issue view <ISSUE_NUMBER>

   # Add a comment
   gh issue comment <ISSUE_NUMBER> --body "Investigating this issue..."
   ```

3. Close and clean up:
   ```bash
   # Close issues
   gh issue close <ISSUE_NUMBER> --reason "not planned"
   ```

## Part C: CI/CD Status Investigation

**Task**: Learn to monitor and troubleshoot CI/CD from the command line.

1. View workflow runs:
   ```bash
   # List recent workflow runs
   gh run list

   # View specific run
   gh run view <RUN_ID>

   # Watch a running workflow
   gh run watch <RUN_ID>
   ```

2. Investigate failures:
   ```bash
   # View failed job logs
   gh run view <RUN_ID> --log-failed

   # Rerun failed jobs
   gh run rerun <RUN_ID> --failed
   ```

3. Document your findings:
   | Command | Purpose | When to Use |
   |---------|---------|-------------|
   | `gh pr checks` | View CI status | Before merging |
   | `gh run list` | Find recent runs | Investigating history |
   | `gh run view --log-failed` | Debug failures | CI is red |

## Part D: Advanced API Usage

**Task**: Use `gh api` for advanced queries.

1. Query PR comments:
   ```bash
   # Get PR review comments
   gh api repos/{owner}/{repo}/pulls/<PR_NUMBER>/comments

   # Get PR reviews
   gh api repos/{owner}/{repo}/pulls/<PR_NUMBER>/reviews
   ```

2. Query commit status:
   ```bash
   # Get commit status
   gh api repos/{owner}/{repo}/commits/<COMMIT_SHA>/status
   ```

3. Create a combined workflow:
   ```bash
   # Script: check-and-merge.sh
   #!/bin/bash
   PR_NUMBER=$1

   echo "Checking PR #$PR_NUMBER..."

   # Check if all checks pass
   gh pr checks $PR_NUMBER --watch

   # If checks pass, show diff for final review
   echo "All checks passed. Showing diff..."
   gh pr diff $PR_NUMBER

   # Prompt for merge
   read -p "Merge this PR? (y/n) " answer
   if [ "$answer" = "y" ]; then
     gh pr merge $PR_NUMBER --squash
   fi
   ```

---

## Hints

<details>
<summary>Hint 1: Authentication setup</summary>

Before using `gh`, authenticate:
```bash
gh auth login
```

Choose:
- GitHub.com or GitHub Enterprise
- HTTPS or SSH
- Authenticate via browser or token
</details>

<details>
<summary>Hint 2: Useful aliases</summary>

Set up aliases for common operations:
```bash
# In your shell config
alias prc="gh pr create"
alias prl="gh pr list"
alias prv="gh pr view"
alias prd="gh pr diff"
```
</details>

<details>
<summary>Hint 3: JSON output for scripting</summary>

Use `--json` for scriptable output:
```bash
gh pr list --json number,title,author
gh issue list --json number,title,labels
```
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Key `gh` Workflows

**PR Creation Best Practices**:
```bash
# Gather context first
git log main..HEAD --oneline
git diff main --stat

# Create comprehensive PR
gh pr create \
  --title "$(git log -1 --format=%s)" \
  --body "$(cat <<'EOF'
## Summary
[Auto-generated from commits]

## Changes
$(git diff main --stat)

## Test Plan
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual verification

🤖 Generated with Codex
EOF
)"
```

**Issue Triage Workflow**:
```bash
# Get all bugs, sorted by age
gh issue list --label bug --json number,title,createdAt \
  | jq 'sort_by(.createdAt)'

# Prioritize by activity
gh issue list --label bug --json number,title,comments \
  | jq 'sort_by(.comments) | reverse'
```

**CI Investigation Pattern**:
```bash
# 1. Check which check failed
gh pr checks <PR>

# 2. Find the run ID
gh run list --branch <branch>

# 3. Get detailed logs
gh run view <RUN_ID> --log-failed

# 4. Fix and rerun
git push  # After fixing
gh run rerun <RUN_ID> --failed
```

### Integration with Codex

The power of `gh` with Codex:
1. **Context gathering**: Codex reads issue/PR details
2. **Automated actions**: Codex creates PRs with rich descriptions
3. **CI debugging**: Codex fetches logs and suggests fixes
4. **Issue triage**: Codex analyzes and prioritizes bugs

### Key Insight

The GitHub CLI transforms GitHub from a context-switch into a seamless part of your terminal workflow. Every browser action has a CLI equivalent.

### Workflow Pattern

```
1. gh issue view → Understand requirements
2. git checkout -b → Create branch
3. [make changes] → Implement
4. git commit → Save work
5. gh pr create → Submit for review
6. gh pr checks --watch → Monitor CI
7. gh pr merge → Complete workflow
```

</details>

---

## Reflection Questions

1. Which `gh` commands will you use most frequently?
2. How does CLI-based GitHub access change your workflow efficiency?
3. What custom scripts or aliases would help your specific workflow?

---

**Next**: [Exercise 2: Multi-Tool Orchestration](exercise-2.md)
