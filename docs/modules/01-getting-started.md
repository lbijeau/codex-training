# Module 1: Getting Started with Codex CLI

## Overview

This module gets you productive with Codex CLI in under an hour. You'll install the CLI, run your first real task, understand the safety model, and be ready to learn skills in Module 2.

**Learning Objectives**:
- Install Codex CLI and verify it works
- Complete a real task using the interactive TUI
- Understand the approval and sandbox model
- Know the essential commands and options
- See why skills matter (preview of Module 2)

**Time**: 45-60 minutes

**Prerequisites**: Terminal access, Git installed

---

## What is Codex CLI?

Codex CLI is a terminal-based AI assistant that can read your code, make changes, and run commands—with your approval. Unlike chat interfaces, Codex works directly in your codebase.

```
┌─────────────────────────────────────────────────────────────┐
│  You: "Add input validation to the login form"              │
├─────────────────────────────────────────────────────────────┤
│  Codex reads your code                                       │
│  Codex proposes changes                                      │
│  You approve or reject                                       │
│  Changes applied to your files                               │
└─────────────────────────────────────────────────────────────┘
```

**Key difference from ChatGPT/Claude web**: Codex has direct access to your filesystem and can execute commands. That's powerful—and why it has a safety model.

---

## Installing Codex CLI

### Step 1: Install

```bash
# macOS/Linux
curl -fsSL https://codex.openai.com/install.sh | bash

# Or via npm
npm install -g @openai/codex
```

### Step 2: Authenticate

```bash
codex auth login
# Follow the browser prompts
```

### Step 3: Verify

```bash
codex --version
# Should show: OpenAI Codex v0.7x.x
```

---

## Your First Task

Don't just run "hello world"—let's do something real.

### Start a Session

Navigate to any project with code:

```bash
cd ~/your-project
codex
```

You'll see the TUI (text user interface) with a prompt.

### Ask for Something Concrete

Try one of these:

```
> Summarize what this project does based on the README and package.json

> Find all TODO comments in the codebase

> What's the main entry point and how does it work?
```

Codex will read files, analyze them, and respond. **You haven't changed anything yet**—this is safe exploration.

### Make a Small Change

Now try something that modifies code:

```
> Add a comment at the top of README.md with today's date
```

Codex will:
1. Show you the proposed change
2. Ask for approval
3. Apply it only after you approve

**This is the core loop**: Codex proposes → You review → You approve/reject.

---

## The Safety Model

Codex can read files and run commands, so it has guardrails.

### Approval Modes

| Mode | What Happens | When to Use |
|------|--------------|-------------|
| `suggest` (default) | Asks before writes/commands | Normal work |
| `always` | Asks before everything | Learning, sensitive repos |
| `never` | No approvals | Trusted automation only |

Start with `suggest` or `always`. Avoid `never` until you trust your setup.

### Sandbox Modes

| Mode | File Access | Use Case |
|------|-------------|----------|
| `read-only` | Can only read | Exploration, code review |
| `workspace-write` | Writes to project + /tmp | Default, recommended |
| `danger-full-access` | Full system | Avoid unless necessary |

### Example: Safe Exploration

```bash
codex --sandbox read-only
# Now Codex can analyze but not modify anything
```

---

## Essential Commands

### Starting Sessions

```bash
codex                           # Interactive TUI in current directory
codex --cd ~/other-project      # Start in different directory
codex resume --last             # Continue last session
codex exec "prompt"             # Non-interactive, single response
```

### Inside the TUI

| Command | What it Does |
|---------|--------------|
| `/status` | Show current settings |
| `/diff` | See pending changes |
| `/undo` | Revert last change |
| `/compact` | Summarize context (saves tokens) |
| `/clear` | Clear conversation |
| `/help` | List all commands |

### Useful Flags

```bash
codex -a untrusted              # Require approval for untrusted commands
codex --sandbox read-only       # Read-only mode
codex --model gpt-5.1-codex-max # Specific model
codex --profile safe            # Use a saved profile
```

---

## Configuration

Save your preferences in `~/.codex/config.toml`:

```toml
model = "gpt-5.1-codex-max"
approval = "suggest"

[profiles.safe]
approval = "always"
sandbox = "read-only"

[profiles.auto]
approval = "never"
sandbox = "workspace-write"
```

Then use: `codex --profile safe`

---

## From Commands to Mastery

You now know how to run Codex and make changes safely. But there's a difference between *using* Codex and *mastering* it.

**The leap**: Instead of improvising prompts, experts use **skills**—packaged workflows that encode proven techniques.

### Quick Example

**Without skills** (ad-hoc):
```
You: "Tests are failing, help me fix them"
Codex: [guesses at a fix]
You: "That didn't work"
Codex: [guesses again]
# 30 minutes of trial and error
```

**With skills** (systematic):
```
You: "Tests are failing. Use superpowers:systematic-debugging"
Codex: [follows proven 4-phase framework]
# Problem solved methodically
```

Skills turn guessing into process.

### What's Ahead

| Module | What You'll Learn |
|--------|-------------------|
| **2. Skills** | Install and use skill libraries |
| **3. Speed** | Parallel execution, efficiency patterns |
| **4. Planning** | Break down complex work |
| **5. Quality** | Verification and testing patterns |
| **6. Domain** | Refactoring, legacy code, security |
| **7. Integration** | GitHub CLI, CI/CD workflows |

---

## Next Steps

1. **Try it**: Spend 15 minutes using Codex on a real task
2. **Explore**: Run `/help` to see all TUI commands
3. **Continue**: [Module 2: Skills & Reusable Workflows](02-skills.md)

API-focused content (internals, custom integrations) is in Modules 8-9 for when you need it.

---

## Quick Reference

### Commands
```bash
codex                    # Start interactive session
codex exec "prompt"      # Non-interactive
codex resume --last      # Continue last session
codex resume             # Pick from recent sessions
```

### Safety Flags
```bash
-a on-request            # Require approval before actions
--full-auto              # Alias for -a on-request + --sandbox workspace-write
--sandbox read-only      # Can't write files
--sandbox workspace-write # Write to project (default)
```

### TUI Commands
```
/status  /diff  /undo  /compact  /clear  /help
```
