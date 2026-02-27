# Remediation Plan Workflow

Builds the prioritized remediation roadmap: findings prioritization, multi-phase roadmap, effort estimation, and quick wins identification.

**Use when:** Assessment and reporting are complete. You're ready to give the client an actionable remediation path.

**Agents involved:** `/consultant` (Jake Tanaka) for prioritization, roadmap, and quick wins; `/pm` (Dana Reeves) for effort estimation.

**Requires:** Findings register, compliance matrix, and environment profile from prior workflows.

## Steps

| Step | Agent | Prerequisites | Gate After | Produces |
|------|-------|---------------|------------|----------|
| step-01-prioritization | `/consultant` | — | gate-prioritization | — (prioritization analysis) |
| step-02-roadmap | `/consultant` | step-01 | — | `{engagement}-remediation-roadmap.md` |
| step-03-effort-estimation | `/pm` | step-02 | — | `{engagement}-remediation-roadmap.md` (updated) |
| step-04-quick-wins | `/consultant` | step-03 | — | `{engagement}-remediation-roadmap.md` (finalized) |

The roadmap is a single artifact that gets progressively enriched across steps 02–04. Written to the `deliverables/` directory.

## Gates

| Gate | After Step | Blocks | Description |
|------|-----------|--------|-------------|
| gate-prioritization | step-01 | step-02 | Prioritization rationale reviewed. Client constraints (budget, resources, regulatory deadlines) should be confirmed at this gate. |

## Walkthrough

1. **`/crew IN`** → Select `remediation-plan`
2. **`/consultant`** → Prioritize findings based on risk, compliance impact, and feasibility
3. **`/crew GA`** → Approve `gate-prioritization` (confirm client constraints are reflected)
4. **`/consultant`** → Build the multi-phase roadmap (Phase 1: 0–90 days, Phase 2: 90–180 days, Phase 3: 180+ days)
5. **`/pm`** → Add effort estimates to each roadmap item
6. **`/consultant`** → Identify quick wins (0–30 day actions) and finalize the roadmap

## Input Files

| Input | Pattern | Source |
|-------|---------|--------|
| Findings register | `assessment/{engagement}-findings-register.md` | Assessment workflow |
| Compliance matrix | `assessment/{engagement}-compliance-matrix.md` | Assessment workflow |
| Environment profile | `assessment/{engagement}-environment-profile.md` | Assessment workflow |

## Templates Used

- `crew/templates/remediation-roadmap-template.md`

---

## See Also

- [Workflow Overview](overview.md) — How workflows, steps, and gates work
- [Jake Tanaka (`/consultant`)](../agents/consultant.md) — Steps 01, 02, 04
- [Dana Reeves (`/pm`)](../agents/pm.md) — Step 03
- [Assessment](assessment.md) — Produces input artifacts for this workflow
