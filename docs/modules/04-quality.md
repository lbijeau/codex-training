# Module 4: Quality & Verification

> **Note on Tooling**: This module references some advanced tooling patterns (specialized review prompts, skills) that vary by environment. The core patterns—multi-layer reviews, TDD, systematic debugging, quality gates—apply universally. Adapt the tooling examples to what's available in your setup.

## Overview

Build systematic approaches to ensure code quality, catch issues early, and maintain high standards.

**Learning Objectives**:
- Implement multi-layer review patterns
- Apply test-driven development with Codex
- Use systematic debugging approaches
- Create proactive quality gates
- Master root cause analysis

**Time**: 3-4 hours

---

## 1. Multi-Layer Review Patterns

### The Review Pyramid

```
┌─────────────────────────────┐
│   Manual Review (Top)       │  Human judgment
├─────────────────────────────┤
│   AI-Assisted Review        │  Focused review prompts
├─────────────────────────────┤
│   Automated Checks          │  Linters, formatters (hooks)
└─────────────────────────────┘
```

### Layer 1: Automated Checks (Hooks)

**Auto-format on Write**:
```json
{
  "hooks": {
    "Write:Callback": {
      "command": "prettier",
      "args": ["--write", "$FILE_PATH"]
    }
  }
}
```

**Lint Validation**:
```json
{
  "hooks": {
    "Write:Validate": {
      "command": "eslint",
      "args": ["--quiet", "$FILE_PATH"]
    }
  }
}
```

### Layer 2: AI-Assisted Review

**Code Review Prompt**:
```bash
# After implementing feature, ask for a focused review
codex "Review my changes for:
- Logic errors
- Edge cases
- Error handling
- Code quality

Show git diff first, then provide specific feedback."
```

**Test Coverage Review Prompt**:
```bash
# Before creating PR, check test coverage
codex "Review test coverage for the recent changes:
- What test cases are missing?
- What edge cases aren't covered?
- Are there integration test gaps?

Compare src/ changes against tests/ and report gaps."
```

### Layer 3: Manual Review

**Human Focus Areas**:
- Architecture decisions
- UX considerations
- Business logic correctness
- Security implications

### Review Workflow Pattern

```bash
# 1. Implement feature
codex "Implement the user authentication feature"

# 2. Automated checks run via hooks (formatting, linting)

# 3. Request code review
codex "Review my changes for logic errors, edge cases, and quality issues"

# 4. Address findings
codex "Fix the issues identified in the review"

# 5. Check test coverage
codex "What tests are missing for the changes I made?"

# 6. Add missing tests
codex "Add the missing test cases you identified"

# 7. Self-review and create PR
codex "Show me a summary of all changes ready for PR"
```

---

## 2. Test-Driven Development with Codex

### TDD Cycle with Codex

**Red-Green-Refactor**:
```
1. RED: Write failing test
   - Ask Codex to write test first
   - Run test, confirm it fails

2. GREEN: Implement minimal code
   - Ask Codex to implement
   - Run test, confirm it passes

3. REFACTOR: Improve code
   - Ask Codex to refactor
   - Tests still pass
```

### TDD Patterns

**Pattern 1: Test-First Feature**
```
You: "I need a function to validate email addresses.
      Write the test first following TDD."

Codex: [Writes test]

You: "Run the test" (it fails - RED)

You: "Now implement the minimal code to pass"

Codex: [Implements]

You: "Run the test" (it passes - GREEN)

You: "Refactor for clarity"

Codex: [Refactors while keeping tests green]
```

**Pattern 2: Edge Case Discovery**
```
1. Implement basic functionality
2. Ask: "What edge cases am I missing?"
3. Add tests for edge cases
4. Implement handling
5. Verify all tests pass
```

**Pattern 3: Test Coverage Analysis**
```bash
# 1-2. Implement feature and run coverage
codex "Implement the feature with tests, then run coverage report"

# 3-4. Analyze gaps
codex "Look at the coverage report and identify:
- Uncovered code paths
- Missing edge case tests
- Integration test gaps"

# 5. Add missing tests
codex "Add tests for the uncovered paths you identified"
```

