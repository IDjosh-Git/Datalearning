# Power Bi · Week 04 · DAX evaluation contexts

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Understand filter context vs row context

## Before you begin: open the right file
- Download: `learning_sales_2026.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=34053s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
DAX measures are evaluated within a filter context supplied by report filters, slicers, row and column groupings, and CALCULATE. SUM(Sales[Amount]) is therefore not necessarily the same number on every visual row. Row context, by contrast, is the current row when evaluating calculated columns or iterators such as SUMX. CALCULATE changes filter context and may perform context transition in row-context scenarios.

Misunderstanding context causes many “wrong total” problems. A formula may look correct in one table row but behave differently for the grand total because the total is a fresh evaluation under a broader filter context. Do not force every total to equal a naive sum without checking the business rule. Use a small table visual with Date, Region and a measure to observe how different filters affect the same DAX expression.

## Guided walkthrough in the tool
1. Create a base Sales Amount measure and place it in a visual grouped by region.
2. Apply a date slicer and observe which rows and totals change.
3. Create a second measure using CALCULATE to filter to completed orders.
4. Check results for one known region against a manual calculation and discuss why totals may differ.

### Additional hands-on instruction
Write Total Sales := SUMX(Orders, Orders[quantity]*Orders[unit_price_ngn]) and test by region.

## Business case
The same [Revenue] measure shows 50,000 at the company level and 12,000 in the East row. DAX did not change formula: the East row supplied a different filter context. A slicer narrowing the month changes both again. Learn to ask “Which filters are active here?” before rewriting an apparently inconsistent DAX measure.

## Independent practical challenge
Why does a measure change when a slicer is selected?

**Deliverable:** Compare a card before and after selecting a region, then explain why the measure changes.

## Verify your work
State exactly which filters a measure should respect. If a result does not change under a slicer, inspect relationships, CALCULATE modifiers and the visual interaction settings.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
The slicer changes filter context

**Common pitfall:** Assuming measures are precomputed per row.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
