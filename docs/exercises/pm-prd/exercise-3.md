# Exercise 3: Scope and Acceptance Criteria

## Objective
Define what is in scope and how success will be verified.

## Part A: Scope

**Task**: Describe the scope in plain language.

If you skipped Exercise 1, create the PRD draft first:
```bash
mkdir -p practice/pm-prd
cp docs/exercises/pm-prd/prd-template.md practice/pm-prd/prd.md
```

1. Update **Scope** in `practice/pm-prd/prd.md` with 3-5 bullets.

## Part B: Acceptance Criteria

**Task**: Add 3-5 acceptance criteria.

1. Populate **Acceptance Criteria** with clear, testable statements.

Use Codex to draft scope and criteria:
```bash
codex -a on-request "Using docs/exercises/pm-prd/inputs/product-brief.md and docs/exercises/pm-prd/inputs/repo-context.md, update practice/pm-prd/prd.md: add 3-5 Scope bullets and 3-5 Acceptance Criteria bullets. Leave other sections unchanged."
```
Review the diff and only approve changes to `practice/pm-prd/prd.md`.

## Self-Check
- Scope is specific enough to guide engineering
- Acceptance criteria are observable and binary

Checks:
- `sed -n '1,160p' practice/pm-prd/prd.md`
