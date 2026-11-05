# Data Learning Path — Mastery v34 · Complete 50-week Teaching Curriculum

This curriculum is reproduced in the live course HTML pages. Each course uses 10 separately navigable weeks, with worked examples against the **fictional** included retail orders CSV.

> Learning workflow: **Understand the why → learn the mechanics → follow 3 steps → run an example → verify output → attempt challenges → review takeaways.**

## The training dataset and controls

| Control | Expected value |
|---|---:|
| Raw order records | 6 |
| Completed orders | 5 |
| Completed gross revenue | 578,000 |
| Completed gross profit | 135,000 |
| Completed East revenue | 316,000 |
| Completed West revenue | 190,000 |
| Completed North revenue | 72,000 |

All currency figures are unitless illustrative local-currency amounts. No actual customer information is used.

## SQL — 10 weeks

### Week 1: SQL foundations and relational thinking

**Learning objective:** Return a trustworthy transaction-level extract.

**Why this matters:** A retail manager asks which orders were completed. A database stores repeated transactions consistently, and SQL retrieves the precise rows required for the decision.

**How it works:** A table has a row grain (one order here), typed columns, and an identifying key. SELECT chooses columns, FROM chooses the table, WHERE restricts rows, and ORDER BY makes presentation deterministic. The engine parses SQL, builds a query plan, and evaluates it on stored rows.

**Think of it this way:** Think of a database table as a register: each row is one order, and each column answers one fixed question about that order. The order ID identifies a record; it is not a calculation.

**Walkthrough:**
1. Open the orders table and inspect column names
2. Ask what one row represents before doing any sums
3. Choose only the columns needed, restrict the completed orders, then sort by order_id

**Worked example (sql):**

```sql
SELECT order_id, customer, quantity, unit_price
FROM orders
WHERE status = 'Completed'
ORDER BY order_id
LIMIT 3;
```

**Expected output or verification:**

```text
order_id | customer | quantity | unit_price
1001     | Amina    | 2        | 150000
1002     | Kola     | 5        | 8000
1004     | Ngozi    | 4        | 18000
```

**Interpretation:** In the first displayed record, quantity 2 and unit price 150000 describe order 1001; the query has not yet multiplied them. LIMIT 3 limits the display, not the actual database.

**💡 Pro tip:** List only required columns; ORDER BY before LIMIT makes the sample reproducible.

**⚠️ Beginner trap:** Without ORDER BY, LIMIT does not guarantee which three rows are returned.

**🚀 Independent exercise:** Change LIMIT 3 to LIMIT 5 and explain why five rows qualify even though the input has six.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Identify table grain; SELECT specific columns; WHERE filters; ORDER BY makes results stable.

---

### Week 2: Filtering, Boolean logic and sorting

**Learning objective:** Distinguish row eligibility from display order.

**Why this matters:** Teams often ask for one region, one status, and a minimum transaction size; incorrect AND/OR logic quietly changes reported sales.

**How it works:** WHERE evaluates a Boolean condition per row, before grouping. AND binds more tightly than OR, so brackets communicate the intended condition. Text equality and numeric comparisons differ; NULL requires IS NULL, not = NULL.

**Think of it this way:** A WHERE filter is a set of admission rules for individual rows. The database checks those rules before performing any totals; ORDER BY decides how the surviving rows are displayed.

**Walkthrough:**
1. State each condition in plain language
2. Add parentheses around combined AND/OR tests
3. Sort the filtered result by a meaningful column and then a stable tie-break

**Worked example (sql):**

```sql
SELECT order_id, region, quantity * unit_price AS gross_value
FROM orders
WHERE status='Completed' AND region IN ('East','West')
  AND quantity * unit_price >= 40000
ORDER BY gross_value DESC, order_id;
```

**Expected output or verification:**

```text
order_id | region | gross_value
1001     | East   | 300000
1005     | West   | 150000
1002     | West   | 40000
```

**Interpretation:** Compare the order IDs returned, not just the count. The same five completed transactions can appear in different display orders without changing the business answer.

**💡 Pro tip:** Filter timestamps with an inclusive start and exclusive next-day boundary for portable date ranges.

**⚠️ Beginner trap:** WHERE region='East' OR region='West' AND status='Completed' also admits returned East orders.

**🚀 Independent exercise:** Show completed orders from East or West; then change the logic to East AND West and describe why no single-region order qualifies.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Filter before aggregation; parenthesize mixed conditions; sort using an explicit tie-break.

---

### Week 3: Aggregations and KPI definitions

**Learning objective:** Calculate net sales with a clear numerator and denominator.

**Why this matters:** A performance dashboard must reconcile to finance: one returned order must not inflate completed-order revenue.

**How it works:** GROUP BY forms one group per region; SUM reduces rows to a metric. WHERE removes unqualified transactions before aggregation; HAVING filters completed groups. Financial reporting must define whether revenue includes tax, discounts, refunds and returns.

**Think of it this way:** An aggregate compresses many qualifying orders into a summary. Decide the group (region) and the unit (currency value) before writing SUM, AVG or COUNT.

**Walkthrough:**
1. Filter to completed sales so returns are not treated as positive revenue
2. Calculate revenue per order as quantity × unit_price
3. Group by region and reconcile region totals back to 578000

**Worked example (sql):**

```sql
SELECT region, COUNT(*) AS completed_orders,
       SUM(quantity*unit_price) AS revenue
FROM orders
WHERE status='Completed'
GROUP BY region
ORDER BY revenue DESC;
```

**Expected output or verification:**

```text
region | completed_orders | revenue
East   | 2                | 316000
West   | 2                | 190000
North  | 1                | 72000
TOTAL  | 5                | 578000
```

**Interpretation:** East 316000 + West 190000 + North 72000 = 578000. These are gross order values; profit uses a different formula: quantity × (unit_price − unit_cost).

**💡 Pro tip:** Validate the total with an independent ungrouped SUM query (should be 578000).

**⚠️ Beginner trap:** COUNT(*) counts rows; COUNT(column) ignores NULLs. Also never SUM a rate such as margin percentage.

**🚀 Independent exercise:** Add profit per region, reconcile to 135000, and explain the difference between gross revenue and profit.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Know each KPI definition; group at the requested grain; reconcile aggregates to source totals.

---

### Week 4: Joins and relationship cardinality

**Learning objective:** Enrich facts without accidentally duplicating revenue.

**Why this matters:** Order records may hold a customer_id while the customer segment sits in a separate table; analyses need reliable dimension joins.

**How it works:** JOIN matches related keys. One-to-many means a customer can have many orders; many-to-many or duplicate dimension keys can multiply rows. An INNER JOIN keeps matches, while LEFT JOIN keeps all rows on the left and flags unmatched reference data.

**Think of it this way:** A JOIN is like looking up a customer’s segment using a customer ID. The danger is that matching two or more customer rows to one order can copy its revenue multiple times.

**Walkthrough:**
1. Write down the unique key on each side of the join
2. Check customer IDs for duplicates before joining
3. Compare order count and revenue before and after the join

**Worked example (sql):**

```sql
SELECT o.order_id, c.segment, o.quantity*o.unit_price AS revenue
FROM orders AS o
LEFT JOIN customers AS c ON o.customer_id=c.customer_id
WHERE o.status='Completed'
ORDER BY o.order_id LIMIT 3;
```

**Expected output or verification:**

```text
order_id | segment  | revenue
1001     | Consumer | 300000
1002     | Business | 40000
1004     | Business | 72000
```

**Interpretation:** A LEFT JOIN preserves orders even when no customer record matches. The segment is extra context; the order amount must not change because of the lookup.

**💡 Pro tip:** Check that the sum before and after a many-to-one lookup join is still 578000.

**⚠️ Beginner trap:** Do not join on non-unique names or forget the ON clause; check row counts and missing keys.

**🚀 Independent exercise:** Create an unmatched-customer report using LEFT JOIN and WHERE c.customer_id IS NULL; state what zero means.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Join on stable keys; know cardinality; test unmatched keys and duplicated totals.

---

### Week 5: NULLs, CASE and data quality

**Learning objective:** Translate raw statuses into explicit business categories.

**Why this matters:** Reports routinely distinguish completed, returned and pending transactions, plus unknown values that must not silently fall into a valid bucket.

**How it works:** NULL means unknown or missing, not zero or blank text. CASE evaluates WHEN branches in order; COALESCE chooses the first non-NULL input. A quality label should be mutually exclusive and include an ELSE branch.

**Think of it this way:** NULL means 'not recorded' rather than zero or a blank string. A CASE expression is a decision tree: the first true condition wins, and ELSE handles everything else.

**Walkthrough:**
1. Count the raw status values
2. Specify business labels for Completed and Returned
3. Keep an ELSE category so new or missing statuses are visible

**Worked example (sql):**

```sql
SELECT order_id, status,
 CASE WHEN status='Completed' THEN 'Recognised'
      WHEN status='Returned' THEN 'Reversal'
      ELSE 'Review' END AS status_group
FROM orders ORDER BY order_id LIMIT 4;
```

**Expected output or verification:**

```text
order_id | status    | status_group
1001     | Completed | Recognised
1002     | Completed | Recognised
1003     | Returned  | Reversal
1004     | Completed | Recognised
```

**Interpretation:** The example classifies orders 1001 and 1002 as Recognised, and order 1003 as Reversal. This describes the rule; it does not modify stored statuses.

**💡 Pro tip:** Inspect DISTINCT status values before writing a CASE mapping.

**⚠️ Beginner trap:** WHERE status <> 'Completed' does not capture NULL statuses; test IS NULL explicitly.

**🚀 Independent exercise:** Add an AuditFlag label for NULL status using IS NULL, then describe why '= NULL' does not work.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Distinguish NULL from zero; define category mappings; inspect unmapped exceptions.

---

### Week 6: CTEs and layered SQL

**Learning objective:** Separate row-level business logic from aggregation.

**Why this matters:** Auditors and colleagues should be able to trace a KPI back to its qualifying transactions instead of interpreting a single oversized query.

**How it works:** A Common Table Expression (WITH) names an intermediate result within a single statement. Build detail-level calculated columns in one step, aggregate in another; most databases decide whether to inline or materialize CTEs based on the optimizer.

**Think of it this way:** A CTE is a named, temporary query result used within one SQL statement. Think of it as a worksheet tab that you can refer to later in the same calculation.

**Walkthrough:**
1. Create completed_sales as transaction-level rows
2. Check that the CTE contains five orders
3. Aggregate those rows by region in the outer query

