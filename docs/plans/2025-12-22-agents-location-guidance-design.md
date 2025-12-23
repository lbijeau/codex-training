# AGENTS.md Location Guidance Design

**Goal:** Standardize AGENTS.md location and precedence wording across Module 9 and Module 2 exercises.

**Scope:**
- `docs/modules/09-api-customization.md`
- `docs/exercises/02-skills/*`

**Out of Scope:**
- Any changes to permissions/config behavior
- Non-AGENTS documentation

## Canonical Wording

"Project instructions live in `./AGENTS.md`. Global instructions live in `~/.codex/AGENTS.md`. Codex combines both, and project instructions take precedence."

## Plan

1. Add the canonical wording as the single precedence note in Module 9 under the AGENTS.md location section.
2. Update all AGENTS.md references in Module 9 to match the canonical wording.
3. Update Exercise 1 to include the canonical wording and link to Module 9 for details.
4. Update other Module 2 exercises to reference the canonical wording (no extra precedence statements).

## Verification

- `rg -n "AGENTS.md" docs/modules/09-api-customization.md docs/exercises/02-skills` shows only the canonical wording for precedence and consistent location wording.
- No conflicting statements about AGENTS.md location or precedence remain.
