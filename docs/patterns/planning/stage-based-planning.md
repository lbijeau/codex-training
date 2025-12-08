# Stage-Based Planning

## Context

Implementing a complex feature that requires multiple files, architectural changes, or has dependencies between parts.

## Problem

Jumping straight into implementation without planning leads to missed requirements, rework, and context overload.

## Solution

Break work into 3-5 stages with clear goals, success criteria, and incremental validation.

**Structure**:
```
IMPLEMENTATION_PLAN.md

Stage 1: [Foundation]
  Goal: Build base functionality
  Success Criteria: [What "done" means]
  Status: Not Started

Stage 2: [Enhancement]
  Goal: Add additional features
  Success Criteria: [What "done" means]
  Status: Not Started

...
```

## Trade-offs

**Pros**:
- Clear roadmap reduces uncertainty
- Incremental progress with validation
- Easier to adjust course
- Better context management
- Team visibility

**Cons**:
- Upfront planning time
- May need to adjust plan
- Can feel like overhead for simple tasks

**Alternatives**:
- No plan (risky for complex work)
- Single-stage implementation (all or nothing)
- Detailed task lists (too granular)

## The Framework

### Planning Phase

```
1. Understand requirements
2. Identify major components
3. Determine dependencies
4. Break into 3-5 stages
5. Define success criteria per stage
6. Document in IMPLEMENTATION_PLAN.md
```

### Execution Phase

```
For each stage:
1. Implement changes
2. Run tests
3. Validate success criteria
4. Update status to "Complete"
5. Move to next stage
```

### Completion Phase

```
1. All stages complete
2. Final validation
3. Remove IMPLEMENTATION_PLAN.md
4. Commit/PR
```

## Examples

### Example 1: User Authentication Feature

```markdown
# Feature: User Authentication

## Overview
Implement JWT-based authentication with email/password login

## Stage 1: Database & Models
**Goal**: Set up user storage
**Success Criteria**:
- [ ] User table with email, password_hash, created_at
- [ ] Migration runs successfully
- [ ] User model with methods: hashPassword, verifyPassword
**Tests**:
- [ ] Can create user
- [ ] Password is hashed
- [ ] Can verify password
**Status**: Complete

## Stage 2: Registration Endpoint
**Goal**: Allow users to sign up
**Success Criteria**:
- [ ] POST /api/auth/register endpoint
- [ ] Validates email and password
- [ ] Returns JWT token
**Tests**:
- [ ] Can register with valid data
- [ ] Rejects duplicate email
- [ ] Rejects weak password
**Status**: Complete

## Stage 3: Login Endpoint
**Goal**: Allow users to sign in
**Success Criteria**:
- [ ] POST /api/auth/login endpoint
- [ ] Validates credentials
- [ ] Returns JWT token
**Tests**:
- [ ] Can login with correct credentials
- [ ] Rejects wrong password
- [ ] Rejects unknown email
**Status**: In Progress

## Stage 4: Protected Routes
**Goal**: Middleware to protect endpoints
**Success Criteria**:
- [ ] Auth middleware validates JWT
- [ ] Attaches user to request
- [ ] Returns 401 if invalid/missing
**Tests**:
- [ ] Protected route requires auth
- [ ] Valid token grants access
- [ ] Invalid token denies access
**Status**: Not Started

## Stage 5: Token Refresh
**Goal**: Handle token expiration
**Success Criteria**:
- [ ] POST /api/auth/refresh endpoint
- [ ] Issues new token with refresh token
- [ ] Invalidates old tokens
**Tests**:
- [ ] Can refresh with valid refresh token
- [ ] Expired tokens can be refreshed
- [ ] Invalid refresh token rejected
**Status**: Not Started
```

### Example 2: Performance Optimization

