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

*Option A: Use Codex's built-in session resume (for sequential work):*
```bash
# Sessions are stored in ~/.codex/sessions/
# Resume the most recent session:
codex resume --last

# Or pick from a list of recent sessions:
codex resume

# Or resume a specific session by ID (from /status or ~/.codex/sessions/):
codex resume abc123-def456
```

*Option B: Manual context files (for parallel work or cross-session sharing):*
```bash
# Create a contexts/ directory for shared state
mkdir -p contexts/

# After each major discovery, save a summary:
codex exec "summarize current progress and open questions" > contexts/session-state.md

# When starting a NEW session, prepend the context manually:
codex "$(cat contexts/session-state.md)

Continue from where we left off: implement the caching layer"
```

**Note:** Parallel `codex` instances do NOT share context automatically. Each is independent. Use manual file passing (Option B) when running parallel investigations that need to share findings.

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

**Steps:**
1. List all operations you must perform
2. Identify which data each needs
3. Group operations without dependencies into a single prompt
4. Sequence dependent operations (e.g., plan before edit)

**Example: Adding a new API endpoint**
```bash
# Step 1-2: Map out operations and dependencies
# - Read existing routes (no dependency)
# - Read existing models (no dependency)
# - Read tests (no dependency)
# - Plan the endpoint (depends on above)
# - Implement (depends on plan)
# - Test (depends on implementation)

# Step 3: Bundle independent reads in ONE prompt
codex "Read these files and summarize their patterns:
- src/routes/index.ts
- src/models/user.ts
- tests/routes.test.ts"

# Step 4: Sequential prompts for dependent operations
codex "Based on the patterns above, plan a new GET /users/:id endpoint"
codex "Implement the plan in src/routes/users.ts"
codex "Add tests for the new endpoint"
```

### Framework 2: Role-Based Prompting

Create reusable prompt templates for each role:

```bash
# Create templates directory
mkdir -p prompts/

# Discoverer template - fact gathering
cat > prompts/discoverer.md << 'EOF'
You are gathering facts. Do NOT make changes.
Search the codebase and report findings as bullet points.
Use grep to find relevant code. Summarize patterns you see.
EOF

# Planner template - step-by-step planning
cat > prompts/planner.md << 'EOF'
You are creating a plan. Do NOT implement yet.
Given the facts below, create a numbered step-by-step plan.
Each step should be small and testable.
EOF

# Implementer template - execution
cat > prompts/implementer.md << 'EOF'
You are implementing a plan. Follow it exactly.
Make one change at a time. Show diffs before applying.
EOF

# Verifier template - validation
cat > prompts/verifier.md << 'EOF'
You are verifying changes. Run tests and report results.
Check for: syntax errors, type errors, failing tests, security issues.
EOF
```

**Using the templates in sequence:**
```bash
# 1. Discover
codex "$(cat prompts/discoverer.md)

Find all authentication-related code in src/"

# 2. Plan (feed in discovery results)
codex "$(cat prompts/planner.md)

Facts: [paste discoverer output]
Task: Add rate limiting to auth endpoints"

# 3. Implement
codex "$(cat prompts/implementer.md)

Plan: [paste planner output]"

# 4. Verify
codex "$(cat prompts/verifier.md)

Run the test suite and check for regressions"
```

### Framework 3: Verification Chains

After every significant change, run this verification loop:

```bash
# Step 1: Make a change and summarize it
codex "Add input validation to the login endpoint"
codex exec "Summarize the change you just made in one sentence" > change-summary.txt

# Step 2: Ask Codex to propose validations
codex "$(cat change-summary.txt)

What tests or validations should we run to verify this change?"

# Step 3: Run the tests and capture results
codex exec "Run pytest on tests/auth/ and report results" > test-results.txt

# Step 4: Feed results back - only proceed if tests pass
codex "Test results:
$(cat test-results.txt)

Do all tests pass? If yes, we can proceed. If no, what needs to be fixed?"
```

**Verification script (run after each change):**
```bash
#!/bin/bash
# verify-change.sh - Run after each significant change

echo "=== Summarizing change ==="
codex exec "Summarize the most recent code change in one sentence" | tee change.txt

echo "=== Running tests ==="
codex exec "Run the test suite" | tee tests.txt

echo "=== Checking results ==="
codex "Change: $(cat change.txt)
Tests: $(cat tests.txt)

Are we good to proceed? Answer YES or NO with explanation."
```

