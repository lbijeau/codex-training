# Module 7: Collaboration & Communication

## Overview

Master effective communication with Codex for better results, faster iteration, and clearer understanding.

**Learning Objectives**:
- Craft effective prompts
- Provide context efficiently
- Ask better questions
- Iterate productively
- Teach Codex your patterns

**Time**: 2-3 hours

---

## 1. Effective Prompting

### Prompt Anatomy

**Good Prompt Structure**:
```
[Context] + [Task] + [Constraints] + [Expected Output]
```

**Example**:
```
❌ Vague:
"Fix the bug"

✅ Specific:
"In src/auth.ts, the login function fails when email has uppercase letters.
Fix the validation to be case-insensitive.
Ensure tests pass and add a test for this case."
```

### Prompting Principles

**1. Be Specific**
```
❌ "Make it better"
✅ "Refactor the validateUser function to:
    - Use early returns
    - Extract validation logic
    - Add JSDoc comments"
```

**2. Provide Context**
```
❌ "Add authentication"
✅ "Add JWT-based authentication to the API.
    We're using Express, and already have user models.
    Store tokens in httpOnly cookies.
    See src/middleware/ for existing patterns."
```

**3. Define Success**
```
❌ "Improve performance"
✅ "Reduce API response time from 500ms to < 200ms.
    Profile the /api/users endpoint and optimize
    database queries. Verify improvement with load test."
```

**4. Set Constraints**
```
❌ "Implement caching"
✅ "Implement caching using Redis.
    Cache for 5 minutes, invalidate on updates.
    Don't modify the API interface.
    Ensure tests still pass."
```

### Prompt Patterns

**Pattern: Incremental Refinement**
```
Round 1: "Draft an API endpoint for user search"
(Codex provides basic implementation)

Round 2: "Add pagination (limit, offset) and filtering by role"
(Codex enhances)

Round 3: "Add request validation using Zod"
(Codex refines)
```

**Pattern: Example-Driven**
```
"Create a React component for displaying user cards.
Similar to the ProductCard component in src/components/,
but for users. Include avatar, name, email, and role.

Here's how it should be used:
<UserCard user={userData} onSelect={handleSelect} />"
```

**Pattern: Constraints-First**
```
"Implement a sorting algorithm with these constraints:
- Must be in-place
- Must be stable
- Must handle duplicates
- Must work with custom comparators

For an array of product objects, sorting by price."
```

---

## 2. Providing Context Efficiently

### Context Strategies

**Strategy 1: Progressive Context**
```
Start broad, narrow as needed:

Round 1: "I'm working on the checkout flow"
(Codex asks clarifying questions)

Round 2: "Specifically the payment integration with Stripe"
(Provides focused help)
```

**Strategy 2: Context Files**
```
.codex/context.md:
# Project Context
- Stack: React + Node + PostgreSQL
- Auth: JWT with refresh tokens
- Payment: Stripe
- Deployment: AWS (ECS)

Reference: "See .codex/context.md for project details"
```

**Strategy 3: Explicit File Sharing**
```
❌ Assuming Codex knows:
"The bug is in the auth code"

✅ Explicit sharing:
"Read src/auth/login.ts and src/auth/validate.ts.
The bug is in how these interact."
```

**Strategy 4: Codebase Patterns**
```
"Create a new API endpoint.
Follow the same pattern as src/api/users.ts:
- Route in routes.ts
- Handler in handlers/
- Validation with Zod
- Tests in __tests__/"
```

### Context Optimization

**When to Provide More Context**:
- First time working on an area
- Complex interactions between components
- Project-specific conventions
- Historical context matters

**When to Provide Less Context**:
- Simple, standalone tasks
- Generic programming questions
- Already provided in conversation
- Obvious from code

---

## 3. Asking Better Questions

### Question Frameworks

**Framework 1: Socratic Method**
```
Instead of: "What should I do?"
Ask: "What are the trade-offs between approach A and B?"

Codex helps you think, not just tells you answer
```

**Framework 2: Targeted Inquiry**
```
❌ Broad: "How does this work?"
✅ Targeted: "How does the token refresh mechanism handle expired tokens?"
```

**Framework 3: Problem-Oriented**
```
❌ Solution-oriented: "How do I add caching?"
✅ Problem-oriented: "API responses are slow (500ms).
    I've profiled and found DB queries are the bottleneck.
    What are good caching strategies for this scenario?"
```

### Question Patterns

**Pattern: Comparison Questions**
```
"What are the pros/cons of:
A) Redis caching with TTL
B) Application-level memoization
C) Database query caching

For a read-heavy API with infrequent writes?"
```

**Pattern: Validation Questions**
```
"I'm planning to refactor the auth module by:
1. Extracting validation to separate file
2. Using dependency injection for database
3. Adding integration tests

Does this approach make sense? Any concerns?"
```

**Pattern: Exploration Questions**
```
"What patterns does this codebase use for error handling?
Read src/api/*.ts and identify the approach.
Are there inconsistencies?"
```

**Pattern: Learning Questions**
```
"Explain how the WebSocket connection manager works in
src/websocket/manager.ts.
Include: connection lifecycle, message routing, error handling."
```

---

## 4. Iterating Productively

### Iteration Patterns

**Pattern: Build-Measure-Learn**
```
1. Build: "Implement basic version of feature X"
2. Measure: "Review the implementation, identify issues"
3. Learn: "Based on the issues, refactor to address"
4. Repeat
```

