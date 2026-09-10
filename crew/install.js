#!/usr/bin/env node

/**
 * CREW Installer
 * Compiles agent files and installs them as Claude Code slash commands
 * in .claude/commands/ in the current working directory.
 * Also writes a .crew config file, CLAUDE.md, .crew-state.yaml skeleton,
 * and creates engagement directories.
 *
 * Usage:
 *   node install.js
 *   node install.js --yes   (non-interactive: accept defaults for every field)
 *
 * All config values are optional. Leave blank to accept the default
 * or keep {{placeholder}} for manual find-and-replace later.
 */

const fs   = require('fs');
const path = require('path');

// ─── Agents to install ────────────────────────────────────────────────────────

const AGENTS = ['bd', 'pm', 'consultant', 'compliance', 'writer', 'reviewer', 'crew'];

// ─── Vertical knowledge base ─────────────────────────────────────────────────
//
// Maps each `vertical` config option to the knowledge-base files agents and
// workflows should reference. Exactly one entry per vertical should have
// `overview: true` — it's the general domain-orientation doc referenced by
// the consultant agent and the new-engagement/engagement-kickoff workflows.
// The full list (overview + framework references) is used by the assessment
// workflow and the compliance agent. A vertical with no entry here falls
// back to DEFAULT_VERTICAL rather than shipping agents with no reference
// material at all.

const DEFAULT_VERTICAL = 'ot-ics';

const VERTICAL_KNOWLEDGE_BASE = {
  'ot-ics': [
    { key: 'ot_ics_overview', overview: true, label: 'OT/ICS domain knowledge', path: 'crew/knowledge-base/ot-ics-overview.md' },
    { key: 'nerc_cip_ref', label: 'NERC CIP reference', path: 'crew/knowledge-base/nerc-cip-reference.md' },
    { key: 'iec_62443_ref', label: 'IEC 62443 reference', path: 'crew/knowledge-base/iec-62443-reference.md' },
    { key: 'nist_csf_ref', label: 'NIST CSF reference', path: 'crew/knowledge-base/nist-csf-reference.md' },
  ],
  'cloud-security': [
    { key: 'cloud_security_overview', overview: true, label: 'Cloud security domain knowledge', path: 'crew/knowledge-base/cloud-security-overview.md' },
    { key: 'cis_controls_ref', label: 'CIS Controls & Benchmarks reference', path: 'crew/knowledge-base/cis-controls-reference.md' },
  ],
};

function verticalEntries(vertical) {
  return VERTICAL_KNOWLEDGE_BASE[vertical] || VERTICAL_KNOWLEDGE_BASE[DEFAULT_VERTICAL];
}

function yamlBlock(entries) {
  return entries.map(e => `  ${e.key}: "${e.path}"`).join('\n');
}

function referenceMaterialBlock(entries) {
  return entries.map(e => `- ${e.label}: \`${e.path}\``).join('\n');
}

/** Computes the vertical-scoped placeholder values stamped into workflow.yaml
 *  and agent files. Called once per install with the resolved config. */
function verticalPlaceholders(vertical) {
  const entries = verticalEntries(vertical);
  const overview = entries.filter(e => e.overview);
  const frameworks = entries.filter(e => !e.overview);
  return {
    vertical_knowledge_base_yaml: yamlBlock(entries),
    vertical_overview_yaml: yamlBlock(overview),
    vertical_overview_reference: referenceMaterialBlock(overview),
    vertical_framework_references: referenceMaterialBlock(frameworks),
  };
}

// ─── Config schema ────────────────────────────────────────────────────────────

const dirName = path.basename(process.cwd());

