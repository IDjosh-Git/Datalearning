# AI for Data Analysis · Week 02 · Writing clear prompts for analytical tasks

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Build prompts with task, data context, constraints, expected format and verification rules.

## Where to begin in the tool
Use a prompt editor or the AI Tutor and compare a vague request with a structured version.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`case_id, topic, initial_prompt, risk, analyst_control`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_ai_review_cases.csv`](../learning_ai_review_cases.csv)
- **Video companion:** https://www.youtube.com/watch?v=A-duulqglqpbk&t=1110s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Role and audience
specify who receives the answer and the decisions it supports

### 2. Data context
define fields, units and business rules

### 3. Output contract
request a table, code, checklist or bullet summary

### 4. Verification
insist on assumptions, reproducible calculations and explicit unknowns.

## Why this skill matters
Why this skill matters: An operations manager wants comparable weekly KPI reports from an AI-assisted analyst. The method is not only about producing an attractive figure. Output contract: request a table, code, checklist or bullet summary Verification: insist on assumptions, reproducible calculations and explicit unknowns. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use a prompt editor or the AI Tutor and compare a vague request with a structured version. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Role and audience — specify who receives the answer and the decisions it supports Then test data context with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply output contract and inspect the output for errors.
4. Complete the independent challenge: Write a reusable prompt that asks for a KPI summary from synthetic records and requires a quality checklist. Before moving on, check the result against the acceptance criteria: The answer must show which rows count, the arithmetic and at least one limitation rather than invented figures.

## Study this worked example
```text
Prompt: 'Act as retail analyst. Using only the pasted five rows, calculate Paid revenue by Region, show your arithmetic, state exclusions, and flag missing values.'
```

**How to interpret the output:** Writing clear prompts for analytical tasks begins with a practical objective: Build prompts with task, data context, constraints, expected format and verification rules. In AI for Data Analysis, begin by understanding the workspace and the data rather than memorising a command. Role and audience: specify who receives the answer and the decisions it supports Data context: define fields, units and business rules Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: An operations manager wants comparable weekly KPI reports from an AI-assisted analyst. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Write a reusable prompt that asks for a KPI summary from synthetic records and requires a quality checklist.

**What you should hand in:** The answer must show which rows count, the arithmetic and at least one limitation rather than invented figures.

## Check your result (after attempting)
Expected evidence: The answer must show which rows count, the arithmetic and at least one limitation rather than invented figures. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Asking 'analyse everything' and trusting fabricated sources or unsupported totals.

**Common failure:** Asking 'analyse everything' and trusting fabricated sources or unsupported totals.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
