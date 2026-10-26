# Data Analysis Learning Path — Mastery Curriculum (Version 33)

## Learning design standard

Every module follows: **Business why → mechanism → worked example → expected output → professional tip → common trap → 2 hands-on knowledge checks with worked solutions → key takeaways**.

All examples refer to the fictional six-order retail training dataset described in `downloads/MASTERY_DATA_DICTIONARY.md` unless labelled otherwise. This is an editorial learning resource, not a claim of externally accredited courses.


# SQL for Data Analytics — 10 modules

## Module 01: SQL foundations and relational thinking

**Learning outcome:** Return a trustworthy transaction-level extract.

### Why it matters
A retail manager asks which orders were completed. A database stores repeated transactions consistently, and SQL retrieves the precise rows required for the decision.

### How it works
A table has a row grain (one order here), typed columns, and an identifying key. SELECT chooses columns, FROM chooses the table, WHERE restricts rows, and ORDER BY makes presentation deterministic. The engine parses SQL, builds a query plan, and evaluates it on stored rows.

### Worked example

```sql
SELECT order_id, customer, quantity, unit_price
FROM orders
WHERE status = 'Completed'
ORDER BY order_id
LIMIT 3;
```

**Expected output / verification**

```text
order_id | customer | quantity | unit_price
1001     | Amina    | 2        | 150000
1002     | Kola     | 5        | 8000
1004     | Ngozi    | 4        | 18000
```

**💡 Pro tip:** List only required columns; ORDER BY before LIMIT makes the sample reproducible.

**⚠️ Common trap:** Without ORDER BY, LIMIT does not guarantee which three rows are returned.

### 🚀 Knowledge checks
1. Why is order_id a more reliable identifier than customer?
   - **Worked solution:** Several orders can belong to one customer; order_id uniquely identifies each transaction.
2. Change the query to return the two newest completed orders.
   - **Worked solution:** Keep the same SELECT and WHERE; replace ORDER BY with order_date DESC, order_id DESC and LIMIT 2. Expected IDs: 1006, 1005.

**📌 Key takeaways:** Identify table grain; SELECT specific columns; WHERE filters; ORDER BY makes results stable.

## Module 02: Filtering, Boolean logic and sorting

**Learning outcome:** Distinguish row eligibility from display order.

### Why it matters
Teams often ask for one region, one status, and a minimum transaction size; incorrect AND/OR logic quietly changes reported sales.

### How it works
WHERE evaluates a Boolean condition per row, before grouping. AND binds more tightly than OR, so brackets communicate the intended condition. Text equality and numeric comparisons differ; NULL requires IS NULL, not = NULL.

### Worked example

```sql
SELECT order_id, region, quantity * unit_price AS gross_value
FROM orders
WHERE status='Completed' AND region IN ('East','West')
  AND quantity * unit_price >= 40000
ORDER BY gross_value DESC, order_id;
```

**Expected output / verification**

```text
order_id | region | gross_value
1001     | East   | 300000
1005     | West   | 150000
1002     | West   | 40000
```

**💡 Pro tip:** Filter timestamps with an inclusive start and exclusive next-day boundary for portable date ranges.

**⚠️ Common trap:** WHERE region='East' OR region='West' AND status='Completed' also admits returned East orders.

### 🚀 Knowledge checks
1. Which operator handles several acceptable regions?
   - **Worked solution:** IN ('East','West') is clearer than repeated OR expressions.
2. Find completed orders whose quantity is less than 3.
   - **Worked solution:** Use WHERE status='Completed' AND quantity < 3. Expected order IDs: 1001, 1005, 1006.

**📌 Key takeaways:** Filter before aggregation; parenthesize mixed conditions; sort using an explicit tie-break.

## Module 03: Aggregations and KPI definitions

**Learning outcome:** Calculate net sales with a clear numerator and denominator.

### Why it matters
A performance dashboard must reconcile to finance: one returned order must not inflate completed-order revenue.

### How it works
GROUP BY forms one group per region; SUM reduces rows to a metric. WHERE removes unqualified transactions before aggregation; HAVING filters completed groups. Financial reporting must define whether revenue includes tax, discounts, refunds and returns.

### Worked example

```sql
SELECT region, COUNT(*) AS completed_orders,
       SUM(quantity*unit_price) AS revenue
FROM orders
WHERE status='Completed'
GROUP BY region
ORDER BY revenue DESC;
```

**Expected output / verification**

```text
region | completed_orders | revenue
East   | 2                | 316000
West   | 2                | 190000
North  | 1                | 72000
TOTAL  | 5                | 578000
```

**💡 Pro tip:** Validate the total with an independent ungrouped SUM query (should be 578000).

**⚠️ Common trap:** COUNT(*) counts rows; COUNT(column) ignores NULLs. Also never SUM a rate such as margin percentage.

### 🚀 Knowledge checks
1. How is profit calculated in this example?
   - **Worked solution:** SUM(quantity*(unit_price-unit_cost)) on completed orders = 135000.
2. Return only regions with completed revenue above 180000.
   - **Worked solution:** Append HAVING SUM(quantity*unit_price)>180000: East and West remain.

**📌 Key takeaways:** Know each KPI definition; group at the requested grain; reconcile aggregates to source totals.

## Module 04: Joins and relationship cardinality

**Learning outcome:** Enrich facts without accidentally duplicating revenue.

### Why it matters
Order records may hold a customer_id while the customer segment sits in a separate table; analyses need reliable dimension joins.

### How it works
JOIN matches related keys. One-to-many means a customer can have many orders; many-to-many or duplicate dimension keys can multiply rows. An INNER JOIN keeps matches, while LEFT JOIN keeps all rows on the left and flags unmatched reference data.

### Worked example

```sql
SELECT o.order_id, c.segment, o.quantity*o.unit_price AS revenue
FROM orders AS o
LEFT JOIN customers AS c ON o.customer_id=c.customer_id
WHERE o.status='Completed'
ORDER BY o.order_id LIMIT 3;
```

**Expected output / verification**

```text
order_id | segment  | revenue
1001     | Consumer | 300000
1002     | Business | 40000
1004     | Business | 72000
```

**💡 Pro tip:** Check that the sum before and after a many-to-one lookup join is still 578000.

**⚠️ Common trap:** Do not join on non-unique names or forget the ON clause; check row counts and missing keys.

### 🚀 Knowledge checks
1. Why prefer LEFT JOIN when auditing master data?
   - **Worked solution:** It retains unmatched orders so bad or missing customer IDs remain visible.
2. Write a missing-reference check.
   - **Worked solution:** SELECT COUNT(*) FROM orders o LEFT JOIN customers c ON o.customer_id=c.customer_id WHERE c.customer_id IS NULL; returns 0 for the training data.

**📌 Key takeaways:** Join on stable keys; know cardinality; test unmatched keys and duplicated totals.

## Module 05: NULLs, CASE and data quality

**Learning outcome:** Translate raw statuses into explicit business categories.

### Why it matters
Reports routinely distinguish completed, returned and pending transactions, plus unknown values that must not silently fall into a valid bucket.

### How it works
NULL means unknown or missing, not zero or blank text. CASE evaluates WHEN branches in order; COALESCE chooses the first non-NULL input. A quality label should be mutually exclusive and include an ELSE branch.

### Worked example

```sql
SELECT order_id, status,
 CASE WHEN status='Completed' THEN 'Recognised'
      WHEN status='Returned' THEN 'Reversal'
      ELSE 'Review' END AS status_group
FROM orders ORDER BY order_id LIMIT 4;
```

**Expected output / verification**

```text
order_id | status    | status_group
1001     | Completed | Recognised
1002     | Completed | Recognised
1003     | Returned  | Reversal
1004     | Completed | Recognised
```

**💡 Pro tip:** Inspect DISTINCT status values before writing a CASE mapping.

**⚠️ Common trap:** WHERE status <> 'Completed' does not capture NULL statuses; test IS NULL explicitly.

### 🚀 Knowledge checks
1. How many Returned rows are in the training dataset?
   - **Worked solution:** One. Filter with WHERE status='Returned', and order 1003 is returned.
2. Flag an unexpected status without discarding it.
   - **Worked solution:** CASE WHEN status IN ('Completed','Returned') THEN 'Known' ELSE 'Investigate' END handles other and NULL values.

**📌 Key takeaways:** Distinguish NULL from zero; define category mappings; inspect unmapped exceptions.

## Module 06: CTEs and layered SQL

**Learning outcome:** Separate row-level business logic from aggregation.

### Why it matters
Auditors and colleagues should be able to trace a KPI back to its qualifying transactions instead of interpreting a single oversized query.

### How it works
A Common Table Expression (WITH) names an intermediate result within a single statement. Build detail-level calculated columns in one step, aggregate in another; most databases decide whether to inline or materialize CTEs based on the optimizer.

### Worked example

```sql
WITH completed_sales AS (
 SELECT region, quantity*unit_price AS revenue
 FROM orders WHERE status='Completed'
)
SELECT region, SUM(revenue) AS total_revenue
FROM completed_sales GROUP BY region ORDER BY total_revenue DESC;
```

**Expected output / verification**

