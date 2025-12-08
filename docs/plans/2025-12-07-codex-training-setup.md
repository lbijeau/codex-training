# Codex Training Repository Setup Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Mirror the existing training program while rebranding every artifact for Codex so that `codex-training` is immediately usable as a Codex-focused mastery repository.

**Architecture:** The repo stays Markdown-first with top-level guides (`README`, `GETTING_STARTED`, `RESOURCES`, `PROGRESS`), a `docs/` tree for modules/patterns/practice, and a `.codex-examples` workspace that exposes context/config for Codex sessions. Each module/exercise references the `.codex` config area so Codex knows how to behave, and plans and resources are tracked inside `docs/plans` and `docs/resources`. Changes are managed solely through Git commands in the shell.

**Tech Stack:** Markdown documents + Git + standard shell utilities (`rsync`, `rg`, `python3`, `sed`).

### Task 1: Seed the codex-training workspace

**Files:**
- Create: the base `docs/`, `examples/`, `practice/`, `README.md`, `GETTING_STARTED.md`, `RESOURCES.md`, `PROGRESS.md`, etc., by copying from `codex-training`
- Modify: N/A (pure copy)
- Test: `git status --short` once the copy is finished

**Step 1: Confirm the workspace is clean so the copy does not merge with random files**
Run: `ls /Users/lucbijeau/repositories/codex-training`
Expected: no tracked content (might show the empty directory we started in).

**Step 2: Copy the source training files (minus Git history) into codex-training**
Run: `rsync -a --exclude='.git' /tmp/source-training/ /Users/lucbijeau/repositories/codex-training/`
Expected: The root of `codex-training` contains the same directories and Markdown files as the Claude repo.

**Step 3: Initialize a fresh Git repository around the copied files**
Run: `git -C /Users/lucbijeau/repositories/codex-training init`
Expected: Git reports "Initialized empty Git repository" and `git status` can now be run.

**Step 4: Check what files are untracked after the copy**
Run: `git -C /Users/lucbijeau/repositories/codex-training status --short`
Expected: A long list of untracked files matching the Codex repo tree.

**Step 5: Spot-check that core directories like `docs`, `examples`, `practice`, and `.codex-examples` now exist**
Run: `ls /Users/lucbijeau/repositories/codex-training`
Expected: output shows `.codex-examples`, `docs`, `examples`, `practice`, `README.md`, etc.

### Task 2: Convert `.codex` assets into Codex equivalents

**Files:**
- Create: `.codex-examples/*` as a renamed copy of `.codex-examples/*`
- Modify: files under `.codex-examples/` to mention Codex and `.codex` paths
- Test: `rg -n '\.codex' -g '*' .codex-examples`

**Step 1: Rename the example workspace directory while preserving its contents**
Run: `mv /Users/lucbijeau/repositories/codex-training/.codex-examples /Users/lucbijeau/repositories/codex-training/.codex-examples`
Expected: `.codex-examples` directory exists and `.codex-examples` no longer does.

**Step 2: Rewrite every file inside `.codex-examples` to refer to Codex and `.codex` paths**
Run: 
```
python3 - <<'PY'
from pathlib import Path
root = Path('/Users/lucbijeau/repositories/codex-training/.codex-examples')
for path in root.rglob('*'):
    if path.is_file():
        text = path.read_text()
        updated = text.replace('Codex', 'Codex').replace('.codex', '.codex').replace('codex-training', 'codex-training')
        if updated != text:
            path.write_text(updated)
PY
```
Expected: All `.codex-examples` files refer to Codex, `.codex`, and the new repo name.

**Step 3: List any remaining `.codex` mentions to ensure the rename is complete**
Run: `rg -n '\.codex' -g '*' /Users/lucbijeau/repositories/codex-training/.codex-examples`
Expected: no hits.

**Step 4: Verify no residual references to Codex remain inside `.codex-examples`**
Run: `rg -n 'Codex' /Users/lucbijeau/repositories/codex-training/.codex-examples`
Expected: no hits.

**Step 5: Confirm the example workspace still contains the expected structure**
Run: `ls -a /Users/lucbijeau/repositories/codex-training/.codex-examples`
Expected: directories `commands`, `skills`, `config.json`, `context.md`, etc., now under `.codex-examples`.

### Task 3: Rebrand Markdown artifacts and repository references to Codex

**Files:**
- Modify: `README.md`, `GETTING_STARTED.md`, `RESOURCES.md`, `PROGRESS.md`, `docs/**/*.md`, `examples/**/*.md`, `practice/**/*.md`, etc.
- Test: `rg -n 'Codex'` & `rg -n 'codex-training'` ensuring zero occurrences

**Step 1: Inventory every file that currently mentions "Codex" so we know where replacements are needed**
Run: `rg -l 'Codex' /Users/lucbijeau/repositories/codex-training | sort`
Expected: List of Markdown files under docs, examples, etc. to rebrand.