**Worked example (sql):**

```sql
WITH completed_sales AS (
 SELECT region, quantity*unit_price AS revenue
 FROM orders WHERE status='Completed'
)
SELECT region, SUM(revenue) AS total_revenue
FROM completed_sales GROUP BY region ORDER BY total_revenue DESC;
```

**Expected output or verification:**

```text
region | total_revenue
East   | 316000
West   | 190000
North  | 72000
```

**Interpretation:** The final regional numbers must equal the earlier grouped query. A CTE improves readability, but it does not automatically make the engine faster.

**💡 Pro tip:** Use naming that describes the transformation: validated_orders, completed_sales, monthly_kpis.

**⚠️ Beginner trap:** A CTE is not automatically cached or faster; benchmark the actual execution plan.

**🚀 Independent exercise:** Add a second CTE for regional totals, then retrieve only regions whose completed revenue exceeds 100000.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** One CTE per logical transformation; readable aliases; verify intermediates before final sums.

---

### Week 7: Window functions and ranking

**Learning objective:** Rank customers while preserving transaction detail.

**Why this matters:** Top-customer reporting and monthly running totals need calculations that do not collapse the original records.

**How it works:** Unlike GROUP BY, OVER computes within a window of rows while returning each selected row. PARTITION BY creates independent groups; ORDER BY defines sequence. ROW_NUMBER chooses one row per partition only when the sort has a reliable tie-break.

**Think of it this way:** GROUP BY reduces rows to one summary per group; a window function adds context without removing the original rows. Picture a ranking column written beside each order.

**Walkthrough:**
1. Partition by customer so each customer has a separate sequence
2. Order by date descending and add order_id to break ties
3. Assign ROW_NUMBER and keep rank 1 only when you need the latest order

**Worked example (sql):**

```sql
SELECT customer, order_id, order_date,
 ROW_NUMBER() OVER(
 PARTITION BY customer ORDER BY order_date DESC, order_id DESC
 ) AS recency_rank
FROM orders WHERE status='Completed'
ORDER BY customer, recency_rank;
```

**Expected output or verification:**

```text
customer | order_id | recency_rank
Amina    | 1001     | 1
Idris    | 1005     | 1
Kola     | 1002     | 1
Ngozi    | 1006     | 1
Ngozi    | 1004     | 2
```

**Interpretation:** Ngozi has two completed orders. Her February 18 order ranks ahead of her February 9 order, yet both appear in the unfiltered window result.

**💡 Pro tip:** Use ROW_NUMBER for deterministic latest-row selection; use RANK/DENSE_RANK only when ties carry meaning.

**⚠️ Beginner trap:** Window ORDER BY and final output ORDER BY serve different purposes. Missing tie-breaks make latest-row logic unstable.

**🚀 Independent exercise:** Use DENSE_RANK on a regional revenue summary and explain what happens if two regions tie.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** WINDOW = partition + ordering + optional frame; row counts remain unchanged.

---

### Week 8: Date analysis and period-over-period metrics

**Learning objective:** Produce monthly series with correct chronological order.

**Why this matters:** Leadership needs January and February comparisons; grouping only by month name mixes years and creates misleading trends.

**How it works:** SQLite strftime returns a sortable YYYY-MM month key. Filter timestamps at the desired grain, group by year-month, and use LAG for a prior period. The dialect matters: use DATE_TRUNC in other systems, not SQLite.

**Think of it this way:** Time analysis starts by placing each order in an accurate calendar bucket. A month is not just 'January': the year matters, and partial months cannot always be compared fairly.

**Walkthrough:**
1. Extract YYYY-MM from the transaction date
2. Exclude returned orders consistently
3. Group revenue by month and compare complete periods

**Worked example (sql):**

```sql
SELECT strftime('%Y-%m',order_date) AS month,
 SUM(quantity*unit_price) AS revenue
FROM orders WHERE status='Completed'
GROUP BY strftime('%Y-%m',order_date) ORDER BY month;
```

**Expected output or verification:**

```text
month   | revenue
2026-01 | 340000
2026-02 | 238000
```

**Interpretation:** January contributes 340000 and February 238000. The February change is −102000, or −30% of January; the tiny fictional sample cannot justify a trend forecast.

**💡 Pro tip:** Build a calendar dimension for continuous reporting; no order in a month is not always a zero-sales month.

**⚠️ Beginner trap:** Beware string-sorted month names and using current-month partial data against a complete prior month.

**🚀 Independent exercise:** Add a previous_month column with LAG and explain why the first row has no previous comparison.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Use year-aware period keys; compare complete, like-for-like periods; document date boundaries.

---

### Week 9: Performance and validation

**Learning objective:** Improve query execution without breaking metric integrity.

**Why this matters:** A fast incorrect report is worse than a slower audited one; reliability comes before indexing and speed work.

**How it works:** Start with expected row counts, distinct keys, nulls and reconciliations. EXPLAIN QUERY PLAN describes access paths and joins. Indexes can improve selective lookups but add storage and write overhead; on small training datasets a full scan may be optimal.

**Think of it this way:** Validation is the safety check before optimization. A query that returns quickly but duplicates transactions is still incorrect.

**Walkthrough:**
1. Check total row count and distinct order IDs
2. Check the five qualifying completed records and their combined revenue
3. Only then inspect EXPLAIN QUERY PLAN or try an index

**Worked example (sql):**

```sql
SELECT COUNT(*) AS row_count,
 COUNT(DISTINCT order_id) AS unique_orders,
 SUM(CASE WHEN status='Completed'
          THEN quantity*unit_price ELSE 0 END) AS revenue
FROM orders;
```

**Expected output or verification:**

```text
row_count | unique_orders | revenue
6         | 6             | 578000
```

**Interpretation:** The input has six order rows, six distinct order IDs and 578000 in completed revenue. Keep these numbers as independent controls after any rewrite.

**💡 Pro tip:** Keep the validation query beside the production query; rerun both after any optimization.

**⚠️ Beginner trap:** EXPLAIN output is platform-specific, and an index is not inherently better for tiny tables.

**🚀 Independent exercise:** Intentionally join orders to a duplicate reference table, then use row counts to diagnose inflated totals.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** First correctness, then plan inspection, then selective optimization, then revalidation.

---

### Week 10: SQL analytics capstone

**Learning objective:** Deliver repeatable, stakeholder-ready SQL outputs.

**Why this matters:** An analyst must supply business context, definitions, reproducible queries and evidence—not only a screenshot of a chart.

**How it works:** Begin with a metric contract (completed gross revenue, completed orders, profit). Build a validated fact extract, create group and time views, reconcile them, and document caveats such as the tiny illustrative dataset.

**Think of it this way:** A production analytics deliverable is more than SQL syntax: it connects a business question, an agreed metric definition, verifiable output and a handoff note.

**Walkthrough:**
1. Record the question and inclusion rule
2. Run detail, regional and monthly views that reuse the same completed-sales definition
3. Reconcile regional revenue 578000 and profit 135000 to the source

**Worked example (sql):**

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

**Expected output or verification:**

```text
region | orders | revenue | profit
East   | 2      | 316000  | 66000
West   | 2      | 190000  | 45000
North  | 1      | 72000   | 24000
```

**Interpretation:** The region summary accounts for all five completed orders. Document limitations: six invented orders are suitable for practice, not real market conclusions.

**💡 Pro tip:** Deliver a README with business grain, transformations, reconciliation checks and limitations.

**⚠️ Beginner trap:** Do not treat this six-row illustrative sample as evidence about real customer behavior.

**🚀 Independent exercise:** Deliver three SQL files plus a one-page README defining revenue, profit, returned-order treatment and control totals.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Define → transform → calculate → validate → communicate; keep the script versioned.

---

## Excel — 10 weeks

### Week 1: Workbook fundamentals and analyst workflow

**Learning objective:** Navigate and structure a reproducible workbook.

**Why this matters:** An operations analyst receives daily order exports. A clear workbook structure reduces formula mistakes and lets a colleague audit the numbers.

**How it works:** Rows hold records, columns hold attributes, and cells hold values or formulas. Separate RawData, Calculations and Dashboard sheets; use one row per order, true dates, no merged data headers, and a clear source/date note.

**Think of it this way:** A well-designed workbook is a small information system: source rows enter in one place, calculations happen separately, and a dashboard displays the conclusion.

**Walkthrough:**
1. Open the CSV without changing the original file
2. Confirm each column contains one type of information and dates are true dates
3. Separate RawData, Calculations and Dashboard tabs

**Worked example (excel):**

```text
RawData!A1:J3
OrderID | Date       | Customer | Region | Product | Qty | Price | Cost  | Status
1001    | 2026-01-05 | Amina    | East   | Laptop  | 2   | 150000| 120000| Completed
1002    | 2026-01-08 | Kola     | West   | Mouse   | 5   | 8000  | 5000  | Completed
```

**Expected output or verification:**

```text
One header row; each order occupies one row; do not use subtotals inside the source table.
```

**Interpretation:** Order 1001 is one row for a laptop sale: two units at 150000 each. Do not insert a subtotal row between transactions because PivotTables will count it as another record.

**💡 Pro tip:** Name raw input tabs and preserve original file versions; do not edit imported records invisibly.

**⚠️ Beginner trap:** Merged headers, blank separator rows, and numbers stored as text break filters and PivotTables.

**🚀 Independent exercise:** Create a 12-column data dictionary: field name, what it means and expected data type.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Use clean tabular source data; label units and grain; avoid mixing input with presentation.

---

### Week 2: Excel Tables and validation

**Learning objective:** Make calculations expand automatically as transactions grow.

**Why this matters:** Order logs grow daily. A manual formula range stops at yesterday’s last row, whereas a Table can extend calculated columns and references.

**How it works:** Ctrl+T creates an Excel Table with headers, filters, and structured references. Add a Revenue column with =[@Qty]*[@Price]; Excel fills it down the Table. Data Validation can restrict Status to permitted values.

**Think of it this way:** An Excel Table behaves like an expanding dataset, not a fixed rectangle of cells. Structured references name columns and stay readable when new orders arrive.

**Walkthrough:**
1. Select any cell in the data and press Ctrl+T with headers
2. Rename the table Sales
3. Add a Revenue column using =[@Quantity]*[@Unit_Price] with the actual header names

**Worked example (excel):**

```text
Name the table: Sales
Revenue column formula: =[@Qty]*[@Price]
Status validation list: Completed,Returned
For OrderID 1001: 2 * 150000 = 300000
```

**Expected output or verification:**

