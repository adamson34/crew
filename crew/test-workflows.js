#!/usr/bin/env node
'use strict';

/**
 * CREW Workflow Structural Validation
 *
 * workflow.yaml files are read directly by agents, not by any parser —
 * nothing previously checked that step files exist, that gate/prerequisite
 * references resolve, or that referenced templates/knowledge-base/data
 * files are actually present. This is a lightweight line-based extractor
 * (not a general YAML parser — CREW stays zero-runtime-deps) tailored to
 * the structure documented in CLAUDE.md's "State File Schema" /
 * "Adding a new workflow" sections.
 */

const fs = require('fs');
const path = require('path');

const PROJECT_DIR = path.resolve(__dirname, '..');
const WORKFLOWS_DIR = path.join(PROJECT_DIR, 'crew', 'workflows');
const INSTALL_JS = path.join(PROJECT_DIR, 'crew', 'install.js');

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

// Known agent names come from install.js's AGENTS array, not duplicated
// here, so this test can't silently drift out of sync with it.
function knownAgents() {
  const src = fs.readFileSync(INSTALL_JS, 'utf8');
  const m = src.match(/const AGENTS = \[([^\]]*)\]/);
  if (!m) throw new Error('Could not find AGENTS array in install.js');
  return m[1].split(',').map(s => s.trim().replace(/^'|'$/g, '')).filter(Boolean);
}

function parseList(raw) {
  return raw.split(',').map(s => s.trim()).filter(Boolean);
}

/** Line-based extraction of the pieces of workflow.yaml this test verifies. */
function parseWorkflow(yamlText) {
  const lines = yamlText.split('\n');
  let section = null;
  let current = null;
  const steps = [];
  const gates = [];
  const requiresWorkflows = [];
  const staticPaths = new Set();

  for (const line of lines) {
    const topMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*$/);
    if (topMatch) {
      section = topMatch[1];
      current = null;
    } else if (section === 'steps') {
      const idMatch = line.match(/^ {2}- id:\s*(\S+)/);
      if (idMatch) {
        current = { id: idMatch[1] };
        steps.push(current);
      } else if (current) {
        let m;
        if ((m = line.match(/^ {4}file:\s*(\S+)/))) current.file = m[1];
        if ((m = line.match(/^ {4}agent:\s*(\S+)/))) current.agent = m[1];
        if ((m = line.match(/^ {4}prerequisites:\s*\[(.*)\]/))) current.prerequisites = parseList(m[1]);
        if ((m = line.match(/^ {4}gate_after:\s*(\S+)/))) current.gate_after = m[1];
      }
    } else if (section === 'gates') {
      const idMatch = line.match(/^ {2}- id:\s*(\S+)/);
      if (idMatch) {
        current = { id: idMatch[1] };
        gates.push(current);
      } else if (current) {
        let m;
        if ((m = line.match(/^ {4}after_step:\s*(\S+)/))) current.after_step = m[1];
        if ((m = line.match(/^ {4}blocks:\s*\[(.*)\]/))) current.blocks = parseList(m[1]);
      }
    } else if (section === 'requires_workflows') {
      const m = line.match(/any_of:\s*\[(.*)\]/);
      if (m) requiresWorkflows.push(...parseList(m[1]));
    }

    // Static crew/... file references (templates, knowledge_base, data).
    // Runtime artifact patterns use {{placeholders}}, which the [^"{}]
    // class excludes, so those are never captured here.
    const pathMatches = line.match(/"crew\/[^"{}]+"/g);
    if (pathMatches) for (const p of pathMatches) staticPaths.add(p.slice(1, -1));
  }

  return { steps, gates, requiresWorkflows, staticPaths: [...staticPaths] };
}

console.log('Workflow Structural Validation');
console.log('─'.repeat(50));

const agents = knownAgents();
const workflowDirs = fs.readdirSync(WORKFLOWS_DIR, { withFileTypes: true })
  .filter(e => e.isDirectory())
  .map(e => e.name);

check('At least one workflow directory found', workflowDirs.length > 0);

for (const workflowName of workflowDirs) {
  const workflowDir = path.join(WORKFLOWS_DIR, workflowName);
  const yamlPath = path.join(workflowDir, 'workflow.yaml');

  if (!fs.existsSync(yamlPath)) {
    check(`${workflowName}: has workflow.yaml`, false, 'missing file');
    continue;
  }

  const { steps, gates, requiresWorkflows, staticPaths } = parseWorkflow(fs.readFileSync(yamlPath, 'utf8'));
  const stepIds = new Set(steps.map(s => s.id));
  const gateIds = new Set(gates.map(g => g.id));

  check(`${workflowName}: declares at least one step`, steps.length > 0);

  for (const step of steps) {
    check(`${workflowName}/${step.id}: step file exists`, !!step.file && fs.existsSync(path.join(workflowDir, step.file)), step.file);
    check(`${workflowName}/${step.id}: agent "${step.agent}" is a known agent`, agents.includes(step.agent));

    for (const prereq of step.prerequisites || []) {
      check(`${workflowName}/${step.id}: prerequisite "${prereq}" resolves to a real step`, stepIds.has(prereq));
    }

    if (step.gate_after) {
      check(`${workflowName}/${step.id}: gate_after "${step.gate_after}" resolves to a real gate`, gateIds.has(step.gate_after));
    }
  }

  for (const gate of gates) {
    check(`${workflowName}/${gate.id}: after_step "${gate.after_step}" resolves to a real step`, stepIds.has(gate.after_step));
    for (const blocked of gate.blocks || []) {
      check(`${workflowName}/${gate.id}: blocks entry "${blocked}" resolves to a real step`, stepIds.has(blocked));
    }
  }

  // Every step's gate_after should point at a gate whose after_step points back at it.
  for (const step of steps) {
    if (!step.gate_after) continue;
    const gate = gates.find(g => g.id === step.gate_after);
    check(
      `${workflowName}/${step.id}: gate_after "${step.gate_after}" points back at this step`,
      !!gate && gate.after_step === step.id,
    );
  }

  for (const dep of requiresWorkflows) {
    check(`${workflowName}: requires_workflows entry "${dep}" is a real workflow`, workflowDirs.includes(dep));
  }

  for (const p of staticPaths) {
    check(`${workflowName}: referenced file "${p}" exists`, fs.existsSync(path.join(PROJECT_DIR, p)));
  }
}

console.log('');
console.log('─'.repeat(50));
console.log(`Results: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
