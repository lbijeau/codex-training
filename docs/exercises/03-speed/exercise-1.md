# Exercise 1: Parallel Execution Drills

## Objective

Master parallel tool execution to complete tasks faster with less context usage.

## Background

When you need multiple independent pieces of information, requesting them in parallel saves time and tokens. This exercise builds the habit of thinking "can these run in parallel?"

## Part A: Sequential vs Parallel Comparison

**Task**: Compare the two approaches for gathering information.

1. Create 5 test files in the practice workspace:
   ```bash
   cd practice/scratch
   echo "Module: Authentication" > file1.txt
   echo "Module: Database" > file2.txt
   echo "Module: API" > file3.txt
   echo "Module: Frontend" > file4.txt
   echo "Module: Logging" > file5.txt
   ```

2. **Sequential approach** - Ask for files one at a time:
   ```
   "Read file1.txt"
   (wait for response)
   "Read file2.txt"
   (wait for response)
   ... continue for all 5
   ```

3. **Parallel approach** - Ask for all at once:
   ```
   "Read all 5 files (file1.txt through file5.txt) in parallel
   and summarize what modules this project has"
   ```

**Measure**:
- Count the number of Codex responses for each approach
- Note the total time taken
- Compare the completeness of information gathered

## Part B: Identify Parallelization Opportunities

**Task**: Analyze requests to find parallel opportunities.

For each scenario, decide: parallel or sequential?

1. "Find all TODO comments in src/, check if tests exist for each, and create tickets for missing tests"

2. "Read the package.json and tsconfig.json to understand the project setup"

3. "Run lint, then fix any errors, then run lint again to verify"

4. "Search for uses of deprecated API in files A, B, C, and D"

5. "Read the README, then create a summary based on it"

**Questions to Answer**:
- Which scenarios have dependencies (must be sequential)?
- Which can run in parallel?
- What's the key question to identify parallelization potential?

## Part C: Practice Parallel Prompts

**Task**: Write prompts that explicitly request parallel execution.

Rewrite these inefficient prompts:

**Original 1**:
```
"Check if the src folder exists"
(then) "Check if the tests folder exists"
(then) "Check if the docs folder exists"
```

**Original 2**:
```
"What's in package.json?"
(then) "What's in tsconfig.json?"
(then) "What's in .eslintrc?"
```

**Original 3**:
```
"Search for 'TODO' in file1"
(then) "Search for 'TODO' in file2"
(then) "Search for 'TODO' in file3"
```

Write efficient parallel versions of each.

---

## Hints

<details>
<summary>Hint 1: Parallel prompt patterns</summary>

Use phrases like:
- "Read X, Y, and Z in parallel"
- "Check all of these at once: ..."
- "Simultaneously search for..."
- "Gather these independent pieces of information together"
</details>

<details>
<summary>Hint 2: Dependency detection</summary>

Ask: "Does the result of A affect what I ask in B?"
- Yes → Sequential
- No → Can be parallel
</details>

<details>
<summary>Hint 3: Token savings</summary>

Each round-trip includes:
- System prompt (repeated each time)
- Conversation history (grows each time)
- New content

Parallel = 1 round-trip. Sequential N times = N round-trips.
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Part A: Expected Results

**Sequential (5 requests)**:
- 5 separate Codex responses
- Higher total tokens (system prompt repeated 5x)
- More time (5 round-trips)

**Parallel (1 request)**:
- 1 Codex response with 5 file reads
- Lower total tokens
- Less time (1 round-trip)

### Part B: Parallel vs Sequential

1. **TODOs → Tests → Tickets**: SEQUENTIAL
   - Finding TODOs depends on nothing
   - Checking tests depends on TODO locations
   - Creating tickets depends on which tests are missing

   But: Finding TODOs in multiple files CAN be parallel!

2. **package.json and tsconfig.json**: PARALLEL
   - Independent files
   - No dependency between them
   - Request both in one prompt

3. **Lint → Fix → Lint**: SEQUENTIAL
   - Must lint first to find errors
   - Must fix before re-linting
   - Each step depends on previous

4. **Search in files A, B, C, D**: PARALLEL
   - Independent searches
   - No dependency between files
   - Request all searches at once

5. **README → Summary**: SEQUENTIAL
   - Must read before summarizing
   - Summary depends on content

### Part C: Parallel Rewrites

**Rewrite 1**:
```
"Check if these folders exist: src, tests, docs"
```

**Rewrite 2**:
```
"Read package.json, tsconfig.json, and .eslintrc together
and summarize the project configuration"
```

**Rewrite 3**:
```
"Search for 'TODO' in file1, file2, and file3 simultaneously"
```

### Key Insight

The question to ask: **"Does B depend on A's result?"**

If no → parallel
If yes → sequential

### Parallel Execution Pattern

```
When gathering independent information:
1. Identify all pieces needed
2. Check for dependencies between them
3. Request independent pieces in single prompt
4. Process sequential dependencies in order
```

</details>

---

## Success Criteria

You can self-check this exercise by confirming all of the following:

- You created `practice/scratch/file1.txt` through `file5.txt` with the module lines shown.
- Sequential approach produced 5 separate Codex responses; parallel approach produced 1 response.
- You recorded a simple time comparison (even a rough minute/second note) for sequential vs. parallel.
- You answered Part B with a clear parallel/sequential choice for all 5 scenarios.
- You wrote 3 parallelized prompts in Part C that combine the original requests.

## Example Output (snippet)

Your exact wording may differ, but you should see a response similar to this after the parallel read:

```
Reading file1.txt...file5.txt in parallel.

Summary:
- Authentication
- Database
- API
- Frontend
- Logging
```

## Reflection Questions

1. What percentage of your typical requests could be parallelized?
2. How would you remember to check for parallel opportunities?
3. What's the trade-off between one complex parallel request vs. multiple simple sequential ones?

---

**Next**: [Exercise 2: Multi-Agent Coordination](exercise-2.md)
