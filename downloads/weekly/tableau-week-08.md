# Tableau · Week 08 · Dashboard layout and actions

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Arrange views for clear questions and intentional interactions

## Before you begin: open the right file
- Download: `learning_monthly_kpis.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=29543s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
A Tableau dashboard combines worksheets into a decision-oriented interface. Fixed and tiled containers control layout; tiled containers are often more stable for responsive arrangements. Start by deciding which view needs the most visual attention, then add supporting trends and detail. Dashboard actions enable selecting a mark to filter or highlight other views, but they must be planned rather than attached indiscriminately.

Device layouts allow a mobile arrangement that differs from the desktop version. Test labels, tooltips, touch controls and cross-filter interactions on smaller viewports. A KPI may need to move above a wide trend chart on mobile, and a complex detail table may require a separate view. Do not rely only on colour to indicate a selected state; include clear text feedback where feasible.

## Guided walkthrough in the tool
1. Sketch a one-page dashboard with headline KPI, regional comparison and time trend.
2. Place worksheets into tiled containers with deliberate reading order.
3. Add a filter action from the region chart to the trend, then test its effect.
4. Create or review the phone layout and verify text, actions and visible selections.

### Additional hands-on instruction
Arrange a KPI card, trend and regional bar into a responsive dashboard; add filter actions.

## Business case
A dashboard contains a regional bar chart and a monthly trend. When a user selects West, the trend should show West unless it is explicitly meant to remain companywide. Add a filter action and test both selection and clearing. Create a mobile layout that preserves this task without relying on tiny tooltips or hard-to-tap controls.

## Independent practical challenge
Name three checks before publishing a sales dashboard.

**Deliverable:** Test select/clear behaviour and confirm titles still describe the filtered data.

## Verify your work
Check that clicking a mark filters the correct worksheets and that clearing the selection restores the intended baseline. Every interactive behaviour should help answer a named question.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Check KPI totals, filter interactions and small-screen readability.

**Common pitfall:** Overcrowding dashboards with unrelated visualizations.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
