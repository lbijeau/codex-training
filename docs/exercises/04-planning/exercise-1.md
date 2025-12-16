# Exercise 1: Write an Implementation Plan

## Objective

Create a structured implementation plan using the plan-writing skill.

## Background

A good implementation plan breaks complex work into stages with clear success criteria. This prevents scope creep, enables progress tracking, and makes work reviewable.

## Part A: Understand Plan Structure

**Task**: Analyze the structure of an effective plan.

Review this example plan structure:

```markdown
# IMPLEMENTATION_PLAN.md

## Stage 1: [Name]
**Goal**: [Specific deliverable]
**Success Criteria**:
- [ ] Criterion 1
- [ ] Criterion 2
**Dependencies**: None | Stage N
**Status**: Not Started | In Progress | Complete

## Stage 2: [Name]
...
```

**Questions to Answer**:
- Why have explicit success criteria?
- Why track dependencies?
- Why include status?

## Part B: Plan a Feature

**Task**: Write a plan for adding user notifications.

**Feature Request**:
> "Users should receive notifications when important things happen
> in the app. They should be able to configure their preferences."

1. Use the planning skill:
   ```
   "Use superpowers:writing-plans to create an implementation plan
   for adding a user notification system with preferences."
   ```

2. Review and refine the generated plan

3. Ensure the plan has:
   - 3-5 stages (not too granular, not too vague)
   - Testable success criteria per stage
   - Clear dependencies
   - Reasonable scope per stage

## Part C: Validate Your Plan

**Task**: Check your plan against quality criteria.

Use this checklist:

| Criterion | Yes/No | If No, Fix |
|-----------|--------|------------|
| Each stage has a single clear goal | | |
| Success criteria are testable | | |
| Dependencies are explicit | | |
| Stages are independently completable | | |
| No stage is too large (>1 day) | | |
| No stage is too small (<2 hours) | | |
| Plan covers the full feature | | |
| Plan doesn't over-engineer | | |

## Part D: Compare Good vs. Bad Plans

**Task**: Identify plan anti-patterns.

**Bad Plan Example**:
```markdown
## Stage 1: Build the feature
- Add notifications
- Add preferences
- Add tests
- Deploy
```

**Questions**:
- What's wrong with this plan?
- How would you improve it?
- What would make each stage verifiable?

---

## Hints

<details>
<summary>Hint 1: Stage sizing</summary>

Good stage sizes:
- 2-8 hours of work
- Can be completed in one session
- Has a clear "done" state
- Results in something testable
</details>

<details>
<summary>Hint 2: Success criteria</summary>

Good criteria are:
- Binary (done or not done)
- Observable (can verify completion)
- Specific (not vague like "works well")

Example:
- ❌ "Notifications work"
- ✅ "API returns 200 for POST /notifications"
</details>

<details>
<summary>Hint 3: Dependency tracking</summary>

Dependencies should be:
- Explicit (Stage 3 depends on Stage 2)
- Minimal (avoid chains if possible)
- Real (don't create false dependencies)
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Sample Notification Plan

```markdown
# IMPLEMENTATION_PLAN.md: User Notifications

## Stage 1: Data Model
**Goal**: Database schema for notifications and preferences
**Success Criteria**:
- [ ] Migration creates notifications table
- [ ] Migration creates notification_preferences table
- [ ] Models defined with relationships
- [ ] Unit tests for models pass
**Dependencies**: None
**Status**: Not Started

## Stage 2: Notification Service
**Goal**: Backend service to create and query notifications
**Success Criteria**:
- [ ] NotificationService.create() works
- [ ] NotificationService.getForUser() works
- [ ] NotificationService.markAsRead() works
- [ ] Service tests pass
**Dependencies**: Stage 1
**Status**: Not Started

## Stage 3: Preferences API
**Goal**: Users can view and update notification preferences
**Success Criteria**:
- [ ] GET /api/preferences returns user preferences
- [ ] PATCH /api/preferences updates preferences
- [ ] Default preferences set for new users
- [ ] API tests pass
**Dependencies**: Stage 1
**Status**: Not Started

## Stage 4: Notification API
**Goal**: API endpoints for notification operations
**Success Criteria**:
- [ ] GET /api/notifications returns user's notifications
- [ ] POST /api/notifications/mark-read works
- [ ] Pagination implemented
- [ ] API tests pass
**Dependencies**: Stage 2, Stage 3
**Status**: Not Started

## Stage 5: Integration & Polish
**Goal**: End-to-end functionality verified
**Success Criteria**:
- [ ] Integration tests pass
- [ ] Documentation updated
- [ ] No console errors in production mode
- [ ] Code review approved
**Dependencies**: Stage 4
**Status**: Not Started
```

### Why This Plan Works

1. **Clear stages**: Each does one thing
2. **Testable criteria**: Each criterion can be verified
3. **Right-sized**: Stages are 2-4 hours each
4. **Minimal dependencies**: Only real dependencies listed
5. **Complete coverage**: All aspects of feature included

### Bad Plan Problems

The bad plan example fails because:
- Single stage for everything = no progress visibility
- No success criteria = no way to know when done
- No dependencies = no order guidance
- Too vague = scope creep likely

### Key Insight

A plan is a contract with yourself. Good success criteria prevent "it's almost done" that lasts forever.

</details>

---

## Reflection Questions

1. How does writing criteria upfront change how you think about implementation?
2. What's the cost of too many stages vs. too few?
3. How would you update a plan when requirements change?

---

**Next**: [Exercise 2: Execute Plan in Batches](exercise-2.md)
