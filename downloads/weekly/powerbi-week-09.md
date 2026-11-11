# Power BI Desktop · Week 09 · Publishing, sharing and presenting insights

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Explain how Power BI Desktop reports are shared, refreshed and turned into an executive narrative.

## Where to begin in the tool
Use Power BI Service Workspaces, Publish and semantic model settings as allowed by your organisation.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_monthly_kpis.csv`](../learning_monthly_kpis.csv)
- **Video companion:** https://www.youtube.com/watch?v=WH937Gc_8eg&t=7310s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Desktop versus Service
author PBIX locally, then publish where you have permission

### 2. Refresh governance
know gateways, credentials and source ownership

### 3. Access
workspace roles and row-level security should be verified rather than assumed

### 4. Storytelling
prepare a one-page summary with business implications, caveats and next actions.

## Why this skill matters
Why this skill matters: A finance director needs a credible report and an accessible briefing rather than dozens of unexplained charts. The method is not only about producing an attractive figure. Access: workspace roles and row-level security should be verified rather than assumed Storytelling: prepare a one-page summary with business implications, caveats and next actions. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use Power BI Service Workspaces, Publish and semantic model settings as allowed by your organisation. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Desktop versus Service — author PBIX locally, then publish where you have permission Then test refresh governance with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply access and inspect the output for errors.
4. Complete the independent challenge: Write a management-ready insight narrative and a report handover note stating refresh, access and definitions. Before moving on, check the result against the acceptance criteria: Do not claim a scheduled refresh is successful until the published model confirms it; screenshots must show selected filters.

## Study this worked example
```text
Executive summary: 'Revenue is 6.7% below target, mainly in East; review returns and channel mix before assigning a cause.'
```

**How to interpret the output:** Publishing, sharing and presenting insights begins with a practical objective: Explain how Power BI Desktop reports are shared, refreshed and turned into an executive narrative. In Power BI Desktop, begin by understanding the workspace and the data rather than memorising a command. Desktop versus Service: author PBIX locally, then publish where you have permission Refresh governance: know gateways, credentials and source ownership Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A finance director needs a credible report and an accessible briefing rather than dozens of unexplained charts. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Write a management-ready insight narrative and a report handover note stating refresh, access and definitions.

**What you should hand in:** Do not claim a scheduled refresh is successful until the published model confirms it; screenshots must show selected filters.

## Check your result (after attempting)
Expected evidence: Do not claim a scheduled refresh is successful until the published model confirms it; screenshots must show selected filters. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Sending PBIX files as a substitute for access control or implying correlation proves business causation.

**Common failure:** Sending PBIX files as a substitute for access control or implying correlation proves business causation.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

## Management report presentation layout
![Example management presentation storyboard](../../assets/images/dashboard-samples/powerbi-report-storyboard.svg)

Follow the order: decision question, verified evidence, interpretation and recommended action.

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
