# Exercise 4: Speed Measurement & Analysis

## Objective

Measure your efficiency improvements and identify remaining optimization opportunities.

## Background

You can't improve what you don't measure. This exercise helps you establish baselines and track improvements in your Codex usage.

## Part A: Establish Baselines

**Task**: Measure your current efficiency on standard tasks.

Perform these tasks and record time and token usage:

**Task 1: Information Gathering**
```
"Read the README, package.json, and main entry point.
Summarize what this project does."
```

**Task 2: Code Analysis**
```
"Find all functions that handle user authentication
and explain how they work together."
```

**Task 3: Code Modification**
```
"Add input validation to the first function you find
that accepts user input."
```

**Record for each**:
| Task | Time (seconds) | Tokens Used | Successful? |
|------|----------------|-------------|-------------|
| 1    |                |             |             |
| 2    |                |             |             |
| 3    |                |             |             |

## Part B: Apply Optimization Techniques

**Task**: Redo the same tasks using techniques from this module.

**Optimized Task 1**:
- Request all three files in parallel
- Ask for specific summary format

**Optimized Task 2**:
- Use targeted search instead of broad read
- Request specific output format

**Optimized Task 3**:
- Load only the relevant file
- Request only the specific change

**Record again**:
| Task | Time (seconds) | Tokens Used | Improvement |
|------|----------------|-------------|-------------|
| 1    |                |             | X% faster   |
| 2    |                |             | X% faster   |
| 3    |                |             | X% faster   |

## Part C: Identify Bottlenecks

**Task**: Analyze where time and tokens are spent.

Review your recorded sessions and categorize:

| Category | % of Total Time | % of Total Tokens |
|----------|-----------------|-------------------|
| Waiting for responses | | |
| Reading/understanding responses | | |
| Typing prompts | | |
| Retrying failed requests | | |
| Context loading | | |

**Questions to Answer**:
- Where is most time spent?
- Where are most tokens spent?
- What single change would have the biggest impact?

## Part D: Create Personal Benchmarks

**Task**: Establish benchmarks for common task types.

Define target metrics for your typical tasks:

| Task Type | Target Time | Target Tokens | Quality Bar |
|-----------|-------------|---------------|-------------|
| Read & summarize a file | | | Accurate summary |
| Find code matching pattern | | | All occurrences |
| Modify a function | | | Tests pass |
| Debug a failing test | | | Root cause found |
| Create new file | | | Follows patterns |

**Track Over Time**:
- Record actual vs. target for 1 week
- Identify patterns in misses
- Adjust techniques or targets

---

## Hints

<details>
<summary>Hint 1: Measuring tokens</summary>

Token usage may be visible in:
- CLI output (some versions show usage)
- API response metadata
- Estimated from response length (~4 chars per token)
</details>

<details>
<summary>Hint 2: Common bottlenecks</summary>

Typical bottlenecks:
- Loading too much context
- Sequential requests that could be parallel
- Vague prompts requiring clarification
- Not using targeted searches
</details>

<details>
<summary>Hint 3: Improvement strategies</summary>

Quick wins:
- Parallelize independent reads
- Use grep before read
- Specify output format upfront
- Load context incrementally
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Part A: Typical Baselines

**Unoptimized typical results**:

| Task | Time | Tokens | Notes |
|------|------|--------|-------|
| 1. Info Gathering | 45-60s | 3000-5000 | Sequential reads |
| 2. Code Analysis | 60-90s | 4000-8000 | Broad search |
| 3. Code Modification | 90-120s | 5000-10000 | Multiple attempts |

### Part B: Optimized Results

**After applying techniques**:

| Task | Time | Tokens | Improvement |
|------|------|--------|-------------|
| 1. Info Gathering | 15-25s | 1500-2500 | 50-60% faster |
| 2. Code Analysis | 30-45s | 2000-3500 | 50% faster |
| 3. Code Modification | 45-60s | 2500-4000 | 50% faster |

### Part C: Common Bottleneck Distribution

**Typical unoptimized**:
| Category | Time | Tokens |
|----------|------|--------|
| Waiting for responses | 60% | - |
| Reading responses | 15% | - |
| Typing prompts | 10% | - |
| Retrying | 10% | 30% |
| Context loading | 5% | 70% |

**Key insight**: Context loading uses most tokens, but retries waste both time AND tokens.

### Part D: Sample Benchmarks

| Task Type | Target Time | Target Tokens |
|-----------|-------------|---------------|
| Read & summarize | 15s | 1000 |
| Find pattern | 20s | 1500 |
| Modify function | 45s | 2500 |
| Debug test | 90s | 3000 |
| Create file | 60s | 2000 |

### Key Metrics to Track

**Efficiency Ratio**:
```
Efficiency = Useful Output / (Time + Tokens)
```

**First-Try Success Rate**:
```
Success Rate = Tasks completed on first try / Total tasks
```

**Context Efficiency**:
```
Context Efficiency = Used context / Loaded context
```

### Improvement Targets

Realistic 30-day improvements:
- Time: 30-50% reduction
- Tokens: 40-60% reduction
- First-try success: +20%

### Pattern: Continuous Improvement

```
Weekly review:
1. Review metrics from past week
2. Identify worst-performing task type
3. Apply one new technique to that type
4. Measure improvement next week
5. Repeat
```

</details>

---

## Reflection Questions

1. What was your biggest efficiency gain from this module?
2. Which optimization technique had the most impact?
3. How will you continue tracking and improving?

---

## Module 3 Complete!

You've learned:
- Parallel execution patterns
- Multi-agent coordination
- Context optimization strategies
- How to measure and improve efficiency

**Next Module**: [Module 4: Planning & Execution](../../modules/04-planning.md)
