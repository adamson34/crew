#!/usr/bin/env node
'use strict';

/**
 * CREW Hooks Test Suite
 * Tests state-guard.js (PreToolUse) and state-validate.js (shared module)
 */

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const PROJECT_DIR = path.resolve(__dirname, '..', '..');
const GUARD_SCRIPT = path.join(PROJECT_DIR, 'crew', 'hooks', 'state-guard.js');

let passed = 0;
let failed = 0;

function testHook(name, input, expectBlock) {
  const jsonInput = JSON.stringify(input);
  fs.writeFileSync('/tmp/test-hook-input.json', jsonInput);

  try {
    execSync(`cat /tmp/test-hook-input.json | node "${GUARD_SCRIPT}"`, {
      encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'],
    });
    // exit 0 = allowed
    if (expectBlock) {
      console.log(`  FAIL  ${name} (expected block, got allow)`);
      failed++;
    } else {
      console.log(`  PASS  ${name}`);
      passed++;
    }
  } catch (e) {
    if (e.status === 2 && expectBlock) {
      const reasons = (e.stderr || '').split('\n').filter(l => l.startsWith('  - '));
      console.log(`  PASS  ${name} → ${reasons[0] || 'blocked'}`);
      passed++;
    } else if (e.status === 2 && !expectBlock) {
      console.log(`  FAIL  ${name} (unexpected block: ${e.stderr})`);
      failed++;
    } else {
      console.log(`  FAIL  ${name} (unexpected exit ${e.status})`);
      failed++;
    }
  }
}

// ─── Test Data ───────────────────────────────────────────────────────────────

const validPopulated = [
  'crew_version: "1.0.0"',
  'engagement: "test"',
  'initialized_at: "2026-02-26T10:00:00Z"',
  '',
  'active_workflow:',
  '  id: assessment',
  '  started_at: "2026-02-26T10:00:00Z"',
  '  status: in_progress',
  '',
  'steps:',
  '  step-01-profiling:',
  '    status: completed',
  '    agent: consultant',
  '    started_at: "2026-02-26T10:00:00Z"',
  '    completed_at: "2026-02-26T11:00:00Z"',
  '  step-02-framework:',
  '    status: in_progress',
  '    agent: compliance',
  '    started_at: "2026-02-26T11:30:00Z"',
  '  step-03-gap:',
  '    status: not_started',
  '',
  'gates:',
  '  gate-findings:',
  '    status: pending',
  '    after_step: step-04',
  '    blocks: [step-05]',
  '',
  'artifacts:',
  '  - path: "assessment/test-profile.md"',
  '    produced_by: consultant',
  '    step: step-01-profiling',
  '    produced_at: "2026-02-26T11:00:00Z"',
  '    type: environment-profile',
  '',
  'completed_workflows: []',
].join('\n');

const validSkeleton = [
  'crew_version: "1.0.0"',
  'engagement: "test"',
  'initialized_at: "2026-02-26T10:00:00Z"',
  '',
  'active_workflow:',
  '  id: null',
  '  started_at: null',
  '  status: not_started',
  '',
  'steps: {}',
  '',
  'gates: {}',
  '',
  'artifacts: []',
  '',
  'completed_workflows: []',
].join('\n');

// ─── Tests ───────────────────────────────────────────────────────────────────

console.log('State Guard Hook Tests');
console.log('─'.repeat(50));

// Should ALLOW
testHook('Valid populated state', { tool_input: { file_path: '/tmp/.crew-state.yaml', content: validPopulated } }, false);
testHook('Valid initial skeleton', { tool_input: { file_path: '/tmp/.crew-state.yaml', content: validSkeleton } }, false);
testHook('Non-state file (passthrough)', { tool_input: { file_path: '/tmp/README.md', content: '# Hello' } }, false);

// Should BLOCK
testHook('Invalid workflow status', {
  tool_input: { file_path: '/tmp/.crew-state.yaml', content: validPopulated.replace('status: in_progress', 'status: running') },
}, true);

testHook('Invalid step status', {
  tool_input: { file_path: '/tmp/.crew-state.yaml', content: validPopulated.replace('status: completed', 'status: done') },
}, true);

testHook('Invalid gate status', {
  tool_input: { file_path: '/tmp/.crew-state.yaml', content: validPopulated.replace('status: pending', 'status: maybe') },
}, true);

testHook('Multiple in_progress steps', {
  tool_input: { file_path: '/tmp/.crew-state.yaml', content: validPopulated.replace('status: not_started', 'status: in_progress') },
}, true);

