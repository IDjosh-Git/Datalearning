# Microsoft Excel · Week 02 · Entering, formatting and organising data

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Turn raw entries into a well-typed Excel Table that can be filtered without corrupting the source.

## Where to begin in the tool
Use Home > Number, then select a continuous range and choose Insert > Table with My table has headers.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_2026.csv`](../learning_sales_2026.csv)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=16081s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Data types
quantities are numbers while order IDs should remain text if zeros matter

### 2. Tables
Ctrl+T creates structured ranges that expand when rows are added

### 3. Sorting
use a whole Table rather than a single column to keep records together

### 4. Filters
select Region or Status without deleting rows that do not match.

## Why this skill matters
Why this skill matters: A sales administrator receives daily transactions and must prepare a reliable master table for an analyst. The method is not only about producing an attractive figure. Sorting: use a whole Table rather than a single column to keep records together Filters: select Region or Status without deleting rows that do not match. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use Home > Number, then select a continuous range and choose Insert > Table with My table has headers. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Data types — quantities are numbers while order IDs should remain text if zeros matter Then test tables with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply sorting and inspect the output for errors.
4. Complete the independent challenge: Format dates, currencies and identifiers in the practice file; create tblSales, sort by date and filter one region. Before moving on, check the result against the acceptance criteria: After filtering, every row still has the correct original OrderID and amount; removing the filter restores all records.

## Study this worked example
```text
Headers: OrderID, Date, Region, Units, UnitPrice
Select range → Ctrl+T → Table Design > Name: tblSales
```

**How to interpret the output:** Entering, formatting and organising data begins with a practical objective: Turn raw entries into a well-typed Excel Table that can be filtered without corrupting the source. In Microsoft Excel, begin by understanding the workspace and the data rather than memorising a command. Data types: quantities are numbers while order IDs should remain text if zeros matter Tables: Ctrl+T creates structured ranges that expand when rows are added Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A sales administrator receives daily transactions and must prepare a reliable master table for an analyst. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Format dates, currencies and identifiers in the practice file; create tblSales, sort by date and filter one region.

**What you should hand in:** After filtering, every row still has the correct original OrderID and amount; removing the filter restores all records.

## Check your result (after attempting)
Expected evidence: After filtering, every row still has the correct original OrderID and amount; removing the filter restores all records. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Sorting only the Region column or converting 0007 to numeric 7.

**Common failure:** Sorting only the Region column or converting 0007 to numeric 7.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
