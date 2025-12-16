# Exercise 4: Performance Investigation

## Objective

Develop systematic approaches to identifying and fixing performance issues.

## Background

Performance problems are often not where you expect. This exercise teaches measurement-driven optimization rather than guessing.

## Part A: Establish Baselines

**Task**: Measure before optimizing.

1. Create a performance test scenario:
   ```javascript
   // practice/scratch/perf.js
   function slowSearch(items, query) {
     const results = [];
     for (const item of items) {
       // Simulate expensive comparison
       for (const field of Object.keys(item)) {
         if (item[field].toString().toLowerCase().includes(query.toLowerCase())) {
           results.push(item);
           break;
         }
       }
     }
     return results;
   }

   // Generate test data
   function generateData(count) {
     return Array.from({ length: count }, (_, i) => ({
       id: i,
       name: `Item ${i}`,
       description: `This is description number ${i} with some text`,
       category: ['A', 'B', 'C'][i % 3]
     }));
   }
   ```

2. Measure baseline performance:
   ```javascript
   const data = generateData(10000);

   console.time('slowSearch');
   slowSearch(data, 'item 5000');
   console.timeEnd('slowSearch');
   ```

3. Record baseline:
   | Data Size | Query | Time |
   |-----------|-------|------|
   | 10,000 | 'item 5000' | ___ ms |
   | 50,000 | 'item 5000' | ___ ms |
   | 100,000 | 'item 5000' | ___ ms |

## Part B: Identify Bottlenecks

**Task**: Profile to find what's slow.

1. Add instrumentation:
   ```javascript
   function profiledSearch(items, query) {
     const profile = {
       iterations: 0,
       comparisons: 0,
       stringOps: 0
     };

     const results = [];
     for (const item of items) {
       profile.iterations++;
       for (const field of Object.keys(item)) {
         profile.comparisons++;
         profile.stringOps += 2; // toLowerCase x2
         if (item[field].toString().toLowerCase().includes(query.toLowerCase())) {
           results.push(item);
           break;
         }
       }
     }

     console.log('Profile:', profile);
     return results;
   }
   ```

2. Identify the bottleneck:
   - Is it iteration count?
   - Is it string operations?
   - Is it memory allocation?

## Part C: Apply Targeted Optimization

**Task**: Optimize the identified bottleneck.

**Optimization 1**: Cache the lowercase query
```javascript
function optimizedSearch1(items, query) {
  const lowerQuery = query.toLowerCase(); // Once, not per iteration
  // ... rest of code uses lowerQuery
}
```

**Optimization 2**: Index frequently searched fields
```javascript
function createIndex(items, fields) {
  const index = new Map();
  for (const item of items) {
    for (const field of fields) {
      const value = item[field].toString().toLowerCase();
      if (!index.has(value)) {
        index.set(value, []);
      }
      index.get(value).push(item);
    }
  }
  return index;
}
```

**Optimization 3**: Early termination
```javascript
// If searching for exact match, stop when found
```

## Part D: Measure Improvement

**Task**: Verify optimizations actually help.

1. Measure each optimization:
   | Optimization | 10K Time | Improvement |
   |--------------|----------|-------------|
   | Baseline | ___ ms | - |
   | Cache query | ___ ms | __% |
   | Add index | ___ ms | __% |
   | Combined | ___ ms | __% |

2. Compare memory usage if applicable

3. Identify any regressions:
   - Does optimization hurt any scenarios?
   - Are there memory trade-offs?

---

## Hints

<details>
<summary>Hint 1: Where to look first</summary>

Common performance issues:
- O(n²) loops hidden in code
- Repeated expensive operations
- Unnecessary string creation
- Unneeded memory allocation
- Sync operations that could be async
</details>

<details>
<summary>Hint 2: Measurement accuracy</summary>

For reliable measurements:
- Run multiple times and average
- Warm up the JIT first
- Use large enough data
- Disable other processes
</details>

<details>
<summary>Hint 3: Premature optimization</summary>

Don't optimize until you've:
1. Identified actual bottleneck
2. Measured baseline
3. Confirmed it's a real problem

"Make it work, make it right, make it fast" - in that order.
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Baseline Analysis

With 10,000 items and 4 fields each:
- Iterations: 10,000
- Comparisons: 40,000
- String operations: 80,000 toLowerCase calls

The bottleneck is clear: `query.toLowerCase()` is called 40,000 times with the same result!

### Optimization Impact

**Optimization 1: Cache query**
```javascript
const lowerQuery = query.toLowerCase();
```
- Reduces string ops from 80,000 to 40,001
- Expected improvement: ~30-50%

**Optimization 2: Build index**
```javascript
// One-time cost, amortized over many searches
const index = createIndex(items, ['name', 'category']);
```
- Search becomes O(1) lookup vs O(n)
- For repeated searches: huge improvement
- For single search: overhead may not be worth it

**Optimization 3: Pre-compute lowercase**
```javascript
// During data load, not during search
items.forEach(item => {
  item._searchable = Object.values(item).join(' ').toLowerCase();
});
```
- Trades memory for speed
- One string comparison per item

### Final Optimized Version

```javascript
// Pre-processing (done once when data loads)
function prepareForSearch(items) {
  return items.map(item => ({
    ...item,
    _searchable: Object.values(item)
      .filter(v => typeof v === 'string' || typeof v === 'number')
      .join(' ')
      .toLowerCase()
  }));
}

// Optimized search
function fastSearch(preparedItems, query) {
  const lowerQuery = query.toLowerCase();
  return preparedItems.filter(item =>
    item._searchable.includes(lowerQuery)
  );
}
```

### Performance Comparison

| Approach | 10K Items | 100K Items |
|----------|-----------|------------|
| Original | 50ms | 500ms |
| Cached query | 35ms | 350ms |
| Pre-computed | 5ms | 50ms |
| With index | <1ms | <1ms |

### Key Insight

Performance optimization should be:
1. **Measured** - Don't guess, profile
2. **Targeted** - Fix the bottleneck, not everything
3. **Verified** - Confirm improvement with data
4. **Documented** - Explain why optimization exists

### Performance Pattern

```
1. Establish baseline with real data
2. Profile to find bottleneck
3. Hypothesize improvement
4. Implement smallest change
5. Measure improvement
6. Document trade-offs
```

</details>

---

## Reflection Questions

1. What was the actual bottleneck vs. what you expected?
2. How did measurement change your optimization strategy?
3. What are the trade-offs of the optimizations you applied?

---

**Next**: [Exercise 5: Security Review](exercise-5.md)