```text
region | total_revenue
East   | 316000
West   | 190000
North  | 72000
```

**💡 Pro tip:** Use naming that describes the transformation: validated_orders, completed_sales, monthly_kpis.

**⚠️ Common trap:** A CTE is not automatically cached or faster; benchmark the actual execution plan.

### 🚀 Knowledge checks
1. Where should the Completed status restriction be placed?
   - **Worked solution:** Inside completed_sales, so downstream consumers inherit the same business rule.
2. How can you inspect the intermediate detail?
   - **Worked solution:** Temporarily replace the final aggregate with SELECT * FROM completed_sales and review its five rows.

**📌 Key takeaways:** One CTE per logical transformation; readable aliases; verify intermediates before final sums.

## Module 07: Window functions and ranking

**Learning outcome:** Rank customers while preserving transaction detail.

### Why it matters
Top-customer reporting and monthly running totals need calculations that do not collapse the original records.

### How it works
Unlike GROUP BY, OVER computes within a window of rows while returning each selected row. PARTITION BY creates independent groups; ORDER BY defines sequence. ROW_NUMBER chooses one row per partition only when the sort has a reliable tie-break.

### Worked example

```sql
SELECT customer, order_id, order_date,
 ROW_NUMBER() OVER(
 PARTITION BY customer ORDER BY order_date DESC, order_id DESC
 ) AS recency_rank
FROM orders WHERE status='Completed'
ORDER BY customer, recency_rank;
```

**Expected output / verification**

```text
customer | order_id | recency_rank
Amina    | 1001     | 1
Idris    | 1005     | 1
Kola     | 1002     | 1
Ngozi    | 1006     | 1
Ngozi    | 1004     | 2
```

**💡 Pro tip:** Use ROW_NUMBER for deterministic latest-row selection; use RANK/DENSE_RANK only when ties carry meaning.

**⚠️ Common trap:** Window ORDER BY and final output ORDER BY serve different purposes. Missing tie-breaks make latest-row logic unstable.

### 🚀 Knowledge checks
1. What is the latest Completed order for Ngozi?
   - **Worked solution:** Order 1006; 2026-02-18 sorts after 2026-02-09.
2. Write the rule to return only the latest row per customer.
   - **Worked solution:** Wrap the query in a CTE named ranked, then SELECT * FROM ranked WHERE recency_rank=1.

**📌 Key takeaways:** WINDOW = partition + ordering + optional frame; row counts remain unchanged.

## Module 08: Date analysis and period-over-period metrics

**Learning outcome:** Produce monthly series with correct chronological order.

### Why it matters
Leadership needs January and February comparisons; grouping only by month name mixes years and creates misleading trends.

### How it works
SQLite strftime returns a sortable YYYY-MM month key. Filter timestamps at the desired grain, group by year-month, and use LAG for a prior period. The dialect matters: use DATE_TRUNC in other systems, not SQLite.

### Worked example

```sql
SELECT strftime('%Y-%m',order_date) AS month,
 SUM(quantity*unit_price) AS revenue
FROM orders WHERE status='Completed'
GROUP BY strftime('%Y-%m',order_date) ORDER BY month;
```

**Expected output / verification**

```text
month   | revenue
2026-01 | 340000
2026-02 | 238000
```

**💡 Pro tip:** Build a calendar dimension for continuous reporting; no order in a month is not always a zero-sales month.

**⚠️ Common trap:** Beware string-sorted month names and using current-month partial data against a complete prior month.

### 🚀 Knowledge checks
1. Calculate February month-on-month change.
   - **Worked solution:** (238000-340000)/340000 = -30%. LAG returns NULL for January without a prior row.
2. Why is YYYY-MM safer than grouping by MonthName?
   - **Worked solution:** It preserves both year context and sort order across Dec/Jan.

**📌 Key takeaways:** Use year-aware period keys; compare complete, like-for-like periods; document date boundaries.

## Module 09: Performance and validation

**Learning outcome:** Improve query execution without breaking metric integrity.

### Why it matters
A fast incorrect report is worse than a slower audited one; reliability comes before indexing and speed work.

### How it works
Start with expected row counts, distinct keys, nulls and reconciliations. EXPLAIN QUERY PLAN describes access paths and joins. Indexes can improve selective lookups but add storage and write overhead; on small training datasets a full scan may be optimal.

### Worked example

```sql
SELECT COUNT(*) AS row_count,
 COUNT(DISTINCT order_id) AS unique_orders,
 SUM(CASE WHEN status='Completed'
          THEN quantity*unit_price ELSE 0 END) AS revenue
FROM orders;
```

**Expected output / verification**

```text
row_count | unique_orders | revenue
6         | 6             | 578000
```

**💡 Pro tip:** Keep the validation query beside the production query; rerun both after any optimization.

**⚠️ Common trap:** EXPLAIN output is platform-specific, and an index is not inherently better for tiny tables.

### 🚀 Knowledge checks
1. Which measure exposes duplicate order keys?
   - **Worked solution:** COUNT(*) minus COUNT(DISTINCT order_id); expected 0.
2. How do you verify a rewrite was correct?
   - **Worked solution:** Compare row grain, null counts, distinct keys and revenue before and after; both must reconcile to 578000.

**📌 Key takeaways:** First correctness, then plan inspection, then selective optimization, then revalidation.

## Module 10: SQL analytics capstone

**Learning outcome:** Deliver repeatable, stakeholder-ready SQL outputs.

### Why it matters
An analyst must supply business context, definitions, reproducible queries and evidence—not only a screenshot of a chart.

### How it works
Begin with a metric contract (completed gross revenue, completed orders, profit). Build a validated fact extract, create group and time views, reconcile them, and document caveats such as the tiny illustrative dataset.

### Worked example

```sql
WITH fact AS (
 SELECT order_id,region,quantity*unit_price AS revenue,
        quantity*(unit_price-unit_cost) AS profit
 FROM orders WHERE status='Completed'
)
SELECT region, COUNT(*) AS orders,
 SUM(revenue) AS revenue, SUM(profit) AS profit
FROM fact GROUP BY region ORDER BY revenue DESC;
```

**Expected output / verification**

```text
region | orders | revenue | profit
East   | 2      | 316000  | 66000
West   | 2      | 190000  | 45000
North  | 1      | 72000   | 24000
```

**💡 Pro tip:** Deliver a README with business grain, transformations, reconciliation checks and limitations.

**⚠️ Common trap:** Do not treat this six-row illustrative sample as evidence about real customer behavior.

### 🚀 Knowledge checks
1. Which two totals must reconcile across all regions?
   - **Worked solution:** Revenue = 578000 and profit = 135000 on completed orders.
2. What should you hand off to the dashboard developer?
   - **Worked solution:** Named queries, column dictionary, join keys, KPI definitions, validation outputs and a refresh assumption.

**📌 Key takeaways:** Define → transform → calculate → validate → communicate; keep the script versioned.


# Excel for Data Analysis — 10 modules

## Module 01: Workbook fundamentals and analyst workflow

**Learning outcome:** Navigate and structure a reproducible workbook.

### Why it matters
An operations analyst receives daily order exports. A clear workbook structure reduces formula mistakes and lets a colleague audit the numbers.

### How it works
Rows hold records, columns hold attributes, and cells hold values or formulas. Separate RawData, Calculations and Dashboard sheets; use one row per order, true dates, no merged data headers, and a clear source/date note.

### Worked example

```text
RawData!A1:J3
OrderID | Date       | Customer | Region | Product | Qty | Price | Cost  | Status
1001    | 2026-01-05 | Amina    | East   | Laptop  | 2   | 150000| 120000| Completed
1002    | 2026-01-08 | Kola     | West   | Mouse   | 5   | 8000  | 5000  | Completed
```

**Expected output / verification**

```text
One header row; each order occupies one row; do not use subtotals inside the source table.
```

**💡 Pro tip:** Name raw input tabs and preserve original file versions; do not edit imported records invisibly.

**⚠️ Common trap:** Merged headers, blank separator rows, and numbers stored as text break filters and PivotTables.

### 🚀 Knowledge checks
1. What is the grain of this input?
   - **Worked solution:** One row represents one order; OrderID is a unique key in this sample.
2. How should the workbook be separated?
   - **Worked solution:** RawData for source rows, Calculations for validated measures, Dashboard for user-facing visuals.

**📌 Key takeaways:** Use clean tabular source data; label units and grain; avoid mixing input with presentation.

## Module 02: Excel Tables and validation

**Learning outcome:** Make calculations expand automatically as transactions grow.

### Why it matters
Order logs grow daily. A manual formula range stops at yesterday’s last row, whereas a Table can extend calculated columns and references.

### How it works
Ctrl+T creates an Excel Table with headers, filters, and structured references. Add a Revenue column with =[@Qty]*[@Price]; Excel fills it down the Table. Data Validation can restrict Status to permitted values.

### Worked example

```text
Name the table: Sales
Revenue column formula: =[@Qty]*[@Price]
Status validation list: Completed,Returned
For OrderID 1001: 2 * 150000 = 300000
```

**Expected output / verification**

