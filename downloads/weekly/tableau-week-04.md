# Tableau · Week 04 · Calculated fields

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Create derived metrics and inspect aggregations

## Before you begin: open the right file
- Download: `learning_sales_2026.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=27233s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Calculated fields create reusable expressions from existing data. For example, [Profit] / [Revenue] is a profit margin, but dividing two row-level fields and averaging the result can produce a different answer from SUM([Profit]) / SUM([Revenue]). This difference is a matter of calculation grain, not formatting. Make the intended business definition explicit before choosing aggregation.

Tableau distinguishes row-level calculations from aggregate calculations. Mixing the two improperly produces errors or misleading results. Use SUM([Profit]) / SUM([Revenue]) for a weighted margin across transactions, with a sensible zero-denominator policy. Format the result as a percentage only after validating its numeric meaning. Test a few groups of unequal size to see why weighted and unweighted approaches differ.

## Guided walkthrough in the tool
1. Create a Profit field or use a source field and confirm its sign and unit.
2. Build a Profit Margin calculated field with aggregate SUMs and zero handling.
3. Display the margin by Region and compare it with separately summed Profit and Revenue.
4. Try an average of row-level margins and explain why it may disagree.

### Additional hands-on instruction
Create an amount expression from quantity and unit price, then aggregate it by category or region.

## Business case
Two regions have profit margins of 10% on 1,000 revenue and 30% on 100 revenue. Their combined margin is (100 + 30) / (1,000 + 100) ≈ 11.8%, not the unweighted average of 20%. A Tableau aggregate calculation using SUM(Profit)/SUM(Revenue) reflects the correct weighting. Validate it against a small table.

## Independent practical challenge
If SUM(Profit)=6,000 and SUM(Sales)=30,000, calculate the profit ratio.

**Deliverable:** Explain why SUM([Price]) * SUM([Quantity]) is not always the same as SUM([Price]*[Quantity]).

## Verify your work
Validate at least one category with a manual ratio of summed values. A plausible percentage is not evidence of correctness if the denominator has the wrong grain.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
20%; divide 6,000 by 30,000 before formatting as percent.

**Common pitfall:** Using row-level ratios as an unweighted aggregate.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
