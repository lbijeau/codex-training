# Exercise 3: Systematic Debugging Challenge

## Objective

Apply the systematic debugging skill to find root causes instead of guessing.

## Background

The `systematic-debugging` skill uses a 4-phase framework: Reproduce → Trace → Hypothesize → Verify. This replaces random guessing with methodical investigation.

## Part A: Create a Non-Obvious Bug

**Task**: Set up a bug that requires investigation.

Create this file with a subtle bug:

```javascript
// practice/scratch/cart.js
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(name, price, quantity = 1) {
    const existing = this.items.find(i => i.name === name);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ name, price, quantity });
    }
  }

  removeItem(name) {
    const index = this.items.findIndex(i => i.name === name);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  getTotal() {
    return this.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  }

  applyDiscount(percent) {
    // Bug is here - modifies prices permanently!
    this.items.forEach(item => {
      item.price = item.price * (1 - percent / 100);
    });
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}

module.exports = { ShoppingCart };
```

Create a failing test:

```javascript
// practice/scratch/cart.test.js
const { ShoppingCart } = require('./cart');

test('applying discount twice should not double discount', () => {
  const cart = new ShoppingCart();
  cart.addItem('Widget', 100, 1);

  cart.applyDiscount(10); // 10% off
  expect(cart.getTotal()).toBe(90);

  cart.applyDiscount(10); // Another 10% off original
  expect(cart.getTotal()).toBe(80); // FAILS! Gets 81 instead
});
```

## Part B: Apply Systematic Debugging

**Task**: Use the 4-phase framework.

1. Invoke the skill:
   ```
   "The cart discount test is failing. I've tried to fix it twice
   but it's still broken. Use superpowers:systematic-debugging
   to find the root cause."
   ```

2. Follow each phase:

   **Phase 1: Reproduce**
   - Create minimal reproduction case
   - Verify it fails consistently
   - Document exact failure

   **Phase 2: Trace**
   - Add logging to trace execution
   - Follow the data through the code
   - Identify where values diverge from expected

   **Phase 3: Hypothesize**
   - Form a testable theory
   - "The bug is X because..."
   - Predict what you should see if hypothesis is correct

   **Phase 4: Verify**
   - Test the hypothesis
   - If correct, implement fix
   - Add regression test

## Part C: Document Your Investigation

**Task**: Create an investigation log.

```markdown
## Bug Investigation Log

**Symptom**: Applying 10% discount twice results in 81, not 80

**Phase 1: Reproduction**
- Minimal case: cart with $100 item, apply 10% twice
- Expected: $100 → $90 → $80
- Actual: $100 → $90 → $81

**Phase 2: Trace**
- After first applyDiscount: price = 90 ✓
- After second applyDiscount: price = 81 ✗
- Observation: 90 * 0.9 = 81 (applying to already-discounted price!)

**Phase 3: Hypothesis**
- Bug: applyDiscount modifies item.price directly
- Second discount applies to modified price, not original
- This is state mutation bug

**Phase 4: Fix**
- Store original price separately, or
- Calculate discount from original each time, or
- Return discounted total without modifying prices
```

## Part D: Implement and Verify Fix

**Task**: Fix the bug and prevent regression.

**Option A**: Don't modify prices, calculate at getTotal time
```javascript
applyDiscount(percent) {
  this.discountPercent = (this.discountPercent || 0) + percent;
}

getTotal() {
  const subtotal = this.items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  return subtotal * (1 - (this.discountPercent || 0) / 100);
}
```

**Option B**: Store original prices
```javascript
addItem(name, price, quantity = 1) {
  // Store originalPrice alongside price
}
```

Choose and implement one approach, then verify the test passes.

---

## Hints

<details>
<summary>Hint 1: Reproduction quality</summary>

A good reproduction case is:
- Minimal (smallest code that shows bug)
- Deterministic (fails every time)
- Isolated (no external dependencies)
</details>

<details>
<summary>Hint 2: Tracing effectively</summary>

Add strategic logging:
```javascript
applyDiscount(percent) {
  console.log('Before discount:', JSON.stringify(this.items));
  // ... code ...
  console.log('After discount:', JSON.stringify(this.items));
}
```
</details>

<details>
<summary>Hint 3: Hypothesis testing</summary>

A good hypothesis is:
- Specific ("X causes Y")
- Testable (can verify or disprove)
- Explains the symptoms
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Root Cause

The bug is **state mutation**: `applyDiscount` modifies `item.price` directly instead of calculating a discounted total.

First discount: `100 * 0.9 = 90` (price becomes 90)
Second discount: `90 * 0.9 = 81` (applied to 90, not 100)

### Why Guessing Fails

Common guesses that don't work:
1. "Maybe the reduce is wrong" → No, reduce is fine
2. "Maybe there's a rounding error" → No, math is exact
3. "Maybe I should use decimal.js" → No, not a precision issue

Without systematic tracing, you'd keep guessing at the wrong areas.

### Systematic Discovery

**Trace output**:
```
Before discount: [{"name":"Widget","price":100,"quantity":1}]
After discount: [{"name":"Widget","price":90,"quantity":1}]
Before discount: [{"name":"Widget","price":90,"quantity":1}]  ← Already 90!
After discount: [{"name":"Widget","price":81,"quantity":1}]
```

This immediately shows the bug: price was already modified.

### Correct Fix

```javascript
class ShoppingCart {
  constructor() {
    this.items = [];
    this.discountPercent = 0;
  }

  // ... other methods unchanged ...

  applyDiscount(percent) {
    // Accumulate discounts without modifying prices
    this.discountPercent += percent;
  }

  getTotal() {
    const subtotal = this.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    return subtotal * (1 - this.discountPercent / 100);
  }
}
```

### Regression Test

```javascript
test('multiple discounts work correctly', () => {
  const cart = new ShoppingCart();
  cart.addItem('Widget', 100, 1);
  cart.applyDiscount(10);
  cart.applyDiscount(10);
  expect(cart.getTotal()).toBe(80);

  // Also verify price wasn't mutated
  expect(cart.items[0].price).toBe(100);
});
```

### Key Insight

The 4-phase framework works because it:
1. Ensures you understand the problem (Reproduce)
2. Gathers evidence instead of assuming (Trace)
3. Forms testable theories (Hypothesize)
4. Confirms before shipping (Verify)

</details>

---

## Reflection Questions

1. How was systematic debugging different from your usual approach?
2. At what point did the root cause become clear?
3. How will you apply this to future bugs?

---

**Next**: [Exercise 4: Quality Gates Implementation](exercise-4.md)
