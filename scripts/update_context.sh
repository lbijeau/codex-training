#!/usr/bin/env bash
set -euo pipefail
context_file=".codex/context.md"
mkdir -p "$(dirname "$context_file")"
status=$(git status -sb)
todos=$(./codex_helpers/list_todos.py --paths 'docs/**/*.md' || true)
cat <<CTX > "$context_file"
# Codex Session Context
- Last update: $(date -u +%Y-%m-%dT%H:%M:%SZ)
- Git status:

	summary:
$(echo "$status" | sed 's/^/  /')
- TODO summary:
	scan output:
$(echo "$todos" | sed 's/^/  /')
CTX
