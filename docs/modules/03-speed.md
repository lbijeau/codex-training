# Module 3: Speed & Efficiency Patterns

## Overview

Maximize speed by batching work, minimizing context waste, and choosing when to run parallel requests or carefully ordered prompt sequences. This module teaches patterns that surface independent work, reuse prompt templates, and keep Codex focused on what matters.

**Learning Objectives**:
- Identify which operations can be batched into a single request
- Coordinate parallel prompt pipelines without spawning multiple agents
- Reduce context waste through targeted reading and summarization
- Decompose tasks in a way Codex can execute efficiently
- Pick the right execution strategy for every scenario

**Time**: 2-3 hours

---

## 1. Parallel Request Bundles

### Why batching helps
Every message you send to Codex has a cost: time, tokens, and cognitive load. When multiple operations are independent, bundle them into one request instead of firing off multiple sequential prompts.

**Pattern: Batch file reads**
```
User: Read src/a.ts, src/b.ts, src/c.ts
Codex: {"A content": ..., "B content": ..., "C content": ...}
```
This reduces round trips, keeps the context shorter, and lets Codex reason with all information at once.

**Pattern: Multi-tool summaries**

*Using Codex CLI (built-in tools):*
Codex CLI has built-in capabilities for file operations. Ask for multiple things in one prompt:
```
User: Read src/auth.ts, search for "TODO" in src/, and show me the last 5 git commits
```
Codex executes these internally and returns combined results.

*Using Codex API with custom helpers:*
Register helper functions via `functions.json` schema (see `codex_helpers/README.md`):
1. Create executable scripts that return JSON (e.g., `list_todos.py`, `run_tests.py`)
2. Define schemas in `functions.json`:
   ```json
   {
     "name": "run_tests",
     "description": "Run pytest and return results",
     "parameters": { "type": "object", "properties": { "target": { "type": "string" } } }
   }
   ```
3. Pass `functions.json` to the Chat Completion API; Codex can call multiple helpers in one turn
4. Execute the requested functions and return JSON results

If each helper returns structured JSON, Codex can combine them in a single response.

**Metrics to track**:
- Messages per task (aim for 1–3)
- Total tokens used (watch for repeated content)
- Subjective turn-around time

---

## 2. Prompt Pipelines Instead of Subagents

OpenAI Codex does not spawn agents; you split work by chaining prompts. Think of each prompt as a specialization step, not a new agent.

**Pipeline blueprint**
1. **Discovery prompt**: Ask Codex to summarize the problem or gather facts
2. **Planning prompt**: Feed the summary plus constraints and ask for a plan
3. **Execution prompt**: Supply the plan and implementation hints, run the helpers, and capture the edits
4. **Validation prompt**: Ask Codex to confirm tests or verify safety
5. **Documentation prompt**: Summarize the change

Each stage adds a short chunk of context. Store intermediate summaries in variables so you can reuse them in the next prompt.

**Pattern: Parallel Investigations via prompts**
If you need to explore multiple hypotheses, run separate prompt streams and merge their outputs manually.

**How to run parallel streams:**
1. **Multiple terminals**: Open 2-3 terminal windows, each running `codex --cd /your/repo`
2. **Using `codex exec`**: Run background jobs in parallel:
   ```bash
   codex exec "analyze auth flow and summarize findings" > auth.txt &
   codex exec "analyze caching strategy and summarize findings" > cache.txt &
   codex exec "analyze test coverage gaps and summarize findings" > tests.txt &
   wait
   ```
3. **Merge in a synthesizer prompt**: Feed the outputs back into a final session:
   ```bash
   codex "Given these findings, identify the root cause:
   AUTH: $(cat auth.txt)
   CACHE: $(cat cache.txt)
   TESTS: $(cat tests.txt)"
   ```

This approach lets you explore multiple hypotheses concurrently without waiting for each to complete sequentially.

---

## 3. Context Optimization

### The context budget
Tokens are finite. Every `read_file`, prompt, and response consumes part of the window. When you hit the limit, Codex forgets earlier data.

### Strategies

**1. Targeted sharing** – Pull only relevant text instead of entire files:
```bash
# Instead of "read src/auth.ts" (might be 500+ lines), ask for specific parts:
codex "show me only the login() and logout() functions from src/auth.ts"

# Or use grep to find specific patterns first:
codex "grep for 'async function' in src/auth.ts and show those functions"
```

