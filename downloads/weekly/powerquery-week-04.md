# Power Query · Week 04 · Transforming text, split columns and date fields

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Standardise inconsistent labels and create helpful structured fields without changing source meaning.

## Where to begin in the tool
Use Transform > Format > Trim/Clean, Split Column by Delimiter and Add Column > Date.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`, `complete`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned, complete.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_quality_lab.csv`](../learning_sales_quality_lab.csv)
- **Video companion:** https://www.youtube.com/watch?v=WH937Gc_8eg&t=1880s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Trim and Clean
remove unwanted whitespace and nonprinting characters

### 2. Text case
choose a consistent, business-approved region spelling

### 3. Splitting
parse composed codes only when the delimiter format is reliable

### 4. Date extraction
derive Year and Month from Date-typed fields.

## Why this skill matters
Why this skill matters: A branch system encodes channel and identifier in one text field and needs a dashboard-ready schema. The method is not only about producing an attractive figure. Splitting: parse composed codes only when the delimiter format is reliable Date extraction: derive Year and Month from Date-typed fields. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use Transform > Format > Trim/Clean, Split Column by Delimiter and Add Column > Date. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Trim and Clean — remove unwanted whitespace and nonprinting characters Then test text case with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply splitting and inspect the output for errors.
4. Complete the independent challenge: Clean a Region field, split one structured ID and create year and month columns. Before moving on, check the result against the acceptance criteria: '  north ' should become 'North'; derived month remains numeric or uses an explicit date dimension.

## Study this worked example
```text
Text.Trim([Region]); Text.Proper(Text.Trim([Region]))
Date.Year([OrderDate]); Date.Month([OrderDate])
```

**How to interpret the output:** Transforming text, split columns and date fields begins with a practical objective: Standardise inconsistent labels and create helpful structured fields without changing source meaning. In Power Query, begin by understanding the workspace and the data rather than memorising a command. Trim and Clean: remove unwanted whitespace and nonprinting characters Text case: choose a consistent, business-approved region spelling Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A branch system encodes channel and identifier in one text field and needs a dashboard-ready schema. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Clean a Region field, split one structured ID and create year and month columns.

**What you should hand in:** '  north ' should become 'North'; derived month remains numeric or uses an explicit date dimension.

## Check your result (after attempting)
Expected evidence: '  north ' should become 'North'; derived month remains numeric or uses an explicit date dimension. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Removing leading zeroes from IDs or splitting inconsistent codes without checking failures.

**Common failure:** Removing leading zeroes from IDs or splitting inconsistent codes without checking failures.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
