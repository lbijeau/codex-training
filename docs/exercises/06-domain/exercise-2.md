# Exercise 2: Safe Refactoring Exercise

## Objective

Practice refactoring techniques that minimize risk while improving code quality.

## Background

Refactoring changes code structure without changing behavior. Safety comes from tests, small steps, and verification at each step.

## Part A: Characterization Tests First

**Task**: Write tests that capture current behavior before changing anything.

1. Given this code:
   ```javascript
   // practice/scratch/legacy.js
   function processOrder(order) {
     let total = 0;
     for (let i = 0; i < order.items.length; i++) {
       total += order.items[i].price * order.items[i].qty;
       if (order.items[i].qty > 10) {
         total = total * 0.9; // 10% bulk discount
       }
     }
     if (order.customer.isPremium) {
       total = total * 0.95; // 5% premium discount
     }
     if (total > 100) {
       total = total - 10; // $10 off orders over $100
     }
     return total;
   }
   ```

2. Write tests that capture the current behavior:
   ```javascript
   // Don't assume what's correct - test what it DOES
   test('basic order total', () => {
     const order = {
       items: [{ price: 10, qty: 2 }],
       customer: { isPremium: false }
     };
     expect(processOrder(order)).toBe(20);
   });

   test('bulk discount applies per item', () => {
     // What actually happens with qty > 10?
   });

   test('premium discount stacks with bulk', () => {
     // What order are discounts applied?
   });
   ```

3. Discover and document the actual behavior

## Part B: Extract and Name

**Task**: Extract logic into named functions for clarity.

1. Identify extractable concepts:
   - Calculate item total
   - Apply bulk discount
   - Apply premium discount
   - Apply threshold discount

2. Extract one at a time:
   ```javascript
   // Step 1: Extract item total calculation
   function calculateItemTotal(item) {
     return item.price * item.qty;
   }

   // Step 2: Run tests - still pass?
   ```

3. After each extraction, verify tests pass

## Part C: Improve Step by Step

**Task**: Apply multiple small improvements.

**Improvement 1**: Replace loop with reduce
```javascript
// Before
let total = 0;
for (let i = 0; i < items.length; i++) {
  total += items[i].price * items[i].qty;
}

// After
const total = items.reduce((sum, item) =>
  sum + item.price * item.qty, 0);
```

**Improvement 2**: Extract discount logic
```javascript
// Before: inline discount checks
// After: named discount functions
function applyBulkDiscount(item, total) { ... }
function applyPremiumDiscount(customer, total) { ... }
```

**Improvement 3**: Make discount order explicit
```javascript
function processOrder(order) {
  let total = calculateSubtotal(order.items);
  total = applyBulkDiscounts(order.items, total);
  total = applyPremiumDiscount(order.customer, total);
  total = applyThresholdDiscount(total);
  return total;
}
```

## Part D: Verify Behavior Preserved

**Task**: Confirm refactoring didn't change behavior.

1. All characterization tests pass

2. Run additional verification:
   ```
   "Compare the behavior of the original and refactored processOrder
   functions. Generate 100 random test cases and verify they produce
   identical results."
   ```

3. Document any intentional behavior changes (should be none for pure refactor)

---

## Hints

<details>
<summary>Hint 1: Characterization test approach</summary>

Don't test what SHOULD happen.
Test what DOES happen.

Run the code with inputs.
Capture the outputs.
Those become your tests.
</details>

<details>
<summary>Hint 2: Safe extraction</summary>

When extracting:
1. Copy the code to new function
2. Replace original with function call
3. Run tests
4. If tests pass, continue
5. If tests fail, revert
</details>

<details>
<summary>Hint 3: One change at a time</summary>

Each commit should be:
- One logical change
- Tests passing
- Revertible independently

If you're not sure, smaller is safer.
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Characterization Tests

```javascript
describe('processOrder - characterization', () => {
  test('simple order', () => {
    const order = {
      items: [{ price: 10, qty: 2 }],
      customer: { isPremium: false }
    };
    expect(processOrder(order)).toBe(20);
  });

  test('bulk discount triggers at 11 qty', () => {
    const order = {
      items: [{ price: 10, qty: 11 }],
      customer: { isPremium: false }
    };
    // 110 * 0.9 = 99, then $10 off doesn't apply (< 100)
    expect(processOrder(order)).toBe(99);
  });

  test('bulk discount applies to running total', () => {
    // NOTE: This is a bug! Each bulk item discounts TOTAL
    const order = {
      items: [
        { price: 10, qty: 11 }, // Triggers discount on 110
        { price: 10, qty: 11 }  // Triggers discount on discounted + 110
      ],
      customer: { isPremium: false }
    };
    // Actual: 110, *0.9=99, +110=209, *0.9=188.1, -10=178.1
    expect(processOrder(order)).toBeCloseTo(178.1);
  });

  test('premium stacks with bulk', () => {
    const order = {
      items: [{ price: 10, qty: 11 }],
      customer: { isPremium: true }
    };
    // 110 * 0.9 = 99 * 0.95 = 94.05
    expect(processOrder(order)).toBeCloseTo(94.05);
  });
});
```

### Discovered Bug

The characterization tests reveal a bug: bulk discount applies to the running total, not just the item. This means order of items matters!

For a pure refactor, we preserve this behavior. Fixing it would be a separate change.

### Refactored Version

```javascript
function processOrder(order) {
  let total = 0;

  for (const item of order.items) {
    total += calculateItemTotal(item);
    if (qualifiesForBulkDiscount(item)) {
      total = applyBulkDiscount(total);
    }
  }

  if (order.customer.isPremium) {
    total = applyPremiumDiscount(total);
  }

  if (total > 100) {
    total = applyThresholdDiscount(total);
  }

  return total;
}

function calculateItemTotal(item) {
  return item.price * item.qty;
}

function qualifiesForBulkDiscount(item) {
  return item.qty > 10;
}

function applyBulkDiscount(total) {
  return total * 0.9;
}

function applyPremiumDiscount(total) {
  return total * 0.95;
}

function applyThresholdDiscount(total) {
  return total - 10;
}
```

### Key Insight

Refactoring is NOT the time to fix bugs.
1. Characterize current behavior
2. Refactor to improve structure
3. All tests still pass (bugs included)
4. THEN fix bugs as separate change

This separation makes changes reversible and reviewable.

### Safe Refactoring Pattern

```
1. Write characterization tests
2. Run tests (establish baseline)
3. Make ONE structural change
4. Run tests
5. If pass → commit
6. If fail → revert
7. Repeat from step 3
```

</details>

---

## Reflection Questions

1. What surprised you when writing characterization tests?
2. How did having tests change your confidence in refactoring?
3. When would you choose to NOT refactor and rewrite instead?

---

**Next**: [Exercise 3: Legacy Code Characterization](exercise-3.md)
