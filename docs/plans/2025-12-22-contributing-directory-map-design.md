# CONTRIBUTING Directory Map Design

**Goal:** Align CONTRIBUTING.md directory map and path references with the current repo layout.

**Scope:**
- `CONTRIBUTING.md`

**Out of Scope:**
- Changing repository structure
- Adding new contribution guidance

## Approach

- Keep the directory tree high-level but accurate.
- Update any stale path names to match existing directories.
- Ensure `docs/maintainers/` is described correctly and consistently.
- Verify all referenced paths exist via `rg --files`.

## Verification

- All paths in the tree exist in the repo.
- No dead links or stale directory names remain in `CONTRIBUTING.md`.