---

## 5. Execution Strategy Selection

| Scenario | Strategy | Why |
|----------|----------|-----|
| Read 5 unrelated files | Parallel bundle | Independent data, one prompt keeps tokens low |
| Find then edit | Sequential pipeline | Need search results before editing |
| Multiple hypotheses | Parallel prompts | Each prompt solves its own question, combine later |
| Complex refactor | Rolled plan | Break into discovery → plan → implement |
| Quick fix | Single prompt | Minimal context needed |

### Strategy Examples

**Parallel bundle** (read 5 unrelated files):
```bash
# ONE prompt, multiple files - Codex reads all and synthesizes
codex "Read and summarize the key responsibilities of each:
- src/auth/login.ts
- src/auth/logout.ts
- src/api/users.ts
- src/api/sessions.ts
- src/middleware/cors.ts"
```

**Sequential pipeline** (find then edit):
```bash
# Step 1: Find what needs changing
codex "grep for deprecated API calls in src/"
# Step 2: Use the results to make targeted edits
codex "Update the deprecated calls you found to use the new API"
```

**Parallel prompts** (multiple hypotheses):
```bash
# Run investigations concurrently
codex exec "Is the bug in the auth layer? Check src/auth/" > hyp1.txt &
codex exec "Is the bug in the caching layer? Check src/cache/" > hyp2.txt &
codex exec "Is the bug in the API layer? Check src/api/" > hyp3.txt &
wait

# Synthesize findings
codex "Which hypothesis is most likely?
Auth: $(cat hyp1.txt)
Cache: $(cat hyp2.txt)
API: $(cat hyp3.txt)"
```

**Rolled plan** (complex refactor):
```bash
# Phase 1: Discovery
codex exec "Map all usages of the old UserService class" > discovery.txt

# Phase 2: Planning
codex "Based on: $(cat discovery.txt)
Create a step-by-step plan to migrate to the new UserRepository pattern"

# Phase 3: Execute (after reviewing plan)
codex "Execute step 1 of the migration plan"
```

**Single prompt** (quick fix):
```bash
# Simple, self-contained change
codex "Fix the typo in src/config.ts line 42: 'recieve' should be 'receive'"
```

### Execution Pattern Summary
- **Batch**: Bundle independent operations in one prompt
- **Pipeline**: Chain prompts with explicit hand-offs (summaries, plan, execute)
- **Verify**: Always finish with a validation prompt before closing the session

---

## 6. Performance Pattern Library

### Pattern: Breadth-first discovery
Ask Codex to gather multiple pieces of information in a single prompt:
```bash
codex "Before we start, give me an overview:
1. Read README.md and summarize the project
2. Show git status (any uncommitted changes?)
3. Find all TODO comments in src/**/*.ts
4. List the main directories and their purposes"
```
Codex handles all of this internally and returns a synthesized response.

### Pattern: Parallel validation
Run multiple validation checks in one prompt:
```bash
codex "Run these checks and report results:
1. npm run lint
2. npm test
3. Check for console.log statements that should be removed"
```

Or run them concurrently in the background:
```bash
codex exec "Run npm run lint and summarize issues" > lint.txt &
codex exec "Run npm test and summarize failures" > tests.txt &
codex exec "Find security issues: hardcoded secrets, SQL injection, XSS" > security.txt &
wait

# Review all results
cat lint.txt tests.txt security.txt
```

### Pattern: Progressive summarization
After each stage, capture a summary to reduce context in future prompts:
```bash
# After a discovery phase
codex exec "Summarize what we learned about the auth system in 3 bullet points" > auth-summary.txt

# Use the summary (not the full exploration) in the next prompt
codex "Given this context: $(cat auth-summary.txt)

Now plan how to add rate limiting to the login endpoint"
```

This keeps token usage low while preserving essential context.

---

## Key Takeaways
1. **Bundle independent operations** to cut down round trips
2. **Chain prompts** instead of relying on multiple agents
3. **Guard the context budget** with summaries and targeted sharing
4. **Decompose tasks** by dependencies and template roles
5. **Always validate** with tests or checks before finishing

---

## Next Steps
1. Practice bundling reads and searches in a single prompt
2. Create reusable templates in a `prompts/` directory
3. Document a validation workflow (verification script + test runs)
4. Measure token/message savings for a typical task
