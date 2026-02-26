'use strict';

/**
 * CREW State Validation Module
 * Shared validation logic for .crew-state.yaml
 * Used by state-guard.js (PreToolUse) and state-post-validate.sh (PostToolUse)
 *
 * Zero dependencies — uses a minimal YAML parser targeting the known
 * .crew-state.yaml structure only.
 */

// ─── Valid enum values ───────────────────────────────────────────────────────

const WORKFLOW_STATUSES = ['not_started', 'in_progress', 'completed'];
const STEP_STATUSES     = ['not_started', 'in_progress', 'completed'];
const GATE_STATUSES     = ['pending', 'approved', 'rejected'];

// ISO 8601 timestamp: YYYY-MM-DDTHH:MM:SS with optional fractional seconds and tz
const ISO_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/;

// ─── Minimal YAML parser ────────────────────────────────────────────────────
// Handles the known .crew-state.yaml structure:
//   - Top-level scalar keys (crew_version, engagement, initialized_at)
//   - Top-level map keys with 2-space nested children (active_workflow, steps, gates)
//   - Steps/gates as maps of maps (step-id → {status, started_at, ...})
//   - Top-level arrays (artifacts, completed_workflows) with object entries
//
// NOT a general YAML parser. Will fail on anchors, multi-line strings, etc.

function parseStateYaml(text) {
  const result = {};
  const lines = text.split('\n');

  let topKey = null;     // current top-level key
  let midKey = null;     // current 2-indent key (step id, gate id, or active_workflow field)
  let inTopArray = false;
  let topArrayItems = [];

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.replace(/\s+$/, '');  // trailing whitespace only
    const stripped = trimmed.trim();           // fully stripped for regex matching

    // Skip blanks and comments
    if (stripped === '' || stripped.startsWith('#')) continue;

    // Detect indent level
    const indent = raw.search(/\S/);

    // ── Top-level key (indent 0) ──────────────────────────────────────────
    if (indent === 0) {
      // Flush any pending array
      if (inTopArray && topKey) {
        result[topKey] = topArrayItems;
        inTopArray = false;
        topArrayItems = [];
      }

      const m = stripped.match(/^([a-z_][a-z0-9_]*):\s*(.*)/);
      if (!m) continue;

      topKey = m[1];
      midKey = null;
      const val = m[2].trim();

      if (val === '' || val === '{}') {
        result[topKey] = {};
      } else if (val === '[]') {
        result[topKey] = [];
      } else {
        result[topKey] = unquote(val);
      }
      continue;
    }

    // ── Array item (starts with "- ") ─────────────────────────────────────
    if (indent >= 2 && stripped.startsWith('- ')) {
      if (!inTopArray) {
        inTopArray = true;
        topArrayItems = [];
      }

      const itemContent = stripped.slice(2).trim();
      const kv = itemContent.match(/^([a-z_][a-z0-9_]*):\s*(.*)/);
      if (kv) {
        topArrayItems.push({ [kv[1]]: unquote(kv[2]) });
      } else {
        topArrayItems.push(unquote(itemContent));
      }
      continue;
    }

    // ── Continuation of array item (indent 4+, after a "- " line) ────────
    if (inTopArray && indent >= 4 && topArrayItems.length > 0) {
      const kv = stripped.match(/^([a-z_][a-z0-9_]*):\s*(.*)/);
      if (kv) {
        const last = topArrayItems[topArrayItems.length - 1];
        if (typeof last === 'object' && last !== null) {
          last[kv[1]] = unquote(kv[2]);
        }
      }
      continue;
    }

    // ── 2-space indent key ────────────────────────────────────────────────
    if (indent === 2 && !inTopArray) {
      const m = stripped.match(/^([a-z_][a-z0-9_-]*):\s*(.*)/);
      if (m && topKey) {
        midKey = m[1];
        const val = m[2].trim();

        if (typeof result[topKey] !== 'object' || Array.isArray(result[topKey])) {
          result[topKey] = {};
        }

        if (val === '' || val === '{}') {
          result[topKey][midKey] = {};
        } else if (val === '[]') {
          result[topKey][midKey] = [];
        } else {
          result[topKey][midKey] = unquote(val);
        }
      }
      continue;
    }

    // ── 4-space indent key (nested under mid-level) ──────────────────────
    if (indent === 4 && !inTopArray) {
      const m = stripped.match(/^([a-z_][a-z0-9_]*):\s*(.*)/);
      if (m && topKey && midKey) {
        const parent = result[topKey];
        if (parent && typeof parent === 'object' && typeof parent[midKey] === 'object'
            && !Array.isArray(parent[midKey])) {
          parent[midKey][m[1]] = unquote(m[2]);
        }
      }
      continue;
    }

    // ── 6-space indent (artifacts_produced list items inside steps) ───────
    if (indent === 6 && !inTopArray) {
      const arrItem = stripped.match(/^- \s*(.*)/);
      if (arrItem && topKey && midKey) {
        const step = result[topKey] && result[topKey][midKey];
        if (step && typeof step === 'object') {
          // Find which 4-indent key this belongs to by looking backward
          for (let j = i - 1; j >= 0; j--) {
            const prev = lines[j].replace(/\s+$/, '');
            if (prev.search(/\S/) === 4) {
              const km = prev.trim().match(/^([a-z_][a-z0-9_]*):/);
              if (km) {
                const arrKey = km[1];
                if (!Array.isArray(step[arrKey])) step[arrKey] = [];
                step[arrKey].push(unquote(arrItem[1]));
              }
              break;
            }
          }
        }
      }
      continue;
    }
  }

  // Flush trailing array
  if (inTopArray && topKey) {
    result[topKey] = topArrayItems;
  }

  return result;
}

