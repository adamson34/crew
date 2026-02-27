# Agent System Overview

CREW agents are markdown persona files installed as Claude Code [slash commands](https://docs.anthropic.com/en/docs/claude-code). When you type `/consultant` in Claude Code, it loads Jake Tanaka's full persona — background, principles, methodology, and workflows. You then interact with him naturally.

For the full agent roster and what each produces, see the [README](../../README.md#the-team).

## How Agents Work

Each agent has:

- **Identity** — Name, role, background, certifications, years of experience
- **Principles** — Decision-making rules that shape output quality
- **Communication style** — How they write and speak (formal, technical, consultative, etc.)
- **Menu** — Numbered actions the agent can perform, invoked by letter code
- **Workflow participation** — Which workflow steps they own

Agents are roles, not task runners. Marcus approaches a SOW differently than Jake approaches a finding — that difference is intentional and produces higher-quality output.

## The State Preamble

Every role agent (not the orchestrator) has a **state preamble** injected at install time from `crew/agents/preamble.md`. This is the 8-step protocol agents follow before, during, and after work:

1. **Check for `.crew-state.yaml`** — If missing, proceed without state tracking (backward-compatible mode)
2. **Read state** — Identify the active workflow, current step, prerequisite status, gate status, and required input artifacts
3. **If prerequisites not met** — STOP. Explain exactly what's missing and suggest `/crew`
4. **Mark step in_progress** — Update `.crew-state.yaml` with `in_progress` status and `started_at` timestamp
5. **Check for revision context** — If this step was reset for rework, read the `revisions` array for rejection feedback. Determine draft number, identify all issues, address every one
6. **After completing work** — Mark step `completed`, record `completed_at`, register produced artifacts (with `draft` and `status: draft` fields). If reworking (draft > 1), append a `submitted` revision entry
7. **If gate follows** — Inform user a review gate is pending and suggest `/crew` for approval
8. **One workflow at a time** — Refuse to start a different workflow if one is already `in_progress`

This means agents self-enforce workflow rules. If you try to skip ahead or work out of order, the agent stops and tells you what's needed.

## How Agents Handle Rework

When a gate is rejected and a step is reset:

1. The agent reads the `revisions` array for entries with `action: rejected`
2. Determines the current draft number from `revision_count`
3. Addresses **all** previously identified issues
4. Includes a "Changes in This Revision" section documenting what changed and why
5. Appends a `submitted` revision entry after completing the rework

This creates an auditable trail from initial draft through each revision cycle to final approval.

## Placeholder Stamping

Agent files contain `{{placeholders}}` that are replaced at install time:

| Placeholder | Source |
|-------------|--------|
| `{{engagement_name}}` | Installer config |
| `{{client_name}}` | Installer config |
| `{{firm_name}}` | Installer config |
| `{{user_name}}` | Installer config |
| `{{vertical}}` | Installer config |
| `{{engagement_artifacts}}` | Installer config (default: `engagement`) |
| `{{assessment_artifacts}}` | Installer config (default: `assessment`) |
| `{{deliverables}}` | Installer config (default: `deliverables`) |

If you leave a config field blank during install, the placeholder stays as `{{key}}` for manual replacement later.

## Agent–Workflow Mapping

| Agent | engagement-kickoff | new-engagement | assessment | report-generation | remediation-plan |
|-------|-------------------|----------------|------------|-------------------|-----------------|
| `/bd` | steps 00–02 | steps 00–02b | — | — | — |
| `/pm` | steps 03–05 | steps 02c, 03, 06-import | — | — | step 03 |
| `/consultant` | — | step 04 | steps 01, 03, 04 | — | steps 01, 02, 04 |
| `/compliance` | — | — | steps 02, 05 | — | — |
| `/writer` | — | step 05 | — | steps 01–04 | — |
| `/reviewer` | — | step 06 | step 06 | step 05 | — |

## Individual Agent References

- [Marcus Webb — Business Development (`/bd`)](bd.md)
- [Dana Reeves — Project Manager (`/pm`)](pm.md)
- [Jake Tanaka — Lead Consultant (`/consultant`)](consultant.md)
- [Priya Kapoor — Compliance Analyst (`/compliance`)](compliance.md)
- [Eli Carter — Technical Writer (`/writer`)](writer.md)
- [Sofia Mendez — QA Reviewer (`/reviewer`)](reviewer.md)

---

## See Also

- [Orchestrator Reference](../orchestrator-reference.md) — The `/crew` command that routes between agents
- [Workflow Overview](../workflows/overview.md) — Steps and gates that agents execute
- [State Management](../state-management.md) — The `.crew-state.yaml` file agents read and write
- [Architecture](../architecture.md) — Preamble protocol details and system integration
- [Extending CREW](../extending-crew.md) — How to add new agents
