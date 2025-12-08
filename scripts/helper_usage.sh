#!/usr/bin/env bash
set -euo pipefail
logfile="logs/session_history.log"
if [[ ! -f "$logfile" ]]; then
  echo "No session logs yet. Run a session to create $logfile."
  exit 0
fi

declare -A counts
while IFS= read -r line; do
  helper_part="${line##*helpers=}"  # capture everything after helpers=
  if [[ "$helper_part" != "" ]]; then
    IFS="," read -ra helpers <<< "$helper_part"
    for h in "${helpers[@]}"; do
      h_trim="$(echo "$h" | xargs)"
      if [[ -n "$h_trim" ]]; then
        counts["$h_trim"]=$((counts["$h_trim"] + 1))
      fi
    done
  fi
done < "$logfile"

echo "Helper usage summary (entries in $logfile):"
for helper in "${!counts[@]}"; do
  printf "%-30s %s\n" "$helper" "${counts[$helper]}"
done | sort
