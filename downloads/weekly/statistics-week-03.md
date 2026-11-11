# Applied Statistics · Week 03 · Spread: range, variance and standard deviation

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Describe volatility alongside an average rather than hiding unstable results.

## Where to begin in the tool
Use Excel MIN, MAX, STDEV.S, VAR.S or pandas std(ddof=1) on a numeric range.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`observation_id, delivery_minutes, basket_value_ngn, satisfaction_score, region, complaint_flag`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_statistics_sample.csv`](../learning_statistics_sample.csv)
- **Video companion:** https://www.youtube.com/watch?v=SzZ6GpcfoQY (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Range
maximum minus minimum is a quick but outlier-sensitive span

### 2. Variance
describes average squared deviation under a specified sample/population convention

### 3. Standard deviation
returns spread in the original measurement units

### 4. Comparison
equal averages do not mean equally predictable performance.

## Why this skill matters
Why this skill matters: A workforce manager compares sales consistency between two teams. The method is not only about producing an attractive figure. Standard deviation: returns spread in the original measurement units Comparison: equal averages do not mean equally predictable performance. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use Excel MIN, MAX, STDEV.S, VAR.S or pandas std(ddof=1) on a numeric range. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Range — maximum minus minimum is a quick but outlier-sensitive span Then test variance with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply standard deviation and inspect the output for errors.
4. Complete the independent challenge: Compare two sample series that have equal means and explain which is more consistent. Before moving on, check the result against the acceptance criteria: The means match, but Team B has a substantially larger range and standard deviation.

## Study this worked example
```text
Team A sales = 48,50,52; Team B sales = 20,50,80
Both means = 50; Team B varies much more
```

**How to interpret the output:** Spread: range, variance and standard deviation begins with a practical objective: Describe volatility alongside an average rather than hiding unstable results. In Applied Statistics, begin by understanding the workspace and the data rather than memorising a command. Range: maximum minus minimum is a quick but outlier-sensitive span Variance: describes average squared deviation under a specified sample/population convention Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A workforce manager compares sales consistency between two teams. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Compare two sample series that have equal means and explain which is more consistent.

**What you should hand in:** The means match, but Team B has a substantially larger range and standard deviation.

## Check your result (after attempting)
Expected evidence: The means match, but Team B has a substantially larger range and standard deviation. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Using STDEV.P on a sample while describing the result as a sample standard deviation.

**Common failure:** Using STDEV.P on a sample while describing the result as a sample standard deviation.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
