# Worked solutions and independent verification checks

Use these with the complete Excel, SQL, Power BI and AI Integration lessons. They are **fictional training datasets**. Attempt each task before comparing your answer; different implementations can be valid if they use identical definitions.

## The ground truth for the supplied files

| File | Observation grain | Records |
|---|---|---:|
| `retail_orders.csv` | One row per order_id in this synthetic exercise | 360 |
| `retail_customers.csv` | One row per customer_id | 50 |
| `retail_targets.csv` | One row per month_start and region | 48 |

Order status counts: **Completed 306**, **Returned 27**, **Cancelled 27**.

**Course net revenue definition:** `SUM(quantity × unit_price × (1 − discount_pct))` for rows where `status = 'Completed'`. This does **not** attempt to model refunded revenue, shipping, VAT, financing fees or overhead, because those are outside the supplied data and metric definition.

### Verified checkpoints
- Full-year completed-order net revenue, 2025: **₦14,248,255**.
- January completed-order net revenue: **₦1,149,005**.
- February completed-order net revenue: **₦1,522,910**.
- March completed-order net revenue: **₦1,376,500**.
- A sample completed order of 4 units at ₦5,000 and a 10% discount contributes ₦18,000. The same order cancelled contributes ₦0.

## Excel

Import the CSV as an Excel Table named `Orders`. Add a new column `net_revenue`:

```excel
=IF([@status]="Completed",[@quantity]*[@unit_price]*(1-[@discount_pct]),0)
```

Then calculate `=SUM(Orders[net_revenue])`. If you see a different figure, check the `discount_pct` field is stored as 0.10 (not 10) and that rows with other statuses are excluded. Confirm 360 source rows, and check all date, quantity and price types. Regional Excel installations may require semicolons rather than commas in formulas.

## SQL — SQLite dialect

```sql
SELECT status, COUNT(*) AS rows_by_status
FROM orders GROUP BY status ORDER BY status;

SELECT ROUND(SUM(quantity * unit_price * (1 - discount_pct)), 2) AS net_revenue
FROM orders
WHERE status = 'Completed';

SELECT substr(order_date,1,7) AS sales_month,
       ROUND(SUM(quantity * unit_price * (1 - discount_pct)),2) AS net_revenue
FROM orders
WHERE status = 'Completed'
GROUP BY substr(order_date,1,7)
ORDER BY sales_month;

-- Detect order multiplication when joining a customer dimension:
SELECT COUNT(*) AS joined_rows
FROM orders o LEFT JOIN customers c ON c.customer_id = o.customer_id;

-- Test unique monthly target keys:
SELECT month_start, region, COUNT(*) AS key_count
FROM targets
GROUP BY month_start,region HAVING COUNT(*) > 1;
```

The first two revenue queries can also be reproduced with a simple Excel PivotTable and a Python grouped aggregation. The joined row count should remain 360 for this synthetic many-to-one customer relationship.

## Python / pandas

```python
from pathlib import Path
import pandas as pd
base = Path(__file__).parent
orders = pd.read_csv(base / 'retail_orders.csv', parse_dates=['order_date'])
assert len(orders) == 360
assert orders['order_id'].is_unique
assert orders['status'].value_counts().to_dict() == {
    'Completed': 306, 'Returned': 27, 'Cancelled': 27
}
completed = orders.loc[orders['status'].eq('Completed')].copy()
completed['net_revenue'] = completed['quantity'] * completed['unit_price'] * (1 - completed['discount_pct'])
assert round(completed['net_revenue'].sum(), 2) == 14248255.0
print(completed.groupby(completed['order_date'].dt.strftime('%Y-%m'))['net_revenue'].sum().round(2))
```

Use a standard Python environment with pandas installed. Place the script in `downloads/` beside the CSV, or adjust the path. Ask AI to explain lines you do not understand, but verify with tests.

## Power BI / DAX

With the table name `Orders`, create:

```dax
Net Revenue =
SUMX(
    FILTER(Orders, Orders[status] = "Completed"),
    Orders[quantity] * Orders[unit_price] * (1 - Orders[discount_pct])
)
```

Create a proper Date dimension for monthly calculations. A slicer should change a measure's context; with all filters cleared, the annual Net Revenue must equal **₦14,248,255**. Do not connect `targets` to transaction rows on `region` alone because the region-month target repeats across many orders.

## Evidence template for every course

1. **Business question:** specific decision and audience.
2. **Data dictionary:** source, grain, fields, types and definitions.
3. **Method:** executed formulas, SQL, M, Python or DAX—not merely AI output.
4. **Checks:** row counts, status splits, annual total, monthly sample and join cardinality.
5. **Results:** chart(s), written findings and caveats.
6. **Reflection:** mistakes corrected, assistance used, time/quality comparison.

**Important:** These are answer checkpoints and examples, not a claim of external accreditation. In the learning platform, actual certification requires verified weekly progress and a human-assessed capstone review.
