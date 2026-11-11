# Applied Statistics · Week 06 · Probability and risks in business decisions

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Compute basic unconditional and conditional probabilities using observed counts.

## Where to begin in the tool
Use a contingency table in Excel or a grouped pandas summary with counts and denominators.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`session_id, variant, converted, device, region, basket_items`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_experiment.csv`](../learning_experiment.csv)
- **Video companion:** https://www.youtube.com/watch?v=_IgyaD7vOOA (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Probability
event count divided by appropriate total under the sampling design

### 2. Conditional probability
denominator changes to the condition group

### 3. Independence
compare joint and conditional rates to assess relationships

### 4. Base rates
a risk can look large without the population context.

## Why this skill matters
Why this skill matters: A logistics analyst needs realistic failure probabilities to prioritise interventions. The method is not only about producing an attractive figure. Independence: compare joint and conditional rates to assess relationships Base rates: a risk can look large without the population context. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use a contingency table in Excel or a grouped pandas summary with counts and denominators. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Probability — event count divided by appropriate total under the sampling design Then test conditional probability with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply independence and inspect the output for errors.
4. Complete the independent challenge: Calculate the error rate from 15 defective orders out of 60 and explain its denominator. Before moving on, check the result against the acceptance criteria: P(Error) = 15/60 = 25%; every probability statement names the conditioning group.

## Study this worked example
```text
Late orders: 30/100 = 30%
North late orders: 12/40 = 30%
```

**How to interpret the output:** Probability and risks in business decisions begins with a practical objective: Compute basic unconditional and conditional probabilities using observed counts. In Applied Statistics, begin by understanding the workspace and the data rather than memorising a command. Probability: event count divided by appropriate total under the sampling design Conditional probability: denominator changes to the condition group Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A logistics analyst needs realistic failure probabilities to prioritise interventions. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Calculate the error rate from 15 defective orders out of 60 and explain its denominator.

**What you should hand in:** P(Error) = 15/60 = 25%; every probability statement names the conditioning group.

## Check your result (after attempting)
Expected evidence: P(Error) = 15/60 = 25%; every probability statement names the conditioning group. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Confusing 'of North orders' with 'of all orders' when calculating a conditional rate.

**Common failure:** Confusing 'of North orders' with 'of all orders' when calculating a conditional rate.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
