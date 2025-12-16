# Module 5: Planning & Execution

## Overview

Master the art of breaking down complex tasks and executing them systematically.

**Learning Objectives**:
- Write effective implementation plans
- Execute plans in controlled batches
- Track progress with TodoWrite
- Handle ambiguity and pivots
- Decompose features effectively

**Time**: 2-3 hours

---

## 1. Writing Effective Plans

### Why Plan?

**Planning prevents**:
- Missing requirements
- Overlooking edge cases
- Architectural mistakes
- Scope creep
- Context overload

### Plan Structure

**IMPLEMENTATION_PLAN.md**:
```markdown
# Feature: [Name]

## Overview
[What we're building and why]

## Stage 1: [Name]
**Goal**: [Specific deliverable]
**Success Criteria**:
- [ ] Criterion 1
- [ ] Criterion 2

**Tests**:
- [ ] Test scenario 1
- [ ] Test scenario 2

**Files to Modify**:
- src/feature.ts
- tests/feature.test.ts

**Status**: Not Started

---

## Stage 2: [Name]
...

## Stage 3: [Name]
...
```

### Planning Principles

1. **3-5 Stages**: Not too granular, not too coarse
2. **Clear Goals**: Each stage has specific deliverable
3. **Testable**: Define success criteria
4. **Incremental**: Each stage builds on previous
5. **Documented**: Update status as you progress

### Using superpowers:writing-plans

```
"Use superpowers:writing-plans to create an implementation plan for:
[Feature description]"

The skill will:
- Break down into stages
- Identify files to modify
- Define success criteria
- Create testable milestones
```

---

## 2. Plan-Execute Workflows

### The Plan-Execute Pattern

```
1. PLAN Phase
   - Understand requirements
   - Design approach
   - Break into stages
   - Document in IMPLEMENTATION_PLAN.md

2. REVIEW Phase
   - Review plan with user/team
   - Adjust based on feedback
   - Finalize approach

3. EXECUTE Phase
   - Implement stage 1
   - Update plan status
   - Review/test
   - Move to stage 2
   - Repeat

4. COMPLETE Phase
   - All stages done
   - Final review
   - Remove IMPLEMENTATION_PLAN.md
```

### Using superpowers:executing-plans

```
"Use superpowers:executing-plans to execute the plan in
IMPLEMENTATION_PLAN.md"

The skill will:
- Load the plan
- Execute tasks in batches
- Review between batches
- Update status
- Report progress
```

### Batch Execution Pattern

**Why Batches?**:
- Controlled progress
- Review checkpoints
- Catch issues early
- Adjust course if needed

**Batch Size**:
- Small batches: 2-3 related tasks
- Review after each batch
- Adjust plan if needed

---

## 3. Progress Tracking with TodoWrite

### TodoWrite Best Practices

**Structure**:
```javascript
{
  "content": "Imperative form (what to do)",
  "activeForm": "Present continuous (what's happening)",
  "status": "pending" | "in_progress" | "completed"
}
```

**Example**:
```javascript
[
  {
    "content": "Implement user authentication",
    "activeForm": "Implementing user authentication",
    "status": "in_progress"
  },
  {
    "content": "Add tests for auth flow",
    "activeForm": "Adding tests for auth flow",
    "status": "pending"
  }
]
```

### Todo Management Patterns

**Pattern 1: Stage-Based**
```
Create todos for current stage:
- [ ] Stage 1: Design database schema
  - [ ] Create migrations
  - [ ] Add models
  - [ ] Write tests

When stage 1 done, add stage 2 todos
```

**Pattern 2: Incremental**
```
Start with high-level todos:
- [ ] Plan feature
- [ ] Implement core
- [ ] Add tests
- [ ] Review

Break down as you go:
- [x] Plan feature
- [ ] Implement core
  - [in_progress] Create API endpoint
  - [pending] Add validation
  - [pending] Handle errors
```

**Pattern 3: Parallel Tracking**
```
Track multiple independent workstreams:
- [in_progress] Frontend: Add UI
- [pending] Backend: Add API
- [pending] Tests: Integration tests
- [pending] Docs: Update README
```

### Todo Anti-Patterns

❌ **Too Granular**: "Type import statement" - too detailed
❌ **Too Vague**: "Fix the bug" - not specific
❌ **Not Updating**: Todos out of sync with reality
❌ **Batch Completing**: Mark complete immediately after done

---

## 4. Handling Ambiguity

### When Requirements Are Unclear

**Pattern: Clarify Before Implementing**
```
1. Identify ambiguity
2. List possible interpretations
3. Ask user to clarify
4. Update plan based on answer
5. Proceed with implementation
```

