# Session Drive Example

A “session drive” is a maintainers-only run‑through that exercises a codex training flow from start to finish so you can validate materials, tooling, and documentation together.

## Goals

1.  Confirm the latest module content renders cleanly after build.
2.  Validate new components (such as `CodexPrompt` or RAG recipes) behave as expected in the dev site.
3.  Exercise MCP tooling (search, docs-check, etc.) and capture any surprising errors.

## Preparation

- Install dependencies (`npm ci`) and run `npm run docs:dev`.
- Start the Codex CLI prompt in a sandbox project (`codex` inside `practice/session-drive` or another repo).
- Make sure `.codex/config.toml` and skills are configured to match maintainers’ defaults.

## Walkthrough

1.  Navigate the docs site and open `Module 01` or the new RAG recipe to ensure mermaid diagrams and `<CodexPrompt>` tabs render without errors.
2.  In the Codex CLI session, request a “session drive” plan such as:

    ```text
    You: \"Walk me through the login form validation flow using the docs index.\"
    ```

3.  If you’ve configured the RAG MCP tool, have Codex call `search_docs(\"login form\", 3)` and verify the returned snippets match the expected files.
4.  Record any issues (rendered 404s, broken diagrams, missing metadata) in the maintainers’ issue tracker.

## Outcomes

- Notes for Docs: What needs harmonizing between the rendered site and Markdown sources.
- Updates to MCP tooling (if search results misbehave, re-index or adjust chunk sizes).
- Confirmation that helpers like `docs-check` and `session_start.sh` still execute cleanly.

Repeat the session drive after major doc, workflow, or theme changes. It serves both as a sanity check and as a living example for maintainers.