```text
OrderID | Qty | Price  | Revenue
1001    | 2   | 150000 | 300000
1002    | 5   | 8000   | 40000
```

**💡 Pro tip:** Use Tables instead of fixed A2:A100 ranges in models that receive new rows.

**⚠️ Common trap:** Data Validation improves entry quality, but imported data can still violate rules; audit it too.

### 🚀 Knowledge checks
1. What happens after a seventh row is entered in Sales?
   - **Worked solution:** Structured calculated columns generally extend automatically to the new Table row.
2. How should you calculate cost per order?
   - **Worked solution:** Add =[@Qty]*[@Cost] in a LineCost calculated column.

**📌 Key takeaways:** Tables scale; structured references reduce broken formulas; validation is preventive, not sufficient.

## Module 03: References and core formulas

**Learning outcome:** Compute repeatable sales metrics without broken references.

### Why it matters
Finance often asks for tax, targets and profit; formulas must handle fill-down correctly and preserve fixed assumptions.

### How it works
Relative references move when copied. An absolute reference such as $M$2 never moves. SUM aggregates, ROUND controls display precision, and IFERROR handles anticipated calculation errors without hiding all source defects.

### Worked example

```text
Assume Sales[Revenue] has six gross order values.
=SUM(Sales[Revenue])                 → 602000
=SUMIFS(Sales[Revenue],Sales[Status],"Completed") → 578000
=ROUND(578000*$M$2,2) with M2=7.5%  → 43350
```

**Expected output / verification**

```text
Metric                  | Value
All-order gross sales   | 602000
Completed gross sales   | 578000
7.5% hypothetical levy | 43350
```

**💡 Pro tip:** Keep assumptions on an Inputs sheet, with cells named and referenced rather than hard-coded into each formula.

**⚠️ Common trap:** Using A2 instead of $A$2 for a single global rate changes the rate as the formula is copied.

### 🚀 Knowledge checks
1. Which formula computes profit on a Table row?
   - **Worked solution:** =[@Qty]*([@Price]-[@Cost]); OrderID 1001 returns 60000.
2. Why is 602000 not the completed-sales KPI?
   - **Worked solution:** It includes the returned order 1003 (24000); filter status to Completed to obtain 578000.

**📌 Key takeaways:** Choose relative vs absolute carefully; clarify included records; reconcile derived measures.

## Module 04: IF, SUMIFS, XLOOKUP and legacy lookups

**Learning outcome:** Apply business rules and join small reference lists.

### Why it matters
Order reviews require statuses, thresholds and product categories from a lookup table.

### How it works
IF returns a branch; SUMIFS calculates numeric totals with multiple criteria. XLOOKUP matches a key and returns a related value in newer Excel; for Excel 2016 use INDEX/MATCH or VLOOKUP with exact-match FALSE. Guard against missing keys.

### Worked example

```text
=IF([@Status]="Completed",[@Revenue],0)
=SUMIFS(Sales[Revenue],Sales[Status],"Completed",Sales[Region],"East")
Excel 2016: =IFERROR(INDEX(Category[Group],MATCH([@Product],Category[Product],0)),"Unmapped")
```

**Expected output / verification**

```text
Completed East sales: 316000.
Mapped example: Laptop → Electronics.
Unknown product → Unmapped (not a fabricated category).
```

**💡 Pro tip:** Always request exact matching for IDs; treat unmatched keys as a visible data-quality outcome.

**⚠️ Common trap:** VLOOKUP without FALSE can return approximate matches and silently misclassify products.

### 🚀 Knowledge checks
1. What result should an East+Completed SUMIFS produce?
   - **Worked solution:** 316000: orders 1001 and 1006.
2. What should an unmatched product map to?
   - **Worked solution:** Explicit Unmapped or an error review list, never a guessed category.

**📌 Key takeaways:** Define criteria precisely; prefer explicit exact-match lookups; surface missing mappings.

## Module 05: Cleaning and data preparation

**Learning outcome:** Create a consistent source without losing provenance.

### Why it matters
In real feeds, spaces, duplicates, invalid dates and inconsistent capitalization can fragment business categories.

### How it works
TRIM removes surplus spaces, CLEAN removes nonprinting characters, PROPER standardizes names when appropriate, and COUNTIF can identify repeat IDs. Power Query preserves a replayable sequence of transformations.

### Worked example

```text
=TRIM(A2)                  // "  East  " → "East"
=COUNTIF(Sales[OrderID],[@OrderID])  // expected 1 per sample row
=IF([@Status]="Returned","Excluded from completed revenue","Include")
```

**Expected output / verification**

```text
Status=Returned on OrderID 1003 → Excluded from completed revenue.
Duplicates in mastery data: 0.
```

**💡 Pro tip:** Retain a raw snapshot, document every transformation and test uniqueness after cleanup.

**⚠️ Common trap:** PROPER should not automatically change company acronyms or official names; get a business rule first.

### 🚀 Knowledge checks
1. Why preserve original source data?
   - **Worked solution:** To trace and reverse changes if a transformation produces a wrong figure.
2. Name a duplicate-control formula.
   - **Worked solution:** =COUNTIF(Sales[OrderID],[@OrderID])>1 returns FALSE for all six training orders.

**📌 Key takeaways:** Clean systematically; keep audit trails; assess source quality before reporting.

## Module 06: Sorting, filters and quick analysis

**Learning outcome:** Explore trends without corrupting row relationships.

### Why it matters
Sales managers filter geography and status during daily reviews; accidental partial-range sorting can detach quantities from the wrong orders.

### How it works
Table filtering hides unrelated rows without deleting them. SUMIFS respects explicit logical criteria, while SUBTOTAL can aggregate visible rows only. Keep source filters separate from final KPI definitions.

### Worked example

```text
=SUBTOTAL(109,Sales[Revenue])
After filtering Status=Completed and Region=West:
Visible OrderIDs: 1002 and 1005
```

**Expected output / verification**

```text
Visible West completed revenue: 40000 + 150000 = 190000.
The unfiltered all-status gross remains 602000.
```

**💡 Pro tip:** Use slicers only after checking whether they apply to the intended Table or PivotTable.

**⚠️ Common trap:** Sorting a single column independently of the rest of a record destroys row integrity.

### 🚀 Knowledge checks
1. Which West orders qualify?
   - **Worked solution:** OrderIDs 1002 and 1005; both are Completed.
2. What is the difference between SUM and SUBTOTAL(109)?
   - **Worked solution:** SUM includes filtered-out values; SUBTOTAL function 109 excludes manually hidden and filtered-out rows.

**📌 Key takeaways:** Sort entire Tables; distinguish filtered view from business eligibility; use SUBTOTAL for visible-row summaries.

## Module 07: PivotTables, PivotCharts and percentage views

**Learning outcome:** Aggregate repeated records into an interactive management summary.

### Why it matters
A 1,000-row sales log is difficult to interpret row-by-row. A PivotTable groups regions, months and products without manual SUMIFS for every combination.

### How it works
Insert a PivotTable from Sales, set Rows=Region, Values=Sum of Revenue, and Filters=Status. Refresh when the source changes. Show Values As % of Grand Total uses the current Pivot context, not an all-time static denominator.

### Worked example

```text
Pivot configuration:
Rows: Region
Values: Sum of Revenue
Filter: Status = Completed
Show Values As: % of Grand Total
```

**Expected output / verification**

```text
Region | Revenue | % of completed total
East   | 316000  | 54.67%
West   | 190000  | 32.87%
North  | 72000   | 12.46%
```

**💡 Pro tip:** Check source filters and grand totals before formatting a PivotTable as a polished chart.

**⚠️ Common trap:** Sum of a percentage column is usually not a weighted rate; PivotTables require a correct denominator.

### 🚀 Knowledge checks
1. Which region has the highest share?
   - **Worked solution:** East at about 54.67% of the 578000 completed-sales total.
2. Why might the Pivot total not reflect a newly added row?
   - **Worked solution:** The PivotTable may need refreshing; check source Table coverage and Refresh.

**📌 Key takeaways:** Pivots aggregate by dimensions; always verify filters, denominators and refresh behavior.

## Module 08: Charts and visual communication

**Learning outcome:** Select graphics based on decision and metric shape.

### Why it matters
Stakeholders should identify what changed and where to act within seconds.

### How it works
Bars compare discrete regions; a line displays time order; scatterplots explain relationships. Use direct labels, consistent units and zero-based axes for magnitude comparisons. Separate a revenue line from a percentage-margin line unless clearly dual-labelled.

### Worked example

```text
Build two charts from completed sales:
Chart A: horizontal bars — East 316000, West 190000, North 72000
Chart B: month line — Jan 340000, Feb 238000
```

**Expected output / verification**

```text
The region bar lengths reflect 316k > 190k > 72k.
The monthly line falls from 340k to 238k (-30%).
```

**💡 Pro tip:** Choose chart type from the question first, then format for accessibility and color-blind readability.

**⚠️ Common trap:** Truncated bar axes visually exaggerate differences; charts without denominator labels mislead.

### 🚀 Knowledge checks
1. What chart shows the relative size of three regions?
   - **Worked solution:** A horizontal bar chart with the axis starting at zero.
