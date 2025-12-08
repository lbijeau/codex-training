---
name: project-conventions
description: Training program conventions and patterns
---

# Training Program Conventions

Use this skill when working within the codex-training repository.

## Directory Structure

```
docs/modules/     - Learning content (read for concepts)
docs/exercises/   - Practice exercises (work through these)
docs/patterns/    - Pattern library (add discoveries here)
docs/playbook/    - Quick reference (update frequently)
practice/scratch/ - Sandbox (temporary work)
examples/         - Code samples (reference these)
```

## Adding Patterns

When you discover a useful pattern:

1. Create file in `docs/patterns/[category]/`
2. Follow the pattern template (see CONTRIBUTING.md)
3. Include: Context, Problem, Solution, Trade-offs, Examples
4. Link to related patterns
5. Update category README if needed
6. Commit with descriptive message

## Updating Playbook

As you learn:

1. Add scenarios to `docs/playbook/scenarios.md`
2. Add checklists to `docs/playbook/checklists.md`
3. Keep entries scannable and actionable
4. Link to detailed patterns

## Exercise Workflow

When working on exercises:

1. Read exercise objective
2. Try implementing yourself
3. Check hints if stuck
4. Review solution discussion
5. Extract patterns you discover
6. Update progress in README

## Commit Messages

Use clear, descriptive messages:

```
Good:
"Add pattern: parallel-grep-then-read"
"Complete Module 2 Exercise 3"
"Update playbook with debugging scenarios"

Bad:
"Update"
"Fix"
"WIP"
```

## Practice Work

For experimental code:

- Use `practice/scratch/` directory
- It's gitignored (safe to experiment)
- Clean up periodically
- Extract patterns before deleting

## Pattern Quality

Good patterns are:
- Based on real experience
- Specific and actionable
- Include concrete examples
- Document trade-offs
- Link to related patterns

Avoid:
- Theoretical patterns you haven't used
- Vague advice
- Patterns without examples
- Duplicating existing patterns
