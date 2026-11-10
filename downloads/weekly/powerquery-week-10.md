# Power Query · Week 10 · M basics and refresh-ready pipeline

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Read transformation code and document refresh checks

## Before you begin: open the right file
- Download: `learning_sales_quality_lab.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=VO-MyVMKUC4.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Power Query uses the M language. A query is commonly a `let` expression containing named transformation steps followed by an `in` expression that specifies the final output. You do not need to memorise every function to audit a query: read the steps in order and identify which step changes the column shape, type or row count. The Advanced Editor helps inspect and edit these expressions when the interface is insufficient.

A reliable refresh pipeline has predictable inputs, clear step names and validation checks. A new source column, changed category spelling or unexpected timestamp format can break previously successful steps. Prefer robust transformations over hard-coded manual fixes, but do not suppress errors without investigating them. Document source location, owner, refresh frequency, row-count checks and the expected output schema.

## Guided walkthrough in the tool
1. Open Advanced Editor and identify the Source, transformation steps and final in expression.
2. Rename one step clearly and verify that subsequent steps reference its new name.
3. Refresh with an updated file and compare column types, row counts, errors and totals.
4. Write a refresh checklist containing expected file structure and steps for investigating failures.

### Additional hands-on instruction
Open Advanced Editor and trace Source → Changed Type → Cleaned Region → Grouped Rows with friendly names.

## Business case
A query in Advanced Editor contains Source, Changed Type and Filtered Rows steps. A renamed source column can break Changed Type. Instead of suppressing the error, trace the dependency, update the step and refresh again. Record the expected schema, row count and numeric control total as part of a repeatable production checklist.

## Independent practical challenge
What must be verified before scheduling a refreshed query?

**Deliverable:** Refresh safely and supply a short step-by-step data-preparation handover.

## Verify your work
A refresh that runs without errors may still produce incorrect totals. Confirm that both schema and metrics remain valid, and keep a record of any rejected rows.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Source access, data types, row counts, errors, and expected totals.

**Common pitfall:** Assuming a successful refresh means all numbers are correct.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