### TDD with Superpowers Skill

Use `superpowers:test-driven-development` skill:
```
Features:
- Enforces test-first approach
- Watches for test failures
- Ensures minimal implementation
- Guides refactoring
```

---

## 3. Systematic Debugging

### The 3-Attempt Rule

**Rule**: After 3 failed attempts, STOP and use systematic approach.

❌ **Guessing Approach**:
```
Try fix 1 → Doesn't work
Try fix 2 → Doesn't work
Try fix 3 → Doesn't work
Try fix 4 → ...
(Keep guessing)
```

✅ **Systematic Approach**:
```
Try fix 1 → Doesn't work
Try fix 2 → Doesn't work
Try fix 3 → Doesn't work
STOP → Use superpowers:systematic-debugging
```

### Systematic Debugging Framework

**Phase 1: Root Cause Investigation**
```
1. Reproduce the issue
2. Identify the error location
3. Trace execution backwards
4. Find where data becomes invalid
5. Identify the source
```

**Phase 2: Pattern Analysis**
```
1. Is this a known pattern?
2. Have we seen similar issues?
3. What's the common cause?
4. Is this systemic or isolated?
```

**Phase 3: Hypothesis Testing**
```
1. Form hypothesis about cause
2. Design test to validate
3. Add instrumentation if needed
4. Run test
5. Confirm or reject hypothesis
```

**Phase 4: Implementation**
```
1. Implement fix
2. Add test to prevent regression
3. Verify fix works
4. Check for similar issues
```

### Debugging Patterns

**Pattern: Root Cause Tracing**
```
Error occurs deep in call stack:

1. Note the error and location
2. Trace backwards through calls
3. At each level, check assumptions
4. Add logging/instrumentation
5. Find where data becomes invalid
6. Fix at source, not symptom
```

**Pattern: Binary Search Debugging**
```
Feature worked, now broken:

1. Identify last known good state (commit)
2. Identify first known bad state
3. Binary search between them (git bisect)
4. Find breaking commit
5. Analyze what changed
```

**Pattern: Isolation Testing**
```
Complex system failing:

1. Isolate component
2. Test in isolation
3. If works → Integration issue
4. If fails → Component issue
5. Narrow scope iteratively
```

---

## 4. Proactive Quality Gates

### Quality Gates Framework

**Gate 1: Pre-Implementation**
```
- [ ] Requirements clear?
- [ ] Design reviewed?
- [ ] Test strategy defined?
- [ ] Edge cases identified?
```

**Gate 2: During Implementation**
```
- [ ] Tests written first (TDD)?
- [ ] Code formatted (hooks)?
- [ ] Linter passing?
- [ ] Incremental commits?
```

**Gate 3: Post-Implementation**
```
- [ ] All tests passing?
- [ ] Code reviewer run?
- [ ] Test analyzer run?
- [ ] Manual review done?
```

**Gate 4: Pre-Commit**
```
- [ ] Tests pass?
- [ ] No debug code?
- [ ] Formatted?
- [ ] Commit message clear?
```

**Gate 5: Pre-PR**
```
- [ ] All gates above passed?
- [ ] PR description complete?
- [ ] Reviewers identified?
- [ ] CI will pass?
```

### Implementing Quality Gates

**With Hooks**:
```json
{
  "hooks": {
    "Bash:Validate": {
      "command": "sh",
      "args": ["-c", "
        if [[ $BASH_COMMAND == git\\ commit* ]]; then
          npm test && npm run lint
        fi
      "]
    }
  }
}
```

**With Parallel Review Prompts**:
```bash
# Run reviews concurrently before committing
codex exec "Review my changes for bugs, logic errors, and quality issues" > code-review.txt &
codex exec "Analyze test coverage gaps for my changes" > test-review.txt &
wait

# Check results before committing
cat code-review.txt test-review.txt
```