```text
OrderID | Qty | Price  | Revenue
1001    | 2   | 150000 | 300000
1002    | 5   | 8000   | 40000
```

**Interpretation:** Excel calculates 300000 for order 1001 and 40000 for order 1002. Status Data Validation helps manual entry but does not guarantee that imported rows are clean.

**💡 Pro tip:** Use Tables instead of fixed A2:A100 ranges in models that receive new rows.

**⚠️ Beginner trap:** Data Validation improves entry quality, but imported data can still violate rules; audit it too.

**🚀 Independent exercise:** Add a new practice order and verify that the Revenue formula auto-fills; compare with a fixed A2:A6 range.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Tables scale; structured references reduce broken formulas; validation is preventive, not sufficient.

---

### Week 3: References and core formulas

**Learning objective:** Compute repeatable sales metrics without broken references.

**Why this matters:** Finance often asks for tax, targets and profit; formulas must handle fill-down correctly and preserve fixed assumptions.

**How it works:** Relative references move when copied. An absolute reference such as $M$2 never moves. SUM aggregates, ROUND controls display precision, and IFERROR handles anticipated calculation errors without hiding all source defects.

**Think of it this way:** A relative reference is a moving instruction; an absolute reference is an anchor. In sales work you often multiply different quantities by one shared VAT rate.

**Walkthrough:**
1. Enter a rate in one labelled cell
2. Use $ to lock that reference when copying a formula
3. Validate copied formulas with one hand-calculated order

**Worked example (excel):**

```text
Assume Sales[Revenue] has six gross order values.
=SUM(Sales[Revenue])                 → 602000
=SUMIFS(Sales[Revenue],Sales[Status],"Completed") → 578000
=ROUND(578000*$M$2,2) with M2=7.5%  → 43350
```

**Expected output or verification:**

```text
Metric                  | Value
All-order gross sales   | 602000
Completed gross sales   | 578000
7.5% hypothetical levy | 43350
```

**Interpretation:** If VAT is 7.5% and an order has revenue 300000, tax would be 22500; the net sale treatment depends on whether prices already include VAT.

**💡 Pro tip:** Keep assumptions on an Inputs sheet, with cells named and referenced rather than hard-coded into each formula.

**⚠️ Beginner trap:** Using A2 instead of $A$2 for a single global rate changes the rate as the formula is copied.

**🚀 Independent exercise:** Write the formulas for quantity×price, quantity×unit cost and their difference; test with order 1001.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Choose relative vs absolute carefully; clarify included records; reconcile derived measures.

---

### Week 4: IF, SUMIFS, XLOOKUP and legacy lookups

**Learning objective:** Apply business rules and join small reference lists.

**Why this matters:** Order reviews require statuses, thresholds and product categories from a lookup table.

**How it works:** IF returns a branch; SUMIFS calculates numeric totals with multiple criteria. XLOOKUP matches a key and returns a related value in newer Excel; for Excel 2016 use INDEX/MATCH or VLOOKUP with exact-match FALSE. Guard against missing keys.

**Think of it this way:** IF is a fork in the road. SUMIFS groups only values meeting explicit rules. XLOOKUP or VLOOKUP attaches information from a reliable reference list.

**Walkthrough:**
1. Use IF to set returned orders' recognized revenue to zero
2. Use SUMIFS to add completed East revenue
3. Inspect lookup keys before pulling segment or region from a separate table

**Worked example (excel):**

```text
=IF([@Status]="Completed",[@Revenue],0)
=SUMIFS(Sales[Revenue],Sales[Status],"Completed",Sales[Region],"East")
Excel 2016: =IFERROR(INDEX(Category[Group],MATCH([@Product],Category[Product],0)),"Unmapped")
```

**Expected output or verification:**

```text
Completed East sales: 316000.
Mapped example: Laptop → Electronics.
Unknown product → Unmapped (not a fabricated category).
```

**Interpretation:** East completed revenue equals 300000 + 16000 = 316000; the East returned order worth 24000 is excluded. Excel 2016 users may need INDEX/MATCH or VLOOKUP instead of XLOOKUP.

**💡 Pro tip:** Always request exact matching for IDs; treat unmatched keys as a visible data-quality outcome.

**⚠️ Beginner trap:** VLOOKUP without FALSE can return approximate matches and silently misclassify products.

**🚀 Independent exercise:** Make a missing-lookup flag with IFERROR or ISNA; do not silently display zero for unknown customers.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Define criteria precisely; prefer explicit exact-match lookups; surface missing mappings.

---

### Week 5: Cleaning and data preparation

**Learning objective:** Create a consistent source without losing provenance.

**Why this matters:** In real feeds, spaces, duplicates, invalid dates and inconsistent capitalization can fragment business categories.

**How it works:** TRIM removes surplus spaces, CLEAN removes nonprinting characters, PROPER standardizes names when appropriate, and COUNTIF can identify repeat IDs. Power Query preserves a replayable sequence of transformations.

**Think of it this way:** Cleaning is not deleting anything that looks inconvenient. You preserve raw evidence, fix documented issues in a copy and test whether the change affected KPIs.

**Walkthrough:**
1. List the field-level quality rules
2. Trim extra spaces, validate numeric and date types, and inspect duplicates
3. Compare record counts and completed revenue before/after the cleaned view

**Worked example (excel):**

```text
=TRIM(A2)                  // "  East  " → "East"
=COUNTIF(Sales[OrderID],[@OrderID])  // expected 1 per sample row
=IF([@Status]="Returned","Excluded from completed revenue","Include")
```

**Expected output or verification:**

```text
Status=Returned on OrderID 1003 → Excluded from completed revenue.
Duplicates in mastery data: 0.
```

**Interpretation:** Returned order 1003 must remain in the dataset for audit; it is simply excluded by the completed-sales business rule.

**💡 Pro tip:** Retain a raw snapshot, document every transformation and test uniqueness after cleanup.

**⚠️ Beginner trap:** PROPER should not automatically change company acronyms or official names; get a business rule first.

**🚀 Independent exercise:** Create a small issue log showing field, original value, correction, reason and validation result.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Clean systematically; keep audit trails; assess source quality before reporting.

---

### Week 6: Sorting, filters and quick analysis

**Learning objective:** Explore trends without corrupting row relationships.

**Why this matters:** Sales managers filter geography and status during daily reviews; accidental partial-range sorting can detach quantities from the wrong orders.

**How it works:** Table filtering hides unrelated rows without deleting them. SUMIFS respects explicit logical criteria, while SUBTOTAL can aggregate visible rows only. Keep source filters separate from final KPI definitions.

**Think of it this way:** Filtering is a viewing decision; deleting is a data change. Excel's SUBTOTAL reacts to filtered rows while plain SUM may include all rows.

**Walkthrough:**
1. Convert the range to a Table
2. Filter Status to Completed and Region to West
3. Apply SUBTOTAL to visible revenue and cross-check order IDs

**Worked example (excel):**

```text
=SUBTOTAL(109,Sales[Revenue])
After filtering Status=Completed and Region=West:
Visible OrderIDs: 1002 and 1005
```

**Expected output or verification:**

```text
Visible West completed revenue: 40000 + 150000 = 190000.
The unfiltered all-status gross remains 602000.
```

**Interpretation:** The visible West completed orders are 1002 and 1005, worth 40000 and 150000, for a total of 190000.

**💡 Pro tip:** Use slicers only after checking whether they apply to the intended Table or PivotTable.

**⚠️ Beginner trap:** Sorting a single column independently of the rest of a record destroys row integrity.

**🚀 Independent exercise:** Sort by revenue descending, then restore original order by OrderID and explain why the totals remain unchanged.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Sort entire Tables; distinguish filtered view from business eligibility; use SUBTOTAL for visible-row summaries.

---

### Week 7: PivotTables, PivotCharts and percentage views

**Learning objective:** Aggregate repeated records into an interactive management summary.

**Why this matters:** A 1,000-row sales log is difficult to interpret row-by-row. A PivotTable groups regions, months and products without manual SUMIFS for every combination.

**How it works:** Insert a PivotTable from Sales, set Rows=Region, Values=Sum of Revenue, and Filters=Status. Refresh when the source changes. Show Values As % of Grand Total uses the current Pivot context, not an all-time static denominator.

**Think of it this way:** A PivotTable answers 'how much by what category?' without editing each source row. The choice between % of Grand Total and % of Row Total changes the meaning.

**Walkthrough:**
1. Insert a PivotTable from Sales
2. Place Region in Rows and completed Revenue in Values
3. Use Show Values As → % of Grand Total and label it clearly

**Worked example (excel):**

```text
Pivot configuration:
Rows: Region
Values: Sum of Revenue
Filter: Status = Completed
Show Values As: % of Grand Total
```

**Expected output or verification:**

```text
Region | Revenue | % of completed total
East   | 316000  | 54.67%
West   | 190000  | 32.87%
North  | 72000   | 12.46%
```

**Interpretation:** East's share is 316000 ÷ 578000 ≈ 54.67%. The percentages should add to 100% across the three regions when the same filter applies.

**💡 Pro tip:** Check source filters and grand totals before formatting a PivotTable as a polished chart.

**⚠️ Beginner trap:** Sum of a percentage column is usually not a weighted rate; PivotTables require a correct denominator.

**🚀 Independent exercise:** Build a second PivotTable showing channel shares and explain why adding percentages directly can mislead.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Pivots aggregate by dimensions; always verify filters, denominators and refresh behavior.

---

### Week 8: Charts and visual communication

**Learning objective:** Select graphics based on decision and metric shape.

**Why this matters:** Stakeholders should identify what changed and where to act within seconds.

**How it works:** Bars compare discrete regions; a line displays time order; scatterplots explain relationships. Use direct labels, consistent units and zero-based axes for magnitude comparisons. Separate a revenue line from a percentage-margin line unless clearly dual-labelled.

**Think of it this way:** A chart is a comparison tool: bars compare categories, lines show time order, and a KPI card communicates one number.

**Walkthrough:**
1. State what decision the chart supports
2. Choose the visual based on category, trend or target
3. Check the title, units, zero baseline and accessibility contrast

**Worked example (excel):**

```text
Build two charts from completed sales:
Chart A: horizontal bars — East 316000, West 190000, North 72000
Chart B: month line — Jan 340000, Feb 238000
```

**Expected output or verification:**

```text
The region bar lengths reflect 316k > 190k > 72k.
The monthly line falls from 340k to 238k (-30%).
```

**Interpretation:** The region bar chart should visibly place East above West above North. A pie chart may hide the size difference when categories are numerous.

