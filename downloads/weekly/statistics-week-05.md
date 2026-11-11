# Applied Statistics · Week 05 · Sampling design and identifying bias

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Plan a sample that supports a specific conclusion without excluding important customers.

## Where to begin in the tool
Use a random-sample function or clearly described selection procedure and document the full target population.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`session_id, variant, converted, device, region, basket_items`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_experiment.csv`](../learning_experiment.csv)
- **Video companion:** https://www.youtube.com/watch?v=bvglAgAZtXE (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Target population
identify the entire group a decision affects

### 2. Sampling frame
lists who could actually be selected

### 3. Selection bias
missing groups create systematic distortion

### 4. Practical safeguards
stratify by region or channel when those groups matter.

## Why this skill matters
Why this skill matters: A retail board wants an interpretable service survey that is not dominated by one branch or channel. The method is not only about producing an attractive figure. Selection bias: missing groups create systematic distortion Practical safeguards: stratify by region or channel when those groups matter. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use a random-sample function or clearly described selection procedure and document the full target population. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Target population — identify the entire group a decision affects Then test sampling frame with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply selection bias and inspect the output for errors.
4. Complete the independent challenge: Design a 100-person satisfaction sample that covers weekday/weekend and online/in-store groups. Before moving on, check the result against the acceptance criteria: The sampling plan includes each relevant segment and documents its selection probabilities and constraints.

## Study this worked example
```text
Population: all monthly customers
Biased sample: only app users who opened a promotional email
```

**How to interpret the output:** Sampling design and identifying bias begins with a practical objective: Plan a sample that supports a specific conclusion without excluding important customers. In Applied Statistics, begin by understanding the workspace and the data rather than memorising a command. Target population: identify the entire group a decision affects Sampling frame: lists who could actually be selected Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A retail board wants an interpretable service survey that is not dominated by one branch or channel. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Design a 100-person satisfaction sample that covers weekday/weekend and online/in-store groups.

**What you should hand in:** The sampling plan includes each relevant segment and documents its selection probabilities and constraints.

## Check your result (after attempting)
Expected evidence: The sampling plan includes each relevant segment and documents its selection probabilities and constraints. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Reporting opinions of volunteers as if they represent all customers without qualification.

**Common failure:** Reporting opinions of volunteers as if they represent all customers without qualification.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
