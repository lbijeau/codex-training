# Multi-Layer Review

## Context

You've implemented a feature and want to ensure high quality before committing or creating a PR.

## Problem

Single-pass review misses issues. Different perspectives catch different problems.

## Solution

Implement multiple layers of review, each catching different categories of issues.

**The Review Pyramid**:
```
Layer 3: Manual Review (Architecture, UX, Business Logic)
Layer 2: AI-Assisted Review (focused review prompts)
Layer 1: Automated Checks (Linters, Formatters via hooks)
```

## Trade-offs

**Pros**:
- Catches more issues earlier
- Different layers catch different problems
- Higher quality output
- Less rework later

**Cons**:
- Takes more time upfront
- Can feel like overhead for small changes
- Need to set up automation

**Alternatives**:
- Single review pass (faster but lower quality)
- Only automated checks (misses logic issues)
- Only manual review (misses simple issues)

## Examples

### Example 1: Feature Implementation

```bash
# After implementing user registration feature:

# Layer 1 - Automated:
# - Hooks auto-format code (prettier)
# - Hooks run linter (eslint)
# - Hooks check types (tsc)

# Layer 2 - AI-Assisted Review:
codex "Review the registration implementation for:
- Logic errors and edge cases
- Error handling
- Security issues
- Code quality"

codex "Review test coverage for the registration feature:
- Edge case testing gaps
- Error scenario testing gaps
- Integration testing gaps"

# Layer 3 - Manual:
# - Review UX flow
# - Verify business requirements
# - Check architecture decisions

# Result: Comprehensive quality assurance
```

### Example 2: Bug Fix

```bash
# After fixing authentication bug:

# Layer 1 - Automated:
# - Linter passes ✓
# - Tests pass ✓
# - Format correct ✓

# Layer 2 - AI-Assisted Review:
codex "Review this bug fix:
- Did the fix address the root cause?
- Are there similar bugs elsewhere?
- Is error handling comprehensive?
- Should we add a regression test?"

# Layer 3 - Manual:
# - Verify fix works in browser
# - Check no side effects
# - Confirm fix matches issue description

# Result: High confidence in fix quality
```

### Example 3: Refactoring

```bash
# After refactoring data validation:

# Layer 1 - Automated:
# - All tests still pass ✓
# - No lint errors ✓
# - Types correct ✓

# Layer 2 - Parallel Reviews:
codex exec "Review the refactor for code quality and maintainability" > review.txt &
codex exec "Check that test coverage is maintained after refactoring" > coverage.txt &
wait
cat review.txt coverage.txt

# Layer 3 - Manual:
# - Verify behavior unchanged
# - Check performance not degraded
# - Confirm code more maintainable

# Result: Safe, quality refactoring
```

## Implementation

### Layer 1: Hooks Setup

`.codex/config.json`:
```json
{
  "hooks": {
    "Write:Callback": {
      "command": "prettier",
      "args": ["--write", "$FILE_PATH"]
    },
    "Bash:Validate": {
      "command": "sh",
      "args": ["-c", "
        if [[ $BASH_COMMAND == git\\ commit* ]]; then
          npm run lint && npm test
        fi
      "]
    }
  }
}
```

### Layer 2: AI-Assisted Review Workflow

```bash
# After implementation:
# 1. Ask Codex to review your changes
codex "Review my changes for bugs, logic errors, and quality issues"

# 2. Address findings

# 3. Check test coverage
codex "Analyze test coverage for my changes - what's missing?"

# 4. Add missing tests

# 5. Proceed to manual review
```

### Layer 3: Manual Checklist

```
- [ ] Meets requirements?
- [ ] UX makes sense?
- [ ] Architecture sound?
- [ ] Security considerations?
- [ ] Performance acceptable?
- [ ] Documentation updated?
```

## When to Use

**Always use for**:
- New features
- Bug fixes going to production
- Refactoring critical code
- PR preparation

**Can simplify for**:
- Experimental code
- Documentation changes
- Minor style fixes

## Quality Gates

Think of each layer as a gate:
```
Code → Layer 1 Gate → Layer 2 Gate → Layer 3 Gate → Commit/PR
       (Automated)    (AI Review)    (Manual)
```

Block progression until each gate passes.

## Related Patterns

- [Test-Driven Development](tdd-workflow.md)
- [Proactive Quality Gates](quality-gates.md)
