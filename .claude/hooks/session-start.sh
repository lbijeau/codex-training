#!/usr/bin/env bash
# Session start hook - runs static analysis checks before Claude starts working
# This provides early feedback on code quality issues without consuming many tokens

set -euo pipefail

# Run static checks from global scripts directory
if [[ -f "$HOME/.claude/scripts/run_static_checks.sh" ]]; then
  "$HOME/.claude/scripts/run_static_checks.sh" .
else
  echo "⚠️  Static analysis scripts not found in ~/.claude/scripts/"
  echo "See project documentation for optional static analysis setup."
fi