2. What is the right chart for revenue over months?
   - **Worked solution:** A chronologically sorted line chart with a year-month key.

**📌 Key takeaways:** Chart by purpose, not novelty; label measures and periods; avoid visual distortion.

## Module 09: Dashboard engineering and interaction

**Learning outcome:** Design a one-page decision flow from trusted KPIs.

### Why it matters
A dashboard needs a defined audience, a small set of critical KPIs and clear interactions rather than a wall of charts.

### How it works
Use a header with the reporting period, KPI row, trend and breakdown visuals, and source/refresh notes. If slicers affect only some visuals, make this explicit. Keep raw data and calculations out of the presentation layer.

### Worked example

```text
Suggested layout (completed orders only):
[Revenue 578000] [Profit 135000] [Orders 5] [Margin 23.36%]
[Monthly revenue trend] [Revenue by region]
[Status selector] [Refresh date / metric definitions]
```

**Expected output / verification**

```text
Completed revenue 578000; profit 135000; gross margin 135000/578000 = 23.36%.
```

**💡 Pro tip:** Test every slicer combination and compare the cards against a PivotTable or SUMIFS control.

**⚠️ Common trap:** Dashboard KPIs may disagree if one uses all orders and another excludes returned orders.

### 🚀 Knowledge checks
1. What should appear next to a gross-margin KPI?
   - **Worked solution:** The calculation definition and the current reporting period; profit divided by completed revenue.
2. How can an end user reset interactions?
   - **Worked solution:** Provide clear slicer reset instructions or a documented reset control, and test it.

**📌 Key takeaways:** Put decisions before visuals; preserve metric consistency; test interactions and refresh notes.

## Module 10: Excel portfolio capstone

**Learning outcome:** Deliver an audit-friendly retail operations dashboard.

### Why it matters
A finished analytical workbook should survive a new batch of rows and allow another analyst to reproduce every figure.

### How it works
Build Sales as a Table, add revenue/profit calculations, write source checks, create monthly and regional Pivots, then a restrained dashboard. Record assumptions and verify month totals against the transaction data.

### Worked example

```text
Acceptance controls:
Completed Order Count: =COUNTIF(Sales[Status],"Completed")
Completed Revenue: =SUMIFS(Sales[Revenue],Sales[Status],"Completed")
Completed Profit: SUMIFS over a calculated Profit column
```

**Expected output / verification**

```text
Expected: Orders=5; Revenue=578000; Profit=135000; Returned order excluded.
```

**💡 Pro tip:** Include a compact QA sheet with key counts, totals, source version and refresh procedure.

**⚠️ Common trap:** Do not submit an attractive dashboard with broken structured references or unrefreshed Pivots.

### 🚀 Knowledge checks
1. What must update when a seventh order arrives?
   - **Worked solution:** The Table, formulas, Pivot sources/refresh and dashboards should reflect the new row.
2. Which three checks should always reconcile?
   - **Worked solution:** Completed order count=5, completed revenue=578000, and profit=135000 for the sample.

**📌 Key takeaways:** Build once, refresh repeatedly, audit with an independent control.


# Power BI & DAX — 10 modules

## Module 01: Power BI Desktop and business questions

**Learning outcome:** Translate a retail brief into a report plan.

### Why it matters
Power BI is valuable when stakeholders need governed measures, reusable relationships, and interactive slicing beyond a static spreadsheet.

### How it works
Power Query ingests/transforms, the semantic model stores tables and relationships, DAX evaluates measures, and report visuals query the model. Identify fact grain, dimensions, data refresh cadence and who can access the result before creating charts.

### Worked example

```text
Model design brief:
FactSales: one row per order (six training rows)
Dimensions: DimDate, DimCustomer, DimProduct, DimRegion
KPI contract: completed revenue, completed profit, completed order count
```

**Expected output / verification**

```text
Accepted source controls: six total rows; five Completed; completed revenue 578000.
```

**💡 Pro tip:** Write metric contracts before DAX; include units, transaction inclusion rules and rounding.

**⚠️ Common trap:** A visual can look correct while using implicit sums on the wrong transaction statuses.

### 🚀 Knowledge checks
1. What is the report’s fact grain?
   - **Worked solution:** One order in the example; production systems may require an order-line grain.
2. What is the business definition of revenue here?
   - **Worked solution:** SUM of quantity × unit price for records with Status = Completed.

**📌 Key takeaways:** Business question → grain → model → measure → visual → validation.

## Module 02: Power Query M and repeatable cleanup

**Learning outcome:** Build a refreshable transformation pipeline.

### Why it matters
Repeated CSV imports arrive with text-typed numbers, inconsistent columns and malformed dates. The refresh process should apply the same transformations reliably.

### How it works
Power Query records ordered Applied Steps. Set explicit types, trim controlled dimensions, reject duplicate order IDs only after investigating source truth, and use transformations instead of manually editing a few preview rows.

### Worked example

```text
let
 Source = Csv.Document(File.Contents("mastery_orders.csv"),
   [Delimiter=",", Encoding=65001, QuoteStyle=QuoteStyle.Csv]),
 Headers = Table.PromoteHeaders(Source,[PromoteAllScalars=true]),
 Typed = Table.TransformColumnTypes(Headers,
  {{"quantity",Int64.Type},{"unit_price",type number},
   {"unit_cost",type number},{"order_date",type date}})
in Typed
```

**Expected output / verification**

```text
Power Query preview: 6 rows; quantity is Whole Number; unit_price is Decimal Number; order_date is Date.
```

**💡 Pro tip:** Use parameters or managed connectors for production file paths, not hard-coded local paths.

**⚠️ Common trap:** Automatic Changed Type may misinterpret day/month locale; explicitly validate dates and currencies.

### 🚀 Knowledge checks
1. Why does changing column type matter?
   - **Worked solution:** DAX aggregation and relationship logic need proper numeric/date types, not text.
2. How do you surface bad input rows?
   - **Worked solution:** Use column quality/error filters and separate exception outputs rather than quietly deleting errors.

**📌 Key takeaways:** Applied Steps are repeatable; set types deliberately; preserve error evidence.

## Module 03: Star schema and relationships

**Learning outcome:** Prevent ambiguous filters and incorrect double-counting.

### Why it matters
Business slicers for customers, regions and time should filter a consistent fact table without causing duplicated totals.

### How it works
Keep transaction columns in FactSales, attributes in dimensions. Make one-to-many relationships from dimension unique key to fact foreign key; default to single-direction filtering. A calendar dimension provides contiguous dates and accurate time intelligence.

### Worked example

```text
DimCustomer[customer_id] (1) → (*) FactSales[customer_id]
DimDate[Date] (1) → (*) FactSales[order_date]
DimProduct[product_id] (1) → (*) FactSales[product_id]
FactSales has 6 unique order IDs in the sample.
```

**Expected output / verification**

```text
Cross-filter Region=East and Status=Completed → revenue 316000.
```

**💡 Pro tip:** Keep relationships single direction until an explicit model requirement proves otherwise.

**⚠️ Common trap:** Many-to-many keys and indiscriminate bidirectional filters can cause ambiguous paths or incorrect totals.

### 🚀 Knowledge checks
1. Why must DimCustomer key be unique?
   - **Worked solution:** To guarantee a predictable one-to-many relationship and stable filter propagation.
2. How can you check the model after relationships?
   - **Worked solution:** Compare FactSales row counts and a completed-sales measure against independent source totals.

**📌 Key takeaways:** Facts hold events; dimensions describe them; relationship direction governs filters.

## Module 04: DAX measures and evaluation context

**Learning outcome:** Build reusable completed-sales KPIs.

### Why it matters
A table visual and a KPI card must use the same revenue definition while respecting each report selection.

### How it works
Measures are evaluated at query time in filter context (slicers, rows, filters). SUMX iterates rows to compute quantity × price; CALCULATE modifies filter context. A calculated column computes per row at refresh; a measure responds to current selections.

### Worked example

```text
Revenue :=
CALCULATE(
 SUMX(FactSales, FactSales[quantity]*FactSales[unit_price]),
 FactSales[status] = "Completed"
)

Profit :=
CALCULATE(
 SUMX(FactSales, FactSales[quantity]*(FactSales[unit_price]-FactSales[unit_cost])),
 FactSales[status] = "Completed"
)
```

**Expected output / verification**

```text
Unfiltered slicers: Revenue=578000; Profit=135000.
Region slicer East: Revenue=316000; Profit=66000.
```

**💡 Pro tip:** Prefer explicit measures with clear names; show the difference between row context and filter context when teaching SUMX.

**⚠️ Common trap:** SUM(FactSales[quantity]*FactSales[unit_price]) is invalid DAX; use SUMX for an expression.

### 🚀 Knowledge checks
1. What does CALCULATE change?
   - **Worked solution:** Filter context, here limiting the measure to Completed records.
2. What is the revenue when filtering East?
   - **Worked solution:** 316000, the sum of East completed orders 1001 and 1006.

**📌 Key takeaways:** Row vs filter context; CALCULATE modifies filters; iterators evaluate row expressions.

## Module 05: Date tables and time intelligence

