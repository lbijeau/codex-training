# Exercise 2: Invoke Skills for Planning

## Objective

Practice using planning skills to break down a feature into an implementation plan.

## Background

Planning skills help you structure complex work before writing code. The `brainstorming` and `writing-plans` skills guide you through requirements refinement and plan creation.

## Part A: Use Brainstorming Skill

**Task**: Refine a vague feature request into clear requirements.

1. Start a Codex session in the practice workspace:
   ```bash
   cd practice/scratch
   codex
   ```

2. Present this vague feature request:
   ```
   "I need to add a way for users to reset their passwords.
   Use superpowers:brainstorming to refine this idea."
   ```

3. Engage with the questions Codex asks

**Questions to Answer**:
- What clarifying questions did the brainstorming skill surface?
- Did it identify requirements you hadn't considered?
- How many rounds of refinement did it take?

## Part B: Create an Implementation Plan

**Task**: Convert refined requirements into a structured plan.

1. After brainstorming, ask:
   ```
   "Now use superpowers:writing-plans to create an implementation plan
   for the password reset feature we just discussed."
   ```

2. Review the generated IMPLEMENTATION_PLAN.md

**Checklist for the Plan**:
- [ ] Has clear stages/phases
- [ ] Each stage has success criteria
- [ ] Dependencies between stages are identified
- [ ] Testable outcomes are defined
- [ ] Estimated scope is reasonable

## Part C: Compare With and Without Skills

**Task**: See the difference skills make.

1. Start a fresh session (or use `/clear`)

2. Ask the same question WITHOUT the skill:
   ```
   "I need to add password reset functionality. What should I build?"
   ```

3. Compare the responses

**Questions to Answer**:
- How structured was the non-skill response vs. the skill-guided one?
- Did the skill version surface more considerations?
- Which approach would lead to better implementation?

---

## Hints

<details>
<summary>Hint 1: Engaging with brainstorming</summary>

The brainstorming skill works best when you answer its questions. Don't just say "yes" to everything - provide real constraints:
- "Email link, not SMS"
- "Token expires in 1 hour"
- "Rate limit 3 requests per hour"
</details>

<details>
<summary>Hint 2: Plan structure</summary>

A good implementation plan has:
- 3-5 stages (not too many, not too few)
- Each stage independently completable
- Clear "done" criteria per stage
</details>

<details>
<summary>Hint 3: If the skill doesn't trigger</summary>

Be explicit: "Use superpowers:writing-plans" not just "create a plan"
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Brainstorming Should Surface

A good brainstorming session for password reset would surface questions like:
- **Delivery method**: Email link? SMS code? Both?
- **Token expiration**: How long should reset links be valid?
- **Rate limiting**: How many reset requests per time period?
- **Session handling**: Invalidate existing sessions after reset?
- **Notification**: Notify user of successful reset?
- **Security**: Log reset attempts? Detect suspicious patterns?

### Plan Structure Example

```markdown
# IMPLEMENTATION_PLAN.md

## Stage 1: Database & Models
**Goal**: Secure token storage
**Success Criteria**:
- [ ] Migration creates password_reset_tokens table
- [ ] Token model with expiry validation
- [ ] Tests for token lifecycle

## Stage 2: Request Flow
**Goal**: Users can request password reset
**Success Criteria**:
- [ ] POST /auth/forgot-password endpoint
- [ ] Rate limiting (3/hour per email)
- [ ] Email sent with secure link
- [ ] Tests for success and rate limiting

## Stage 3: Reset Flow
**Goal**: Users can set new password
**Success Criteria**:
- [ ] Token validation endpoint
- [ ] Password update with requirements
- [ ] Existing sessions invalidated
- [ ] Tests for all scenarios
```

### Without Skills vs. With Skills

**Without skills**: Typically get a list of steps or immediate code suggestions without exploring requirements.

**With skills**: Systematic exploration of requirements, edge cases, and structured deliverables.

### Key Insight

Skills don't just organize your work - they surface considerations you'd otherwise miss until implementation.

</details>

---

## Reflection Questions

1. What requirements did brainstorming surface that you hadn't initially considered?
2. How would the plan help you estimate effort for this feature?
3. When would you skip brainstorming and go straight to planning?

---

**Next**: [Exercise 3: Practice the 3-Attempt Rule](exercise-3.md)
