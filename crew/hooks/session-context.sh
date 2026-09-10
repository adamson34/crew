#!/usr/bin/env bash

# CREW Session Context — SessionStart hook
#
# Fires on startup, resume, clear, and compact.
# Reads .crew-state.yaml and outputs a concise engagement status summary
# to stdout, which is injected into Claude's context window.
#
# If no state file exists, outputs nothing (backward compatible).

set -euo pipefail

# Consume stdin (hook input JSON) — we don't need it for this hook
cat > /dev/null

STATE_FILE=".crew-state.yaml"

# No state file — silent exit
if [ ! -f "$STATE_FILE" ]; then
  exit 0
fi

echo "=== CREW Engagement State ==="
echo ""

# Extract top-level scalars
ENGAGEMENT=$(grep '^engagement:' "$STATE_FILE" 2>/dev/null | head -1 | sed 's/^engagement: *//; s/^"//; s/"$//')
echo "Engagement: ${ENGAGEMENT:-unknown}"

# Extract active workflow (under active_workflow: block, 2-space indent)
WF_ID=$(awk '/^active_workflow:/{found=1; next} found && /^  id:/{gsub(/.*id: *"?/, ""); gsub(/".*/, ""); print; exit}' "$STATE_FILE")
WF_STATUS=$(awk '/^active_workflow:/{found=1; next} found && /^  status:/{gsub(/.*status: *"?/, ""); gsub(/".*/, ""); print; exit}' "$STATE_FILE")
echo "Workflow: ${WF_ID:-none} (${WF_STATUS:-not_started})"
echo ""

# Extract steps with status
echo "Steps:"
awk '
  /^steps:/ { in_section=1; next }
  /^[a-z]/ && in_section { in_section=0 }
  in_section && /^  [a-z]/ {
    id = $0
    gsub(/^  /, "", id)
    gsub(/:.*/, "", id)
    current_id = id
  }
  in_section && /status:/ && current_id {
    status = $0
    gsub(/.*status: *"?/, "", status)
    gsub(/".*/, "", status)
    if (status == "completed") m = "[x]"
    else if (status == "in_progress") m = "[>]"
    else m = "[ ]"
    printf "  %s %s\n", m, current_id
    current_id = ""
  }
' "$STATE_FILE"

echo ""
echo "Gates:"
awk '
  /^gates:/ { in_section=1; next }
  /^[a-z]/ && in_section { in_section=0 }
  in_section && /^  [a-z]/ {
    id = $0
    gsub(/^  /, "", id)
    gsub(/:.*/, "", id)
    current_id = id
  }
  in_section && /status:/ && current_id {
    status = $0
    gsub(/.*status: *"?/, "", status)
    gsub(/".*/, "", status)
    if (status == "approved") m = "[v]"
    else if (status == "rejected") m = "[-]"
    else m = "[ ]"
    printf "  %s %s\n", m, current_id
    current_id = ""
  }
' "$STATE_FILE"

# Count artifacts
ARTIFACT_COUNT=$(grep -c '^  - path:' "$STATE_FILE" 2>/dev/null) || ARTIFACT_COUNT=0
echo ""
echo "Artifacts registered: $ARTIFACT_COUNT"

# Count revisions
REVISION_COUNT=$(grep -c '^  - artifact:' "$STATE_FILE" 2>/dev/null) || REVISION_COUNT=0
if [ "$REVISION_COUNT" != "0" ]; then
  REJECTION_COUNT=$(grep -c 'action: .*rejected' "$STATE_FILE" 2>/dev/null) || REJECTION_COUNT=0
  echo "Revision cycles: $REJECTION_COUNT rejection(s) across $REVISION_COUNT revision entries"
fi

echo "=== End CREW State ==="

exit 0
