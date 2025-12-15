# CLI Hands-on Labs

Use a disposable repo. Keep approvals visible so learners see the safety loop. Each lab lists a goal, steps, and checks.

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

Debrief prompts (facilitator):
- What approvals were requested? Were they necessary?
- What signals show Codex understood the workspace (paths, git state)?
- How would you tighten execpolicy for these labs?
