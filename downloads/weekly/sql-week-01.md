# Sql · Week 01 · Relational grain and keys

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Explain table grain and primary/foreign keys

## Before you begin: open the right file
- Download: `retail_practice.sqlite` in `/downloads/` of your DataLearning project.
- Important fields / tables: customers(customer_id, customer_name, segment, region, signup_date), orders(order_id, order_date, customer_id, region, category, product, quantity, unit_price, unit_cost, discount_pct, status, sales_rep), targets(month_start, region, sales_target).
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=908s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
A relational database stores related entities in tables. A customer table may hold one row per customer, an orders table one row per order, and an order-lines table one row per purchased item. This row-level meaning is called the grain. Primary keys identify records within a table; foreign keys connect records between tables. These keys are about relationships and identity—not necessarily the order in which a table appears on screen.

Correct analytics depends on joining tables at compatible grains. If a customer has five orders, joining Customer to Orders repeats customer attributes five times. The number of joined rows is not the number of customers. Understand one-to-many and many-to-many relationships before selecting a join. Use a small example to test uniqueness and to explain which metrics belong to which table.

## Guided walkthrough in the tool
1. Draw three boxes for Customers, Orders and OrderLines, labelling one row and the key in each.
2. Check whether CustomerID is unique in Customers and OrderID is unique in Orders.
3. Connect Orders.CustomerID to Customers.CustomerID and OrderLines.OrderID to Orders.OrderID.
4. Count joined rows and distinct customers separately; document why the counts differ.

### Additional hands-on instruction
Open retail_practice.sqlite and compare orders and customers; identify order_id and customer_id.

## Business case
Customers C1 and C2 each have orders, but C1 has three while C2 has one. JOINing Customers to Orders yields four rows. COUNT(*) is therefore the number of joined orders, not the number of unique customers. COUNT(DISTINCT CustomerID) answers the distinct-customer question. A correct query starts with the grain of the requested measure.

## Independent practical challenge
What is the safest way to count orders after a one-to-many join?

**Deliverable:** Document row grain and expected cardinality before writing any JOIN.

## Verify your work
Your joins should not create impossible customer counts. Trace at least one customer through all three tables and verify that the repeated rows are expected.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
COUNT(DISTINCT orders.order_id)

**Common pitfall:** Counting joined rows as unique orders.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
