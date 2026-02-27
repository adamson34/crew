# Getting Started with CREW

This guide walks you through your first engagement from install to deliverable. By the end, you'll understand the full CREW cycle: initialize a workflow, work with agents, pass through review gates, and produce artifacts.

For what CREW is and how to install it, see the [README](../README.md).

## Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed and working
- Node.js installed
- CREW cloned locally (`git clone https://github.com/adamson34/crew.git`)

## Step 1: Create an Engagement Project

```bash
mkdir acme-assessment && cd acme-assessment
node /path/to/CREW/crew/install.js
```

The installer prompts you for engagement details:

| Prompt | Example | Purpose |
|--------|---------|---------|
| Firm name | Meridian Security | Stamped into SOWs and proposals |
| Your name | Alex | How agents address you |
| Engagement name | acme-assessment | Labels all outputs (defaults to directory name) |
| Client name | Acme Power | Used in deliverable templates |
| Vertical | ot-ics | Selects domain knowledge |
| Skill level | intermediate | Controls how much guidance agents provide |
| Artifact paths | engagement/, assessment/, deliverables/ | Where outputs are written |

After installation you'll have slash commands (`/crew`, `/bd`, `/pm`, `/consultant`, `/compliance`, `/writer`, `/reviewer`), a `.crew-state.yaml` state file, and a `CLAUDE.md` that gives Claude your engagement context automatically.

## Step 2: Initialize a Workflow

Open Claude Code in your engagement directory and run:

```
/crew
```

The orchestrator shows its command menu. Pick **IN** (Initialize) to start a workflow. For this tutorial, select **engagement-kickoff** — it's a straightforward 6-step sequence covering opportunity qualification through data request.

The orchestrator reads the workflow definition and scaffolds all steps and gates into `.crew-state.yaml`. You'll see confirmation of the steps and gates it created.

## Step 3: Find Out What's Next

```
/crew NX
```

The orchestrator checks the state file and tells you:

- The next actionable step (e.g., `step-00-service-check`)
- Which agent to invoke (e.g., "Run `/bd`")
- What input artifacts are needed (if any)

Follow its instructions. The orchestrator is your routing layer — always come back to it between steps.

## Step 4: Work with an Agent

```
/bd
```

Marcus Webb (Business Development) loads and shows his menu. Select the action that matches the current step — in this case, **service check** or **qualify opportunity**.

The agent will:

1. Check `.crew-state.yaml` for prerequisites (the state preamble protocol)
2. Mark the step `in_progress`
3. Ask you questions and produce output
4. Mark the step `completed` and register any artifacts

You provide the information (client description, opportunity details, scope inputs) and the agent does the work. The output is written to your artifact directories.

## Step 5: Advance Through Steps

After the agent finishes, go back to the orchestrator:

```
/crew NX
```

It finds the next step and tells you which agent to invoke. The flow for engagement-kickoff is:

1. `/bd` — Service check → Qualify opportunity → SOW generation
2. `/pm` — Project setup → Kickoff prep → Data request

Agents automatically refuse to work on steps whose prerequisites aren't completed. If you try to skip ahead, the agent will tell you exactly what's missing and suggest running `/crew` for status.

## Step 6: Approve a Gate

After SOW generation, `/crew NX` will tell you a **gate is pending** rather than giving you the next step. Gates are human review checkpoints — nothing advances until you explicitly approve.

```
/crew GA
```

The orchestrator lists pending gates. Select the SOW gate, confirm you've reviewed the output, and approve it. The gate is recorded as approved and downstream steps unblock.

## Step 7: Handle a Gate Rejection

Sometimes output needs rework. Instead of approving:

```
/crew GR
```

Provide rejection notes describing what needs to change. Use structured format:

```
B-01: Scope section missing remote access assessment; M-01: Timeline needs buffer for holiday weeks
```

Then reset the step so the agent can rework it:

```
/crew RS
```

Select the step to reset. Now when you re-invoke the agent (e.g., `/bd`), it reads the rejection feedback automatically and addresses each issue. The output will include a "Changes in This Revision" section documenting what changed and why.

Return to `/crew GA` to approve the revised output.

## Step 8: Check Status Anytime

```
/crew ST
```

The dashboard shows all steps and gates at a glance:

```
Steps:
  [x] step-00-service-check         (bd)          completed
  [x] step-01-qualify-opportunity    (bd)          completed
  [x] step-02-sow-generation        (bd)          completed
  [>] step-03-project-setup          (pm)          in_progress
  [ ] step-04-kickoff-prep           (pm)          not_started
  [ ] step-05-data-request           (pm)          not_started

Gates:
  [x] gate-sow-generation           approved
  [ ] gate-kickoff-prep              pending
```

## Step 9: View Artifacts

```
/crew AF
```

Lists everything that's been produced, with which agent made it, which step, and whether it's a draft or approved.

## Step 10: Start the Next Workflow

Once all steps are completed, run `/crew IN` again and select the next workflow phase. The typical progression:

1. **engagement-kickoff** — Scoping, SOW, project setup
2. **assessment** — Environment profiling, gap analysis, findings, QA
3. **report-generation** — Executive summary, technical report, findings matrix, final QA
4. **remediation-plan** — Prioritization, roadmap, effort estimation, quick wins

Or use **new-engagement** for the full end-to-end lifecycle in a single workflow.

---

## What's Next

- [Architecture](architecture.md) — How all the pieces fit together end-to-end
- [Orchestrator Reference](orchestrator-reference.md) — All 9 `/crew` commands in detail
- [Agent Overview](agents/overview.md) — How agents work, the state preamble protocol
- [Workflow Overview](workflows/overview.md) — How workflows, steps, and gates fit together
- [State Management](state-management.md) — Deep dive into `.crew-state.yaml`
- [Hooks Reference](hooks-reference.md) — How hooks enforce state integrity
- [Installation Guide](installation-guide.md) — Deep dive into what the installer does
- [Troubleshooting](troubleshooting.md) — Common issues and fixes
