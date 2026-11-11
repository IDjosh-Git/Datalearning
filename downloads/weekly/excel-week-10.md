# Microsoft Excel · Week 10 · Excel analytics capstone: dataset to executive dashboard

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Independently design, calculate, validate, present and submit a professional Excel dashboard.

## Where to begin in the tool
Start from a fresh copy of the project dataset and create separate Raw, Clean, Analysis, Dashboard and Notes sheets.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`, `complete`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned, complete.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_quality_lab.csv`](../learning_sales_quality_lab.csv)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=23762s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Project scope
define the decision and business questions before touching formulas

### 2. Data preparation
validate keys, dates, amounts and missing records

### 3. Dashboard delivery
include KPI calculations, charts, slicers and interpretations

### 4. Evidence
export dashboard PDF and attach your workbook, quality checks and one-page findings.

## Why this skill matters
Why this skill matters: A fictional retail company has asked you to prepare an end-to-end monthly sales performance review for its leadership team. The method is not only about producing an attractive figure. Dashboard delivery: include KPI calculations, charts, slicers and interpretations Evidence: export dashboard PDF and attach your workbook, quality checks and one-page findings. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Start from a fresh copy of the project dataset and create separate Raw, Clean, Analysis, Dashboard and Notes sheets. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Project scope — define the decision and business questions before touching formulas Then test data preparation with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply dashboard delivery and inspect the output for errors.
4. Complete the independent challenge: Deliver an .xlsx workbook, a dashboard image or PDF, a one-page report and a short validation checklist for instructor review. Before moving on, check the result against the acceptance criteria: Instructor should reproduce totals and confirm a slicer changes relevant visuals; a 70/100 score is required for completion.

## Study this worked example
```text
Revenue = SUM(Paid Revenue); AOV = Paid Revenue/Distinct Paid Orders
Checks: source total = summary total; filters reconcile by region
```

**How to interpret the output:** Excel analytics capstone: dataset to executive dashboard begins with a practical objective: Independently design, calculate, validate, present and submit a professional Excel dashboard. In Microsoft Excel, begin by understanding the workspace and the data rather than memorising a command. Project scope: define the decision and business questions before touching formulas Data preparation: validate keys, dates, amounts and missing records Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A fictional retail company has asked you to prepare an end-to-end monthly sales performance review for its leadership team. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Deliver an .xlsx workbook, a dashboard image or PDF, a one-page report and a short validation checklist for instructor review.

**What you should hand in:** Instructor should reproduce totals and confirm a slicer changes relevant visuals; a 70/100 score is required for completion.

## Check your result (after attempting)
Expected evidence: Instructor should reproduce totals and confirm a slicer changes relevant visuals; a 70/100 score is required for completion. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Submitting only a decorative screenshot without calculations, source attribution or reasoning.

**Common failure:** Submitting only a decorative screenshot without calculations, source attribution or reasoning.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

## Dashboard design reference
![Example Microsoft Excel dashboard layout](../../assets/images/dashboard-samples/excel-dashboard-wireframe.svg)

Study the KPI strip, timeline, ranking, filters and notes. It is an illustrative wireframe, not a working dashboard or calculated analysis.

## Management report presentation layout
![Example management presentation storyboard](../../assets/images/dashboard-samples/excel-report-storyboard.svg)

Follow the order: decision question, verified evidence, interpretation and recommended action.

## Final Capstone Project · required note
You have reached Week 10. Complete a reproducible end-to-end analysis and submit evidence for your instructor to review. Identify the audience and business question; document the source, cleaning, transformations and checks; present useful visuals and findings; and write recommendations with limitations.

**Submission:** [Open your Microsoft Excel capstone submission page](../../capstone.html?course=excel). Sign in and synchronise all ten completed weeks before uploading. Attach your native project file and readable dashboard/report screenshots (up to four files; 12 MB per file, 32 MB total).

**Rubric (100 points):** problem/objectives 25, data quality 20, technical implementation 20, evidence-based findings 20, communication/evidence 15. An instructor reviews each submission; 70/100 is the pass threshold. Never upload personal or confidential business information.

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
