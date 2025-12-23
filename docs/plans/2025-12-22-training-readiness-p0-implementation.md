# Training Readiness P0 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update P0 documentation to match Codex CLI v0.77.0 command/flag behavior and correct AGENTS.md permission/config guidance.

**Architecture:** Documentation-only changes with verified CLI references; update version pins, command examples, and AGENTS.md guidance without altering repo structure.

**Tech Stack:** Markdown docs, Codex CLI (`codex --help`, `codex --version`).

### Task 1: Update CLI commands/flags/version in Module 1

**Files:**
- Modify: `docs/modules/01-getting-started.md`

**Step 1: Find existing CLI examples and version pins**

Run: `rg -n "codex" docs/modules/01-getting-started.md`

Expected: Lines containing `codex auth login`, `codex --version`, command/flag examples, and "Verified with Codex CLI v0.76.0."

**Step 2: Update authentication and version examples**

Change:
```bash
codex auth login
```
To:
```bash
codex login
```

Change:
```bash
codex --version
# Should show: OpenAI Codex v0.7x.x
```
To:
```bash
codex --version
# Should show: codex-cli 0.77.0
```

**Step 3: Replace unverified model IDs with placeholders**

Change:
```bash
codex --model gpt-5.1-codex-max # Specific model
```
To:
```bash
codex --model <model-id>        # Specific model
```

Change:
```toml
model = "gpt-5.1-codex-max"
```
To:
```toml
model = "<model-id>"
```

**Step 4: Update version pins**

Change all instances of:
```
Verified with Codex CLI v0.76.0.
```
To:
```
Verified with Codex CLI v0.77.0.
```

**Step 5: Verify CLI references**

Run: `codex --help`

Expected: `login`, `exec`, `resume`, `review`, `apply`, `--ask-for-approval`, `--sandbox`, `--profile`, `--model` appear.

Run: `codex --version`

Expected: `codex-cli 0.77.0`

**Step 6: Commit**

```bash
git add docs/modules/01-getting-started.md
git commit -m "docs: align module 1 CLI examples with v0.77.0"
```

### Task 2: Update CLI version pins in README + GETTING_STARTED

**Files:**
- Modify: `README.md`
- Modify: `GETTING_STARTED.md`

**Step 1: Update README version pin**

Change:
```
Verified with Codex CLI v0.76.0.
```
To:
```
Verified with Codex CLI v0.77.0.
```

**Step 2: Update GETTING_STARTED version pin**

Change:
```
Verified with Codex CLI v0.76.0.
```
To:
```
Verified with Codex CLI v0.77.0.
```

**Step 3: Verify no other CLI version pins in scope**

Run: `rg -n "Verified with Codex CLI" README.md GETTING_STARTED.md`

Expected: Only v0.77.0 references remain.

**Step 4: Commit**

```bash
git add README.md GETTING_STARTED.md
git commit -m "docs: bump CLI verification to v0.77.0"
```

### Task 3: Correct AGENTS.md permissions/config guidance

**Files:**
- Modify: `docs/modules/09-api-customization.md`
- Modify: `docs/exercises/02-skills/exercise-1.md`

**Step 1: Update configuration location block**

Replace the block under "Configuration Location" with:
```
~/.codex/
├── config.toml         # CLI configuration (approval policy, sandbox, profiles)
├── AGENTS.md           # Global instructions (no permissions)
└── skills/             # Custom skills (optional, see Module 2)
```

**Step 2: Add explicit permissions note**

Add a short note after the "Permission Management" paragraph:

```
> **Note**: AGENTS.md provides instructions and context only. Approvals and sandbox settings must be configured via CLI flags or `~/.codex/config.toml`.
```

**Step 3: Update AGENTS precedence wording**

Ensure the project-level AGENTS description reads:
```
The project-level `AGENTS.md` is combined with your global `~/.codex/AGENTS.md`, with project instructions taking precedence.
```

**Step 4: Update exercise guidance**

In `docs/exercises/02-skills/exercise-1.md`, add a sentence under "Configure AGENTS.md":

```
AGENTS.md is for instructions and context only; configure permissions with CLI flags or `~/.codex/config.toml`.
```

**Step 5: Update version pins**

Change any:
```
Verified with Codex CLI v0.76.0.
```
To:
```
Verified with Codex CLI v0.77.0.
```

**Step 6: Verify guidance**

Run: `rg -n "AGENTS.md" docs/modules/09-api-customization.md docs/exercises/02-skills/exercise-1.md`

Expected: No claim that AGENTS grants permissions or stores approval trust.

**Step 7: Commit**

```bash
git add docs/modules/09-api-customization.md docs/exercises/02-skills/exercise-1.md
git commit -m "docs: clarify AGENTS guidance and permissions"
```
