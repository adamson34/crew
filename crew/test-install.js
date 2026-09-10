#!/usr/bin/env node
'use strict';

/**
 * CREW Installer Smoke Test
 * Runs crew/install.js --yes end-to-end against a temp target directory
 * and asserts the scaffolded output is well-formed, then exercises
 * --uninstall. Complements test-hooks.js, which only unit-tests the
 * hook scripts in isolation and would not have caught the installer
 * shipping a broken session-context.sh (duplicate zero-count output).
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_DIR = path.resolve(__dirname, '..');
const INSTALL_SCRIPT = path.join(PROJECT_DIR, 'crew', 'install.js');

let passed = 0;
let failed = 0;

function check(name, condition, detail) {
  if (condition) {
    console.log(`  PASS  ${name}`);
    passed++;
  } else {
    console.log(`  FAIL  ${name}${detail ? ` (${detail})` : ''}`);
    failed++;
  }
}

console.log('Installer Smoke Test');
console.log('─'.repeat(50));

const targetDir = fs.mkdtempSync(path.join(os.tmpdir(), 'crew-install-test-'));

try {
  const installOutput = execSync(`node "${INSTALL_SCRIPT}" --yes`, {
    encoding: 'utf8', cwd: targetDir,
  });
  check('Installer runs non-interactively and exits cleanly', true);
  check('Installer reports 7 agents installed', /7 agents installed/.test(installOutput), installOutput);

  const expectedFiles = [
    '.crew',
    'CLAUDE.md',
    '.crew-state.yaml',
    '.claude/settings.json',
    '.claude/commands/bd.md',
    '.claude/commands/pm.md',
    '.claude/commands/consultant.md',
    '.claude/commands/compliance.md',
    '.claude/commands/writer.md',
    '.claude/commands/reviewer.md',
    '.claude/commands/crew.md',
    'crew/hooks/state-validate.js',
    'crew/hooks/session-context.sh',
    'crew/workflows/assessment/workflow.yaml',
    'engagement',
    'assessment',
    'deliverables',
  ];
  for (const rel of expectedFiles) {
    check(`Creates ${rel}`, fs.existsSync(path.join(targetDir, rel)));
  }

  // Generated state file must pass the same validation the PreToolUse hook enforces
  const { validateStateContent } = require(path.join(targetDir, 'crew', 'hooks', 'state-validate.js'));
  const stateContent = fs.readFileSync(path.join(targetDir, '.crew-state.yaml'), 'utf8');
  const errors = validateStateContent(stateContent);
  check('Generated .crew-state.yaml passes validation', errors.length === 0, JSON.stringify(errors));

  // Hooks are wired up for every lifecycle event install.js configures
  const settings = JSON.parse(fs.readFileSync(path.join(targetDir, '.claude', 'settings.json'), 'utf8'));
  for (const event of ['SessionStart', 'PreToolUse', 'PostToolUse', 'Stop']) {
    check(`.claude/settings.json wires up ${event} hook`, Array.isArray(settings.hooks?.[event]) && settings.hooks[event].length > 0);
  }

  // The SessionStart hook must actually run cleanly against the fresh state
  const hookOutput = execSync('bash crew/hooks/session-context.sh', {
    encoding: 'utf8', cwd: targetDir, input: '{}',
  });
  check('session-context.sh runs against fresh state', hookOutput.includes('CREW Engagement State'));
  check(
    'Fresh state reports zero artifacts exactly once (regression: duplicate grep -c output)',
    (hookOutput.match(/Artifacts registered: 0/g) || []).length === 1,
    hookOutput,
  );
  check(
    'Fresh state prints no "Revision cycles" line (regression: spurious 0-revision line)',
    !hookOutput.includes('Revision cycles'),
    hookOutput,
  );

  // Uninstall must remove everything it created
  execSync(`node "${INSTALL_SCRIPT}" --uninstall`, { encoding: 'utf8', cwd: targetDir });
  check('Uninstall exits cleanly', true);
  for (const rel of ['.crew', 'CLAUDE.md', '.crew-state.yaml', 'crew', '.claude/commands/crew.md']) {
    check(`Uninstall removes ${rel}`, !fs.existsSync(path.join(targetDir, rel)));
  }
} catch (e) {
  console.log(`  FAIL  Installer smoke test threw: ${e.message}`);
  if (e.stdout) console.log(e.stdout);
  if (e.stderr) console.log(e.stderr);
  failed++;
} finally {
  fs.rmSync(targetDir, { recursive: true, force: true });
}

console.log('');
console.log('─'.repeat(50));
console.log(`Results: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
