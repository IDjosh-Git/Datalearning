# Excel · Week 09 · Dashboard UX

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Design decision-focused interactive dashboards

## Before you begin: open the right file
- Download: `learning_monthly_kpis.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=21589s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
A dashboard combines visual elements to support a particular decision. Begin with a hierarchy: a headline KPI, a trend, a category comparison and a small set of diagnostic details. Use consistent units and time windows, clear chart titles and a restrained palette. If users need to select a region, use a slicer or clearly labelled filter. A dashboard should not require readers to reverse-engineer what each measure means.

Interactive controls can silently create inconsistent comparisons. A month slicer may filter revenue but leave a reference target unchanged, producing a misleading variance. Test each slicer against each visual and label any measures intentionally exempt from filtering. Keep the number of charts manageable and ensure they answer the stakeholder’s original questions. Avoid 3D effects, unnecessary legends and cramped labels.

## Guided walkthrough in the tool
1. Write the decision the dashboard is meant to support and define three KPIs.
2. Create a month trend and a regional comparison from validated PivotTables or formulas.
3. Add a slicer and test its effect on every visual and KPI.
4. Ask a new viewer to explain one insight and one next action without receiving a walkthrough.

### Additional hands-on instruction
Use monthly KPI data for revenue, target and margin cards; add a trend chart and region comparison with clear labels.

## Business case
A CEO dashboard displays current revenue, prior-month revenue and change. When a Region slicer selects West, every measure must use the same definition of West unless a KPI is explicitly a companywide benchmark. Test a second region and clear the slicer. The dashboard should not silently mix selected-region sales with an unfiltered target.

## Independent practical challenge
Name three quality checks before publishing a dashboard.

**Deliverable:** Create a short presenter script with headline, evidence, caveat and action.

## Verify your work
Each KPI should state its timeframe and unit. Compare the dashboard values to the source table for two selected months and one specific region before sharing it.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
reconcile totals; test slicers; verify labels/units

**Common pitfall:** Adding decorative charts without business questions.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
