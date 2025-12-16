# Exercise 3: Handle Ambiguity Through Clarification

## Objective

Learn to identify and resolve ambiguity before implementation begins.

## Background

Vague requirements lead to rework. The brainstorming skill surfaces ambiguity early, but you need to recognize when to pause and ask for clarification.

## Part A: Spot Ambiguous Requirements

**Task**: Identify what's unclear in these requirements.

**Requirement 1**:
> "The search should be fast"

**Questions to Surface**:
- How fast is "fast"? (<100ms? <1s?)
- Fast for what data size?
- Fast for how many concurrent users?

**Requirement 2**:
> "Users can upload files"

**Questions to Surface**:
- What file types are allowed?
- What's the maximum file size?
- Where are files stored?
- Who can access uploaded files?

**Requirement 3**:
> "The app should work offline"

**Questions to Surface**:
- What features work offline?
- How is data synced when back online?
- What happens to conflicts?
- How much data is cached?

## Part B: Practice Clarification Dialogue

**Task**: Use brainstorming to surface ambiguity.

1. Present this requirement to Codex:
   ```
   "I need to add user roles to my app. Admins should be able to
   do more than regular users. Use superpowers:brainstorming to
   help me clarify the requirements."
   ```

2. Engage with each question fully:
   - Don't answer "yes" to everything
   - Add real constraints
   - Admit what you don't know yet

3. Document the clarified requirements

**Expected Topics to Cover**:
- What roles exist?
- What can each role do?
- How are roles assigned?
- Can roles be changed?
- Are roles hierarchical?
- What about role combinations?

## Part C: Know When to Pause

**Task**: Recognize signals that clarification is needed.

**Scenario**: You're midway through implementing a feature and realize:
- "I don't know if this should be synchronous or asynchronous"
- "I'm not sure what should happen when X fails"
- "The design doesn't cover this edge case"

**Practice Response**:
1. Stop implementation
2. Document the ambiguity clearly
3. Ask for clarification before continuing

**Write a Clarification Request**:
```markdown
## Clarification Needed

**Context**: Implementing user roles feature, Stage 2

**Ambiguity**: When a user's role is changed from admin to regular,
what should happen to admin-only resources they created?

**Options**:
A. Transfer ownership to another admin
B. Keep the resources but restrict access
C. Delete the resources
D. Something else?

**Impact**: Can't complete Stage 2 until resolved

**My Recommendation**: Option B because [reason]
```

## Part D: Prevent Ambiguity in Plans

**Task**: Write a plan that anticipates and addresses ambiguity.

Create a plan section that explicitly handles unknowns:

```markdown
## Known Unknowns

| Question | Options | Default If Not Clarified |
|----------|---------|--------------------------|
| Max file size? | 5MB / 10MB / 50MB | 10MB |
| Sync frequency? | Real-time / 5min / Manual | 5min |
| Error notification? | Toast / Email / Both | Toast |

## Out of Scope (Explicitly)
- Multi-language support
- Mobile app version
- Advanced analytics
```

---

## Hints

<details>
<summary>Hint 1: Ambiguity signals</summary>

You're facing ambiguity when you think:
- "I'll assume X" (why not ask?)
- "This probably means Y" (probably isn't certainly)
- "I'll do it this way for now" (for now = technical debt)
</details>

<details>
<summary>Hint 2: Good clarification questions</summary>

Structure questions to get clear answers:
- Present options, not open-ended questions
- Explain trade-offs of each option
- Offer a recommendation
- State what you'll assume if no answer
</details>

<details>
<summary>Hint 3: When to stop and ask</summary>

Stop if:
- Implementation choice significantly affects user experience
- Wrong choice would require major rework
- Multiple valid approaches exist
- Edge cases aren't covered by requirements
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Part A: Surfaced Ambiguities

**"Search should be fast"**:
- Latency target: p95 < 200ms
- Data size: Up to 100k records
- Concurrent users: Up to 1000
- Acceptable degradation: Show partial results after 200ms

**"Users can upload files"**:
- Types: Images (jpg, png), Documents (pdf, docx)
- Size: Max 10MB per file, 100MB total per user
- Storage: S3 with CDN
- Access: Public files, private files, shared with link

**"Work offline"**:
- Features: Read existing data, create drafts
- Sync: On reconnection, last-write-wins
- Conflicts: Notify user, keep both versions
- Cache: Last 100 items, 50MB max

### Part B: Role Clarification

Good clarification dialogue:

**Q**: What roles exist?
**A**: Admin, Editor, Viewer

**Q**: Is the hierarchy strict (Admin > Editor > Viewer)?
**A**: Yes, higher roles can do everything lower roles can

**Q**: How are roles assigned?
**A**: Admins assign roles through admin panel

**Q**: Can a user have multiple roles?
**A**: No, one role per user

**Q**: What happens to resources when role changes?
**A**: Resources keep their permissions, only new actions are restricted

### Part C: Good Clarification Request Format

```markdown
## Clarification Needed

**Context**: [Where you are in the work]

**Ambiguity**: [Specific unclear requirement]

**Options**:
A. [Option with pro/con]
B. [Option with pro/con]
C. [Option with pro/con]

**Impact**: [What happens if not resolved]

**Recommendation**: [Your best guess with reasoning]

**Default**: [What you'll do if no response by X date]
```

### Part D: Documenting Unknowns

The "Known Unknowns" section prevents:
- Silent assumptions
- Inconsistent decisions
- Scope creep
- Rework from wrong guesses

### Key Insight

The cost of asking is small. The cost of assuming wrong is large.

**Time to clarify upfront**: 5 minutes
**Time to fix wrong assumption**: 2-8 hours

### Pattern: Clarification-First

```
1. Read requirements
2. List all assumptions
3. Surface assumptions as questions
4. Get answers before implementing
5. Document resolved questions in plan
6. Start implementation with clarity
```

</details>

---

## Reflection Questions

1. What's your instinct when facing ambiguity - ask or assume?
2. How would you balance the cost of asking vs. the risk of assuming?
3. What makes some teams better at surfacing ambiguity than others?

---

**Next**: [Exercise 4: Pivot Mid-Implementation](exercise-4.md)
