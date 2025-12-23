# Program Naming Normalization Design

**Goal:** Standardize the program name to "Codex CLI Mastery Program" across README, GETTING_STARTED, and CONTRIBUTING.

**Scope:**
- `README.md`
- `GETTING_STARTED.md`
- `CONTRIBUTING.md`

**Out of Scope:**
- File renames or structural changes

## Approach

- Use `rg` to find "CLI Mastery" and "Code Mastery" occurrences in scope.
- Replace any "Codex Code Mastery Program" occurrences with "Codex CLI Mastery Program".
- Keep already-correct references unchanged.

## Verification

- `rg -n "CLI Mastery|Code Mastery" README.md GETTING_STARTED.md CONTRIBUTING.md`
- Only "Codex CLI Mastery Program" remains.
