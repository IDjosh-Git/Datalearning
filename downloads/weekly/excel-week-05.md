# Excel · Week 05 · Lookup design

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Build exact-match retrieval without silent errors

## Before you begin: open the right file
- Download: `learning_product_catalog.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: sku, product_name, category, standard_cost_ngn, list_price_ngn.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=19207s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
A lookup retrieves a value using a key. XLOOKUP searches a lookup column and returns the corresponding value from another column. For a product price table, the key should identify exactly one product; if it is not unique, the returned first match may hide inconsistent prices. Use exact matching as the default and supply a clear not-found result so missing keys are visible.

Separate missing matches from legitimate blanks. A product not found in a catalogue is a data-quality issue, not automatically a zero price. Decide how to handle duplicates and confirm the return array is aligned to the lookup array. Compare a few retrieved values with the source record, especially after appending new products. INDEX/MATCH can provide the same pattern in older workbooks.

## Guided walkthrough in the tool
1. Build a Products table with unique ProductID and UnitPrice columns.
2. Enter ProductID in the Sales table and use XLOOKUP to bring the price across.
3. Test a missing product code and decide whether to flag or investigate it.
4. Reconcile two or three manually checked prices and verify duplicate ProductID counts.

### Additional hands-on instruction
Use the product catalog independently and practise exact-match XLOOKUP by SKU; return “Not found” for a missing code.

## Business case
A product catalogue has code P-17 with a price of 4,500, but an old duplicate P-17 row lists 4,200. A lookup returning the first match may silently give the wrong price. Before writing XLOOKUP, decide which catalogue record is authoritative, clean the duplicate and define what should happen for missing codes.

## Independent practical challenge
Retrieve cost by SKU in A2 using Products[SKU] and Products[Cost].

**Deliverable:** Audit the number of missing matches, then explain why category is not a reliable SKU-level key.

## Verify your work
Correct retrieval requires a correct key. If two rows share the lookup key, decide which record should win before treating any lookup result as reliable.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
=XLOOKUP(A2,Products[SKU],Products[Cost],"Not found",0)

**Common pitfall:** Silently treating missing lookup results as zeros.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