**Learning outcome:** Compute period changes on a valid model calendar.

### Why it matters
Managers compare this month with previous months; string dates and missing calendar rows make time-intelligence results unreliable.

### How it works
A marked Date table has a contiguous unique date column, related actively to fact dates. CALCULATE can shift filter contexts through date tables. Close month logic and partial periods require explicit business definitions.

### Worked example

```text
DimDate = CALENDAR(DATE(2026,1,1),DATE(2026,12,31))

Revenue PM :=
CALCULATE([Revenue], DATEADD(DimDate[Date],-1,MONTH))

MoM % := DIVIDE([Revenue]-[Revenue PM],[Revenue PM])
```

**Expected output / verification**

```text
January 2026 revenue=340000. February=238000.
February MoM change=(238000-340000)/340000=-30.00%.
```

**💡 Pro tip:** Mark DimDate as a Date table and use the date column from it in time visuals.

**⚠️ Common trap:** Using FactSales[order_date] text or a noncontiguous date list defeats reliable period calculations.

### 🚀 Knowledge checks
1. What is the January prior-month value in this two-month sample?
   - **Worked solution:** BLANK unless a prior December context and matching data are provided.
2. Why use DIVIDE instead of /?
   - **Worked solution:** DIVIDE handles zero or blank denominators safely and returns BLANK by default.

**📌 Key takeaways:** Date model first; shifted filter context next; compare like-for-like complete periods.

## Module 06: Visualization and report UX

**Learning outcome:** Build a visual hierarchy for fast decisions.

### Why it matters
Report readers need to spot variance and drill into drivers, not decode twelve disconnected charts.

### How it works
Use a few KPI cards, one monthly trend, one region comparison, a clear slicer zone, and short definitions. Use conditional formatting only for defined thresholds. Verify accessibility (contrast, titles, keyboard use, and alt text where supported).

### Worked example

```text
Executive page wireframe:
[Completed Revenue 578000] [Profit 135000] [Margin 23.36%]
[Monthly line: Jan 340000 → Feb 238000]
[Region bars: East 316000 | West 190000 | North 72000]
```

**Expected output / verification**

```text
Sample output communicates a -30% month-over-month decline, not a growth claim.
```

**💡 Pro tip:** Use native Power BI visuals where possible; avoid dense ornamentation and false precision.

**⚠️ Common trap:** A red card is not meaningful without a documented threshold or previous-period comparator.

### 🚀 Knowledge checks
1. Which chart best compares three regions?
   - **Worked solution:** A sorted horizontal bar chart with values starting at zero.
2. Which supporting metadata should appear?
   - **Worked solution:** Reporting period, source system, refresh time, units and metric definitions.

**📌 Key takeaways:** Build page narrative from KPI → trend → drivers → action.

## Module 07: Slicers, drillthrough and navigation

**Learning outcome:** Provide controlled exploration without losing context.

### Why it matters
Operational managers often need to click a region, inspect customer-level drivers and return to the same overview.

### How it works
Slicers apply filter context to connected visuals; Edit Interactions overrides defaults. Drillthrough passes categorical filters into a detail page. Bookmarks can capture data state, display state or both, so reset controls must be tested.

### Worked example

```text
Suggested interaction test:
1. Select Region = West.
2. Revenue KPI must show 190000.
3. Drill through to customers Kola and Idris.
4. Return and Reset; KPI must return to 578000.
```

**Expected output / verification**

```text
West revenue=190000 (orders 1002 and 1005). Reset revenue=578000.
```

**💡 Pro tip:** Test navigation on desktop and Power BI mobile layouts separately.

**⚠️ Common trap:** A bookmark that captures data filters unintentionally can reset slicers the user wanted to preserve.

### 🚀 Knowledge checks
1. What does a drillthrough filter convey?
   - **Worked solution:** The selected region/customer category to the destination detail page.
2. How do you validate Reset?
   - **Worked solution:** Change two slicers, click Reset, verify every intended visual and KPI matches default state.

**📌 Key takeaways:** Interactions modify filter context; navigation must preserve clear user expectations.

## Module 08: Intermediate DAX and context control

**Learning outcome:** Calculate shares and ranks with explicit denominators.

### Why it matters
Leaders ask which region contributes the most and what a customer’s share is within selected periods.

### How it works
CALCULATE can remove specific filter columns; ALL/REMOVEFILTERS affect denominator context. RANKX compares row measures over a defined dimension set. Keep date filters when calculating region shares if you want period-relative shares.

### Worked example

```text
Region Share % :=
DIVIDE(
 [Revenue],
 CALCULATE([Revenue], REMOVEFILTERS(DimRegion[region]))
)

Region Rank :=
RANKX(ALL(DimRegion[region]),[Revenue],,DESC,Dense)
```

**Expected output / verification**

```text
East=54.67%, West=32.87%, North=12.46% of the 578000 completed total.
Ranks: East 1, West 2, North 3.
```

**💡 Pro tip:** Write denominator semantics into measure descriptions: overall, selected, or period-specific.

**⚠️ Common trap:** ALL on the entire fact table can remove time/status context and inflate denominators.

### 🚀 Knowledge checks
1. Why use REMOVEFILTERS on only the region column?
   - **Worked solution:** To preserve the selected date and other compatible filters while computing regional share.
2. What rank does North receive?
   - **Worked solution:** 3 under descending revenue ranking.

**📌 Key takeaways:** Write explicit denominators; constrain filter removal; validate measure behavior under slicers.

## Module 09: Power BI Service, sharing and refresh

**Learning outcome:** Deliver the report securely to its actual audience.

### Why it matters
Publishing is not complete if users lack access, the data stays stale, or confidential rows leak between teams.

### How it works
Publish the semantic model and report to a managed workspace. Set refresh credentials or gateway as needed, review licensing/workspace policies, configure row-level security where required, and test as a viewer. A successful refresh does not guarantee correct metrics.

### Worked example

```text
Deployment checklist:
□ Credentials and refresh schedule documented
□ Role-based access tested
□ One-page definitions and source notes included
□ Completed revenue reconciles to 578000 before publishing
□ Failed-refresh escalation owner assigned
```

**Expected output / verification**

```text
QA acceptance: authorized viewer can open the report; sample KPI values remain consistent.
```

**💡 Pro tip:** Check semantic model permissions as well as report sharing; security depends on access configuration.

**⚠️ Common trap:** Assuming a hidden report page is a security boundary; it is not.

### 🚀 Knowledge checks
1. When is a gateway relevant?
   - **Worked solution:** When Power BI Service must access a supported on-premises data source that is not directly cloud accessible.
2. What should be tested after publication?
   - **Worked solution:** Data refresh, viewer permissions, RLS roles (if configured), navigation, filters and KPIs.

**📌 Key takeaways:** Secure the model; schedule refresh; test viewer experience; preserve metric integrity.

## Module 10: Power BI portfolio capstone

**Learning outcome:** Present a governed retail executive dashboard.

### Why it matters
A reusable semantic model and a concise insight narrative demonstrate job-ready analytical judgment.

### How it works
Import CSV through Power Query, model dimensions and dates, create explicit DAX measures, design overview/detail pages, test slicers, and write a short QA note. Separate demonstration values from real-world claims.

### Worked example

```text
Required measures and controls:
[Revenue] = 578000
[Profit] = 135000
[Orders Completed] = 5
[Margin %] = DIVIDE([Profit],[Revenue]) = 23.36%
[February MoM %] = -30.00%
```

**Expected output / verification**

```text
Accepted training-model totals: Revenue 578000; Profit 135000; Completed orders 5.
```

**💡 Pro tip:** Submit a .pbix report (where available), screenshot, definitions, and verification worksheet.

**⚠️ Common trap:** A beautiful visual with misconfigured relationships is not a successful model.

### 🚀 Knowledge checks
1. Which measures reconcile to source detail?
   - **Worked solution:** Revenue=578000; profit=135000; count=5.
2. What constitutes adequate handover?
   - **Worked solution:** Model diagram, measure dictionary, slicer QA, refresh/security notes and a concise business narrative.

**📌 Key takeaways:** Source → Power Query → star model → DAX → visuals → secure deployment → QA.


# Python for Data Analytics — 10 modules

## Module 01: Python setup, files and analyst mindset

**Learning outcome:** Load a dataset reproducibly and inspect its structure.

### Why it matters
Analysts use Python when work must be repeatable, combine multiple files, or scale beyond manual clicking. The first objective is a clean, runnable environment.

### How it works
Python executes statements in order, stores objects in variables, and imports reusable packages. Use a virtual environment, pin dependencies, keep raw files separate, and confirm the working directory before reading CSV data.

### Worked example

```python
from pathlib import Path
import pandas as pd
path = Path('mastery_orders.csv')
orders = pd.read_csv(path, parse_dates=['order_date'])
print(orders.shape)
print(orders['status'].value_counts().to_dict())
```

**Expected output / verification**

```text
(6, 12)
{'Completed': 5, 'Returned': 1}
```

**💡 Pro tip:** Use python -m venv .venv and a requirements file. Do not embed credentials in notebooks.

