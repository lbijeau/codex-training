# Exercise 2: Multi-Agent Coordination

## Objective

Learn to dispatch multiple agents for independent tasks and coordinate their results.

## Background

When you have multiple independent problems to solve, you can launch separate agents to work on them concurrently. This is particularly useful for investigation tasks that don't share state.

## Part A: Identify Agent-Worthy Tasks

**Task**: Determine when to use multiple agents.

Consider these scenarios. Which would benefit from multiple agents?

1. Fix 5 independent type errors in different files
2. Implement a feature that spans 3 interconnected components
3. Investigate 3 unrelated failing tests
4. Refactor a function and update all its callers
5. Research best practices for 3 different technologies

**Questions to Answer**:
- What makes a task "agent-worthy"?
- When do dependencies prevent multi-agent work?
- What's the overhead of launching an agent?

## Part B: Launch Parallel Investigations

**Task**: Use the Task tool to dispatch agents for independent investigations.

1. Create a scenario with multiple independent issues:

   ```bash
   # Create files with different "bugs"
   cd practice/scratch

   echo "function add(a, b) { return a + b }" > math.js
   echo "function greet(name) { return 'Hello ' + name }" > greet.js
   echo "function validate(email) { return email.includes('@') }" > validate.js
   ```

2. Ask Codex to investigate all three files in parallel:
   ```
   "I have 3 files that might have issues. Use the Task tool to
   launch 3 parallel agents:
   1. Review math.js for edge cases
   2. Review greet.js for edge cases
   3. Review validate.js for edge cases

   Each agent should work independently and report findings."
   ```

3. Observe how the agents are dispatched and how results come back

**Questions to Answer**:
- Did the agents run concurrently?
- How were results aggregated?
- What was the total time vs. sequential?

## Part C: Coordinate Results

**Task**: Combine findings from multiple agents into action.

1. After receiving agent reports, ask:
   ```
   "Based on the findings from all 3 agents, create a prioritized
   list of improvements and implement the most critical one."
   ```

2. Observe how Codex synthesizes the independent findings

**Questions to Answer**:
- Were conflicting findings handled?
- Was prioritization logical?
- How would you handle if agents found overlapping issues?

## Part D: Know When NOT to Use Multi-Agent

**Task**: Recognize anti-patterns.

For each scenario, explain why multiple agents would be problematic:

1. Implement feature A, then feature B which depends on A
2. Fix a bug where the root cause is unknown
3. Refactor a function and all 50 files that use it
4. Add tests that require a shared test fixture

---

## Hints

<details>
<summary>Hint 1: Agent independence</summary>

Agents are independent when:
- They don't modify the same files
- They don't depend on each other's output
- They can complete without coordination
</details>

<details>
<summary>Hint 2: Task tool syntax</summary>

Use the Task tool with clear, independent prompts:
```
Task 1: "Analyze X and report findings"
Task 2: "Analyze Y and report findings"
Task 3: "Analyze Z and report findings"
```
</details>

<details>
<summary>Hint 3: Result aggregation</summary>

After agents complete, you synthesize:
- Collect all findings
- Look for patterns or conflicts
- Prioritize based on severity
- Create unified action plan
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Part A: Agent-Worthy Tasks

**Good for multiple agents**:
1. ✅ Fix 5 independent type errors - Different files, no dependencies
3. ✅ Investigate 3 unrelated tests - Independent investigations
5. ✅ Research 3 technologies - No dependencies between research

**Not good for multiple agents**:
2. ❌ Interconnected components - Changes affect each other
4. ❌ Refactor + update callers - Must refactor first, then update

### Part B: Expected Findings

Each agent might find:

**math.js**:
- No handling of non-number inputs
- No handling of very large numbers
- No handling of NaN

**greet.js**:
- No handling of null/undefined name
- No handling of non-string inputs
- No handling of empty string

**validate.js**:
- Insufficient validation (just checks for @)
- No handling of null/undefined
- Doesn't check for valid domain

### Part C: Synthesized Action Plan

A good synthesis would:
1. Group by severity (null handling > edge cases > enhancements)
2. Identify common patterns (all three lack null checks)
3. Prioritize based on risk
4. Create unified improvement approach

### Part D: Why Multi-Agent Fails

1. **Feature A then B**: B depends on A's implementation. Agent B would work against incomplete code.

2. **Unknown root cause**: Investigation is inherently sequential. You need to trace the bug, not guess in parallel.

3. **Refactor + 50 callers**: The refactor changes the API. All 50 updates depend on the new API.

4. **Shared test fixture**: Agents might conflict when setting up/tearing down the fixture.

### Key Insight

Multi-agent works when:
- Tasks are truly independent
- No shared state modification
- Results can be merged without conflict

Multi-agent fails when:
- Tasks have dependencies
- Order matters
- State is shared

### Pattern: Independent Investigation

```
When you have N independent problems:
1. Verify independence (no shared state, no ordering)
2. Launch N agents with clear, bounded tasks
3. Collect all results
4. Synthesize findings
5. Execute unified plan
```

</details>

---

## Reflection Questions

1. How would you verify tasks are truly independent before launching agents?
2. What's the cost of incorrectly assuming independence?
3. How many parallel agents is too many?

---

**Next**: [Exercise 3: Context Optimization Challenge](exercise-3.md)
