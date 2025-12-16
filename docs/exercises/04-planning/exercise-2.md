# Exercise 2: Execute Plan in Batches

## Objective

Practice executing an implementation plan with review checkpoints between stages.

## Background

The `executing-plans` skill runs through stages in batches, pausing for review after each. This prevents runaway implementation and catches issues early.

## Part A: Set Up a Plan to Execute

**Task**: Create a simple plan to practice execution.

1. Create a plan for a utility module:

   ```markdown
   # IMPLEMENTATION_PLAN.md: String Utilities

   ## Stage 1: Core Functions
   **Goal**: Basic string manipulation functions
   **Success Criteria**:
   - [ ] capitalize(str) function
   - [ ] truncate(str, length) function
   - [ ] slugify(str) function
   - [ ] Unit tests for all functions

   ## Stage 2: Advanced Functions
   **Goal**: More complex string operations
   **Success Criteria**:
   - [ ] wordCount(str) function
   - [ ] extractEmails(str) function
   - [ ] maskSensitive(str, pattern) function
   - [ ] Unit tests for all functions

   ## Stage 3: Documentation
   **Goal**: Complete documentation
   **Success Criteria**:
   - [ ] JSDoc comments on all functions
   - [ ] README with usage examples
   - [ ] Type definitions (if TypeScript)
   ```

2. Save as `practice/scratch/IMPLEMENTATION_PLAN.md`

## Part B: Execute Stage 1

**Task**: Use the executing-plans skill for Stage 1.

1. Invoke the skill:
   ```
   "Use superpowers:executing-plans to execute Stage 1 of the
   string utilities plan in IMPLEMENTATION_PLAN.md"
   ```

2. Observe the execution:
   - Does it implement all success criteria?
   - Does it create tests?
   - Does it update the plan status?

3. **Review before proceeding**:
   - Check the generated code
   - Run the tests
   - Verify criteria are met

## Part C: Review Checkpoint

**Task**: Practice the review checkpoint process.

Before moving to Stage 2, verify Stage 1:

**Review Checklist**:
| Item | Status | Notes |
|------|--------|-------|
| capitalize() works correctly | | |
| truncate() handles edge cases | | |
| slugify() produces valid slugs | | |
| All tests pass | | |
| Code follows project style | | |

**If Issues Found**:
- Note them clearly
- Ask for fixes before proceeding
- Don't proceed with failing tests

## Part D: Execute Remaining Stages

**Task**: Continue through the plan.

1. After Stage 1 review passes:
   ```
   "Stage 1 review passed. Continue with Stage 2."
   ```

2. Repeat review process for Stage 2

3. Complete Stage 3 (documentation)

4. Final verification:
   ```
   "All stages complete. Use superpowers:verification-before-completion
   to verify the implementation."
   ```

**Questions to Answer**:
- How did checkpoints catch issues?
- What would have happened without reviews?
- How long did the full implementation take?

---

## Hints

<details>
<summary>Hint 1: Batch execution</summary>

Don't run all stages at once. The review checkpoints exist to:
- Catch issues early
- Prevent wasted work
- Enable course correction
</details>

<details>
<summary>Hint 2: When to stop</summary>

Stop execution when:
- Tests fail
- Success criteria not met
- Implementation diverges from plan
- New requirements surface
</details>

<details>
<summary>Hint 3: Updating the plan</summary>

As you complete stages:
- Update status in IMPLEMENTATION_PLAN.md
- Note any deviations
- Adjust remaining stages if needed
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Stage 1 Expected Output

```javascript
// practice/scratch/stringUtils.js

/**
 * Capitalizes the first letter of a string
 */
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncates a string to specified length with ellipsis
 */
function truncate(str, length) {
  if (!str || str.length <= length) return str;
  return str.slice(0, length - 3) + '...';
}

/**
 * Converts a string to URL-friendly slug
 */
function slugify(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

module.exports = { capitalize, truncate, slugify };
```

### Stage 1 Tests

```javascript
// practice/scratch/stringUtils.test.js

const { capitalize, truncate, slugify } = require('./stringUtils');

describe('capitalize', () => {
  test('capitalizes first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });
  test('handles empty string', () => {
    expect(capitalize('')).toBe('');
  });
});

describe('truncate', () => {
  test('truncates long strings', () => {
    expect(truncate('hello world', 8)).toBe('hello...');
  });
  test('preserves short strings', () => {
    expect(truncate('hi', 10)).toBe('hi');
  });
});

describe('slugify', () => {
  test('creates valid slug', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
  });
  test('handles multiple spaces', () => {
    expect(slugify('a   b   c')).toBe('a-b-c');
  });
});
```

### Review Checkpoint Benefits

**Without checkpoints**:
- All three stages run at once
- Bug in Stage 1 propagates to Stage 2
- More code to fix/revert
- Harder to isolate issues

**With checkpoints**:
- Catch issues immediately
- Fix before building on broken foundation
- Clear state after each stage
- Easier to resume if interrupted

### Key Insight

Execution is not a race. Checkpoints feel slower but prevent costly rework.

### Pattern: Staged Execution

```
1. Execute one stage
2. Run tests
3. Review output
4. Fix any issues
5. Verify success criteria
6. Update plan status
7. Repeat for next stage
```

</details>

---

## Reflection Questions

1. How did the review checkpoints affect the final quality?
2. What would you do differently if a stage failed review?
3. How would you handle a stage that's taking much longer than expected?

---

**Next**: [Exercise 3: Handle Ambiguity Through Clarification](exercise-3.md)
