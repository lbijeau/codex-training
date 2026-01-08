# Docs Site Alignment Design

Date: 2026-01-07

## Goal
Align codex-training docs structure with gemini-training by adding a public-facing docs site, clearer navigation, and curated entry points, while keeping content changes minimal and relevant.

## Context
gemini-training added a VitePress site, a landing page, a cookbook/recipes section, Mermaid diagrams, link hygiene, and repo hygiene updates. codex-training currently has rich markdown content but no docs site tooling.

## Scope
- Add a VitePress docs site rooted at `docs/` with a landing page and global nav/sidebar.
- Add a lightweight recipes/cookbook index that points into existing modules, exercises, and training tracks.
- Normalize link text and paths for clickability and consistent routing.
- Use Mermaid sparingly for existing conceptual diagrams where it improves clarity.
- Update repo hygiene for docs build artifacts and public-facing issues (if missing).

## Non-Goals
- Rewrite module or exercise content.
- Invent new training material beyond brief recipe pointers.
- Introduce new tooling unrelated to the docs site.

## Proposed Structure
- `docs/.vitepress/config.mts`: base path handling, global sidebar/nav, Mermaid plugin.
- `docs/index.md`: landing page with entry points (training, modules, exercises, maintainers, support).
- `docs/README.md`: local dev instructions for the docs site.
- `docs/recipes/README.md`: outcomes-oriented index linking to existing content.
- Optional short recipe pages only when they link to existing authoritative content.

## Content Mapping
- Modules and exercises remain canonical under `docs/modules/` and `docs/exercises/`.
- Training track remains under `docs/training/`.
- Maintainer resources remain under `docs/maintainers/`.
- Recipes provide quick-entry links and do not duplicate material.

## Link Hygiene
- Replace raw file name references in prose with user-friendly labels.
- Normalize relative links to work both in markdown and VitePress routing.
- Ensure "next steps" and sidebar items are clickable and consistent.

## Diagrams
- Prefer Mermaid for conceptual flows already described in prose.
- Keep diagrams minimal; only add when clarity improves.

## Repo Hygiene
- Add VitePress build artifacts to `.gitignore`.
- Add or update issue templates only if student-facing templates are missing.

## Verification
- Run local VitePress dev build (`npm install`, `npm run docs:dev` or equivalent).
- Run link check if available, otherwise verify a representative set of links.

## Risks
- Over-structuring the docs without adding value. Mitigated by minimal content changes.
- Navigation mismatch between markdown links and VitePress routing. Mitigated by link sweep.
