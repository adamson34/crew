# Engagement Kickoff Workflow

Runs the full engagement kickoff sequence: opportunity qualification, SOW generation, project setup, kickoff prep, and initial data request.

**Use when:** Starting a new consulting engagement and you want to walk through scoping, SOW, and setup as separate phases.

**Agents involved:** `/bd` (Marcus Webb) for qualification and SOW, `/pm` (Dana Reeves) for project setup and kickoff.

## Steps

| Step | Agent | Prerequisites | Gate After | Produces |
|------|-------|---------------|------------|----------|
| step-00-service-check | `/bd` | — | gate-service-check (conditional) | — |
| step-01-qualify-opportunity | `/bd` | step-00 | — | — |
| step-02-sow-generation | `/bd` | step-01 | gate-sow-generation | `{engagement}-sow.md` |
| step-03-project-setup | `/pm` | step-02 | — | `{engagement}-project-plan.md` |
| step-04-kickoff-prep | `/pm` | step-03 | gate-kickoff-prep | `{engagement}-kickoff-deck.md` |
| step-05-data-request | `/pm` | step-04 | — | `{engagement}-data-request.md` |

## Gates

| Gate | After Step | Blocks | Description |
|------|-----------|--------|-------------|
| gate-service-check | step-00 | step-01 | Review opportunity intake summary (conditional — only for new service opportunities) |
| gate-sow-generation | step-02 | step-03 | SOW must be reviewed and approved before project setup begins |
| gate-kickoff-prep | step-04 | step-05 | Kickoff deck and data request must be reviewed before sending to client |

## Walkthrough

1. **Run `/crew IN`** and select `engagement-kickoff`
2. **`/crew NX`** → "Run `/bd` and select service check"
3. **`/bd`** → Select **QO** (Qualify Opportunity) — Marcus qualifies the engagement
4. **`/bd`** → Select **GS** (Generate SOW) — Marcus generates the Statement of Work
5. **`/crew GA`** → Approve `gate-sow-generation` after reviewing the SOW
6. **`/pm`** → Select **PS** (Project Setup) — Dana creates the project plan
7. **`/pm`** → Select **KP** (Kickoff Prep) — Dana prepares the kickoff deck
8. **`/crew GA`** → Approve `gate-kickoff-prep` after reviewing the kickoff materials
9. **`/pm`** → Select **DR** (Data Request) — Dana generates the client data request
10. **`/crew ST`** → All steps complete

## Templates Used

- `crew/templates/sow-template.md` — Statement of Work structure

## Reference Data

- `crew/data/service-catalog.yaml` — Service offerings for opportunity qualification
- `crew/data/severity-scales.yaml` — Severity scale reference
- `crew/knowledge-base/ot-ics-overview.md` — OT/ICS domain knowledge

---

## See Also

- [Workflow Overview](overview.md) — How workflows, steps, and gates work
- [Marcus Webb (`/bd`)](../agents/bd.md) — Agent handling steps 00–02
- [Dana Reeves (`/pm`)](../agents/pm.md) — Agent handling steps 03–05
