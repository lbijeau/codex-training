# Scenarios

Quick answers to "When I need to X, what should I do?"

## Pattern

```
Scenario: [What you're trying to do]
Approach: [Quick guidance]
See: [Link to detailed pattern or checklist]
```

---

## Getting Started

This file will be populated as you discover patterns. After each module and exercise, add scenarios you've learned.

### Example Scenarios

**Scenario**: I need to read information from 5 different files
**Approach**: Request all 5 in parallel (single message)
**Why**: Saves context, reduces latency
**See**: [Parallel Execution Pattern](../patterns/speed/parallel-execution.md)

---

**Scenario**: I'm stuck on a bug after 3 attempts
**Approach**: Use `superpowers:systematic-debugging` skill
**Why**: Prevents guessing, ensures root cause analysis
**See**: [Systematic Debugging Checklist](checklists.md#systematic-debugging)

---

## Your Scenarios

Add your discovered scenarios below as you learn:

**Scenario**: Documenting a helper function for Codex
**Approach**: Use `docs/templates/helper-doc-template.md` to capture schema, usage, validation, then publish it under `docs/helpers/` and link it in `codex_helpers/README.md`
**Why**: Keeps helper contracts consistent and makes prompt reviews easier
**See**: [Helper Documentation Template](../templates/helper-doc-template.md)

<!-- Example:
**Scenario**: [Description]
**Approach**: [What to do]
**Why**: [Reasoning]
**See**: [Link]
-->
