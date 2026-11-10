# Tableau · Week 05 · Filters and parameters

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Make a dashboard interactive without changing the data

## Before you begin: open the right file
- Download: `learning_monthly_kpis.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=29112s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Filters restrict the records or marks shown in a view, whereas parameters are user-controlled single values that can drive calculations, reference lines or other logic. A Region filter narrows the data, while a parameter called Target Revenue might change a comparison threshold without changing source rows. Different kinds of filters operate at different stages of Tableau’s order of operations, which is important for totals and fixed calculations.

A dashboard with many controls can become harder to use than a static report. Each filter should have a purpose, an understandable default and a clear label. Test what happens when a category has no data. Parameters require an expression to affect the view; creating a parameter alone changes nothing. Explain which calculations respond to filters and which benchmarks are intentionally fixed.

## Guided walkthrough in the tool
1. Add Region as a filter and show it as a compact list on the worksheet.
2. Create a numeric target parameter and show its control.
3. Build a calculated field comparing revenue with the selected target.
4. Change both controls and verify which visual elements react to each.

### Additional hands-on instruction
Add a date filter and a simple KPI selection parameter for monthly sales versus margin.

## Business case
A business target is 500,000 revenue. A parameter lets a manager change that target to 600,000 while keeping transaction data unchanged; a filter selects which region’s actual revenue to compare. These controls do different things. Label each clearly and verify that a target change affects the variance calculation rather than the source records.

## Independent practical challenge
Describe the difference between a Region filter and a Top N parameter.

**Deliverable:** Test the view after clearing filters and document any misleading empty states.

## Verify your work
If an interactive control appears to do nothing, inspect its linked calculation and applicable worksheets. Label targets and periods so users understand what is being compared.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
A filter restricts included records; a parameter holds a user-selected value used by calculations or filters.

**Common pitfall:** Assuming parameter changes automatically filter a view.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
