# Exercise 3: Practice the 3-Attempt Rule

## Objective

Internalize the discipline of stopping after 3 failed fix attempts and switching to systematic debugging.

## Background

The 3-Attempt Rule is a core principle: if you've tried to fix something 3 times and it's still broken, you're guessing. Stop guessing and use `superpowers:systematic-debugging` to find the root cause.

## Part A: Create a Debugging Scenario

**Task**: Set up a bug to practice debugging.

1. Create a file with a subtle bug:

   ```javascript
   // practice/scratch/calculator.js
   function divide(a, b) {
     if (b == 0) {  // Bug: using == instead of ===
       return "Cannot divide by zero";
     }
     return a / b;
   }

   function calculate(operation, a, b) {
     switch(operation) {
       case 'add': return a + b;
       case 'subtract': return a - b;
       case 'multiply': return a * b;
       case 'divide': return divide(a, b);
       default: return "Unknown operation";
     }
   }

   // This should return "Cannot divide by zero" but returns Infinity
   console.log(calculate('divide', 10, "0"));  // Bug: string "0" instead of number 0
   ```

2. Create a simple test:

   ```javascript
   // practice/scratch/calculator.test.js
   const { calculate } = require('./calculator');

   console.log('Test: divide by zero string');
   const result = calculate('divide', 10, "0");
   console.assert(result === "Cannot divide by zero", `Expected error message, got: ${result}`);
   ```

## Part B: Attempt Fixes (Simulate the 3-Attempt Pattern)

**Task**: Practice making attempts and counting them.

1. Ask Codex to fix the bug WITHOUT using the debugging skill:
   ```
   "The calculator test is failing. The divide by zero check
   isn't working when I pass '0' as a string. Fix it."
   ```

2. If the first fix doesn't work, try again (attempt 2)

3. If still broken, try once more (attempt 3)

4. **STOP at 3 attempts** - even if you want to try "just one more thing"

**Record Your Attempts**:
- Attempt 1: What fix was tried? Did it work?
- Attempt 2: What fix was tried? Did it work?
- Attempt 3: What fix was tried? Did it work?

## Part C: Switch to Systematic Debugging

**Task**: After 3 attempts, invoke the debugging skill.

1. Say to Codex:
   ```
   "I've tried 3 fixes and the bug is still there.
   Use superpowers:systematic-debugging to find the root cause."
   ```

2. Follow the 4-phase framework:
   - **Reproduce**: Create a reliable test case
   - **Trace**: Follow the error backwards
   - **Hypothesize**: Form a testable theory
   - **Verify**: Fix and add regression test

**Questions to Answer**:
- What was the actual root cause?
- Did the systematic approach find it faster than guessing?
- What would attempt 4, 5, 6 have looked like without the skill?

---

## Hints

<details>
<summary>Hint 1: The real bug</summary>

There are actually TWO issues:
1. The test passes a string "0" instead of number 0
2. The comparison uses == instead of ===

The systematic approach should find both.
</details>

<details>
<summary>Hint 2: Counting attempts</summary>

An "attempt" is any fix you try. Even small changes count:
- Changing `==` to `===` = 1 attempt
- Adding type coercion = 1 attempt
- Modifying the test = 1 attempt
</details>

<details>
<summary>Hint 3: Why 3 specifically?</summary>

3 attempts balances quick fixes vs. diminishing returns:
- Attempt 1: Your first instinct might be right
- Attempt 2: You've learned something, adjusted
- Attempt 3: Final reasonable guess

After 3, you're not learning - you're flailing.
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### The Root Cause

The bug has two components:
1. **Type coercion issue**: `"0" == 0` is true, but `"0" === 0` is false
2. **Test issue**: The test passes a string "0" instead of number 0

When you use `divide(10, "0")`:
- `"0" == 0` evaluates to true (loose equality)
- But `b` is still the string "0"
- `10 / "0"` coerces to `10 / 0` which is Infinity

### Why Guessing Fails

Common guesses that don't solve it:
1. "Change == to ===" - Doesn't help because test still passes string
2. "Add parseInt(b)" - Works but masks the real issue
3. "Check typeof b" - Works but is treating symptom not cause

### Systematic Debugging Flow

**Reproduce**:
```javascript
console.log(divide(10, "0"));  // Infinity - reliably reproduces
console.log(divide(10, 0));    // "Cannot divide by zero" - works!
```

**Trace**:
- Input: `a=10, b="0"`
- Check: `"0" == 0` → true
- Wait... the check passes but returns wrong result?
- Insight: The check passes but division still happens

**Hypothesize**:
- Theory: `==` comparison succeeds but doesn't prevent division
- Actually, reread the code... the check should return early
- Trace more carefully: Oh, the condition IS met, but we're comparing wrong

**Verify**:
```javascript
// Fix 1: Use strict equality
if (b === 0) {  // String "0" won't match

// Fix 2: Or handle both cases
if (b === 0 || b === "0") {

// Fix 3: Or coerce at function entry
b = Number(b);
if (b === 0) {
```

### Key Insight

Systematic debugging found BOTH issues (code and test) where guessing might only find one.

The 4-phase framework forces you to:
1. Actually reproduce (not assume)
2. Trace (not guess)
3. Form testable theories
4. Verify with regression tests

</details>

---

## Reflection Questions

1. How did it feel to stop at 3 attempts instead of continuing to guess?
2. Did the systematic approach find issues the guesses missed?
3. How will you remind yourself to invoke the 3-Attempt Rule in real work?

---

**Next**: [Exercise 4: Create a Custom Team Skill](exercise-4.md)
