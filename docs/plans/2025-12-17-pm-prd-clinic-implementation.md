# PM/PO PRD Clinic Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a PM/PO-focused PRD clinic training track with templates, exercises, and sample inputs that teach CLI-based PRD drafting.

**Architecture:** Documentation-only changes. Add a PRD template, a new exercise module set under `docs/exercises/pm-prd/`, sample inputs, and a practice workspace. Link the new track from the main README so learners can discover it. Follow existing exercise formatting conventions.

**Tech Stack:** Markdown files in this repo (no code or build changes).

### Task 1: Add PRD template

**Files:**
- Create: `docs/exercises/pm-prd/prd-template.md`

**Step 1: Write the failing test**

```bash
test -f docs/exercises/pm-prd/prd-template.md
```

**Step 2: Run test to verify it fails**

Run: `test -f docs/exercises/pm-prd/prd-template.md`
Expected: exit status 1 (file missing)

**Step 3: Write minimal implementation**

Create `docs/exercises/pm-prd/prd-template.md` with:

```markdown
# Product Requirements Document (PRD)

## Problem Statement
Describe the user problem and why it matters. Include evidence from repo sources.

## Goals
- [ ] Goal 1
- [ ] Goal 2

## Non-Goals
- [ ] Non-goal 1

## Constraints
- [ ] Constraint 1

## Scope
Describe what is in scope for this effort.

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Risks and Dependencies
- Risk:
- Dependency:

## Open Questions
- [ ] Question 1

## Evidence / Sources
- [ ] Link or reference with one-line justification
```

**Step 4: Run test to verify it passes**

Run: `test -f docs/exercises/pm-prd/prd-template.md`
Expected: exit status 0

**Step 5: Commit**

```bash
git add docs/exercises/pm-prd/prd-template.md
git commit -m "Add PRD template for PM clinic"
```

### Task 2: Add PRD clinic exercise index

**Files:**
- Create: `docs/exercises/pm-prd/README.md`

**Step 1: Write the failing test**

```bash
test -f docs/exercises/pm-prd/README.md
```

**Step 2: Run test to verify it fails**

Run: `test -f docs/exercises/pm-prd/README.md`
Expected: exit status 1

**Step 3: Write minimal implementation**

Create `docs/exercises/pm-prd/README.md` with:

```markdown
# PM/PO PRD Clinic Exercises

Practice drafting PRDs with repo context using the Codex CLI.

## Exercises

1. **[Exercise 1: Problem Statement from Evidence](exercise-1.md)**
2. **[Exercise 2: Goals, Non-Goals, and Constraints](exercise-2.md)**
3. **[Exercise 3: Scope and Acceptance Criteria](exercise-3.md)**
4. **[Exercise 4: Risks, Dependencies, and Open Questions](exercise-4.md)**

Each exercise: 20-30 minutes | Total: ~2 hours
```

**Step 4: Run test to verify it passes**

Run: `test -f docs/exercises/pm-prd/README.md`
Expected: exit status 0

**Step 5: Commit**

```bash
git add docs/exercises/pm-prd/README.md
git commit -m "Add PRD clinic exercise index"
```

### Task 3: Add Exercise 1 (problem statement)

**Files:**
- Create: `docs/exercises/pm-prd/exercise-1.md`

**Step 1: Write the failing test**

```bash
test -f docs/exercises/pm-prd/exercise-1.md
```

**Step 2: Run test to verify it fails**

Run: `test -f docs/exercises/pm-prd/exercise-1.md`
Expected: exit status 1

**Step 3: Write minimal implementation**

Create `docs/exercises/pm-prd/exercise-1.md` with:

