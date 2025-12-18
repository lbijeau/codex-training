# Exercise 2: Goals, Non-Goals, and Constraints

## Objective
Define clear goals and non-goals that align to the problem statement.

## Background
Goals clarify success. Non-goals prevent scope creep. Constraints keep delivery realistic.

## Part A: Draft Goals

**Task**: Write 2-3 goals for the PRD.

If you skipped Exercise 1, create the PRD draft first:
```bash
mkdir -p practice/pm-prd
cp docs/exercises/pm-prd/prd-template.md practice/pm-prd/prd.md
```

1. Open `practice/pm-prd/prd.md`.
2. Fill in **Goals** with 2-3 measurable outcomes.
3. Add 1-2 **Non-Goals** (what this effort will not do).
4. Add 1-2 items in **Constraints** (limits you must work within).

Use Codex to draft the sections:
```bash
codex -a on-request "Using docs/exercises/pm-prd/inputs/product-brief.md and docs/exercises/pm-prd/inputs/repo-context.md, update practice/pm-prd/prd.md: add 2-3 Goals (measurable), 1-2 Non-Goals, and 1-2 Constraints. Leave other sections unchanged."
```
Review the diff and only approve changes to `practice/pm-prd/prd.md`.

## Part B: Cite Evidence

Add at least one citation for your goals in **Evidence / Sources**.

Optional Codex step:
```bash
codex -a on-request "Update practice/pm-prd/prd.md Evidence / Sources with at least one bullet that supports your Goals. Keep existing bullets."
```

## Self-Check
- Goals are measurable and aligned to the problem
- Non-goals explicitly exclude tempting scope
- Constraints are realistic for a first release

Checks:
- `sed -n '1,120p' practice/pm-prd/prd.md`
