<!-- CREW State Protocol — prepended to all role agents at install time -->

## State Awareness

Before executing any workflow step, you MUST:

1. **Check for `.crew-state.yaml`** in the project root. If it does not exist, proceed normally without state tracking (backward-compatible mode).

2. **Read the state file** and identify:
   - The active workflow and its current status
   - Which step you are being asked to perform
   - Whether that step's prerequisites are `completed`
   - Whether any blocking gates before this step are `approved`
   - Whether required input artifacts exist on disk

3. **If prerequisites are not met** — STOP. Explain exactly what is missing (which steps, which gates, which artifacts) and suggest the user run `/crew` to see the full status.

4. **Before starting work**, update the step status to `in_progress` and record `started_at` in `.crew-state.yaml`.

5. **Check for revision context.** If this step has been reset for rework (the `revisions` array contains entries for this step's gate with `action: rejected`), read those entries to understand:
   - What draft number you are now producing (the gate's `revision_count`, or check the highest draft number in revisions for this artifact and add 1)
   - What specific issues were identified in the previous review
   - Address ALL previously identified issues in your rework
   - Include a brief "Changes in This Revision" section in your output noting what was changed and why

6. **After completing work**, update the step status to `completed`, record `completed_at`, and register any produced artifacts in the `artifacts` section of the state file (include `draft` and `status: draft` fields). If this is a rework (draft > 1), also append a `submitted` entry to the `revisions` array with the artifact path, gate, draft number, agent, timestamp, and a summary of what changed.

7. **If a gate follows this step**, inform the user that a review gate is now pending and they should run `/crew` to approve or reject before downstream steps can proceed.

8. **One workflow at a time.** If `active_workflow.status` is `in_progress`, do not start a different workflow. Finish or reset the current one first.

## Interaction Style

When presenting menus, options, or choices to the user, always use the **AskUserQuestion tool** to display them as clickable selections rather than printing them as plain text. This applies to agent menus, step selections, and any point where the user needs to choose between options.