```markdown
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

## Part B: Draft the Problem Statement

**Task**: Draft a concise problem statement using the template.

1. Copy the PRD template into your workspace:
   ```bash
   mkdir -p practice/pm-prd
   cp docs/exercises/pm-prd/prd-template.md practice/pm-prd/prd.md
   ```
2. Fill in the **Problem Statement** section in `practice/pm-prd/prd.md`.
3. Add at least two citations in the **Evidence / Sources** section.

## Part C: Self-Check

Use this checklist:
- Problem statement names the user and pain clearly
- Evidence is cited for each key claim
- The problem is stated without proposing solutions

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
```

**Step 4: Run test to verify it passes**

Run: `test -f docs/exercises/pm-prd/exercise-1.md`
Expected: exit status 0

**Step 5: Commit**

```bash
git add docs/exercises/pm-prd/exercise-1.md
git commit -m "Add PRD clinic exercise 1"
```

### Task 4: Add Exercises 2-4 (goals, scope, risks)

**Files:**
- Create: `docs/exercises/pm-prd/exercise-2.md`
- Create: `docs/exercises/pm-prd/exercise-3.md`
- Create: `docs/exercises/pm-prd/exercise-4.md`

**Step 1: Write the failing test**

```bash
test -f docs/exercises/pm-prd/exercise-2.md
test -f docs/exercises/pm-prd/exercise-3.md
test -f docs/exercises/pm-prd/exercise-4.md
```

**Step 2: Run test to verify it fails**

Run: the three `test -f` commands above
Expected: exit status 1 for each

**Step 3: Write minimal implementation**

Create `docs/exercises/pm-prd/exercise-2.md` with:

```markdown
# Exercise 2: Goals, Non-Goals, and Constraints

## Objective
Define clear goals and non-goals that align to the problem statement.

## Background
Goals clarify success. Non-goals prevent scope creep. Constraints keep delivery realistic.

## Part A: Draft Goals

**Task**: Write 2-3 goals for the PRD.

1. Open `practice/pm-prd/prd.md`.
2. Fill in **Goals** with 2-3 measurable outcomes.
3. Add 1-2 items in **Constraints** (limits you must work within).

## Part B: Cite Evidence

Add at least one citation for your goals in **Evidence / Sources**.

## Self-Check
- Goals are measurable and aligned to the problem
- Non-goals explicitly exclude tempting scope
- Constraints are realistic for a first release
```

Create `docs/exercises/pm-prd/exercise-3.md` with:

```markdown
# Exercise 3: Scope and Acceptance Criteria

## Objective
Define what is in scope and how success will be verified.

## Part A: Scope

**Task**: Describe the scope in plain language.

1. Update **Scope** in `practice/pm-prd/prd.md` with 3-5 bullets.

## Part B: Acceptance Criteria

**Task**: Add 3-5 acceptance criteria.

1. Populate **Acceptance Criteria** with clear, testable statements.

## Self-Check
- Scope is specific enough to guide engineering
- Acceptance criteria are observable and binary
```

Create `docs/exercises/pm-prd/exercise-4.md` with:

```markdown
# Exercise 4: Risks, Dependencies, and Open Questions

## Objective
Identify delivery risks, dependencies, and open questions.

## Part A: Risks and Dependencies

**Task**: Add at least two risks and one dependency.

1. Fill **Risks and Dependencies** in `practice/pm-prd/prd.md`.

## Part B: Open Questions

**Task**: Add 2-3 open questions.

## Self-Check
- Risks include at least one user or adoption risk
- Dependencies include people, systems, or data
- Open questions are actionable and answerable
```

**Step 4: Run test to verify it passes**

Run:
```bash
test -f docs/exercises/pm-prd/exercise-2.md
test -f docs/exercises/pm-prd/exercise-3.md
test -f docs/exercises/pm-prd/exercise-4.md
```
Expected: exit status 0 for each

**Step 5: Commit**

```bash
git add docs/exercises/pm-prd/exercise-2.md docs/exercises/pm-prd/exercise-3.md docs/exercises/pm-prd/exercise-4.md
git commit -m "Add PRD clinic exercises 2-4"
```

