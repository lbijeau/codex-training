# TodoWrite for Progress Tracking

## Context

Working on multi-step tasks and need to track progress, maintain focus, and communicate status.

## Problem

Mental task tracking is unreliable. Easy to lose track of what's done, what's next, and overall progress.

## Solution

Use TodoWrite to maintain a real-time task list with proper status tracking throughout execution.

**Todo Structure**:
```javascript
{
  "content": "What to do (imperative)",
  "activeForm": "What's happening (present continuous)",
  "status": "pending" | "in_progress" | "completed"
}
```

## Trade-offs

**Pros**:
- Clear progress visibility
- Prevents forgetting tasks
- Helps maintain focus
- Useful for user/team communication
- Supports planning and retrospectives

**Cons**:
- Small overhead to maintain
- Need to update as you work
- Can feel bureaucratic for tiny tasks

**Alternatives**:
- Mental tracking (unreliable)
- Comments in code (scattered)
- External task tracker (context switch)

## Usage Patterns

### Pattern 1: Pre-Task Planning

```javascript
// Before starting, create todos:
[
  {
    "content": "Research existing authentication patterns",
    "activeForm": "Researching existing authentication patterns",
    "status": "pending"
  },
  {
    "content": "Implement JWT-based auth",
    "activeForm": "Implementing JWT-based auth",
    "status": "pending"
  },
  {
    "content": "Add tests for auth flow",
    "activeForm": "Adding tests for auth flow",
    "status": "pending"
  },
  {
    "content": "Update API documentation",
    "activeForm": "Updating API documentation",
    "status": "pending"
  }
]
```

### Pattern 2: Real-Time Updates

```javascript
// As you start first task:
[
  {
    "content": "Research existing authentication patterns",
    "activeForm": "Researching existing authentication patterns",
    "status": "in_progress"  // Changed from pending
  },
  // ... rest pending
]

// When first task done, immediately update:
[
  {
    "content": "Research existing authentication patterns",
    "activeForm": "Researching existing authentication patterns",
    "status": "completed"  // Mark done
  },
  {
    "content": "Implement JWT-based auth",
    "activeForm": "Implementing JWT-based auth",
    "status": "in_progress"  // Start next
  },
  // ... rest pending
]
```

### Pattern 3: Incremental Breakdown

```javascript
// Start high-level:
[
  {
    "content": "Implement user authentication",
    "activeForm": "Implementing user authentication",
    "status": "in_progress"
  }
]

// As you work, break down further:
[
  {
    "content": "Implement user authentication",
    "activeForm": "Implementing user authentication",
    "status": "in_progress"
  },
  {
    "content": "Create user model",
    "activeForm": "Creating user model",
    "status": "in_progress"  // Subtask
  },
  {
    "content": "Add password hashing",
    "activeForm": "Adding password hashing",
    "status": "pending"
  },
  {
    "content": "Create login endpoint",
    "activeForm": "Creating login endpoint",
    "status": "pending"
  }
]
```

### Pattern 4: Parallel Workstreams

```javascript
// Track independent streams:
[
  {
    "content": "Frontend: Build login UI",
    "activeForm": "Building login UI",
    "status": "in_progress"
  },
  {
    "content": "Backend: Implement auth API",
    "activeForm": "Implementing auth API",
    "status": "pending"
  },
  {
    "content": "Tests: Add integration tests",
    "activeForm": "Adding integration tests",
    "status": "pending"
  },
  {
    "content": "Docs: Update API documentation",
    "activeForm": "Updating API documentation",
    "status": "pending"
  }
]
```

## Best Practices

### Good Todo Content

```javascript
✅ Good (Specific, actionable):
"Implement email validation using regex"
"Add test for password strength requirements"
"Update user model with email field"

❌ Bad (Vague, too granular):
"Fix the thing"  // Too vague
"Type the word function"  // Too granular
"Make it better"  // Not specific
```

### Good Active Forms

```javascript
✅ Good (Present continuous):
"Implementing email validation"
"Adding password strength test"
"Updating user model"

❌ Bad (Not present continuous):
"Implement email validation"  // That's content form
"Will add test"  // Future tense
"Added test"  // Past tense
```

### Status Management

