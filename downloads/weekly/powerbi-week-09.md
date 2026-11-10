# Power Bi · Week 09 · Slicers and interactions

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Test cross-filter behaviour

## Before you begin: open the right file
- Download: `learning_monthly_kpis.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=WH937Gc_8eg&t=7310s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Slicers filter report data, but their effect depends on relationships and visual interactions. A date slicer may control every revenue visual, while a disconnected target table may remain unchanged. Power BI provides Edit Interactions so each chart can filter, highlight or ignore another chart. A user needs predictable behaviour and visible feedback about active selections.

Cross-highlighting differs from filtering: a selected category may highlight a portion of another bar while leaving the overall total visible. That is useful for some questions but confusing for others. Avoid too many slicers or combinations that produce empty visuals. Test sync slicers across pages where relevant, and provide a way to reset the view. Explain any deliberate exceptions, such as a fixed benchmark card.

## Guided walkthrough in the tool
1. Add a Region and Date slicer to a report with three visuals.
2. Choose different regions and check every visual against a validated table.
3. Set Edit Interactions intentionally, comparing filtering and highlighting behaviour.
4. Test reset behaviour and an empty-selection case; add a short hint for confusing interactions.

### Additional hands-on instruction
Use Format > Edit interactions and test how a region chart affects revenue card and time series.

## Business case
A year slicer changes Revenue but leaves a Target card unchanged. This might be a broken relationship or an intentional constant target. Test Edit Interactions, describe the benchmark’s definition, and check the case where no records match. A learner should understand whether the chart is filtering or cross-highlighting the other visuals.

## Independent practical challenge
What do you test before shipping a slicer-heavy report?

**Deliverable:** Record expected behaviour for each slicer and check totals after resetting filters.

## Verify your work
A user should never have to guess why one card changed and another did not. State if a benchmark intentionally remains fixed while the rest of the page filters.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
correct filter effects, totals and empty states

**Common pitfall:** Mistaking a disabled interaction for a broken measure.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
