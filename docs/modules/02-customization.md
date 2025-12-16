# Module 2: Customization & Extensions

## Overview

Claude Code is highly customizable. This module teaches you how to configure Claude Code for your workflow, set project-specific instructions, use hooks for automation, and extend capabilities with MCP servers.

**Learning Objectives**:
- Configure Claude Code with CLAUDE.md for project-specific behavior
- Manage settings and permissions
- Use hooks to automate pre/post actions
- Extend Claude Code with MCP servers for external tools

**Time**: 2-3 hours

---

## 1. CLAUDE.md - Project Instructions

CLAUDE.md is a markdown file that Claude Code reads at the start of every conversation. Use it to give Claude context about your project, coding standards, and team conventions.

### Where to Put It

| Location | Scope | Use Case |
|----------|-------|----------|
| `./CLAUDE.md` | Current project | Project-specific instructions |
| `~/.claude/CLAUDE.md` | All projects | Personal preferences, global conventions |

Project-level CLAUDE.md takes precedence and is combined with your global one.

### What to Include

```markdown
# CLAUDE.md

## Project Overview
Brief description of what this project does.

## Tech Stack
- Node.js 20 + TypeScript
- PostgreSQL database
- Jest for testing

## Code Conventions
- Use functional components with hooks (no class components)
- Prefer named exports over default exports
- All functions must have JSDoc comments

## Common Commands
- `npm test` - Run tests
- `npm run lint` - Run linter
- `npm run build` - Build for production

## Important Files
- `src/config.ts` - All configuration
- `src/db/schema.ts` - Database schema
- `src/api/routes.ts` - API route definitions

## Things to Avoid
- Don't modify files in `vendor/`
- Don't commit `.env` files
- Don't use `any` type in TypeScript
```

### Example: Team CLAUDE.md

```markdown
# CLAUDE.md - Acme Corp Standards

## Git Workflow
- Branch naming: `feature/TICKET-123-description`
- Commit messages: `feat(scope): description` (conventional commits)
- Always rebase before merging

## Code Review Requirements
- All PRs need 2 approvals
- Tests must pass before merge
- No console.log in production code

## Security Rules
- Never hardcode secrets
- Use parameterized queries for all database access
- Validate all user input with Zod schemas

## Preferred Libraries
- HTTP client: axios (not fetch)
- Date handling: date-fns (not moment)
- Validation: zod
```

### Tips for Effective CLAUDE.md

1. **Keep it focused** - Include what Claude needs to know, not everything about the project
2. **Update it** - As conventions change, update CLAUDE.md
3. **Be specific** - "Use camelCase" is better than "follow best practices"
4. **Include examples** - Show the pattern you want, not just describe it

---

## 2. Settings & Configuration

Claude Code settings control behavior, permissions, and defaults.

### Settings Location

```
~/.claude/
├── settings.json      # User settings
├── CLAUDE.md          # Global instructions
└── skills/            # Custom skills
```

### Key Settings

```json
{
  "permissions": {
    "allow_file_write": true,
    "allow_bash": true,
    "allowed_tools": ["Read", "Write", "Edit", "Bash", "Glob", "Grep"]
  },
  "behavior": {
    "auto_compact": true,
    "verbose_errors": false
  }
}
```

### Permission Management

Claude Code asks for permission before potentially destructive actions. You can pre-approve certain operations:

```
You: "I trust you to edit files in src/ without asking"

Claude: I'll remember that. For this session, I won't ask before
editing files in the src/ directory.
```

Or set it in your CLAUDE.md:

```markdown
## Permissions
- Edit files in `src/` without confirmation
- Run `npm test` and `npm run lint` without confirmation
- Always ask before running `rm` commands
```

### Project-Level Settings

Create `.claude/settings.json` in your project root:

```json
{
  "context_files": [
    "docs/architecture.md",
    "docs/api-spec.md"
  ],
  "ignore_patterns": [
    "node_modules/**",
    "dist/**",
    "*.min.js"
  ]
}
```

---

## 3. Hooks

Hooks are scripts that run automatically at specific points in Claude Code's workflow. They let you inject context, validate actions, or log activity.

### Available Hooks

| Hook | When It Runs | Use Case |
|------|--------------|----------|
| `PreToolUse` | Before any tool executes | Validate, log, or modify tool calls |
| `PostToolUse` | After any tool completes | Log results, trigger follow-up actions |
| `Notification` | On specific events | Custom notifications |

### Hook Configuration

Create hooks in `.claude/hooks/`:

```
.claude/
└── hooks/
    ├── pre-tool-use.sh
    └── post-tool-use.sh
```

### Example: Pre-Tool Hook for Logging

```bash
#!/bin/bash
# .claude/hooks/pre-tool-use.sh
# Logs all tool usage to a file

TOOL_NAME="$1"
TOOL_ARGS="$2"

echo "$(date '+%Y-%m-%d %H:%M:%S') | Tool: $TOOL_NAME | Args: $TOOL_ARGS" >> .claude/tool-log.txt
```

### Example: Block Dangerous Commands