const CONFIG_FIELDS = [
  {
    key: 'firm_name',
    label: 'Consulting firm name',
    placeholder: true,
  },
  {
    key: 'user_name',
    label: 'Your name (how agents address you)',
    placeholder: true,
  },
  {
    key: 'engagement_name',
    label: 'Engagement name or identifier',
    default: dirName,
  },
  {
    key: 'client_name',
    label: 'Client organization name',
    default: 'Client',
  },
  {
    key: 'vertical',
    label: 'Consulting vertical',
    default: 'ot-ics',
    options: [
      { value: 'ot-ics',         label: 'OT/ICS Cybersecurity' },
      { value: 'cloud-security', label: 'Cloud Security' },
      { value: 'it-audit',       label: 'IT Audit' },
      { value: 'grc',            label: 'GRC — Governance, Risk & Compliance' },
      { value: 'pentest',        label: 'Penetration Testing' },
    ],
  },
  {
    key: 'assessor_skill_level',
    label: 'Primary consultant skill level',
    default: 'intermediate',
    options: [
      { value: 'junior',       label: 'Junior — needs step-by-step guidance' },
      { value: 'intermediate', label: 'Intermediate — familiar with domain' },
      { value: 'senior',       label: 'Senior — domain expert' },
    ],
  },
  {
    key: 'engagement_artifacts',
    label: 'Engagement artifacts path (SOW, project plan, comms)',
    default: 'engagement',
  },
  {
    key: 'assessment_artifacts',
    label: 'Assessment artifacts path (findings, evidence, notes)',
    default: 'assessment',
  },
  {
    key: 'deliverables',
    label: 'Deliverables path (reports, roadmaps, presentations)',
    default: 'deliverables',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function printSelect(options, defaultValue) {
  options.forEach((o, i) => {
    const marker = o.value === defaultValue ? '*' : ' ';
    process.stdout.write(`    ${marker} ${i + 1}) ${o.label} [${o.value}]\n`);
  });
}

/**
 * Fill every field with its default (or null for placeholder fields with
 * no default), matching the fallback behavior collectConfig() applies when
 * stdin closes early. Used by --yes for non-interactive installs.
 */
function defaultConfig(fields) {
  const config = {};
  for (const f of fields) config[f.key] = f.default || null;
  return config;
}

/**
 * Collect all config fields interactively via readline.
 * Supports plain text fields and single-select fields.
 */
function collectConfig(fields) {
  return new Promise(resolve => {
    const rl = require('readline').createInterface({ input: process.stdin, output: process.stdout });
    const config = {};
    let i = 0;

    function prompt() {
      if (i >= fields.length) { rl.close(); return; }

      const f = fields[i];

      if (f.options) {
        process.stdout.write(`\n  ${f.label}:\n`);
        printSelect(f.options, f.default);
        process.stdout.write(`  Choice (default: ${f.default}): `);
      } else {
        const hint = f.default ? ` (default: ${f.default})` : f.placeholder ? ` (blank = keep {{${f.key}}})` : '';
        process.stdout.write(`  ${f.label}${hint}: `);
      }
    }

    rl.on('line', line => {
      const f = fields[i];
      const raw = line.trim();

      if (f.options) {
        const num = parseInt(raw, 10);
        if (raw === '' || isNaN(num)) {
          // Accept the default or a typed value
          const typed = f.options.find(o => o.value === raw);
          config[f.key] = typed ? typed.value : (f.default || null);
        } else {
          const opt = f.options[num - 1];
          config[f.key] = opt ? opt.value : (f.default || null);
        }
      } else {
        if (raw === '') {
          config[f.key] = f.default || null;
        } else {
          config[f.key] = raw;
        }
      }

      i++;
      prompt();
    });

    rl.on('close', () => {
      // Fill any remaining fields with defaults (stdin closed early)
      while (i < fields.length) {
        config[fields[i].key] = fields[i].default || null;
        i++;
      }
      resolve(config);
    });

    prompt();
  });
}

function stamp(content, config) {
  let out = content;
  for (const f of CONFIG_FIELDS) {
    if (config[f.key]) out = out.split(`{{${f.key}}}`).join(config[f.key]);
    // if null, leave {{key}} as-is for manual replacement
  }
  // Computed values (not user-prompted), e.g. config._date -> {{date}},
  // config._vertical_overview_yaml -> {{vertical_overview_yaml}}
  for (const key of Object.keys(config)) {
    if (key.startsWith('_') && config[key] != null) {
      out = out.split(`{{${key.slice(1)}}}`).join(config[key]);
    }
  }
  return out;
}

function writeCrewFile(config) {
  const lines = [
    '# CREW Engagement Configuration',
    '# Generated by crew/install.js — edit directly to update settings.',
    '',
    `engagement_name: "${config.engagement_name || ''}"`,
    `client_name: "${config.client_name || ''}"`,
    `firm_name: "${config.firm_name || ''}"`,
    `user_name: "${config.user_name || ''}"`,
    `vertical: "${config.vertical || ''}"`,
    `assessor_skill_level: "${config.assessor_skill_level || ''}"`,
    '',
    'paths:',
    `  engagement: "${config.engagement_artifacts || 'engagement'}"`,
    `  assessment: "${config.assessment_artifacts || 'assessment'}"`,
    `  deliverables: "${config.deliverables || 'deliverables'}"`,
    '',
  ];
  fs.writeFileSync(path.join(process.cwd(), '.crew'), lines.join('\n'), 'utf8');
}

function writeClaudeMd(config) {
  const templatePath = path.join(__dirname, 'templates', 'claude-md-template.md');
  if (!fs.existsSync(templatePath)) {
    console.log('  --  CLAUDE.md  (template not found, skipped)');
    return;
  }
  const template = fs.readFileSync(templatePath, 'utf8');
  const content = stamp(template, config);
  fs.writeFileSync(path.join(process.cwd(), 'CLAUDE.md'), content, 'utf8');
  console.log('  OK  CLAUDE.md');
}

function writeInitialState(config) {
  const now = new Date().toISOString();
  const lines = [
    'crew_version: "1.0.0"',
    `engagement: "${config.engagement_name || ''}"`,
    `initialized_at: "${now}"`,
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
    'revisions: []',
    '',
    'completed_workflows: []',
    '',
  ];
  fs.writeFileSync(path.join(process.cwd(), '.crew-state.yaml'), lines.join('\n'), 'utf8');
  console.log('  OK  .crew-state.yaml');
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath  = path.join(src,  entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function createDirectories(config) {
  const dirs = [
    config.engagement_artifacts || 'engagement',
    config.assessment_artifacts || 'assessment',
    config.deliverables         || 'deliverables',
  ];
  const created = [];
  for (const dir of dirs) {
    const abs = path.join(process.cwd(), dir);
    if (!fs.existsSync(abs)) {
      fs.mkdirSync(abs, { recursive: true });
      created.push(dir);
    }
  }
  return created;
}

// ─── Stamp crew directory ────────────────────────────────────────────────────

/**
 * Walk the installed crew/ directory and stamp {{placeholders}} in all
 * .md and .yaml files. This ensures workflow step instructions, templates,
 * and workflow YAML artifact patterns contain real values instead of
 * mustache placeholders.
 */
function stampCrewDir(dir, config) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      stampCrewDir(full, config);
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.yaml')) {
      const content = fs.readFileSync(full, 'utf8');
      const stamped = stamp(content, config);
      if (stamped !== content) {
        fs.writeFileSync(full, stamped, 'utf8');
      }
    }
  }
}

// ─── Hooks configuration ─────────────────────────────────────────────────────

const CREW_HOOKS = {
  SessionStart: [{
    matcher: '',
    hooks: [{ type: 'command', command: 'bash crew/hooks/session-context.sh', timeout: 10 }],
  }],
  PreToolUse: [{
    matcher: 'Write',
    hooks: [{ type: 'command', command: 'node crew/hooks/state-guard.js', timeout: 10 }],
  }],
  PostToolUse: [
    {
      matcher: 'Edit',
      hooks: [{ type: 'command', command: 'bash crew/hooks/state-post-validate.sh', timeout: 10 }],
    },
    {
      matcher: 'Write',
      hooks: [{ type: 'command', command: 'bash crew/hooks/artifact-tracker.sh', timeout: 10 }],
    },
  ],
  Stop: [{
    hooks: [{ type: 'command', command: 'bash crew/hooks/completion-guard.sh', timeout: 10 }],
  }],
};

function writeHooksConfig() {
  const settingsDir = path.join(process.cwd(), '.claude');
  fs.mkdirSync(settingsDir, { recursive: true });

  const settingsPath = path.join(settingsDir, 'settings.json');

  // Read existing settings or start fresh
  let settings = {};
  if (fs.existsSync(settingsPath)) {
    try {
      settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    } catch (e) {
      // Back up invalid settings file
      fs.copyFileSync(settingsPath, settingsPath + '.bak');
      console.log('  !!  .claude/settings.json was invalid JSON — backed up to .bak');
      settings = {};
    }
  }

  if (!settings.hooks) settings.hooks = {};

  // For each event, remove existing CREW hooks and add fresh ones
  for (const [event, matcherGroups] of Object.entries(CREW_HOOKS)) {
    if (!settings.hooks[event]) {
      settings.hooks[event] = [];
    }

    // Filter out any existing CREW hooks (identified by crew/hooks/ in command)
    settings.hooks[event] = settings.hooks[event].filter(group => {
      const isCrewHook = group.hooks && group.hooks.some(h =>
        h.command && h.command.includes('crew/hooks/')
      );
      return !isCrewHook;
    });

    // Add CREW hooks
    settings.hooks[event].push(...matcherGroups);
  }

  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + '\n', 'utf8');
  console.log('  OK  .claude/settings.json (hooks)');

  // Make shell hook scripts executable
  const hooksDir = path.join(process.cwd(), 'crew', 'hooks');
  if (fs.existsSync(hooksDir)) {
    for (const file of fs.readdirSync(hooksDir)) {
      if (file.endsWith('.sh')) {
        fs.chmodSync(path.join(hooksDir, file), 0o755);
      }
    }
  }
}

