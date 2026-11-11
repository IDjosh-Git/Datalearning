# Applied Statistics · Week 02 · Mean, median, mode and interpreting typical values

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Calculate central tendency and explain what outliers do to the story.

## Where to begin in the tool
Use Excel AVERAGE, MEDIAN and MODE.SNGL, or pandas mean() and median() on a numeric series.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`observation_id, delivery_minutes, basket_value_ngn, satisfaction_score, region, complaint_flag`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_statistics_sample.csv`](../learning_statistics_sample.csv)
- **Video companion:** https://www.youtube.com/watch?v=SzZ6GpcfoQY (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Mean
includes every value and can shift strongly with extremes

### 2. Median
identifies the central sorted observation and is robust to a single outlier

### 3. Mode
identifies the most frequent observed category or number

### 4. Interpretation
choose a typical-value statistic suited to the question and distribution.

## Why this skill matters
Why this skill matters: A store manager needs a realistic typical order size for everyday planning. The method is not only about producing an attractive figure. Mode: identifies the most frequent observed category or number Interpretation: choose a typical-value statistic suited to the question and distribution. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use Excel AVERAGE, MEDIAN and MODE.SNGL, or pandas mean() and median() on a numeric series. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Mean — includes every value and can shift strongly with extremes Then test median with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply mode and inspect the output for errors.
4. Complete the independent challenge: Calculate mean and median for the sample and recommend which better represents a typical order. Before moving on, check the result against the acceptance criteria: The mean is 29.8 and median 13; the unusually high 100 pushes the mean upward.

## Study this worked example
```text
Sales = 10,12,13,14,100
Mean = 29.8; Median = 13
```

**How to interpret the output:** Mean, median, mode and interpreting typical values begins with a practical objective: Calculate central tendency and explain what outliers do to the story. In Applied Statistics, begin by understanding the workspace and the data rather than memorising a command. Mean: includes every value and can shift strongly with extremes Median: identifies the central sorted observation and is robust to a single outlier Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A store manager needs a realistic typical order size for everyday planning. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Calculate mean and median for the sample and recommend which better represents a typical order.

**What you should hand in:** The mean is 29.8 and median 13; the unusually high 100 pushes the mean upward.

## Check your result (after attempting)
Expected evidence: The mean is 29.8 and median 13; the unusually high 100 pushes the mean upward. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Reporting only the mean when the data are skewed by exceptional transactions.

**Common failure:** Reporting only the mean when the data are skewed by exceptional transactions.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
