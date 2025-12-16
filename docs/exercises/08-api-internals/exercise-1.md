# Exercise 1: Agent Behavior & Context Management

## Objective

Understand how context flows through Codex Code and how agents access (or don't access) information.

## Background

Agents only know what's in their context. This exercise will help you see this principle in action and learn strategies for managing context effectively.

## Part A: Context Visibility Test

**Task**: Create a simple test to observe what information Codex has access to.

1. In the practice workspace, create a file called `secret.txt` with some content
2. **Without mentioning the file name**, ask Codex a question whose answer is in the file
3. Observe the behavior
4. Now explicitly share the file contents and ask again

**Questions to Answer**:
- What happened when you didn't mention the file?
- What changed when you did?
- What does this tell you about how Codex accesses information?

## Part B: Context Optimization

**Scenario**: You need to find and read information from 5 different files.

**Task**: Try two approaches and compare:

**Approach 1** (Sequential):
```
Ask Codex to read file1.txt
(wait for response)
Ask Codex to read file2.txt
(wait for response)
... continue for all 5 files
```

**Approach 2** (Parallel):
```
Ask Codex to read all 5 files at once
```

**Questions to Answer**:
- How many messages did Codex send in each approach?
- Look at the token usage - what's the difference?
- Which approach is more efficient and why?

## Part C: Context vs Knowledge

**Task**: Ask Codex three questions:

1. "What is React?" (tests general knowledge)
2. "What React version is this project using?" (tests context - but no context provided)
3. Create a `package.json` with React, then ask again "What React version is this project using?"

**Questions to Answer**:
- Which questions could Codex answer without file access?
- What's the difference between Codex's general knowledge and project-specific context?
- How do you know when you need to provide context vs relying on knowledge?

---

## Hints

<details>
<summary>Hint 1: Creating test files</summary>

Use the practice workspace:
```bash
cd practice/scratch
echo "The secret password is: BANANA" > secret.txt
```
</details>

<details>
<summary>Hint 2: Parallel tool execution</summary>

You can ask Codex to "read files A, B, C, D, and E in parallel" - Codex knows how to do this.
</details>

<details>
<summary>Hint 3: Observing context usage</summary>

Look for the token usage information that appears after each Codex response.
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Part A: Context Visibility

**What you should observe**:
- When you don't mention the file, Codex has no way to know about it
- Codex can't "see" your filesystem unless you explicitly share files
- Even if you created the file in a previous message, Codex won't automatically read it

**Key Insight**: Codex's context is limited to:
1. The conversation history (messages exchanged)
2. Tool results that were explicitly executed
3. General knowledge baked into the model

**Pattern Discovered**: Always provide explicit context - don't assume Codex "knows" about files just because they exist.

### Part B: Context Optimization

**Expected Results**:

Approach 1 (Sequential):
- 5 separate Codex messages (one per file read)
- Higher total token usage
- Each message includes system prompt + full history
- Slower (round-trip latency for each)

Approach 2 (Parallel):
- 1 Codex message with 5 file results
- Lower total token usage
- Single response processes all files together
- Faster (one round-trip)

**Key Insight**: Parallel execution saves context AND time when operations are independent.

**Pattern Discovered**:
```
When you need multiple independent pieces of information:
→ Request them in parallel
→ Saves tokens and latency
→ More efficient conversation
```

### Part C: Context vs Knowledge

**Expected Answers**:

1. "What is React?" - Codex answers easily (general knowledge)
2. "What React version?" (no context) - Codex says it needs to see package.json
3. "What React version?" (after sharing package.json) - Codex gives specific version

**Key Insight**: Codex has two types of "knowing":
- **Knowledge**: General information baked into the model
- **Context**: Specific information about YOUR project/files

**Pattern Discovered**:
```
General questions → Use knowledge
Project-specific questions → Provide context
```

### Bigger Picture

This exercise demonstrates the fundamental principle of Codex Code:

**Context is not automatic. You must provide it.**

This affects:
- How you ask questions (be specific about what to read)
- How you structure conversations (provide context upfront)
- How you optimize for speed (parallel when possible)
- How you think about Codex's capabilities (it's powerful but not psychic)

</details>

---

## Reflection Questions

After completing this exercise, consider:

1. How does understanding context change how you interact with Codex?
2. What situations require you to provide explicit context?
3. When would parallel vs sequential execution matter most in your work?

---

**Next**: [Exercise 2: Parallel vs Sequential Tool Execution](exercise-2.md)
