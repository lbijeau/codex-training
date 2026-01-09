# Repository Guidelines

## Project Structure & Module Organization
- `docs/` is the primary content source; modules live in `docs/modules/`, exercises in `docs/exercises/`, training material in `docs/training/`, and maintainer references in `docs/maintainers/`.
- `practice/` is a scratch workspace for exercises; avoid landing long-term content here.
- `examples/` hosts code examples; `scripts/` contains helper utilities; `tests/` holds verification tests; `.codex-examples/` contains sample Codex config.

## Build, Test, and Development Commands
- `npm install` installs docs site dependencies.
- `npm run docs:dev` starts the VitePress dev server at `http://localhost:5173`.
- `npm run docs:build` builds the static site; `npm run docs:preview` serves the build locally.
- `python3 scripts/verify_exercises.py` validates exercise manifests and required headings.
- `python -m unittest discover -s tests` runs the Python verification tests.

## Coding Style & Naming Conventions
- Markdown: use ATX headers (`#`), fenced code blocks with language tags, and keep lines ≤100 chars when practical.
- Lists: pick one bullet style per file (use `-` by default).
- Filenames: lowercase with hyphens, e.g., `parallel-execution.md`.
- Write in clear, active voice; define acronyms on first use; include practical examples.

## Testing Guidelines
- Tests live in `tests/` and use Python `unittest`; name files `test_*.py`.
- When editing exercises or manifests, run `python3 scripts/verify_exercises.py` before PR.

## Commit & Pull Request Guidelines
- Commit history favors `type: summary` prefixes (examples: `docs:`, `chore:`, `build:`, `ci:`). For longer changes, use a short subject, blank line, and a wrapped body (~72 chars) per `CONTRIBUTING.md`.
- PRs should include a concise summary, the change type, and a linked issue (e.g., `Fixes #123`). Note any local validation (docs build or exercise verification).