**💡 Pro tip:** Choose chart type from the question first, then format for accessibility and color-blind readability.

**⚠️ Beginner trap:** Truncated bar axes visually exaggerate differences; charts without denominator labels mislead.

**🚀 Independent exercise:** Redesign an unlabeled revenue chart with a descriptive title, currency units and a note that only Completed orders are counted.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Chart by purpose, not novelty; label measures and periods; avoid visual distortion.

---

### Week 9: Dashboard engineering and interaction

**Learning objective:** Design a one-page decision flow from trusted KPIs.

**Why this matters:** A dashboard needs a defined audience, a small set of critical KPIs and clear interactions rather than a wall of charts.

**How it works:** Use a header with the reporting period, KPI row, trend and breakdown visuals, and source/refresh notes. If slicers affect only some visuals, make this explicit. Keep raw data and calculations out of the presentation layer.

**Think of it this way:** A dashboard is a decision path, not a collage. Put the headline outcome first, drivers beneath it, then details for verification.

**Walkthrough:**
1. Define three top KPIs and their exact filters
2. Arrange trend and category drivers below KPI cards
3. Connect slicers and test that each interactive view reconciles

**Worked example (excel):**

```text
Suggested layout (completed orders only):
[Revenue 578000] [Profit 135000] [Orders 5] [Margin 23.36%]
[Monthly revenue trend] [Revenue by region]
[Status selector] [Refresh date / metric definitions]
```

**Expected output or verification:**

```text
Completed revenue 578000; profit 135000; gross margin 135000/578000 = 23.36%.
```

**Interpretation:** The default training view shows 578000 completed revenue, 135000 profit and 23.36% gross margin. Every slicer state should retain a meaningful title.

**💡 Pro tip:** Test every slicer combination and compare the cards against a PivotTable or SUMIFS control.

**⚠️ Beginner trap:** Dashboard KPIs may disagree if one uses all orders and another excludes returned orders.

**🚀 Independent exercise:** Write a two-sentence manager's summary of February's revenue decrease without claiming a cause.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Put decisions before visuals; preserve metric consistency; test interactions and refresh notes.

---

### Week 10: Excel portfolio capstone

**Learning objective:** Deliver an audit-friendly retail operations dashboard.

**Why this matters:** A finished analytical workbook should survive a new batch of rows and allow another analyst to reproduce every figure.

**How it works:** Build Sales as a Table, add revenue/profit calculations, write source checks, create monthly and regional Pivots, then a restrained dashboard. Record assumptions and verify month totals against the transaction data.

**Think of it this way:** Portfolio work demonstrates repeatability: another analyst should be able to replace the CSV and understand the formulas without a guided tour.

**Walkthrough:**
1. Provide a raw-data sheet, transformation notes and calculation sheet
2. Build a clean one-page dashboard with filters
3. Audit totals, broken formulas, blank keys and refresh behavior

**Worked example (excel):**

```text
Acceptance controls:
Completed Order Count: =COUNTIF(Sales[Status],"Completed")
Completed Revenue: =SUMIFS(Sales[Revenue],Sales[Status],"Completed")
Completed Profit: SUMIFS over a calculated Profit column
```

**Expected output or verification:**

```text
Expected: Orders=5; Revenue=578000; Profit=135000; Returned order excluded.
```

**Interpretation:** Acceptance checks: five Completed orders; 578000 recognized revenue; 135000 profit. Your evidence should include at least one failed-data scenario.

**💡 Pro tip:** Include a compact QA sheet with key counts, totals, source version and refresh procedure.

**⚠️ Beginner trap:** Do not submit an attractive dashboard with broken structured references or unrefreshed Pivots.

**🚀 Independent exercise:** Hand over an Excel workbook and a short QA checklist explaining what you verified and how.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Build once, refresh repeatedly, audit with an independent control.

---

## Power BI — 10 weeks

### Week 1: Power BI Desktop and business questions

**Learning objective:** Translate a retail brief into a report plan.

**Why this matters:** Power BI is valuable when stakeholders need governed measures, reusable relationships, and interactive slicing beyond a static spreadsheet.

**How it works:** Power Query ingests/transforms, the semantic model stores tables and relationships, DAX evaluates measures, and report visuals query the model. Identify fact grain, dimensions, data refresh cadence and who can access the result before creating charts.

**Think of it this way:** Power BI has four layers: source files, Power Query preparation, the semantic model, and reports. Errors introduced in an earlier layer can appear as surprising visuals later.

**Walkthrough:**
1. Write the audience's business question
2. Define one row of FactSales and its grain
3. Draft a measure list before choosing visuals

**Worked example (powerbi):**

```text
Model design brief:
FactSales: one row per order (six training rows)
Dimensions: DimDate, DimCustomer, DimProduct, DimRegion
KPI contract: completed revenue, completed profit, completed order count
```

**Expected output or verification:**

```text
Accepted source controls: six total rows; five Completed; completed revenue 578000.
```

**Interpretation:** Six raw orders include one return. The completed revenue card should show 578000, which gives the model a simple acceptance test.

**💡 Pro tip:** Write metric contracts before DAX; include units, transaction inclusion rules and rounding.

**⚠️ Beginner trap:** A visual can look correct while using implicit sums on the wrong transaction statuses.

**🚀 Independent exercise:** Sketch one executive report page with three KPIs, a month trend and regional breakdown; state the questions each answers.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Business question → grain → model → measure → visual → validation.

---

### Week 2: Power Query M and repeatable cleanup

**Learning objective:** Build a refreshable transformation pipeline.

**Why this matters:** Repeated CSV imports arrive with text-typed numbers, inconsistent columns and malformed dates. The refresh process should apply the same transformations reliably.

**How it works:** Power Query records ordered Applied Steps. Set explicit types, trim controlled dimensions, reject duplicate order IDs only after investigating source truth, and use transformations instead of manually editing a few preview rows.

**Think of it this way:** Power Query is a repeatable recipe, not a one-off cleanup. Each Applied Step transforms the table during refresh.

**Walkthrough:**
1. Import source CSV without altering it
2. Set Date, whole-number and numeric column types explicitly
3. Filter or flag statuses only where the business model requires it

**Worked example (powerbi):**

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

**Expected output or verification:**

```text
Power Query preview: 6 rows; quantity is Whole Number; unit_price is Decimal Number; order_date is Date.
```

**Interpretation:** The preview should contain six orders, including the returned one. Losing that record in preparation removes your ability to analyze returns later.

**💡 Pro tip:** Use parameters or managed connectors for production file paths, not hard-coded local paths.

**⚠️ Beginner trap:** Automatic Changed Type may misinterpret day/month locale; explicitly validate dates and currencies.

**🚀 Independent exercise:** Add a custom Revenue column in Power Query, then explain why it must not double count when DAX measures are used.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Applied Steps are repeatable; set types deliberately; preserve error evidence.

---

### Week 3: Star schema and relationships

**Learning objective:** Prevent ambiguous filters and incorrect double-counting.

**Why this matters:** Business slicers for customers, regions and time should filter a consistent fact table without causing duplicated totals.

**How it works:** Keep transaction columns in FactSales, attributes in dimensions. Make one-to-many relationships from dimension unique key to fact foreign key; default to single-direction filtering. A calendar dimension provides contiguous dates and accurate time intelligence.

**Think of it this way:** A star schema places transactions in the center and descriptive lookup tables around them. A relationship carries a filter from a dimension to a fact table.

**Walkthrough:**
1. Confirm FactSales has unique order IDs at the fact grain
2. Confirm DimCustomer has one row per customer_id
3. Create one-to-many relationships and test filter direction

**Worked example (powerbi):**

```text
DimCustomer[customer_id] (1) → (*) FactSales[customer_id]
DimDate[Date] (1) → (*) FactSales[order_date]
DimProduct[product_id] (1) → (*) FactSales[product_id]
FactSales has 6 unique order IDs in the sample.
```

**Expected output or verification:**

```text
Cross-filter Region=East and Status=Completed → revenue 316000.
```

**Interpretation:** Selecting Region=East and Status=Completed should leave only orders 1001 and 1006, producing revenue 316000.

**💡 Pro tip:** Keep relationships single direction until an explicit model requirement proves otherwise.

**⚠️ Beginner trap:** Many-to-many keys and indiscriminate bidirectional filters can cause ambiguous paths or incorrect totals.

**🚀 Independent exercise:** Count unique customer IDs in the customer dimension; explain why duplicate dimension keys are dangerous.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Facts hold events; dimensions describe them; relationship direction governs filters.

---

### Week 4: DAX measures and evaluation context

**Learning objective:** Build reusable completed-sales KPIs.

**Why this matters:** A table visual and a KPI card must use the same revenue definition while respecting each report selection.

**How it works:** Measures are evaluated at query time in filter context (slicers, rows, filters). SUMX iterates rows to compute quantity × price; CALCULATE modifies filter context. A calculated column computes per row at refresh; a measure responds to current selections.

**Think of it this way:** A DAX measure is a question answered again for the current filter context. Its value can change when a visual's region or date selection changes.

**Walkthrough:**
1. Define row revenue with SUMX over qualifying orders
2. Create a separate Profit measure using unit cost
3. Compare totals on a card versus inside a region visual

**Worked example (powerbi):**

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

**Expected output or verification:**

```text
Unfiltered slicers: Revenue=578000; Profit=135000.
Region slicer East: Revenue=316000; Profit=66000.
```

**Interpretation:** No slicer: revenue 578000 and profit 135000. East slicer: revenue 316000. The formula stays the same; the filter context changes.

**💡 Pro tip:** Prefer explicit measures with clear names; show the difference between row context and filter context when teaching SUMX.

**⚠️ Beginner trap:** SUM(FactSales[quantity]*FactSales[unit_price]) is invalid DAX; use SUMX for an expression.

**🚀 Independent exercise:** Explain why SUM(FactSales[unit_price]) does not calculate revenue when quantity varies.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Row vs filter context; CALCULATE modifies filters; iterators evaluate row expressions.

---

### Week 5: Date tables and time intelligence

**Learning objective:** Compute period changes on a valid model calendar.

**Why this matters:** Managers compare this month with previous months; string dates and missing calendar rows make time-intelligence results unreliable.

**How it works:** A marked Date table has a contiguous unique date column, related actively to fact dates. CALCULATE can shift filter contexts through date tables. Close month logic and partial periods require explicit business definitions.

**Think of it this way:** A date table is a complete calendar, not merely the dates where an order happened. Time intelligence depends on that consistent time axis.

