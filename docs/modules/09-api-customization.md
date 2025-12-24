# Module 9: API Customization & Extensions

## Overview

Codex is highly customizable. This module teaches you how to configure Codex for your workflow, set project-specific instructions, use hooks for automation, and extend capabilities with MCP servers.

**Learning Objectives**:
- Configure Codex with AGENTS.md for project-specific behavior
- Manage settings and permissions
- Use hooks to automate pre/post actions
- Extend Codex with MCP servers for external tools

**Time**: 2-3 hours

---

## 1. AGENTS.md - Project Instructions

AGENTS.md is a markdown file that Codex reads at the start of every conversation. Use it to give Codex context about your project, coding standards, and team conventions.

### Where to Put It

| Location | Scope | Use Case |
|----------|-------|----------|
| `./AGENTS.md` | Current project | Project-specific instructions |
| `~/.codex/AGENTS.md` | All projects | Personal preferences, global conventions |

Project instructions live in `./AGENTS.md`. Global instructions live in `~/.codex/AGENTS.md`. Codex combines both, and project instructions take precedence.

### What to Include

```markdown
# AGENTS.md

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

### Example: Team AGENTS.md

```markdown
# AGENTS.md - Acme Corp Standards

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

### Tips for Effective AGENTS.md

1. **Keep it focused** - Include what Codex needs to know, not everything about the project
2. **Update it** - As conventions change, update AGENTS.md
3. **Be specific** - "Use camelCase" is better than "follow best practices"
4. **Include examples** - Show the pattern you want, not just describe it

---

## 2. Configuration & Permissions

Codex configuration is managed through `~/.codex/config.toml` and runtime flags, while AGENTS.md provides project instructions and context.

### Configuration Location

```
~/.codex/
├── config.toml         # CLI configuration (approval policy, sandbox, profiles)
├── AGENTS.md           # Global instructions (no permissions)
└── skills/             # Custom skills (optional, see Module 2)
```

### Permission Management

Codex asks for permission before potentially destructive actions based on its approval policy (`--ask-for-approval`) and sandbox mode (`--sandbox`). Use CLI flags or config values for permission behavior; AGENTS.md should focus on instructions and context, not approval settings.

> **Note**: AGENTS.md provides instructions and context only. Approvals and sandbox settings must be configured via CLI flags or `~/.codex/config.toml`.

> **Note**: For the most current configuration options, run `codex --help` and check the repository documentation.

Verified with Codex CLI v0.77.0.

### Project-Level Configuration

You can create project-specific AGENTS.md files to customize Codex behavior per project:

```
project-root/
├── AGENTS.md           # Project-specific instructions (read by Codex)
└── src/
```

The project-level `AGENTS.md` is automatically combined with your global `~/.codex/AGENTS.md`, with project instructions taking precedence.

---

## 3. Automation with Git Hooks & CI

While Codex CLI handles tool execution internally, you can automate quality checks and workflows using standard development tools: Git hooks, CI pipelines, and shell scripts.

### Git Hooks with Husky

Use Git hooks to run checks before commits:

```bash
# Install husky and lint-staged
npm install --save-dev husky lint-staged

# Initialize husky
npx husky init

# Create pre-commit hook
echo 'npx lint-staged' > .husky/pre-commit
```

Example `package.json` snippet:
```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["prettier --write", "eslint --fix"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

### CI/CD Pipelines

Automate checks on every push with GitHub Actions:

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
```

### Pre-Commit Checks

Create a pre-commit hook to validate code before committing:

```bash
#!/bin/bash
# .husky/pre-commit

# Run tests
npm test || exit 1

# Run linter
npm run lint || exit 1

# Run type check
npm run typecheck || exit 1

echo "✅ All checks passed"
```

### Shell Scripts for Workflows

Create reusable scripts for common Codex workflows:

```bash
#!/bin/bash
# scripts/codex-review.sh
# Run Codex review and format output

echo "🔍 Running code review..."
codex "Review my staged changes for bugs and security issues" \
  | tee review-output.txt

echo ""
echo "Review saved to review-output.txt"
```

```bash
#!/bin/bash
# scripts/pre-pr-check.sh
# Run before creating a PR

echo "🔍 Running pre-PR checks..."

npm test || { echo "❌ Tests failed"; exit 1; }
npm run lint || { echo "❌ Lint failed"; exit 1; }
npm run typecheck || { echo "❌ Type check failed"; exit 1; }

# Check for debug code
if grep -r "console.log\|debugger" src/; then
  echo "⚠️  Found debug code"
fi

echo "✅ All checks passed - ready for PR"
```

---

## 4. MCP Servers

MCP (Model Context Protocol) servers extend Codex with new capabilities by connecting to external tools and services.

### What MCP Servers Do

```
┌─────────────────────────────────────────────────────────┐
│                     Codex                          │
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

MCP servers give Codex new tools:
- **Database MCP**: Query databases directly
- **GitHub MCP**: Create issues, PRs, review code
- **Slack MCP**: Send messages, read channels
- **Browser MCP**: Navigate web pages, extract content
- **File System MCP**: Access files outside the project

### Installing MCP Servers

MCP servers are configured in `~/.codex/config.toml`:

```toml
[mcp_servers.github]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]
env_vars = ["GITHUB_TOKEN"]
startup_timeout_sec = 20

[mcp_servers.postgres]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-postgres"]
env_vars = ["DATABASE_URL"]
startup_timeout_sec = 20
```

**Configuration options:**

| Field | Description |
|-------|-------------|
| `command` | Executable to run |
| `args` | Command-line arguments |
| `cwd` | Working directory (optional) |
| `env_vars` | Environment variables to pass through |
| `startup_timeout_sec` | Timeout for server startup |

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

Codex: I'll use the postgres MCP to query your database.

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

Codex: I'll create a GitHub issue using the GitHub MCP.

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

Then register it in `~/.codex/config.toml`:

```toml
[mcp_servers.my-company]
command = "node"
args = ["dist/index.js"]
cwd = "/path/to/my-company-mcp"
startup_timeout_sec = 20
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

1. **AGENTS.md**: Project-specific instructions that shape every conversation
2. **Settings**: Control permissions and behavior at user and project level
3. **Git Hooks & CI**: Automate quality checks with standard development tools
4. **MCP Servers**: Extend Codex with external tools and services

---

## Next Steps

1. Create an AGENTS.md for your current project
2. Set up Git hooks with husky/lint-staged to auto-format code
3. Install one MCP server (GitHub is a good start)
4. Proceed to the [Module 9 exercises](../exercises/09-api-customization/README.md)