**With Skills**:
Use `superpowers:verification-before-completion`:
```
Ensures:
- Tests pass
- Code quality checks done
- No TODOs without tickets
- Documentation updated
```

---

## 5. Root Cause Analysis Techniques

### The 5 Whys

**Technique**: Ask "why" 5 times to find root cause.

**Example**:
```
Bug: User login fails

Why? → Token validation fails
Why? → Token is expired
Why? → Refresh wasn't called
Why? → Refresh logic has bug
Why? → Edge case not handled
Root Cause: Missing edge case handling in token refresh
```

### Fault Tree Analysis

**Build a tree of potential causes**:
```
Login Failure
├─ Invalid credentials
│  ├─ User error
│  └─ Database issue
├─ Token problem
│  ├─ Expired
│  ├─ Invalid signature
│  └─ Wrong secret
└─ Network issue
   ├─ Timeout
   └─ Connection refused
```

Test each branch to isolate.

### Instrumentation Strategy

**When to Add Instrumentation**:
- Execution path unclear
- Data transformation complex
- Timing-dependent bugs
- Integration points

**What to Log**:
- Input values
- Intermediate states
- Decision points
- Output values
- Timing information

**Pattern**:
```
1. Identify unclear section
2. Add strategic logging
3. Reproduce issue
4. Analyze logs
5. Identify problem
6. Remove logging (or keep if useful)
```

---

## 6. Quality Patterns Library

### Pattern: Defense in Depth

**Concept**: Validate at every layer

```typescript
// Layer 1: API input validation
function createUser(input: unknown) {
  const validated = UserInputSchema.parse(input);

  // Layer 2: Business logic validation
  if (await userExists(validated.email)) {
    throw new Error('User exists');
  }

  // Layer 3: Database constraints
  return db.users.create(validated); // DB has unique constraint
}
```

### Pattern: Fail Fast

**Concept**: Detect and report errors early

```typescript
❌ Silent failure:
function process(data) {
  try {
    return transform(data);
  } catch (e) {
    return null; // Silently fails!
  }
}

✅ Fail fast:
function process(data) {
  if (!isValid(data)) {
    throw new Error(`Invalid data: ${reason}`);
  }
  return transform(data);
}
```

### Pattern: Comprehensive Error Context

**Concept**: Errors should include debugging context

```typescript
❌ Poor error:
throw new Error('Failed');

✅ Good error:
throw new Error(
  `Failed to process order ${orderId} for user ${userId}: ${reason}`
);
```

### Pattern: Assertion-Driven Development

**Concept**: Use assertions to catch invalid states

```typescript
function processPayment(amount: number, userId: string) {
  assert(amount > 0, 'Amount must be positive');
  assert(userId, 'User ID required');
  assert(await userExists(userId), 'User must exist');

  // Process with confidence
}
```

---

## Key Takeaways

1. **Multi-Layer Reviews**: Automated checks + AI-assisted + Human
2. **TDD**: Write tests first, implement minimal, refactor
3. **Systematic Debugging**: Stop guessing after 3 attempts
4. **Quality Gates**: Checkpoints throughout development
5. **Root Cause Analysis**: Find source, not symptom

---

## Next Steps

1. Complete [Module 4 Exercises](../exercises/04-quality/)
2. Practice TDD workflow with Codex
3. Use systematic debugging on real bug
4. Implement quality gates in your project

---

## Quick Reference

### Review Layers
1. Automated (hooks): Format, lint
2. AI-assisted: Focused review prompts
3. Manual: Architecture, UX, business logic

### TDD Cycle
1. RED: Write failing test
2. GREEN: Minimal implementation
3. REFACTOR: Improve while tests pass

### Systematic Debugging
1. Root cause investigation
2. Pattern analysis
3. Hypothesis testing
4. Implementation with tests

### Quality Gates
- Pre-implementation: Design, requirements
- During: TDD, formatting, incremental
- Post: Tests, reviews, validation
- Pre-commit: All checks pass
- Pre-PR: Complete, ready for review

---

**Build quality in!** Head to [Exercise 1](../exercises/04-quality/exercise-1.md)
