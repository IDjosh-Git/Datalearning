# Tableau · Week 03 · Build clear bar and line charts

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Select the appropriate view for a question

## Before you begin: open the right file
- Download: `learning_monthly_kpis.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=27620s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Bar charts are effective for comparing categories because a shared baseline helps the eye compare lengths. Line charts are suitable for ordered time series where the connecting line represents a meaningful sequence. In Tableau, dragging a Date field may create a discrete year or a continuous date axis; this choice changes how the view looks and how it groups records. Always verify the date level before interpreting a trend.

Choose colour, labels and sorting to support the question. A ranked bar chart is often easier to read than an unsorted one. In a line chart, displaying every data label may crowd the plot; keep a clean axis and use hover detail as needed. If categories are numerous, group small values responsibly or show a filter rather than forcing unreadable text. Avoid 3D effects and truncated bar axes.

## Guided walkthrough in the tool
1. Create a Region-by-Revenue bar chart and sort categories by total revenue.
2. Create a month-by-Revenue line chart using the correct date level.
3. Add clear titles and tooltips with period, currency unit and source.
4. Test the chart against two known time periods and compare the chosen chart to the question.

### Additional hands-on instruction
Plot monthly sales as a line and regions as bars using monthly KPI data; add clear titles and number formats.

## Business case
A manager asks which product category generates the most revenue. Sort a bar chart by SUM(Revenue) to answer the comparison. If the question changes to whether revenue is increasing month by month, a continuous date axis and line chart are more suitable. Chart choice follows the question; it should not be decided by whichever visual looks more impressive.

## Independent practical challenge
For monthly orders 80, 92, 87, 110, 125 and 119, choose a chart and identify the peak.

**Deliverable:** Confirm grand totals and write a one-sentence finding with units.

## Verify your work
A chart should communicate comparison without extra explanation. Check whether the bar baseline is fair and whether missing months appear as gaps rather than false zeros.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Line chart; May is the peak at 125 orders.

**Common pitfall:** Using many categories on a pie chart instead of bars.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
