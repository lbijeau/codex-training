# Copilot Instructions for Codex CLI Mastery Program

## Project Overview

A comprehensive learning program for mastering Codex CLI (Claude Code), covering technical depth, workflow optimization, pattern development, and teaching capability.

### Major Components

- **Modules** (`docs/modules/`): Learning guides (01-09)
- **Exercises** (`docs/exercises/`): Hands-on practice for each module
- **Training Tracks** (`docs/training/`): Standalone training courses
- **Practice Workspace** (`practice/`): Sandbox for learner experiments
- **Scripts** (`scripts/`): CLI helpers and verification tools
- **Tests** (`tests/`): Test suites for verification scripts
- **Sample Prompts** (`.codex-examples/`): Example prompts and helper functions for learners
- **Code Examples** (`examples/`): Sample code for exercises

## Content Structure

- **Module files**: Markdown guides in `docs/modules/01-*.md` through `09-*.md`
- **Exercise folders**: `docs/exercises/<name>/` with README.md per exercise (e.g., `01-getting-started/`, `pm-prd/`)
- **Maintainer docs**: Patterns, playbook, templates in `docs/maintainers/`
- **Verification**: `scripts/verify_exercises.py` validates manifest declarations

## Patterns & Conventions

### Module Format

Each module follows: Concept -> Practice -> Pattern -> Document

### Exercise Requirements

- Each exercise folder needs a `README.md` explaining the exercise
- Exercises with verification requirements need a `.manifest.json` file
- Manifests declare required sections and output fixtures
- Link exercises to parent module concepts

### File Organization

- Keep module content focused (one concept per module)
- Place reusable code in `scripts/`
- Add learner experiments to `practice/`
- Document patterns in `docs/maintainers/`

## Developer Workflow

### Adding Content

1. Create module content in `docs/modules/`
2. Create corresponding exercises in `docs/exercises/`
3. Update `README.md` module list
4. Run `python3 scripts/verify_exercises.py` to validate

### Verification

```bash
python3 scripts/verify_exercises.py
```

## Development Guidelines

### Philosophy & Simplicity

- Prefer small, testable changes; incremental progress
- Learn from existing content before adding new material
- Clear intent over clever explanations; boring and obvious is best
- Single concept per module; avoid premature abstractions

### Code Quality (for scripts)

- Every commit must pass verification scripts
- Follow existing patterns in `scripts/`
- Test scripts before committing
- Commit messages should explain "why"

### Important Reminders

NEVER:
- Bypass verification scripts
- Create exercises without objectives
- Add modules without corresponding exercises

ALWAYS:
- Update README.md when adding modules
- Follow existing naming conventions
- Keep examples practical and runnable
- Document new patterns in maintainers docs

---

Update this file as new workflows, conventions, or dependencies are added.