**Walkthrough:**
1. Generate a date table with all dates in the reporting period
2. Mark it as the Date table and relate it to order_date
3. Create month-to-month measures only after validating the relationship

**Worked example (powerbi):**

```text
DimDate = CALENDAR(DATE(2026,1,1),DATE(2026,12,31))

Revenue PM :=
CALCULATE([Revenue], DATEADD(DimDate[Date],-1,MONTH))

MoM % := DIVIDE([Revenue]-[Revenue PM],[Revenue PM])
```

**Expected output or verification:**

```text
January 2026 revenue=340000. February=238000.
February MoM change=(238000-340000)/340000=-30.00%.
```

**Interpretation:** January shows 340000 and February 238000. February's decrease is 30%; distinguish monthly revenue from a cumulative total.

**💡 Pro tip:** Mark DimDate as a Date table and use the date column from it in time visuals.

**⚠️ Beginner trap:** Using FactSales[order_date] text or a noncontiguous date list defeats reliable period calculations.

**🚀 Independent exercise:** Test the Date table by showing February dates with no orders and explaining why the calendar still includes them.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Date model first; shifted filter context next; compare like-for-like complete periods.

---

### Week 6: Visualization and report UX

**Learning objective:** Build a visual hierarchy for fast decisions.

**Why this matters:** Report readers need to spot variance and drill into drivers, not decode twelve disconnected charts.

**How it works:** Use a few KPI cards, one monthly trend, one region comparison, a clear slicer zone, and short definitions. Use conditional formatting only for defined thresholds. Verify accessibility (contrast, titles, keyboard use, and alt text where supported).

**Think of it this way:** Good visual design reduces the amount of mental arithmetic a manager must do. Labels, scales, reading order and color all carry meaning.

**Walkthrough:**
1. Place headline KPIs first
2. Use a monthly line chart and sorted regional bars
3. Add purposeful titles and tooltips that define each metric

**Worked example (powerbi):**

```text
Executive page wireframe:
[Completed Revenue 578000] [Profit 135000] [Margin 23.36%]
[Monthly line: Jan 340000 → Feb 238000]
[Region bars: East 316000 | West 190000 | North 72000]
```

**Expected output or verification:**

```text
Sample output communicates a -30% month-over-month decline, not a growth claim.
```

**Interpretation:** The month trend goes from 340000 to 238000. Label it as a small training-data comparison, not proof of business deterioration.

**💡 Pro tip:** Use native Power BI visuals where possible; avoid dense ornamentation and false precision.

**⚠️ Beginner trap:** A red card is not meaningful without a documented threshold or previous-period comparator.

**🚀 Independent exercise:** Replace a crowded multi-color chart with a restrained palette and descriptive data labels, then explain your design choice.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Build page narrative from KPI → trend → drivers → action.

---

### Week 7: Slicers, drillthrough and navigation

**Learning objective:** Provide controlled exploration without losing context.

**Why this matters:** Operational managers often need to click a region, inspect customer-level drivers and return to the same overview.

**How it works:** Slicers apply filter context to connected visuals; Edit Interactions overrides defaults. Drillthrough passes categorical filters into a detail page. Bookmarks can capture data state, display state or both, so reset controls must be tested.

**Think of it this way:** A slicer changes filter context; drillthrough moves the reader from summary to details while carrying selected fields.

**Walkthrough:**
1. Create a Region slicer
2. Configure a drillthrough page filtered by Region
3. Test select, drill through and reset in a repeatable sequence

**Worked example (powerbi):**

```text
Suggested interaction test:
1. Select Region = West.
2. Revenue KPI must show 190000.
3. Drill through to customers Kola and Idris.
4. Return and Reset; KPI must return to 578000.
```

**Expected output or verification:**

```text
West revenue=190000 (orders 1002 and 1005). Reset revenue=578000.
```

**Interpretation:** When West is selected, order-level details should include 1002 and 1005 and the headline should read 190000.

**💡 Pro tip:** Test navigation on desktop and Power BI mobile layouts separately.

**⚠️ Beginner trap:** A bookmark that captures data filters unintentionally can reset slicers the user wanted to preserve.

**🚀 Independent exercise:** Add a visible Reset Filters action and confirm that returning to all regions restores 578000.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Interactions modify filter context; navigation must preserve clear user expectations.

---

### Week 8: Intermediate DAX and context control

**Learning objective:** Calculate shares and ranks with explicit denominators.

**Why this matters:** Leaders ask which region contributes the most and what a customer’s share is within selected periods.

**How it works:** CALCULATE can remove specific filter columns; ALL/REMOVEFILTERS affect denominator context. RANKX compares row measures over a defined dimension set. Keep date filters when calculating region shares if you want period-relative shares.

**Think of it this way:** CALCULATE modifies the filters used by a measure. ALL and REMOVEFILTERS can deliberately remove a filter; you must document which denominator you intend.

**Walkthrough:**
1. Start with [Revenue] in current region context
2. Build a denominator over all selected regions or all regions, deliberately
3. Divide using DIVIDE to handle a zero denominator

**Worked example (powerbi):**

```text
Region Share % :=
DIVIDE(
 [Revenue],
 CALCULATE([Revenue], REMOVEFILTERS(DimRegion[region]))
)

Region Rank :=
RANKX(ALL(DimRegion[region]),[Revenue],,DESC,Dense)
```

**Expected output or verification:**

```text
East=54.67%, West=32.87%, North=12.46% of the 578000 completed total.
Ranks: East 1, West 2, North 3.
```

**Interpretation:** East share of all completed regional revenue is 316000/578000=54.67%. ALLSELECTED and ALL are not interchangeable when slicers are present.

**💡 Pro tip:** Write denominator semantics into measure descriptions: overall, selected, or period-specific.

**⚠️ Beginner trap:** ALL on the entire fact table can remove time/status context and inflate denominators.

**🚀 Independent exercise:** Show how Region Share changes under a West-only selection for an all-regions versus selected-regions denominator.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Write explicit denominators; constrain filter removal; validate measure behavior under slicers.

---

### Week 9: Power BI Service, sharing and refresh

**Learning objective:** Deliver the report securely to its actual audience.

**Why this matters:** Publishing is not complete if users lack access, the data stays stale, or confidential rows leak between teams.

**How it works:** Publish the semantic model and report to a managed workspace. Set refresh credentials or gateway as needed, review licensing/workspace policies, configure row-level security where required, and test as a viewer. A successful refresh does not guarantee correct metrics.

**Think of it this way:** Publishing is a controlled release: permissions, refresh credentials, data sensitivity and business ownership matter as much as correct charts.

**Walkthrough:**
1. Choose the workspace and owners
2. Verify sources, schedule and refresh history
3. Test a view-only user and inspect row-level security where required

**Worked example (powerbi):**

```text
Deployment checklist:
□ Credentials and refresh schedule documented
□ Role-based access tested
□ One-page definitions and source notes included
□ Completed revenue reconciles to 578000 before publishing
□ Failed-refresh escalation owner assigned
```

**Expected output or verification:**

```text
QA acceptance: authorized viewer can open the report; sample KPI values remain consistent.
```

**Interpretation:** Refreshing should preserve the baseline KPI checks on the unchanged practice files. Permissions should not expose confidential records.

**💡 Pro tip:** Check semantic model permissions as well as report sharing; security depends on access configuration.

**⚠️ Beginner trap:** Assuming a hidden report page is a security boundary; it is not.

**🚀 Independent exercise:** Write a deployment checklist with role, refresh timestamp, owner, access test and rollback action.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Secure the model; schedule refresh; test viewer experience; preserve metric integrity.

---

### Week 10: Power BI portfolio capstone

**Learning objective:** Present a governed retail executive dashboard.

**Why this matters:** A reusable semantic model and a concise insight narrative demonstrate job-ready analytical judgment.

**How it works:** Import CSV through Power Query, model dimensions and dates, create explicit DAX measures, design overview/detail pages, test slicers, and write a short QA note. Separate demonstration values from real-world claims.

**Think of it this way:** The capstone tests analysis, modelling, usability and governance as one continuous chain. Success means a stakeholder can trace an insight to source records.

**Walkthrough:**
1. Create an explicit metric contract
2. Build and validate the star schema and measures
3. Present a dashboard, drillthrough and documented refresh/access plan

**Worked example (powerbi):**

```text
Required measures and controls:
[Revenue] = 578000
[Profit] = 135000
[Orders Completed] = 5
[Margin %] = DIVIDE([Profit],[Revenue]) = 23.36%
[February MoM %] = -30.00%
```

**Expected output or verification:**

```text
Accepted training-model totals: Revenue 578000; Profit 135000; Completed orders 5.
```

**Interpretation:** Acceptance baseline: five completed orders, 578000 revenue and 135000 profit, with returned order 1003 excluded from those totals.

**💡 Pro tip:** Submit a .pbix report (where available), screenshot, definitions, and verification worksheet.

**⚠️ Beginner trap:** A beautiful visual with misconfigured relationships is not a successful model.

**🚀 Independent exercise:** Prepare a handover containing a model diagram, measure dictionary, QA evidence and three business observations.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Source → Power Query → star model → DAX → visuals → secure deployment → QA.

---

## Python — 10 weeks

### Week 1: Python setup, files and analyst mindset

**Learning objective:** Load a dataset reproducibly and inspect its structure.

**Why this matters:** Analysts use Python when work must be repeatable, combine multiple files, or scale beyond manual clicking. The first objective is a clean, runnable environment.

**How it works:** Python executes statements in order, stores objects in variables, and imports reusable packages. Use a virtual environment, pin dependencies, keep raw files separate, and confirm the working directory before reading CSV data.

**Think of it this way:** A Python project is a repeatable recipe for data. The interpreter runs your code, pandas holds data in a DataFrame, and a file path tells Python where to find the CSV.

**Walkthrough:**
1. Create a project folder with data and scripts subfolders
2. Create an environment and install pandas only inside it
3. Run the sample from the project directory and inspect shape, columns and dtypes

**Worked example (python):**

```python
from pathlib import Path
import pandas as pd
path = Path('mastery_orders.csv')
orders = pd.read_csv(path, parse_dates=['order_date'])
print(orders.shape)
print(orders['status'].value_counts().to_dict())
```

**Expected output or verification:**

```text
(6, 12)
{'Completed': 5, 'Returned': 1}
```

**Interpretation:** A shape of (6, 12) means six rows and twelve columns—not 6 columns and 12 rows. If you see FileNotFoundError, print Path.cwd() and inspect the filename before changing code.

