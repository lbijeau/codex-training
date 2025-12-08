# Exercise 4: Designing Session Hooks and Scripts

## Objective

Build the lightweight scripts you run before or after a Codex session to inject context, log actions, or validate outputs. Think of them as the hooks you can control without relying on a Claude-style `.codex/config` file.

## Part A: Session Start Script

**Task**: Create a script (`scripts/session_start.sh` or `.py`) that you run before each Codex request to capture the current project status.

1. The script should:
   - Print the current git status (`git status -sb`)
   - Display the last few commit messages
   - Output the path of the most recently modified file
2. Run the script and capture its output in a `session_start.log` file.
3. Add the output to your session by copying/pasting it at the top of your prompt or summarizing it for Codex.

**Questions**:
- How does seeing the git status upfront change how you frame the user prompt?
- What else might you want the start script to report?

## Part B: Validation Script

**Task**: Build a validation script that reviews Codex's proposed file edits before you apply them.

1. When Codex replies with a plan or diff, copy the changed lines into `scripts/validate_ranges.py`. The script should:
   - Check that no lines start with `rm -rf`
   - Reject any modifications under `/etc` or `/bin`
   - Return a clear message if a dangerous change is detected
2. Run the script on sample diffs and note any warnings.

**Questions**:
- What would you log when the script detects a dangerous operation?
- How could you integrate this validation into your workflow (e.g., run after every Codex edit)?

## Part C: Post-Session Logger

**Task**: Create a script that runs after a Codex session to capture what happened.

1. Write `scripts/post_session_logger.sh` that:
   - Saves the timestamp, model name, and user prompt to `logs/session_history.log`
   - Records which helper functions were invoked (if you track them manually)
2. Run a Codex session, manually call the logger afterwards, and inspect the log.
3. Use the log to answer:
   - Did Codex follow your constraints?
   - Which helper functions received the most dangerous inputs?

## Part D: Hook Patterns Discussion

Answer these questions:
1. What criteria should determine when a pre-session script runs vs a post-session script?
2. How do these scripts replace the idea of “hooks” from Claude Code?
3. What safeguards can you add so scripts themselves don’t leak secrets?
