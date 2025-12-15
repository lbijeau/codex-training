# Module 1: Codex Code Internals

## Overview

Understanding how OpenAI Codex works under the hood is essential for mastering it. This module explores the chat-based architecture, function-calling workflow, and context strategies that determine how Codex behaves during a session.

**Learning Objectives**:
- Understand the message types that make up a Codex session and how system/user/assistant instructions shape each interaction
- Master function calling so Codex can reason about external data sources without hallucinating
- Keep the context window healthy through summarization, chunking, and smart request sequencing
- Break large problems into prompt chains, verifying each step and feeding results into the next

**Time**: 3-4 hours

---

## 1. Codex Session Architecture

### What is a Codex session?
A Codex session is a conversation with the OpenAI Chat Completion API. Every request includes a series of messages, typically:
- **System**: Persistent instructions about tone, safety, and available functions
- **User**: The current request or question
- **Assistant**: Codex's response (either text or a `function_call` payload)
- **Function**: When Codex asks your code to run a helper, you call that function, then supply the result back as a `function` message

> **What is a system prompt?** The system prompt (or "system message") is the first message in every conversation that defines the AI's behavior, capabilities, and constraints. Think of it as a job description you give before work begins. The AI reads this first and follows its instructions throughout the session. Example: *"You are Codex, a senior engineer. Always explain your reasoning. Never delete files without confirmation."*

Think of it as a structured turn-taking system where Codex only knows what you feed it in those messages.</n
### Message flow
```
System  →  User prompt → Assistant (text or function call)
                                   ↓
                           Function execution
                                   ↓
                         You supply function result
                                   ↓
                           Assistant (final response)
```
This means there is no persistent agent memory outside the conversation history — context resets when you start a new sequence.

### Designing the system message
- State the role clearly (e.g., “You are Codex, an assistant that edits Python code”) and keep it short
- Declare the functions you expose (name, description, parameters) so Codex can reference them
- Mention safety constraints (don’t expose secrets, log everything, prefer explanations)
- Refresh the system prompt for each new session or when you need to pivot behavior

### What Codex retains
- Everything in the current message array (system + history + functions)
- Function results you provide after a `function_call`
- Recent pieces of context you keep near the end of the history

Anything outside that sequence is invisible until you mention it again, so plan to summarize or re-send as needed.

---

## 2. Function Calling & Tool Wrappers

Function calling lets Codex delegate tasks to your own code. Instead of dreaming up how to make an API call, Codex returns a structured `function_call` object that you execute.

### Declaring functions
In the request you send to the OpenAI client, register each helper you want Codex to use:
```python
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
    model="codex-1",
    messages=[
        {"role": "system", "content": "You are a thoughtful coding assistant."},
        {"role": "user", "content": "Get the list of TODOs."},
    ],
    functions=[
        {
            "name": "list_todos",
            "description": "Collect TODO comments from a repo",
            "parameters": {
                "type": "object",
                "properties": {
                    "paths": {
                        "type": "array",
                        "items": {"type": "string"}
                    }
                },
                "required": ["paths"]
            }
        }
    ],
    function_call="auto"
)
```
Codex may respond with a `function_call` telling you which helper to invoke and what arguments to pass.

### Running the helper
After you see a `function_call`, run the matching helper and send the result back:
```python
if response.choices[0].message.get("function_call"):
    call = response.choices[0].message.function_call
    result = list_todos(call.arguments)
    follow_up = client.chat.completions.create(
        model="codex-1",
        messages=response.messages + [
            {
                "role": "function",
                "name": call.name,
                "content": result
            }
        ]
    )
```
Codex now sees the function result and can continue reasoning.

### Tool wrappers instead of built-in tools
Instead of relying on built-in tools such as `Read` or `Bash`, OpenAI Codex sessions run helper functions that you package and register yourself:
- Write a `scripts/commands/read_file.py` that reads a path, formats the contents, and returns JSON
- Expose a `run_tests` function that runs `pytest` and returns pass/fail metadata
- Wrap HTTP APIs (GitHub, Jira, search) with consistent parameter/response shapes

