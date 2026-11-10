# Tableau · Week 09 · Stories and accessibility

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Explain insight, evidence, and recommendation visually

## Before you begin: open the right file
- Download: `learning_monthly_kpis.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=29112s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
A data story explains why a finding matters. Rather than showing every chart built during analysis, select a sequence that moves from the business question to evidence, plausible interpretations and a recommendation. Tableau Story Points can capture a sequence of visual states or dashboard views. Each point needs a concise title that makes a claim supported by the data, not merely “Chart 1”.

Accessibility and honesty strengthen the story. Use readable text, meaningful colour contrast, descriptive titles and consistent units. Disclose missing data, assumptions and uncertainty, especially when a correlation may be mistaken for a causal effect. Explain the decisions a stakeholder can take and what additional evidence would change the recommendation. A good story retains enough detail for technical reviewers to reproduce the result.

## Guided walkthrough in the tool
1. Choose one quantified finding and write a descriptive headline.
2. Arrange a baseline comparison, explanatory breakdown and recommendation across three story points.
3. Add sources, date range and methodological caveats.
4. Ask a reviewer to challenge the conclusion using the same charts, and revise unclear language.

### Additional hands-on instruction
Add short captions, colour-independent labels, descriptive titles and a next-action callout.

## Business case
One Tableau story point says “Sales fell 12% in the West”. The next should show whether the decline came from order volume, basket size or returns, rather than merely repeating the same chart in another colour. A final point can propose an investigation and disclose missing data. The flow should move from evidence to reasonable action.

## Independent practical challenge
Write a one-sentence observation and recommended follow-up for that change.

**Deliverable:** Produce an executive summary that does not imply the chart proves causation.

## Verify your work
A strong story lets a reader distinguish what the data directly shows from the analyst’s hypothesis. Never use a visually persuasive graphic to imply certainty the evidence does not support.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Conversion fell 3 percentage points; compare channel mix and tracking before attributing a cause.

**Common pitfall:** Claiming causation from a chart alone.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
