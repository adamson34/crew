#!/usr/bin/env node

/**
 * CMAD Installer
 * Compiles agent files and installs them as Claude Code slash commands
 * in .claude/commands/ in the current working directory.
 *
 * Usage:
 *   node install.js
 *
 * All config values are optional. Leave blank to keep {{placeholder}}
 * for manual find-and-replace later.
 */

const fs   = require('fs');
const path = require('path');

// ─── Config fields prompted at install ────────────────────────────────────────

const CONFIG_FIELDS = [
  { key: 'firm_name', label: 'Consulting firm name' },
  { key: 'user_name', label: 'Your name (how agents address you)' },
];

// ─── Agents to install ────────────────────────────────────────────────────────

const AGENTS = ['bd', 'pm', 'assessor', 'compliance', 'writer', 'reviewer'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Prompt for all config fields using a single 'line' listener so piped
 * input and interactive input both work correctly.
 */
function collectConfig(fields) {
  return new Promise(resolve => {
    const rl = require('readline').createInterface({ input: process.stdin, output: process.stdout });
    const config = {};
    let i = 0;

    function printPrompt() {
      process.stdout.write(`  ${fields[i].label} (blank = keep {{${fields[i].key}}}): `);
    }

    function finish() {
      // Fill any remaining fields with null (stdin closed early)
      while (i < fields.length) { config[fields[i++].key] = null; }
      rl.close();
      resolve(config);
    }

    rl.on('line', line => {
      config[fields[i].key] = line.trim() || null;
      i++;
      if (i < fields.length) {
        printPrompt();
      } else {
        finish();
      }
    });

    rl.on('close', finish);

    printPrompt();
  });
}

function stamp(content, config) {
  let out = content;
  for (const { key } of CONFIG_FIELDS) {
    if (config[key]) out = out.split(`{{${key}}}`).join(config[key]);
    // if null, leave {{key}} as-is for manual replacement
  }
  return out;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const compiledDir = path.join(__dirname, 'agents', 'compiled');
  const commandsDir = path.join(process.cwd(), '.claude', 'commands');

  console.log('\nCMAD Install');
  console.log('─'.repeat(50));
  console.log('Installs CMAD agents as slash commands in .claude/commands/');
  console.log('Agents will be available as /bd /pm /assessor /compliance /writer /reviewer\n');
  console.log('Config values are optional — leave blank to keep {{placeholder}}');
  console.log('for manual find-and-replace later.\n');

  // Collect config
  const config = await collectConfig(CONFIG_FIELDS);

  console.log('');

  // Ensure .claude/commands exists
  fs.mkdirSync(commandsDir, { recursive: true });

  // Install each agent
  let installed = 0;
  const skipped = [];

  for (const name of AGENTS) {
    const src = path.join(compiledDir, `${name}.md`);

    if (!fs.existsSync(src)) {
      skipped.push(name);
      continue;
    }

    const content = stamp(fs.readFileSync(src, 'utf8'), config);
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

  const blanks = CONFIG_FIELDS.filter(f => !config[f.key]);
  if (blanks.length) {
    console.log('Note: the following placeholders were left in agent files:');
    blanks.forEach(f => console.log(`  {{${f.key}}}`));
    console.log('Find and replace them manually, or re-run install.js.\n');
  }

  console.log('To re-run with different config:  node install.js');
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