**⚠️ Common trap:** FileNotFoundError often means the working directory is wrong; inspect Path.cwd() and the path first.

### 🚀 Knowledge checks
1. What does orders.shape report?
   - **Worked solution:** The number of rows and columns as a tuple: (6,12) for the supplied file.
2. How can you avoid treating dates as arbitrary strings?
   - **Worked solution:** Pass parse_dates=['order_date'] in read_csv or validate with pd.to_datetime.

**📌 Key takeaways:** Create environment → read input → inspect rows/types → validate before transforming.

## Module 02: Variables, types and control flow

**Learning outcome:** Translate a calculation rule into correct Python logic.

### Why it matters
Reporting calculations rely on precise numeric types and conditions; errors can turn a returned order into recognized sales.

### How it works
int, float, str, bool and None model different values. Conditions are evaluated before a result is added. Use Decimal when exact decimal-currency arithmetic is required; floats can produce rounding surprises.

### Worked example

```python
orders = [
 {'id': 1001, 'qty': 2, 'price': 150000, 'status':'Completed'},
 {'id': 1003, 'qty': 3, 'price': 8000, 'status':'Returned'}
]
value = sum(o['qty'] * o['price']
  for o in orders if o['status']=='Completed')
print(value)
```

**Expected output / verification**

```text
300000 (returned order 1003 is excluded).
```

**💡 Pro tip:** Prefer descriptive variable names and assertions for assumptions, e.g., assert amount >= 0.

**⚠️ Common trap:** Using = inside a condition is a syntax error; use == for equality. Avoid comparing text values to numbers.

### 🚀 Knowledge checks
1. What is the value of 3 * 8000?
   - **Worked solution:** 24000, but that returned order does not contribute to completed revenue.
2. How would you protect against a missing status value?
   - **Worked solution:** Use o.get('status')=='Completed'; absent status fails the inclusion test.

**📌 Key takeaways:** Types determine valid operations; test conditions explicitly; keep business rules readable.

## Module 03: Functions, collections and reusable scripts

**Learning outcome:** Write one calculation once and reuse it safely.

### Why it matters
Analysts often repeat net-sales and margin logic across reports; functions prevent inconsistent copies.

### How it works
A function receives parameters, evaluates a body, and returns a value. A list keeps ordered records; a dictionary maps named attributes. Type hints communicate contracts but do not validate values at runtime.

### Worked example

```python
def revenue(quantity: int, unit_price: float) -> float:
    if quantity < 0 or unit_price < 0:
        raise ValueError('Negative input is not expected')
    return quantity * unit_price
print(revenue(2, 150000))
print(revenue(5, 8000))
```

**Expected output / verification**

```text
300000
40000
```

**💡 Pro tip:** Keep business rules in tested functions; keep file input/output at the edges of the script.

**⚠️ Common trap:** Mutable default arguments such as def f(items=[]) can leak state between calls.

### 🚀 Knowledge checks
1. Why return instead of only print?
   - **Worked solution:** Returned values can be reused in calculations, unit tests and reports.
2. What happens with revenue(-1,8000)?
   - **Worked solution:** It raises ValueError because the function rejects unexpected negative quantities.

**📌 Key takeaways:** Small functions are easier to test; keep inputs explicit and outputs predictable.

## Module 04: pandas selection and filtering

**Learning outcome:** Filter the correct transactions before aggregation.

### Why it matters
A pandas DataFrame brings SQL-like filtering to CSV data, allowing consistent calculations in automated pipelines.

### How it works
A DataFrame is a two-dimensional labelled table. A Boolean mask marks eligible rows; .loc selects rows and columns by labels. Vectorised operations generally avoid slow Python-level iteration.

### Worked example

```python
import pandas as pd
df = pd.read_csv('mastery_orders.csv')
completed = df.loc[df['status'].eq('Completed')].copy()
completed['revenue'] = completed['quantity'] * completed['unit_price']
print(len(completed), int(completed['revenue'].sum()))
```

**Expected output / verification**

```text
5 578000
```

**💡 Pro tip:** Use .loc and .copy() when creating a filtered DataFrame to make intent explicit.

**⚠️ Common trap:** Do not use `and` between pandas Series masks; use `&` with parentheses: (a) & (b).

### 🚀 Knowledge checks
1. How many rows qualify as Completed?
   - **Worked solution:** 5; returned order 1003 is excluded by the Boolean mask.
2. How do you select just East completed orders?
   - **Worked solution:** df.loc[df['status'].eq('Completed') & df['region'].eq('East')] returns orders 1001 and 1006.

**📌 Key takeaways:** Filter using Boolean masks; vectorize arithmetic; validate row counts.

## Module 05: Cleaning, nulls, typing and joins

**Learning outcome:** Protect an analytics pipeline against faulty imports.

### Why it matters
Noisy files often carry blank customer IDs, mixed formats and duplicate keys. Failures should be reported, not silently discarded.

### How it works
Use .isna() for NULL checks, .duplicated() for repeated keys and .merge(validate=...) to enforce join cardinality. Convert types deliberately with pd.to_numeric and pd.to_datetime; coerce errors only when you keep an exception count.

### Worked example

```python
import pandas as pd
df = pd.read_csv('mastery_orders.csv')
print(int(df['order_id'].duplicated().sum()))
print(int(df['customer_id'].isna().sum()))
assert df['order_id'].is_unique
assert df['quantity'].ge(0).all()
```

**Expected output / verification**

```text
0 duplicate OrderIDs
0 missing customer IDs
Assertions pass for the training file.
```

**💡 Pro tip:** Check duplicates and missing IDs both before and after merges; use validate="many_to_one" for fact→dimension lookups.

**⚠️ Common trap:** A merge on duplicate lookup keys can multiply transaction rows and inflate sales.

### 🚀 Knowledge checks
1. What does validate="many_to_one" mean?
   - **Worked solution:** Many fact rows can match one dimension key, but the dimension key must be unique.
2. When should to_numeric(errors="coerce") be used?
   - **Worked solution:** Only alongside a review of rows converted to NaN, not as a silent data-loss shortcut.

**📌 Key takeaways:** Validate keys, types and joins; produce an exception report alongside cleaned data.

## Module 06: groupby, pivot and business KPI reporting

**Learning outcome:** Generate a clear, reproducible regional summary.

### Why it matters
An automated weekly report needs the same measure definitions as the SQL and Power BI versions.

### How it works
groupby creates category partitions and reduces each to aggregations. Avoid adding percentages as if they were additive measures; compute a ratio from aggregated numerator and denominator.

### Worked example

```python
import pandas as pd
df = pd.read_csv('mastery_orders.csv')
x = df.loc[df.status.eq('Completed')].copy()
x['revenue'] = x.quantity * x.unit_price
print(x.groupby('region')['revenue'].sum().sort_values(ascending=False).to_dict())
```

**Expected output / verification**

```text
{'East': 316000, 'West': 190000, 'North': 72000}
```

**💡 Pro tip:** Use named aggregation and unit-tested metric functions in production reporting code.

**⚠️ Common trap:** groupby drops NULL grouping keys by default in pandas unless dropna=False is specified.

### 🚀 Knowledge checks
1. How do you calculate completed profit?
   - **Worked solution:** Create x['profit']=x.quantity*(x.unit_price-x.unit_cost), then sum: 135000.
2. How do you confirm the regional totals?
   - **Worked solution:** Sum regional revenue totals; the result must equal 578000.

**📌 Key takeaways:** Filter correctly; group at the business grain; reconcile grouped sums.

## Module 07: Statistics and uncertainty

**Learning outcome:** Interpret metrics without making unsupported causal claims.

### Why it matters
Executives often ask whether an apparent change reflects a durable pattern or random variation; statistics clarify what data can and cannot establish.

### How it works
Mean is sum/count, median is the middle observation after sorting, standard deviation measures variation, and sampling affects uncertainty. Correlation describes association, not proof of causation. Six fabricated rows are useful for learning syntax, not inference.

### Worked example

```python
values = [300000,40000,72000,150000,16000]
import statistics as stats
print(stats.mean(values))
print(stats.median(values))
print(min(values), max(values))
```

**Expected output / verification**

```text
115600
72000
16000 300000
```

**💡 Pro tip:** Communicate sample size, metric definition and any selection bias alongside a summary.

**⚠️ Common trap:** Using the mean as a typical order is misleading when there is a large 300000 order; compare median.

### 🚀 Knowledge checks
1. Which statistic is more resistant to outliers?
   - **Worked solution:** Median: 72000 in this five-order completed sample.
2. Can you infer nationwide sales growth from these six rows?
   - **Worked solution:** No. The dataset is intentionally illustrative and not a representative population sample.

**📌 Key takeaways:** Describe distributions and limitations; avoid unsupported causal or population claims.

## Module 08: NumPy vectors and matrix intuition

**Learning outcome:** Recognize vectorized calculations and matrix dimensions.

### Why it matters
Forecasting and machine learning depend on efficient numeric arrays; matrix dimensions explain common shape errors.

### How it works
A vector is an ordered numeric array; a matrix has rows and columns. Elementwise multiplication pairs corresponding positions; dot products sum pairwise products. A feature matrix X commonly has rows=observations and columns=features.

