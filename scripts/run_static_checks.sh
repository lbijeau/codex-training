#!/usr/bin/env bash
set -euo pipefail

base_dir="${1:-.}"
helpers="dup-check,complexity-report,cross-layer"
issues=()

run_check() {
  local name="$1"
  shift
  local output
  if output=$("$@" 2>&1); then
    return 0
  fi
  issues+=("${name}|${output}")
}

run_check "Duplicate analysis" node scripts/check_duplicates.js "$base_dir"
run_check "Complexity diff" node scripts/report_complexity_diff.js
run_check "Cross-layer imports" node scripts/check_cross_layer_imports.js "$base_dir"

if [[ ${#issues[@]} -gt 0 ]]; then
  echo "Static analysis failures detected:"
  for entry in "${issues[@]}"; do
    label="${entry%%|*}"
    output="${entry#*|}"
    echo "- $label:"$'\n'"$output"
  done
  ./scripts/post_session_logger.sh "static-analysis" "Static checks failed" "${helpers}" >&2
  exit 1
fi

echo "Static analysis clean."
./scripts/post_session_logger.sh "static-analysis" "Static checks clean" "${helpers}"