**💡 Pro tip:** Use python -m venv .venv and a requirements file. Do not embed credentials in notebooks.

**⚠️ Beginner trap:** FileNotFoundError often means the working directory is wrong; inspect Path.cwd() and the path first.

**🚀 Independent exercise:** Run print(orders.head(2).to_string(index=False)) and explain what each displayed column means.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Create environment → read input → inspect rows/types → validate before transforming.

---

### Week 2: Variables, types and control flow

**Learning objective:** Translate a calculation rule into correct Python logic.

**Why this matters:** Reporting calculations rely on precise numeric types and conditions; errors can turn a returned order into recognized sales.

**How it works:** int, float, str, bool and None model different values. Conditions are evaluated before a result is added. Use Decimal when exact decimal-currency arithmetic is required; floats can produce rounding surprises.

**Think of it this way:** A variable is a labeled container for a value; a condition is a checkpoint that decides whether a row contributes. Numbers and text behave differently when added.

**Walkthrough:**
1. Start with a single order and calculate quantity × unit_price
2. Add a condition to keep only Completed orders
3. Apply the same rule across a collection with a generator expression

**Worked example (python):**

```python
orders = [
 {'id': 1001, 'qty': 2, 'price': 150000, 'status':'Completed'},
 {'id': 1003, 'qty': 3, 'price': 8000, 'status':'Returned'}
]
value = sum(o['qty'] * o['price']
  for o in orders if o['status']=='Completed')
print(value)
```

**Expected output or verification:**

```text
300000 (returned order 1003 is excluded).
```

**Interpretation:** For order 1001, 2 × 150000 = 300000. Returned order 1003 is ignored. Numeric strings such as '150000' must be converted before multiplication.

**💡 Pro tip:** Prefer descriptive variable names and assertions for assumptions, e.g., assert amount >= 0.

**⚠️ Beginner trap:** Using = inside a condition is a syntax error; use == for equality. Avoid comparing text values to numbers.

**🚀 Independent exercise:** Modify the example to print both completed order count and revenue, and verify the original two-record list gives count 1.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Types determine valid operations; test conditions explicitly; keep business rules readable.

---

### Week 3: Functions, collections and reusable scripts

**Learning objective:** Write one calculation once and reuse it safely.

**Why this matters:** Analysts often repeat net-sales and margin logic across reports; functions prevent inconsistent copies.

**How it works:** A function receives parameters, evaluates a body, and returns a value. A list keeps ordered records; a dictionary maps named attributes. Type hints communicate contracts but do not validate values at runtime.

**Think of it this way:** A function turns one business rule into a reusable tool: inputs go in, calculations happen once, and an output comes back. A return value is different from printing.

**Walkthrough:**
1. Give the function meaningful parameters and a docstring
2. Check that quantity and price are valid numbers
3. Call the function on one order and test a second order independently

**Worked example (python):**

```python
def revenue(quantity: int, unit_price: float) -> float:
    if quantity < 0 or unit_price < 0:
        raise ValueError('Negative input is not expected')
    return quantity * unit_price
print(revenue(2, 150000))
print(revenue(5, 8000))
```

**Expected output or verification:**

```text
300000
40000
```

**Interpretation:** revenue(2, 150000) returns 300000 for order 1001. A unit test should catch incorrect types, negative quantities and unexpected rounding conventions.

**💡 Pro tip:** Keep business rules in tested functions; keep file input/output at the edges of the script.

**⚠️ Beginner trap:** Mutable default arguments such as def f(items=[]) can leak state between calls.

**🚀 Independent exercise:** Write a profit(quantity, unit_price, unit_cost) function and check order 1001 produces 60000.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Small functions are easier to test; keep inputs explicit and outputs predictable.

---

### Week 4: pandas selection and filtering

**Learning objective:** Filter the correct transactions before aggregation.

**Why this matters:** A pandas DataFrame brings SQL-like filtering to CSV data, allowing consistent calculations in automated pipelines.

**How it works:** A DataFrame is a two-dimensional labelled table. A Boolean mask marks eligible rows; .loc selects rows and columns by labels. Vectorised operations generally avoid slow Python-level iteration.

**Think of it this way:** A DataFrame is a spreadsheet-like table, but pandas operations explicitly create filtered views and grouped summaries. Boolean masks are row-selection rules.

**Walkthrough:**
1. Read the CSV and inspect the Status values
2. Create a completed-only DataFrame using a Boolean expression
3. Create a revenue column on a copy, then sum it

**Worked example (python):**

```python
import pandas as pd
df = pd.read_csv('mastery_orders.csv')
completed = df.loc[df['status'].eq('Completed')].copy()
completed['revenue'] = completed['quantity'] * completed['unit_price']
print(len(completed), int(completed['revenue'].sum()))
```

**Expected output or verification:**

```text
5 578000
```

**Interpretation:** Five rows satisfy status=='Completed', yielding 578000. Use .copy() before adding columns to a sliced DataFrame to avoid ambiguous chained assignments.

**💡 Pro tip:** Use .loc and .copy() when creating a filtered DataFrame to make intent explicit.

**⚠️ Beginner trap:** Do not use `and` between pandas Series masks; use `&` with parentheses: (a) & (b).

**🚀 Independent exercise:** Filter East completed orders, display order_id and revenue, and check the total is 316000.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Filter using Boolean masks; vectorize arithmetic; validate row counts.

---

### Week 5: Cleaning, nulls, typing and joins

**Learning objective:** Protect an analytics pipeline against faulty imports.

**Why this matters:** Noisy files often carry blank customer IDs, mixed formats and duplicate keys. Failures should be reported, not silently discarded.

**How it works:** Use .isna() for NULL checks, .duplicated() for repeated keys and .merge(validate=...) to enforce join cardinality. Convert types deliberately with pd.to_numeric and pd.to_datetime; coerce errors only when you keep an exception count.

**Think of it this way:** Data cleaning is a sequence of quality checks, not a command to delete missing rows. Missing values, wrong types and duplicate keys each need different treatment.

**Walkthrough:**
1. Check dtypes, missing counts and duplicate order IDs
2. Convert date and numeric fields using explicit rules
3. Validate join cardinality before merging customers with orders

**Worked example (python):**

```python
import pandas as pd
df = pd.read_csv('mastery_orders.csv')
print(int(df['order_id'].duplicated().sum()))
print(int(df['customer_id'].isna().sum()))
assert df['order_id'].is_unique
assert df['quantity'].ge(0).all()
```

**Expected output or verification:**

```text
0 duplicate OrderIDs
0 missing customer IDs
Assertions pass for the training file.
```

**Interpretation:** The training data has zero duplicate order IDs. An unchecked many-to-many merge can still multiply order rows and inflate reported revenue.

**💡 Pro tip:** Check duplicates and missing IDs both before and after merges; use validate="many_to_one" for fact→dimension lookups.

**⚠️ Beginner trap:** A merge on duplicate lookup keys can multiply transaction rows and inflate sales.

**🚀 Independent exercise:** Create a validation function that raises ValueError if duplicate order IDs are present; try it on a deliberately duplicated row.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Validate keys, types and joins; produce an exception report alongside cleaned data.

---

### Week 6: groupby, pivot and business KPI reporting

**Learning objective:** Generate a clear, reproducible regional summary.

**Why this matters:** An automated weekly report needs the same measure definitions as the SQL and Power BI versions.

**How it works:** groupby creates category partitions and reduces each to aggregations. Avoid adding percentages as if they were additive measures; compute a ratio from aggregated numerator and denominator.

**Think of it this way:** groupby splits data into categories, computes a summary for each category, and combines the results. It is Python's equivalent of an SQL GROUP BY or an Excel PivotTable.

**Walkthrough:**
1. Filter to Completed first
2. Calculate row revenue and profit correctly
3. Group by region and aggregate to a labeled output table

**Worked example (python):**

```python
import pandas as pd
df = pd.read_csv('mastery_orders.csv')
x = df.loc[df.status.eq('Completed')].copy()
x['revenue'] = x.quantity * x.unit_price
print(x.groupby('region')['revenue'].sum().sort_values(ascending=False).to_dict())
```

**Expected output or verification:**

```text
{'East': 316000, 'West': 190000, 'North': 72000}
```

**Interpretation:** Expected revenue: East 316000, West 190000, North 72000. The sum of groups must reconcile to overall completed revenue 578000.

**💡 Pro tip:** Use named aggregation and unit-tested metric functions in production reporting code.

**⚠️ Beginner trap:** groupby drops NULL grouping keys by default in pandas unless dropna=False is specified.

**🚀 Independent exercise:** Return both revenue and profit by region, sort from highest revenue to lowest, and verify the profit total is 135000.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Filter correctly; group at the business grain; reconcile grouped sums.

---

### Week 7: Statistics and uncertainty

**Learning objective:** Interpret metrics without making unsupported causal claims.

**Why this matters:** Executives often ask whether an apparent change reflects a durable pattern or random variation; statistics clarify what data can and cannot establish.

**How it works:** Mean is sum/count, median is the middle observation after sorting, standard deviation measures variation, and sampling affects uncertainty. Correlation describes association, not proof of causation. Six fabricated rows are useful for learning syntax, not inference.

**Think of it this way:** Statistics summarizes variation; it does not automatically prove causation. Mean uses all values, median is the middle ordered value, and uncertainty limits what you can claim.

**Walkthrough:**
1. Inspect distribution and sample size
2. Compute both mean and median instead of relying on one average
3. Say explicitly whether the data is a sample or a complete population

**Worked example (python):**

```python
values = [300000,40000,72000,150000,16000]
import statistics as stats
print(stats.mean(values))
print(stats.median(values))
print(min(values), max(values))
```

**Expected output or verification:**

```text
115600
72000
16000 300000
```

**Interpretation:** Five completed orders average 115600 each in revenue. One laptop order worth 300000 makes the distribution uneven; the mean alone can hide that skew.

**💡 Pro tip:** Communicate sample size, metric definition and any selection bias alongside a summary.

**⚠️ Beginner trap:** Using the mean as a typical order is misleading when there is a large 300000 order; compare median.

**🚀 Independent exercise:** Find the median completed-order revenue and explain which value better represents a typical small order.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Describe distributions and limitations; avoid unsupported causal or population claims.

---

### Week 8: NumPy vectors and matrix intuition

**Learning objective:** Recognize vectorized calculations and matrix dimensions.

**Why this matters:** Forecasting and machine learning depend on efficient numeric arrays; matrix dimensions explain common shape errors.

