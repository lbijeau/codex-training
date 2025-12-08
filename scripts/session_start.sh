#!/usr/bin/env bash
set -euo pipefail
logfile="logs/session_start.log"
mkdir -p "$(dirname "$logfile")"
{
  echo "=== Session Start $(date -u +%Y-%m-%dT%H:%M:%SZ) ==="
  git status -sb
  git log -5 --oneline
  echo "Recent files:" 
  ls -t | head -n 5
  echo
} | tee -a "$logfile"
