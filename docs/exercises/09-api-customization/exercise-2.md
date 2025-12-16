# Exercise 2: Build Hooks for Automation

## Objective

Learn to create hooks that automate pre and post actions in your Codex workflow.

## Background

Hooks are scripts that run automatically at specific points in Codex's workflow. They let you inject context, validate actions, log activity, and automate follow-up tasks.

## Part A: Create a Pre-Tool Hook

**Task**: Build a hook that runs before tool execution.

1. Create the hooks directory:
   ```bash
   mkdir -p .codex/hooks
   ```

2. Create a logging hook:
   ```bash
   #!/bin/bash
   # .codex/hooks/pre-tool-use.sh
   # Logs all tool usage to a file

   TOOL_NAME="$1"
   TOOL_ARGS="$2"
   TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

   # Create log directory if needed
   mkdir -p .codex/logs

   # Log the tool usage
   echo "$TIMESTAMP | PRE  | $TOOL_NAME | $TOOL_ARGS" >> .codex/logs/tool-usage.log

   # Exit 0 to allow the tool to proceed
   exit 0
   ```

3. Make it executable:
   ```bash
   chmod +x .codex/hooks/pre-tool-use.sh
   ```

4. Test the hook:
   - Ask Codex to read a file
   - Check `.codex/logs/tool-usage.log`
   - Verify the log entry was created

## Part B: Create a Blocking Hook

**Task**: Build a hook that blocks dangerous operations.

1. Create a safety hook:
   ```bash
   #!/bin/bash
   # .codex/hooks/pre-tool-use.sh
   # Block dangerous bash commands

   TOOL_NAME="$1"
   TOOL_ARGS="$2"

   # Only check Bash tool
   if [[ "$TOOL_NAME" != "Bash" ]]; then
       exit 0
   fi

   # Dangerous patterns to block
   DANGEROUS_PATTERNS=(
       "rm -rf /"
       "rm -rf ~"
       "rm -rf /home"
       "> /dev/sda"
       "mkfs"
       "dd if="
       ":(){:|:&};:"
   )

   for pattern in "${DANGEROUS_PATTERNS[@]}"; do
       if echo "$TOOL_ARGS" | grep -qF "$pattern"; then
           echo "BLOCKED: Refusing to run dangerous command: $pattern"
           exit 1
       fi
   done

   # Check for rm on protected directories
   if echo "$TOOL_ARGS" | grep -qE "rm\s+(-[rf]+\s+)?(node_modules|\.git|dist)/?\s*$"; then
       echo "WARNING: Removing important directory. Proceeding with caution."
   fi

   exit 0
   ```

2. Add file protection:
   ```bash
   # Add to pre-tool-use.sh

   # Protected files that shouldn't be modified
   PROTECTED_FILES=(
       ".env"
       ".env.production"
       "package-lock.json"
       "yarn.lock"
   )

   if [[ "$TOOL_NAME" == "Write" || "$TOOL_NAME" == "Edit" ]]; then
       for protected in "${PROTECTED_FILES[@]}"; do
           if echo "$TOOL_ARGS" | grep -qF "$protected"; then
               echo "BLOCKED: Cannot modify protected file: $protected"
               exit 1
           fi
       done
   fi
   ```

## Part C: Create a Post-Tool Hook

**Task**: Build a hook that runs after tool execution.

1. Create an auto-format hook:
   ```bash
   #!/bin/bash
   # .codex/hooks/post-tool-use.sh
   # Run prettier after file edits

   TOOL_NAME="$1"
   FILE_PATH="$2"
   EXIT_CODE="$3"

   # Only act on successful Edit/Write operations
   if [[ "$EXIT_CODE" != "0" ]]; then
       exit 0
   fi

   if [[ "$TOOL_NAME" != "Edit" && "$TOOL_NAME" != "Write" ]]; then
       exit 0
   fi

   # Only format supported file types
   case "$FILE_PATH" in
       *.ts|*.tsx|*.js|*.jsx|*.json|*.css|*.scss|*.md)
           echo "Auto-formatting: $FILE_PATH"
           npx prettier --write "$FILE_PATH" 2>/dev/null
           ;;
   esac

   exit 0
   ```

