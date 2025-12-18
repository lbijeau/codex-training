# Parallel Investigation Patterns

## Context
You have several independent investigations or validations that need to happen at once. Running everything sequentially would waste time and force Codex to remember irrelevant details.

## Problem
Combining unrelated tasks into a single conversation can pollute the context window and slow down conclusions.

## Solution
Run multiple prompt threads or helper calls independently, then synthesize the outputs in a final summarizing prompt.

**Pattern**:
1. Start separate prompt streams (or function helper calls) for each task:
   - Prompt A: Profiles API endpoints
   - Prompt B: Reviews database queries
   - Prompt C: Examines bundle size
2. Capture each thread’s summary
3. Feed all summaries into a “synthesizer” prompt that merges the findings

This keeps each prompt focused and lets you parallelize the investigations without additional specialized agents.

## Trade-offs
**Pros**:
- Faster throughput for independent tasks
- Cleaner context per thread
- Easier to measure each investigation’s outcome

**Cons**:
- You must manually synthesize the threads
- Each thread increases the number of prompts you manage
- Use careful summaries to avoid repetition when synthesizing

## Examples
### Example 1: Debugging multiple bugs
```
Thread 1: "List auth-related issues and hypothesize the root cause."
Thread 2: "Inspect the payment flow for timeouts and errors."
Thread 3: "Review notification delivery code for missed retries."
Final prompt: "Combine the three bug investigations and propose the next fixes."
```

### Example 2: Performance investigation
```
Thread 1: "Profile API latency and highlight hotspots."
Thread 2: "Analyze database queries for missing indexes."
Thread 3: "Check bundle size and cache TTLs."
Synthesis: "Given these findings, recommend the top three improvements."
```

### Example 3: Quality review
```
Thread 1: "Run lint and formatting checks via helper functions."
Thread 2: "Scan tests to ensure coverage around changed files."
Thread 3: "Evaluate security-critical code paths."
Synthesis: "Summarize each helper output and generate a QA checklist."
```

## Application Checklist
Before launching parallel threads:
- [ ] Are the tasks independent?
- [ ] Does each task capture a unique concern?
- [ ] Can I summarize each thread succinctly?
- [ ] Have I prepared helper functions to return structured outputs?

## Performance Impact
Typical improvements:
- **Time**: 2-4x faster (threads run simultaneously)
- **Clarity**: Each thread has focused context
- **Quality**: You can compare perspectives in the synthesis prompt

## Related Patterns
- [Parallel Execution](parallel-execution.md)
- [Context Optimization](context-optimization.md)