function unquote(s) {
  if (s === undefined || s === null) return null;
  s = s.trim();
  if (s === 'null' || s === '~') return null;
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (s === '[]') return [];
  if (s === '{}') return {};
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  // Inline array: [a, b, c]
  if (s.startsWith('[') && s.endsWith(']')) {
    return s.slice(1, -1).split(',').map(v => unquote(v.trim()));
  }
  return s;
}

// ─── Validation ──────────────────────────────────────────────────────────────

function validateStateContent(content) {
  const errors = [];

  if (!content || typeof content !== 'string' || content.trim() === '') {
    return ['State file content is empty.'];
  }

  let state;
  try {
    state = parseStateYaml(content);
  } catch (err) {
    return [`Failed to parse state YAML: ${err.message}`];
  }

  // 1. Required top-level fields
  for (const key of ['crew_version', 'active_workflow', 'steps', 'gates', 'artifacts']) {
    if (!(key in state)) {
      errors.push(`Missing required field: "${key}"`);
    }
  }

  // 2. active_workflow validation
  const aw = state.active_workflow;
  if (aw && typeof aw === 'object') {
    if (aw.status && !WORKFLOW_STATUSES.includes(aw.status)) {
      errors.push(
        `active_workflow.status "${aw.status}" is invalid (must be: ${WORKFLOW_STATUSES.join(', ')})`
      );
    }
  }

  // 3. Step validation
  let inProgressCount = 0;
  const steps = state.steps;
  if (steps && typeof steps === 'object' && !Array.isArray(steps)) {
    for (const [id, step] of Object.entries(steps)) {
      if (typeof step !== 'object' || step === null) continue;

      // Status enum
      if (step.status && !STEP_STATUSES.includes(step.status)) {
        errors.push(`Step "${id}": status "${step.status}" is invalid (must be: ${STEP_STATUSES.join(', ')})`);
      }

      if (step.status === 'in_progress') inProgressCount++;

      // Timestamp format
      if (step.started_at && step.started_at !== null && !isValidTimestamp(step.started_at)) {
        errors.push(`Step "${id}": started_at "${step.started_at}" is not a valid ISO 8601 timestamp`);
      }
      if (step.completed_at && step.completed_at !== null && !isValidTimestamp(step.completed_at)) {
        errors.push(`Step "${id}": completed_at "${step.completed_at}" is not a valid ISO 8601 timestamp`);
      }

      // Chronological order
      if (step.started_at && step.completed_at
          && step.started_at !== null && step.completed_at !== null
          && isValidTimestamp(step.started_at) && isValidTimestamp(step.completed_at)) {
        if (new Date(step.completed_at) < new Date(step.started_at)) {
          errors.push(
            `Step "${id}": completed_at (${step.completed_at}) is before started_at (${step.started_at})`
          );
        }
      }
    }
  }

  // 4. At most one step in_progress
  if (inProgressCount > 1) {
    errors.push(
      `${inProgressCount} steps are in_progress simultaneously. Only one step may be in_progress at a time.`
    );
  }

  // 5. Gate validation
  const gates = state.gates;
  if (gates && typeof gates === 'object' && !Array.isArray(gates)) {
    for (const [id, gate] of Object.entries(gates)) {
      if (typeof gate !== 'object' || gate === null) continue;

      if (gate.status && !GATE_STATUSES.includes(gate.status)) {
        errors.push(`Gate "${id}": status "${gate.status}" is invalid (must be: ${GATE_STATUSES.join(', ')})`);
      }

      if (gate.reviewed_at && gate.reviewed_at !== null && !isValidTimestamp(gate.reviewed_at)) {
        errors.push(`Gate "${id}": reviewed_at "${gate.reviewed_at}" is not a valid ISO 8601 timestamp`);
      }
    }
  }

  // 6. Artifacts must be an array (or empty)
  if (state.artifacts !== undefined && state.artifacts !== null
      && !Array.isArray(state.artifacts) && state.artifacts !== '[]') {
    // Allow empty object {} from the parser as a degenerate empty case
    if (typeof state.artifacts === 'object' && Object.keys(state.artifacts).length > 0) {
      errors.push('artifacts must be an array, not a map');
    }
  }

  return errors;
}

function isValidTimestamp(ts) {
  if (!ts || ts === null) return true;
  if (typeof ts !== 'string') return false;
  if (!ISO_RE.test(ts)) return false;
  return !isNaN(new Date(ts).getTime());
}

// ─── Exports ─────────────────────────────────────────────────────────────────

module.exports = { parseStateYaml, validateStateContent, isValidTimestamp };
