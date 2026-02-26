#!/usr/bin/env bash

# CREW Artifact Tracker — PostToolUse hook for Write
#
# Fires after every Write operation. If the written file is inside
# an artifact directory and there's an active workflow, reminds Claude
# to register the artifact in .crew-state.yaml.
#
# Cannot block (PostToolUse limitation). Output goes to Claude's context.

set -euo pipefail

INPUT=$(cat)

STATE_FILE=".crew-state.yaml"
CREW_FILE=".crew"

# Extract file_path from hook input JSON
FILE_PATH=$(echo "$INPUT" | node -e "
  let d='';
  process.stdin.on('data',c=>d+=c);
  process.stdin.on('end',()=>{
    try{
      const j=JSON.parse(d);
      console.log(j.tool_input&&j.tool_input.file_path||'');
    }catch(e){console.log('');}
  });
" 2>/dev/null || echo "")

# Nothing to check if we can't determine the file
if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Ignore writes to the state file and config
case "$FILE_PATH" in
  */.crew-state.yaml|*/.crew) exit 0 ;;
esac

# No state file — skip
if [ ! -f "$STATE_FILE" ]; then
  exit 0
fi

# Check for active workflow
WF_STATUS=$(awk '/^active_workflow:/{found=1; next} found && /^  status:/{gsub(/.*status: *"?/, ""); gsub(/".*/, ""); print; exit}' "$STATE_FILE")
if [ "$WF_STATUS" != "in_progress" ]; then
  exit 0
fi

# Read artifact directories from .crew config (or use defaults)
ENG_PATH="engagement"
ASS_PATH="assessment"
DEL_PATH="deliverables"

if [ -f "$CREW_FILE" ]; then
  _eng=$(grep '  engagement:' "$CREW_FILE" 2>/dev/null | sed 's/.*: *"//; s/".*//' || true)
  _ass=$(grep '  assessment:' "$CREW_FILE" 2>/dev/null | sed 's/.*: *"//; s/".*//' || true)
  _del=$(grep '  deliverables:' "$CREW_FILE" 2>/dev/null | sed 's/.*: *"//; s/".*//' || true)
  [ -n "$_eng" ] && ENG_PATH="$_eng"
  [ -n "$_ass" ] && ASS_PATH="$_ass"
  [ -n "$_del" ] && DEL_PATH="$_del"
fi

# Get path relative to project root
PROJECT_DIR=$(pwd)
RELATIVE="${FILE_PATH#$PROJECT_DIR/}"

# Check if the file is in an artifact directory
IS_ARTIFACT=false
for DIR in "$ENG_PATH" "$ASS_PATH" "$DEL_PATH"; do
  case "$RELATIVE" in
    "$DIR"/*) IS_ARTIFACT=true; break ;;
  esac
done

if [ "$IS_ARTIFACT" = true ]; then
  echo ""
  echo "CREW: Artifact written — $RELATIVE"
  echo "If this is a workflow deliverable, register it in .crew-state.yaml:"
  echo "  1. Add entry to artifacts[] with path, produced_by, step, produced_at, type"
  echo "  2. Add path to the current step's artifacts_produced list"
  echo ""
fi

exit 0