Store these helpers in `./codex_helpers/` or another folder, and keep a manifest (`functions.json`) describing their schema. That way every session reuses the same catalog of trusted operations.

### Function-calling best practices

**Keep each function focused**
```json
{
  "name": "read_file",
  "description": "Read a file and return its contents",
  "parameters": {
    "type": "object",
    "properties": {
      "path": { "type": "string", "description": "Relative path to the file" }
    },
    "required": ["path"]
  }
}
```

**Limit responses to avoid noisy results**
```python
response = client.chat.completions.create(
    model="codex-1",
    messages=messages,
    max_tokens=800,  # Cap output length
    functions=functions
)
```

**Validate and sanitize arguments** (Codex can hallucinate parameter names)
```python
def read_file(args):
    path = args.get("path")
    if not path or ".." in path:  # Prevent directory traversal
        return {"error": "Invalid path"}
    if not os.path.exists(path):
        return {"error": f"File not found: {path}"}
    with open(path) as f:
        return {"content": f.read()[:10000]}  # Limit size
```

**Never expose secrets** — use `.env` files
```bash
# .env (add to .gitignore!)
OPENAI_API_KEY=sk-...
DATABASE_URL=postgres://...
```
```python
# Load before any API calls
from dotenv import load_dotenv
load_dotenv()

client = OpenAI()  # Reads OPENAI_API_KEY from environment
```

**Log every call for reproducibility**
```python
import logging
logging.basicConfig(filename="codex_calls.log", level=logging.INFO)

def log_function_call(name, args, result):
    logging.info(f"Function: {name} | Args: {args} | Result: {result[:200]}")

# After each function execution:
log_function_call(func_name, func_args, json.dumps(result))
```

---

## 3. Managing Context and Tokens

### The context window
OpenAI models have finite context windows (e.g., 128K tokens for later Codex models). Each message contributes to this total:
```
Total context = system prompt + user/assistant history + function results + new generation
```
The window includes both incoming message tokens and the tokens you expect the model to emit, so budget accordingly.

### Strategies to stay inside the window

**1. Summaries** — Periodically compress prior exchanges:

*API approach:*
```python
# After a long exchange, ask for a summary
messages.append({"role": "user", "content": "Summarize our progress in 3 bullet points."})
response = client.chat.completions.create(model="codex-1", messages=messages)
summary = response.choices[0].message.content

# Start fresh with just the summary
messages = [
    {"role": "system", "content": system_prompt},
    {"role": "assistant", "content": f"Progress so far:\n{summary}"}
]
```

*CLI approach:*
```bash
codex exec "Summarize what we've learned about the auth system in 3 bullets" > context.txt
# Start new session with context
codex "Context: $(cat context.txt)

Now implement the rate limiting we discussed."
```

**2. Chunking** — Search before sharing entire files:

*API approach:*
```python
def get_relevant_snippet(filepath, keyword):
    """Return only lines containing keyword, with context."""
    with open(filepath) as f:
        lines = f.readlines()
    matches = [(i, line) for i, line in enumerate(lines) if keyword in line]
    # Return matches with 3 lines of context
    return format_with_context(lines, matches, context=3)

# Instead of sending entire file:
snippet = get_relevant_snippet("src/auth.ts", "validateUser")
messages.append({"role": "user", "content": f"Review this code:\n{snippet}"})
```

*CLI approach:*
```bash
# Don't do this (sends entire file):
codex "Review src/auth.ts"

# Do this instead (targeted):
codex "Show me only the validateUser function from src/auth.ts and review it"
```

**3. Streaming** — Stop early if output diverges:

```python
stream = client.chat.completions.create(
    model="codex-1",
    messages=messages,
    stream=True
)

output = ""
for chunk in stream:
    delta = chunk.choices[0].delta.content or ""
    output += delta
    print(delta, end="", flush=True)

    # Stop if we detect repetition or off-topic content
    if len(output) > 2000 and is_repetitive(output):
        break
```

