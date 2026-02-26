#!/usr/bin/env bash

# CREW Completion Guard — Stop hook
#
# Fires when Claude finishes responding. Checks for any step with
# status: in_progress. If found, blocks Claude from stopping (exit 2)
# so it updates the state file first.
#
# Checks stop_hook_active to prevent infinite loops — if this hook
# already triggered a continuation, allow the stop on the next attempt.

set -euo pipefail

INPUT=$(cat)

# Check stop_hook_active to prevent infinite loops
STOP_ACTIVE=$(echo "$INPUT" | node -e "
  let d='';
  process.stdin.on('data',c=>d+=c);
  process.stdin.on('end',()=>{
    try{
      const j=JSON.parse(d);
      console.log(j.stop_hook_active===true?'true':'false');
    }catch(e){console.log('false');}
  });
" 2>/dev/null || echo "false")

if [ "$STOP_ACTIVE" = "true" ]; then
  exit 0
fi

STATE_FILE=".crew-state.yaml"

# No state file — allow stop
if [ ! -f "$STATE_FILE" ]; then
  exit 0
fi

# Check for in_progress steps
IN_PROGRESS=$(awk '
  /^steps:/ { in_section=1; next }
  /^[a-z]/ && in_section { in_section=0 }
  in_section && /^  [a-z]/ {
    id = $0
    gsub(/^  /, "", id)
    gsub(/:.*/, "", id)
    current_id = id
  }
  in_section && /status: *"?in_progress"?/ && current_id {
    print current_id
    current_id = ""
  }
' "$STATE_FILE")

if [ -n "$IN_PROGRESS" ]; then
  STEP_LIST=$(echo "$IN_PROGRESS" | tr '\n' ', ' | sed 's/,$//')
  echo "CREW Completion Guard: step(s) still in_progress: $STEP_LIST. Update .crew-state.yaml to mark them completed (or not_started if abandoning) before finishing." >&2
  exit 2
fi

exit 0
