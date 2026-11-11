# AI for Data Analysis · Week 03 · Using AI to understand and clean datasets

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Ask AI for an audit plan and implement transformations in the actual tool rather than trusting prose.

## Where to begin in the tool
In a chat tool paste a non-sensitive schema and five sample rows; request rules compatible with Excel or pandas.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`case_id, topic, initial_prompt, risk, analyst_control`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_ai_review_cases.csv`](../learning_ai_review_cases.csv)
- **Video companion:** https://www.youtube.com/watch?v=TImRJTzphhE (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Schema review
spot identifier versus measure confusion

### 2. Data profiling
request tests for nulls, duplicates and invalid dates

### 3. Cleaning plan
document standardisation rules and data-loss risks

### 4. Human approval
run the generated steps on a copy and inspect changed rows.

## Why this skill matters
Why this skill matters: An analyst imports inconsistent branch reports and needs an auditable cleaning plan. The method is not only about producing an attractive figure. Cleaning plan: document standardisation rules and data-loss risks Human approval: run the generated steps on a copy and inspect changed rows. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. In a chat tool paste a non-sensitive schema and five sample rows; request rules compatible with Excel or pandas. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Schema review — spot identifier versus measure confusion Then test data profiling with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply cleaning plan and inspect the output for errors.
4. Complete the independent challenge: Create an AI-assisted cleaning checklist, run two checks in the practice dataset and show before/after counts. Before moving on, check the result against the acceptance criteria: A valid checklist distinguishes detection from correction; each chosen transformation must be demonstrated with real input rows.

## Study this worked example
```text
Prompt: 'Given columns OrderID, Region, Date, Amount, write five validation checks; do not invent rows or results.'
```

**How to interpret the output:** Using AI to understand and clean datasets begins with a practical objective: Ask AI for an audit plan and implement transformations in the actual tool rather than trusting prose. In AI for Data Analysis, begin by understanding the workspace and the data rather than memorising a command. Schema review: spot identifier versus measure confusion Data profiling: request tests for nulls, duplicates and invalid dates Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: An analyst imports inconsistent branch reports and needs an auditable cleaning plan. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Create an AI-assisted cleaning checklist, run two checks in the practice dataset and show before/after counts.

**What you should hand in:** A valid checklist distinguishes detection from correction; each chosen transformation must be demonstrated with real input rows.

## Check your result (after attempting)
Expected evidence: A valid checklist distinguishes detection from correction; each chosen transformation must be demonstrated with real input rows. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Letting an assistant decide to delete missing records without evaluating analytical impact.

**Common failure:** Letting an assistant decide to delete missing records without evaluating analytical impact.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
