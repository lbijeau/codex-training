# Exercise 5: Root Cause Analysis

## Objective

Practice finding root causes of issues, not just symptoms.

## Background

Root cause analysis asks "Why?" repeatedly until you find the underlying issue. Fixing symptoms means problems recur; fixing root causes prevents recurrence.

## Part A: The 5 Whys Technique

**Task**: Practice asking why repeatedly.

**Scenario**: Production error rate spiked at 3 AM.

**Surface analysis**:
> "The database connection timed out. We'll increase the timeout."

**5 Whys analysis**:

1. **Why** did requests fail?
   → Database connection timed out

2. **Why** did connection time out?
   → Database was under heavy load

3. **Why** was database under heavy load?
   → Nightly backup job ran during peak Asian timezone usage

4. **Why** did backup run during peak usage?
   → Scheduled for "3 AM" without considering global users

5. **Why** wasn't global traffic considered?
   → Monitoring doesn't show traffic by timezone

**Root cause**: Lack of timezone-aware scheduling and monitoring

**Real fix**: Implement off-peak detection based on actual traffic, not clock time

## Part B: Analyze a Code Bug's Root Cause

**Task**: Trace a bug to its source.

**Scenario**: Users can see other users' private data.

**Create the bug**:
```javascript
// practice/scratch/documents.js
async function getDocument(documentId) {
  // Bug: No ownership check!
  const doc = await db.documents.findById(documentId);
  return doc;
}

async function listUserDocuments(userId) {
  return db.documents.find({ ownerId: userId });
}
```

**5 Whys**:
1. **Why** can users see others' documents?
   → getDocument doesn't check ownership

2. **Why** doesn't it check ownership?
   → Developer assumed documentId was private

3. **Why** was documentId assumed private?
   → It's a UUID, "hard to guess"

4. **Why** rely on "hard to guess"?
   → No security review required for internal APIs

5. **Why** no security review?
   → Process only requires it for "public" endpoints

**Root cause**: Security review process doesn't cover all data access paths

**Real fix**: Authorization check at data layer + process update

## Part C: Systematic Root Cause Template

**Task**: Create a reusable RCA document.

```markdown
# Root Cause Analysis: [Issue Name]

## Incident Summary
**Date**: [When]
**Duration**: [How long]
**Impact**: [Who affected, how many]
**Severity**: [P1/P2/P3]

## Timeline
- [Time]: First symptoms observed
- [Time]: Issue identified
- [Time]: Fix deployed
- [Time]: Verified resolved

## 5 Whys Analysis
1. Why? [Symptom] → [Answer]
2. Why? [Answer 1] → [Answer]
3. Why? [Answer 2] → [Answer]
4. Why? [Answer 3] → [Answer]
5. Why? [Answer 4] → [Root Cause]

## Root Cause
[Clear statement of the underlying issue]

## Contributing Factors
- [Factor 1]
- [Factor 2]

## Immediate Fix
[What was done to stop the bleeding]

## Permanent Fix
[What will prevent recurrence]

## Action Items
- [ ] [Action 1] - Owner - Due Date
- [ ] [Action 2] - Owner - Due Date
- [ ] [Action 3] - Owner - Due Date

## Lessons Learned
- [What we learned]
- [What we'll do differently]
```

## Part D: Practice on Real Scenarios

**Task**: Apply RCA to these scenarios.

**Scenario 1**: Deployment failed in production but worked in staging
- Find 5 whys
- Identify root cause
- Propose permanent fix

**Scenario 2**: Feature released but users complain it doesn't work
- Find 5 whys
- Identify root cause
- Propose permanent fix

**Scenario 3**: Performance degraded gradually over 3 months
- Find 5 whys
- Identify root cause
- Propose permanent fix

---

## Hints

<details>
<summary>Hint 1: When to stop asking why</summary>

Stop when you reach:
- A process failure (can be fixed by changing process)
- A system design flaw (can be fixed by redesign)
- A human factors issue (can be fixed by training/tooling)

Don't stop at: "Someone made a mistake"
</details>

<details>
<summary>Hint 2: Avoiding blame</summary>

Root cause is not a person.
"Developer didn't check" → Why didn't the system require checks?
"QA missed it" → Why didn't tests catch it?

Focus on systems and processes, not individuals.
</details>

<details>
<summary>Hint 3: Multiple root causes</summary>

Complex incidents often have multiple root causes:
- Technical failure AND
- Process gap AND
- Communication breakdown

Identify all, prioritize by impact and fixability.
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Scenario 1: Deploy Failed in Prod

**5 Whys**:
1. Deployment failed → Missing environment variable
2. Missing env var → Not in production config
3. Not in config → Added to staging, forgot prod
4. Forgot prod → No checklist for new configs
5. No checklist → Deploy process doesn't verify config parity

**Root cause**: No automated config parity check between environments

**Fix**: Add CI step that compares config schemas across environments

### Scenario 2: Feature Doesn't Work

**5 Whys**:
1. Doesn't work → Feature flag still off in production
2. Flag off → Not included in release process
3. Not in process → Separate systems for code and flags
4. Separate systems → Historical reasons, never unified
5. Never unified → No one owns the full release process

**Root cause**: Fragmented release process with no single owner

**Fix**: Unified release checklist, single owner per release

### Scenario 3: Gradual Performance Degradation

**5 Whys**:
1. Performance degraded → Query times increased
2. Query times up → Table grew from 1M to 50M rows
3. Table grew → No data archival strategy
4. No archival → Not planned in original design
5. Not in design → Performance requirements weren't specified

**Root cause**: Missing non-functional requirements in design phase

**Fix**: Add performance budget to design template, regular monitoring

### Common Root Cause Categories

| Category | Example | Fix Type |
|----------|---------|----------|
| Process gap | No review required | Add review step |
| Tool limitation | Can't detect issue | Add tooling |
| Communication | Teams didn't sync | Add sync point |
| Design flaw | Architecture doesn't scale | Redesign |
| Knowledge gap | Didn't know best practice | Training |

### Key Insight

Root causes are almost never "someone made a mistake."

They're almost always:
- A system that allowed the mistake
- A process that didn't catch the mistake
- A tool that didn't prevent the mistake

Fix the system, not the symptom.

### Pattern: RCA → Prevention

```
Incident → Symptoms → 5 Whys → Root Cause → System Fix → Prevention
             │                     │
             ▼                     ▼
        Immediate fix          Permanent fix
        (stop bleeding)        (prevent recurrence)
```

</details>

---

## Reflection Questions

1. How often does your team do formal root cause analysis?
2. What's the difference between a good RCA and a blame session?
3. How do you track whether RCA action items are completed?

---

## Module 5 Complete!

You've learned:
- Multi-layer review workflows
- Test-driven development practice
- Systematic debugging techniques
- Quality gate implementation
- Root cause analysis methodology

**Next Module**: [Module 6: Domain-Specific Patterns](../../modules/06-domain.md)
