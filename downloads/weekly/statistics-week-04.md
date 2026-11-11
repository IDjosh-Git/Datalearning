# Applied Statistics · Week 04 · Frequency tables, histograms and distribution patterns

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Create charts that reveal where observations cluster and which values are unusual.

## Where to begin in the tool
Use Excel Histogram or FREQUENCY and chart bins; alternatively pandas hist() in Python.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`observation_id, delivery_minutes, basket_value_ngn, satisfaction_score, region, complaint_flag`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_statistics_sample.csv`](../learning_statistics_sample.csv)
- **Video companion:** https://www.youtube.com/watch?v=SzZ6GpcfoQY (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Frequency
counts observations in explicit ranges

### 2. Histogram
is used for numeric values rather than categories

### 3. Shape
recognise skewed, roughly symmetric and multi-modal patterns

### 4. Binning
choose defensible bin widths and disclose the range.

## Why this skill matters
Why this skill matters: An e-commerce analyst needs to describe spending distribution before designing customer segments. The method is not only about producing an attractive figure. Shape: recognise skewed, roughly symmetric and multi-modal patterns Binning: choose defensible bin widths and disclose the range. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use Excel Histogram or FREQUENCY and chart bins; alternatively pandas hist() in Python. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Frequency — counts observations in explicit ranges Then test histogram with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply shape and inspect the output for errors.
4. Complete the independent challenge: Build a histogram of customer spend, describe its shape and compare mean with median. Before moving on, check the result against the acceptance criteria: The sample contains two spends in 0–49 and two in 50–99; bins must not overlap.

## Study this worked example
```text
Spend: 10,15,70,90,120
Bins 0–49: 2; 50–99: 2; 100–149: 1
```

**How to interpret the output:** Frequency tables, histograms and distribution patterns begins with a practical objective: Create charts that reveal where observations cluster and which values are unusual. In Applied Statistics, begin by understanding the workspace and the data rather than memorising a command. Frequency: counts observations in explicit ranges Histogram: is used for numeric values rather than categories Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: An e-commerce analyst needs to describe spending distribution before designing customer segments. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Build a histogram of customer spend, describe its shape and compare mean with median.

**What you should hand in:** The sample contains two spends in 0–49 and two in 50–99; bins must not overlap.

## Check your result (after attempting)
Expected evidence: The sample contains two spends in 0–49 and two in 50–99; bins must not overlap. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Using tiny or arbitrary bins to exaggerate patterns or hiding extreme observations.

**Common failure:** Using tiny or arbitrary bins to exaggerate patterns or hiding extreme observations.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