### Task 5: Add sample inputs and practice workspace

**Files:**
- Create: `docs/exercises/pm-prd/inputs/product-brief.md`
- Create: `docs/exercises/pm-prd/inputs/repo-context.md`
- Create: `docs/support/tagging.md`
- Create: `practice/pm-prd/README.md`

**Step 1: Write the failing test**

```bash
test -f docs/exercises/pm-prd/inputs/product-brief.md
test -f docs/exercises/pm-prd/inputs/repo-context.md
test -f docs/support/tagging.md
test -f practice/pm-prd/README.md
```

**Step 2: Run test to verify it fails**

Run: the four `test -f` commands above
Expected: exit status 1 for each

**Step 3: Write minimal implementation**

Create `docs/exercises/pm-prd/inputs/product-brief.md` with:

```markdown
# Product Brief: Support Intake Triage

## Context
Support requests are growing faster than the team can triage them. The current workflow uses a shared inbox and manual tagging.

## Goals
- Reduce time to first response by 30%
- Improve triage consistency across team members
- Provide visibility into recurring issue categories

## Constraints
- No new headcount this quarter
- Must integrate with existing ticket system

## Notes
Recent retrospectives cite "slow triage" and "unclear ownership" as top pain points.
```

Create `docs/exercises/pm-prd/inputs/repo-context.md` with:

```markdown
# Repo Context Notes

- Note: Issue #42 and `docs/support/tagging.md` are synthetic references for this exercise.
- Assume the product currently supports email-based intake only (exercise assumption).
- Issue #42 requests "bulk tag suggestions" for repeated issues.
- Last quarter metrics show 48h average first response time.
- The team already uses a tagging taxonomy in `docs/support/tagging.md`.
```

Create `docs/support/tagging.md` with:

```markdown
# Support Tagging Taxonomy (Training Stub)

This is a stub document used by the PM/PO PRD Clinic exercises.

Current high-level tags:
- login
- billing
- performance
- integrations
- ui-ux

Notes:
- Tags are applied manually during triage.
- No automation is in place yet.
```

Create `practice/pm-prd/README.md` with:

```markdown
# PM/PO PRD Clinic Workspace

Use this folder to store your in-progress PRD drafts.

Suggested workflow:
1. Copy the template into `practice/pm-prd/prd.md`
2. Complete each exercise in order
3. Keep evidence links in the PRD
```

**Step 4: Run test to verify it passes**

Run:
```bash
test -f docs/exercises/pm-prd/inputs/product-brief.md
test -f docs/exercises/pm-prd/inputs/repo-context.md
test -f docs/support/tagging.md
test -f practice/pm-prd/README.md
```
Expected: exit status 0 for each

**Step 5: Commit**

```bash
git add docs/exercises/pm-prd/inputs/product-brief.md docs/exercises/pm-prd/inputs/repo-context.md docs/support/tagging.md practice/pm-prd/README.md
git commit -m "Add PRD clinic inputs and workspace"
```

### Task 6: Link the new training track from the main README

**Files:**
- Modify: `README.md`

**Step 1: Write the failing test**

```bash
rg -n "PRD Clinic" README.md
```

**Step 2: Run test to verify it fails**

Run: `rg -n "PRD Clinic" README.md`
Expected: exit status 1 (no match)

**Step 3: Write minimal implementation**

Add a new training section under "Additional Training Tracks":

```markdown
### PM/PO PRD Clinic
A short, practical track for PMs and POs to draft PRDs with repo context using the Codex CLI.

📁 **[Start Here](docs/exercises/pm-prd/README.md)** | ⏱️ ~2 hours total
```

**Step 4: Run test to verify it passes**

Run: `rg -n "PRD Clinic" README.md`
Expected: match in the new section

**Step 5: Commit**

```bash
git add README.md
git commit -m "Link PM/PO PRD clinic from README"
```
