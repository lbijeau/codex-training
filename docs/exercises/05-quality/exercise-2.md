# Exercise 2: Test-Driven Development Practice

## Objective

Practice the Red-Green-Refactor cycle using the TDD skill.

## Background

Test-Driven Development writes tests first, then implementation. The `test-driven-development` skill enforces this discipline, preventing the temptation to write code before tests.

## Part A: Understand Red-Green-Refactor

**Task**: Learn the TDD cycle.

```
RED    → Write a failing test
GREEN  → Write minimum code to pass
REFACTOR → Improve without changing behavior
```

**Questions to Answer**:
- Why write a failing test first?
- Why "minimum code" in green phase?
- Why refactor as a separate step?

## Part B: TDD a Simple Function

**Task**: Build a `range()` function using TDD.

1. Start TDD:
   ```
   "Use superpowers:test-driven-development to build a range(start, end)
   function that returns an array of numbers from start to end."
   ```

2. Follow the cycle:

   **Red Phase** - Write first failing test:
   ```javascript
   test('range(1, 5) returns [1, 2, 3, 4, 5]', () => {
     expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
   });
   ```

3. **Green Phase** - Minimum code to pass:
   ```javascript
   function range(start, end) {
     const result = [];
     for (let i = start; i <= end; i++) {
       result.push(i);
     }
     return result;
   }
   ```

4. **Refactor Phase** - Any improvements?

5. Continue with edge cases:
   - `range(5, 1)` - reversed range
   - `range(3, 3)` - single element
   - `range(0, 0)` - zero
   - `range(-3, 3)` - negative to positive

## Part C: TDD with Skill Enforcement

**Task**: Practice with the skill preventing premature implementation.

1. Create a new function with TDD:
   ```
   "Use superpowers:test-driven-development to build a
   validateEmail(email) function that returns true if valid."
   ```

2. Notice how the skill:
   - Insists on test first
   - Prevents writing implementation before test passes
   - Prompts for refactoring after green

3. Follow each cycle completely:
   - No skipping to implementation
   - No writing multiple tests at once
   - Complete one cycle before starting next

## Part D: Measure TDD Effectiveness

**Task**: Compare TDD vs. code-first approaches.

**Approach 1: Code First**
1. Write the full implementation
2. Write tests after
3. Count bugs found by tests

**Approach 2: TDD**
1. Follow Red-Green-Refactor
2. Track cycles completed
3. Count bugs caught during development

**Comparison**:
| Metric | Code First | TDD |
|--------|------------|-----|
| Total time | | |
| Bugs found in tests | | |
| Refactoring needed | | |
| Test coverage | | |
| Confidence level | | |

---

## Hints

<details>
<summary>Hint 1: Red phase rules</summary>

In Red phase:
- Write ONE test
- Test should FAIL
- Failure should be for right reason
- Don't write implementation yet
</details>

<details>
<summary>Hint 2: Green phase rules</summary>

In Green phase:
- Write MINIMUM code to pass
- Don't over-engineer
- It's okay if code is ugly
- Just make the test green
</details>

<details>
<summary>Hint 3: Refactor phase rules</summary>

In Refactor phase:
- Tests must stay green
- Improve code quality
- Remove duplication
- Improve names
- No new functionality
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Part B: Range Function TDD

**Cycle 1: Basic functionality**

```javascript
// RED: Test
test('range(1, 5) returns [1, 2, 3, 4, 5]', () => {
  expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
});

// GREEN: Implementation
function range(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

// REFACTOR: Could use Array.from
function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
```

**Cycle 2: Reversed range**

```javascript
// RED
test('range(5, 1) returns [5, 4, 3, 2, 1]', () => {
  expect(range(5, 1)).toEqual([5, 4, 3, 2, 1]);
});

// GREEN
function range(start, end) {
  if (start > end) {
    return Array.from({ length: start - end + 1 }, (_, i) => start - i);
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
```

**Cycle 3: Single element**

```javascript
// RED
test('range(3, 3) returns [3]', () => {
  expect(range(3, 3)).toEqual([3]);
});

// GREEN: Already works!
```

### Part C: Email Validation TDD

**Cycle 1: Basic valid email**
```javascript
// RED
test('valid email returns true', () => {
  expect(validateEmail('user@example.com')).toBe(true);
});

// GREEN
function validateEmail(email) {
  return email.includes('@');
}
```

**Cycle 2: Missing @**
```javascript
// RED
test('email without @ returns false', () => {
  expect(validateEmail('userexample.com')).toBe(false);
});

// GREEN: Already works!
```

**Cycle 3: Multiple @**
```javascript
// RED
test('email with multiple @ returns false', () => {
  expect(validateEmail('user@@example.com')).toBe(false);
});

// GREEN
function validateEmail(email) {
  return email.includes('@') && email.split('@').length === 2;
}
```

### TDD Benefits

**Why test first works**:
1. Forces you to think about interface before implementation
2. Provides immediate feedback
3. Builds test suite as you go
4. Prevents over-engineering

**Why minimum code**:
1. Avoids unnecessary complexity
2. Reveals when next test is needed
3. Keeps progress visible

**Why separate refactor**:
1. Permission to make code ugly first
2. Safety net from tests
3. Clear separation of concerns

### Key Insight

TDD is not about tests - it's about design. Writing tests first forces better API design because you experience the API as a user before implementing it.

</details>

---

## Reflection Questions

1. How did writing tests first change how you thought about the function?
2. What was hardest about following the discipline strictly?
3. When might you not use TDD?

---

**Next**: [Exercise 3: Systematic Debugging Challenge](exercise-3.md)
