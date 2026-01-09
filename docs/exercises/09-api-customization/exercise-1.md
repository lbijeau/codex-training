# Exercise 1: Create AGENTS.md & Config

## Objective

Learn to configure Codex for your project using AGENTS.md and config defaults.

## Background

AGENTS.md is a markdown file that Codex reads at the start of every conversation. Combined with config defaults and CLI flags, it shapes how Codex behaves in your specific project context.

## Part A: Create Project AGENTS.md

**Task**: Write an AGENTS.md file for your current project.

1. Create the file:
   ```bash
   touch AGENTS.md
   ```

2. Write your project overview:
   ```markdown
   # AGENTS.md

   ## Project Overview
   [Describe what this project does in 2-3 sentences]

   ## Tech Stack
   - Language: [Primary language and version]
   - Framework: [Framework if applicable]
   - Database: [Database if applicable]
   - Testing: [Test framework]

   ## Code Conventions
   - [Convention 1: e.g., "Use functional components, no classes"]
   - [Convention 2: e.g., "Prefer named exports over default exports"]
   - [Convention 3: e.g., "All functions must have JSDoc comments"]
   ```

3. Add common commands:
   ```markdown
   ## Common Commands
   - `npm test` - Run the test suite
   - `npm run lint` - Run linter
   - `npm run build` - Build for production
   - `npm run dev` - Start development server
   ```

4. Document important files:
   ```markdown
   ## Important Files
   - `src/config.ts` - All configuration
   - `src/db/schema.ts` - Database schema
   - `src/api/routes.ts` - API route definitions
   - `tests/fixtures/` - Test data

   ## Things to Avoid
   - Don't modify files in `vendor/` or `node_modules/`
   - Don't commit `.env` files
   - Don't use `any` type in TypeScript
   - Don't use console.log in production code
   ```

## Part B: Create Team Standards

**Task**: Document team-specific conventions.

1. Add git workflow section:
   ```markdown
   ## Git Workflow
   - Branch naming: `feature/TICKET-123-description`
   - Commit messages: `feat(scope): description` (conventional commits)
   - Always rebase before merging
   - Squash commits on merge
   ```

2. Add code review requirements:
   ```markdown
   ## Code Review Requirements
   - All PRs need at least 1 approval
   - Tests must pass before merge
   - Linter must pass
   - No TODO comments without issue numbers
   ```

3. Add security rules:
   ```markdown
   ## Security Rules
   - Never hardcode secrets
   - Use parameterized queries for all database access
   - Validate all user input with schema validation
   - No eval() or Function() constructor
   ```

4. Document preferred libraries:
   ```markdown
   ## Preferred Libraries
   When you need to add functionality, prefer these:
   - HTTP client: axios (not fetch)
   - Date handling: date-fns (not moment)
   - Validation: zod
   - Testing: jest + react-testing-library
   ```

## Part C: Configure a Profile

**Task**: Create a config profile for this project.

1. Create or edit your global config:
   ```bash
   mkdir -p ~/.codex
   $EDITOR ~/.codex/config.toml
   ```

2. Add a profile (example):
   ```toml
   [profiles.project-demo]
   model = "codex-max"
   approval_policy = "on-request"
   sandbox = "workspace-write"

   [profiles.project-demo.features]
   skills = true
   ```

3. Run Codex with that profile:
   ```bash
   codex --profile project-demo
   ```

## Part D: Validate Configuration

**Task**: Test that your configuration works.

1. Create a test scenario:
   ```markdown
   ## Testing AGENTS.md

   Ask Codex:
   - "What's the tech stack for this project?"
   - "How should I name my git branch?"
   - "Which HTTP client should I use?"

   Codex should answer using information from AGENTS.md.
   ```

2. Verify conventions are followed:
   - Ask Codex to write a small function
   - Check that it follows your documented conventions
   - Note any gaps in your AGENTS.md

3. Document your findings:
   | Question | Expected Answer | Actual Answer | AGENTS.md Updated? |
   |----------|-----------------|---------------|-------------------|
   | Tech stack? | | | |
   | Branch naming? | | | |
   | Preferred HTTP client? | | | |

