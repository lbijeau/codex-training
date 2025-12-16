# Exercise 3: Legacy Code Characterization

## Objective

Learn techniques for understanding and safely modifying legacy code.

## Background

Legacy code is code without tests. Before modifying it, you need to understand what it does and add safety nets. This exercise practices those techniques.

## Part A: Understand Before Changing

**Task**: Document behavior before touching code.

Given this legacy function:
```javascript
// practice/scratch/report.js
function generateReport(data, type, opts) {
  var result = [];
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    if (type == 'summary') {
      if (item.status == 'active') {
        result.push({
          id: item.id,
          name: item.name,
          total: item.orders.reduce(function(s, o) {
            return s + o.amount;
          }, 0)
        });
      }
    } else if (type == 'detailed') {
      if (opts && opts.includeInactive || item.status == 'active') {
        var orders = [];
        for (var j = 0; j < item.orders.length; j++) {
          if (!opts || !opts.minAmount || item.orders[j].amount >= opts.minAmount) {
            orders.push(item.orders[j]);
          }
        }
        result.push({
          id: item.id,
          name: item.name,
          status: item.status,
          orders: orders,
          total: orders.reduce(function(s, o) { return s + o.amount; }, 0)
        });
      }
    }
  }
  return opts && opts.sortBy ? result.sort(function(a, b) {
    return a[opts.sortBy] > b[opts.sortBy] ? 1 : -1;
  }) : result;
}
```

1. Document what you observe:
   - What types are supported?
   - What options are available?
   - What's the output format?
   - What are the hidden assumptions?

2. Create a behavior specification:
   ```markdown
   ## generateReport Specification

   ### Input
   - data: Array of items with {id, name, status, orders[]}
   - type: 'summary' | 'detailed'
   - opts: { includeInactive?, minAmount?, sortBy? }

   ### Behavior
   - summary type: Only active items, aggregated totals
   - detailed type: Respects includeInactive option
   - ...
   ```

## Part B: Add Characterization Tests

**Task**: Create tests that document current behavior.

```javascript
describe('generateReport - characterization', () => {
  const testData = [
    {
      id: 1,
      name: 'Alice',
      status: 'active',
      orders: [{ amount: 100 }, { amount: 200 }]
    },
    {
      id: 2,
      name: 'Bob',
      status: 'inactive',
      orders: [{ amount: 50 }]
    }
  ];

  describe('summary type', () => {
    test('includes only active items', () => {
      const result = generateReport(testData, 'summary');
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Alice');
    });

    test('calculates total from orders', () => {
      const result = generateReport(testData, 'summary');
      expect(result[0].total).toBe(300);
    });
  });

  describe('detailed type', () => {
    // Add tests for each behavior...
  });
});
```

## Part C: Identify Change Points

**Task**: Find where changes can be made safely.

Create a "seam map" showing:
1. Entry points (where code can be called)
2. Dependencies (what it relies on)
3. Side effects (what it modifies)
4. Safe change points (where to add hooks)

```markdown
## Seam Map: generateReport

### Entry Points
- Direct call: generateReport(data, type, opts)

### Dependencies
- Array.prototype.reduce
- Array.prototype.sort
- Expects specific data shape

### Side Effects
- None (pure function)

### Safe Change Points
- ✓ Can extract type handlers
- ✓ Can add new types without changing existing
- ✓ Can add validation at entry
- ⚠️ Output format changes would break callers
```

## Part D: Make a Safe Change

**Task**: Add a feature without breaking existing behavior.

**Requirement**: Add a new report type 'count' that returns just the count of items.

1. Add characterization test for new feature:
   ```javascript
   test('count type returns item count', () => {
     const result = generateReport(testData, 'count');
     expect(result).toEqual({ active: 1, inactive: 1, total: 2 });
   });
   ```

2. Implement minimally:
   ```javascript
   // Add to the if/else chain
   else if (type == 'count') {
     // New code only, don't touch existing
   }
   ```

3. Verify all existing tests still pass

---

## Hints

<details>
<summary>Hint 1: Reading legacy code</summary>

Don't try to understand everything.
Focus on:
- What are the inputs?
- What are the outputs?
- What are the side effects?

Run it with examples to see behavior.
</details>

<details>
<summary>Hint 2: Characterization test strategy</summary>

1. Start with happy path
2. Add edge cases discovered while reading
3. Add tests for each branch
4. Add tests for error conditions
5. Document any surprises
</details>

<details>
<summary>Hint 3: Safe change techniques</summary>

- Add, don't modify
- Branch, don't change
- Wrap, don't replace
- Test, then change
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Documentation of Behavior

```markdown
## generateReport Analysis

### Types
- 'summary': Aggregated view of active items only
- 'detailed': Full view with filtering options

### Options (type='detailed' only)
- includeInactive: boolean - include inactive items
- minAmount: number - filter orders by minimum amount
- sortBy: string - field to sort by

### Hidden Behaviors
1. Summary ignores all options
2. Detailed totals are recalculated after filtering
3. Sort is string comparison (numbers sort wrong!)
4. Empty data returns empty array
5. Unknown type returns empty array (silent failure)
```

### Characterization Tests

```javascript
describe('generateReport - full characterization', () => {
  // ... testData setup ...

  describe('edge cases', () => {
    test('empty data returns empty array', () => {
      expect(generateReport([], 'summary')).toEqual([]);
    });

    test('unknown type returns empty array', () => {
      expect(generateReport(testData, 'unknown')).toEqual([]);
    });

    test('null opts is handled', () => {
      expect(() => generateReport(testData, 'detailed')).not.toThrow();
    });
  });

  describe('sorting', () => {
    test('sortBy with numbers sorts as strings', () => {
      // BUG: 10 sorts before 2 because '10' < '2'
      const data = [
        { id: 10, name: 'A', status: 'active', orders: [] },
        { id: 2, name: 'B', status: 'active', orders: [] }
      ];
      const result = generateReport(data, 'detailed', { sortBy: 'id' });
      expect(result[0].id).toBe(10); // Not 2!
    });
  });
});
```

### Safe Addition of Count Type

```javascript
function generateReport(data, type, opts) {
  var result = [];

  // NEW: Handle count type separately
  if (type == 'count') {
    var counts = { active: 0, inactive: 0, total: 0 };
    for (var i = 0; i < data.length; i++) {
      counts[data[i].status]++;
      counts.total++;
    }
    return counts;
  }

  // UNCHANGED: Existing code below
  for (var i = 0; i < data.length; i++) {
    // ... all existing code ...
  }
  // ...
}
```

### Key Insight

Legacy code changes should:
1. **Preserve** existing behavior (characterization tests)
2. **Add** new behavior (new tests + new code)
3. **Never modify** existing code paths

This minimizes risk while enabling progress.

### Legacy Code Pattern

```
1. Document current behavior
2. Write characterization tests
3. Find safe change points
4. Add (don't modify) new code
5. Verify all tests pass
6. Consider refactoring later (separate change)
```

</details>

---

## Reflection Questions

1. What was most challenging about understanding the legacy code?
2. How did characterization tests change your confidence?
3. When would rewriting be better than extending legacy code?

---

**Next**: [Exercise 4: Performance Investigation](exercise-4.md)
