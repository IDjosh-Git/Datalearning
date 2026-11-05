# Before you open Excel, SQL or Power BI

If you are brand new to analysing data, visit `courses/introduction.html` from the website first. It teaches why analysis matters, the question-to-decision process, six starter calculations, a worked five-day food-kiosk example and a practice quiz. Download **`kiosk_week.csv`** and follow its detailed Excel exercise to learn how revenue differs from profit. This is a separate, fictional beginner example, not a replacement for the connected retail dataset below.

# Start here — practical data analysis study kit

This is a **fictional retail dataset** for learning, not real customer or financial information. Dates cover January–December 2025. Prices and targets are illustrative Nigerian naira (₦) amounts, not market statistics.

## Files
- `retail_orders.csv` — 360 order lines with `order_id`, `order_date`, `customer_id`, `region`, `category`, `product`, `quantity`, `unit_price`, `unit_cost`, `discount_pct` (decimal, e.g. 0.10), `status`, `sales_rep`.
- `retail_customers.csv` — 50 customers; join on `customer_id`. Region is repeated in orders for practice; compare it with the customer record to learn validation.
- `retail_targets.csv` — one target for each region per month (48 rows); grain is `month_start` + `region`.
- `retail_practice.sqlite` — ready-to-query database with the same three tables.
- `retail_sqlite_setup.sql` — SQL to create and populate the same database from scratch. Run only on a new/empty SQLite database.

## Suggested routine
1. **Excel:** import `retail_orders.csv` (Data → From Text/CSV), check numeric and date types; load as an Excel Table called `Orders`. Add a net sales column: `=IF([@status]="Completed",[@quantity]*[@unit_price]*(1-[@discount_pct]),0)`. Compare monthly totals with a PivotTable.
2. **SQL:** open `retail_practice.sqlite` in DB Browser for SQLite or another SQLite editor. Run `SELECT COUNT(*) FROM orders;` — expected 360. Join `customers` on `customer_id`. Use `status = 'Completed'` for the course revenue measure, and state how you handle returned orders.
3. **Power BI:** import the three CSVs. Set `order_date`, `signup_date`, `month_start` to Date; numeric fields to numbers; discount to Decimal Number. Create a Date table and relate it to Orders by date; Customers[customer_id] is one-to-many to Orders[customer_id]. Avoid directly joining targets to orders on region alone: targets are monthly-region grain, so create compatible dimension keys or aggregate carefully.
4. **Quality control:** record your assumed definition of revenue, validate row counts (360 orders / 50 customers / 48 target rows), verify that customer keys are unique, and compare a SQL revenue result against Excel and Power BI.

## Important
- DAX examples use the Power BI table name `Orders`, columns matching CSV headers, and a marked Date table named `Date` where time intelligence is used.
- SQL lessons use **SQLite** unless stated otherwise. `strftime` is SQLite-specific; PostgreSQL, SQL Server and other databases use different date functions.
- Excel examples assume comma argument separators; your regional settings may require semicolons.
- A completed-week checkbox is self-reported progress, not an externally accredited credential. QR completion-record verification is not a trusted central registry.

For questions: esoterikjoshua@gmail.com.

## Expanded full-course practice and AI prompts

- **`WORKED_SOLUTIONS.md`** provides tested expected outcomes and starter formulas in Excel, SQLite, Python and DAX. Use them after attempting the exercise.
- **`../prompt-library.html`** is the searchable collection of 300 AI-assisted analytics prompts in 20 topics. Learners can copy, save, filter and export prompts; they must customize the bracketed placeholders.
- The standalone **AI Integration** course is `../courses/ai.html`: 10 weeks of detailed sessions, application laboratories, five-question weekly quizzes, practical deliverables and instructor-reviewed capstone.
- All Excel, SQL and Power BI weeks now include independent mastery tasks and reconciliation expectations.
