# JS Static Analysis Suite Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build lightweight JS/TS static analyzers that surface duplicate logic, complexity deltas, and cross-layer dependencies before invoking Codex so prompts stay token-light.

**Architecture:** Each analyzer is a standalone Node.js script that reads workspace files or diffs, publishes concise one-line alerts, and feeds into a shared hook so the session log captures the findings alongside helper usage.

**Tech Stack:** Node.js (ES modules), Bash hooks, Markdown templates

### Task 1: Duplicate chunk scanner (`scripts/check_duplicates.js`)

**Files:**
- Create: `scripts/check_duplicates.js`
- Create: `practice/static-checks/duplicate-sample/a.js`
- Create: `practice/static-checks/duplicate-sample/b.js`
- Test: run `node scripts/check_duplicates.js practice/static-checks/duplicate-sample`

**Step 1: Write the failing test fixture**
Create `practice/static-checks/duplicate-sample/a.js`/`b.js` with similar functions so the scanner should report a match.

**Step 2: Run the scanner before implementation**
```
node scripts/check_duplicates.js practice/static-checks/duplicate-sample
```
Expected: the command exits non-zero and prints `Duplicate block detected:` with both file paths.

**Step 3: Implement the scanner**
Maintain a map of normalized block hashes (strip whitespace/comments) and emit each duplicate as `Duplicate block detected: <fileA>#Lx-Ly <fileB>#Lm-Ln`.
Use `fs.promises` to walk files, chunk by function/block heuristics, and track line ranges.

**Step 4: Re-run the scanner**
Expect the command now exits zero when run against unique files and non-zero with duplicates, matching the earlier fixture output.

**Step 5: Capture the execution output**
Add the one-line report to `docs/maintainers/templates/static-analysis-report.md` sample area so readers know how to paste results into Codex prompts.

### Task 2: Complexity delta reporter (`scripts/report_complexity_diff.js`)

**Files:**
- Create: `scripts/report_complexity_diff.js`
- Create: `practice/static-checks/complexity-diff/base.js`
- Create: `practice/static-checks/complexity-diff/feature.js`
- Test: run `git --no-pager diff --stat` and `node scripts/report_complexity_diff.js` after staging the fixture change

**Step 1: Write the failing test diff**
Stage `practice/static-checks/complexity-diff/feature.js` that introduces a long function (e.g., >40 LOC) and multiple nesting levels.

**Step 2: Run the reporter ahead of implementation**
```
git add practice/static-checks/complexity-diff/feature.js
node scripts/report_complexity_diff.js
```
Expected: prints `High complexity delta: feature.js:+42 LOC, max depth 5` and exits with status 1.

**Step 3: Implement the reporter**
Parse `git diff --cached` for added/modified JS/TS functions, count lines and nesting depth, and emit warnings for thresholds (e.g., >30 LOC or >4 depth) with `Function <name> increased to <LOC> lines`.

**Step 4: Run reporter again**
Expect the warning repeated and command still fails until diff is simplified.

**Step 5: Document commands**
Add instructions to `docs/maintainers/playbook/scenarios.md` that mention running `node scripts/report_complexity_diff.js` before log entry creation.

### Task 3: Dependency adjacency linter (`scripts/check_cross_layer_imports.js`)

**Files:**
- Create: `scripts/check_cross_layer_imports.js`
- Create: `practice/static-checks/cross-layer/ui-component.tsx`
- Create: `practice/static-checks/cross-layer/db-utility.ts`
- Test: run `node scripts/check_cross_layer_imports.js practice/static-checks/cross-layer`

**Step 1: Create conflicting fixture**
`ui-component.tsx` imports functions from `db-utility.ts`; this should trigger a warning.

**Step 2: Run the linter before coding**
```
node scripts/check_cross_layer_imports.js practice/static-checks/cross-layer
```
Expected: prints `Cross-layer import detected: ui-component.tsx → db-utility.ts` and exits 1.

**Step 3: Implement the linter**
Define layer rules (e.g., `practice/static-checks/cross-layer/ui-*` cannot import `practice/static-checks/cross-layer/db-*`). Scan files for `import`/`require` paths and emit violations.

**Step 4: Re-run linter**
No violation should exit 0; violating fixture still produces warnings.

**Step 5: Record the report**
Add a static-analysis bullet to `docs/maintainers/templates/static-analysis-report.md` summarizing the cross-layer rule output.

### Task 4: Static check hook and report template

**Files:**
- Create: `scripts/run_static_checks.sh`
- Modify: `docs/maintainers/playbook/scenarios.md` (add a step referencing the hook)
- Create: `docs/maintainers/templates/static-analysis-report.md`
- Test: run `bash scripts/run_static_checks.sh` after staging changes

**Step 1: Write failing template**
Draft `docs/maintainers/templates/static-analysis-report.md` with placeholders for each analyzer output.

**Step 2: Run hook before implementation**
```
bash scripts/run_static_checks.sh
```
Expected: hook runs the three analyzers, prints collected one-line warnings, and exits 1.

**Step 3: Implement the hook**
Execute `node scripts/check_duplicates.js`, `node scripts/report_complexity_diff.js`, `node scripts/check_cross_layer_imports.js`, collect outputs, and log them via `scripts/post_session_logger.sh helpers="dup-check,complexity,d-layer"`. Exit code reflects whether any warnings were emitted.

**Step 4: Re-run the hook**
With no violations, the hook should exit 0 and print `Static checks clean.`

**Step 5: Update docs**
Mention the hook and template in `docs/maintainers/playbook/scenarios.md` and reference the template in `docs/maintainers/playbook/scenarios.md` so teammates know to paste findings into Codex prompts.

### Verification
1. `node scripts/check_duplicates.js practice/static-checks/duplicate-sample` outputs the expected match.
2. `node scripts/report_complexity_diff.js` warns on the staged complexity fixture and reports line/depth counts.
3. `node scripts/check_cross_layer_imports.js practice/static-checks/cross-layer` flags the UI→DB import.
4. `bash scripts/run_static_checks.sh` aggregates warnings, logs them, and exits 1 when issues exist.
5. `docs/maintainers/templates/static-analysis-report.md` template includes sections for each analyzer output.
