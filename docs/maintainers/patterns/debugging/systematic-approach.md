# Systematic Debugging Approach

## Context

You've tried fixing a bug 3 times and it's still not working. Time to stop guessing.

## Problem

Guessing at fixes wastes time, creates new bugs, and doesn't address root cause.

## Solution

Use the systematic debugging framework: stop after 3 failed attempts and switch to methodical investigation.

**The 3-Attempt Rule**: After 3 failed fix attempts, STOP and use systematic approach.

## Trade-offs

**Pros**:
- Finds root cause, not symptoms
- Prevents creating new bugs
- Builds understanding of codebase
- Prevents wasted time on guessing

**Cons**:
- Feels slower initially
- Requires discipline to stop guessing
- Need to add instrumentation sometimes

**Alternatives**:
- Keep guessing (wastes time, may never find fix)
- Ask someone else (not always available)
- Give up (not an option)

## The Framework

### Phase 1: Root Cause Investigation

**Goal**: Find where the problem originates

```
1. Reproduce the issue reliably
2. Identify the error location (stack trace)
3. Trace execution backwards
4. Find where data becomes invalid
5. Identify the SOURCE of invalid data
```

**Key Principle**: Fix the source, not the symptom.

### Phase 2: Pattern Analysis

**Goal**: Understand if this is isolated or systemic

```
1. Is this a known pattern?
2. Have we seen similar issues?
3. What's the common cause?
4. Is this systemic or one-off?
```

### Phase 3: Hypothesis Testing

**Goal**: Validate your understanding

```
1. Form hypothesis about cause
2. Design test to validate/reject
3. Add instrumentation if needed
4. Run test
5. Confirm or reject hypothesis
6. If rejected, form new hypothesis
```

### Phase 4: Implementation

**Goal**: Fix properly with safety net

```
1. Implement fix addressing root cause
2. Add regression test
3. Verify fix works
4. Check for similar issues elsewhere
5. Document findings
```

## Examples

### Example 1: Login Failing Intermittently

```
❌ Guessing Approach:
Attempt 1: "Maybe it's the password validation" → Doesn't fix it
Attempt 2: "Maybe it's the database query" → Doesn't fix it
Attempt 3: "Maybe it's the session handling" → Doesn't fix it
Attempt 4: "Maybe it's..." → Still guessing...

✅ Systematic Approach:
After attempt 3 fails:

"Use superpowers:systematic-debugging skill to investigate
intermittent login failures."

Phase 1 - Root Cause:
- Reproduce: Login works 70% of time, fails 30%
- Add logging to see pattern
- Find: Fails when token refresh happens simultaneously
- Source: Race condition in token refresh logic

Phase 2 - Pattern:
- Check: Do we have other race conditions?
- Find: Similar pattern in session management

Phase 3 - Hypothesis:
- Hypothesis: Adding mutex will prevent race condition
- Test: Add mutex, reproduce issue 100 times
- Result: No failures

Phase 4 - Implementation:
- Implement mutex in token refresh
- Add test for concurrent refresh
- Fix similar issue in session management
- Document race condition pattern

Result: Root cause fixed, plus related issues prevented
```

### Example 2: API Response Slow

```
After 3 failed optimization attempts:

Phase 1 - Root Cause Investigation:
"Profile the /api/users endpoint.
Add timing logs at each stage:
- Request parsing
- Authorization
- Database query
- Response serialization"

Finding: 90% of time in database query

"Analyze the database query.
Enable query logging.
Check execution plan."

Root Cause: Missing index on frequently filtered column

Phase 2 - Pattern Analysis:
"Search for similar queries without indexes.
Check if this is a pattern."

Finding: 5 other queries with same issue

Phase 3 - Hypothesis Testing:
"Add index to users.email column.
Measure query time before and after."

Result: Query time 450ms → 12ms

Phase 4 - Implementation:
- Create migration for index
- Add indexes for similar queries
- Document indexing strategy
- Add performance tests

Result: 15x improvement + prevented future issues
```

### Example 3: Test Failing in CI Only

```
Bug: Test passes locally, fails in CI

Phase 1 - Root Cause:
"Identify differences between local and CI:
- Environment variables
- Node version
- Dependencies
- Timing/concurrency"

Add logging to both environments
Compare execution

Finding: Test relies on timing (race condition)

Phase 2 - Pattern:
"Search for other timing-dependent tests.
Use Grep for setTimeout, setInterval in tests."

Finding: 12 tests with timing issues

Phase 3 - Hypothesis:
"Hypothesis: Test needs condition-based waiting, not timeouts.
Replace setTimeout with waitFor(condition)."

Test: Run 100 times in CI

Result: 100% pass rate

Phase 4 - Implementation:
- Replace timing with condition waiting
- Fix other 12 tests
- Document pattern
- Add lint rule against timing in tests

Result: Flaky tests eliminated
```

## Using with Codex

### With superpowers:systematic-debugging

```
After 3 failed attempts:

"Use superpowers:systematic-debugging skill to debug [issue].

Current situation:
- What I tried: [attempts 1, 2, 3]
- What happened: [results]
- Error message: [if any]

Systematically investigate root cause."

The skill will guide you through the 4 phases.
```

### Manual Systematic Approach

```
"I've tried 3 fixes and the bug persists.
Let's debug systematically:

Phase 1: Root Cause Investigation
- Add logging to trace execution
- Identify where data becomes invalid
- Find the source

Then we'll do phases 2-4."
```

## The 3-Attempt Rule

**When to Apply**:
```
Try 1 → Failed
Try 2 → Failed
Try 3 → Failed
→ STOP → Systematic Debugging
```

**Don't**:
- Try attempt 4, 5, 6... (wasting time)
- Guess at more fixes
- Make random changes

**Do**:
- Stop and switch to systematic approach
- Add instrumentation/logging
- Trace backwards from error
- Form and test hypotheses

## Root Cause vs Symptom

**Symptom**: What you observe
**Root Cause**: Why it happens

**Example**:
- Symptom: Login fails
- Symptom: Token is expired
- Symptom: Refresh wasn't called
- Symptom: Refresh logic has bug
- **Root Cause**: Edge case in token refresh not handled

Always fix root cause, not symptom.

## Instrumentation Strategy

**When execution path is unclear**:

```
Add strategic logging:
1. Entry points (function start)
2. Decision points (if/else branches)
3. Data transformations (before/after)
4. Exit points (return values)
5. Error paths (catch blocks)

Example:
console.log('validateToken: start', { token });
console.log('validateToken: decoded', { decoded });
console.log('validateToken: check expiry', { exp, now });
console.log('validateToken: result', { valid });
```

Reproduce with logging → Find where things go wrong

## Related Patterns

- [Root Cause Tracing](root-cause-tracing.md)
- [Test-Driven Development](../quality/tdd-workflow.md)