**Step 2: Swap every `codex-training` path reference for `codex-training` in those files**
Run:
```
python3 - <<'PY'
from pathlib import Path
root = Path('/Users/lucbijeau/repositories/codex-training')
for path in root.rglob('*.md'):
    text = path.read_text()
    new = text.replace('codex-training', 'codex-training')
    if new != text:
        path.write_text(new)
PY
```
Expected: no Markdown file still mentions `codex-training`.

**Step 3: Replace `Codex Code` with `Codex Code` and general `Codex` references with `Codex` where appropriate**
Run:
```
python3 - <<'PY'
from pathlib import Path
root = Path('/Users/lucbijeau/repositories/codex-training')
for path in root.rglob('*.md'):
    text = path.read_text()
    new = text.replace('Codex Code', 'Codex Code').replace('Codex', 'Codex')
    if new != text:
        path.write_text(new)
PY
```
Expected: Markdown files now talk about Codex rather than Codex and mention the Codex program, while preserving other words.

**Step 4: Manually review and adjust the most important files (README, GETTING_STARTED, RESOURCES, PROGRESS) to ensure the narrative reads well for Codex**
Run: open the files (`README.md`, `GETTING_STARTED.md`, `RESOURCES.md`, `PROGRESS.md`) in the editor and refactor paragraphs so the module descriptions, progress tracker, and resource links make sense in a Codex context.
Expected: The top-level docs present the Codex mastery story rather than Codex, mention Codex tooling/resources, and remain internally consistent.

**Step 5: Confirm the repository no longer contains `Codex`, `.codex`, or `codex-training` mentions**
Run:
```
rg -n 'Codex' /Users/lucbijeau/repositories/codex-training
rg -n '\.codex' /Users/lucbijeau/repositories/codex-training
rg -n 'codex-training' /Users/lucbijeau/repositories/codex-training
```
Expected: Each command returns no hits.

### Task 4: Reframe resources, modules, and exercises around Codex specifics

**Files:**
- Modify: `README.md`, `RESOURCES.md`, all files under `docs/`, `examples/`, and `practice/` that describe workflow or tooling
- Test: `rg -n 'Codex' README.md GETTING_STARTED.md RESOURCES.md` to ensure the new theme is visible

**Step 1: Rewrite the README introduction so the program is called "Codex Code Mastery" and the four dimensions reference Codex-centric topics**
Run: Use `apply_patch` or an editor to convert the heading and bullet content in `README.md`.
Expected: README now introduces the Codex journey with mentions of Codex internals, workflows, and teaching Codex your pattern library.

**Step 2: Update `GETTING_STARTED.md`, `PROGRESS.md`, and any module landing pages (`docs/modules/*.md`) so Codex is the subject, referencing Codex-specific hooks/examples (e.g., `.codex` folders and Codex docs)**
Run: edit the files directly, ensuring the module statuses, explanations, and exercises refer to Codex.
Expected: Module pages and the getting started guide motivate Codex-specific practice steps and instructions.

**Step 3: Tailor `RESOURCES.md` to highlight Codex/OpenAI references (official docs, Codex-specific API sections, community links) instead of Codex-only resources**
Run: edit `RESOURCES.md` to replace or supplement the reference list so the curated resources point to Codex/OpenAI material.
Expected: Resources list contains Codex references (OpenAI docs, relevant discussion forums) while still covering general AI tooling.

**Step 4: Ensure every example/exercise/pattern references `.codex` config paths and Codex-specific prompts (rather than `.codex`) so the learning materials align with the renamed workspace**
Run: search within `examples/`, `docs/patterns/`, and `practice/` for `.codex` and adjust the instructions as necessary.
Expected: Each how-to now mentions `.codex` directories and Codex prompts/configs.

**Step 5: Re-run a quick `rg -n 'Codex Code'` to confirm prominent placement in the main docs**
Run: `rg -n 'Codex Code' README.md GETTING_STARTED.md RESOURCES.md`
Expected: Each key doc contains the new term, proving that the rebrand is central.

### Task 5: Verify the workspace and prepare the initial commit

**Files:**
- Test: `git status --short`, `git diff --stat` to review work

**Step 1: List the untracked/modified files so we can see the full change set**
Run: `git -C /Users/lucbijeau/repositories/codex-training status --short`
Expected: All files appear untracked (this is still a fresh repo) but represent the newly rebranded content.

**Step 2: Check for any lingering Codex references after the edits**
Run:
```
rg -n 'Codex' /Users/lucbijeau/repositories/codex-training
```
Expected: no hits.

**Step 3: Verify there are no `.codex` paths left**
Run: `rg -n '\.codex' /Users/lucbijeau/repositories/codex-training`
Expected: no hits.

**Step 4: Double-check there are no stray `codex-training` mentions**
Run: `rg -n 'codex-training' /Users/lucbijeau/repositories/codex-training`
Expected: no hits.

**Step 5: Stage everything so the next commit will capture the Codex training repo**
Run: `cd /Users/lucbijeau/repositories/codex-training && git add --all`
Expected: `git status --short` returns nothing but the staged files (ready for commit).
