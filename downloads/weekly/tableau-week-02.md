# Tableau · Week 02 · Data types and relationships

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Understand rows, keys and how tables relate

## Before you begin: open the right file
- Download: `learning_customer_cohorts.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: customer_id, signup_date, last_order_date, region, acquisition_channel, orders_lifetime.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=28460s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Tableau can work with related tables at different levels of detail. A logical relationship lets Tableau decide how to combine tables for a particular analysis; a physical join combines rows according to the selected join condition. Do not treat these as interchangeable. A relationship between Orders and Customers typically connects a many-side order key to a unique CustomerID in the customer table.

Bad join choices can multiply records and inflate measures. When Orders and OrderLines are joined physically, order-level totals may repeat for each line. Relationships can help preserve separate table grains, but you still need to validate results. Check the declared data types of joining keys, inspect unmatched records and use distinct counts where the business question requires distinct entities.

## Guided walkthrough in the tool
1. Connect an Orders table and a Customers table.
2. Confirm CustomerID uniqueness in Customers and match its type to Orders.CustomerID.
3. Create a relationship and compare a regional revenue view with source totals.
4. Test one customer with multiple orders, then inspect what changes with a physical join.

### Additional hands-on instruction
Connect customer cohorts as a separate source, review field types, and sketch intended keys before joining.

## Business case
A customer table contains one row per customer, while a sales table contains many rows per customer. A relationship can preserve their separate grains for analysis, but a careless physical join might repeat customer-level amounts. Use one known customer to trace the rows and validate a total. Understanding the relationship matters more than memorising the interface.

## Independent practical challenge
Explain why joining Customers to Orders on CustomerID is safer than joining on customer name.

**Deliverable:** State why a customer-grain file should not be joined to order-grain data without a clear plan.

## Verify your work
A relationship does not remove the need to understand grain. Reconcile revenue and distinct order counts under each model setup; investigate differences before trusting the workbook.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
IDs are more stable and specific; names can repeat or change.

**Common pitfall:** Creating duplicate records through a many-to-many join.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
