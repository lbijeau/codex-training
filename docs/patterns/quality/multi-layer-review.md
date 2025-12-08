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
Layer 2: Specialized Agents (code-reviewer, test-analyzer)
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

```
After implementing user registration feature:

Layer 1 - Automated:
- Hooks auto-format code (prettier)
- Hooks run linter (eslint)
- Hooks check types (tsc)

Layer 2 - Agents:
"Spawn code-reviewer agent to review registration implementation.
Focus on:
- Logic errors and edge cases
- Error handling
- Security issues
- Code quality"

Then:
"Spawn pr-test-analyzer to review test coverage.
Identify gaps in:
- Edge case testing
- Error scenario testing
- Integration testing"

Layer 3 - Manual:
- Review UX flow
- Verify business requirements
- Check architecture decisions

Result: Comprehensive quality assurance
```

### Example 2: Bug Fix

```
After fixing authentication bug:

Layer 1 - Automated:
- Linter passes ✓
- Tests pass ✓
- Format correct ✓

Layer 2 - Agent:
"Spawn code-reviewer focused on:
- Did fix address root cause?
- Are there similar bugs elsewhere?
- Is error handling comprehensive?
- Should we add regression test?"

Layer 3 - Manual:
- Verify fix works in browser
- Check no side effects
- Confirm fix matches issue description

Result: High confidence in fix quality
```

### Example 3: Refactoring

```
After refactoring data validation:

Layer 1 - Automated:
- All tests still pass ✓
- No lint errors ✓
- Types correct ✓

Layer 2 - Parallel Agents:
"Spawn in parallel:
- code-reviewer: Check refactor quality
- pr-test-analyzer: Verify test coverage maintained"

Layer 3 - Manual:
- Verify behavior unchanged
- Check performance not degraded
- Confirm code more maintainable

Result: Safe, quality refactoring
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

### Layer 2: Agent Workflow

```
After implementation:
1. "Spawn code-reviewer agent to review my changes"
2. Address findings
3. "Spawn pr-test-analyzer to check test coverage"
4. Add missing tests
5. Proceed to manual review
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
       (Automated)    (Agents)       (Manual)
```

Block progression until each gate passes.

## Related Patterns

- [Test-Driven Development](tdd-workflow.md)
- [Proactive Quality Gates](quality-gates.md)
