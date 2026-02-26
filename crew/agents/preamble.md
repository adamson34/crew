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

5. **After completing work**, update the step status to `completed`, record `completed_at`, and register any produced artifacts in the `artifacts` section of the state file.

6. **If a gate follows this step**, inform the user that a review gate is now pending and they should run `/crew` to approve or reject before downstream steps can proceed.

7. **One workflow at a time.** If `active_workflow.status` is `in_progress`, do not start a different workflow. Finish or reset the current one first.
