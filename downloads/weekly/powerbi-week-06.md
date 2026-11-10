# Power Bi · Week 06 · Time intelligence

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Define date continuity and comparison periods

## Before you begin: open the right file
- Download: `learning_monthly_kpis.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=WH937Gc_8eg&t=7494s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Time intelligence compares periods under explicit calendar rules. Create a continuous date table spanning the required history, including dates with no transactions, and relate it to the fact table. Measures can then calculate month-to-date revenue, previous-year revenue or year-over-year variance. Decide whether the business uses calendar months, fiscal periods or custom trading weeks before writing comparisons.

A previous-month comparison can mislead if the current month is incomplete. Comparing the first five days of this month to all of last month mixes time windows. Define how the report handles incomplete periods and late-arriving data. Dates must be typed correctly, the relationship must be active for the intended date role, and filters must not produce a disconnected date range.

## Guided walkthrough in the tool
1. Create and validate a continuous Calendar table with year, month and date columns.
2. Relate Calendar[Date] to the transaction date and check a known month total.
3. Write a previous-year or previous-month measure and display it beside the current value.
4. Label incomplete periods and test the calculation around year and month boundaries.

### Additional hands-on instruction
Create a Calendar table covering the full period, mark it as a date table and compare current to previous month.

## Business case
A dashboard compares November revenue with the previous month. On November 10, the current month has only ten days. Comparing it to all 31 days of October would exaggerate the apparent decline. Decide whether to compare month-to-date periods or completed months and show the comparison explicitly in the measure label.

## Independent practical challenge
Why does YTD need a proper date dimension?

**Deliverable:** Show a missing-month check and explain what happens when time periods are not contiguous.

## Verify your work
A time comparison should state what is being compared: equivalent elapsed days, complete months or another valid business definition. Review months with no transactions explicitly.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Consistent date filtering and time calculations

**Common pitfall:** Comparing partial current periods to full prior periods.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
