# Parallel Execution

## Context
Multiple independent operations (reads, searches, validations) need to happen. Sending each as its own prompt wastes time, tokens, and mental energy.

## Problem
Sequential prompts accumulate context and increase latency. When operations do not depend on each other, you do not need separate responses.

## Solution
Bundle multiple helper calls or requests into a single prompt so Codex can process them together.

**Workflow**:
1. Identify operations that are independent (no shared parameters)
2. Group them in one prompt or helper call list
3. Send them together so Codex replies once with all results
4. Process the aggregated response before moving to the next step

### Example: Batch file reads
```
User: Read src/auth/login.ts, src/auth/validate.ts, and tests/auth.test.ts and summarize each file’s purpose.
```
Codex responds with three summaries in a single message.

### Example: Multi-validation batch
```
User: Run the following helpers in parallel:
- run_linter()
- run_type_check()
- search_console_logs()
Return a JSON object with each helper’s result.
```
Codex uses structured JSON so you can process each result separately.

## Trade-offs
**Pros**:
- Fewer messages
- Lower token usage
- Faster resolution
- Cleaner history

**Cons**:
- Cannot feed the output of one helper back into another without another prompt
- Aggregated responses may be dense

**Alternatives**:
- Use sequential prompts when results are dependent
- Use streaming (if available) for very large outputs

## Related Patterns
- [Context Optimization](../speed/context-optimization.md)
- [Prompt Pipelines](../planning/stage-based-planning.md)
