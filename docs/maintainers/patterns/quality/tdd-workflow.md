# Test-Driven Development Workflow

## Context

Implementing a new feature or fixing a bug where you want to ensure correctness and avoid regressions.

## Problem

Writing tests after implementation often results in tests that match the implementation (even if wrong) rather than the requirements.

## Solution

Follow the RED-GREEN-REFACTOR cycle: write failing test first, implement minimal code to pass, then refactor.

**The TDD Cycle**:
```
RED → Write failing test
  ↓
GREEN → Minimal implementation to pass
  ↓
REFACTOR → Improve code while tests pass
  ↓
(Repeat)
```

## Trade-offs

**Pros**:
- Tests verify requirements, not implementation
- Catch bugs earlier (before they exist)
- Better code design (testable = good design)
- Confidence to refactor
- Living documentation

**Cons**:
- Feels slower initially
- Requires discipline
- Tests must be maintained
- Learning curve

**Alternatives**:
- Write tests after (less effective)
- No tests (dangerous)
- Only integration tests (slower feedback)

## Examples

### Example 1: Email Validation Function

```
RED Phase:
"Write a test for email validation function.
Test should verify:
- Valid emails pass (test@example.com)
- Invalid emails fail (not-an-email)
- Edge cases (email+tag@domain.com)

Use Jest/your test framework."

Run test → FAILS (function doesn't exist) ✓

GREEN Phase:
"Now implement the minimal email validation to make tests pass.
Don't over-engineer, just pass the tests."

Run test → PASSES ✓

REFACTOR Phase:
"Refactor the validation for clarity.
- Extract regex to constant
- Add better error messages
- Keep tests passing"

Run test → STILL PASSES ✓
```

### Example 2: Bug Fix with TDD

```
Bug: Login fails for emails with uppercase letters

RED Phase:
"Write a test that reproduces the bug:
- Test that 'User@Example.COM' can login
- Currently this should FAIL"

Run test → FAILS (confirms bug exists) ✓

GREEN Phase:
"Fix the validation to handle case-insensitive emails.
Minimal change to make test pass."

Run test → PASSES ✓

REFACTOR Phase:
"Check if we have similar case-sensitivity bugs elsewhere.
Add tests for those too."

All tests → PASS ✓
```

### Example 3: Feature with Edge Cases

```
Feature: User can delete their account

RED Phase:
"Write tests covering:
- [ ] User can delete own account
- [ ] User cannot delete others' accounts
- [ ] Deleted account data is removed
- [ ] User's content is handled (deleted/anonymized)
- [ ] Cannot login after deletion

All should FAIL initially."

GREEN Phase:
"Implement delete account feature.
Make one test pass at a time.
Don't try to pass all tests at once."

Implement incrementally:
- Basic deletion → 1st test passes
- Permission check → 2nd test passes
- Data cleanup → 3rd test passes
- etc.

REFACTOR Phase:
"Clean up the implementation.
Extract data cleanup to separate function.
Improve error handling.
Tests still pass."
```

## Using with Codex

### Pattern: Test-First Prompting

```
You: "I need to implement [feature].
     Use TDD approach:
     1. Write the test first
     2. Show me the failing test
     3. Then implement minimal code
     4. Then refactor"

Codex: [Writes test]

You: "Run the test" (verify it fails)

Codex: [Implements feature]

You: "Run the test" (verify it passes)

Codex: [Refactors]

You: "Run the test" (verify still passes)
```

### Using superpowers:test-driven-development

```
"Use superpowers:test-driven-development skill to implement [feature]"

The skill enforces:
- Test written first
- Test fails initially (RED)
- Minimal implementation (GREEN)
- Refactor with tests passing
```

## Red-Green-Refactor Checklist

### RED (Failing Test)
- [ ] Test describes desired behavior
- [ ] Test is specific and focused
- [ ] Test actually fails when run
- [ ] Failure message is clear

### GREEN (Passing Test)
- [ ] Implementation is minimal
- [ ] Test now passes
- [ ] No other tests broke
- [ ] Committed this working state

### REFACTOR (Improve Code)
- [ ] Code is cleaner/clearer
- [ ] All tests still pass
- [ ] No new functionality added
- [ ] Committed the refactored state

## Common Pitfalls

**❌ Don't:**
- Write implementation before test
- Make test pass before seeing it fail
- Add functionality during refactor
- Skip the failing test verification

**✅ Do:**
- See the test fail first (proves it tests something)
- Take small steps
- Commit at each phase
- Trust the process

## When to Use

**Always use for**:
- New feature implementation
- Bug fixes (regression tests)
- Refactoring (safety net)

**Can skip for**:
- Prototypes/spikes
- UI styling tweaks
- Documentation

## Related Patterns

- [Multi-Layer Review](multi-layer-review.md)
- [Systematic Debugging](../debugging/systematic-approach.md)
