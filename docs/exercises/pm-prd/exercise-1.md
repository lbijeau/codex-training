# Exercise 1: Problem Statement from Evidence

## Objective
Draft a problem statement grounded in repo evidence.

## Background
Strong PRDs start with an evidence-backed problem statement. This exercise builds that habit by citing repo sources.

## Part A: Gather Evidence

**Task**: Read the provided inputs and identify the core user problem.

1. Read the sample inputs:
   - `docs/exercises/pm-prd/inputs/product-brief.md`
   - `docs/exercises/pm-prd/inputs/repo-context.md`
2. List 2-3 facts you will cite in your problem statement.
3. Use Codex to extract evidence (read-only):
   ```bash
   codex -a on-request "Read docs/exercises/pm-prd/inputs/product-brief.md and docs/exercises/pm-prd/inputs/repo-context.md. Summarize 3 evidence bullets for a PRD problem statement. Do not edit files."
   ```
4. If Codex proposes writes, decline them. This step is read-only.

## Part B: Draft the Problem Statement

**Task**: Draft a concise problem statement using the template.

1. Copy the PRD template into your workspace:
   ```bash
   mkdir -p practice/pm-prd
   cp docs/templates/prd.md practice/pm-prd/prd.md
   ```
2. Fill in the **Problem Statement** section in `practice/pm-prd/prd.md`.
3. Add at least two citations in the **Evidence / Sources** section.
4. Use Codex to draft into the file:
   ```bash
   codex -a on-request "Update practice/pm-prd/prd.md: fill Problem Statement with 3-5 sentences. Add Evidence / Sources with at least two bullets referencing the inputs. Leave other sections unchanged."
   ```
5. Review the proposed diff and only approve changes to `practice/pm-prd/prd.md`.

## Part C: Self-Check

Use this checklist:
- Problem statement names the user and pain clearly
- Evidence is cited for each key claim
- The problem is stated without proposing solutions

Checks:
- `sed -n '1,80p' practice/pm-prd/prd.md`

---

## Hints

<details>
<summary>Hint 1: Evidence first</summary>

Pull exact phrases or metrics from the inputs and cite them.
</details>

<details>
<summary>Hint 2: Avoid solutions</summary>

A problem statement describes the pain, not the fix.
</details>