function removeHooksConfig() {
  const settingsPath = path.join(process.cwd(), '.claude', 'settings.json');
  if (!fs.existsSync(settingsPath)) return;

  try {
    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    if (!settings.hooks) return;

    let changed = false;
    for (const event of Object.keys(settings.hooks)) {
      const before = settings.hooks[event].length;
      settings.hooks[event] = settings.hooks[event].filter(group => {
        const isCrewHook = group.hooks && group.hooks.some(h =>
          h.command && h.command.includes('crew/hooks/')
        );
        return !isCrewHook;
      });
      if (settings.hooks[event].length !== before) changed = true;

      // Remove empty event arrays
      if (settings.hooks[event].length === 0) {
        delete settings.hooks[event];
        changed = true;
      }
    }

    // Remove empty hooks object
    if (Object.keys(settings.hooks).length === 0) {
      delete settings.hooks;
    }

    if (changed) {
      if (Object.keys(settings).length === 0) {
        fs.unlinkSync(settingsPath);
        console.log('  removed  .claude/settings.json');
      } else {
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + '\n', 'utf8');
        console.log('  cleaned  .claude/settings.json (hooks removed)');
      }
    }
  } catch (e) {
    console.log('  !!  Could not clean .claude/settings.json:', e.message);
  }
}

