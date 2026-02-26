#!/usr/bin/env bash

# CREW State Post-Validate — PostToolUse hook for Edit
#
# Fires after every Edit operation. If the edited file is .crew-state.yaml,
# reads it from disk and validates using the shared state-validate.js module.
#
# Cannot block (PostToolUse limitation). Outputs validation errors to stdout
# so Claude sees them in context and self-corrects.

set -euo pipefail

INPUT=$(cat)

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

# Only validate .crew-state.yaml edits
if [[ "$FILE_PATH" != *".crew-state.yaml" ]]; then
  exit 0
fi

if [ ! -f "$FILE_PATH" ]; then
  exit 0
fi

# Resolve the hooks directory (same directory as this script)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Run validation using the shared module
ERRORS=$(node -e "
  const fs = require('fs');
  const { validateStateContent } = require('${SCRIPT_DIR}/state-validate.js');
  const content = fs.readFileSync('${FILE_PATH}', 'utf8');
  const errors = validateStateContent(content);
  if (errors.length > 0) {
    console.log('CREW State Validator: .crew-state.yaml has errors after edit:');
    errors.forEach(e => console.log('  - ' + e));
    console.log('Please fix these errors before proceeding.');
  }
" 2>/dev/null || true)

if [ -n "$ERRORS" ]; then
  echo ""
  echo "$ERRORS"
  echo ""
fi

exit 0