**2. Summaries** – Replace long outputs with condensed versions:
```bash
# After a long exploration, ask Codex to summarize:
codex "summarize what we learned about the auth system in 3 bullet points"

# Save the summary for later use:
codex exec "summarize the codebase architecture" > contexts/architecture-summary.md
```
Keep summaries under 500 tokens. Use them instead of re-reading files.

**3. Context caches** – Save state between sessions:
```bash
# Create a contexts/ directory for session state
mkdir -p contexts/

# After each major discovery, save a summary:
codex exec "summarize current progress and open questions" > contexts/session-state.md

# When resuming, prepend the context:
codex "$(cat contexts/session-state.md)

Continue from where we left off: implement the caching layer"
```

**4. Scoped prompts** – Keep system prompts minimal:
```bash
# Create reusable prompt templates in prompts/
cat > prompts/code-review.md << 'EOF'
Review this code for bugs and security issues. Be concise.
Focus on: null checks, error handling, input validation.
EOF

# Use the template:
codex "$(cat prompts/code-review.md)

$(cat src/auth.ts)"
```
Templates prevent prompt drift and keep token usage predictable.

### Avoid
- Re-reading the same file multiple times
- Sending entire repo contents instead of the relevant snippet
- Letting the plan prompt become longer than the final plan

---

## 4. Task Decomposition Frameworks

### Framework 1: Dependency-first
1. List all operations you must perform
2. Identify which data each needs
3. Group operations without dependencies into a single prompt
4. Sequence dependent operations (e.g., plan before edit)

### Framework 2: Role-Based Prompting
Use prompt templates to mimic specialized roles:
- `Discoverer` template: Fact gathering, uses `grep` helper
- `Planner` template: Creates step-by-step plan
- `Implementer` template: Executes plan with function calls
- `Verifier` template: Runs tests or chooses validation steps

Switch templates instead of spawning new agents.

### Framework 3: Verification Chains
After every significant change:
1. Summarize the change (one sentence)
2. Ask Codex to propose tests or validations
3. Run the helper (e.g., `run_tests`) and feed results back
4. Only proceed once Codex acknowledges the tests

---

## 5. Execution Strategy Selection

| Scenario | Strategy | Why |
|----------|----------|-----|
| Read 5 unrelated files | Parallel bundle | Independent data, one prompt keeps tokens low |
| Find then edit | Sequential pipeline | Need search results before editing |
| Multiple hypotheses | Parallel prompts | Each prompt solves its own question, combine later |
| Complex refactor | Rolled plan | Break into discovery → plan → implement |
| Quick fix | Single prompt | Minimal context needed |

**Execution patterns**
- **Batch**: Fire multiple `read_file` or `grep` helpers in the same request
- **Pipeline**: Chain prompts with explicit hand-offs (summaries, plan, execute)
- **Verify**: Always finish with a validation prompt (and helper call) before closing the session

---

## 6. Performance Pattern Library

### Pattern: Breadth-first discovery
Use concurrent helper calls to map the codebase:
```
read_file("README.md")
get_git_status()
grep("TODO", "src/**/*.ts")
```
Return all outputs in one response and let Codex synthesize.

### Pattern: Parallel validation
Ask Codex for multiple validation rubrics in one go:
```
Assistant: Run lint, tests, security checks (call helpers list_lint, run_tests, security_scan)
```
Structure the helpers so they all run and return JSON.

### Pattern: Progressive summarization
When you finish a stage:
1. Prompt Codex: “What changed in 2-3 sentences?”
2. Save the summary and provide it in the next prompt
3. Use it as the basis for the next question

---

## Key Takeaways
1. **Bundle independent operations** to cut down round trips
2. **Chain prompts** instead of relying on multiple agents
3. **Guard the context budget** with summaries and targeted sharing
4. **Decompose tasks** by dependencies and template roles
5. **Always validate** with helper calls before finishing

---

## Next Steps
1. Practice bundling reads and helper calls in Module 3 exercises
2. Create templates for each stage of your plan pipeline
3. Document a validation workflow (helpers + prompts)
4. Measure token/message savings for a typical task
