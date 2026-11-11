# Applied Statistics · Week 01 · Discovering statistical tools and data types

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Understand how Excel's Analysis ToolPak or Python notebooks support practical statistical questions.

## Where to begin in the tool
Open Excel, inspect the Data tab and enable Analysis ToolPak when available; alternatively use pandas describe() in a notebook.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`observation_id, delivery_minutes, basket_value_ngn, satisfaction_score, region, complaint_flag`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_statistics_sample.csv`](../learning_statistics_sample.csv)
- **Video companion:** https://www.youtube.com/watch?v=bvglAgAZtXE (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Measurement types
categorical, ordinal and numeric variables require different summaries

### 2. Population versus sample
define who you want to understand before selecting data

### 3. Tool interfaces
know where descriptive outputs appear and how to preserve inputs

### 4. Research questions
name the metric, period and comparison group.

## Why this skill matters
Why this skill matters: A customer experience team wants to measure service changes using a small but clearly described dataset. The method is not only about producing an attractive figure. Tool interfaces: know where descriptive outputs appear and how to preserve inputs Research questions: name the metric, period and comparison group. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Open Excel, inspect the Data tab and enable Analysis ToolPak when available; alternatively use pandas describe() in a notebook. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Measurement types — categorical, ordinal and numeric variables require different summaries Then test population versus sample with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply tool interfaces and inspect the output for errors.
4. Complete the independent challenge: Classify the columns in a sales dataset and write a measurable question before calculating statistics. Before moving on, check the result against the acceptance criteria: CustomerID must not be summed, and the chosen statistical operation matches the variable type.

## Study this worked example
```text
CustomerID is an identifier; Revenue is numeric; Rating 1–5 is ordinal
```

**How to interpret the output:** Discovering statistical tools and data types begins with a practical objective: Understand how Excel's Analysis ToolPak or Python notebooks support practical statistical questions. In Applied Statistics, begin by understanding the workspace and the data rather than memorising a command. Measurement types: categorical, ordinal and numeric variables require different summaries Population versus sample: define who you want to understand before selecting data Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A customer experience team wants to measure service changes using a small but clearly described dataset. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Classify the columns in a sales dataset and write a measurable question before calculating statistics.

**What you should hand in:** CustomerID must not be summed, and the chosen statistical operation matches the variable type.

## Check your result (after attempting)
Expected evidence: CustomerID must not be summed, and the chosen statistical operation matches the variable type. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Treating survey ratings as perfectly precise measurements or assuming a convenience sample represents everyone.

**Common failure:** Treating survey ratings as perfectly precise measurements or assuming a convenience sample represents everyone.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
