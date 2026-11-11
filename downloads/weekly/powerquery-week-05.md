# Power Query · Week 05 · Custom columns, filtering and conditional business rules

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Create transparent derived labels and filter only records that meet published KPI definitions.

## Where to begin in the tool
Use Add Column > Conditional Column or Custom Column, then filter Status using its dropdown.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_2026.csv`](../learning_sales_2026.csv)
- **Video companion:** https://www.youtube.com/watch?v=WH937Gc_8eg&t=1880s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Conditional logic
classify orders by stated thresholds

### 2. Row-level calculations
use custom columns where inputs exist per record

### 3. Business inclusion
paid orders may differ from gross bookings

### 4. Quality controls
compare included and excluded row counts.

## Why this skill matters
Why this skill matters: A sales director needs a stable paid-sales report rather than a shifting mixture of booked and realised revenue. The method is not only about producing an attractive figure. Business inclusion: paid orders may differ from gross bookings Quality controls: compare included and excluded row counts. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use Add Column > Conditional Column or Custom Column, then filter Status using its dropdown. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Conditional logic — classify orders by stated thresholds Then test row-level calculations with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply business inclusion and inspect the output for errors.
4. Complete the independent challenge: Build a high-value classification and create a Paid-only query for reported realised revenue. Before moving on, check the result against the acceptance criteria: Every high-value result follows the chosen threshold; excluded statuses are documented.

## Study this worked example
```text
if [Revenue] >= 50000 then "High" else "Standard"
Filter Status = "Paid"
```

**How to interpret the output:** Custom columns, filtering and conditional business rules begins with a practical objective: Create transparent derived labels and filter only records that meet published KPI definitions. In Power Query, begin by understanding the workspace and the data rather than memorising a command. Conditional logic: classify orders by stated thresholds Row-level calculations: use custom columns where inputs exist per record Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A sales director needs a stable paid-sales report rather than a shifting mixture of booked and realised revenue. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Build a high-value classification and create a Paid-only query for reported realised revenue.

**What you should hand in:** Every high-value result follows the chosen threshold; excluded statuses are documented.

## Check your result (after attempting)
Expected evidence: Every high-value result follows the chosen threshold; excluded statuses are documented. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Hardcoding filtering rules that silently omit refunds or exceptional valid records.

**Common failure:** Hardcoding filtering rules that silently omit refunds or exceptional valid records.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
