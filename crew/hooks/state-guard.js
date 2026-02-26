#!/usr/bin/env node
'use strict';

/**
 * CREW State Guard — PreToolUse hook for Write
 *
 * Intercepts all Write operations. If the target file is .crew-state.yaml,
 * validates the content before the write happens. Blocks invalid writes
 * with exit code 2 and a descriptive error on stderr.
 *
 * Non-state file writes pass through immediately (exit 0).
 */

const { validateStateContent } = require('./state-validate.js');

// Read all stdin synchronously to avoid async exit issues
const chunks = [];
try {
  const BUFSIZE = 4096;
  const buf = Buffer.alloc(BUFSIZE);
  let bytesRead;
  while (true) {
    try {
      bytesRead = require('fs').readSync(0, buf, 0, BUFSIZE);
    } catch (e) {
      break; // EOF or error
    }
    if (bytesRead === 0) break;
    chunks.push(buf.slice(0, bytesRead).toString('utf8'));
  }
} catch (e) {
  // stdin not readable — fail open
  process.exit(0);
}

const input = chunks.join('');

try {
  const data = JSON.parse(input);
  const filePath = data.tool_input && data.tool_input.file_path;
  const content  = data.tool_input && data.tool_input.content;

  // Only validate .crew-state.yaml writes
  if (!filePath || !filePath.endsWith('.crew-state.yaml')) {
    process.exit(0);
  }

  if (!content || typeof content !== 'string') {
    process.stderr.write('CREW State Guard: Write to .crew-state.yaml has no content.\n');
    process.exit(2);
  }

  const errors = validateStateContent(content);
  if (errors.length > 0) {
    process.stderr.write('CREW State Guard: blocked invalid .crew-state.yaml write.\n');
    for (const e of errors) {
      process.stderr.write(`  - ${e}\n`);
    }
    process.stderr.write('Fix the issues above and retry.\n');
    process.exit(2);
  }

  // Valid — allow the write
  process.exit(0);

} catch (err) {
  // Fail open — if we can't parse the hook input, don't block
  process.exit(0);
}