testHook('completed_at before started_at', {
  tool_input: { file_path: '/tmp/.crew-state.yaml', content: validPopulated.replace('"2026-02-26T11:00:00Z"', '"2026-02-26T09:00:00Z"') },
}, true);

testHook('Bad timestamp format', {
  tool_input: { file_path: '/tmp/.crew-state.yaml', content: validPopulated.replace('started_at: "2026-02-26T11:30:00Z"', 'started_at: "not-a-date"') },
}, true);

testHook('Missing crew_version', {
  tool_input: { file_path: '/tmp/.crew-state.yaml', content: validPopulated.replace('crew_version: "1.0.0"\n', '') },
}, true);

testHook('Empty content', {
  tool_input: { file_path: '/tmp/.crew-state.yaml', content: '' },
}, true);

testHook('No content field', {
  tool_input: { file_path: '/tmp/.crew-state.yaml' },
}, true);

// ─── Session Context Test ────────────────────────────────────────────────────

console.log('');
console.log('Session Context Hook Test');
console.log('─'.repeat(50));

// Write a test state file
fs.writeFileSync(path.join(PROJECT_DIR, '.crew-state.yaml'), validPopulated, 'utf8');

try {
  const output = execSync(`echo '{}' | bash "${path.join(PROJECT_DIR, 'crew', 'hooks', 'session-context.sh')}"`, {
    encoding: 'utf8', cwd: PROJECT_DIR,
  });
  if (output.includes('CREW Engagement State') && output.includes('step-01') && output.includes('gate-findings')) {
    console.log('  PASS  Session context outputs state summary');
    passed++;
  } else {
    console.log('  FAIL  Session context missing expected content');
    console.log(output);
    failed++;
  }
} catch (e) {
  console.log('  FAIL  Session context crashed:', e.message);
  failed++;
}

// Clean up test state file
fs.unlinkSync(path.join(PROJECT_DIR, '.crew-state.yaml'));

// ─── Completion Guard Test ───────────────────────────────────────────────────

console.log('');
console.log('Completion Guard Hook Test');
console.log('─'.repeat(50));

// Write state with in_progress step
fs.writeFileSync(path.join(PROJECT_DIR, '.crew-state.yaml'), validPopulated, 'utf8');

try {
  execSync(`echo '{"stop_hook_active":false}' | bash "${path.join(PROJECT_DIR, 'crew', 'hooks', 'completion-guard.sh')}"`, {
    encoding: 'utf8', cwd: PROJECT_DIR, stdio: ['pipe', 'pipe', 'pipe'],
  });
  console.log('  FAIL  Completion guard should have blocked (in_progress step exists)');
  failed++;
} catch (e) {
  if (e.status === 2 && e.stderr && e.stderr.includes('in_progress')) {
    console.log('  PASS  Completion guard blocks when step is in_progress');
    passed++;
  } else {
    console.log('  FAIL  Unexpected error:', e.stderr || e.message);
    failed++;
  }
}

// Test with stop_hook_active=true (should allow)
try {
  execSync(`echo '{"stop_hook_active":true}' | bash "${path.join(PROJECT_DIR, 'crew', 'hooks', 'completion-guard.sh')}"`, {
    encoding: 'utf8', cwd: PROJECT_DIR, stdio: ['pipe', 'pipe', 'pipe'],
  });
  console.log('  PASS  Completion guard allows when stop_hook_active=true');
  passed++;
} catch (e) {
  console.log('  FAIL  Completion guard should allow when stop_hook_active=true');
  failed++;
}

// Test with no in_progress steps
const allCompleted = validPopulated.replace('status: in_progress\n    agent: compliance', 'status: completed\n    agent: compliance');
fs.writeFileSync(path.join(PROJECT_DIR, '.crew-state.yaml'), allCompleted, 'utf8');

try {
  execSync(`echo '{"stop_hook_active":false}' | bash "${path.join(PROJECT_DIR, 'crew', 'hooks', 'completion-guard.sh')}"`, {
    encoding: 'utf8', cwd: PROJECT_DIR, stdio: ['pipe', 'pipe', 'pipe'],
  });
  console.log('  PASS  Completion guard allows when no in_progress steps');
  passed++;
} catch (e) {
  console.log('  FAIL  Completion guard should allow when no in_progress steps');
  failed++;
}

// Clean up
fs.unlinkSync(path.join(PROJECT_DIR, '.crew-state.yaml'));

// ─── Summary ─────────────────────────────────────────────────────────────────

console.log('');
console.log('─'.repeat(50));
console.log(`Results: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
