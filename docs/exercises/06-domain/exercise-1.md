# Exercise 1: Architecture Exploration Challenge

## Objective

Develop systematic techniques for understanding unfamiliar codebases quickly.

## Background

Before making changes to any codebase, you need to understand its architecture. This exercise builds exploration skills that reveal structure without reading every file.

## Part A: High-Level Structure

**Task**: Map a codebase without reading implementation details.

1. Pick a codebase (or use this repo as practice)

2. Answer these questions using only file/folder exploration:
   - What's the primary language?
   - What framework(s) are used?
   - What's the module/component structure?
   - Where are tests located?
   - What external services are used?

3. Create a structure diagram:
   ```
   "Explore this codebase and create a high-level architecture diagram
   showing the main components and how they relate."
   ```

**Output format**:

```markdown
## Architecture Overview

### Language/Framework
- Primary: [Language]
- Framework: [Name + Version]
- Build: [Tool]

### Directory Structure
src/
├── api/        # HTTP endpoints
├── services/   # Business logic
├── models/     # Data models
├── utils/      # Shared utilities
└── config/     # Configuration

### External Dependencies
- Database: [Type]
- Cache: [Type]
- Message Queue: [Type]
```

## Part B: Trace a Request Path

**Task**: Follow a request from entry to response.

1. Pick a typical user action (e.g., "user logs in")

2. Trace the full path:
   ```
   "Trace the complete path of a login request through this codebase.
   Start from the HTTP endpoint, through middleware, to the handler,
   to the database, and back. Note each file touched."
   ```

3. Document the path:
   ```markdown
   ## Login Request Path

   1. Entry: `routes/auth.js:15` - POST /login
   2. Middleware: `middleware/validate.js:8` - Input validation
   3. Handler: `controllers/auth.js:25` - authenticate()
   4. Service: `services/user.js:42` - findByCredentials()
   5. Database: `models/user.js:18` - User.findOne()
   6. Response: `controllers/auth.js:35` - Return token
   ```

## Part C: Identify Core Patterns

**Task**: Recognize architectural patterns in use.

Look for these patterns and document examples:

| Pattern | Present? | Example Location |
|---------|----------|------------------|
| MVC/MVT | | |
| Repository pattern | | |
| Dependency injection | | |
| Event-driven | | |
| Middleware chain | | |
| Factory pattern | | |
| Singleton | | |

For each pattern found:
- Where is it used?
- Why was it chosen?
- How consistently is it applied?

## Part D: Map Dependencies

**Task**: Understand what depends on what.

1. Create a dependency map:
   ```
   "Map the dependencies between major modules in this codebase.
   Show which modules depend on which others."
   ```

2. Identify:
   - Core modules (depended on by many)
   - Leaf modules (depend on others, nothing depends on them)
   - Circular dependencies (problematic)

3. Visualize:
   ```
   API → Services → Models → Database
          ↓
       Utilities
   ```

---

## Hints

<details>
<summary>Hint 1: Quick exploration commands</summary>

```bash
# Structure overview
tree -L 2 src/

# Find entry points
grep -r "app.listen\|main\|export default" --include="*.js"

# Find route definitions
grep -r "router\.\|app\." --include="*.js" | head -20

# Find config
ls -la | grep -i config
```
</details>

<details>
<summary>Hint 2: Framework detection</summary>

Check:
- package.json for dependencies
- Import statements at file tops
- Framework-specific file patterns
- Configuration files
</details>

<details>
<summary>Hint 3: Tracing requests</summary>

Start from:
- Route definitions
- Middleware configuration
- Handler functions

Follow:
- Function calls
- Imports
- Event emissions
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Effective Exploration Order

1. **Start with configuration**
   - package.json / requirements.txt
   - Config files
   - Environment examples

2. **Map entry points**
   - Main/index files
   - Route definitions
   - Event handlers

3. **Identify layers**
   - API/Routes
   - Controllers/Handlers
   - Services/Business Logic
   - Data Access
   - Utilities

4. **Trace one flow**
   - Pick simple request
   - Follow through all layers
   - Note patterns used

### Common Architecture Patterns

**Layered Architecture**:
```
Routes → Controllers → Services → Repositories → Database
```

**Event-Driven**:
```
HTTP → Handler → Events → Listeners → Side Effects
```

**Microservices**:
```
Gateway → Service A ←→ Service B ←→ Service C
              ↓           ↓           ↓
          Database    Database    Database
```

### Dependency Analysis

**Healthy signs**:
- Clear layer boundaries
- Dependencies flow one direction
- Core modules are stable

**Warning signs**:
- Circular dependencies
- Utility modules doing business logic
- Direct database access from routes

### Key Insight

You don't need to read every file to understand a codebase. Strategic exploration of:
- Entry points
- Configuration
- One complete flow

...gives you 80% understanding in 20% of the time.

### Exploration Pattern

```
1. Config files → Tech stack
2. Entry points → Structure
3. One traced flow → Patterns
4. Dependency map → Architecture
```

</details>

---

## Reflection Questions

1. How long did it take to feel oriented in the codebase?
2. What would have made exploration faster?
3. How would you document architecture for new team members?

---

**Next**: [Exercise 2: Safe Refactoring Exercise](exercise-2.md)
