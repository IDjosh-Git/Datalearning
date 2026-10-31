# Verified course dataset controls and observable assessment rubric (v88)

## Dataset boundaries
- `kiosk_week.csv`: five fictional kiosk days, prices/costs in Nigerian naira (₦). The `kiosk_worked_controls_v88.csv` is independently calculated from those 5 CSV rows.
- `mastery_orders.csv`: six fictional orders, 12 original columns; hypothetical currency units (not actual customer data). The `mastery_orders_validation_v88.csv` contains derived revenue/profit fields, calculated from the original rows and **does not replace the source**.
- `mastery_orders.sqlite`: teaching SQL database with `orders` and `customers`; customer segments are only in `customers`.
- `retail_orders.csv` and `retail_practice.sqlite`: larger 360-row practice environment; its field names, discounts and outputs are **not interchangeable** with the six-order teaching example.
- Practice Arena has its own challenge datasets and local execution; matching a curriculum topic does not mean the same source tables or answers are used.

## Verified six-order checks
- Source rows = **6**; unique `order_id` = **6**; Completed = **5**; Returned = **1**.
- Raw gross amount including returned rows = **602,000**. Completed gross revenue = **578,000** (excluding the returned 24,000); completed gross profit before overhead = **135,000**. Not net sales or net profit.
- Completed orders by region: East **316,000** (2), West **190,000** (2), North **72,000** (1). Regions reconcile to **578,000**.
- Completed order months: January 2026 **340,000**; February 2026 **238,000**; February change from January = **−30%**. Two synthetic months cannot support seasonal inference.
- Completed order revenue values (5): 300,000; 40,000; 72,000; 150,000; 16,000. Mean **115,600**, median **72,000**.
- Example gross margin = **135000 / 578000 = 23.3564%** (23.36% rounded). Do not call gross profit net profit.
- SQL Module 3 query returns exactly three grouped rows; 578,000 grand total belongs to a separate validation query. SQL Module 7 returns `order_date` as well as customer, order ID and rank.

## Verified kiosk checks (calculated from `kiosk_week.csv`)
- Monday: revenue ₦36,000; variable cost ₦21,600; daily fixed ₦6,000; profit ₦8,400.
- Tuesday: revenue ₦27,000; variable cost ₦16,200; daily fixed ₦6,000; profit ₦4,800.
- Wednesday: revenue ₦45,000; variable cost ₦27,000; daily fixed ₦6,000; profit ₦12,000.
- Thursday: revenue ₦30,000; variable cost ₦18,000; daily fixed ₦6,000; profit ₦6,000.
- Friday: revenue ₦48,000; variable cost ₦28,800; daily fixed ₦6,000; profit ₦13,200.
- Total five-day revenue **₦186,000**; five-day profit after recorded daily fixed costs **₦44,400**. The maximum daily profit occurs on **Friday**.

## Assessment: common 5-part rubric (25 possible self-review points)
Use 0–5 for each dimension. **0** = absent, **1** = attempted but incorrect or undocumented, **3** = a working submission with some gaps, **5** = reproduced, independently checked and explained. Scores 2 and 4 represent intermediate evidence. This is a learner self-review, **not** an automated grade, certificate, or instructor assessment.
1. **Scope and definitions**: States stakeholder question, source grain, date range, included/excluded statuses and metric meanings.
2. **Source handling**: References actual files; documents field types, keys, missingness, duplicates and any transformations.
3. **Correctness**: Reproduces control totals on the supplied data and describes at least one independent check / edge case.
4. **Reproducibility and access**: Another learner can follow setup steps, run calculations or inspect workbook/model and identify software constraints.
5. **Communication and responsibility**: Explains one decision, caveats, privacy/AI restrictions and why tiny synthetic data cannot support causal or population claims.

**Suggested evidence:** original CSV unchanged, analysis file/code/report, screenshots or tables of tested results, validation log, one-page stakeholder summary and a short reflection. In the AI course add a prompt log and independent manual baseline. A self-reviewed submission is not proof of instructor assessment, credential eligibility or employment readiness.

## Software scope
- **SQL**: Samples are written for SQLite, and SQLite window functions require SQLite 3.25+. Its date functions and `LIMIT` differ from SQL Server, PostgreSQL and other dialects. Execute examples on the supplied SQLite file, not on the Arena challenge schema.
- **Excel**: `XLOOKUP` is unavailable in Excel 2016/2019. Use `INDEX`/`MATCH` or a newer Excel release. Optional features vary by subscription and device; the browser Arena is a restricted formula evaluator, not full Excel.
- **Power BI**: Power BI Desktop requires supported Windows. A report is a multi-page collection of visuals in a `.pbix`; Power BI Service dashboards are different, single-page collections of pinned tiles. Publishing/sharing may require Pro, PPU or organizational capacity access. DAX examples require the described star schema, matching data types and filter context; they are not independently executable without Power BI.
- **Python**: Local scripts use relative paths and a working directory containing `mastery_orders.csv`; dependencies include pandas and NumPy where specified. Distinguish notebooks from scripts; a clean virtual environment helps reproduce outcomes.
- **AI**: Generative outputs are suggestions until checked by a local tool or independently supported source. Use fictional data. AI subscriptions, models and free tiers vary; a manual alternative is sufficient for course completion.

## Official feature documentation checked during curriculum revision (October 2026)
- Excel XLOOKUP compatibility: https://support.microsoft.com/en-us/excel/functions/xlookup-function (not available in Excel 2016/2019).
- Power BI Desktop minimum requirements: https://learn.microsoft.com/en-ie/power-bi/fundamentals/desktop-get-the-desktop (Windows).
- Power BI Service license-dependent sharing: https://learn.microsoft.com/en-us/power-bi/fundamentals/end-user-license
