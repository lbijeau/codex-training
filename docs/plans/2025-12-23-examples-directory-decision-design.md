# Examples Directory Decision Design

**Goal:** Keep `examples/` and make it discoverable without duplicating module content.

**Scope:**
- `examples/README.md`
- `docs/maintainers/README.md`
- `README.md` and/or `GETTING_STARTED.md`

**Out of Scope:**
- Moving example content into modules
- Removing `examples/`

## Approach

- Fix the broken examples link in `docs/maintainers/README.md` to point to `examples/README.md`.
- Add a short, optional mention in the main `README.md` (and only there, unless a better fit emerges) pointing to `examples/` as supplemental worked examples.
- Avoid duplicating guidance already in `docs/maintainers/patterns/`.

## Verification

- `rg -n "examples/" README.md GETTING_STARTED.md docs/maintainers/README.md` shows correct links.
- `examples/README.md` exists and lists the example files.
