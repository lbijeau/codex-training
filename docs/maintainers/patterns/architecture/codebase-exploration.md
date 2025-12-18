# Codebase Exploration

## Context

You need to understand an unfamiliar codebase to add features, fix bugs, or refactor safely.

## Problem

Reading files randomly wastes time and doesn't build understanding of how the system works.

## Solution

Use systematic breadth-first exploration to build a mental model of the codebase architecture.

**Approach**: Wide before deep - understand structure before details.

## Trade-offs

**Pros**:
- Builds comprehensive understanding
- Prevents wasted time on wrong areas
- Identifies patterns and conventions
- Safer changes (know dependencies)

**Cons**:
- Upfront time investment
- May explore more than immediately needed

**Alternatives**:
- Jump straight to task (risky)
- Ask someone (not always available)
- Trial and error (slow, error-prone)

## The Exploration Framework

### Level 1: Project Overview (10 minutes)

**What to check**:
```
1. README.md - What is this project?
2. package.json/requirements.txt - Dependencies, scripts
3. Directory structure - How is code organized?
4. .env.example / config - What external services?
```

**Questions to answer**:
- What does this project do?
- What tech stack?
- How do I run it?
- What are the major components?

### Level 2: Entry Points (15 minutes)

**What to check**:
```
1. Main file (index.ts, main.py, app.ts)
2. Route definitions (if web app)
3. CLI commands (if CLI tool)
4. Test suite structure
```

**Questions to answer**:
- How does the application start?
- What are the main execution paths?
- How is the app structured (MVC, microservices, etc.)?

### Level 3: Core Abstractions (20 minutes)

**What to check**:
```
1. Models / Domain entities
2. Key interfaces / types
3. Core utilities
4. Common patterns
```

**Questions to answer**:
- What are the main concepts/entities?
- What patterns does the code follow?
- What utilities/helpers exist?
- How is error handling done?

### Level 4: Data Flow (20 minutes)

**What to trace**:
```
Pick a key feature and trace it:
1. Entry point (route/command)
2. Validation
3. Business logic
4. Database/external calls
5. Response/output
```

**Questions to answer**:
- How does data flow through the system?
- Where are side effects?
- How are errors handled?
- What's the typical request lifecycle?

### Level 5: Testing Strategy (10 minutes)

**What to check**:
```
1. Test directory structure
2. Test utilities / fixtures
3. Coverage patterns
4. Test execution commands
```

**Questions to answer**:
- How are tests organized?
- What testing frameworks?
- How to run tests?
- What's tested vs not tested?

## Examples

### Example 1: Web API Exploration

```bash
codex "Explore this codebase:

Level 1 - Overview:
- Read README.md and package.json
- Map directory structure
- Identify tech stack

Level 2 - Entry Points:
- Find route definitions
- Identify middleware
- Understand startup process

Level 3 - Core:
- Identify models/entities
- Find shared utilities
- Understand patterns

Level 4 - Data Flow:
- Trace a request from route to response
- Map database interactions
- Understand error handling

Report findings with architecture summary."

# Result: Comprehensive map of the codebase
```

### Example 2: Feature Tracing

```
Task: Understand how authentication works

"Trace the authentication flow:

1. Grep for 'login' and 'auth' to find entry points
2. Read the login route handler
3. Follow to authentication logic
4. Identify token generation
5. Find middleware that validates tokens
6. Map the complete flow

Document:
- Entry points
- Key functions
- Data transformations
- External dependencies (DB, Redis, etc.)"

Result: Complete understanding of auth system
```

### Example 3: Pattern Discovery

```
Task: Understand error handling conventions

"Analyze error handling patterns:

1. Grep for 'Error', 'throw', 'catch'
2. Identify error classes/types
3. Find error middleware/handlers
4. Look at error responses
5. Check logging strategy

Summarize:
- Error handling pattern
- Error classes used
- How errors are reported
- Logging approach"

Result: Understand project conventions for errors
```

## Exploration Strategy

**Best for breadth-first discovery**:

```bash
codex "Explore this codebase:
- Map directory structure of src/
- Identify main entry points
- Find core abstractions (models, services)
- Document common patterns
- Report architecture overview"

# Codex uses file operations efficiently
# and returns a summary without overwhelming context
```

## Exploration Patterns

### Pattern: Find Similar Features

```
Task: Add new API endpoint

Approach:
1. Find existing similar endpoint
2. Read that endpoint implementation
3. Identify the pattern:
   - Route definition location
   - Handler structure
   - Validation approach
   - Error handling
   - Testing pattern
4. Follow same pattern for new endpoint
```

### Pattern: Dependency Mapping

```
Task: Understand module dependencies

"Create dependency map:

1. Glob for all source files
2. Grep for import/require statements
3. Identify which modules depend on what
4. Find core modules (used by many)
5. Find leaf modules (use others, not used)
6. Visualize dependency graph

Report:
- Core modules (high dependency)
- Leaf modules (features)
- Circular dependencies (if any)"
```

### Pattern: Convention Discovery

```
Task: Learn naming conventions

"Analyze project conventions:

1. File naming (kebab-case? camelCase?)
2. Function naming patterns
3. Directory organization
4. Test file conventions
5. Import/export patterns

Document conventions for reference."
```

## Breadth-First vs Depth-First

**Breadth-First (Recommended for exploration)**:
```
Level 1: All top-level structure
  ↓
Level 2: All entry points
  ↓
Level 3: All core abstractions
  ↓
Level 4: Detailed understanding

Wide understanding first, deep later
```

**Depth-First (For specific tasks)**:
```
Pick one feature → Understand completely → Move to next

Good for immediate tasks, not learning codebase
```

## Documentation

**Create Architecture Doc**:

```markdown
# Codebase Architecture

## Overview
[What this project does]

## Tech Stack
- Frontend: React + TypeScript
- Backend: Node + Express
- Database: PostgreSQL
- Cache: Redis

## Directory Structure
- src/
  - api/ - Route handlers
  - models/ - Database models
  - services/ - Business logic
  - utils/ - Shared utilities
  - middleware/ - Express middleware

## Key Patterns
- MVC architecture
- Service layer for business logic
- Repository pattern for DB access
- JWT for authentication

## Data Flow
Request → Middleware → Route → Service → Model → DB
         (auth)       (validation) (logic)

## Common Utilities
- logger - Winston logging
- validator - Joi validation
- cache - Redis wrapper

## Testing
- Unit: Jest
- Integration: Supertest
- Run: npm test
```

## Checklist

Exploration complete when you can answer:
- [ ] What does this project do?
- [ ] How is code organized?
- [ ] What are the main components?
- [ ] How does data flow?
- [ ] What patterns are used?
- [ ] Where would I add my feature?
- [ ] What conventions to follow?

## Related Patterns

- [Feature Tracing](feature-tracing.md)
- [Safe Refactoring](../quality/safe-refactoring.md)