**Pattern: Feedback Loops**
```
Short Feedback Loops:
- Write code → Review immediately → Adjust
- Small commits, frequent validation

Long Feedback Loops:
- Plan feature → Implement fully → Review
- Larger changes, less frequent validation

Prefer short loops for uncertain work
```

**Pattern: Explicit Validation**
```
After Codex implements:
"Before we continue:
1. Run the tests
2. Check the lint output
3. Verify the behavior manually

Report findings, then we'll adjust."
```

**Pattern: Checkpoint Reviews**
```
"We're implementing feature X in 3 stages.
We've completed stage 1.

Before proceeding to stage 2:
- Review the code for issues
- Verify tests pass
- Check if approach is working

Report status."
```

### Iteration Anti-Patterns

❌ **Assumption Cascade**:
```
Codex implements → You assume it's good → Build on top → Find issue in foundation → Rebuild everything
```

✅ **Validation Points**:
```
Codex implements → Validate → Build next → Validate → Continue
```

❌ **Vague Feedback**:
```
"That's not quite right, try again"
```

✅ **Specific Feedback**:
```
"The error handling is good, but the validation is too strict.
Accept emails with + symbols and international domains."
```

---

## 5. Teaching Codex Your Patterns

### Documentation Strategies

**Strategy 1: Skills for Recurring Patterns**
```
Create skill: project-conventions.md
Document:
- Code style preferences
- Naming conventions
- File organization
- Testing patterns

Reference: "Follow patterns in project-conventions skill"
```

**Strategy 2: Example-Based Teaching**
```
"When creating new components, follow this pattern:

See src/components/UserCard.tsx as reference.
All components should:
- Have TypeScript props interface
- Include PropTypes for runtime validation
- Have corresponding test file
- Export from index.ts"
```

**Strategy 3: Explicit Preferences**
```
codex-context.md (global preferences):
# Preferences

- Use functional components, not classes
- Prefer const over let
- Use async/await over promises
- Error handling: fail fast with descriptive errors
- Testing: Jest, React Testing Library
```

**Strategy 4: Correction with Context**
```
❌ "Don't do that"

✅ "Instead of using classes, use functional components.
    This project standardized on hooks (see CONTRIBUTING.md).
    For state management, use useState/useReducer."
```

### Building Shared Understanding

**Over Time**:
```
Session 1: Explain conventions explicitly
Session 2: Reference previous explanations
Session 3: Codex applies without being told
Session 4: Codex suggests improvements based on patterns
```

**With Memory Snapshots**:
```
Keep a summary file (e.g., `docs/context/authentication-summary.md`) describing past decisions.
At the start of a session:
- Include the summary as a user message
- Reference it when asking Codex to follow patterns
Codex now sees the historical choices without re-reading every conversation.
```

---

## 6. Communication Patterns Library

### Pattern: Rubber Duck Debugging

**Use**: When stuck on a problem

```
"Let me explain the problem:
[Detailed explanation of what you're trying to do,
 what's happening, what you've tried]

Now that I've explained it, help me identify what I'm missing."
```

Often, explaining helps you see the solution.

### Pattern: Pair Programming

**Use**: Collaborative problem solving

```
You: "I'm implementing user registration. Let's think through edge cases."

Codex: [Lists edge cases]

You: "Good. For duplicate emails, how should we handle?"

Codex: [Suggests approach]

You: "Makes sense. Let's implement that."
```

### Pattern: Code Review Dialogue

**Use**: After implementation

```
You: "Review this implementation. Be critical."

Codex: [Provides detailed feedback]

You: "I disagree on point #3 because [reasoning]. Thoughts?"

Codex: [Responds to reasoning]

You: "Good point. Let's address #1 and #2, skip #3."
```

### Pattern: Architecture Discussion

**Use**: Before major changes

```
You: "I'm designing a caching layer. Here's my approach:
     [Detailed design]

     What am I not considering?"

Codex: [Points out considerations]

You: "How would you handle cache invalidation?"

Codex: [Suggests approaches]

You: "Let's go with approach B. Create the implementation plan."
```

---

## Key Takeaways

1. **Specific Prompts**: Context + Task + Constraints + Expected Output
2. **Efficient Context**: Progressive disclosure, reference existing patterns
3. **Better Questions**: Targeted, comparison-based, problem-oriented
4. **Productive Iteration**: Short feedback loops, explicit validation
5. **Teach Patterns**: Skills, examples, documentation, correction with context

---

## Next Steps

1. Complete [Module 7 Exercises](../exercises/07-collaboration/)
2. Practice crafting specific prompts
3. Create a project-conventions skill
4. Experiment with different questioning techniques

---

## Quick Reference

### Effective Prompts
- Context: What Codex needs to know
- Task: What to do
- Constraints: Limits and requirements
- Expected Output: What success looks like

### Providing Context
- Progressive: Start broad, narrow down
- Explicit: Share files, don't assume
- Patterns: Reference similar code
- Documentation: Skills, .codex files

### Asking Questions
- Comparison: "A vs B for scenario X?"
- Validation: "Does this approach make sense?"
- Exploration: "What patterns exist?"
- Learning: "Explain how X works"

### Iterating
- Short feedback loops preferred
- Validate at checkpoints
- Specific feedback, not vague
- Build-Measure-Learn cycle

### Teaching Patterns
- Skills for recurring patterns
- Examples over descriptions
- Document preferences
- Correction with context

---

**Communicate effectively!** Head to [Exercise 1](../exercises/07-collaboration/exercise-1.md)
