# Training Docs Gap Audit (2026-01-08)

This audit reviews the training documentation in `docs/` with a focus on the Codex CLI hands-on track and cross-cutting training materials (modules + exercises). The goal is to identify actionable gaps and create an issue per gap (or link to an existing issue) so remediation work is trackable.

## Target State (Acceptance Criteria)

- **Accuracy:** Commands, flags, and config examples match the pinned Codex CLI version.
- **Safety clarity:** Interactive vs non-interactive modes have unambiguous approval/sandbox guidance.
- **Maintainability:** CLI reference material has a clear “how to refresh” path to prevent drift.
- **Diagrams:** Conceptual diagrams use Mermaid (preferred) or committed SVGs; avoid box-drawing/ASCII art.
- **Docs site clarity:** Contributors know how Mermaid works in the VitePress site and how to validate builds.

## Gaps → Issues

| Gap | Issue |
| --- | --- |
| Contradictory guidance about approvals in `codex exec` labs (non-interactive) | [#66](https://github.com/lbijeau/codex-training/issues/66) |
| Hands-on track version pins drift (v0.72.x / 0.76.0 vs repo’s v0.77.0 pin) | [#67](https://github.com/lbijeau/codex-training/issues/67) |
| Diagram references use `.../` placeholders in the architecture module | [#68](https://github.com/lbijeau/codex-training/issues/68) |
| Box-drawing/ASCII diagrams should be replaced with Mermaid/SVG | [#69](https://github.com/lbijeau/codex-training/issues/69) |
| Hands-on track packaging needs stronger navigation + facilitator run-of-show | [#70](https://github.com/lbijeau/codex-training/issues/70) |
| Docs site should document Mermaid usage + ensure build verification | [#71](https://github.com/lbijeau/codex-training/issues/71) |
| MCP config examples appear inconsistent across docs (existing issue; added evidence) | [#26](https://github.com/lbijeau/codex-training/issues/26) |
| CLI reference epic (existing issue; commented with current status) | [#4](https://github.com/lbijeau/codex-training/issues/4) |

## ASCII / Box-Drawing Diagram Inventory (Candidates)

These are the main conceptual diagrams currently represented using box-drawing characters (identified via `rg -n "┌" docs`):

- `docs/modules/01-getting-started.md:25`
- `docs/modules/09-api-customization.md:252`
- `docs/modules/06-domain.md:600` (and nearby diagram blocks used in example outputs)
- `docs/exercises/07-integration/exercise-2.md:386`
- `docs/exercises/07-integration/exercise-3.md:457`
- `docs/exercises/09-api-customization/exercise-3.md:17`
- `docs/exercises/09-api-customization/exercise-4.md:568`
- `docs/exercises/09-api-customization/exercise-5.md:533`

Related (explicit “ASCII art” instruction that could become Mermaid):
- `docs/exercises/08-api-internals/exercise-2.md:88`

## Mermaid in VitePress

The docs site is already Mermaid-enabled via `vitepress-plugin-mermaid` in `docs/.vitepress/config.mts`. Issue #71 tracks documenting this for contributors and adding/confirming build verification.
