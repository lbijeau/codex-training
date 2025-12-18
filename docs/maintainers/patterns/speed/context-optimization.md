# Context Optimization

## Context
You are working in a large codebase where dumping entire files into the prompt wastes tokens and slows down Codex. You want only the relevant piece of information to stay within the window.

## Problem
Sending entire files or repeating the same snippet fills the context budget, making Codex forget earlier messages and take longer to respond.

## Solution
Use targeted helpers and summarized prompts to keep the context tight:

**Key Strategies**:
1. **Grep before read** – run a helper that searches for the keyword, then read only the relevant section
2. **Use offsets** – feed Codex only the lines around the match
3. **Summarize** – replace long exchanges with short summaries before continuing
4. **Cache facts** – store metadata (e.g., "Authentication module involves X, Y, Z") and reuse it in later prompts

## Trade-offs
**Pros**:
- Lower token usage
- Faster, clearer answers
- More room for follow-up questions

**Cons**:
- Requires discipline to summarize ongoing work
- May need helper scripts to extract the right slices

## Examples
### Example 1: Grep before Read
```
1. Call helper: grep("validateUser", "src/api/users.ts")
2. Read the file with offset around the reported line
```
Only the 20 lines you need enter the context.

### Example 2: Summarize after each stage
```
1. Prompt: Analyze service dependencies
2. Codex returns long list
3. You summarize into "Relevant services: Auth, Billing"
4. Next prompt uses the summary instead of repeating the list
```
The summary is 40 tokens instead of 400.

### Example 3: Cache metadata
Write a JSON file (`contexts/auth_metadata.json`) describing key files and endpoints. When starting a new session, include:
```
System: Current focus: auth module. Metadata: {...}
```
Now Codex starts with fresh context instead of re-reading the same docs.

## Application Checklist
Before adding new files to the context:
- [ ] Can a helper extract the relevant snippet?
- [ ] Would a summary suffice instead of the raw text?
- [ ] Have I already shared this file earlier?
- [ ] Could I replace repeated text with a reference like "see summary #3"?

## Metrics
Track after each session:
- Tokens used per response
- Number of files shared
- Whether the follow-up prompts needed reruns
Aim to reduce redundant content by 40–60%.

## Related Patterns
- [Parallel Execution](parallel-execution.md)
- [Function-Oriented Decomposition](../planning/stage-based-planning.md)