```
Rules:
- Exactly ONE todo should be "in_progress" at a time
- Mark "completed" IMMEDIATELY after finishing
- Don't batch-complete multiple todos
- Remove todos that are no longer relevant
```

## Examples

### Example 1: Bug Fix

```javascript
// Initial:
[
  {
    "content": "Reproduce the login bug",
    "activeForm": "Reproducing the login bug",
    "status": "in_progress"
  },
  {
    "content": "Identify root cause",
    "activeForm": "Identifying root cause",
    "status": "pending"
  },
  {
    "content": "Implement fix",
    "activeForm": "Implementing fix",
    "status": "pending"
  },
  {
    "content": "Add regression test",
    "activeForm": "Adding regression test",
    "status": "pending"
  }
]

// After reproducing:
[
  {
    "content": "Reproduce the login bug",
    "activeForm": "Reproducing the login bug",
    "status": "completed"  // Done
  },
  {
    "content": "Identify root cause",
    "activeForm": "Identifying root cause",
    "status": "in_progress"  // Now working on this
  },
  // ... rest
]
```

### Example 2: Feature with Discovery

```javascript
// Start:
[
  {
    "content": "Explore codebase for similar features",
    "activeForm": "Exploring codebase for similar features",
    "status": "in_progress"
  }
]

// After exploration, add discovered tasks:
[
  {
    "content": "Explore codebase for similar features",
    "activeForm": "Exploring codebase for similar features",
    "status": "completed"
  },
  {
    "content": "Implement feature following UserCard pattern",
    "activeForm": "Implementing feature following UserCard pattern",
    "status": "in_progress"
  },
  {
    "content": "Add tests similar to UserCard tests",
    "activeForm": "Adding tests similar to UserCard tests",
    "status": "pending"
  },
  {
    "content": "Export from index.ts like other components",
    "activeForm": "Exporting from index.ts",
    "status": "pending"
  }
]
```

### Example 3: Blocked Task

```javascript
// Discover blocker:
[
  {
    "content": "Implement payment processing",
    "activeForm": "Implementing payment processing",
    "status": "in_progress"
  }
]

// Add new task for blocker:
[
  {
    "content": "Implement payment processing",
    "activeForm": "Implementing payment processing",
    "status": "pending"  // Can't do until blocker resolved
  },
  {
    "content": "Set up Stripe test account (blocker)",
    "activeForm": "Setting up Stripe test account",
    "status": "in_progress"  // Do this first
  }
]

// After unblocking:
[
  {
    "content": "Implement payment processing",
    "activeForm": "Implementing payment processing",
    "status": "in_progress"  // Resume
  },
  {
    "content": "Set up Stripe test account (blocker)",
    "activeForm": "Setting up Stripe test account",
    "status": "completed"
  }
]
```

## Anti-Patterns

### ❌ Too Granular
```javascript
{
  "content": "Open the file",  // Too small
  "content": "Type 'function'",  // Way too small
  "content": "Add semicolon"  // Ridiculous
}
```

### ❌ Too Vague
```javascript
{
  "content": "Do the thing",  // What thing?
  "content": "Fix it",  // Fix what?
  "content": "Implement feature"  // Which aspect?
}
```

### ❌ Not Updating
```javascript
// All marked pending even though some are done:
[
  { "status": "pending" },  // Actually done!
  { "status": "pending" },  // Currently working on this!
  { "status": "pending" }
]
```

### ❌ Multiple In Progress
```javascript
[
  { "status": "in_progress" },  // Can't work on all at once
  { "status": "in_progress" },
  { "status": "in_progress" }
]
```

## Integration with Planning

Combine with stage-based planning:

```
IMPLEMENTATION_PLAN.md has high-level stages
TodoWrite tracks real-time task progress within current stage

Example:
Plan: "Stage 2: Implement Login Endpoint"
Todos:
- Create route handler
- Add validation
- Implement auth logic
- Add tests
```

## When to Use

**Always use for**:
- Multi-step tasks (3+ steps)
- Complex features
- Tasks taking >30 minutes
- Team collaboration

**Can skip for**:
- Single-step operations
- Quick fixes
- Trivial changes

## Related Patterns

- [Stage-Based Planning](stage-based-planning.md)
- [Plan-Execute Workflow](plan-execute.md)
