# Contributing to Your Learning

This guide helps you maintain and evolve this training program as you learn.

## Philosophy

This is YOUR learning repository. The structure is a starting point, but you should:
- Add patterns you discover
- Update modules with your insights
- Create new exercises
- Evolve the playbook to match your workflow

**Make it yours!**

---

## Adding Patterns

As you discover useful patterns through exercises or real work, document them.

### Pattern Template

Create a new file in the appropriate category:
- `docs/patterns/speed/` - Performance and efficiency
- `docs/patterns/quality/` - Code quality and verification
- `docs/patterns/debugging/` - Problem-solving approaches
- `docs/patterns/planning/` - Task decomposition and execution
- `docs/patterns/architecture/` - Design and exploration

**File Structure**:
```markdown
# Pattern Name

## Context
What situation does this pattern address?

## Problem
What specific problem does it solve?

## Solution
How do you apply this pattern?

## Trade-offs
**Pros**:
- Benefits

**Cons**:
- Limitations

**Alternatives**:
- Other approaches

## Examples
Real-world scenarios where you've used this

## Related Patterns
- [Other Pattern](../category/pattern.md)
```

### Good Pattern Names

✅ Good (Specific, descriptive):
- `parallel-execution.md`
- `context-optimization.md`
- `root-cause-tracing.md`

❌ Bad (Vague, generic):
- `better-way.md`
- `tips.md`
- `notes.md`

---

## Updating Your Playbook

As you learn, keep `docs/playbook/` current.

### Adding Scenarios

In `docs/playbook/scenarios.md`:

```markdown
**Scenario**: [What you're trying to do]
**Approach**: [Quick guidance]
**Why**: [Reasoning]
**See**: [Link to pattern]
```

### Adding Checklists

In `docs/playbook/checklists.md`:

```markdown
## [Workflow Name]

- [ ] Step 1
- [ ] Step 2
- [ ] Step 3

**When to use**: [Situation]
```

---

## Documenting Insights

### During Exercises

When completing exercises:
1. Note what worked well
2. Document what was confusing
3. Add clarifying notes to exercise files
4. Extract patterns to pattern library

### During Real Work

When applying learnings to actual projects:
1. Document variations you discover
2. Add real-world examples to patterns
3. Update playbook with context from your domain
4. Note superpowers skill discoveries

---

## Module Updates

Feel free to enhance module content:

### Adding Examples

```markdown
## New Example: [Scenario]

[Your discovery from real work]
```

### Clarifying Concepts

```markdown
> **Note from experience**: [Your insight]
```

### Adding Tips

```markdown
**Pro Tip**: [Something you learned]
```

---

## Exercise Evolution

### Marking Completion

Update `README.md` as you complete exercises:
```markdown
- [x] Module 1: Codex Code Internals
- [ ] Module 2: Advanced Customization
```

### Adding Your Own Exercises

Create new exercises in `docs/exercises/[module]/`:

```markdown
# Exercise N: [Name]

## Objective
What you'll learn

## Task
What to do

## Hints
<details>
<summary>Hint 1</summary>
[Hint content]
</details>

## Solution Discussion
<details>
<summary>Solution</summary>
[Your learnings]
</details>
```

---

## Git Workflow

### Committing Changes

Good commit messages:
```
Add pattern: parallel-grep-then-read

Discovered while working on [project].
Combines Grep for discovery with targeted Read.
Reduces context by 60% vs reading all files.
```

### Branch Strategy (Optional)

For major updates, consider branches:
```bash
git checkout -b add-security-patterns
# Make changes
git commit -m "Add security review patterns"
git checkout master
git merge add-security-patterns
```

---

## Quality Standards

### For Patterns

- ✅ Specific and actionable
- ✅ Based on real experience
- ✅ Includes examples
- ✅ Documents trade-offs
- ✅ Links to related patterns

### For Playbook

- ✅ Quick to scan
- ✅ Scenario-based
- ✅ Links to details
- ✅ Regularly updated

### For Examples

- ✅ Runnable code
- ✅ Clear purpose
- ✅ Well-commented
- ✅ Demonstrates pattern

---

## Sharing (Optional)

If you want to share learnings:

### Make Public

```bash
gh repo edit lbijeau/codex-training --visibility public --accept-visibility-change-consequences
```

### Create Discussions

Enable GitHub Discussions to share with others learning Codex Code.

### Contribute Upstream

Found a great pattern? Consider contributing to:
- superpowers plugin
- Codex Code documentation
- Community resources

---

## File Organization

### Keep It Clean

```
docs/
├── modules/          # Reference material (stable)
├── exercises/        # Learning exercises (stable)
├── patterns/         # Growing library (you add to this)
├── playbook/         # Daily reference (frequently updated)
└── plans/            # Design docs (archival)

practice/
└── scratch/          # Temporary work (not committed)

examples/             # Code samples (you may add)
```

### When to Archive

If a pattern becomes outdated:
1. Don't delete it
2. Add **[DEPRECATED]** to title
3. Link to replacement pattern
4. Explain why it changed

---

## Growth Metrics

Track your progress:

### Pattern Library

- Started: 12 patterns
- Goal: 30+ patterns
- Current: [Update as you add]

### Playbook

- Scenarios documented: [Track count]
- Checklists created: [Track count]
- Last updated: [Date]

### Modules Completed

- [x] Module 1
- [ ] Module 2
- ...

---

## Questions or Issues?

This is your repository. If something doesn't work for your learning style:
- **Change it!**
- Reorganize
- Add sections
- Remove what's not useful
- Make it work for you

The structure is a guide, not a rulebook.

---

## Regular Maintenance

### Weekly

- [ ] Add patterns discovered this week
- [ ] Update playbook with new scenarios
- [ ] Review and clean up practice/scratch/

### Monthly

- [ ] Review pattern library for organization
- [ ] Update progress metrics
- [ ] Archive old design docs
- [ ] Commit and push changes

### Per Module

- [ ] Complete exercises
- [ ] Extract patterns
- [ ] Update playbook
- [ ] Mark module complete in README

---

**Remember**: This is a living learning resource. It grows with you!
