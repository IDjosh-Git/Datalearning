# Data Analysis · Week 05 · Basic calculations and descriptive KPIs

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Understand totals, counts, averages and the difference between typical and exceptional values.

## Where to begin in the tool
Use SUM, AVERAGE, COUNTIFS or a grouped calculation, then validate against a few raw records.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`observation_id, delivery_minutes, basket_value_ngn, satisfaction_score, region, complaint_flag`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_statistics_sample.csv`](../learning_statistics_sample.csv)
- **Video companion:** https://www.youtube.com/watch?v=SzZ6GpcfoQY (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Revenue
quantity times price under an explicit status definition

### 2. Counts
distinguish records from unique orders

### 3. Mean and median
provide different views of typical behaviour

### 4. Period comparisons
use an explicit denominator and note missing periods.

## Why this skill matters
Why this skill matters: A shop director wants four trustworthy weekly indicators before debating performance. The method is not only about producing an attractive figure. Mean and median: provide different views of typical behaviour Period comparisons: use an explicit denominator and note missing periods. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use SUM, AVERAGE, COUNTIFS or a grouped calculation, then validate against a few raw records. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Revenue — quantity times price under an explicit status definition Then test counts with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply mean and median and inspect the output for errors.
4. Complete the independent challenge: Calculate paid revenue, unique orders and average order value, then explain an outlier's impact. Before moving on, check the result against the acceptance criteria: AOV = Paid Revenue / Distinct Paid Orders, and the sample median is 23.

## Study this worked example
```text
Five values 20,22,23,25,110 → mean 40, median 23
```

**How to interpret the output:** Basic calculations and descriptive KPIs begins with a practical objective: Understand totals, counts, averages and the difference between typical and exceptional values. In Data Analysis, begin by understanding the workspace and the data rather than memorising a command. Revenue: quantity times price under an explicit status definition Counts: distinguish records from unique orders Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A shop director wants four trustworthy weekly indicators before debating performance. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Calculate paid revenue, unique orders and average order value, then explain an outlier's impact.

**What you should hand in:** AOV = Paid Revenue / Distinct Paid Orders, and the sample median is 23.

## Check your result (after attempting)
Expected evidence: AOV = Paid Revenue / Distinct Paid Orders, and the sample median is 23. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Adding order IDs together or implying mean and median always give similar answers.

**Common failure:** Adding order IDs together or implying mean and median always give similar answers.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
