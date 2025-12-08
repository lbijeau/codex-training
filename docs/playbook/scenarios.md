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

**Scenario**: I want Codex to know about static analysis findings before refactoring
**Approach**: Run `bash scripts/run_static_checks.sh`, record the outputs in `docs/templates/static-analysis-report.md`, and paste the summarized bullets into the prompt along with helper names.
**Why**: Keeps Codex focused on the previously flagged duplicates, complexity spikes, or forbidden imports without rehashing the entire diff.
**See**: [Static Analysis Report Template](../templates/static-analysis-report.md)

<!-- Example:
**Scenario**: [Description]
**Approach**: [What to do]
**Why**: [Reasoning]
**See**: [Link]
-->
