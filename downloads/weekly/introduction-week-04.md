# Introduction · Week 04 · Data quality

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Audit missing, duplicate and invalid records

## Before you begin: open the right file
- Download: `learning_sales_quality_lab.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=12881s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Data quality has several dimensions: completeness (required values exist), validity (values meet defined rules), uniqueness (keys are not repeated), consistency (the same category uses the same spelling), and timeliness (the records cover the expected period). A missing delivery date can be harmless for an open order but an error for a completed order. Rules must reflect the business process, not just generic “remove blank rows” advice.

Cleaning a dataset involves decisions that can change the measured outcome. Dropping incomplete records may disproportionately exclude a particular region or customer group. Replacing missing amounts with zero creates artificial observations unless zero is known to be correct. Keep raw input, record each cleaning rule, and count the records affected. Where information cannot be recovered, label the limitation instead of hiding it.

## Guided walkthrough in the tool
1. Profile each column: total rows, null count, distinct count, minimum/maximum where meaningful.
2. Validate business rules: required OrderID, nonnegative quantities, plausible dates and permitted statuses.
3. Investigate duplicates with the intended business key and inspect examples before deleting records.
4. Create a quality log showing issue, affected count, chosen resolution and effect on reported metrics.

### Additional hands-on instruction
Use the intentionally dirty file and create an issue register: field, invalid value, proposed rule, owner and resolution.

## Business case
Suppose 18 of 1,000 orders lack delivery dates. Before dropping those rows, ask whether they are open orders still awaiting delivery or completed deliveries with missing records. If all 18 are open, the omission may be expected; if completed, there is a source-system problem. The same blank value can require very different handling.

## Independent practical challenge
Suggest three data quality tests for an order table.

**Deliverable:** Report how many observations require investigation and which records you would quarantine, not silently remove.

## Verify your work
For a completed-order trend, confirm that completed rows have valid completion dates. Report completeness both as a count and as a percentage; preserve a traceable record of exclusions.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
missing required values; duplicate keys; invalid dates or amounts

**Common pitfall:** Deleting missing records without checking business impact.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
