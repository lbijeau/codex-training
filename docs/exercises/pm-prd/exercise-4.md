# Exercise 4: Risks, Dependencies, and Open Questions

## Objective
Identify delivery risks, dependencies, and open questions.

## Part A: Risks and Dependencies

**Task**: Add at least two risks and one dependency.

If you skipped Exercise 1, create the PRD draft first:
```bash
mkdir -p practice/pm-prd
cp docs/templates/prd.md practice/pm-prd/prd.md
```

1. Fill **Risks and Dependencies** in `practice/pm-prd/prd.md`.

## Part B: Open Questions

**Task**: Add 2-3 open questions.

Use Codex to draft risks and questions:
```bash
codex -a on-request "Using docs/exercises/pm-prd/inputs/product-brief.md and docs/exercises/pm-prd/inputs/repo-context.md, update practice/pm-prd/prd.md: add at least two Risks, one Dependency, and 2-3 Open Questions. Leave other sections unchanged."
```
Review the diff and only approve changes to `practice/pm-prd/prd.md`.

## Self-Check
- Risks include at least one user or adoption risk
- Dependencies include people, systems, or data
- Open questions are actionable and answerable

Checks:
- `sed -n '1,200p' practice/pm-prd/prd.md`
