# Codex CLI Hands-on Training Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a fresh hands-on training track for Codex CLI users and PM/trainer audiences, including repo review findings and Jupyter-friendly exercises.
**Architecture:** Author a concise plan-first structure, create a dedicated training directory with modular markdown labs, and capture a findings report based on the upstream [openai/codex](https://github.com/openai/codex) repository review.  
**Tech Stack:** Markdown, Codex CLI usage patterns, Jupyter notebook workflows (documented), shell commands.

## Stage 1: Review upstream Codex repo and capture gaps
Goal: Understand current docs, CLI capabilities, and training needs for new users and PMs.  
Success Criteria: Key features, workflows, and constraints captured as evidence; initial gaps listed.  
Tests: N/A (evidence gathering).  
Status: Complete

## Stage 2: Design training structure and exercises
Goal: Define the training modules, learning objectives, and hands-on labs (including a Jupyter-oriented exercise).  
Success Criteria: Outline covering setup, CLI operations, exec mode, approvals/sandboxing, MCP basics, PM review heuristics; at least one Jupyter-based workflow described.  
Tests: N/A (design review).  
Status: Complete

## Stage 3: Author training materials
Goal: Write modular markdown files in a new training subdirectory for both audiences.  
Success Criteria: New directory contains at least four markdown modules (overview, setup, CLI labs, Jupyter/PM track), instructions actionable with commands/examples.  
Tests: N/A (docs).  
Status: Complete

## Stage 4: Document findings
Goal: Produce a detailed findings report summarizing repo review, gaps, and recommendations.  
Success Criteria: Markdown report present; includes target vs current state, top gaps, priorities, and suggested actions.  
Tests: N/A (docs).  
Status: Complete

## Stage 5: Deepen architecture and concepts coverage
Goal: Add training content covering Codex architecture, AGENTS/skills, MCP servers/clients, and execpolicy/sandbox interactions.  
Success Criteria: New module added to training directory; README updated to reference it; demo AGENTS/execpolicy assets provided.  
Tests: N/A (docs).  
Status: Complete

### Task 1: Repo review and gap notes
**Files:**  
- Modify: `docs/training/codex-cli-hands-on/` (new directory to hold notes if needed)  
- Output: Findings summarized later in `docs/training/codex-cli-hands-on/repo-review-findings.md`

**Step 1: Gather evidence from README and key docs**
Review the [openai/codex docs](https://github.com/openai/codex/tree/main/docs), then skim `README.md`, `docs/getting-started.md`, `docs/config.md`.
Expected: Notes on CLI usage, exec mode, AGENTS, MCP, sandboxing.

**Step 2: Capture gaps and priorities**  
Draft bullet notes on missing training coverage (hands-on flows, PM heuristics, Jupyter).

**Step 3: Self-check**  
Ensure evidence ties to files/sections before moving on.

### Task 2: Design the training structure
**Files:**  
- Create: `docs/training/codex-cli-hands-on/README.md` (outline section)

**Step 1: Draft module outline**  
Write sections for: orientation, setup, CLI lab scripts, exec-mode automation, Jupyter integration guidance, PM playbook.

**Step 2: Validate objectives**  
Check that new-user track is hands-on and PM track has review heuristics.

**Step 3: Adjust for time-box**  
Keep modules scoped to 60–90 minute delivery with optional extensions.

### Task 3: Write the training modules
**Files:**  
- Create: `docs/training/codex-cli-hands-on/01-orientation.md`  
- Create: `docs/training/codex-cli-hands-on/02-setup.md`  
- Create: `docs/training/codex-cli-hands-on/03-cli-labs.md`  
- Create: `docs/training/codex-cli-hands-on/04-jupyter-lab.md`  
- Create: `docs/training/codex-cli-hands-on/05-pm-playbook.md`

**Step 1: Author orientation and setup**  
Include prerequisites, install, auth, resume, sandbox/approvals, MCP note.

**Step 2: Author CLI labs**  
Provide 3–4 progressive labs with commands, expected outcomes, and check steps.

**Step 3: Author Jupyter-focused exercise**  
Document how to drive Codex alongside notebooks (e.g., `codex exec` for data prep).

**Step 4: Author PM playbook**  
Add review heuristics, success criteria, and QA steps.

**Step 5: Quick proofread**  
Check clarity and accuracy; keep commands runnable.

### Task 4: Write findings report
**Files:**  
- Create: `docs/training/codex-cli-hands-on/repo-review-findings.md`

**Step 1: Summarize target vs current**  
Apply gap-analysis: targets, evidence, deltas.

**Step 2: List top gaps and actions**  
Prioritize with impact/confidence/effort; propose actions mapped to training modules.

**Step 3: Review completeness**  
Confirm report references upstream files/sections for evidence.