```markdown
# Task: Optimize API Performance

## Overview
Reduce /api/users endpoint from 500ms to <100ms

## Stage 1: Profiling
**Goal**: Identify bottlenecks
**Success Criteria**:
- [ ] Profile API endpoint
- [ ] Identify top 3 slowest operations
- [ ] Document findings
**Status**: Complete

Findings: 90% time in database query (N+1 problem)

## Stage 2: Database Query Optimization
**Goal**: Fix N+1 queries
**Success Criteria**:
- [ ] Add eager loading for relations
- [ ] Reduce queries from 100+ to <5
- [ ] Measure improvement
**Tests**:
- [ ] Query count reduced
- [ ] Response time <200ms
**Status**: Complete

Result: Response time now 120ms (↓76%)

## Stage 3: Caching Layer
**Goal**: Add Redis caching
**Success Criteria**:
- [ ] Cache user list for 5 minutes
- [ ] Invalidate on updates
- [ ] Hit rate >80%
**Tests**:
- [ ] Cache populated on first request
- [ ] Subsequent requests hit cache
- [ ] Updates invalidate cache
**Status**: In Progress

## Stage 4: Response Optimization
**Goal**: Reduce payload size
**Success Criteria**:
- [ ] Remove unnecessary fields
- [ ] Add pagination (limit: 50)
- [ ] Compress responses
**Tests**:
- [ ] Payload size <50KB
- [ ] Pagination works
**Status**: Not Started
```

### Example 3: Refactoring Legacy Code

```markdown
# Refactoring: Extract Validation Logic

## Overview
Extract scattered validation into dedicated module

## Stage 1: Characterization Tests
**Goal**: Safety net before changes
**Success Criteria**:
- [ ] Tests cover all validation scenarios
- [ ] All tests pass with current code
- [ ] Edge cases documented
**Status**: Complete

## Stage 2: Extract Validators
**Goal**: Create validation module
**Success Criteria**:
- [ ] New validators/ directory
- [ ] Extract email validation
- [ ] Extract password validation
- [ ] Tests still pass
**Status**: Complete

## Stage 3: Update Callers
**Goal**: Use extracted validators
**Success Criteria**:
- [ ] Replace inline validation with module calls
- [ ] All tests still pass
- [ ] No duplicate validation logic
**Status**: In Progress

Files updated: 12/20

## Stage 4: Remove Duplicates
**Goal**: Clean up old code
**Success Criteria**:
- [ ] Delete old inline validation
- [ ] Verify no references remain
- [ ] All tests pass
**Status**: Not Started

## Stage 5: Documentation
**Goal**: Document new validation module
**Success Criteria**:
- [ ] README for validators/
- [ ] JSDoc for all validators
- [ ] Examples in docs
**Status**: Not Started
```

## Using with Codex

### Creating the Plan

```
"Use superpowers:writing-plans to create an implementation plan for:
[Feature description]

Break into 3-5 stages with clear goals and success criteria."
```

Or manual:

```
"Help me plan implementing [feature].
Break into stages:
1. What's the foundation we need first?
2. What builds on that?
3. What are the final touches?

For each stage, define:
- Goal
- Success criteria
- Tests to write"
```

### Executing the Plan

```
"Use superpowers:executing-plans to execute IMPLEMENTATION_PLAN.md

Work in batches:
- Implement one stage
- Review with me
- Then proceed to next"
```

Or manual:

```
"Let's implement Stage 1 of the plan.
Goal: [from plan]
Success criteria: [from plan]

Implement incrementally and update the plan status."
```

## Plan Structure Template

```markdown
# Feature: [Name]

## Overview
[What and why]

## Stage N: [Name]
**Goal**: [Specific deliverable]

**Success Criteria**:
- [ ] Criterion 1
- [ ] Criterion 2

**Tests**:
- [ ] Test scenario 1
- [ ] Test scenario 2

**Files to Modify**:
- path/to/file1
- path/to/file2

**Status**: [Not Started | In Progress | Complete]

---

[Repeat for each stage]
```

## When to Use

**Use stage-based planning for**:
- Multi-file features
- Architectural changes
- Refactoring projects
- Anything taking >2 hours

**Skip for**:
- Bug fixes
- Single-file changes
- Documentation updates
- Simple style changes

## Success Indicators

Good plan has:
- ✅ 3-5 stages (not too many)
- ✅ Each stage independently valuable
- ✅ Clear success criteria
- ✅ Tests defined upfront
- ✅ Dependencies respected

## Related Patterns

- [TodoWrite for Progress](todowrite-tracking.md)
- [Plan-Execute Workflow](plan-execute.md)
