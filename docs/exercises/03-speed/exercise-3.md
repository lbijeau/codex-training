# Exercise 3: Context Optimization Challenge

## Objective

Minimize context usage while maintaining effectiveness through strategic information management.

## Background

Every token in context costs money and affects response quality. Learning to provide "just enough" context—not too little, not too much—is a key efficiency skill.

## Part A: Measure Context Impact

**Task**: See how context size affects responses.

1. Create a large file:
   ```bash
   cd practice/scratch
   # Create a 500-line file
   for i in {1..500}; do echo "Line $i: Some content here" >> large.txt; done
   ```

2. **Approach 1 - Full context**:
   ```
   "Read large.txt and tell me what's on line 250"
   ```

3. **Approach 2 - Targeted context**:
   ```
   "Read lines 245-255 of large.txt and tell me what's on line 250"
   ```

**Measure**:
- Token usage difference
- Response time difference
- Response quality difference

## Part B: Summarize vs. Keep

**Task**: Practice deciding what to keep and what to summarize.

You're working on a feature and have gathered:
- 3 files of relevant code (200 lines each)
- 5 related documentation pages
- 10 previous discussion messages

**Questions to Answer**:
- What should stay as full context?
- What should be summarized?
- What can be dropped entirely?

**Apply the Criteria**:
| Content | Keep Full | Summarize | Drop |
|---------|-----------|-----------|------|
| Core file being modified | ? | ? | ? |
| Related helper files | ? | ? | ? |
| API documentation | ? | ? | ? |
| Previous attempts that failed | ? | ? | ? |
| Unrelated discussion | ? | ? | ? |

## Part C: Use /compact Effectively

**Task**: Practice the compact command.

1. Start a Codex session and have a multi-turn conversation:
   ```
   "Read the README"
   "What are the main sections?"
   "Summarize the installation steps"
   "What dependencies are listed?"
   "Are there any TODO items?"
   ```

2. Check context size (if available) or estimate based on conversation length

3. Run `/compact`

4. Continue the conversation:
   ```
   "Based on what we discussed, what's the most important thing to know about this project?"
   ```

**Questions to Answer**:
- Did `/compact` preserve the essential information?
- What was lost?
- When is compacting worth it vs. starting fresh?

## Part D: Strategic Context Loading

**Task**: Plan context for a complex task.

You need to implement a new API endpoint. Plan what context to load:

**Available Information**:
- Existing API files (10 files, ~100 lines each)
- Database models (5 files, ~50 lines each)
- Test files (10 files, ~80 lines each)
- Documentation (3 files, ~200 lines each)
- Previous similar endpoint (1 file, ~100 lines)

**Create a Context Loading Plan**:
1. What to load first (essential)?
2. What to load on-demand (if needed)?
3. What to never load (irrelevant)?
4. Estimated total context size?

---

## Hints

<details>
<summary>Hint 1: Context prioritization</summary>

Priority order:
1. Files you'll modify directly
2. Files that define interfaces you'll use
3. Similar examples to follow
4. Documentation for APIs you'll call
5. Tests (can load later for verification)
</details>

<details>
<summary>Hint 2: Summarization candidates</summary>

Good to summarize:
- Large documentation files
- Previous conversation context
- Error logs and stack traces

Keep full:
- Code you're modifying
- Interface definitions
- Recent, relevant examples
</details>

<details>
<summary>Hint 3: The /compact command</summary>

`/compact` summarizes the conversation history to reduce tokens while preserving key information. Use it when:
- Conversation has grown long
- Early discussion is no longer relevant
- You're hitting context limits
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Part A: Expected Results

**Full context (500 lines)**:
- Higher token usage
- Slower processing
- Same answer quality for this simple task
- Wasted tokens on 495 irrelevant lines

**Targeted context (10 lines)**:
- Minimal token usage
- Faster processing
- Same answer quality
- Efficient use of context

### Part B: Context Decisions

| Content | Decision | Reason |
|---------|----------|--------|
| Core file being modified | **Keep Full** | Need exact code to modify |
| Related helper files | **Summarize** | Need interface, not implementation |
| API documentation | **Summarize** | Extract relevant endpoints only |
| Previous attempts that failed | **Keep Key Points** | Remember what didn't work |
| Unrelated discussion | **Drop** | No value, adds noise |

### Part C: Compact Behavior

**Preserved by /compact**:
- Key decisions made
- Files that were discussed
- Important findings
- Current task context

**Lost by /compact**:
- Exact wording of previous responses
- Detailed code snippets from early messages
- Tangential discussions

**When to compact vs. start fresh**:
- Compact: When you need to continue but trim history
- Start fresh: When the new task is unrelated

### Part D: Context Loading Plan

**Phase 1 - Essential (load first)**:
- Previous similar endpoint (1 file, ~100 lines) - Template to follow
- Database models for this feature (2 files, ~100 lines) - Data structure
- API route definitions (1 file, ~100 lines) - Where to add

**Phase 2 - On-demand**:
- Other database models - If needed for relationships
- Other API files - If need to understand patterns
- Tests - When writing tests

**Phase 3 - Never load**:
- Unrelated API files
- Unrelated test files
- Full documentation (summarize instead)

**Estimated context**:
- Phase 1: ~300 lines = ~3000 tokens
- Phase 2: Variable, load as needed
- Total with room for conversation: ~10000 tokens target

### Key Insight

Context optimization follows the "just in time" principle:
- Load what you need NOW
- Summarize what you need to REFERENCE
- Drop what you DON'T need

### Pattern: Context Loading Strategy

```
1. Identify the core task
2. Load direct dependencies (files you'll touch)
3. Summarize reference material (docs, examples)
4. Keep on-demand list (load if needed)
5. Monitor and compact when necessary
```

</details>

---

## Reflection Questions

1. How does context size affect your typical Codex interactions?
2. What's your strategy for long conversations?
3. How would you teach "context awareness" to a teammate?

---

**Next**: [Exercise 4: Speed Measurement & Analysis](exercise-4.md)
