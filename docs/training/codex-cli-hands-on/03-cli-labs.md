# CLI Hands-on Labs

Use a disposable repo. Keep approvals visible so learners see the safety loop. Each lab lists a goal, steps, and checks.

> **Note:** Running inside a Git repository is recommended for change tracking. Use `git init` to initialize, or `--skip-git-repo-check` to run outside a repo.

## Lab 1: Orientation Prompt (interactive TUI)
Goal: Verify Codex can read files and respond with context.  
Steps:  
1) From the repo root: `codex "list the files in this repo and propose one safe change that adds value"`  
2) Approve the read-only commands (e.g., `ls`). Decline any write commands.  
Checks:  
- Codex reports workdir and sandbox roots.  
- Response includes file list and a suggested change; no edits made.

## Lab 2: Guided Edit with Approval
Goal: Let Codex make a small change with approvals.  
Steps:  
1) Choose a trivial file (e.g., `hello.py` or `README.md`).  
2) Run `codex --ask-for-approval "update hello.py to print a greeting and add a short comment explaining the script"`  
3) Approve the edit to the target file; review the diff Codex shows.  
4) If satisfied, approve write; otherwise request a revision.  
Checks:  
- Codex requests approval before writing.  
- Diff is minimal and correct; file updates as expected.

## Lab 3: Resume Flow
Goal: Show session continuity.  
Steps:  
1) Start a session and perform a quick command (e.g., `codex "summarize hello.py"`).  
2) Exit with `Ctrl+C`.  
3) Resume: `codex resume --last`.  
4) Ask: `codex "continue the previous task by adding a CLI flag --name to hello.py"`  
Checks:  
- Session metadata shows the original workdir.  
- Codex recalls prior context and proposes the flag change; approves edits as needed.

## Lab 4: Automation with `codex exec`
Goal: Use non-interactive mode for scripted tasks.  
Steps:  
1) Run: `codex exec "add a unit test for hello.py that asserts the greeting contains Hello"`  
2) Approve any writes to `test_hello.py` (or equivalent) when prompted by the CLI.  
3) If tests are runnable, ask Codex to include a `pytest` command; optionally run it yourself.  
Checks:  
- Output shows planned commands; writes are explicit.  
- Test file appears and assertions match the behavior.  
- Optional: `pytest -q` passes.

## Lab 5: Multi-directory exposure (optional)
Goal: Demonstrate `--add-dir` for multi-repo work.
Steps:
1) From a parent directory: `codex --cd frontend --add-dir ../backend "list shared interfaces we might align"`
2) Approve read access; decline writes.
Checks:
- Codex lists both roots; suggestions reference both directories.
- No writes occur unless explicitly approved.

## Lab 6: Saving and Reusing Context
Goal: Learn to persist context between sessions using files.
Steps:
1) Start a session exploring a topic:
   ```bash
   codex "Explore hello.py and explain what it does, how it handles errors, and what could be improved"
   ```
2) Save the learnings to a file:
   ```bash
   codex exec "Summarize what we learned about hello.py in 3 bullet points" > context.txt
   ```
3) Verify the summary:
   ```bash
   cat context.txt
   ```
4) Start a NEW session using that context:
   ```bash
   codex "Previous context:
   $(cat context.txt)

   Now add input validation based on the improvements you suggested."
   ```
Checks:
- `context.txt` contains a concise summary (not the full conversation).
- The new session understands the prior analysis without re-exploring.
- Codex builds on the previous suggestions.

**Why this matters:**
- Sessions don't share memory — each `codex` command starts fresh
- Saving summaries lets you continue work across sessions
- Keeps context small (summary vs. full transcript)
- Useful for long-running tasks split across days

**Pro tip:** Create a `contexts/` directory for larger projects:
```bash
mkdir -p contexts/
codex exec "Summarize the auth system architecture" > contexts/auth.md
codex exec "Summarize the API endpoints" > contexts/api.md

# Later, start with combined context:
codex "Context:
$(cat contexts/auth.md)
$(cat contexts/api.md)

Now add rate limiting to the login endpoint."
```

Debrief prompts (facilitator):
- What approvals were requested? Were they necessary?
- What signals show Codex understood the workspace (paths, git state)?
- How would you tighten execpolicy for these labs?
