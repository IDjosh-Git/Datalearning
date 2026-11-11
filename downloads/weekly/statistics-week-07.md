# Applied Statistics · Week 07 · Correlation and exploratory relationship analysis

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Measure associations and explain why they do not automatically establish causation.

## Where to begin in the tool
Use Excel CORREL and scatter charts or pandas corr(numeric_only=True) after checking missingness.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`observation_id, delivery_minutes, basket_value_ngn, satisfaction_score, region, complaint_flag`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_statistics_sample.csv`](../learning_statistics_sample.csv)
- **Video companion:** https://www.youtube.com/watch?v=xZ_z8KWkhXE (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Correlation coefficient
ranges from -1 to 1 for Pearson linear association

### 2. Scatterplots
reveal outliers and curved patterns hidden by one coefficient

### 3. Confounders
other variables may influence both observed measures

### 4. Interventions
causal claims require study design and assumptions beyond a correlation.

## Why this skill matters
Why this skill matters: A marketing team wants to understand which relationships merit controlled testing. The method is not only about producing an attractive figure. Confounders: other variables may influence both observed measures Interventions: causal claims require study design and assumptions beyond a correlation. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use Excel CORREL and scatter charts or pandas corr(numeric_only=True) after checking missingness. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Correlation coefficient — ranges from -1 to 1 for Pearson linear association Then test scatterplots with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply confounders and inspect the output for errors.
4. Complete the independent challenge: Make a scatterplot of advertising spend versus sales and write a cautious interpretation. Before moving on, check the result against the acceptance criteria: A strong association may justify investigation but does not prove advertising caused the difference.

## Study this worked example
```text
Heat and cold drink sales may rise together; rainfall may drive umbrella sales and wet roads
```

**How to interpret the output:** Correlation and exploratory relationship analysis begins with a practical objective: Measure associations and explain why they do not automatically establish causation. In Applied Statistics, begin by understanding the workspace and the data rather than memorising a command. Correlation coefficient: ranges from -1 to 1 for Pearson linear association Scatterplots: reveal outliers and curved patterns hidden by one coefficient Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A marketing team wants to understand which relationships merit controlled testing. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Make a scatterplot of advertising spend versus sales and write a cautious interpretation.

**What you should hand in:** A strong association may justify investigation but does not prove advertising caused the difference.

## Check your result (after attempting)
Expected evidence: A strong association may justify investigation but does not prove advertising caused the difference. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Writing 'increased spend led to higher revenue' solely because a scatterplot slopes upward.

**Common failure:** Writing 'increased spend led to higher revenue' solely because a scatterplot slopes upward.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
