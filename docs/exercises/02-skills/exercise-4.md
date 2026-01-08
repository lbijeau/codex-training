# Exercise 4: Create a Custom Team Skill

## Objective

Create a reusable skill that captures a workflow your team uses repeatedly.

## Background

Custom skills let you encode team-specific knowledge into reusable patterns. When you find yourself explaining the same workflow repeatedly, that's a signal to create a skill.

## Part A: Identify a Recurring Workflow

**Task**: Choose a workflow to turn into a skill.

Think about workflows you do repeatedly:
- Pre-commit checks
- Code review preparation
- Bug report triage
- Release preparation
- Onboarding tasks

**For this exercise**, we'll create a "Pre-PR Checklist" skill, but you can adapt this to your own workflow.

## Part B: Write the Skill File

**Task**: Create the skill with proper structure.

1. Create the skill file:

   ```bash
   mkdir -p ~/.codex/skills
   ```

2. Create `~/.codex/skills/pre-pr-checklist.md`:

   ```markdown
   ---
   name: pre-pr-checklist
   description: Run before creating any PR to ensure quality standards
   triggers:
     - "create a PR"
     - "ready for review"
     - "open a pull request"
   ---

   # Pre-PR Checklist

   ## When to Use
   Before creating ANY pull request, regardless of size.

   ## Steps

   ### Step 1: Verify Tests
   Run the full test suite and fix any failures.

       npm test

   **Checklist:**
   - [ ] All tests pass
   - [ ] New functionality has tests
   - [ ] Edge cases are covered

   ### Step 2: Code Quality

       npm run lint
       npm run typecheck

   **Checklist:**
   - [ ] No linting errors
   - [ ] No type errors
   - [ ] No console.log statements

   ### Step 3: Documentation
   **Checklist:**
   - [ ] README updated if needed
   - [ ] JSDoc comments on public APIs
   - [ ] CHANGELOG entry added

   ### Step 4: Self-Review
   **Checklist:**
   - [ ] Diff reviewed for accidental changes
   - [ ] No debug code left in
   - [ ] Commit messages are clear

   ## Anti-Patterns
   - Don't skip for "small" PRs - small PRs still need quality
   - Don't rely on CI to catch what you should catch locally
   - Don't mark items complete without actually checking

   ## Example

   Before creating a PR:
   ```
   You: "I'm ready to create a PR. Use pre-pr-checklist"
   Codex: [Runs through all steps systematically]
   ```
   ```

3. Save the file

## Part C: Register and Test the Skill

**Task**: Make the skill available and verify it works.

1. Add to your project `./AGENTS.md` or global `~/.codex/AGENTS.md` (see Module 9 for precedence):

   ```markdown
   # Custom Skills

   I have access to custom skills in ~/.codex/skills/:
   - pre-pr-checklist: Run before creating any PR
   ```

2. Start a new Codex session

3. Test the skill:
   ```
   "I'm about to create a PR. Use pre-pr-checklist to make sure everything is ready."
   ```

**Questions to Answer**:
- Did Codex recognize and use your custom skill?
- Did it follow the steps you defined?
- Did it use the checklists?

## Part D: Iterate and Improve

**Task**: Refine the skill based on usage.

1. Use the skill on a real or practice PR

2. Note what's missing or could be improved:
   - Are there steps you always add manually?
   - Are some steps never relevant?
   - Is the order optimal?

3. Update the skill file with improvements

---

## Hints

<details>
<summary>Hint 1: Skill file format</summary>

Skills use YAML frontmatter for metadata:
```yaml
---
name: skill-name
description: When and why to use this
triggers:
  - "phrase that should trigger this"
---
```
</details>

<details>
<summary>Hint 2: Making skills discoverable</summary>

Add your skills to your project `./AGENTS.md` or global `~/.codex/AGENTS.md` so Codex knows about them (see Module 9 for precedence). You can also reference them explicitly:
"Use ~/.codex/skills/pre-pr-checklist.md"
</details>

<details>
<summary>Hint 3: Checklist items</summary>

Use `- [ ]` for checklists. This signals to Codex (and you) that these items need verification, not just acknowledgment.
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Skill Structure Best Practices

A good skill has:

**1. Clear Trigger Conditions**
```yaml
triggers:
  - "create a PR"
  - "ready for review"
  - "open a pull request"
```
Multiple triggers catch different phrasings.

**2. Actionable Steps**
Each step should be:
- Specific (not vague)
- Verifiable (can check if done)
- Ordered (dependencies respected)

**3. Checklists for Verification**
```markdown
**Checklist:**
- [ ] Specific item to verify
- [ ] Another specific item
```

**4. Anti-Patterns**
Document common mistakes so the skill warns against them.

**5. Examples**
Show the skill in action so usage is clear.

### Making Skills Stick

For a skill to be useful, it must be:
1. **Discoverable**: Listed in `./AGENTS.md` or `~/.codex/AGENTS.md` (see Module 9 for precedence) or easy to reference
2. **Triggered**: Either automatically or easily invoked
3. **Complete**: Covers the full workflow without gaps
4. **Maintained**: Updated as the workflow evolves

### Team Skill Ideas

- **Incident response**: Steps when production breaks
- **Code review**: How your team reviews code
- **Feature flagging**: How to add/remove feature flags
- **Database migrations**: Safety checks for schema changes
- **API versioning**: How to add new API versions

### Key Insight

The best skills come from pain: "I keep forgetting to..." or "We always mess up when..." are signals for new skills.

</details>

---

## Reflection Questions

1. What other workflows on your team would benefit from being skills?
2. How would you share custom skills across your team?
3. What makes a workflow a good candidate for a skill vs. just documentation?

---

## Module 2 Complete!

You've learned:
- How to install and configure superpowers
- How to invoke skills for planning
- The 3-Attempt Rule for debugging
- How to create custom skills

**Next Module**: [Module 3: Speed & Efficiency Patterns](../../modules/03-speed.md)
