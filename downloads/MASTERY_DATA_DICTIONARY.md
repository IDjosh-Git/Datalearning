# Mastery course dataset — fictional training data

`mastery_orders.csv` contains 6 intentionally synthetic retail orders. All five course tracks use this exact demonstration dataset. It is **not** the larger Practice Arena SQL dataset: the Arena has a separate schema and exercise engine.

- **Grain:** 1 row = 1 order (simplified: one product per order).
- **Keys:** `order_id` is unique; `customer_id` identifies a customer; `product_id` identifies a product.
- **Columns:** `order_id` INTEGER, `order_date` ISO date, `customer_id` TEXT, `customer` TEXT, `region` TEXT, `product_id` TEXT, `product` TEXT, `quantity` INTEGER, `unit_price` INTEGER, `unit_cost` INTEGER, `status` TEXT, `channel` TEXT.
- **SQL database:** `mastery_orders.sqlite` contains `orders` and `customers` tables. The `customers` table adds `segment`.
- **Metrics:** `Revenue = quantity × unit_price`, `Profit = quantity × (unit_price − unit_cost)`, filtered where `status = 'Completed'`. All example amounts are *hypothetical training currency units*; no tax/discount modelling is implied.
- **Control totals:** 6 source rows, 5 completed, 1 returned, completed revenue = 578000, completed profit = 135000. January = 340000, February = 238000. Region East = 316000, West = 190000, North = 72000.
- **Tools:** SQLite examples target SQLite 3.25+ for window functions; Python examples require pandas and optionally numpy; Excel examples show Excel 2016-compatible alternatives where applicable; Power BI uses DAX and Power Query M examples requiring a model imported from this sample.
- **Important:** This file is illustrative for practice and not a production business dataset or statistically representative sample.