// ─── Preamble injection ───────────────────────────────────────────────────────

function readPreamble() {
  const preamblePath = path.join(__dirname, 'agents', 'preamble.md');
  if (!fs.existsSync(preamblePath)) return null;
  return fs.readFileSync(preamblePath, 'utf8');
}

function injectPreamble(agentContent, preamble) {
  if (!preamble) return agentContent;

  // Insert preamble after the first heading line (# CREW Agent — ...)
  const lines = agentContent.split('\n');
  const headingIndex = lines.findIndex(l => l.startsWith('# '));

  if (headingIndex === -1) {
    // No heading found — prepend
    return preamble + '\n\n' + agentContent;
  }

  // Insert after the heading line (and any blank line following it)
  let insertAt = headingIndex + 1;
  while (insertAt < lines.length && lines[insertAt].trim() === '') insertAt++;

  const before = lines.slice(0, insertAt).join('\n');
  const after  = lines.slice(insertAt).join('\n');
  return before + '\n\n' + preamble + '\n\n' + after;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const compiledDir = path.join(__dirname, 'agents', 'compiled');
  const commandsDir = path.join(process.cwd(), '.claude', 'commands');

  console.log('\nCREW Install');
  console.log('─'.repeat(50));
  console.log('Installs CREW agents as slash commands in .claude/commands/');
  console.log('Agents: /bd /pm /consultant /compliance /writer /reviewer /crew\n');

  const nonInteractive = process.argv.includes('--yes');
  if (nonInteractive) {
    console.log('Non-interactive mode: accepting defaults for every field.\n');
  } else {
    console.log('Press Enter to accept defaults shown in parentheses.\n');
  }

  const config = nonInteractive ? defaultConfig(CONFIG_FIELDS) : await collectConfig(CONFIG_FIELDS);

  // Computed values (not user-prompted)
  config._date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  for (const [key, value] of Object.entries(verticalPlaceholders(config.vertical))) {
    config[`_${key}`] = value;
  }

  console.log('');

  // Write .crew config file
  writeCrewFile(config);
  console.log('  OK  .crew');

  // Write CLAUDE.md
  writeClaudeMd(config);

  // Write initial state file
  writeInitialState(config);

  // Create artifact directories
  const created = createDirectories(config);
  for (const dir of created) console.log(`  OK  ${dir}/`);

  // Copy crew module to target project so agents can reference crew/workflows etc.
  const moduleDestDir = path.join(process.cwd(), 'crew');
  copyDir(__dirname, moduleDestDir);
  console.log('  OK  crew/');

  // Stamp placeholders in copied crew/ files (workflows, templates, step files)
  stampCrewDir(moduleDestDir, config);
  console.log('  OK  crew/ (stamped)');

  // Write hook configuration to .claude/settings.json
  writeHooksConfig();

  // Ensure .claude/commands exists
  fs.mkdirSync(commandsDir, { recursive: true });

  // Read preamble for injection
  const preamble = readPreamble();

  // Install each agent
  console.log('');
  let installed = 0;
  const skipped = [];

  for (const name of AGENTS) {
    const src = path.join(compiledDir, `${name}.md`);

    if (!fs.existsSync(src)) {
      skipped.push(name);
      continue;
    }

    let content = fs.readFileSync(src, 'utf8');

    // Inject preamble into role agents (not the orchestrator)
    if (name !== 'crew' && preamble) {
      content = injectPreamble(content, preamble);
    }

    content = stamp(content, config);
    fs.writeFileSync(path.join(commandsDir, `${name}.md`), content, 'utf8');
    console.log(`  OK  /${name}`);
    installed++;
  }

  if (skipped.length) {
    console.log('');
    for (const name of skipped) {
      console.log(`  --  /${name}  (compiled file not found, skipped)`);
    }
  }

  console.log(`\n${installed} agent${installed !== 1 ? 's' : ''} installed to .claude/commands/\n`);

  const blanks = CONFIG_FIELDS.filter(f => f.placeholder && !config[f.key]);
  if (blanks.length) {
    console.log('Note: the following placeholders were left in agent files:');
    blanks.forEach(f => console.log(`  {{${f.key}}}`));
    console.log('Find and replace them manually, or re-run install.js.\n');
  }

  console.log('To re-run with different config:  node install.js');
  console.log('To re-run non-interactively:      node install.js --yes');
  console.log('To uninstall:                     node install.js --uninstall\n');
}

