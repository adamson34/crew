# Troubleshooting and FAQ

## Installation Issues

### "compiled file not found, skipped" during install

**Cause:** Agent source file missing from `crew/agents/compiled/`.

**Fix:** Verify CREW was cloned completely. Check that all 7 files exist in `crew/agents/compiled/`: `bd.md`, `pm.md`, `consultant.md`, `compliance.md`, `writer.md`, `reviewer.md`, `crew.md`.

### Placeholder warnings ({{firm_name}}, {{user_name}}) after install

**Cause:** You left config fields blank during installation.

**Fix:** Re-run `node crew/install.js` with the correct values, or manually find-and-replace `{{key}}` in the agent files under `.claude/commands/`.

### Hooks not firing

**Cause:** `.claude/settings.json` wasn't written or is malformed, or hook scripts don't have execute permission.

**Fix:**
1. Re-run the installer to regenerate settings
2. Verify `.claude/settings.json` has a `hooks` section with crew entries
3. Run `chmod +x crew/hooks/*.sh` to ensure scripts are executable

---

## State Issues

### "Missing required field" validation error

**Cause:** `.crew-state.yaml` is missing `crew_version`, `active_workflow`, `steps`, `gates`, or `artifacts`.

**Fix:** Ensure all required top-level fields exist. If the file is badly corrupted, re-run the installer to regenerate the skeleton, then re-initialize your workflow with `/crew IN`.

### Multiple steps showing as in_progress

**Cause:** An agent started a step but the session ended before the step was completed (interrupted session, crash, etc.).

**Fix:** Manually edit `.crew-state.yaml` — set all but one step back to `not_started`. The completion guard hook should prevent this, but interrupted sessions can cause it.

### State file won't save (blocked by state guard)

**Cause:** Invalid YAML being written — enum mismatch, bad timestamp, or structural issue.

**Fix:** Read the error message — it lists the exact problems. Fix each one. Common causes:
- Step status not one of `not_started`, `in_progress`, `completed`
- Gate status not one of `pending`, `approved`, `rejected`
- Timestamp not in ISO 8601 format

### Completion guard blocks session end

**Cause:** A step is still `in_progress` when you try to end the Claude Code session.

**Fix:** Either tell the agent to update `.crew-state.yaml` (mark the step completed or not_started), or manually edit the file.

---

## Workflow Issues

### /crew NX says "gate pending" but I already approved it

**Cause:** Wrong gate approved, or the gate status wasn't actually updated in the file.

**Fix:** Run `/crew ST` to check which gate is actually pending. The gate names can be similar across workflows (e.g., multiple `gate-qa-review` entries in different workflows).

### Agent refuses to start work ("prerequisites not met")

**Cause:** A prerequisite step isn't completed, or a blocking gate isn't approved.

**Fix:** Run `/crew NX` to see exactly what's missing. Complete the prerequisite steps or approve the blocking gate first. This is working as intended — agents enforce workflow order.

### Agent produces output but state wasn't updated

**Cause:** Session ended before the agent updated `.crew-state.yaml` (the state update happens after the agent finishes its work).

**Fix:** Re-invoke the agent and ask it to update the state file, or manually set the step to `completed` with the correct `completed_at` timestamp and `artifacts_produced` paths.

### /crew IN warns about overwriting an active workflow

**Cause:** There's already an active workflow with `status: in_progress`.

**Fix:** This is a safety check. If you genuinely want to start a different workflow, confirm the overwrite. If you want to finish the current workflow first, cancel and run `/crew NX`.

---

## Agent Issues

### Agent uses wrong name or firm name

**Cause:** `{{placeholder}}` values weren't stamped during install (config field was left blank).

**Fix:** Re-run the installer with correct values, or directly edit the agent files in `.claude/commands/{agent}.md`.

### Agent ignores state protocol (doesn't check prerequisites)

**Cause:** Preamble wasn't injected — the agent file was edited after install and the preamble section was removed.

**Fix:** Re-run the installer. It re-injects the preamble into all agent files.

### Agent writes files to wrong directory

**Cause:** Path config mismatch between `.crew` config and agent expectations.

**Fix:** Check `.crew` config file — the `engagement_artifacts`, `assessment_artifacts`, and `deliverables` paths should match the actual directory names in your project.

---

## Revision and Rework Issues

### How do I restart a step from scratch?

Run `/crew RS`, select the step. If the step has a gate, the gate is also reset to `pending`. Then re-invoke the agent — it will read the revision context automatically.

### How do I skip a gate? (not recommended)

Manually edit `.crew-state.yaml`: set the gate `status` to `approved`. This bypasses human review — the gate exists for a reason, so only do this if you understand the consequences.

### How do I restart an entire workflow?

Run `/crew IN` and select the same workflow. The orchestrator warns about overwriting — confirm to reset all steps and gates to their initial state.

### Draft numbering seems wrong

Check `revision_count` on the gate in `.crew-state.yaml`. If it's wrong, manually set it to the correct draft number. The next agent invocation will use this value.

### Gate rejected but agent doesn't see the feedback

**Cause:** The rejection was recorded via `/crew GR` but the `revisions` array entry might be missing or malformed.

**Fix:** Run `/crew RC` to check what feedback is recorded. If it's missing, manually add a revision entry with `action: rejected` and the feedback notes.

---

## General Tips

- **Always come back to `/crew`** between steps. The orchestrator is your routing layer.
- **Run `/crew ST`** when confused. The dashboard shows everything at a glance.
- **State is human-editable.** If something goes wrong, open `.crew-state.yaml` and fix it directly. Validation will catch structural errors on the next write.
- **Re-running the installer** is safe and fixes most configuration issues. It re-injects preambles, re-stamps placeholders, and re-registers hooks.

---

## See Also

- [State Management](state-management.md) — Schema reference and manual editing guide
- [Hooks Reference](hooks-reference.md) — Hook behavior, exit codes, and debugging
- [Installation Guide](installation-guide.md) — What the installer does and reconfiguration
- [Orchestrator Reference](orchestrator-reference.md) — All `/crew` commands
- [Getting Started](getting-started.md) — End-to-end tutorial