**Using AskUserQuestion**:
```
When approach is unclear:

{
  "questions": [{
    "question": "Which authentication method should we use?",
    "header": "Auth method",
    "options": [
      {
        "label": "JWT tokens",
        "description": "Stateless, scales well"
      },
      {
        "label": "Session-based",
        "description": "More secure, server-side state"
      },
      {
        "label": "OAuth only",
        "description": "Delegate to third party"
      }
    ]
  }]
}
```

### When Plan Needs Adjustment

**Pivot Pattern**:
```
1. Recognize plan not working
2. Stop and assess
3. Identify what changed
4. Update plan
5. Resume execution
```

**Common Pivot Triggers**:
- Discovered complexity not in plan
- Requirements changed
- Technical constraint discovered
- Better approach identified

**How to Pivot**:
```
1. Update IMPLEMENTATION_PLAN.md
2. Mark current stage status
3. Add/modify stages as needed
4. Update TodoWrite
5. Continue from adjusted plan
```

---

## 5. Feature Decomposition

### Decomposition Frameworks

**Framework 1: By Layer**
```
Feature: User Dashboard

Layers:
1. Database: Schema, migrations
2. API: Endpoints, validation
3. Business Logic: Processing, rules
4. Frontend: UI components
5. Tests: Unit, integration, E2E
```

**Framework 2: By User Journey**
```
Feature: Checkout Flow

Journey:
1. View cart
2. Enter shipping info
3. Select payment method
4. Review order
5. Confirm and pay
6. View confirmation
```

**Framework 3: By Risk**
```
Feature: Payment Processing

By Risk (highest first):
1. Payment integration (critical, risky)
2. Error handling (critical)
3. User notifications (important)
4. Analytics tracking (nice-to-have)
```

**Framework 4: By Dependency**
```
Feature: Recommendation Engine

By Dependency:
1. Data collection (foundation)
2. Preprocessing (depends on #1)
3. Model training (depends on #2)
4. API integration (depends on #3)
5. UI display (depends on #4)
```

### Choosing a Framework

| Situation | Framework | Why |
|-----------|-----------|-----|
| New full-stack feature | By Layer | Clear separation |
| User-facing feature | By User Journey | User perspective |
| Complex integration | By Risk | Tackle hard parts first |
| Sequential work | By Dependency | Natural order |

---

## 6. Planning Patterns Library

### Pattern: Design-First

**When**: Complex features, architectural impact

**Process**:
```bash
# 1. Refine requirements through exploration
codex "Explore the codebase and help me understand what's needed for [feature]"

# 2. Design architecture
codex "Based on what we learned, design the architecture for [feature]"

# 3. Write detailed plan
codex "Create an IMPLEMENTATION_PLAN.md with stages, success criteria, and tests"

# 4. Review with team/user before executing

# 5. Execute plan following the stages
```

### Pattern: Spike-Then-Plan

**When**: Unknowns, new technology, unclear complexity

**Process**:
```
1. Quick spike to explore (time-boxed)
2. Document findings
3. Create plan based on learnings
4. Execute refined plan
```

### Pattern: Incremental Elaboration

**When**: Large features, evolving requirements

**Process**:
```
1. High-level plan (3-5 stages)
2. Implement stage 1
3. Elaborate plan for stage 2 based on learnings
4. Implement stage 2
5. Continue incrementally
```

### Pattern: Parallel Workstreams

**When**: Independent components, multiple developers

**Process**:
```
1. Decompose into independent pieces
2. Create plan for each workstream
3. Coordinate integration points
4. Execute in parallel
5. Integrate at defined points
```

---

## Key Takeaways

1. **Plan First**: Especially for complex/multi-file changes
2. **3-5 Stages**: Break work into manageable chunks
3. **TodoWrite Always**: Track progress in real-time
4. **Clarify Ambiguity**: Ask before assuming
5. **Pivot When Needed**: Update plan as you learn

---

## Next Steps

1. Complete [Module 5 Exercises](../exercises/05-planning/)
2. Practice writing plans for complex features
3. Execute a plan with batch review
4. Handle a pivot mid-implementation

---

## Quick Reference

### Plan Structure
- 3-5 stages
- Clear goals per stage
- Success criteria
- Test scenarios
- Status tracking

### Execution
- Plan → Review → Execute → Complete
- Batch execution with reviews
- Update status as you go
- TodoWrite for real-time tracking

### Handling Ambiguity
- AskUserQuestion for clarification
- List options with tradeoffs
- Get decision before proceeding
- Update plan based on answer

### Decomposition
- By Layer: Full-stack features
- By User Journey: User-facing features
- By Risk: Complex integrations
- By Dependency: Sequential work

---

**Plan systematically!** Head to [Exercise 1](../exercises/05-planning/exercise-1.md)