// ─── Uninstall ────────────────────────────────────────────────────────────────

function uninstall() {
  const commandsDir = path.join(process.cwd(), '.claude', 'commands');
  let removed = 0;

  for (const name of AGENTS) {
    const dest = path.join(commandsDir, `${name}.md`);
    if (fs.existsSync(dest)) {
      fs.unlinkSync(dest);
      console.log(`  removed  /${name}`);
      removed++;
    }
  }

  const crewFile = path.join(process.cwd(), '.crew');
  if (fs.existsSync(crewFile)) {
    fs.unlinkSync(crewFile);
    console.log('  removed  .crew');
  }

  const stateFile = path.join(process.cwd(), '.crew-state.yaml');
  if (fs.existsSync(stateFile)) {
    fs.unlinkSync(stateFile);
    console.log('  removed  .crew-state.yaml');
  }

  const claudeMd = path.join(process.cwd(), 'CLAUDE.md');
  if (fs.existsSync(claudeMd)) {
    fs.unlinkSync(claudeMd);
    console.log('  removed  CLAUDE.md');
  }

  // Remove CREW hooks from .claude/settings.json before removing crew/
  removeHooksConfig();

  const crewDir = path.join(process.cwd(), 'crew');
  if (fs.existsSync(crewDir)) {
    fs.rmSync(crewDir, { recursive: true, force: true });
    console.log('  removed  crew/');
  }

  console.log(`\n${removed} agent${removed !== 1 ? 's' : ''} removed.\n`);
}

// ─── Entry ────────────────────────────────────────────────────────────────────

if (process.argv.includes('--uninstall')) {
  uninstall();
} else {
  main().catch(err => {
    console.error('\nInstall failed:', err.message);
    process.exit(1);
  });
}