**How it works:** A vector is an ordered numeric array; a matrix has rows and columns. Elementwise multiplication pairs corresponding positions; dot products sum pairwise products. A feature matrix X commonly has rows=observations and columns=features.

**Think of it this way:** NumPy performs the same operation over many numbers at once. A vector is a one-dimensional array; a matrix is a two-dimensional grid with row and column counts.

**Walkthrough:**
1. Build matching quantity and price arrays
2. Multiply elementwise to obtain order revenues
3. Check array shapes before matrix multiplication or broadcasting

**Worked example (python):**

```python
import numpy as np
qty = np.array([2,5,4])
price = np.array([150000,8000,18000])
print((qty*price).tolist())
print(int(qty @ price))
print(np.column_stack([qty,price]).shape)
```

**Expected output or verification:**

```text
[300000, 40000, 72000]
412000
(3, 2)
```

**Interpretation:** Quantities [2,5,4] times prices [150000,8000,18000] yield [300000,40000,72000]. Shape mismatches are dimension errors, not rounding errors.

**💡 Pro tip:** Vectorise calculations where possible, but confirm array alignment and units before trusting speed gains.

**⚠️ Beginner trap:** Broadcasting may silently stretch arrays; use shape checks instead of relying on assumptions.

**🚀 Independent exercise:** Create a parallel cost array and compute unit profits and total profit for the same three orders.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Array shape matters; multiply elementwise for row totals; dot product sums them.

---

### Week 9: Time series, charts and testable forecasts

**Learning objective:** Create a baseline with transparent limitations.

**Why this matters:** Forecasting decisions require a benchmark and careful time-aware validation, rather than presenting a clever model as automatically accurate.

**How it works:** Group by chronological month, create a baseline such as previous-month value, and compare predicted vs actual on later unseen periods. Data leakage occurs when future observations enter training features or preprocessing.

**Think of it this way:** Time-series analysis respects order and time. A forecasting method must be tested on later periods; evaluating on the same points used for fitting makes error look too small.

**Walkthrough:**
1. Convert order_date to a date type
2. Group Completed revenue into monthly periods
3. Build a naive baseline before discussing more complex forecasting models

**Worked example (python):**

```python
import pandas as pd
df = pd.read_csv('mastery_orders.csv',parse_dates=['order_date'])
x = df[df.status.eq('Completed')].copy()
x['revenue'] = x.quantity*x.unit_price
monthly = x.groupby(x.order_date.dt.to_period('M'))['revenue'].sum()
print(monthly.to_dict())
```

**Expected output or verification:**

```text
{Period('2026-01', 'M'): 340000, Period('2026-02', 'M'): 238000}
```

**Interpretation:** January totals 340000 and February 238000. Two months of invented data are insufficient to establish seasonality or forecast quality.

**💡 Pro tip:** For a real forecast, gather many more periods, define a holdout window and compare against a naive baseline.

**⚠️ Beginner trap:** Two months cannot support a reliable seasonal forecast; never advertise predictive accuracy from this demo.

**🚀 Independent exercise:** Create a monthly bar chart with values labeled and add a note explaining the data limitation.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Time-aware splits prevent leakage; compare with a baseline; disclose uncertainty.

---

### Week 10: Python analytics capstone

**Learning objective:** Package a repeatable, independently verified report.

**Why this matters:** Professional scripts deliver a consistent output and clear failure messages when inputs change.

**How it works:** Use functions for load, validate, transform, aggregate and export. Include small unit tests, fixed dependency versions, a README and documented schema. Reconcile totals against the SQL workbook control.

**Think of it this way:** A script is reproducible when someone can run it on the supplied CSV and obtain the documented result in a clean environment.

**Walkthrough:**
1. Write functions for load, validate, transform and report
2. Add assertions for schema, duplicate keys and totals
3. Export the regional KPI table and document how to rerun it

**Worked example (python):**

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

**Expected output or verification:**

```text
{'revenue': 316000, 'profit': 66000}
```

**Interpretation:** East revenue is 316000 and profit 66000; all completed regions must total 578000 and 135000. Saved notebook cells are not enough—rerun from a fresh process.

**💡 Pro tip:** Add automated test cases for empty data, missing required fields and duplicate identifiers.

**⚠️ Beginner trap:** Notebook outputs saved after a different execution order are not proof of reproducibility; run from a clean kernel.

**🚀 Independent exercise:** Deliver a .py file, requirements.txt, README and report CSV, with one deliberately failing test case.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Package source + tests + readme + validated outputs, not only notebook screenshots.

---

## AI Data Analytics — 10 weeks

### Week 1: AI literacy, analytics tasks and limits

**Learning objective:** Separate language generation from verifiable computation.

**Why this matters:** Analysts can use AI to outline hypotheses and draft code quickly, but confident prose is not evidence that a number is correct.

**How it works:** Large language models predict plausible next tokens. External tools or an actual dataset engine are required for reproducible computation; prompt instructions alone do not grant access to the data. Distinguish summarization, retrieval, predictive modelling and deterministic SQL.

**Think of it this way:** An AI assistant predicts useful language, not the truth of a calculation. Think of it as a drafting partner whose output needs a separate evidence trail.

**Walkthrough:**
1. State the analytics task and available data
2. Ask the assistant to describe a reproducible method
3. Run that method in Excel, SQL or Python before trusting the number

**Worked example (ai):**

```text
Prompt: 'Plan an analysis of mastery_orders.csv.
Identify the target KPI, required columns, risky assumptions,
and validation steps. Do not invent sales totals.'
```

**Expected output or verification:**

```text
Expected response outline: business question → columns → inclusion rule → reproducible calculation → validation. Verified completed revenue = 578000 by separate code, not by prose alone.
```

**Interpretation:** 578000 completed revenue is verified by the supplied data and scripts; it is not verified merely because an AI response mentions it.

**💡 Pro tip:** Use AI to propose a workflow; execute critical calculations in SQL, Excel, Python or Power BI.

**⚠️ Beginner trap:** An LLM that claims it "checked the data" without actually using a tool has not verified it.

**🚀 Independent exercise:** Write one prompt asking for an analysis plan and another asking for a calculated answer; label which claims need execution.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** AI drafts; engines calculate; analysts validate.

---

### Week 2: Prompt engineering as a mini specification

**Learning objective:** Ask for testable and bounded analysis outputs.

**Why this matters:** A vague prompt such as "analyse my sales" produces generic prose, whereas a specification defines the business question and acceptance tests.

**How it works:** An effective prompt contains role, objective, input schema, inclusion/exclusion rules, output format and independent checks. Use small few-shot examples for complicated labelling; iteration should reduce ambiguity, not replace testing.

**Think of it this way:** A good prompt functions like a mini requirements document. Without table names, business definitions and output constraints, the assistant must guess.

**Walkthrough:**
1. Give the exact schema and grain
2. Define which statuses count as sales
3. Request the output format plus independent tests and edge cases

**Worked example (ai):**

```text
Prompt: 'Act as a retail analyst. Given fields order_id,
status, quantity, unit_price and region, draft SQLite SQL
that sums quantity*unit_price only when status=Completed.
Return SQL, expected columns, and a reconciliation query.
Use no invented columns or values.'
```

**Expected output or verification:**

```text
Expected SQL structure: WHERE status='Completed'; SUM(quantity*unit_price); GROUP BY region. Verified groups: East 316000, West 190000, North 72000.
```

**Interpretation:** A correct SQL draft filters Completed before grouping by region. AI-generated code that invents nonexistent columns must be rejected rather than silently adapted.

**💡 Pro tip:** Treat acceptance criteria like software tests: expected columns, allowed tables and result reconciliation.

**⚠️ Beginner trap:** Without specifying SQL dialect, AI may suggest unsupported DATE_TRUNC or TOP syntax for SQLite.

**🚀 Independent exercise:** Rewrite a vague 'show me sales' prompt into a testable specification for regional completed revenue.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Specify input + rules + expected format + verification; iterate on reproducible errors.

---

### Week 3: Privacy, safety and responsible AI

**Learning objective:** Choose what can be shared with an AI service.

**Why this matters:** Customers, employee records and proprietary transactions may be confidential; disclosure must follow organizational policy and law.

**How it works:** Classify data by sensitivity, mask or aggregate identifiers, review provider retention/settings and workspace access rules, and keep confidential datasets in approved environments. Human review is needed for bias, erroneous inferences and disclosure risk.

**Think of it this way:** Data minimization means sharing only what is necessary. Synthetic practice records are safe for exercises; real people, credentials or protected records require authorization and controls.

**Walkthrough:**
1. Classify each field by sensitivity
2. Replace personal identifiers with approved aggregates when possible
3. Review vendor retention, sharing permissions and organization policy

**Worked example (ai):**

```text
Safe analysis handoff (synthetic):
region | completed_orders | revenue
East   | 2                | 316000
West   | 2                | 190000
North  | 1                | 72000
No phone numbers, customer emails or credentials included.
```

**Expected output or verification:**

```text
Expected: an AI-ready aggregated summary with no personal identifiers. Sample values are fictional training data.
```

**Interpretation:** The fictional dataset can be used for demonstrations; a real customer list or patient record cannot automatically be uploaded to external AI tools.

**💡 Pro tip:** Use the minimum data needed; for sensitive material require explicitly approved company tools and data handling.

**⚠️ Beginner trap:** Replacing names with IDs alone may not anonymize rare or linkable personal records.

**🚀 Independent exercise:** Produce a safe three-column aggregate (region, completed_orders, revenue) without customer names.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Minimize data; obey policies; verify bias and security risks before sharing.

---

### Week 4: AI-supported Excel and Power Query

**Learning objective:** Generate formulas while validating workbook behavior.

**Why this matters:** AI can explain formula options, but a workbook still must use supported functions and the correct source table.

**How it works:** Provide column names and Excel version. Ask for a formula, explanation and edge-case tests. Apply it in Excel and compare a manual check; do not accept a generated formula merely because the syntax looks plausible.

**Think of it this way:** AI can suggest Excel formulas, but the spreadsheet engine and business rules still determine the answer. A formula can be syntactically correct while counting returns.

**Walkthrough:**
1. Specify Excel version and actual Table column names
2. Request the formula with an explanation for each part
3. Test returned-order and completed-order scenarios

**Worked example (ai):**

```text
Prompt: 'For Excel 2016 Table Sales with Quantity, Price,
Status and Region, give a formula for completed East revenue
and explain each criterion. Avoid functions newer than 2016.'

Expected: =SUMIFS(Sales[Revenue],Sales[Status],"Completed",Sales[Region],"East")
```