---

## Hints

<details>
<summary>Hint 1: Scope and specificity</summary>

Be specific in AGENTS.md:
- ❌ "Follow best practices"
- ✅ "Use camelCase for variables, PascalCase for types"

Include examples when possible:
```markdown
## Naming Examples
- Variables: `userName`, `orderTotal`
- Functions: `getUserById`, `calculateTotal`
- Types: `UserProfile`, `OrderItem`
```
</details>

<details>
<summary>Hint 2: Keep it focused</summary>

AGENTS.md should include what Codex needs to know, not everything about the project.

**Include:**
- Conventions that affect code generation
- Commands Codex might need to run
- Files Codex should know about

**Skip:**
- Deployment procedures
- Team org chart
- Business context (unless relevant)
</details>

<details>
<summary>Hint 3: Global vs project configuration</summary>

| Location | Purpose |
|----------|---------|
| `~/.codex/config.toml` | Global defaults and profiles |
| `~/.codex/AGENTS.md` | Personal preferences across all projects |
| `./AGENTS.md` | Project-specific conventions |

Project instructions override global instructions. Profiles help you keep per-project defaults.
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Complete AGENTS.md Example

```markdown
# AGENTS.md - MyApp

## Project Overview
MyApp is a task management application built with React and Node.js.
It provides team collaboration features and integrates with Slack.

## Tech Stack
- Frontend: React 18 + TypeScript + Vite
- Backend: Node.js 20 + Express + TypeScript
- Database: PostgreSQL 15
- Testing: Jest + React Testing Library
- Linting: ESLint + Prettier

## Code Conventions

### TypeScript
- Strict mode enabled
- No `any` type - use `unknown` and narrow
- Prefer interfaces over types for objects
- Use `readonly` for immutable data

### React
- Functional components only (no classes)
- Custom hooks in `src/hooks/`
- Prefer composition over prop drilling
- Use React Query for server state

### Naming
- Files: `kebab-case.ts`, components: `PascalCase.tsx`
- Variables: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Types/Interfaces: PascalCase

## Common Commands
- `npm run dev` - Start development server
- `npm test` - Run Jest tests
- `npm run test:watch` - Tests in watch mode
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript check
- `npm run build` - Build for production

## Important Files
- `src/config/index.ts` - Application configuration
- `src/db/schema.ts` - Database schema (Drizzle)
- `src/api/routes/` - API route handlers
- `src/components/ui/` - Shared UI components
- `tests/fixtures/` - Test data

## Git Workflow
- Branch: `feature/TASK-123-description` or `fix/TASK-123-description`
- Commits: conventional commits (`feat:`, `fix:`, `docs:`, etc.)
- PRs: Require 1 approval and passing CI
- Merge: Squash and merge

## Things to Avoid
- Don't modify `src/legacy/` - scheduled for removal
- Don't add dependencies without team discussion
- Don't use `console.log` - use the logger from `src/utils/logger`
- Don't commit `.env` files

## Security Rules
- Never hardcode API keys or secrets
- Use parameterized queries (Drizzle handles this)
- Validate all input with Zod schemas
- Sanitize output to prevent XSS
```

### Config Profile Example

```toml
# ~/.codex/config.toml
[profiles.myapp]
approval_policy = "on-request"
sandbox = "workspace-write"

[profiles.myapp.features]
skills = true
```

### Key Insight

A well-crafted AGENTS.md is a force multiplier. It:
- Reduces repetitive explanations
- Ensures consistent code style
- Prevents common mistakes
- Accelerates onboarding

### Configuration Pattern

```
1. Start minimal
   ↓
2. Use Codex for real tasks
   ↓
3. Notice where it makes wrong assumptions
   ↓
4. Add clarifying instructions
   ↓
5. Repeat
```

</details>

---

## Reflection Questions

1. What conventions were you enforcing manually that AGENTS.md could handle?
2. How often should you update your AGENTS.md?
3. What's the right level of detail for your team's needs?

---

**Next**: [Exercise 2: Build Hooks for Automation](exercise-2.md)