```bash
#!/bin/bash
# .claude/hooks/pre-tool-use.sh
# Block dangerous bash commands

TOOL_NAME="$1"
TOOL_ARGS="$2"

if [[ "$TOOL_NAME" == "Bash" ]]; then
  # Block rm -rf on important directories
  if echo "$TOOL_ARGS" | grep -qE "rm\s+-rf\s+(/|~|/home)"; then
    echo "BLOCKED: Refusing to run dangerous rm command"
    exit 1
  fi
fi
```

### Example: Auto-Format After Edits

```bash
#!/bin/bash
# .claude/hooks/post-tool-use.sh
# Run prettier after file edits

TOOL_NAME="$1"
FILE_PATH="$2"

if [[ "$TOOL_NAME" == "Edit" || "$TOOL_NAME" == "Write" ]]; then
  if [[ "$FILE_PATH" == *.ts || "$FILE_PATH" == *.tsx ]]; then
    npx prettier --write "$FILE_PATH" 2>/dev/null
  fi
fi
```

---

## 4. MCP Servers

MCP (Model Context Protocol) servers extend Claude Code with new capabilities by connecting to external tools and services.

### What MCP Servers Do

```
┌─────────────────────────────────────────────────────────┐
│                     Claude Code                          │
└─────────────────────────┬───────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │ Database │    │  GitHub  │    │  Slack   │
    │   MCP    │    │   MCP    │    │   MCP    │
    └──────────┘    └──────────┘    └──────────┘
          │               │               │
          ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │ Postgres │    │ GitHub   │    │  Slack   │
    │          │    │   API    │    │   API    │
    └──────────┘    └──────────┘    └──────────┘
```

MCP servers give Claude Code new tools:
- **Database MCP**: Query databases directly
- **GitHub MCP**: Create issues, PRs, review code
- **Slack MCP**: Send messages, read channels
- **Browser MCP**: Navigate web pages, extract content
- **File System MCP**: Access files outside the project

### Installing MCP Servers

MCP servers are configured in `~/.claude/mcp_servers.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    }
  }
}
```

### Common MCP Servers

| Server | What It Does | Install |
|--------|--------------|---------|
| `server-github` | GitHub API access | `npx @modelcontextprotocol/server-github` |
| `server-postgres` | PostgreSQL queries | `npx @modelcontextprotocol/server-postgres` |
| `server-slack` | Slack messaging | `npx @modelcontextprotocol/server-slack` |
| `server-filesystem` | Extended file access | `npx @modelcontextprotocol/server-filesystem` |
| `server-puppeteer` | Browser automation | `npx @modelcontextprotocol/server-puppeteer` |

### Using MCP Tools

Once configured, MCP tools appear as regular tools:

```
You: "Query the database for all users created this week"

Claude: I'll use the postgres MCP to query your database.

Running: SELECT * FROM users WHERE created_at > NOW() - INTERVAL '7 days'

Found 23 users created this week:
| id  | email              | created_at          |
|-----|-------------------|---------------------|
| 145 | alice@example.com | 2024-01-15 09:23:00 |
| 146 | bob@example.com   | 2024-01-15 14:45:00 |
...
```

### Example: GitHub MCP Workflow

```
You: "Create a GitHub issue for the bug we just found in authentication"

Claude: I'll create a GitHub issue using the GitHub MCP.

Creating issue in owner/repo:
- Title: "Authentication fails for users with special characters in email"
- Labels: bug, authentication
- Body: [detailed description based on our conversation]

Issue created: https://github.com/owner/repo/issues/234
```

### Creating Custom MCP Servers

For team-specific integrations, you can create custom MCP servers:

```typescript
// my-company-mcp/index.ts
import { Server } from "@modelcontextprotocol/sdk/server";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";

const server = new Server({
  name: "my-company-tools",
  version: "1.0.0"
}, {
  capabilities: {
    tools: {}
  }
});

// Define your custom tools
server.setRequestHandler("tools/list", async () => ({
  tools: [{
    name: "lookup_employee",
    description: "Look up employee by email",
    inputSchema: {
      type: "object",
      properties: {
        email: { type: "string" }
      },
      required: ["email"]
    }
  }]
}));

server.setRequestHandler("tools/call", async (request) => {
  if (request.params.name === "lookup_employee") {
    // Call your internal API
    const employee = await fetchEmployee(request.params.arguments.email);
    return { content: [{ type: "text", text: JSON.stringify(employee) }] };
  }
});

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);
```

Then register it:

```json
{
  "mcpServers": {
    "my-company": {
      "command": "node",
      "args": ["./my-company-mcp/index.js"]
    }
  }
}
```

### MCP Security Considerations

| Consideration | Recommendation |
|---------------|----------------|
| API keys | Store in environment variables, never in config files |
| Database access | Use read-only credentials when possible |
| Scope | Only enable MCP servers you actually need |
| Audit | Log MCP tool usage for compliance |

---

## Key Takeaways

1. **CLAUDE.md**: Project-specific instructions that shape every conversation
2. **Settings**: Control permissions and behavior at user and project level
3. **Hooks**: Automate pre/post actions for consistency and safety
4. **MCP Servers**: Extend Claude Code with external tools and services

---

## Next Steps

1. Create a CLAUDE.md for your current project
2. Set up a hook to auto-format code after edits
3. Install one MCP server (GitHub is a good start)
4. Proceed to [Module 3: Skills](03-skills.md)
