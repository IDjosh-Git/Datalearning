# Tableau · Week 10 · Tableau portfolio project

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Publish a reproducible analysis story with validations

## Before you begin: open the right file
- Download: `learning_sales_2026.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=29327s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
A portfolio project demonstrates repeatable analytical reasoning, not just software fluency. Choose a focused business question, clean the dataset, validate metrics and build an accessible dashboard. Include a data dictionary and a calculation note so another analyst can understand what each chart means. The final deliverable should identify an action someone could realistically take based on the findings.

Before publishing a Tableau workbook or Tableau Public view, check confidentiality and sharing permissions. Public sharing is not suitable for sensitive data. Provide a clear note on data sources, refresh date and known limitations. Test workbook behaviour under filters and device layouts, and verify that a reader cannot draw a mistaken conclusion from an inconsistent denominator or truncated axis.

## Guided walkthrough in the tool
1. State the business question, target audience, source and data-grain assumptions.
2. Build a small model and calculate two independently validated KPIs.
3. Produce a dashboard with a trend and one diagnostic breakdown, then test all actions.
4. Write a brief findings page and include evidence for reproducibility and privacy checks.

### Additional hands-on instruction
Build a complete retail performance story with at least two linked views and one validated KPI.

## Business case
Before publishing a Tableau portfolio dashboard, inspect the data for personal identifiers and confirm that public sharing is appropriate. Test dashboard actions and reconcile two selected KPIs against the source. Include a one-page project brief explaining metrics, assumptions, limits and recommendation. A portfolio should demonstrate trustworthiness as well as design skill.

## Independent practical challenge
List five portfolio handover artifacts.

**Deliverable:** Save a handover note with definitions, data provenance, limitations and proposed business action.

## Verify your work
A reviewer should be able to reproduce the main numbers and identify the scope of the dataset. Include an explicit note when any presented figures are synthetic or illustrative.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Data assumptions, calculated fields, dashboard, validation checks and a recommendation.

**Common pitfall:** Publishing a polished view without checking totals.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
