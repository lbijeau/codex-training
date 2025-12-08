# Exercise 3: Chaining Prompts and Breaking Work into Steps

Goal: Practice how to split a big request into manageable prompts so Codex never loses track of the context.

## Part A: Evaluate a task
1. Pick a real task (e.g., "Add logging to the data pipeline" or "Audit the authentication module").
2. Write down everything Codex needs to know to start. Include system tone, files involved, and desired outcome.
3. Draft a single prompt that handles the entire task and one that splits it into a discovery plus execution pair.
4. Compare them:
   - Which prompt is easier to review?
   - Which one avoids overwhelming the context window?

## Part B: Build a multi-step plan
1. Using the split approach, ask Codex to send back a plan with 3 steps:
   - Step 1: Information gathering (files, tests, context)
   - Step 2: Implementation idea (what to change)
   - Step 3: Verification strategy (tests, reasoning)
2. Tweak the prompt until Codex consistently returns enumerated steps (you can ask it to use a Markdown numbered list).
3. Take the plan and execute step 2 in a separate session. Feed the plan back so Codex knows the agreed plan.

## Part C: Summarize and resume
1. After completing Step 2, write a short summary (2-3 sentences) capturing:
   - What changed
   - Why you made the change
   - Remaining actions
2. Send the summary back to Codex when starting Step 3 to keep the story contiguous.
3. Observe how the summary keeps the context focused and prevents Codex from re-reading the entire history.

## Reflection
- How did splitting the task affect Codex's suggestions?
- Did the summary help Codex stay aligned with the goal?
- Where could you automate these steps using prompt templates?