### Worked example

```python
import numpy as np
qty = np.array([2,5,4])
price = np.array([150000,8000,18000])
print((qty*price).tolist())
print(int(qty @ price))
print(np.column_stack([qty,price]).shape)
```

**Expected output / verification**

```text
[300000, 40000, 72000]
412000
(3, 2)
```

**💡 Pro tip:** Vectorise calculations where possible, but confirm array alignment and units before trusting speed gains.

**⚠️ Common trap:** Broadcasting may silently stretch arrays; use shape checks instead of relying on assumptions.

### 🚀 Knowledge checks
1. What does an array shape of (3,2) mean?
   - **Worked solution:** Three observations and two numeric features per observation.
2. What is the dot product of qty and price?
   - **Worked solution:** 412000, the sum of the three example line revenues.

**📌 Key takeaways:** Array shape matters; multiply elementwise for row totals; dot product sums them.

## Module 09: Time series, charts and testable forecasts

**Learning outcome:** Create a baseline with transparent limitations.

### Why it matters
Forecasting decisions require a benchmark and careful time-aware validation, rather than presenting a clever model as automatically accurate.

### How it works
Group by chronological month, create a baseline such as previous-month value, and compare predicted vs actual on later unseen periods. Data leakage occurs when future observations enter training features or preprocessing.

### Worked example

```python
import pandas as pd
df = pd.read_csv('mastery_orders.csv',parse_dates=['order_date'])
x = df[df.status.eq('Completed')].copy()
x['revenue'] = x.quantity*x.unit_price
monthly = x.groupby(x.order_date.dt.to_period('M'))['revenue'].sum()
print(monthly.to_dict())
```

**Expected output / verification**

```text
{Period('2026-01', 'M'): 340000, Period('2026-02', 'M'): 238000}
```

**💡 Pro tip:** For a real forecast, gather many more periods, define a holdout window and compare against a naive baseline.

**⚠️ Common trap:** Two months cannot support a reliable seasonal forecast; never advertise predictive accuracy from this demo.

### 🚀 Knowledge checks
1. What is the naive forecast for February based on January?
   - **Worked solution:** 340000, the previous-month completed revenue.
2. What is the February absolute forecast error for that baseline?
   - **Worked solution:** abs(238000-340000)=102000.

**📌 Key takeaways:** Time-aware splits prevent leakage; compare with a baseline; disclose uncertainty.

## Module 10: Python analytics capstone

**Learning outcome:** Package a repeatable, independently verified report.

### Why it matters
Professional scripts deliver a consistent output and clear failure messages when inputs change.

### How it works
Use functions for load, validate, transform, aggregate and export. Include small unit tests, fixed dependency versions, a README and documented schema. Reconcile totals against the SQL workbook control.

### Worked example

```python
import pandas as pd
df = pd.read_csv('mastery_orders.csv')
assert df.order_id.is_unique
x = df[df.status.eq('Completed')].copy()
x['revenue']=x.quantity*x.unit_price
x['profit']=x.quantity*(x.unit_price-x.unit_cost)
summary = x.groupby('region')[['revenue','profit']].sum()
assert x.revenue.sum()==578000
assert x.profit.sum()==135000
print(summary.loc['East'].to_dict())
```

**Expected output / verification**

```text
{'revenue': 316000, 'profit': 66000}
```

**💡 Pro tip:** Add automated test cases for empty data, missing required fields and duplicate identifiers.

**⚠️ Common trap:** Notebook outputs saved after a different execution order are not proof of reproducibility; run from a clean kernel.

### 🚀 Knowledge checks
1. What should fail the capstone build?
   - **Worked solution:** Missing required columns, duplicated order IDs or totals that violate reconciliation controls.
2. What should the README specify?
   - **Worked solution:** How to install, where to place input files, expected schema, run command, metric definitions and known limitations.

**📌 Key takeaways:** Package source + tests + readme + validated outputs, not only notebook screenshots.


# AI for Data Analytics — 10 modules

## Module 01: AI literacy, analytics tasks and limits

**Learning outcome:** Separate language generation from verifiable computation.

### Why it matters
Analysts can use AI to outline hypotheses and draft code quickly, but confident prose is not evidence that a number is correct.

### How it works
Large language models predict plausible next tokens. External tools or an actual dataset engine are required for reproducible computation; prompt instructions alone do not grant access to the data. Distinguish summarization, retrieval, predictive modelling and deterministic SQL.

### Worked example

```text
Prompt: 'Plan an analysis of mastery_orders.csv.
Identify the target KPI, required columns, risky assumptions,
and validation steps. Do not invent sales totals.'
```

**Expected output / verification**

```text
Expected response outline: business question → columns → inclusion rule → reproducible calculation → validation. Verified completed revenue = 578000 by separate code, not by prose alone.
```

**💡 Pro tip:** Use AI to propose a workflow; execute critical calculations in SQL, Excel, Python or Power BI.

**⚠️ Common trap:** An LLM that claims it "checked the data" without actually using a tool has not verified it.

### 🚀 Knowledge checks
1. What is the difference between a plan and a computed KPI?
   - **Worked solution:** A plan describes steps; a computed KPI comes from executing the defined calculation on actual rows.
2. What source control validates a claimed 578000?
   - **Worked solution:** Re-run a Completed-only sum in SQL/Excel/Python and inspect six input records.

**📌 Key takeaways:** AI drafts; engines calculate; analysts validate.

## Module 02: Prompt engineering as a mini specification

**Learning outcome:** Ask for testable and bounded analysis outputs.

### Why it matters
A vague prompt such as "analyse my sales" produces generic prose, whereas a specification defines the business question and acceptance tests.

### How it works
An effective prompt contains role, objective, input schema, inclusion/exclusion rules, output format and independent checks. Use small few-shot examples for complicated labelling; iteration should reduce ambiguity, not replace testing.

### Worked example

```text
Prompt: 'Act as a retail analyst. Given fields order_id,
status, quantity, unit_price and region, draft SQLite SQL
that sums quantity*unit_price only when status=Completed.
Return SQL, expected columns, and a reconciliation query.
Use no invented columns or values.'
```

**Expected output / verification**

```text
Expected SQL structure: WHERE status='Completed'; SUM(quantity*unit_price); GROUP BY region. Verified groups: East 316000, West 190000, North 72000.
```

**💡 Pro tip:** Treat acceptance criteria like software tests: expected columns, allowed tables and result reconciliation.

**⚠️ Common trap:** Without specifying SQL dialect, AI may suggest unsupported DATE_TRUNC or TOP syntax for SQLite.

### 🚀 Knowledge checks
1. What should be stated about the data schema?
   - **Worked solution:** Exact column names, types, grain and available tables.
2. What is an appropriate independent check?
   - **Worked solution:** An ungrouped Completed-only revenue query must equal the sum of grouped regions.

**📌 Key takeaways:** Specify input + rules + expected format + verification; iterate on reproducible errors.

## Module 03: Privacy, safety and responsible AI

**Learning outcome:** Choose what can be shared with an AI service.

### Why it matters
Customers, employee records and proprietary transactions may be confidential; disclosure must follow organizational policy and law.

### How it works
Classify data by sensitivity, mask or aggregate identifiers, review provider retention/settings and workspace access rules, and keep confidential datasets in approved environments. Human review is needed for bias, erroneous inferences and disclosure risk.

### Worked example

```text
Safe analysis handoff (synthetic):
region | completed_orders | revenue
East   | 2                | 316000
West   | 2                | 190000
North  | 1                | 72000
No phone numbers, customer emails or credentials included.
```

**Expected output / verification**

```text
Expected: an AI-ready aggregated summary with no personal identifiers. Sample values are fictional training data.
```

**💡 Pro tip:** Use the minimum data needed; for sensitive material require explicitly approved company tools and data handling.

**⚠️ Common trap:** Replacing names with IDs alone may not anonymize rare or linkable personal records.

### 🚀 Knowledge checks
1. Can a raw customer export be pasted into a public assistant?
   - **Worked solution:** Not unless the organization permits it and privacy/security requirements are satisfied.
2. What should happen if a prompt requests an access token?
   - **Worked solution:** Never expose secrets; use approved secret-management processes and redesign the workflow.

**📌 Key takeaways:** Minimize data; obey policies; verify bias and security risks before sharing.

## Module 04: AI-supported Excel and Power Query

**Learning outcome:** Generate formulas while validating workbook behavior.

### Why it matters
AI can explain formula options, but a workbook still must use supported functions and the correct source table.

### How it works
Provide column names and Excel version. Ask for a formula, explanation and edge-case tests. Apply it in Excel and compare a manual check; do not accept a generated formula merely because the syntax looks plausible.

### Worked example

```text
Prompt: 'For Excel 2016 Table Sales with Quantity, Price,
Status and Region, give a formula for completed East revenue
and explain each criterion. Avoid functions newer than 2016.'

Expected: =SUMIFS(Sales[Revenue],Sales[Status],"Completed",Sales[Region],"East")
```

**Expected output / verification**

```text
When Sales[Revenue]=[@Quantity]*[@Price], expected East completed revenue=316000.
```