**Expected output or verification:**

```text
When Sales[Revenue]=[@Quantity]*[@Price], expected East completed revenue=316000.
```

**Interpretation:** East completed revenue must equal 316000. XLOOKUP is not available in all Excel 2016 builds; ask for compatible alternatives where needed.

**💡 Pro tip:** Provide the actual Excel version; request a legacy-compatible option and test 0-row scenarios.

**⚠️ Beginner trap:** XLOOKUP is not available in Excel 2016; suggest INDEX/MATCH or VLOOKUP exact-match.

**🚀 Independent exercise:** Ask AI to propose a SUMIFS formula, then audit it against the order IDs 1001 and 1006.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** AI proposes formulas; your workbook and independent checks establish correctness.

---

### Week 5: AI-assisted SQL with schema-grounded output

**Learning objective:** Prevent plausible but invalid queries.

**Why this matters:** Text generators may guess joins, columns or dialect-specific functions. Giving a schema changes the exercise from creative writing to constrained code review.

**How it works:** Attach an explicit CREATE TABLE schema or allowed-column list, request a read-only query, and specify SQLite. Review filters, NULL logic and group grain; execute it against the training database and inspect results.

**Think of it this way:** Schema-grounded prompting prevents the assistant from making up a customers table or fictional fields. SQL must match the actual database dialect.

**Walkthrough:**
1. Supply table DDL and a sample of representative values
2. Ask for a read-only SQLite query
3. Execute it, inspect intermediate rows and reconcile totals

**Worked example (ai):**

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

**Expected output or verification:**

```text
Expected months: 2026-01 = 340000; 2026-02 = 238000.
```

**Interpretation:** The validated monthly result is January 340000 and February 238000. Any query returning a third month has used a different filter or input.

**💡 Pro tip:** Ask AI to state its assumed grain, SQL dialect and every join key before producing complex queries.

**⚠️ Beginner trap:** A tool-generated query can run successfully but still count returned orders; execution success is not business correctness.

**🚀 Independent exercise:** Request a query that detects duplicate order IDs and compare its expected result to the included SQLite file.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Ground prompts in schema; run generated code; reconcile independently.

---

### Week 6: AI-assisted Python and debugging

**Learning objective:** Use AI to draft code and explain failures, not hide them.

**Why this matters:** Python automation is valuable but copying code blindly creates silent errors and brittle scripts.

**How it works:** Give the traceback, minimal safe example and package versions. Ask for the smallest fix and a test. Prefer deterministic pandas checks that assert row counts and financial totals.

**Think of it this way:** AI is often most helpful at explaining a traceable error message. It should not remove validation checks or change a metric definition just to make code run.

**Walkthrough:**
1. Provide a minimal failing code snippet and traceback
2. Ask for the root cause and smallest safe fix
3. Run the fixed version and compare against a known expected result

**Worked example (ai):**

```text
Prompt: 'Explain this pandas bug and fix it: 
mask = (df.status == "Completed") and (df.region == "East")
Return corrected code and expected number of rows.'

mask = (df.status == 'Completed') & (df.region == 'East')
print(df.loc[mask].shape[0])
```

**Expected output or verification:**

```text
Expected row count = 2. East completed revenue = 316000.
```

**Interpretation:** East has two completed order rows. A common pandas error is using Python 'and' rather than '&' between Boolean Series conditions.

**💡 Pro tip:** Request unit tests and explainability for any generated transformation; diff edits before running.

**⚠️ Beginner trap:** Python `and` cannot combine pandas Series masks; use `&` with parentheses.

**🚀 Independent exercise:** Create an intentionally broken pandas filter and request a diagnosis that explains why parentheses are needed.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Debug with minimal examples; prefer smallest fixes; add regression tests.

---

### Week 7: AI-assisted DAX and semantic models

**Learning objective:** Check evaluation context before trusting DAX.

**Why this matters:** AI can suggest DAX formulas that look correct but change when slicers filter the model.

**How it works:** Provide the fact grain, table names, relationships, measure definitions and expected filter behavior. Test measures in card and matrix visuals; differentiate row context from filter context and assess CALCULATE filter transitions.

**Think of it this way:** DAX questions depend on relationships and current filter context, which are often invisible in a pasted formula. Prompting without model metadata can produce plausible wrong answers.

**Walkthrough:**
1. Describe model tables and relationship directions
2. Supply the exact measure and slicer situation
3. Require a card-versus-region validation case

**Worked example (ai):**

```text
Prompt: 'FactSales has quantity, unit_price, status, region.
Write a DAX measure for Completed revenue that responds
to Region slicers. Use SUMX and CALCULATE; explain context.'

Revenue := CALCULATE(SUMX(FactSales,
 FactSales[quantity]*FactSales[unit_price]),
 FactSales[status] = "Completed")
```

**Expected output or verification:**

```text
All regions = 578000; Region East = 316000; West = 190000.
```

**Interpretation:** [Revenue] should show 578000 overall and 316000 for East. A formula using SUM(unit_price) ignores quantity and fails even if it parses.

**💡 Pro tip:** Ask for filter-context tests, not only a measure. Validate a grand total and at least two slicer combinations.

**⚠️ Beginner trap:** Removing all fact filters to fix a single result may erase legitimate date/region selections.

**🚀 Independent exercise:** Ask AI to review one CALCULATE denominator choice and design a slicer test that would expose an error.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Specify model context; explain filters; test measures under actual interactions.

---

### Week 8: Statistical reasoning, ML and forecast critique

**Learning objective:** Distinguish credible predictive evidence from seductive narratives.

**Why this matters:** Forecasts are high-impact because decision makers may act on them; AI-generated accuracy claims require a real test design.

**How it works:** Check baseline methods, time-split validation, leakage, sample size, evaluation metric and confidence intervals. A model needs sufficient data for seasonality; two training months only demonstrate calculation.

**Think of it this way:** Predictive claims need out-of-sample evidence. An attractive chart or confident paragraph cannot compensate for data leakage or a tiny sample.

**Walkthrough:**
1. Establish a naive baseline
2. Separate training from later test observations
3. Review suitable metrics and intervals without claiming causality

**Worked example (ai):**

```text
Evaluation brief:
Observed January completed revenue: 340000
Observed February completed revenue: 238000
Naive February forecast (use Jan): 340000
Absolute error: |238000-340000| = 102000
```

**Expected output or verification:**

```text
This demonstrates an error computation, not valid forecasting performance or expected future sales.
```

**Interpretation:** The six-order training sample is for explaining workflow, not a credible production forecasting experiment. MAE is the average absolute distance between predicted and actual values.

**💡 Pro tip:** Ask AI to find leakage risks and propose a baseline before recommending a complex model.

**⚠️ Beginner trap:** Mixing future target data into training features creates deceptively optimistic accuracy.

**🚀 Independent exercise:** Ask the assistant to critique a forecast trained and tested on the same two monthly observations.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Baseline first; chronological holdout; bias/leakage review; uncertainty disclosures.

---

### Week 9: Automation, agents and human approval

**Learning objective:** Design repeatable workflows with safeguards.

**Why this matters:** Scheduled reporting can save analyst hours, but an automated agent must not silently overwrite records or send incorrect figures.

**How it works:** A safe flow has trigger → ingest → validate → calculate → compare controls → approval → publish → monitor. Use least-privilege access, idempotent processing, logs and retries; require human approval for sensitive external actions.

**Think of it this way:** An automated agent can draft, transform and route work, but approvals must remain explicit where outputs affect money, records or external systems.

**Walkthrough:**
1. Validate source schema before every run
2. Log data version, prompts, outputs and control totals
3. Route anomalies to a human before publication or a write action

**Worked example (ai):**

```text
Workflow pseudo-logic:
if duplicate_order_ids > 0: BLOCK
elif completed_revenue != reconciled_total: BLOCK
else: CREATE_DRAFT_REPORT
HUMAN_REVIEW → PUBLISH_TO_AUTHORISED_AUDIENCE
```

**Expected output or verification:**

```text
Expected controls on training data: 0 duplicate IDs; completed revenue 578000; workflow may advance to draft review.
```

**Interpretation:** If completed revenue changes unexpectedly from 578000 on the unchanged sample, the workflow should stop and request investigation rather than publish.

**💡 Pro tip:** Log source version, execution timestamp, check status and reviewer approval; alert when assumptions break.

**⚠️ Beginner trap:** Automatic publication without permission, source validation or rollback creates avoidable operational risk.

**🚀 Independent exercise:** Design an approval gate that rejects missing columns, duplicate IDs or unverified totals.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Automate deterministic checks; gate risky actions; retain logs and rollback options.

---

### Week 10: Governed AI analytics capstone

**Learning objective:** Deliver an independently checked AI-assisted analysis.

**Why this matters:** A credible AI portfolio submission shows how tools accelerated work without replacing analytical responsibility.

**How it works:** Define a real question, sanitize inputs, draft SQL/Excel/Python/DAX with AI, execute in an appropriate engine, reconcile to a gold control, and document the precise role AI played. Record limitations and a reviewer sign-off.

**Think of it this way:** A responsible AI analytics project makes a clear distinction between assistance, computation and human judgment. Its audit trail matters as much as the final slide.

**Walkthrough:**
1. Record prompts and AI-generated drafts
2. Execute trusted calculations and reconcile figures
3. Document who approved the narrative and any deployment decision

**Worked example (ai):**

```text
Deliverable evidence:
1. Business question and synthetic input dictionary
2. One clearly bounded AI prompt and its draft output
3. Independently executed calculation + error checks
4. Executive insight + privacy review
5. Reproduction instructions and AI-use declaration
```

**Expected output or verification:**

```text
Accepted sample controls: Completed orders 5, revenue 578000, profit 135000. All claims must match the executed training dataset.
```

**Interpretation:** Accepted baseline is five completed orders, revenue 578000 and profit 135000. AI-generated business claims must be checked against those executed facts.

**💡 Pro tip:** Create a side-by-side AI suggestion vs tested result table; highlight corrections openly.

**⚠️ Beginner trap:** Concealing invented figures, sensitive inputs or unreviewed code invalidates the demonstration.

**🚀 Independent exercise:** Prepare an evidence pack with one prompt, corrected script, test result, privacy note and executive summary.

**Solved checks:**
1. question  
   **Solution:** solution
2. question  
   **Solution:** solution

**📌 Takeaways:** Prompt → draft → verify → document → communicate, under explicit privacy controls.

---
