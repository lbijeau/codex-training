# Training Readiness (P0 Docs Accuracy) Design

**Goal:** Fix P0 documentation accuracy issues for Codex CLI commands/flags and AGENTS.md permissions guidance, verified against Codex CLI v0.77.0.

**Scope:**
- Issue #48: `docs/modules/01-getting-started.md`, `README.md`, `GETTING_STARTED.md`
- Issue #49: `docs/modules/09-api-customization.md`, `docs/exercises/02-skills/exercise-1.md`

**Out of Scope:**
- Non-P0 issues in epic #47 (paths, exercises, naming normalization)
- Broad repo reorganization or new documentation structures

## Approach

### #48 Audit & Pin CLI Commands/Flags/Version
- Inventory CLI command/flag mentions in scope and compare with `codex --help` and `codex --version`.
- Update command names to match the CLI (e.g., `codex login` instead of `codex auth login`).
- Keep examples to verified commands/flags only; remove or generalize any unverified model IDs.
- Add or update “Verified with Codex CLI v0.77.0.” notes next to examples.

### #49 Correct AGENTS.md Permissions/Config Claims
- Ensure AGENTS.md is described as instructions/context only, not a permissions mechanism.
- Clarify configuration location for approval/sandbox (CLI flags or `~/.codex/config.toml`).
- Confirm precedence: project `AGENTS.md` overrides global `~/.codex/AGENTS.md`.
- Add or update “Verified with Codex CLI v0.77.0.” notes in affected sections.

## Verification
- Run `codex --help` and confirm all referenced commands/flags appear.
- Run `codex --version` to pin the verified version.
- Manually check that no statement implies AGENTS.md grants permissions or stores approval trust.

## Success Criteria
- All updated examples match CLI help output.
- Version pins updated to v0.77.0 in all touched files.
- No permissions/config claims remain in AGENTS.md guidance.