**💡 Pro tip:** Provide the actual Excel version; request a legacy-compatible option and test 0-row scenarios.

**⚠️ Common trap:** XLOOKUP is not available in Excel 2016; suggest INDEX/MATCH or VLOOKUP exact-match.

### 🚀 Knowledge checks
1. How do you validate the AI formula?
   - **Worked solution:** Filter completed East orders 1001 and 1006 and manually sum 300000+16000.
2. How should a formula treat Returned orders?
   - **Worked solution:** Exclude them from the defined completed-revenue calculation.

**📌 Key takeaways:** AI proposes formulas; your workbook and independent checks establish correctness.

## Module 05: AI-assisted SQL with schema-grounded output

**Learning outcome:** Prevent plausible but invalid queries.

### Why it matters
Text generators may guess joins, columns or dialect-specific functions. Giving a schema changes the exercise from creative writing to constrained code review.

### How it works
Attach an explicit CREATE TABLE schema or allowed-column list, request a read-only query, and specify SQLite. Review filters, NULL logic and group grain; execute it against the training database and inspect results.

### Worked example

```text
Prompt: 'SQLite table orders(order_id,order_date,region,
quantity,unit_price,status). Write read-only SQL for
completed monthly revenue. Return query and validation
query. Do not create missing columns.'

SELECT strftime('%Y-%m',order_date) month,
SUM(quantity*unit_price) revenue
FROM orders WHERE status='Completed'
GROUP BY month ORDER BY month;
```

**Expected output / verification**

```text
Expected months: 2026-01 = 340000; 2026-02 = 238000.
```

**💡 Pro tip:** Ask AI to state its assumed grain, SQL dialect and every join key before producing complex queries.

**⚠️ Common trap:** A tool-generated query can run successfully but still count returned orders; execution success is not business correctness.

### 🚀 Knowledge checks
1. What makes a query schema-grounded?
   - **Worked solution:** Only columns and tables present in the documented dataset are used.
2. What separate validation detects excluded-status mistakes?
   - **Worked solution:** Run a Completed-only total check (578000) and compare monthly sum.

**📌 Key takeaways:** Ground prompts in schema; run generated code; reconcile independently.

## Module 06: AI-assisted Python and debugging

**Learning outcome:** Use AI to draft code and explain failures, not hide them.

### Why it matters
Python automation is valuable but copying code blindly creates silent errors and brittle scripts.

### How it works
Give the traceback, minimal safe example and package versions. Ask for the smallest fix and a test. Prefer deterministic pandas checks that assert row counts and financial totals.

### Worked example

```text
Prompt: 'Explain this pandas bug and fix it: 
mask = (df.status == "Completed") and (df.region == "East")
Return corrected code and expected number of rows.'

mask = (df.status == 'Completed') & (df.region == 'East')
print(df.loc[mask].shape[0])
```

**Expected output / verification**

```text
Expected row count = 2. East completed revenue = 316000.
```

**💡 Pro tip:** Request unit tests and explainability for any generated transformation; diff edits before running.

**⚠️ Common trap:** Python `and` cannot combine pandas Series masks; use `&` with parentheses.

### 🚀 Knowledge checks
1. Why did `and` fail?
   - **Worked solution:** The truth value of an entire pandas Series is ambiguous.
2. How would you assert the result?
   - **Worked solution:** assert df.loc[mask].shape[0] == 2 after loading the known training dataset.

**📌 Key takeaways:** Debug with minimal examples; prefer smallest fixes; add regression tests.

## Module 07: AI-assisted DAX and semantic models

**Learning outcome:** Check evaluation context before trusting DAX.

### Why it matters
AI can suggest DAX formulas that look correct but change when slicers filter the model.

### How it works
Provide the fact grain, table names, relationships, measure definitions and expected filter behavior. Test measures in card and matrix visuals; differentiate row context from filter context and assess CALCULATE filter transitions.

### Worked example

```text
Prompt: 'FactSales has quantity, unit_price, status, region.
Write a DAX measure for Completed revenue that responds
to Region slicers. Use SUMX and CALCULATE; explain context.'

Revenue := CALCULATE(SUMX(FactSales,
 FactSales[quantity]*FactSales[unit_price]),
 FactSales[status] = "Completed")
```

**Expected output / verification**

```text
All regions = 578000; Region East = 316000; West = 190000.
```

**💡 Pro tip:** Ask for filter-context tests, not only a measure. Validate a grand total and at least two slicer combinations.

**⚠️ Common trap:** Removing all fact filters to fix a single result may erase legitimate date/region selections.

### 🚀 Knowledge checks
1. What does SUMX evaluate?
   - **Worked solution:** An expression row-by-row over the table in the current filter context.
2. How do you prove the measure responds to a slicer?
   - **Worked solution:** East must yield 316000, then clearing the slicer returns 578000.

**📌 Key takeaways:** Specify model context; explain filters; test measures under actual interactions.

## Module 08: Statistical reasoning, ML and forecast critique

**Learning outcome:** Distinguish credible predictive evidence from seductive narratives.

### Why it matters
Forecasts are high-impact because decision makers may act on them; AI-generated accuracy claims require a real test design.

### How it works
Check baseline methods, time-split validation, leakage, sample size, evaluation metric and confidence intervals. A model needs sufficient data for seasonality; two training months only demonstrate calculation.

### Worked example

```text
Evaluation brief:
Observed January completed revenue: 340000
Observed February completed revenue: 238000
Naive February forecast (use Jan): 340000
Absolute error: |238000-340000| = 102000
```

**Expected output / verification**

```text
This demonstrates an error computation, not valid forecasting performance or expected future sales.
```

**💡 Pro tip:** Ask AI to find leakage risks and propose a baseline before recommending a complex model.

**⚠️ Common trap:** Mixing future target data into training features creates deceptively optimistic accuracy.

### 🚀 Knowledge checks
1. Can this two-month sample establish a seasonal trend?
   - **Worked solution:** No, it cannot support seasonality or a defensible generalized forecast.
2. What baseline can be used for a time series?
   - **Worked solution:** Previous period value, evaluated on chronologically held-out periods.

**📌 Key takeaways:** Baseline first; chronological holdout; bias/leakage review; uncertainty disclosures.

## Module 09: Automation, agents and human approval

**Learning outcome:** Design repeatable workflows with safeguards.

### Why it matters
Scheduled reporting can save analyst hours, but an automated agent must not silently overwrite records or send incorrect figures.

### How it works
A safe flow has trigger → ingest → validate → calculate → compare controls → approval → publish → monitor. Use least-privilege access, idempotent processing, logs and retries; require human approval for sensitive external actions.

### Worked example

```text
Workflow pseudo-logic:
if duplicate_order_ids > 0: BLOCK
elif completed_revenue != reconciled_total: BLOCK
else: CREATE_DRAFT_REPORT
HUMAN_REVIEW → PUBLISH_TO_AUTHORISED_AUDIENCE
```

**Expected output / verification**

```text
Expected controls on training data: 0 duplicate IDs; completed revenue 578000; workflow may advance to draft review.
```

**💡 Pro tip:** Log source version, execution timestamp, check status and reviewer approval; alert when assumptions break.

**⚠️ Common trap:** Automatic publication without permission, source validation or rollback creates avoidable operational risk.

### 🚀 Knowledge checks
1. What does idempotent mean in this workflow?
   - **Worked solution:** Rerunning a task should not duplicate deliveries or mutate results repeatedly.
2. What triggers a stop?
   - **Worked solution:** Unresolved source defects, failed reconciliations, unavailable authorization, or unapproved sensitive action.

**📌 Key takeaways:** Automate deterministic checks; gate risky actions; retain logs and rollback options.

## Module 10: Governed AI analytics capstone

**Learning outcome:** Deliver an independently checked AI-assisted analysis.

### Why it matters
A credible AI portfolio submission shows how tools accelerated work without replacing analytical responsibility.

### How it works
Define a real question, sanitize inputs, draft SQL/Excel/Python/DAX with AI, execute in an appropriate engine, reconcile to a gold control, and document the precise role AI played. Record limitations and a reviewer sign-off.

### Worked example

```text
Deliverable evidence:
1. Business question and synthetic input dictionary
2. One clearly bounded AI prompt and its draft output
3. Independently executed calculation + error checks
4. Executive insight + privacy review
5. Reproduction instructions and AI-use declaration
```

**Expected output / verification**

```text
Accepted sample controls: Completed orders 5, revenue 578000, profit 135000. All claims must match the executed training dataset.
```

**💡 Pro tip:** Create a side-by-side AI suggestion vs tested result table; highlight corrections openly.

**⚠️ Common trap:** Concealing invented figures, sensitive inputs or unreviewed code invalidates the demonstration.

### 🚀 Knowledge checks
1. How should a generated but unexecuted query be labelled?
   - **Worked solution:** Draft / unverified, never an actual measured output.
2. What justifies sign-off?
   - **Worked solution:** Correct computations, documented sources, tested assumptions, appropriate data handling, reproducibility and human review.

**📌 Key takeaways:** Prompt → draft → verify → document → communicate, under explicit privacy controls.