**4. Cache context** — Store state between sessions:

```bash
# Save progress after each major step
codex exec "Summarize: what files we changed, what's left to do" > .codex-context.md

# Resume later
codex "Previous context: $(cat .codex-context.md)

Continue with the next step."
```

### Monitoring tokens

*API approach:*
```python
response = client.chat.completions.create(model="codex-1", messages=messages)

# Check token usage
usage = response.usage
print(f"Prompt: {usage.prompt_tokens}, Completion: {usage.completion_tokens}, Total: {usage.total_tokens}")

# If approaching limit (e.g., 100K of 128K), summarize and reset
if usage.total_tokens > 100000:
    summary = summarize_conversation(messages)
    messages = [{"role": "system", "content": system_prompt},
                {"role": "assistant", "content": summary}]
```

*CLI approach:*
```bash
# Codex CLI manages context automatically, but you can check session size:
ls -la ~/.codex/sessions/

# If a session feels slow or forgetful, start fresh with a summary:
codex exec "Summarize our current task and progress" > summary.txt
# Then start new session with that context
```

---

## 4. Chaining Requests and Planning

### When to split work
Large problems benefit from staged prompts:
1. **Discover**: Ask Codex to describe the problem space or analyze a diff
2. **Plan**: Have it reason about steps and output a plan (list of actions)
3. **Execute**: Apply a plan step-by-step, feeding results back
4. **Verify**: Run tests/functions to confirm the change
5. **Document**: Summarize what changed and how to continue

Each stage adds a small amount to the context, so keep plan outputs concise.

### Re-using plan templates
Maintain prompt templates in `docs/prompt_templates/` with placeholders like `{{task}}` so you can quickly spin up new sessions:
```
System: You are a Codex assistant that…
User: I need to {{task}}. Start by summarizing the current state and then propose the next 3 steps.
```
Use a small templating utility (`python render_prompt.py --template plan.md --task="audit dependencies"`) to inject the task.

### Feedback loops
After every Codex response:
- Inspect for hallucinated or unsafe content
- Correct it by sending follow-up user messages or function calls
- Lock deterministic operations into functions so Codex cannot deviate

---

## 5. Working with Local Data and Scripts

You cannot rely on built-in file tools, so build lightweight wrappers:
- `codex_helpers/read_file(path)` returns the file content and optionally tokenizes it
- `codex_helpers/run_tests()` runs your test suite and returns structured results
- `codex_helpers/git_status()` summarizes untracked/modified files

Expose these helpers as functions. When Codex calls `read_file`, run the wrapper, capture the bytes, and feed them back as a `function` message.

### File sharing strategy
- Never send whole repos. Instead: search, read relevant snippets, and summarize (attach line numbers)
- Use `git diff --stat` combined with `codex_helpers/git_status` to tell Codex what changed
- Keep large files in a shared artifact (e.g., zipped) and describe them rather than sending the whole text

### Security and secrets
- Store API keys in environment variables (`OPENAI_API_KEY`) and never include them in prompts
- Sanitize file paths/functions exposed to Codex
- Audit logs of function calls for suspicious patterns

---

## 6. Quick Reference

| Concept | Codex equivalent |
| --- | --- |
| Agents | A single chat session with message history
| Tools | Your own function wrappers and helper scripts
| Subtasks | Split problems over multiple prompts or function calls
| Hooks | Logging, validation, and wrappers you run before/after executing helpers

**Best practices**:
- Keep system instructions constant per session
- Use function calling to handle structured data safely
- Summarize and chunk to maintain context health
- Lock repetitive or risky operations behind deterministic helpers

---

## Next Steps
1. Try the Module 1 exercises to practice designing prompts and function calls
2. Build a helper that searches files and registers itself as a function
3. Experiment with chaining requests and summarizing long histories
4. Document any useful prompts in `docs/prompts/`
