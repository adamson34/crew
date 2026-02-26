# Step 06: Import Engagement History

**Agent:** Dana Reeves (PM)
**Input:** Excel cost build-up spreadsheet (.xlsx)
**Output:** Updated `crew/data/engagement-history.yaml`

---

## Objective

Import historical engagement data from Excel cost build-up spreadsheets into the engagement history database. Historical records are used by agents to benchmark LOE estimates and scope new opportunities against real past project data.

This is an adaptive import — the script extracts raw spreadsheet data, and you interpret the columns. This means the Excel format can change over time without breaking the process.

---

## Instructions

### Phase 1: Extract Raw Data

Ask the user for the path to the Excel file (.xlsx).

Run the extraction script:

```
python3 crew/scripts/import-history.py <path-to-xlsx>
```

The script will:
- Read all sheets in the workbook
- Print a summary showing sheet names, row counts, and column headers
- Write a JSON file (same name as the xlsx, with .json extension)

If the script fails because openpyxl is not installed, tell the user:

> "The import script needs a Python library. Run `pip3 install openpyxl` and then we'll try again."

If the user wants to extract only a specific sheet, use:

```
python3 crew/scripts/import-history.py <path-to-xlsx> --sheet "Sheet Name"
```

### Phase 2: Interpret and Map

Read the JSON file the script produced. For each sheet, determine which columns correspond to the engagement history schema fields:

**Look for these mappings:**
- **Engagement identification**: columns naming the engagement, client, project, or engagement ID
- **Role/hours data**: columns with role names (PM, Consultant, Analyst, Writer, Reviewer) and associated hours or costs
- **Scope indicators**: site counts, asset counts, framework names, duration
- **Cost data**: rates, totals, or pricing columns

Present your mapping to the user:

> "I've read the spreadsheet. Here's how I'd map the columns:
>
> - Column 'X' → engagement name
> - Column 'Y' → role assignment
> - Column 'Z' → estimated hours
> - Column 'W' → actual hours
> - Column 'V' → cost totals
>
> Does this look right? Are there columns I should interpret differently?"

**Do not proceed until the user confirms the mapping.**

If the spreadsheet contains multiple engagements (multiple rows, each representing a different project), map them all. If it contains a single engagement broken into work packages, aggregate the hours by role into a single record.

### Phase 3: Fill in Missing Fields

The spreadsheet may not contain every field in the schema. For any fields not present, ask the user:

1. **Service type** — "What type of engagement was this? (Check `crew/data/service-catalog.yaml` for options)"
2. **Vertical and sub-sector** — "What industry vertical? (e.g., ot-ics) And sub-sector? (e.g., power-generation, water-treatment, oil-gas)"
3. **Scope details** — "How many sites? Approximate asset count? Which frameworks? Remote, on-site, or hybrid?"
4. **Complexity factors** — "What made this engagement harder or easier than a typical project of this type?"
5. **Lessons learned** — "Any lessons learned worth noting for future similar engagements?"
6. **Status** — "Is this engagement completed, in-progress, or cancelled?"

Only ask about fields that are genuinely missing from the spreadsheet. Don't ask about fields you can reasonably infer from the data.

### Phase 4: Write to History

Read the existing `crew/data/engagement-history.yaml`.

**Duplicate check:** If an engagement with the same `engagement_name` already exists in the file, ask:

> "An entry for '{{name}}' already exists. Replace it with the new import, or skip?"

Append the new record(s) to the `engagements` list. Follow the schema documented in the file header. Use the exact field names from the schema.

Save the updated file.

### Phase 5: Confirm

Summarize what was imported:

> "Imported **{{engagement_name}}** into engagement history:
> - Service: {{service_name}}
> - Scope: {{sites}} sites, {{frameworks}}
> - Estimated hours: {{estimated_total}} | Actual hours: {{actual_total}}
> - Cost: {{estimated_cost}} estimated | {{actual_cost}} actual
> - Fields populated: {{count}} of {{total}}
>
> This record is now available to all agents during LOE estimation and opportunity qualification."

Ask: "Want to import another spreadsheet, or are we done?"

---

## Import Metadata

For every record imported, include:

```yaml
import_metadata:
  source_file: "original-filename.xlsx"
  imported_date: "YYYY-MM-DD"
  notes: "Any notes about the import (e.g., actuals not available, hours estimated from billing)"
```
