# Feature Tracing

## Context

You need to understand how a specific feature works in an unfamiliar codebase.

## Problem

Features span multiple files and layers. Hard to understand the complete flow without systematic tracing.

## Solution

Trace a feature from entry point to exit, documenting the path and key transformations.

**Approach**: Follow the execution path step by step.

## Trade-offs

**Pros**:
- Complete understanding of feature
- Identifies dependencies
- Reveals patterns
- Safer modifications

**Cons**:
- Time investment
- May go deeper than needed
- Can get lost in details

**Alternatives**:
- Read random files (incomplete understanding)
- Guess based on names (error-prone)
- Ask someone (not always available)

## The Tracing Process

### Step 1: Find the Entry Point

```
Question: How does the user/system trigger this feature?

Methods:
- Grep for route path (web apps)
- Grep for command name (CLI tools)
- Grep for function name
- Search tests for feature

Example:
Grep for '/api/users' → Find route definition
```

### Step 2: Follow the Handler

```
Question: What happens when triggered?

Read:
- Route handler
- Controller method
- Command handler

Document:
- What parameters does it accept?
- What validation happens?
- Where does it delegate to?
```

### Step 3: Trace Business Logic

```
Question: What's the core logic?

Follow to:
- Service layer
- Business logic functions
- Domain methods

Document:
- Key operations
- Decision points
- Side effects
```

### Step 4: Track Data Flow

```
Question: How does data transform?

Trace:
- Input validation
- Data transformations
- Database queries
- External API calls

Document:
- Data shape at each stage
- Transformations applied
- Where data comes from/goes to
```

### Step 5: Identify Dependencies

```
Question: What does this feature depend on?

Note:
- Database tables/models
- External services
- Other modules/features
- Configuration

Document:
- Critical dependencies
- Optional dependencies
```

### Step 6: Map Error Handling

```
Question: How does it handle failures?

Trace:
- Error cases
- Validation failures
- Exception handling
- Error responses

Document:
- Error handling strategy
- User-facing errors
- Logging/monitoring
```

## Examples

### Example 1: User Registration Flow

```
Task: Understand how user registration works

Step 1 - Entry Point:
Grep for '/register' or 'signup'
Found: POST /api/auth/register in src/routes/auth.ts

Step 2 - Handler:
Read src/routes/auth.ts:
  router.post('/register', validateRegistration, authController.register)

Flow: Route → Middleware → Controller

Step 3 - Business Logic:
Read src/controllers/auth.ts:
  async register(req, res) {
    const user = await authService.createUser(req.body);
    const token = generateToken(user);
    return res.json({ user, token });
  }

Core logic: authService.createUser

Step 4 - Data Flow:
Read src/services/auth.ts:
  async createUser(data) {
    // 1. Hash password
    const hash = await bcrypt.hash(data.password, 10);

    // 2. Create user in DB
    const user = await db.users.create({
      email: data.email,
      passwordHash: hash
    });

    // 3. Send welcome email
    await emailService.sendWelcome(user.email);

    return user;
  }

Transformations:
  Input: { email, password }
  → Hash password
  → Store in DB: { email, passwordHash }
  → Send email
  → Return user object

Step 5 - Dependencies:
- Database: users table
- bcrypt library for hashing
- emailService for welcome email
- JWT for token generation

Step 6 - Error Handling:
- validateRegistration middleware: checks email format, password strength
- Duplicate email: caught by DB unique constraint
- Email sending failure: logged but doesn't block registration

Complete Flow Documented:
POST /register
  → Validate input
  → authController.register
    → authService.createUser
      → Hash password
      → Create DB record
      → Send email
    → Generate JWT token
  → Return { user, token }
```

### Example 2: Payment Processing

```
Task: Understand payment flow

Trace:
1. Entry: POST /api/orders/:id/pay
2. Handler: orderController.processPayment
3. Logic:
   - Validate order exists
   - Check order not already paid
   - Call paymentService.charge
4. Payment Service:
   - Create Stripe payment intent
   - Process payment
   - Update order status
   - Send confirmation email
5. Dependencies:
   - Stripe API
   - Order model
   - Email service
   - Transaction logging
6. Errors:
   - Invalid order: 404
   - Already paid: 400
   - Payment declined: 402
   - Stripe error: 500

Flow map created for future reference
```

### Example 3: Search Feature

```
Task: How does search work?

Trace:
1. Entry: GET /api/search?q=...
2. Handler: searchController.search
3. Logic:
   - Parse query params
   - searchService.query
4. Search Service:
   - Build Elasticsearch query
   - Add filters (status, date)
   - Execute search
   - Transform results
5. Data Flow:
   Input: { q: "laptop", filters: {...} }
   → Build ES query
   → Execute
   → Raw ES results
   → Transform to API format
   → Return { results, total, page }
6. Dependencies:
   - Elasticsearch cluster
   - Product index
   - Search configuration

Understanding: Now can modify search logic safely
```

## Tracing Tools

### Using Codex

```
"Trace the [feature] flow:

1. Find entry point (route/command)
2. Read handler implementation
3. Follow to business logic
4. Map data transformations
5. Identify dependencies
6. Document error handling

Create flow diagram in markdown."
```

### Using Grep Strategically

```
# Find entry point
Grep for feature name in routes/commands

# Find all related files
Grep for service/module name across codebase

# Find data models
Grep for model/schema definitions

# Find tests
Grep for test files covering this feature
```

### Creating Flow Diagrams

```markdown
## User Login Flow

```
1. POST /api/auth/login
   ↓
2. loginController.login
   - Validate input
   ↓
3. authService.authenticate
   - Find user by email
   - Verify password
   ↓
4. Generate JWT token
   ↓
5. Return { user, token }
```

Error Paths:
- User not found → 404
- Wrong password → 401
- Account locked → 403
```

## Pattern: Compare Similar Features

```
Task: Add new feature similar to existing one

Approach:
1. Trace existing feature completely
2. Document the pattern
3. Identify what's common vs specific
4. Apply same pattern to new feature

Example:
Traced: User registration
Pattern found:
  - Route definition in routes/
  - Controller in controllers/
  - Service in services/
  - Model in models/
  - Tests in tests/

Apply to: "Add organization registration"
Follow same structure
```

## Documentation Template

```markdown
# Feature: [Name]

## Entry Point
Route/Command: [...]
Handler: [file:line]

## Flow
1. [Step 1]
   - Details
   - Code location

2. [Step 2]
   - Details
   - Code location

3. [Step 3]
   - Details
   - Code location

## Data Transformations
Input: { ... }
→ [Transformation 1]
→ [Transformation 2]
Output: { ... }

## Dependencies
- Database: [tables]
- External: [APIs]
- Internal: [modules]

## Error Handling
- [Error case 1]: [Response]
- [Error case 2]: [Response]

## Key Files
- [file:line] - [what it does]
- [file:line] - [what it does]

## Notes
[Anything important or unusual]
```

## When to Trace

**Trace when**:
- Adding to unfamiliar feature
- Fixing bug in complex flow
- Refactoring multi-file feature
- Learning codebase architecture

**Skip when**:
- Feature is trivial
- Already familiar
- Changes are isolated

## Related Patterns

- [Codebase Exploration](codebase-exploration.md)
- [Safe Refactoring](safe-refactoring.md)
