# Data Analysis · Week 02 · Data files, columns, types and measurement

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Become confident reading CSVs and spreadsheets and recognising the meaning of each field.

## Where to begin in the tool
Open the sales CSV in Excel or a data viewer; inspect header names, formats, first five rows and source notes.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_2026.csv`](../learning_sales_2026.csv)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=17311s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Rows and columns
each record represents an observation with typed attributes

### 2. Numeric versus categorical
revenue can be summed while region groups results

### 3. Dates
permit period comparisons only when parsed correctly

### 4. Identifiers
customer and order IDs should not be added together.

## Why this skill matters
Why this skill matters: A reporting officer receives a new CSV and must explain each column before preparing a KPI summary. The method is not only about producing an attractive figure. Dates: permit period comparisons only when parsed correctly Identifiers: customer and order IDs should not be added together. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Open the sales CSV in Excel or a data viewer; inspect header names, formats, first five rows and source notes. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Rows and columns — each record represents an observation with typed attributes Then test numeric versus categorical with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply dates and inspect the output for errors.
4. Complete the independent challenge: Classify dataset columns, identify a suspicious format and draft a short data dictionary. Before moving on, check the result against the acceptance criteria: IDs preserve leading zeroes, and revenue or quantity fields have meaningful numeric units.

## Study this worked example
```text
CustomerID=00125 → identifier; 2026-06-01 → date; 18500 → currency
```

**How to interpret the output:** Data files, columns, types and measurement begins with a practical objective: Become confident reading CSVs and spreadsheets and recognising the meaning of each field. In Data Analysis, begin by understanding the workspace and the data rather than memorising a command. Rows and columns: each record represents an observation with typed attributes Numeric versus categorical: revenue can be summed while region groups results Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A reporting officer receives a new CSV and must explain each column before preparing a KPI summary. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Classify dataset columns, identify a suspicious format and draft a short data dictionary.

**What you should hand in:** IDs preserve leading zeroes, and revenue or quantity fields have meaningful numeric units.

## Check your result (after attempting)
Expected evidence: IDs preserve leading zeroes, and revenue or quantity fields have meaningful numeric units. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Letting an import strip leading zeros or treating a customer code as a measurement.

**Common failure:** Letting an import strip leading zeros or treating a customer code as a measurement.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
