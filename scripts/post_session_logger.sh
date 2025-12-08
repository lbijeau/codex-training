#!/usr/bin/env bash
set -euo pipefail
logdir="logs"
mkdir -p "$logdir"
logfile="$logdir/session_history.log"
model="${1:-unknown-model}"
prompt="${2:-no prompt provided}"
helper_summary="${3:-}"
helper_summary="${helper_summary//$'\n'/\\n}"
printf '%s | model=%s | prompt=%s | helpers=%s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$model" "$prompt" "$helper_summary" >> "$logfile"
