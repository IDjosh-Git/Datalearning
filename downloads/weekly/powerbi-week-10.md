# Power Bi · Week 10 · Performance

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Reduce render and model costs

## Before you begin: open the right file
- Download: `learning_sales_2026.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=WH937Gc_8eg&t=10072s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Power BI performance has two major components: model efficiency and visual query work. Reduce unnecessary columns, use suitable data types, design a clean star schema and avoid high-cardinality columns that are not needed. Too many visuals each issuing complex queries can make a report feel slow even when the underlying model is small. Start by measuring actual performance rather than guessing where time is spent.

Performance Analyzer shows visual refresh behaviour and helps identify slow interactions. DAX Studio or model inspection tools can provide deeper analysis where available. Query folding and incremental refresh can matter for large sources, but their usefulness depends on connectivity and deployment design. Never “optimise” by removing necessary filters or changing a measure’s meaning. Confirm identical business answers after every change.

## Guided walkthrough in the tool
1. Record page load and slicer response times using a representative dataset.
2. Open Performance Analyzer and identify the slowest visuals or DAX queries.
3. Reduce redundant visuals or unnecessary model columns, then retest.
4. Compare metrics before and after the change to confirm numerical consistency.

### Additional hands-on instruction
Inspect Performance Analyzer, prune unneeded columns and compare measure output before and after.

## Business case
A report takes five seconds to react to a slicer. Performance Analyzer identifies a matrix with many row groups and expensive measures as the bottleneck. Reduce unnecessary columns or simplify the visual, then measure again. Compare the revenue totals before and after optimising, because faster wrong answers are not useful.

## Independent practical challenge
Which built-in feature can diagnose slow report visuals?

**Deliverable:** Save a quality checklist: totals, refresh, slicers, labels, performance and sharing permissions.

## Verify your work
A measured improvement is more meaningful than a cosmetic one. Document the baseline, change and observed effect, including dataset size and test conditions.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Performance Analyzer

**Common pitfall:** Optimising only DAX while ignoring model design.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
