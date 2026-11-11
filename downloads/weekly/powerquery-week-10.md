# Power Query · Week 10 · Power Query capstone: reliable data preparation pipeline

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Prepare an auditable ETL output and show how downstream dashboards can consume it.

## Where to begin in the tool
Start from two raw CSV files, reference them as sources and record every Applied Step.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`, `complete`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned, complete.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_quality_lab.csv`](../learning_sales_quality_lab.csv)
- **Video companion:** https://www.youtube.com/watch?v=VO-MyVMKUC4 (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Input quality
profile nulls, errors and identifiers

### 2. Transformations
type, standardise, append and merge where necessary

### 3. Dashboard output
create tidy month-region KPI table and a preview chart or layout

### 4. Handover
document source locations, Applied Steps, refresh, control totals and exceptions.

## Why this skill matters
Why this skill matters: A retail organisation wants a controlled monthly file-refresh process that supplies its BI dashboards. The method is not only about producing an attractive figure. Dashboard output: create tidy month-region KPI table and a preview chart or layout Handover: document source locations, Applied Steps, refresh, control totals and exceptions. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Start from two raw CSV files, reference them as sources and record every Applied Step. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Input quality — profile nulls, errors and identifiers Then test transformations with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply dashboard output and inspect the output for errors.
4. Complete the independent challenge: Submit a refreshable Power Query pipeline and a clear analytical reporting dataset with a short interpretation. Before moving on, check the result against the acceptance criteria: Re-running the transformation on the same inputs reproduces row counts and sums; changes to source are traceable.

## Study this worked example
```text
Deliverables: Excel workbook with queries or PBIX, cleaned output CSV, steps and reconciliation log
```

**How to interpret the output:** Power Query capstone: reliable data preparation pipeline begins with a practical objective: Prepare an auditable ETL output and show how downstream dashboards can consume it. In Power Query, begin by understanding the workspace and the data rather than memorising a command. Input quality: profile nulls, errors and identifiers Transformations: type, standardise, append and merge where necessary Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A retail organisation wants a controlled monthly file-refresh process that supplies its BI dashboards. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Submit a refreshable Power Query pipeline and a clear analytical reporting dataset with a short interpretation.

**What you should hand in:** Re-running the transformation on the same inputs reproduces row counts and sums; changes to source are traceable.

## Check your result (after attempting)
Expected evidence: Re-running the transformation on the same inputs reproduces row counts and sums; changes to source are traceable. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Sharing only the final CSV without the transform logic, source schema or exception handling.

**Common failure:** Sharing only the final CSV without the transform logic, source schema or exception handling.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

## Dashboard design reference
![Example Power Query dashboard layout](../../assets/images/dashboard-samples/powerquery-dashboard-wireframe.svg)

Study the KPI strip, timeline, ranking, filters and notes. It is an illustrative wireframe, not a working dashboard or calculated analysis.

## Management report presentation layout
![Example management presentation storyboard](../../assets/images/dashboard-samples/powerquery-report-storyboard.svg)

Follow the order: decision question, verified evidence, interpretation and recommended action.

## Final Capstone Project · required note
You have reached Week 10. Complete a reproducible end-to-end analysis and submit evidence for your instructor to review. Identify the audience and business question; document the source, cleaning, transformations and checks; present useful visuals and findings; and write recommendations with limitations.

**Submission:** [Open your Power Query capstone submission page](../../capstone.html?course=powerquery). Sign in and synchronise all ten completed weeks before uploading. Attach your native project file and readable dashboard/report screenshots (up to four files; 12 MB per file, 32 MB total).

**Rubric (100 points):** problem/objectives 25, data quality 20, technical implementation 20, evidence-based findings 20, communication/evidence 15. An instructor reviews each submission; 70/100 is the pass threshold. Never upload personal or confidential business information.

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