2. Create a test-runner hook:
   ```bash
   #!/bin/bash
   # .codex/hooks/post-tool-use.sh
   # Run related tests after file changes

   TOOL_NAME="$1"
   FILE_PATH="$2"

   if [[ "$TOOL_NAME" != "Edit" && "$TOOL_NAME" != "Write" ]]; then
       exit 0
   fi

   # Only run tests for source files
   if [[ "$FILE_PATH" != src/* ]]; then
       exit 0
   fi

   # Find related test file
   TEST_FILE="${FILE_PATH%.ts}.test.ts"
   TEST_FILE="${TEST_FILE/src\//tests\/}"

   if [[ -f "$TEST_FILE" ]]; then
       echo "Running related tests: $TEST_FILE"
       npm test -- "$TEST_FILE" --silent 2>/dev/null
       if [[ $? -ne 0 ]]; then
           echo "⚠️  Tests failed after editing $FILE_PATH"
       fi
   fi

   exit 0
   ```

## Part D: Create a Session Hook

**Task**: Build hooks for session start and end.

1. Create a session start script:
   ```bash
   #!/bin/bash
   # .codex/hooks/session-start.sh
   # Gather context at session start

   echo "=== Session Context ==="
   echo ""

   # Git status
   echo "## Git Status"
   echo "Branch: $(git branch --show-current)"
   echo "Status:"
   git status --short

   echo ""
   echo "## Recent Changes"
   git log --oneline -5

   echo ""
   echo "## Open TODOs"
   grep -r "TODO" --include="*.ts" --include="*.js" src/ 2>/dev/null | wc -l | xargs echo "Found TODOs:"

   echo ""
   echo "## Test Status"
   npm test --silent 2>&1 | tail -3

   echo ""
   echo "=== Ready to work ==="
   ```

2. Create a session end script:
   ```bash
   #!/bin/bash
   # .codex/hooks/session-end.sh
   # Clean up and summarize after session

   echo "=== Session Summary ==="
   echo ""

   # Show what changed
   echo "## Changes Made"
   git diff --stat

   echo ""
   echo "## Files Modified"
   git status --short

   echo ""
   echo "## Tool Usage Summary"
   if [[ -f .codex/logs/tool-usage.log ]]; then
       echo "Tools used this session:"
       tail -20 .codex/logs/tool-usage.log | awk -F'|' '{print $3}' | sort | uniq -c | sort -rn
   fi

   echo ""
   echo "## Next Steps"
   echo "- [ ] Review changes: git diff"
   echo "- [ ] Run tests: npm test"
   echo "- [ ] Commit if ready: git add . && git commit -m '...'"
   ```

3. Make scripts executable:
   ```bash
   chmod +x .codex/hooks/session-*.sh
   ```

---

## Hints

<details>
<summary>Hint 1: Hook execution</summary>

Hooks receive arguments:
- `$1` - Tool name (Read, Write, Edit, Bash, etc.)
- `$2` - Tool arguments (file path, command, etc.)
- `$3` - Exit code (for post-tool hooks)

Exit codes:
- `exit 0` - Allow operation to proceed
- `exit 1` - Block the operation
</details>

<details>
<summary>Hint 2: Testing hooks</summary>

Test hooks without Codex:
```bash
# Test pre-tool hook
./codex/hooks/pre-tool-use.sh "Bash" "rm -rf /"
echo "Exit code: $?"

# Test post-tool hook
./.codex/hooks/post-tool-use.sh "Edit" "src/index.ts" "0"
```
</details>

<details>
<summary>Hint 3: Debugging hooks</summary>

Add debug output:
```bash
# At the top of your hook
exec 2>> .codex/logs/hook-debug.log
set -x  # Enable debug mode

# Your hook code...

set +x  # Disable debug mode
```
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Complete Hook Setup

