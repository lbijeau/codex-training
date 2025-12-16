# Exercise 2: Parallel vs Sequential Tool Execution

## Objective

Learn to identify when to use parallel vs sequential execution and understand the performance implications.

## Background

Tool execution strategy significantly impacts speed and efficiency. This exercise will help you develop intuition for choosing the right approach.

## Part A: Identifying Dependencies

**Task**: For each scenario below, determine if operations can be parallel or must be sequential:

1. Reading 3 different configuration files
2. Searching for a function name, then reading the file containing it
3. Running tests and checking git status
4. Creating a directory and then creating a file inside it
5. Editing 4 independent files
6. Searching for all TODO comments across the codebase
7. Reading a file, modifying it, then reading it again

**Questions to Answer**:
- Which scenarios can use parallel execution?
- Which must be sequential and why?
- What's the pattern that determines parallelizability?

## Part B: Performance Comparison

**Task**: Create a hands-on performance test.

1. Create 5 small files in your practice workspace (file1.txt through file5.txt)
2. Ask Codex to read all 5 files using sequential requests (one at a time)
3. Clear the conversation (start fresh)
4. Ask Codex to read all 5 files in parallel (explicitly request parallel execution)

**Measurements to Take**:
- Count the number of Codex messages in each approach
- Note the total token usage (look at the session summary or cumulative usage)
- Observe the subjective time difference

**Questions to Answer**:
- What's the token usage difference?
- How many round-trips did each approach take?
- What's the rough speedup factor?

## Part C: Real-World Scenario

**Scenario**: You're debugging a bug in an authentication system. You need to:

1. Find all files that import the `auth` module
2. Read each of those files
3. Look for calls to `validateToken()` function
4. Read the `validateToken` implementation

**Task**: Design the tool execution strategy.

**Questions to Answer**:
- What tools would you use in what order?
- Which steps can be parallelized?
- Where must you wait for results?
- Draw a dependency graph showing the execution flow

---

## Hints

<details>
<summary>Hint 1: Creating test files</summary>

```bash
cd practice/scratch
for i in {1..5}; do echo "Content of file $i" > file$i.txt; done
```
</details>

<details>
<summary>Hint 2: Dependency analysis</summary>

Ask yourself: "Does this operation need information from the previous operation?"
- If yes → Sequential
- If no → Parallel
</details>

<details>
<summary>Hint 3: Execution flow diagram</summary>

Use ASCII art to map out the flow:
```
[Grep for imports] → [Read file1, file2, file3 in parallel] → [Grep each for validateToken] → [Read implementation]
```
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Part A: Identifying Dependencies

1. **Reading 3 config files** → **PARALLEL**
   - No dependencies between files
   - All can be read simultaneously

2. **Search then read** → **SEQUENTIAL**
   - Must search first to know which file to read
   - Second operation depends on first

3. **Tests + git status** → **PARALLEL**
   - Completely independent operations
   - Can run simultaneously

4. **mkdir then create file** → **SEQUENTIAL**
   - File creation depends on directory existing
   - Must happen in order

5. **Edit 4 independent files** → **PARALLEL**
   - No dependencies between edits
   - All can happen simultaneously

6. **Search for TODOs** → **PARALLEL (single Grep)**
   - Actually just one tool call with glob pattern
   - Grep searches multiple files inherently

7. **Read, modify, read again** → **SEQUENTIAL**
   - Each step depends on previous
   - Must happen in order (though re-reading is usually unnecessary!)

**Pattern**: Operations can be parallel if they don't need information from each other.

### Part B: Performance Comparison

**Expected Results**:

**Sequential Approach**:
```
Message 1: User requests file1
Message 2: Codex reads file1
Message 3: User requests file2
Message 4: Codex reads file2
... (continues for all 5 files)

Total: ~10 messages (5 requests + 5 responses)
Token usage: HIGH (system prompt repeated in each response)
```

**Parallel Approach**:
```
Message 1: User requests all 5 files
Message 2: Codex reads all 5 in parallel

Total: 2 messages (1 request + 1 response)
Token usage: LOWER (system prompt included only once)
```

**Speedup**:
- ~5x fewer messages
- ~40-50% fewer tokens (depends on file sizes)
- ~5x faster (eliminates round-trip latency)

**Key Insight**: Parallel execution has both token AND latency benefits.

### Part C: Real-World Scenario

**Optimal Strategy**:

```
Step 1: Grep for files importing 'auth' [1 tool call]
        ↓
Step 2: Read all matching files in parallel [N tool calls in parallel]
        ↓
Step 3: Grep each file for 'validateToken' [N tool calls in parallel]
        ↓
Step 4: Read validateToken implementation [1 tool call]
```

**Why This Works**:
- Step 1 must complete before Step 2 (need to know which files)
- Step 2 can all happen in parallel (independent file reads)
- Step 3 can happen in parallel (searching within already-read files)
- Step 4 must wait for Step 3 (need to know where validateToken is)

**Alternative (More Efficient)**:

```
Step 1: Grep for 'validateToken' in files importing auth [1 complex Grep]
        ↓
Step 2: Read all matching files + implementation in parallel
```

**Why This is Better**:
- Combines Steps 1-3 into single Grep with refined pattern
- Fewer round-trips
- Same information, more efficient

**Key Insight**: Sometimes rethinking the approach yields better parallelization opportunities.

### Patterns Discovered

1. **Independent Operations = Parallel**
   ```
   Read A, Read B, Read C → All in one message
   ```

2. **Dependent Operations = Sequential**
   ```
   Find X → (wait for result) → Use result to do Y
   ```

3. **Mixed Workflows**
   ```
   Find files [wait] → Read all files in parallel [wait] → Process results
   ```

4. **Optimization Opportunities**
   ```
   Before: Search → Read → Search
   After: Search with refined pattern → Read
   ```

### Real-World Impact

In a typical debugging session:
- Sequential: 20-30 messages, 50K+ tokens, 2-3 minutes
- Optimized: 8-10 messages, 25K tokens, 45 seconds

**That's 2-3x faster just from execution strategy.**

</details>

---

## Reflection Questions

1. How often do you naturally think in parallel vs sequential?
2. What would you need to change about how you request information to enable more parallelization?
3. In your typical workflow, where would parallel execution have the biggest impact?

---

**Next**: [Exercise 3: Chaining Prompts and Breaking Work into Steps](exercise-3.md)
