# Exercise 4: Pivot Mid-Implementation

## Objective

Learn to handle requirement changes gracefully without losing progress.

## Background

Requirements change. A good plan makes pivoting manageable by having clear stages and success criteria that can be adjusted without starting over.

## Part A: Recognize Pivot Triggers

**Task**: Identify when a pivot is needed vs. when to stay the course.

**Scenario 1**: After Stage 2 of 4, stakeholder says:
> "Actually, we need this to support mobile too"

**Questions**:
- Is this a pivot or scope addition?
- Should you stop current work?
- How do you update the plan?

**Scenario 2**: After Stage 1 of 3, you discover:
> "The library we planned to use is deprecated"

**Questions**:
- Is this a pivot or obstacle?
- Can you continue with a different library?
- What stages are affected?

**Scenario 3**: Midway through Stage 2, PM says:
> "The deadline moved up by 2 weeks"

**Questions**:
- What can be cut vs. what's essential?
- How do you re-prioritize stages?
- What's the minimum viable delivery?

## Part B: Practice Plan Updates

**Task**: Update a plan based on changing requirements.

**Original Plan**:
```markdown
## Stage 1: Backend API ✅ Complete
## Stage 2: Web Frontend (In Progress)
## Stage 3: Notifications
## Stage 4: Analytics Dashboard
## Stage 5: Documentation
```

**New Requirement**:
> "We just signed a deal. They need the analytics dashboard
> in 1 week. Everything else can wait."

**Your Task**:
1. Reorder/restructure stages
2. Identify what can be deferred
3. Determine minimum for Stage 2 to support analytics
4. Create updated plan

## Part C: Salvage Work During Pivot

**Task**: Practice preserving completed work when direction changes.

**Scenario**:
You've completed:
- User authentication system
- Basic CRUD for users
- Email notification system

**Pivot**:
> "We're changing from B2C to B2B. Multiple users per organization."

**Analysis**:
| Completed Work | Salvageable? | Changes Needed |
|----------------|--------------|----------------|
| Authentication | Yes | Add organization context |
| User CRUD | Partial | Add organization association |
| Notifications | Yes | Minor changes for org context |

**Task**: Write the plan update that:
1. Acknowledges completed work
2. Identifies required changes
3. Adds new stages for B2B features
4. Minimizes rework

## Part D: Communicate Pivot Impact

**Task**: Write a pivot summary for stakeholders.

When requirements change, communicate:

```markdown
## Pivot Summary

**Trigger**: [What changed]

**Impact Assessment**:
- Completed work: [What's salvageable]
- Work in progress: [What happens to current stage]
- Planned work: [What changes]

**New Timeline**:
- Original estimate: X weeks
- Revised estimate: Y weeks
- Difference: Z weeks (+/-)

**Trade-offs**:
- To maintain timeline, we can: [options]
- To maintain scope, we need: [more time/resources]

**Recommendation**: [Your suggested path]
```

---

## Hints

<details>
<summary>Hint 1: Pivot vs. scope creep</summary>

**Pivot**: Fundamental direction change, often from stakeholders
**Scope creep**: Gradual addition of "just one more thing"

Pivots are sometimes necessary. Scope creep is always a problem.
</details>

<details>
<summary>Hint 2: Salvage criteria</summary>

Work is salvageable if:
- Core logic still applies
- Changes are additive, not rewrite
- Tests can be adapted, not rewritten
- Architecture supports new direction
</details>

<details>
<summary>Hint 3: Communicating changes</summary>

Be specific about:
- What changes
- Why it changes the timeline
- What options exist
- What you recommend
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Part A: Pivot Analysis

**Scenario 1 (Mobile support)**:
- Type: Scope addition, not pivot
- Action: Add new stages, don't stop current
- Plan update: Add Stage 5+ for mobile, continue current stages

**Scenario 2 (Deprecated library)**:
- Type: Obstacle requiring adjustment
- Action: Research alternatives, update affected stages
- Plan update: May need to revisit Stage 1, update dependencies

**Scenario 3 (Deadline moved)**:
- Type: Constraint change
- Action: Re-prioritize, identify MVPAction: Re-prioritize, identify MVP
- Plan update: Reorder by priority, defer non-essential stages

### Part B: Analytics-First Reordering

```markdown
## Revised Plan (Analytics Priority)

## Stage 1: Backend API ✅ Complete

## Stage 2a: Minimal Web (Support for Analytics)
**Scope**: Just enough frontend to display analytics
**Success Criteria**:
- [ ] Basic auth flow works
- [ ] Can navigate to analytics
**Timeline**: 2 days

## Stage 3: Analytics Dashboard (PRIORITY)
**Scope**: Full analytics implementation
**Success Criteria**:
- [ ] All required metrics displayed
- [ ] Charts render correctly
- [ ] Data updates in real-time
**Timeline**: 4 days

## Stage 4: Review & Deploy
**Success Criteria**:
- [ ] Stakeholder sign-off
- [ ] Production deployment
**Timeline**: 1 day

---
## Deferred Stages (Post-Deadline)

## Stage 5: Full Web Frontend
## Stage 6: Notifications
## Stage 7: Documentation
```

### Part C: B2B Pivot Plan

```markdown
## B2B Pivot Plan

### Completed Work Assessment

| Component | Status | B2B Changes |
|-----------|--------|-------------|
| Auth | ✅ Salvageable | Add org_id to tokens |
| User CRUD | ⚠️ Partial | Add organization FK |
| Notifications | ✅ Salvageable | Add org context |

### Updated Stages

## Stage 1: Organization Model (NEW)
- Create organizations table
- Organization CRUD
- Owner role concept

## Stage 2: User-Organization Link (MODIFY)
- Add organization_id to users
- Migrate existing users to default org
- Update user queries

## Stage 3: Multi-tenancy (NEW)
- Tenant isolation in queries
- Organization-scoped data access
- Cross-org access prevention

## Stage 4: B2B Features (NEW)
- Team management
- Role per organization
- Billing per organization
```

### Part D: Stakeholder Summary

```markdown
## Pivot Summary: B2C to B2B

**Trigger**: Strategic decision to target enterprise customers

**Impact Assessment**:
- Completed work: 80% salvageable with modifications
- Work in progress: User CRUD needs organization context
- Planned work: Notification system still valid, analytics deferred

**New Timeline**:
- Original estimate: 4 weeks
- Revised estimate: 6 weeks
- Difference: +2 weeks for multi-tenancy

**Trade-offs**:
- To maintain timeline: Ship without team management, add later
- To maintain full scope: Accept 2-week extension

**Recommendation**: Accept 2-week extension. Multi-tenancy done right
now prevents painful migration later.
```

### Key Insight

Pivots are not failures. They're responses to new information. The goal is to minimize waste while maximizing adaptation speed.

### Pattern: Graceful Pivot

```
1. Assess impact on completed work
2. Identify salvageable components
3. Define minimum changes needed
4. Reorder priorities based on new goals
5. Communicate clearly with options
6. Update plan and continue
```

</details>

---

## Reflection Questions

1. How do you emotionally handle pivots on work you've already completed?
2. What makes some pivots easier to handle than others?
3. How can you structure work to make pivots less costly?

---

## Module 4 Complete!

You've learned:
- How to write structured implementation plans
- How to execute plans in stages with reviews
- How to handle ambiguity through clarification
- How to pivot gracefully when requirements change

**Next Module**: [Module 5: Quality & Verification](../../modules/05-quality.md)