```
.codex/
├── hooks/
│   ├── pre-tool-use.sh      # Validate and log before execution
│   ├── post-tool-use.sh     # Format and test after execution
│   ├── session-start.sh     # Gather context at session start
│   └── session-end.sh       # Summarize at session end
└── logs/
    ├── tool-usage.log       # All tool usage
    └── hook-debug.log       # Debug output
```

### Complete Pre-Tool Hook

```bash
#!/bin/bash
# .codex/hooks/pre-tool-use.sh

TOOL_NAME="$1"
TOOL_ARGS="$2"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Logging
mkdir -p .codex/logs
echo "$TIMESTAMP | PRE  | $TOOL_NAME | $TOOL_ARGS" >> .codex/logs/tool-usage.log

# Safety checks for Bash
if [[ "$TOOL_NAME" == "Bash" ]]; then
    # Block dangerous commands
    if echo "$TOOL_ARGS" | grep -qE "rm\s+-rf\s+(/|~|/home)"; then
        echo "BLOCKED: Dangerous rm command"
        exit 1
    fi

    # Block fork bombs
    if echo "$TOOL_ARGS" | grep -qF ":(){:|:&};:"; then
        echo "BLOCKED: Fork bomb detected"
        exit 1
    fi
fi

# Protect sensitive files
PROTECTED=(".env" ".env.local" ".env.production" "secrets.json")
if [[ "$TOOL_NAME" == "Write" || "$TOOL_NAME" == "Edit" ]]; then
    for file in "${PROTECTED[@]}"; do
        if echo "$TOOL_ARGS" | grep -qF "$file"; then
            echo "BLOCKED: Cannot modify $file"
            exit 1
        fi
    done
fi

exit 0
```

### Complete Post-Tool Hook

```bash
#!/bin/bash
# .codex/hooks/post-tool-use.sh

TOOL_NAME="$1"
FILE_PATH="$2"
EXIT_CODE="${3:-0}"

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Log completion
echo "$TIMESTAMP | POST | $TOOL_NAME | $FILE_PATH | exit=$EXIT_CODE" >> .codex/logs/tool-usage.log

# Skip if tool failed
if [[ "$EXIT_CODE" != "0" ]]; then
    exit 0
fi

# Only act on file modifications
if [[ "$TOOL_NAME" != "Edit" && "$TOOL_NAME" != "Write" ]]; then
    exit 0
fi

# Auto-format TypeScript/JavaScript files
case "$FILE_PATH" in
    *.ts|*.tsx|*.js|*.jsx)
        if command -v npx &> /dev/null && [[ -f "package.json" ]]; then
            npx prettier --write "$FILE_PATH" 2>/dev/null
        fi
        ;;
esac

# Run related tests
if [[ "$FILE_PATH" == src/*.ts ]]; then
    TEST_FILE="${FILE_PATH/src\//tests\/}"
    TEST_FILE="${TEST_FILE%.ts}.test.ts"

    if [[ -f "$TEST_FILE" ]]; then
        npm test -- "$TEST_FILE" --silent 2>/dev/null
        TEST_RESULT=$?

        if [[ $TEST_RESULT -ne 0 ]]; then
            echo "⚠️  Related tests failed: $TEST_FILE"
        fi
    fi
fi

exit 0
```

### Key Insight

Hooks create a safety net around Codex operations:
- **Pre-hooks**: Prevent dangerous operations before they happen
- **Post-hooks**: Ensure quality after changes are made
- **Session hooks**: Provide context and summarization

### Hook Pattern

```
Session Start
     │
     ▼
┌─────────────────┐
│  Pre-Tool Hook  │ ──→ Block if dangerous
└────────┬────────┘
         ▼
┌─────────────────┐
│  Tool Execution │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Post-Tool Hook  │ ──→ Format, test, log
└────────┬────────┘
         ▼
    Session End
```

</details>

---

## Reflection Questions

1. What operations would you want to block in your workflow?
2. How do hooks improve your confidence in Codex's actions?
3. What automation would save you the most time?

---

**Next**: [Exercise 3: Configure MCP Servers](exercise-3.md)
