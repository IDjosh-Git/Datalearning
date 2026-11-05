window.IJ_REFERENCE=[
  {
    "group": "Excel",
    "title": "SUM / basic totals",
    "code": "=SUM(Orders[quantity])",
    "meaning": "Adds values in the quantity column of the Excel Table named Orders. Structured references expand as you add rows.",
    "watch": "Ensure quantity contains numbers rather than numeric-looking text.",
    "link": "https://support.microsoft.com/en-us/office/sum-function-043e1c7d-7726-4e80-8f32-07f4211e4c8f",
    "level": "Core"
  },
  {
    "group": "Excel",
    "title": "Net sales per row",
    "code": "=IF([@status]=\"Cancelled\",0,[@quantity]*[@unit_price]*(1-[@discount_pct]))",
    "meaning": "Add a net_sales column inside Orders. Compute price after discount and treat cancelled orders as zero.",
    "watch": "discount_pct is a decimal: 0.10 means 10%; confirm how returned orders should count.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "Excel",
    "title": "SUMIFS / conditional totals",
    "code": "=SUMIFS(Orders[net_sales],Orders[region],\"North\",Orders[status],\"Completed\")",
    "meaning": "Adds completed net sales for the North region. Criteria ranges must be the same size as the sum range.",
    "watch": "This assumes you created the net_sales column first.",
    "link": "https://support.microsoft.com/en-us/office/sumifs-function-c9e748f5-7ea7-455d-9406-611cebce642b",
    "level": "Core"
  },
  {
    "group": "Excel",
    "title": "COUNTIFS / multiple conditions",
    "code": "=COUNTIFS(Orders[region],\"West\",Orders[status],\"Completed\")",
    "meaning": "Counts rows matching both region and status. Counting rows is not the same as counting distinct customers.",
    "watch": "If a customer buys twice, COUNTIFS counts two order lines.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "Excel",
    "title": "XLOOKUP / customer segment",
    "code": "=XLOOKUP([@customer_id],Customers[customer_id],Customers[segment],\"Not found\",0)",
    "meaning": "Finds the matching customer segment from a table named Customers, using exact match (0).",
    "watch": "If customer_id is duplicated in Customers, the first matching row is returned.",
    "link": "https://support.microsoft.com/en-us/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929",
    "level": "Core"
  },
  {
    "group": "Excel",
    "title": "IFERROR / readable errors",
    "code": "=IFERROR(XLOOKUP(A2,Customers[customer_id],Customers[segment]),\"Review key\")",
    "meaning": "Displays a useful prompt instead of #N/A when a key cannot be found.",
    "watch": "Do not hide all errors during data validation; investigate missing or malformed keys.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "Excel",
    "title": "IF / business rule",
    "code": "=IF([@quantity]>=5,\"Bulk\",\"Standard\")",
    "meaning": "Classifies each order as Bulk or Standard based on quantity.",
    "watch": "Decide whether 5 belongs in Bulk: >= includes 5; > does not.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "Excel",
    "title": "TEXT / month label",
    "code": "=TEXT([@order_date],\"yyyy-mm\")",
    "meaning": "Returns a display label such as 2025-06 for an order date.",
    "watch": "TEXT returns text, not a true date. Use a month-start date for chronological time calculations.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "Excel",
    "title": "DATE / create a proper date",
    "code": "=DATE(YEAR([@order_date]),MONTH([@order_date]),1)",
    "meaning": "Creates a true month-start date, suitable for sorting and monthly target matching.",
    "watch": "Confirm imported order_date values are actual dates.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "Excel",
    "title": "FILTER / dynamic selection",
    "code": "=FILTER(Orders,Orders[status]=\"Completed\",\"No matches\")",
    "meaning": "Spills rows whose status is Completed into an empty output area. Available in Excel versions with dynamic arrays.",
    "watch": "#SPILL! means the destination is blocked or the formula is inside a Table.",
    "link": "https://support.microsoft.com/en-us/office/filter-function-f4f7cb66-82eb-4767-8f7c-4877ad80c759",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "UNIQUE / distinct keys",
    "code": "=UNIQUE(Orders[customer_id])",
    "meaning": "Returns one entry for each customer_id in the orders data.",
    "watch": "Blank IDs can appear as a unique value; check data completeness first.",
    "link": "https://support.microsoft.com/en-us/office/unique-function-c5ab87fd-30a3-4ce1-9ea3-c9a6b7a3d5f8",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "LET / readable calculations",
    "code": "=LET(q,[@quantity],p,[@unit_price],d,[@discount_pct],q*p*(1-d))",
    "meaning": "Assigns descriptive names to components of a row-level formula, then calculates net revenue.",
    "watch": "A LET variable is local to its formula, not a workbook-wide name.",
    "link": "https://support.microsoft.com/en-us/office/let-function-34842dd8-b92b-4d3f-b325-b8b8f9908999",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "TRIM and CLEAN / tidy text",
    "code": "=TRIM(CLEAN(A2))",
    "meaning": "Removes common nonprinting characters and extra ASCII spaces from imported text.",
    "watch": "TRIM does not always remove nonbreaking spaces; consider SUBSTITUTE(A2,CHAR(160),\" \").",
    "link": "",
    "level": "Core"
  },
  {
    "group": "Excel",
    "title": "SUMPRODUCT / discounted revenue",
    "code": "=SUMPRODUCT((Orders[status]=\"Completed\")*Orders[quantity]*Orders[unit_price]*(1-Orders[discount_pct]))",
    "meaning": "Computes completed discounted revenue without adding a helper column.",
    "watch": "All arrays must align and numeric fields must be clean; for auditing, a helper column is often clearer.",
    "link": "https://support.microsoft.com/en-us/office/sumproduct-function-16753e75-9f68-4874-94ac-4f4e3a6f8c17",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "PivotTable / monthly revenue",
    "code": "Rows: order_date grouped by Months and Years\nColumns: region\nValues: Sum of net_sales\nFilters: status = Completed",
    "meaning": "Builds a compact monthly sales summary. Refresh the PivotTable after source data changes.",
    "watch": "Group both Year and Month when data spans multiple years; otherwise January values may combine.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "SQL",
    "title": "SELECT / inspect the table",
    "code": "SELECT order_id, order_date, region, quantity\nFROM orders\nLIMIT 10;",
    "meaning": "Start by looking at actual rows and column values before writing a complex query.",
    "watch": "LIMIT is SQLite/PostgreSQL syntax; SQL Server uses TOP or OFFSET/FETCH.",
    "link": "https://www.sqlite.org/lang.html",
    "level": "Core"
  },
  {
    "group": "SQL",
    "title": "WHERE / completed orders",
    "code": "SELECT * FROM orders\nWHERE status = 'Completed'\n  AND quantity >= 3;",
    "meaning": "WHERE filters individual rows before aggregation. Use quoted text and explicit comparison operators.",
    "watch": "NULL values require IS NULL or IS NOT NULL; = NULL will not match.",
    "link": "https://www.sqlite.org/lang.html",
    "level": "Core"
  },
  {
    "group": "SQL",
    "title": "ORDER BY / stable ranking",
    "code": "SELECT order_id, quantity, unit_price\nFROM orders\nORDER BY quantity DESC, order_id ASC\nLIMIT 10;",
    "meaning": "Sorts by highest quantity, then uses the order ID to break ties predictably.",
    "watch": "Without ORDER BY, database row order is not guaranteed.",
    "link": "https://www.sqlite.org/lang.html",
    "level": "Core"
  },
  {
    "group": "SQL",
    "title": "GROUP BY / revenue by region",
    "code": "SELECT region,\n  ROUND(SUM(quantity * unit_price * (1-discount_pct)),2) AS revenue\nFROM orders\nWHERE status = 'Completed'\nGROUP BY region\nORDER BY revenue DESC;",
    "meaning": "Filters completed orders, groups by region, and computes net revenue on each group.",
    "watch": "Never select a non-grouped descriptive column alongside aggregates without understanding your engine rules.",
    "link": "https://www.sqlite.org/lang.html",
    "level": "Core"
  },
  {
    "group": "SQL",
    "title": "HAVING / filter groups",
    "code": "SELECT customer_id, COUNT(*) AS order_count\nFROM orders\nWHERE status = 'Completed'\nGROUP BY customer_id\nHAVING COUNT(*) >= 3;",
    "meaning": "HAVING filters grouped results after aggregation; WHERE filters input rows.",
    "watch": "WHERE COUNT(*) >= 3 is invalid because WHERE runs before GROUP BY.",
    "link": "https://www.sqlite.org/lang.html",
    "level": "Core"
  },
  {
    "group": "SQL",
    "title": "INNER JOIN / bring in customers",
    "code": "SELECT o.order_id, c.customer_name, c.segment\nFROM orders o\nJOIN customers c ON c.customer_id = o.customer_id;",
    "meaning": "Joins each order to its customer. customers.customer_id is unique, so each order should match at most once.",
    "watch": "Check whether the joined row count equals your starting order count; duplicates reveal join-grain problems.",
    "link": "https://www.sqlite.org/lang.html",
    "level": "Core"
  },
  {
    "group": "SQL",
    "title": "LEFT JOIN / find missing matches",
    "code": "SELECT c.customer_id, c.customer_name\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.customer_id\nWHERE o.order_id IS NULL;",
    "meaning": "Returns customers with no corresponding orders.",
    "watch": "Putting a right-table filter in WHERE can accidentally turn a LEFT JOIN into an inner join.",
    "link": "https://www.sqlite.org/lang.html",
    "level": "Core"
  },
  {
    "group": "SQL",
    "title": "CASE / segment by value",
    "code": "SELECT order_id,\n CASE WHEN quantity >= 5 THEN 'Bulk' ELSE 'Standard' END AS order_size\nFROM orders;",
    "meaning": "Applies a transparent, documented business rule to each record.",
    "watch": "CASE conditions are evaluated in order; the first matching branch wins.",
    "link": "https://www.sqlite.org/lang.html",
    "level": "Core"
  },
  {
    "group": "SQL",
    "title": "CTE / readable query",
    "code": "WITH completed AS (\n SELECT * FROM orders WHERE status = 'Completed'\n)\nSELECT region, COUNT(*) AS orders\nFROM completed\nGROUP BY region;",
    "meaning": "A common table expression lets you name a step and build a query in small auditable stages.",
    "watch": "A CTE is not necessarily materialized; use EXPLAIN when investigating performance.",
    "link": "https://www.sqlite.org/lang.html",
    "level": "Core"
  },
  {
    "group": "SQL",
    "title": "ROW_NUMBER / latest order per customer",
    "code": "WITH ranked AS (\n SELECT *, ROW_NUMBER() OVER (\n PARTITION BY customer_id ORDER BY order_date DESC, order_id DESC\n ) AS rn FROM orders\n)\nSELECT customer_id,order_id,order_date FROM ranked WHERE rn=1;",
    "meaning": "Assigns an independent ranking inside each customer group and selects the most recent order.",
    "watch": "Always include a deterministic tie-breaker when order dates repeat.",
    "link": "https://www.sqlite.org/lang.html",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "LAG / previous month revenue",
    "code": "WITH monthly AS (\n SELECT substr(order_date,1,7) AS month,\n SUM(quantity*unit_price*(1-discount_pct)) AS revenue\n FROM orders WHERE status='Completed' GROUP BY substr(order_date,1,7)\n)\nSELECT month,revenue,LAG(revenue) OVER (ORDER BY month) AS prior_month\nFROM monthly;",
    "meaning": "Calculates a previous-period comparison without self-joining. ISO yyyy-mm labels sort chronologically.",
    "watch": "LAG compares adjacent existing rows; fill missing months before treating it as a strict calendar comparison.",
    "link": "https://www.sqlite.org/lang.html",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "COUNT DISTINCT / unique buyers",
    "code": "SELECT COUNT(DISTINCT customer_id) AS unique_buyers\nFROM orders WHERE status = 'Completed';",
    "meaning": "Counts distinct customers who placed at least one completed order.",
    "watch": "COUNT(DISTINCT) ignores NULLs; confirm customer_id is populated.",
    "link": "https://www.sqlite.org/lang.html",
    "level": "Core"
  },
  {
    "group": "SQL",
    "title": "SQLite date grouping",
    "code": "SELECT strftime('%Y-%m',order_date) AS month, COUNT(*) AS orders\nFROM orders GROUP BY strftime('%Y-%m',order_date)\nORDER BY month;",
    "meaning": "Extracts the YYYY-MM month in SQLite and groups orders.",
    "watch": "SQL Server uses different date functions; do not paste SQLite strftime into T-SQL.",
    "link": "https://www.sqlite.org/lang_datefunc.html",
    "level": "Core"
  },
  {
    "group": "SQL",
    "title": "NULL handling / COALESCE",
    "code": "SELECT order_id, COALESCE(sales_rep,'Unassigned') AS rep\nFROM orders;",
    "meaning": "Uses a fallback label when a nullable column has no value.",
    "watch": "COALESCE does not fix missing data; track null counts separately.",
    "link": "https://www.sqlite.org/lang.html",
    "level": "Core"
  },
  {
    "group": "SQL",
    "title": "EXPLAIN QUERY PLAN / performance",
    "code": "EXPLAIN QUERY PLAN\nSELECT * FROM orders WHERE customer_id = 'C007';",
    "meaning": "Shows how SQLite plans to access rows; compare indexed lookups with table scans.",
    "watch": "An index can improve reads but adds storage and write overhead.",
    "link": "https://www.sqlite.org/eqp.html",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Validation / join row counts",
    "code": "SELECT COUNT(*) AS rows_after_join\nFROM orders o JOIN customers c ON c.customer_id=o.customer_id;",
    "meaning": "Use this with SELECT COUNT(*) FROM orders (360) to detect missing or duplicated dimension keys.",
    "watch": "Row-count equality is useful but does not prove every value is correct.",
    "link": "https://www.sqlite.org/lang.html",
    "level": "Core"
  },
  {
    "group": "SQL",
    "title": "Revenue reconciliation",
    "code": "SELECT ROUND(SUM(quantity*unit_price*(1-discount_pct)),2) AS completed_revenue\nFROM orders WHERE status='Completed';",
    "meaning": "On the supplied practice database, the result is 14248255.00 (fictional naira). Reconcile the same definition in Excel and DAX.",
    "watch": "Returned orders and cancelled orders are excluded by this particular business definition.",
    "link": "https://www.sqlite.org/lang.html",
    "level": "Core"
  },
  {
    "group": "DAX",
    "title": "Net Sales / row iterator",
    "code": "Net Sales =\nSUMX(\n    FILTER(Orders, Orders[status] = \"Completed\"),\n    Orders[quantity] * Orders[unit_price] * (1 - Orders[discount_pct])\n)",
    "meaning": "SUMX evaluates the revenue expression row by row, then sums it in the current filter context.",
    "watch": "A measure recalculates with slicers; a calculated column stores a row result at refresh.",
    "link": "https://learn.microsoft.com/en-us/dax/sumx-function-dax",
    "level": "Core"
  },
  {
    "group": "DAX",
    "title": "Orders Count",
    "code": "Orders Count = DISTINCTCOUNT(Orders[order_id])",
    "meaning": "Counts unique order IDs and responds to report filters.",
    "watch": "COUNTROWS(Orders) counts physical rows, which differs if there are duplicate order IDs.",
    "link": "https://learn.microsoft.com/en-us/dax/distinctcount-function-dax",
    "level": "Core"
  },
  {
    "group": "DAX",
    "title": "Average Order Value",
    "code": "Average Order Value = DIVIDE([Net Sales], CALCULATE([Orders Count], Orders[status] = \"Completed\"))",
    "meaning": "Divides completed net sales by completed order count. DIVIDE safely handles zero denominators.",
    "watch": "Align numerator and denominator definitions before interpreting the KPI.",
    "link": "https://learn.microsoft.com/en-us/dax/divide-function-dax",
    "level": "Core"
  },
  {
    "group": "DAX",
    "title": "Gross Profit",
    "code": "Gross Profit =\nSUMX(\n FILTER(Orders, Orders[status] = \"Completed\"),\n Orders[quantity] * (Orders[unit_price] * (1 - Orders[discount_pct]) - Orders[unit_cost])\n)",
    "meaning": "Calculates revenue less unit cost for completed orders, considering discounts.",
    "watch": "This is gross profit on products only; logistics and taxes are not included.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "DAX",
    "title": "Profit Margin",
    "code": "Profit Margin = DIVIDE([Gross Profit], [Net Sales])",
    "meaning": "Calculates gross profit as a share of net sales. Set measure format to percentage.",
    "watch": "A ratio of totals is not the same as averaging row-level margins.",
    "link": "https://learn.microsoft.com/en-us/dax/divide-function-dax",
    "level": "Core"
  },
  {
    "group": "DAX",
    "title": "CALCULATE / override status",
    "code": "Completed Orders = CALCULATE([Orders Count], Orders[status] = \"Completed\")",
    "meaning": "Evaluates a measure under a modified filter context.",
    "watch": "CALCULATE can replace an existing filter on the same column unless KEEPFILTERS is used.",
    "link": "https://learn.microsoft.com/en-us/dax/calculate-function-dax",
    "level": "Core"
  },
  {
    "group": "DAX",
    "title": "Date table / foundation",
    "code": "Date = CALENDAR(DATE(2025,1,1), DATE(2025,12,31))",
    "meaning": "Create a continuous Date table, mark it as the date table, and relate Date[Date] to Orders[order_date].",
    "watch": "CSV order_date must be Date (not text) and relationship active.",
    "link": "https://learn.microsoft.com/en-us/dax/calendar-function-dax",
    "level": "Core"
  },
  {
    "group": "DAX",
    "title": "Previous month sales",
    "code": "Previous Month Sales = CALCULATE([Net Sales], DATEADD('Date'[Date], -1, MONTH))",
    "meaning": "Returns the preceding month revenue when the report uses the Date table.",
    "watch": "A complete marked Date table and active relationship are required for dependable comparisons.",
    "link": "https://learn.microsoft.com/en-us/dax/dateadd-function-dax",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Month-over-month growth",
    "code": "MoM Growth % =\nDIVIDE([Net Sales] - [Previous Month Sales], [Previous Month Sales])",
    "meaning": "Compares current and previous month totals. Format as a percentage.",
    "watch": "A missing previous month returns blank; do not imply infinite growth.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "YTD sales",
    "code": "Sales YTD = TOTALYTD([Net Sales], 'Date'[Date])",
    "meaning": "Accumulates sales from the start of the year through the selected date.",
    "watch": "Use a continuous Date table and confirm whether the business follows a calendar or fiscal year.",
    "link": "https://learn.microsoft.com/en-us/dax/totalytd-function-dax",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Selected region label",
    "code": "Region Label = SELECTEDVALUE(Orders[region], \"All regions\")",
    "meaning": "Returns a region name only when there is exactly one distinct region in context.",
    "watch": "A single selected value and a single available value may not mean the same user interaction.",
    "link": "https://learn.microsoft.com/en-us/dax/selectedvalue-function-dax",
    "level": "Core"
  },
  {
    "group": "DAX",
    "title": "Share of all regions",
    "code": "Region Share =\nDIVIDE([Net Sales], CALCULATE([Net Sales], REMOVEFILTERS(Orders[region])))",
    "meaning": "Keeps other filters such as month but removes region, showing each region as a share of its comparable total.",
    "watch": "Decide deliberately which filters the denominator should ignore.",
    "link": "https://learn.microsoft.com/en-us/dax/removefilters-function-dax",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Row-context vs filter-context",
    "code": "Net Sales = SUMX(Orders, Orders[quantity] * Orders[unit_price] * (1 - Orders[discount_pct]))",
    "meaning": "An iterator supplies row context for the expression; the measure is evaluated within report filter context.",
    "watch": "This illustrative variant includes cancelled orders; use the Completed-filtered measure for the course KPI.",
    "link": "https://learn.microsoft.com/en-us/dax/sumx-function-dax",
    "level": "Core"
  },
  {
    "group": "DAX",
    "title": "Safe target achievement",
    "code": "Target Achievement % = DIVIDE([Net Sales], [Sales Target])",
    "meaning": "Compares revenue and target after modeling targets at the correct monthly-region grain.",
    "watch": "Do not sum monthly target for every order row; use a dimension or unique monthly-region key first.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DISTINCTCOUNT / customers",
    "code": "Active Customers = CALCULATE(DISTINCTCOUNT(Orders[customer_id]), Orders[status] = \"Completed\")",
    "meaning": "Counts customers with at least one completed order inside the current filter context.",
    "watch": "The total will not necessarily equal a sum of monthly unique customers because buyers can recur.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "DAX",
    "title": "COALESCE / display zeros",
    "code": "Orders Display = COALESCE([Orders Count], 0)",
    "meaning": "Shows zero instead of BLANK on a card when no order is in context.",
    "watch": "Retain BLANK where it represents missing information; a cosmetic zero may mislead.",
    "link": "https://learn.microsoft.com/en-us/dax/coalesce-function-dax",
    "level": "Core"
  },
  {
    "group": "Power Query",
    "title": "Import clean CSV",
    "code": "let\n Source = Csv.Document(File.Contents(\"retail_orders.csv\"),[Delimiter=\",\", Encoding=65001]),\n Headers = Table.PromoteHeaders(Source,[PromoteAllScalars=true])\nin Headers",
    "meaning": "Import a CSV file into Power Query. Set the path to your actual file location before running.",
    "watch": "For a published Power BI report, prefer a supported refreshable storage location.",
    "link": "https://learn.microsoft.com/en-us/powerquery-m/csv-document",
    "level": "Core"
  },
  {
    "group": "Power Query",
    "title": "Set data types",
    "code": "Table.TransformColumnTypes(PreviousStep, {{\"order_date\", type date}, {\"quantity\", Int64.Type}, {\"unit_price\", type number}, {\"discount_pct\", type number}})",
    "meaning": "Explicit types prevent dates and money from silently arriving as text. Replace PreviousStep with the actual prior query step.",
    "watch": "Culture can affect date and decimal parsing; verify a sample of values.",
    "link": "https://learn.microsoft.com/en-us/powerquery-m/table-transformcolumntypes",
    "level": "Core"
  },
  {
    "group": "Power Query",
    "title": "Trim text fields",
    "code": "Table.TransformColumns(PreviousStep, {{\"product\", Text.Trim, type text}, {\"region\", Text.Trim, type text}})",
    "meaning": "Trims leading and trailing whitespace in selected text fields.",
    "watch": "Text.Trim does not automatically standardize spelling or letter case.",
    "link": "https://learn.microsoft.com/en-us/powerquery-m/table-transformcolumns",
    "level": "Core"
  },
  {
    "group": "Power Query",
    "title": "Replace missing labels",
    "code": "Table.ReplaceValue(PreviousStep,null,\"Unassigned\",Replacer.ReplaceValue,{\"sales_rep\"})",
    "meaning": "Replaces null sales-rep values while preserving other fields.",
    "watch": "A missing value is a data-quality signal: document replacements and retain raw data.",
    "link": "https://learn.microsoft.com/en-us/powerquery-m/table-replacevalue",
    "level": "Core"
  },
  {
    "group": "Power Query",
    "title": "Custom revenue column",
    "code": "Table.AddColumn(PreviousStep,\"net_sales\", each if [status] = \"Completed\" then [quantity]*[unit_price]*(1-[discount_pct]) else 0, type number)",
    "meaning": "Adds a refreshable, row-level net sales calculation for completed orders.",
    "watch": "Make sure quantity, price and discount columns are numeric first.",
    "link": "https://learn.microsoft.com/en-us/powerquery-m/table-addcolumn",
    "level": "Core"
  },
  {
    "group": "Power Query",
    "title": "Remove duplicate dimension keys",
    "code": "Table.Distinct(PreviousStep,{\"customer_id\"})",
    "meaning": "Keeps one row per customer_id to build a one-to-many dimension relationship.",
    "watch": "Investigate duplicates before removing: which record is retained may otherwise be arbitrary.",
    "link": "https://learn.microsoft.com/en-us/powerquery-m/table-distinct",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "AVERAGEIFS by region",
    "code": "=AVERAGEIFS(Orders[net_sales],Orders[region],\"North\",Orders[status],\"Completed\")",
    "meaning": "Calculates the average net sale among completed orders in the North region, rather than averaging every order.",
    "watch": "If no rows match the criteria, Excel returns #DIV/0!.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "Excel",
    "title": "Distinct customer count",
    "code": "=ROWS(UNIQUE(FILTER(Orders[customer_id],Orders[customer_id]<>\"\")))",
    "meaning": "Returns unique nonblank customer IDs in a dynamic array-capable Excel version.",
    "watch": "UNIQUE and FILTER require modern Excel; inconsistent customer IDs inflate the result.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "Excel",
    "title": "Count unique orders",
    "code": "=ROWS(UNIQUE(Orders[order_id]))",
    "meaning": "Counts distinct order identifiers, useful when one order appears on several product lines.",
    "watch": "Remove blank IDs and check whether you need unique customers instead.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "Excel",
    "title": "FILTER completed sales",
    "code": "=FILTER(Orders,Orders[status]=\"Completed\",\"No completed orders\")",
    "meaning": "Spills all completed-order rows into a dynamic result table.",
    "watch": "Ensure enough empty space for the spill; FILTER is unavailable in some older versions.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "Excel",
    "title": "SORTBY highest revenue",
    "code": "=SORTBY(Orders,Orders[net_sales],-1)",
    "meaning": "Sorts the orders by revenue from highest to lowest without changing the source table.",
    "watch": "Sorting one column independently of another breaks row alignment.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "TEXTSPLIT product code",
    "code": "=TEXTSPLIT(A2,\"-\")",
    "meaning": "Splits a hyphen-delimited code into neighboring cells for easier parsing.",
    "watch": "Unexpected or missing delimiters change the returned array shape.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "TEXTBEFORE country prefix",
    "code": "=TEXTBEFORE(A2,\"-\")",
    "meaning": "Extracts the characters preceding the first hyphen.",
    "watch": "If the delimiter may be absent, supply an if-not-found result.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "IFERROR safe lookup",
    "code": "=IFERROR(XLOOKUP(E2,Products[product_id],Products[price]),\"Not found\")",
    "meaning": "Looks up a product price and returns a readable fallback if the formula errors.",
    "watch": "Do not use IFERROR to hide a genuine data-quality or type mismatch.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "LET reusable calculation",
    "code": "=LET(qty,[@quantity],price,[@unit_price],qty*price)",
    "meaning": "Names intermediate expressions so formulas are shorter and easier to audit.",
    "watch": "Names are local to the LET expression.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "SUMPRODUCT weighted total",
    "code": "=SUMPRODUCT(Orders[quantity],Orders[unit_price])",
    "meaning": "Multiplies corresponding quantities and unit prices, then sums the row-level values.",
    "watch": "This example ignores discounts, returns, and status; use net sales when needed.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "EOMONTH reporting period",
    "code": "=EOMONTH(A2,0)",
    "meaning": "Returns the final calendar day of the month for the date in A2.",
    "watch": "A2 must contain a real Excel date, not a text label.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "NETWORKDAYS business days",
    "code": "=NETWORKDAYS(A2,B2,Holidays[date])",
    "meaning": "Counts working weekdays between two dates, excluding specified holidays.",
    "watch": "Default weekends are Saturday and Sunday; use NETWORKDAYS.INTL for alternatives.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Conditional running total",
    "code": "=SUMIFS(Orders[net_sales],Orders[order_date],\"<=\"&[@order_date],Orders[status],\"Completed\")",
    "meaning": "Creates a cumulative completed-sales total up to the current row date.",
    "watch": "Repeated dates produce the same cumulative total; performance can degrade on huge tables.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Median transaction value",
    "code": "=MEDIAN(FILTER(Orders[net_sales],Orders[status]=\"Completed\"))",
    "meaning": "Finds the middle completed-order transaction value; less sensitive to large outliers than average.",
    "watch": "Check whether one row is a line item or an entire transaction.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Percentage of total",
    "code": "=IFERROR([@net_sales]/SUM(Orders[net_sales]),0)",
    "meaning": "Shows each row as a share of total net sales. Format as Percentage.",
    "watch": "Make sure denominator represents the right reporting scope.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Data validation from list",
    "code": "=COUNTIF(Products[product_id],A2)>0",
    "meaning": "Returns TRUE if A2 matches a valid product ID, useful as a custom validation condition.",
    "watch": "Excel validation may need a named range when referencing a Table directly.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "CASE sales band",
    "code": "SELECT order_id, net_sales, CASE WHEN net_sales >= 1000 THEN 'High' WHEN net_sales >= 250 THEN 'Medium' ELSE 'Low' END AS sales_band FROM orders;",
    "meaning": "Classifies each order into a business-friendly sales band.",
    "watch": "Check currency, tax treatment, and whether null sales values need their own band.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "SQL",
    "title": "NULL-safe revenue",
    "code": "SELECT SUM(COALESCE(net_sales,0)) AS revenue FROM orders WHERE status = 'Completed';",
    "meaning": "Substitutes zero for missing numeric sales and sums completed orders.",
    "watch": "A missing sale is not necessarily a true zero; investigate nulls separately.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "SQL",
    "title": "COUNT distinct customers",
    "code": "SELECT COUNT(DISTINCT customer_id) AS customers FROM orders WHERE status = 'Completed';",
    "meaning": "Counts customers with at least one completed order in the selected data.",
    "watch": "COUNT DISTINCT normally ignores NULL and does not normalize inconsistent IDs.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "SQL",
    "title": "CTE monthly revenue",
    "code": "WITH monthly AS (SELECT DATE_TRUNC('month',order_date) AS month, SUM(net_sales) AS revenue FROM orders WHERE status = 'Completed' GROUP BY 1) SELECT month,revenue FROM monthly ORDER BY month;",
    "meaning": "Separates monthly aggregation into an easy-to-read common table expression.",
    "watch": "DATE_TRUNC is dialect-specific; adapt to SQL Server or MySQL.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "SQL",
    "title": "ROW_NUMBER latest order",
    "code": "SELECT order_id,customer_id,order_date,ROW_NUMBER() OVER(PARTITION BY customer_id ORDER BY order_date DESC,order_id DESC) AS rn FROM orders;",
    "meaning": "Numbers each customer’s orders from newest to oldest. Filter rn=1 in an outer query to get one row each.",
    "watch": "Use a deterministic tie-breaker when dates repeat.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Running revenue window",
    "code": "SELECT order_date, SUM(net_sales) AS daily_sales, SUM(SUM(net_sales)) OVER(ORDER BY order_date ROWS UNBOUNDED PRECEDING) AS running_sales FROM orders WHERE status='Completed' GROUP BY order_date ORDER BY order_date;",
    "meaning": "Aggregates daily completed revenue and accumulates it over time.",
    "watch": "A missing date will have no row; join to a calendar for continuous series.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "LAG month-over-month",
    "code": "WITH m AS (SELECT DATE_TRUNC('month',order_date) AS month,SUM(net_sales) AS revenue FROM orders WHERE status='Completed' GROUP BY 1) SELECT month,revenue,LAG(revenue) OVER(ORDER BY month) AS previous_revenue FROM m;",
    "meaning": "Shows monthly revenue alongside the preceding month for trend comparisons.",
    "watch": "LAG uses the previous row; missing months need a calendar scaffold.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "HAVING significant regions",
    "code": "SELECT region,SUM(net_sales) AS revenue FROM orders WHERE status='Completed' GROUP BY region HAVING SUM(net_sales)>10000;",
    "meaning": "Filters aggregate groups after computing total completed revenue.",
    "watch": "WHERE filters raw rows; HAVING filters groups.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Duplicate order identifiers",
    "code": "SELECT order_id,COUNT(*) AS rows_found FROM orders GROUP BY order_id HAVING COUNT(*)>1;",
    "meaning": "Finds order IDs appearing more than once, a starting point for duplicate investigation.",
    "watch": "Multiple order lines per order may be legitimate; check grain first.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Anti join unmatched products",
    "code": "SELECT o.order_id,o.product_id FROM orders o LEFT JOIN products p ON o.product_id=p.product_id WHERE p.product_id IS NULL;",
    "meaning": "Finds order records missing a matching product dimension row.",
    "watch": "NULL order product IDs also appear; decide whether to report separately.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Conversion rate by region",
    "code": "SELECT region,100.0*SUM(CASE WHEN status='Completed' THEN 1 ELSE 0 END)/NULLIF(COUNT(*),0) AS completion_pct FROM orders GROUP BY region;",
    "meaning": "Measures completed rows as a percentage of all order rows by region.",
    "watch": "Row-level completion is not customer-level conversion; define the denominator.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Top 3 products in each region",
    "code": "WITH r AS (SELECT region,product_id,SUM(net_sales) AS revenue FROM orders WHERE status='Completed' GROUP BY region,product_id) SELECT *,DENSE_RANK() OVER(PARTITION BY region ORDER BY revenue DESC) AS product_rank FROM r;",
    "meaning": "Ranks products within each region by sales; filter product_rank <= 3 in an outer query.",
    "watch": "DENSE_RANK includes ties and may return more than three products.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Completed Revenue",
    "code": "Completed Revenue = CALCULATE(SUM(Orders[net_sales]), Orders[status] = \"Completed\")",
    "meaning": "Creates a reusable measure respecting report filters while keeping only completed sales.",
    "watch": "Confirm net_sales is numeric and calculated at the right grain.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "DAX",
    "title": "Total orders",
    "code": "Total Orders = DISTINCTCOUNT(Orders[order_id])",
    "meaning": "Counts distinct order IDs under active slicers and report filters.",
    "watch": "DISTINCTCOUNT includes BLANK as a distinct value if present.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "DAX",
    "title": "Completed orders",
    "code": "Completed Orders = CALCULATE(DISTINCTCOUNT(Orders[order_id]), Orders[status] = \"Completed\")",
    "meaning": "Counts distinct completed orders to use as denominator in AOV.",
    "watch": "Mixed order statuses at line level require a defined order-level status.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "DAX",
    "title": "AOV completed only",
    "code": "AOV Completed = DIVIDE([Completed Revenue], [Completed Orders])",
    "meaning": "Measures average completed revenue per completed order, returning BLANK for zero denominator.",
    "watch": "Use a consistent completed-status definition in numerator and denominator.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Year to date revenue",
    "code": "Revenue YTD = TOTALYTD([Completed Revenue],'Date'[Date])",
    "meaning": "Accumulates revenue from the start of year to current date context.",
    "watch": "Requires a continuous, properly related date table and appropriate fiscal year configuration.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Prior year revenue",
    "code": "Revenue PY = CALCULATE([Completed Revenue], SAMEPERIODLASTYEAR('Date'[Date]))",
    "meaning": "Returns sales for the corresponding previous-year period.",
    "watch": "Requires a valid date table and may not match 4-4-5 fiscal calendars.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Year over year growth",
    "code": "Revenue YoY % = DIVIDE([Completed Revenue] - [Revenue PY], [Revenue PY])",
    "meaning": "Compares the current revenue with prior-year revenue as a percentage.",
    "watch": "Blank or zero prior year should not be treated as infinite growth.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Revenue share of all regions",
    "code": "Revenue Share % = DIVIDE([Completed Revenue], CALCULATE([Completed Revenue], REMOVEFILTERS(Orders[region])))",
    "meaning": "Calculates share of total across all regions while keeping other filters.",
    "watch": "REMOVEFILTERS on region differs from ALLSELECTED and changes slicer behavior.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Distinct paying customers",
    "code": "Paying Customers = CALCULATE(DISTINCTCOUNT(Orders[customer_id]), Orders[status] = \"Completed\")",
    "meaning": "Counts distinct customers with at least one completed purchase in filter context.",
    "watch": "A customer buying twice still counts once.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "RANKX products",
    "code": "Product Rank = RANKX(ALLSELECTED(Products[product_name]),[Completed Revenue],,DESC,DENSE)",
    "meaning": "Ranks visible products by completed revenue, respecting selections made outside the ranked column.",
    "watch": "Ties share ranks; ALLSELECTED can be complex under nested visuals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Rolling 30 day revenue",
    "code": "Revenue 30D = CALCULATE([Completed Revenue], DATESINPERIOD('Date'[Date],MAX('Date'[Date]),-30,DAY))",
    "meaning": "Computes revenue over the trailing 30-day period ending at the current visible date.",
    "watch": "The period boundaries and 30-day interpretation should match the business definition.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Trim and clean text",
    "code": "Table.TransformColumns(Source, {{\"customer_name\", each Text.Clean(Text.Trim(_)), type text}})",
    "meaning": "Removes leading/trailing whitespace and control characters from customer names.",
    "watch": "Null values may need explicit guarding depending on the transformation.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "Power Query",
    "title": "Convert type with locale",
    "code": "Table.TransformColumnTypes(Source, {{\"order_date\", type date}}, \"en-GB\")",
    "meaning": "Interprets the date column using the specified locale, useful for day-first dates.",
    "watch": "Verify source strings because ambiguous dates may parse differently by locale.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "Power Query",
    "title": "Remove duplicates by ID",
    "code": "Table.Distinct(Source, {\"order_id\"})",
    "meaning": "Keeps one record per order ID for datasets genuinely expected to be unique.",
    "watch": "Which duplicate survives may be unpredictable without a deterministic upstream process.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "Power Query",
    "title": "Add calculated revenue",
    "code": "Table.AddColumn(Source, \"gross_sales\", each [quantity] * [unit_price], type number)",
    "meaning": "Creates a per-row multiplication column within Power Query.",
    "watch": "Null or text values can produce errors; handle missing values intentionally.",
    "link": "",
    "level": "Core"
  },
  {
    "group": "Power Query",
    "title": "Filter completed orders",
    "code": "Table.SelectRows(Source, each [status] = \"Completed\")",
    "meaning": "Keeps only completed transactions before loading into the model.",
    "watch": "Filtering cancelled rows out prevents separate cancellation reporting.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Merge with products",
    "code": "Table.NestedJoin(Orders, {\"product_id\"}, Products, {\"product_id\"}, \"ProductDetails\", JoinKind.LeftOuter)",
    "meaning": "Joins the Products table onto Orders using a left outer match.",
    "watch": "Duplicate product keys may multiply rows when expanding nested records.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Group revenue by region",
    "code": "Table.Group(Source, {\"region\"}, {{\"Revenue\", each List.Sum([net_sales]), type number}})",
    "meaning": "Aggregates one revenue value for each region.",
    "watch": "Grouping collapses transaction detail; use a separate staging query if needed.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Replace errors with null",
    "code": "Table.ReplaceErrorValues(Source, {{\"net_sales\", null}})",
    "meaning": "Replaces errors in the net_sales column with missing values so the query can continue.",
    "watch": "Track error counts separately rather than silently masking data quality failures.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Unpivot monthly columns",
    "code": "Table.UnpivotOtherColumns(Source, {\"product_id\"}, \"Month\", \"Revenue\")",
    "meaning": "Turns wide month columns into a tidy pair of Month and Revenue columns.",
    "watch": "Preserve identifier columns; ensure non-month attributes are not unpivoted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Add month start",
    "code": "Table.AddColumn(Source, \"month_start\", each Date.StartOfMonth([order_date]), type date)",
    "meaning": "Builds a consistent month key for later grouping and relationships.",
    "watch": "Ensure order_date is date-typed before applying Date.StartOfMonth.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Net Revenue for North by region",
    "code": "=SUMIFS(Orders[net_sales],Orders[region],\"North\")",
    "meaning": "Computes net revenue limited to region = North. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Gross Sales for North by region",
    "code": "SELECT SUM(gross_sales) AS total_gross_sales FROM orders WHERE region = 'North';",
    "meaning": "Computes gross sales limited to region = North. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Cost for North by region",
    "code": "Cost North = CALCULATE(SUM(Orders[cost]), Orders[region] = \"North\")",
    "meaning": "Computes cost limited to region = North. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Profit for North by region",
    "code": "Table.Group(Table.SelectRows(Source, each [region] = \"North\"), {}, {{\"Total\", each List.Sum([profit]), type nullable number}})",
    "meaning": "Computes profit limited to region = North. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Units Sold for North by region",
    "code": "=SUMIFS(Orders[quantity],Orders[region],\"North\")",
    "meaning": "Computes units sold limited to region = North. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Discount Amount for North by region",
    "code": "SELECT SUM(discount_amount) AS total_discount_amount FROM orders WHERE region = 'North';",
    "meaning": "Computes discount amount limited to region = North. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Shipping Cost for North by region",
    "code": "Shipping Cost North = CALCULATE(SUM(Orders[shipping_cost]), Orders[region] = \"North\")",
    "meaning": "Computes shipping cost limited to region = North. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Tax Amount for North by region",
    "code": "Table.Group(Table.SelectRows(Source, each [region] = \"North\"), {}, {{\"Total\", each List.Sum([tax_amount]), type nullable number}})",
    "meaning": "Computes tax amount limited to region = North. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Refund Amount for North by region",
    "code": "=SUMIFS(Orders[refund_amount],Orders[region],\"North\")",
    "meaning": "Computes refund amount limited to region = North. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Order Value for North by region",
    "code": "SELECT SUM(order_value) AS total_order_value FROM orders WHERE region = 'North';",
    "meaning": "Computes order value limited to region = North. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Net Revenue for Online by channel",
    "code": "SELECT SUM(net_sales) AS total_net_sales FROM orders WHERE channel = 'Online';",
    "meaning": "Computes net revenue limited to channel = Online. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Gross Sales for Online by channel",
    "code": "Gross Sales Online = CALCULATE(SUM(Orders[gross_sales]), Orders[channel] = \"Online\")",
    "meaning": "Computes gross sales limited to channel = Online. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Cost for Online by channel",
    "code": "Table.Group(Table.SelectRows(Source, each [channel] = \"Online\"), {}, {{\"Total\", each List.Sum([cost]), type nullable number}})",
    "meaning": "Computes cost limited to channel = Online. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Profit for Online by channel",
    "code": "=SUMIFS(Orders[profit],Orders[channel],\"Online\")",
    "meaning": "Computes profit limited to channel = Online. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Units Sold for Online by channel",
    "code": "SELECT SUM(quantity) AS total_quantity FROM orders WHERE channel = 'Online';",
    "meaning": "Computes units sold limited to channel = Online. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Discount Amount for Online by channel",
    "code": "Discount Amount Online = CALCULATE(SUM(Orders[discount_amount]), Orders[channel] = \"Online\")",
    "meaning": "Computes discount amount limited to channel = Online. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Shipping Cost for Online by channel",
    "code": "Table.Group(Table.SelectRows(Source, each [channel] = \"Online\"), {}, {{\"Total\", each List.Sum([shipping_cost]), type nullable number}})",
    "meaning": "Computes shipping cost limited to channel = Online. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Tax Amount for Online by channel",
    "code": "=SUMIFS(Orders[tax_amount],Orders[channel],\"Online\")",
    "meaning": "Computes tax amount limited to channel = Online. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Refund Amount for Online by channel",
    "code": "SELECT SUM(refund_amount) AS total_refund_amount FROM orders WHERE channel = 'Online';",
    "meaning": "Computes refund amount limited to channel = Online. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Order Value for Online by channel",
    "code": "Order Value Online = CALCULATE(SUM(Orders[order_value]), Orders[channel] = \"Online\")",
    "meaning": "Computes order value limited to channel = Online. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Net Revenue for Completed by status",
    "code": "Net Sales Completed = CALCULATE(SUM(Orders[net_sales]), Orders[status] = \"Completed\")",
    "meaning": "Computes net revenue limited to status = Completed. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Gross Sales for Completed by status",
    "code": "Table.Group(Table.SelectRows(Source, each [status] = \"Completed\"), {}, {{\"Total\", each List.Sum([gross_sales]), type nullable number}})",
    "meaning": "Computes gross sales limited to status = Completed. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Cost for Completed by status",
    "code": "=SUMIFS(Orders[cost],Orders[status],\"Completed\")",
    "meaning": "Computes cost limited to status = Completed. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Profit for Completed by status",
    "code": "SELECT SUM(profit) AS total_profit FROM orders WHERE status = 'Completed';",
    "meaning": "Computes profit limited to status = Completed. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Units Sold for Completed by status",
    "code": "Quantity Completed = CALCULATE(SUM(Orders[quantity]), Orders[status] = \"Completed\")",
    "meaning": "Computes units sold limited to status = Completed. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Discount Amount for Completed by status",
    "code": "Table.Group(Table.SelectRows(Source, each [status] = \"Completed\"), {}, {{\"Total\", each List.Sum([discount_amount]), type nullable number}})",
    "meaning": "Computes discount amount limited to status = Completed. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Shipping Cost for Completed by status",
    "code": "=SUMIFS(Orders[shipping_cost],Orders[status],\"Completed\")",
    "meaning": "Computes shipping cost limited to status = Completed. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Tax Amount for Completed by status",
    "code": "SELECT SUM(tax_amount) AS total_tax_amount FROM orders WHERE status = 'Completed';",
    "meaning": "Computes tax amount limited to status = Completed. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Refund Amount for Completed by status",
    "code": "Refund Amount Completed = CALCULATE(SUM(Orders[refund_amount]), Orders[status] = \"Completed\")",
    "meaning": "Computes refund amount limited to status = Completed. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Order Value for Completed by status",
    "code": "Table.Group(Table.SelectRows(Source, each [status] = \"Completed\"), {}, {{\"Total\", each List.Sum([order_value]), type nullable number}})",
    "meaning": "Computes order value limited to status = Completed. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Net Revenue for Electronics by category",
    "code": "Table.Group(Table.SelectRows(Source, each [category] = \"Electronics\"), {}, {{\"Total\", each List.Sum([net_sales]), type nullable number}})",
    "meaning": "Computes net revenue limited to category = Electronics. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Gross Sales for Electronics by category",
    "code": "=SUMIFS(Orders[gross_sales],Orders[category],\"Electronics\")",
    "meaning": "Computes gross sales limited to category = Electronics. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Cost for Electronics by category",
    "code": "SELECT SUM(cost) AS total_cost FROM orders WHERE category = 'Electronics';",
    "meaning": "Computes cost limited to category = Electronics. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Profit for Electronics by category",
    "code": "Profit Electronics = CALCULATE(SUM(Orders[profit]), Orders[category] = \"Electronics\")",
    "meaning": "Computes profit limited to category = Electronics. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Units Sold for Electronics by category",
    "code": "Table.Group(Table.SelectRows(Source, each [category] = \"Electronics\"), {}, {{\"Total\", each List.Sum([quantity]), type nullable number}})",
    "meaning": "Computes units sold limited to category = Electronics. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Discount Amount for Electronics by category",
    "code": "=SUMIFS(Orders[discount_amount],Orders[category],\"Electronics\")",
    "meaning": "Computes discount amount limited to category = Electronics. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Shipping Cost for Electronics by category",
    "code": "SELECT SUM(shipping_cost) AS total_shipping_cost FROM orders WHERE category = 'Electronics';",
    "meaning": "Computes shipping cost limited to category = Electronics. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Tax Amount for Electronics by category",
    "code": "Tax Amount Electronics = CALCULATE(SUM(Orders[tax_amount]), Orders[category] = \"Electronics\")",
    "meaning": "Computes tax amount limited to category = Electronics. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Refund Amount for Electronics by category",
    "code": "Table.Group(Table.SelectRows(Source, each [category] = \"Electronics\"), {}, {{\"Total\", each List.Sum([refund_amount]), type nullable number}})",
    "meaning": "Computes refund amount limited to category = Electronics. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Order Value for Electronics by category",
    "code": "=SUMIFS(Orders[order_value],Orders[category],\"Electronics\")",
    "meaning": "Computes order value limited to category = Electronics. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Net Revenue for Ada by sales rep",
    "code": "=SUMIFS(Orders[net_sales],Orders[sales_rep],\"Ada\")",
    "meaning": "Computes net revenue limited to sales rep = Ada. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Gross Sales for Ada by sales rep",
    "code": "SELECT SUM(gross_sales) AS total_gross_sales FROM orders WHERE sales_rep = 'Ada';",
    "meaning": "Computes gross sales limited to sales rep = Ada. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Cost for Ada by sales rep",
    "code": "Cost Ada = CALCULATE(SUM(Orders[cost]), Orders[sales_rep] = \"Ada\")",
    "meaning": "Computes cost limited to sales rep = Ada. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Profit for Ada by sales rep",
    "code": "Table.Group(Table.SelectRows(Source, each [sales_rep] = \"Ada\"), {}, {{\"Total\", each List.Sum([profit]), type nullable number}})",
    "meaning": "Computes profit limited to sales rep = Ada. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Units Sold for Ada by sales rep",
    "code": "=SUMIFS(Orders[quantity],Orders[sales_rep],\"Ada\")",
    "meaning": "Computes units sold limited to sales rep = Ada. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Discount Amount for Ada by sales rep",
    "code": "SELECT SUM(discount_amount) AS total_discount_amount FROM orders WHERE sales_rep = 'Ada';",
    "meaning": "Computes discount amount limited to sales rep = Ada. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Shipping Cost for Ada by sales rep",
    "code": "Shipping Cost Ada = CALCULATE(SUM(Orders[shipping_cost]), Orders[sales_rep] = \"Ada\")",
    "meaning": "Computes shipping cost limited to sales rep = Ada. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Tax Amount for Ada by sales rep",
    "code": "Table.Group(Table.SelectRows(Source, each [sales_rep] = \"Ada\"), {}, {{\"Total\", each List.Sum([tax_amount]), type nullable number}})",
    "meaning": "Computes tax amount limited to sales rep = Ada. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Refund Amount for Ada by sales rep",
    "code": "=SUMIFS(Orders[refund_amount],Orders[sales_rep],\"Ada\")",
    "meaning": "Computes refund amount limited to sales rep = Ada. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Order Value for Ada by sales rep",
    "code": "SELECT SUM(order_value) AS total_order_value FROM orders WHERE sales_rep = 'Ada';",
    "meaning": "Computes order value limited to sales rep = Ada. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Net Revenue for Nigeria by country",
    "code": "SELECT SUM(net_sales) AS total_net_sales FROM orders WHERE country = 'Nigeria';",
    "meaning": "Computes net revenue limited to country = Nigeria. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Gross Sales for Nigeria by country",
    "code": "Gross Sales Nigeria = CALCULATE(SUM(Orders[gross_sales]), Orders[country] = \"Nigeria\")",
    "meaning": "Computes gross sales limited to country = Nigeria. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Cost for Nigeria by country",
    "code": "Table.Group(Table.SelectRows(Source, each [country] = \"Nigeria\"), {}, {{\"Total\", each List.Sum([cost]), type nullable number}})",
    "meaning": "Computes cost limited to country = Nigeria. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Profit for Nigeria by country",
    "code": "=SUMIFS(Orders[profit],Orders[country],\"Nigeria\")",
    "meaning": "Computes profit limited to country = Nigeria. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Units Sold for Nigeria by country",
    "code": "SELECT SUM(quantity) AS total_quantity FROM orders WHERE country = 'Nigeria';",
    "meaning": "Computes units sold limited to country = Nigeria. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Discount Amount for Nigeria by country",
    "code": "Discount Amount Nigeria = CALCULATE(SUM(Orders[discount_amount]), Orders[country] = \"Nigeria\")",
    "meaning": "Computes discount amount limited to country = Nigeria. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Shipping Cost for Nigeria by country",
    "code": "Table.Group(Table.SelectRows(Source, each [country] = \"Nigeria\"), {}, {{\"Total\", each List.Sum([shipping_cost]), type nullable number}})",
    "meaning": "Computes shipping cost limited to country = Nigeria. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Tax Amount for Nigeria by country",
    "code": "=SUMIFS(Orders[tax_amount],Orders[country],\"Nigeria\")",
    "meaning": "Computes tax amount limited to country = Nigeria. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Refund Amount for Nigeria by country",
    "code": "SELECT SUM(refund_amount) AS total_refund_amount FROM orders WHERE country = 'Nigeria';",
    "meaning": "Computes refund amount limited to country = Nigeria. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Order Value for Nigeria by country",
    "code": "Order Value Nigeria = CALCULATE(SUM(Orders[order_value]), Orders[country] = \"Nigeria\")",
    "meaning": "Computes order value limited to country = Nigeria. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Net Revenue for Retail by segment",
    "code": "Net Sales Retail = CALCULATE(SUM(Orders[net_sales]), Orders[segment] = \"Retail\")",
    "meaning": "Computes net revenue limited to segment = Retail. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Gross Sales for Retail by segment",
    "code": "Table.Group(Table.SelectRows(Source, each [segment] = \"Retail\"), {}, {{\"Total\", each List.Sum([gross_sales]), type nullable number}})",
    "meaning": "Computes gross sales limited to segment = Retail. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Cost for Retail by segment",
    "code": "=SUMIFS(Orders[cost],Orders[segment],\"Retail\")",
    "meaning": "Computes cost limited to segment = Retail. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Profit for Retail by segment",
    "code": "SELECT SUM(profit) AS total_profit FROM orders WHERE segment = 'Retail';",
    "meaning": "Computes profit limited to segment = Retail. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Units Sold for Retail by segment",
    "code": "Quantity Retail = CALCULATE(SUM(Orders[quantity]), Orders[segment] = \"Retail\")",
    "meaning": "Computes units sold limited to segment = Retail. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Discount Amount for Retail by segment",
    "code": "Table.Group(Table.SelectRows(Source, each [segment] = \"Retail\"), {}, {{\"Total\", each List.Sum([discount_amount]), type nullable number}})",
    "meaning": "Computes discount amount limited to segment = Retail. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Shipping Cost for Retail by segment",
    "code": "=SUMIFS(Orders[shipping_cost],Orders[segment],\"Retail\")",
    "meaning": "Computes shipping cost limited to segment = Retail. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Tax Amount for Retail by segment",
    "code": "SELECT SUM(tax_amount) AS total_tax_amount FROM orders WHERE segment = 'Retail';",
    "meaning": "Computes tax amount limited to segment = Retail. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Refund Amount for Retail by segment",
    "code": "Refund Amount Retail = CALCULATE(SUM(Orders[refund_amount]), Orders[segment] = \"Retail\")",
    "meaning": "Computes refund amount limited to segment = Retail. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Order Value for Retail by segment",
    "code": "Table.Group(Table.SelectRows(Source, each [segment] = \"Retail\"), {}, {{\"Total\", each List.Sum([order_value]), type nullable number}})",
    "meaning": "Computes order value limited to segment = Retail. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Net Revenue for Lagos by warehouse",
    "code": "Table.Group(Table.SelectRows(Source, each [warehouse] = \"Lagos\"), {}, {{\"Total\", each List.Sum([net_sales]), type nullable number}})",
    "meaning": "Computes net revenue limited to warehouse = Lagos. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Gross Sales for Lagos by warehouse",
    "code": "=SUMIFS(Orders[gross_sales],Orders[warehouse],\"Lagos\")",
    "meaning": "Computes gross sales limited to warehouse = Lagos. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Cost for Lagos by warehouse",
    "code": "SELECT SUM(cost) AS total_cost FROM orders WHERE warehouse = 'Lagos';",
    "meaning": "Computes cost limited to warehouse = Lagos. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Profit for Lagos by warehouse",
    "code": "Profit Lagos = CALCULATE(SUM(Orders[profit]), Orders[warehouse] = \"Lagos\")",
    "meaning": "Computes profit limited to warehouse = Lagos. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Units Sold for Lagos by warehouse",
    "code": "Table.Group(Table.SelectRows(Source, each [warehouse] = \"Lagos\"), {}, {{\"Total\", each List.Sum([quantity]), type nullable number}})",
    "meaning": "Computes units sold limited to warehouse = Lagos. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Discount Amount for Lagos by warehouse",
    "code": "=SUMIFS(Orders[discount_amount],Orders[warehouse],\"Lagos\")",
    "meaning": "Computes discount amount limited to warehouse = Lagos. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Shipping Cost for Lagos by warehouse",
    "code": "SELECT SUM(shipping_cost) AS total_shipping_cost FROM orders WHERE warehouse = 'Lagos';",
    "meaning": "Computes shipping cost limited to warehouse = Lagos. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Tax Amount for Lagos by warehouse",
    "code": "Tax Amount Lagos = CALCULATE(SUM(Orders[tax_amount]), Orders[warehouse] = \"Lagos\")",
    "meaning": "Computes tax amount limited to warehouse = Lagos. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Refund Amount for Lagos by warehouse",
    "code": "Table.Group(Table.SelectRows(Source, each [warehouse] = \"Lagos\"), {}, {{\"Total\", each List.Sum([refund_amount]), type nullable number}})",
    "meaning": "Computes refund amount limited to warehouse = Lagos. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Order Value for Lagos by warehouse",
    "code": "=SUMIFS(Orders[order_value],Orders[warehouse],\"Lagos\")",
    "meaning": "Computes order value limited to warehouse = Lagos. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Net Revenue for NGN by currency",
    "code": "=SUMIFS(Orders[net_sales],Orders[currency],\"NGN\")",
    "meaning": "Computes net revenue limited to currency = NGN. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Gross Sales for NGN by currency",
    "code": "SELECT SUM(gross_sales) AS total_gross_sales FROM orders WHERE currency = 'NGN';",
    "meaning": "Computes gross sales limited to currency = NGN. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Cost for NGN by currency",
    "code": "Cost NGN = CALCULATE(SUM(Orders[cost]), Orders[currency] = \"NGN\")",
    "meaning": "Computes cost limited to currency = NGN. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Profit for NGN by currency",
    "code": "Table.Group(Table.SelectRows(Source, each [currency] = \"NGN\"), {}, {{\"Total\", each List.Sum([profit]), type nullable number}})",
    "meaning": "Computes profit limited to currency = NGN. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Units Sold for NGN by currency",
    "code": "=SUMIFS(Orders[quantity],Orders[currency],\"NGN\")",
    "meaning": "Computes units sold limited to currency = NGN. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Discount Amount for NGN by currency",
    "code": "SELECT SUM(discount_amount) AS total_discount_amount FROM orders WHERE currency = 'NGN';",
    "meaning": "Computes discount amount limited to currency = NGN. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Shipping Cost for NGN by currency",
    "code": "Shipping Cost NGN = CALCULATE(SUM(Orders[shipping_cost]), Orders[currency] = \"NGN\")",
    "meaning": "Computes shipping cost limited to currency = NGN. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Tax Amount for NGN by currency",
    "code": "Table.Group(Table.SelectRows(Source, each [currency] = \"NGN\"), {}, {{\"Total\", each List.Sum([tax_amount]), type nullable number}})",
    "meaning": "Computes tax amount limited to currency = NGN. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Refund Amount for NGN by currency",
    "code": "=SUMIFS(Orders[refund_amount],Orders[currency],\"NGN\")",
    "meaning": "Computes refund amount limited to currency = NGN. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Order Value for NGN by currency",
    "code": "SELECT SUM(order_value) AS total_order_value FROM orders WHERE currency = 'NGN';",
    "meaning": "Computes order value limited to currency = NGN. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Net Revenue for Card by payment method",
    "code": "SELECT SUM(net_sales) AS total_net_sales FROM orders WHERE payment_method = 'Card';",
    "meaning": "Computes net revenue limited to payment method = Card. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Gross Sales for Card by payment method",
    "code": "Gross Sales Card = CALCULATE(SUM(Orders[gross_sales]), Orders[payment_method] = \"Card\")",
    "meaning": "Computes gross sales limited to payment method = Card. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Cost for Card by payment method",
    "code": "Table.Group(Table.SelectRows(Source, each [payment_method] = \"Card\"), {}, {{\"Total\", each List.Sum([cost]), type nullable number}})",
    "meaning": "Computes cost limited to payment method = Card. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Profit for Card by payment method",
    "code": "=SUMIFS(Orders[profit],Orders[payment_method],\"Card\")",
    "meaning": "Computes profit limited to payment method = Card. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Units Sold for Card by payment method",
    "code": "SELECT SUM(quantity) AS total_quantity FROM orders WHERE payment_method = 'Card';",
    "meaning": "Computes units sold limited to payment method = Card. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Discount Amount for Card by payment method",
    "code": "Discount Amount Card = CALCULATE(SUM(Orders[discount_amount]), Orders[payment_method] = \"Card\")",
    "meaning": "Computes discount amount limited to payment method = Card. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Shipping Cost for Card by payment method",
    "code": "Table.Group(Table.SelectRows(Source, each [payment_method] = \"Card\"), {}, {{\"Total\", each List.Sum([shipping_cost]), type nullable number}})",
    "meaning": "Computes shipping cost limited to payment method = Card. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Check data types, null handling and query folding. This transforms the loaded table rather than creating a dynamic measure.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Tax Amount for Card by payment method",
    "code": "=SUMIFS(Orders[tax_amount],Orders[payment_method],\"Card\")",
    "meaning": "Computes tax amount limited to payment method = Card. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "Ensure the metric is numeric, each criteria range aligns with the sum range, and the business definition includes the right transaction statuses.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "Refund Amount for Card by payment method",
    "code": "SELECT SUM(refund_amount) AS total_refund_amount FROM orders WHERE payment_method = 'Card';",
    "meaning": "Computes refund amount limited to payment method = Card. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "SQL SUM ignores NULLs and returns NULL if no non-null values qualify; apply status and date filters consistently.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "Order Value for Card by payment method",
    "code": "Order Value Card = CALCULATE(SUM(Orders[order_value]), Orders[payment_method] = \"Card\")",
    "meaning": "Computes order value limited to payment method = Card. The metric is assumed to be a numeric column in the fictional retail Orders dataset. Compare the result with an unfiltered total and document currency/units.",
    "watch": "CALCULATE adds or replaces a filter on the specified column. Other slicer filters still apply; validate relationships.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze net revenue across region",
    "code": "SELECT region, AVG(net_sales) AS avg_net_sales FROM orders WHERE net_sales IS NOT NULL GROUP BY region ORDER BY avg_net_sales DESC;",
    "meaning": "Computes average net revenue by region, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze gross sales across region",
    "code": "Average Gross Sales = AVERAGE(Orders[gross_sales])",
    "meaning": "Calculates average gross sales in the current filter context; put region on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze cost across region",
    "code": "Table.Group(Source, {\"region\"}, {{\"Average cost\", each List.Average(List.RemoveNulls([cost])), type nullable number}})",
    "meaning": "Groups by region and finds mean non-null cost.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze profit across region",
    "code": "=COUNTIFS(Orders[region],\"North\",Orders[profit],\">0\")",
    "meaning": "Counts rows for North with a positive profit value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze units sold across region",
    "code": "SELECT region, AVG(quantity) AS avg_quantity FROM orders WHERE quantity IS NOT NULL GROUP BY region ORDER BY avg_quantity DESC;",
    "meaning": "Computes average units sold by region, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze discount amount across region",
    "code": "Average Discount Amount = AVERAGE(Orders[discount_amount])",
    "meaning": "Calculates average discount amount in the current filter context; put region on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze shipping cost across region",
    "code": "Table.Group(Source, {\"region\"}, {{\"Average shipping_cost\", each List.Average(List.RemoveNulls([shipping_cost])), type nullable number}})",
    "meaning": "Groups by region and finds mean non-null shipping cost.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze tax amount across region",
    "code": "=COUNTIFS(Orders[region],\"North\",Orders[tax_amount],\">0\")",
    "meaning": "Counts rows for North with a positive tax amount value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze refund amount across region",
    "code": "SELECT region, AVG(refund_amount) AS avg_refund_amount FROM orders WHERE refund_amount IS NOT NULL GROUP BY region ORDER BY avg_refund_amount DESC;",
    "meaning": "Computes average refund amount by region, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze order value across region",
    "code": "Average Order Value = AVERAGE(Orders[order_value])",
    "meaning": "Calculates average order value in the current filter context; put region on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze net revenue across channel",
    "code": "Average Net Sales = AVERAGE(Orders[net_sales])",
    "meaning": "Calculates average net revenue in the current filter context; put channel on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze gross sales across channel",
    "code": "Table.Group(Source, {\"channel\"}, {{\"Average gross_sales\", each List.Average(List.RemoveNulls([gross_sales])), type nullable number}})",
    "meaning": "Groups by channel and finds mean non-null gross sales.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze cost across channel",
    "code": "=COUNTIFS(Orders[channel],\"Online\",Orders[cost],\">0\")",
    "meaning": "Counts rows for Online with a positive cost value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze profit across channel",
    "code": "SELECT channel, AVG(profit) AS avg_profit FROM orders WHERE profit IS NOT NULL GROUP BY channel ORDER BY avg_profit DESC;",
    "meaning": "Computes average profit by channel, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze units sold across channel",
    "code": "Average Quantity = AVERAGE(Orders[quantity])",
    "meaning": "Calculates average units sold in the current filter context; put channel on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze discount amount across channel",
    "code": "Table.Group(Source, {\"channel\"}, {{\"Average discount_amount\", each List.Average(List.RemoveNulls([discount_amount])), type nullable number}})",
    "meaning": "Groups by channel and finds mean non-null discount amount.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze shipping cost across channel",
    "code": "=COUNTIFS(Orders[channel],\"Online\",Orders[shipping_cost],\">0\")",
    "meaning": "Counts rows for Online with a positive shipping cost value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze tax amount across channel",
    "code": "SELECT channel, AVG(tax_amount) AS avg_tax_amount FROM orders WHERE tax_amount IS NOT NULL GROUP BY channel ORDER BY avg_tax_amount DESC;",
    "meaning": "Computes average tax amount by channel, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze refund amount across channel",
    "code": "Average Refund Amount = AVERAGE(Orders[refund_amount])",
    "meaning": "Calculates average refund amount in the current filter context; put channel on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze order value across channel",
    "code": "Table.Group(Source, {\"channel\"}, {{\"Average order_value\", each List.Average(List.RemoveNulls([order_value])), type nullable number}})",
    "meaning": "Groups by channel and finds mean non-null order value.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze net revenue across status",
    "code": "Table.Group(Source, {\"status\"}, {{\"Average net_sales\", each List.Average(List.RemoveNulls([net_sales])), type nullable number}})",
    "meaning": "Groups by status and finds mean non-null net revenue.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze gross sales across status",
    "code": "=COUNTIFS(Orders[status],\"Completed\",Orders[gross_sales],\">0\")",
    "meaning": "Counts rows for Completed with a positive gross sales value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze cost across status",
    "code": "SELECT status, AVG(cost) AS avg_cost FROM orders WHERE cost IS NOT NULL GROUP BY status ORDER BY avg_cost DESC;",
    "meaning": "Computes average cost by status, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze profit across status",
    "code": "Average Profit = AVERAGE(Orders[profit])",
    "meaning": "Calculates average profit in the current filter context; put status on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze units sold across status",
    "code": "Table.Group(Source, {\"status\"}, {{\"Average quantity\", each List.Average(List.RemoveNulls([quantity])), type nullable number}})",
    "meaning": "Groups by status and finds mean non-null units sold.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze discount amount across status",
    "code": "=COUNTIFS(Orders[status],\"Completed\",Orders[discount_amount],\">0\")",
    "meaning": "Counts rows for Completed with a positive discount amount value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze shipping cost across status",
    "code": "SELECT status, AVG(shipping_cost) AS avg_shipping_cost FROM orders WHERE shipping_cost IS NOT NULL GROUP BY status ORDER BY avg_shipping_cost DESC;",
    "meaning": "Computes average shipping cost by status, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze tax amount across status",
    "code": "Average Tax Amount = AVERAGE(Orders[tax_amount])",
    "meaning": "Calculates average tax amount in the current filter context; put status on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze refund amount across status",
    "code": "Table.Group(Source, {\"status\"}, {{\"Average refund_amount\", each List.Average(List.RemoveNulls([refund_amount])), type nullable number}})",
    "meaning": "Groups by status and finds mean non-null refund amount.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze order value across status",
    "code": "=COUNTIFS(Orders[status],\"Completed\",Orders[order_value],\">0\")",
    "meaning": "Counts rows for Completed with a positive order value value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze net revenue across category",
    "code": "=COUNTIFS(Orders[category],\"Electronics\",Orders[net_sales],\">0\")",
    "meaning": "Counts rows for Electronics with a positive net revenue value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze gross sales across category",
    "code": "SELECT category, AVG(gross_sales) AS avg_gross_sales FROM orders WHERE gross_sales IS NOT NULL GROUP BY category ORDER BY avg_gross_sales DESC;",
    "meaning": "Computes average gross sales by category, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze cost across category",
    "code": "Average Cost = AVERAGE(Orders[cost])",
    "meaning": "Calculates average cost in the current filter context; put category on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze profit across category",
    "code": "Table.Group(Source, {\"category\"}, {{\"Average profit\", each List.Average(List.RemoveNulls([profit])), type nullable number}})",
    "meaning": "Groups by category and finds mean non-null profit.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze units sold across category",
    "code": "=COUNTIFS(Orders[category],\"Electronics\",Orders[quantity],\">0\")",
    "meaning": "Counts rows for Electronics with a positive units sold value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze discount amount across category",
    "code": "SELECT category, AVG(discount_amount) AS avg_discount_amount FROM orders WHERE discount_amount IS NOT NULL GROUP BY category ORDER BY avg_discount_amount DESC;",
    "meaning": "Computes average discount amount by category, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze shipping cost across category",
    "code": "Average Shipping Cost = AVERAGE(Orders[shipping_cost])",
    "meaning": "Calculates average shipping cost in the current filter context; put category on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze tax amount across category",
    "code": "Table.Group(Source, {\"category\"}, {{\"Average tax_amount\", each List.Average(List.RemoveNulls([tax_amount])), type nullable number}})",
    "meaning": "Groups by category and finds mean non-null tax amount.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze refund amount across category",
    "code": "=COUNTIFS(Orders[category],\"Electronics\",Orders[refund_amount],\">0\")",
    "meaning": "Counts rows for Electronics with a positive refund amount value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze order value across category",
    "code": "SELECT category, AVG(order_value) AS avg_order_value FROM orders WHERE order_value IS NOT NULL GROUP BY category ORDER BY avg_order_value DESC;",
    "meaning": "Computes average order value by category, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze net revenue across sales rep",
    "code": "SELECT sales_rep, AVG(net_sales) AS avg_net_sales FROM orders WHERE net_sales IS NOT NULL GROUP BY sales_rep ORDER BY avg_net_sales DESC;",
    "meaning": "Computes average net revenue by sales rep, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze gross sales across sales rep",
    "code": "Average Gross Sales = AVERAGE(Orders[gross_sales])",
    "meaning": "Calculates average gross sales in the current filter context; put sales rep on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze cost across sales rep",
    "code": "Table.Group(Source, {\"sales_rep\"}, {{\"Average cost\", each List.Average(List.RemoveNulls([cost])), type nullable number}})",
    "meaning": "Groups by sales rep and finds mean non-null cost.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze profit across sales rep",
    "code": "=COUNTIFS(Orders[sales_rep],\"Ada\",Orders[profit],\">0\")",
    "meaning": "Counts rows for Ada with a positive profit value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze units sold across sales rep",
    "code": "SELECT sales_rep, AVG(quantity) AS avg_quantity FROM orders WHERE quantity IS NOT NULL GROUP BY sales_rep ORDER BY avg_quantity DESC;",
    "meaning": "Computes average units sold by sales rep, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze discount amount across sales rep",
    "code": "Average Discount Amount = AVERAGE(Orders[discount_amount])",
    "meaning": "Calculates average discount amount in the current filter context; put sales rep on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze shipping cost across sales rep",
    "code": "Table.Group(Source, {\"sales_rep\"}, {{\"Average shipping_cost\", each List.Average(List.RemoveNulls([shipping_cost])), type nullable number}})",
    "meaning": "Groups by sales rep and finds mean non-null shipping cost.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze tax amount across sales rep",
    "code": "=COUNTIFS(Orders[sales_rep],\"Ada\",Orders[tax_amount],\">0\")",
    "meaning": "Counts rows for Ada with a positive tax amount value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze refund amount across sales rep",
    "code": "SELECT sales_rep, AVG(refund_amount) AS avg_refund_amount FROM orders WHERE refund_amount IS NOT NULL GROUP BY sales_rep ORDER BY avg_refund_amount DESC;",
    "meaning": "Computes average refund amount by sales rep, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze order value across sales rep",
    "code": "Average Order Value = AVERAGE(Orders[order_value])",
    "meaning": "Calculates average order value in the current filter context; put sales rep on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze net revenue across country",
    "code": "Average Net Sales = AVERAGE(Orders[net_sales])",
    "meaning": "Calculates average net revenue in the current filter context; put country on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze gross sales across country",
    "code": "Table.Group(Source, {\"country\"}, {{\"Average gross_sales\", each List.Average(List.RemoveNulls([gross_sales])), type nullable number}})",
    "meaning": "Groups by country and finds mean non-null gross sales.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze cost across country",
    "code": "=COUNTIFS(Orders[country],\"Nigeria\",Orders[cost],\">0\")",
    "meaning": "Counts rows for Nigeria with a positive cost value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze profit across country",
    "code": "SELECT country, AVG(profit) AS avg_profit FROM orders WHERE profit IS NOT NULL GROUP BY country ORDER BY avg_profit DESC;",
    "meaning": "Computes average profit by country, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze units sold across country",
    "code": "Average Quantity = AVERAGE(Orders[quantity])",
    "meaning": "Calculates average units sold in the current filter context; put country on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze discount amount across country",
    "code": "Table.Group(Source, {\"country\"}, {{\"Average discount_amount\", each List.Average(List.RemoveNulls([discount_amount])), type nullable number}})",
    "meaning": "Groups by country and finds mean non-null discount amount.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze shipping cost across country",
    "code": "=COUNTIFS(Orders[country],\"Nigeria\",Orders[shipping_cost],\">0\")",
    "meaning": "Counts rows for Nigeria with a positive shipping cost value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze tax amount across country",
    "code": "SELECT country, AVG(tax_amount) AS avg_tax_amount FROM orders WHERE tax_amount IS NOT NULL GROUP BY country ORDER BY avg_tax_amount DESC;",
    "meaning": "Computes average tax amount by country, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze refund amount across country",
    "code": "Average Refund Amount = AVERAGE(Orders[refund_amount])",
    "meaning": "Calculates average refund amount in the current filter context; put country on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze order value across country",
    "code": "Table.Group(Source, {\"country\"}, {{\"Average order_value\", each List.Average(List.RemoveNulls([order_value])), type nullable number}})",
    "meaning": "Groups by country and finds mean non-null order value.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze net revenue across segment",
    "code": "Table.Group(Source, {\"segment\"}, {{\"Average net_sales\", each List.Average(List.RemoveNulls([net_sales])), type nullable number}})",
    "meaning": "Groups by segment and finds mean non-null net revenue.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze gross sales across segment",
    "code": "=COUNTIFS(Orders[segment],\"Retail\",Orders[gross_sales],\">0\")",
    "meaning": "Counts rows for Retail with a positive gross sales value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze cost across segment",
    "code": "SELECT segment, AVG(cost) AS avg_cost FROM orders WHERE cost IS NOT NULL GROUP BY segment ORDER BY avg_cost DESC;",
    "meaning": "Computes average cost by segment, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze profit across segment",
    "code": "Average Profit = AVERAGE(Orders[profit])",
    "meaning": "Calculates average profit in the current filter context; put segment on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze units sold across segment",
    "code": "Table.Group(Source, {\"segment\"}, {{\"Average quantity\", each List.Average(List.RemoveNulls([quantity])), type nullable number}})",
    "meaning": "Groups by segment and finds mean non-null units sold.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze discount amount across segment",
    "code": "=COUNTIFS(Orders[segment],\"Retail\",Orders[discount_amount],\">0\")",
    "meaning": "Counts rows for Retail with a positive discount amount value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze shipping cost across segment",
    "code": "SELECT segment, AVG(shipping_cost) AS avg_shipping_cost FROM orders WHERE shipping_cost IS NOT NULL GROUP BY segment ORDER BY avg_shipping_cost DESC;",
    "meaning": "Computes average shipping cost by segment, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze tax amount across segment",
    "code": "Average Tax Amount = AVERAGE(Orders[tax_amount])",
    "meaning": "Calculates average tax amount in the current filter context; put segment on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze refund amount across segment",
    "code": "Table.Group(Source, {\"segment\"}, {{\"Average refund_amount\", each List.Average(List.RemoveNulls([refund_amount])), type nullable number}})",
    "meaning": "Groups by segment and finds mean non-null refund amount.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze order value across segment",
    "code": "=COUNTIFS(Orders[segment],\"Retail\",Orders[order_value],\">0\")",
    "meaning": "Counts rows for Retail with a positive order value value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze net revenue across warehouse",
    "code": "=COUNTIFS(Orders[warehouse],\"Lagos\",Orders[net_sales],\">0\")",
    "meaning": "Counts rows for Lagos with a positive net revenue value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze gross sales across warehouse",
    "code": "SELECT warehouse, AVG(gross_sales) AS avg_gross_sales FROM orders WHERE gross_sales IS NOT NULL GROUP BY warehouse ORDER BY avg_gross_sales DESC;",
    "meaning": "Computes average gross sales by warehouse, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze cost across warehouse",
    "code": "Average Cost = AVERAGE(Orders[cost])",
    "meaning": "Calculates average cost in the current filter context; put warehouse on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze profit across warehouse",
    "code": "Table.Group(Source, {\"warehouse\"}, {{\"Average profit\", each List.Average(List.RemoveNulls([profit])), type nullable number}})",
    "meaning": "Groups by warehouse and finds mean non-null profit.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze units sold across warehouse",
    "code": "=COUNTIFS(Orders[warehouse],\"Lagos\",Orders[quantity],\">0\")",
    "meaning": "Counts rows for Lagos with a positive units sold value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze discount amount across warehouse",
    "code": "SELECT warehouse, AVG(discount_amount) AS avg_discount_amount FROM orders WHERE discount_amount IS NOT NULL GROUP BY warehouse ORDER BY avg_discount_amount DESC;",
    "meaning": "Computes average discount amount by warehouse, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze shipping cost across warehouse",
    "code": "Average Shipping Cost = AVERAGE(Orders[shipping_cost])",
    "meaning": "Calculates average shipping cost in the current filter context; put warehouse on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze tax amount across warehouse",
    "code": "Table.Group(Source, {\"warehouse\"}, {{\"Average tax_amount\", each List.Average(List.RemoveNulls([tax_amount])), type nullable number}})",
    "meaning": "Groups by warehouse and finds mean non-null tax amount.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze refund amount across warehouse",
    "code": "=COUNTIFS(Orders[warehouse],\"Lagos\",Orders[refund_amount],\">0\")",
    "meaning": "Counts rows for Lagos with a positive refund amount value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze order value across warehouse",
    "code": "SELECT warehouse, AVG(order_value) AS avg_order_value FROM orders WHERE order_value IS NOT NULL GROUP BY warehouse ORDER BY avg_order_value DESC;",
    "meaning": "Computes average order value by warehouse, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze net revenue across currency",
    "code": "SELECT currency, AVG(net_sales) AS avg_net_sales FROM orders WHERE net_sales IS NOT NULL GROUP BY currency ORDER BY avg_net_sales DESC;",
    "meaning": "Computes average net revenue by currency, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze gross sales across currency",
    "code": "Average Gross Sales = AVERAGE(Orders[gross_sales])",
    "meaning": "Calculates average gross sales in the current filter context; put currency on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze cost across currency",
    "code": "Table.Group(Source, {\"currency\"}, {{\"Average cost\", each List.Average(List.RemoveNulls([cost])), type nullable number}})",
    "meaning": "Groups by currency and finds mean non-null cost.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze profit across currency",
    "code": "=COUNTIFS(Orders[currency],\"NGN\",Orders[profit],\">0\")",
    "meaning": "Counts rows for NGN with a positive profit value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze units sold across currency",
    "code": "SELECT currency, AVG(quantity) AS avg_quantity FROM orders WHERE quantity IS NOT NULL GROUP BY currency ORDER BY avg_quantity DESC;",
    "meaning": "Computes average units sold by currency, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze discount amount across currency",
    "code": "Average Discount Amount = AVERAGE(Orders[discount_amount])",
    "meaning": "Calculates average discount amount in the current filter context; put currency on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze shipping cost across currency",
    "code": "Table.Group(Source, {\"currency\"}, {{\"Average shipping_cost\", each List.Average(List.RemoveNulls([shipping_cost])), type nullable number}})",
    "meaning": "Groups by currency and finds mean non-null shipping cost.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze tax amount across currency",
    "code": "=COUNTIFS(Orders[currency],\"NGN\",Orders[tax_amount],\">0\")",
    "meaning": "Counts rows for NGN with a positive tax amount value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze refund amount across currency",
    "code": "SELECT currency, AVG(refund_amount) AS avg_refund_amount FROM orders WHERE refund_amount IS NOT NULL GROUP BY currency ORDER BY avg_refund_amount DESC;",
    "meaning": "Computes average refund amount by currency, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze order value across currency",
    "code": "Average Order Value = AVERAGE(Orders[order_value])",
    "meaning": "Calculates average order value in the current filter context; put currency on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze net revenue across payment method",
    "code": "Average Net Sales = AVERAGE(Orders[net_sales])",
    "meaning": "Calculates average net revenue in the current filter context; put payment method on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze gross sales across payment method",
    "code": "Table.Group(Source, {\"payment_method\"}, {{\"Average gross_sales\", each List.Average(List.RemoveNulls([gross_sales])), type nullable number}})",
    "meaning": "Groups by payment method and finds mean non-null gross sales.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze cost across payment method",
    "code": "=COUNTIFS(Orders[payment_method],\"Card\",Orders[cost],\">0\")",
    "meaning": "Counts rows for Card with a positive cost value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze profit across payment method",
    "code": "SELECT payment_method, AVG(profit) AS avg_profit FROM orders WHERE profit IS NOT NULL GROUP BY payment_method ORDER BY avg_profit DESC;",
    "meaning": "Computes average profit by payment method, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze units sold across payment method",
    "code": "Average Quantity = AVERAGE(Orders[quantity])",
    "meaning": "Calculates average units sold in the current filter context; put payment method on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze discount amount across payment method",
    "code": "Table.Group(Source, {\"payment_method\"}, {{\"Average discount_amount\", each List.Average(List.RemoveNulls([discount_amount])), type nullable number}})",
    "meaning": "Groups by payment method and finds mean non-null discount amount.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Excel: Analyze shipping cost across payment method",
    "code": "=COUNTIFS(Orders[payment_method],\"Card\",Orders[shipping_cost],\">0\")",
    "meaning": "Counts rows for Card with a positive shipping cost value.",
    "watch": "Counts rows, not distinct orders; zero and negative values are excluded.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "SQL",
    "title": "SQL: Analyze tax amount across payment method",
    "code": "SELECT payment_method, AVG(tax_amount) AS avg_tax_amount FROM orders WHERE tax_amount IS NOT NULL GROUP BY payment_method ORDER BY avg_tax_amount DESC;",
    "meaning": "Computes average tax amount by payment method, sorted highest first.",
    "watch": "AVG excludes NULLs but includes zeros; averaging line values differs from averaging order-level totals.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "DAX",
    "title": "DAX: Analyze refund amount across payment method",
    "code": "Average Refund Amount = AVERAGE(Orders[refund_amount])",
    "meaning": "Calculates average refund amount in the current filter context; put payment method on visual rows.",
    "watch": "AVERAGE ignores blanks; use AVERAGEX over a summarized order table when you need average per order.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Power Query",
    "title": "Power Query: Analyze order value across payment method",
    "code": "Table.Group(Source, {\"payment_method\"}, {{\"Average order_value\", each List.Average(List.RemoveNulls([order_value])), type nullable number}})",
    "meaning": "Groups by payment method and finds mean non-null order value.",
    "watch": "An empty group after null removal may return null. Check numeric types and whether the mean should be weighted.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum net revenue in North",
    "code": "=MAXIFS(Orders[net_sales],Orders[region],\"North\")",
    "meaning": "Find the largest net revenue among North records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum net revenue in North",
    "code": "=MINIFS(Orders[net_sales],Orders[region],\"North\")",
    "meaning": "Find the smallest net revenue among North records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count net revenue in North",
    "code": "=COUNTIFS(Orders[region],\"North\",Orders[net_sales],\"<>\")",
    "meaning": "Count North records with a nonempty net_sales field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum net revenue in Online",
    "code": "=MAXIFS(Orders[net_sales],Orders[channel],\"Online\")",
    "meaning": "Find the largest net revenue among Online records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum net revenue in Online",
    "code": "=MINIFS(Orders[net_sales],Orders[channel],\"Online\")",
    "meaning": "Find the smallest net revenue among Online records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count net revenue in Online",
    "code": "=COUNTIFS(Orders[channel],\"Online\",Orders[net_sales],\"<>\")",
    "meaning": "Count Online records with a nonempty net_sales field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum net revenue in Completed",
    "code": "=MAXIFS(Orders[net_sales],Orders[status],\"Completed\")",
    "meaning": "Find the largest net revenue among Completed records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum net revenue in Completed",
    "code": "=MINIFS(Orders[net_sales],Orders[status],\"Completed\")",
    "meaning": "Find the smallest net revenue among Completed records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count net revenue in Completed",
    "code": "=COUNTIFS(Orders[status],\"Completed\",Orders[net_sales],\"<>\")",
    "meaning": "Count Completed records with a nonempty net_sales field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum net revenue in Electronics",
    "code": "=MAXIFS(Orders[net_sales],Orders[category],\"Electronics\")",
    "meaning": "Find the largest net revenue among Electronics records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum net revenue in Electronics",
    "code": "=MINIFS(Orders[net_sales],Orders[category],\"Electronics\")",
    "meaning": "Find the smallest net revenue among Electronics records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count net revenue in Electronics",
    "code": "=COUNTIFS(Orders[category],\"Electronics\",Orders[net_sales],\"<>\")",
    "meaning": "Count Electronics records with a nonempty net_sales field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum net revenue in Ada",
    "code": "=MAXIFS(Orders[net_sales],Orders[sales_rep],\"Ada\")",
    "meaning": "Find the largest net revenue among Ada records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum net revenue in Ada",
    "code": "=MINIFS(Orders[net_sales],Orders[sales_rep],\"Ada\")",
    "meaning": "Find the smallest net revenue among Ada records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count net revenue in Ada",
    "code": "=COUNTIFS(Orders[sales_rep],\"Ada\",Orders[net_sales],\"<>\")",
    "meaning": "Count Ada records with a nonempty net_sales field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum net revenue in Nigeria",
    "code": "=MAXIFS(Orders[net_sales],Orders[country],\"Nigeria\")",
    "meaning": "Find the largest net revenue among Nigeria records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum net revenue in Nigeria",
    "code": "=MINIFS(Orders[net_sales],Orders[country],\"Nigeria\")",
    "meaning": "Find the smallest net revenue among Nigeria records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count net revenue in Nigeria",
    "code": "=COUNTIFS(Orders[country],\"Nigeria\",Orders[net_sales],\"<>\")",
    "meaning": "Count Nigeria records with a nonempty net_sales field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum net revenue in Retail",
    "code": "=MAXIFS(Orders[net_sales],Orders[segment],\"Retail\")",
    "meaning": "Find the largest net revenue among Retail records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum net revenue in Retail",
    "code": "=MINIFS(Orders[net_sales],Orders[segment],\"Retail\")",
    "meaning": "Find the smallest net revenue among Retail records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count net revenue in Retail",
    "code": "=COUNTIFS(Orders[segment],\"Retail\",Orders[net_sales],\"<>\")",
    "meaning": "Count Retail records with a nonempty net_sales field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum net revenue in Lagos",
    "code": "=MAXIFS(Orders[net_sales],Orders[warehouse],\"Lagos\")",
    "meaning": "Find the largest net revenue among Lagos records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum net revenue in Lagos",
    "code": "=MINIFS(Orders[net_sales],Orders[warehouse],\"Lagos\")",
    "meaning": "Find the smallest net revenue among Lagos records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count net revenue in Lagos",
    "code": "=COUNTIFS(Orders[warehouse],\"Lagos\",Orders[net_sales],\"<>\")",
    "meaning": "Count Lagos records with a nonempty net_sales field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum net revenue in NGN",
    "code": "=MAXIFS(Orders[net_sales],Orders[currency],\"NGN\")",
    "meaning": "Find the largest net revenue among NGN records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum net revenue in NGN",
    "code": "=MINIFS(Orders[net_sales],Orders[currency],\"NGN\")",
    "meaning": "Find the smallest net revenue among NGN records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count net revenue in NGN",
    "code": "=COUNTIFS(Orders[currency],\"NGN\",Orders[net_sales],\"<>\")",
    "meaning": "Count NGN records with a nonempty net_sales field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum net revenue in Card",
    "code": "=MAXIFS(Orders[net_sales],Orders[payment_method],\"Card\")",
    "meaning": "Find the largest net revenue among Card records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum net revenue in Card",
    "code": "=MINIFS(Orders[net_sales],Orders[payment_method],\"Card\")",
    "meaning": "Find the smallest net revenue among Card records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count net revenue in Card",
    "code": "=COUNTIFS(Orders[payment_method],\"Card\",Orders[net_sales],\"<>\")",
    "meaning": "Count Card records with a nonempty net_sales field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum gross sales in North",
    "code": "=MAXIFS(Orders[gross_sales],Orders[region],\"North\")",
    "meaning": "Find the largest gross sales among North records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum gross sales in North",
    "code": "=MINIFS(Orders[gross_sales],Orders[region],\"North\")",
    "meaning": "Find the smallest gross sales among North records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count gross sales in North",
    "code": "=COUNTIFS(Orders[region],\"North\",Orders[gross_sales],\"<>\")",
    "meaning": "Count North records with a nonempty gross_sales field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum gross sales in Online",
    "code": "=MAXIFS(Orders[gross_sales],Orders[channel],\"Online\")",
    "meaning": "Find the largest gross sales among Online records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum gross sales in Online",
    "code": "=MINIFS(Orders[gross_sales],Orders[channel],\"Online\")",
    "meaning": "Find the smallest gross sales among Online records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count gross sales in Online",
    "code": "=COUNTIFS(Orders[channel],\"Online\",Orders[gross_sales],\"<>\")",
    "meaning": "Count Online records with a nonempty gross_sales field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum gross sales in Completed",
    "code": "=MAXIFS(Orders[gross_sales],Orders[status],\"Completed\")",
    "meaning": "Find the largest gross sales among Completed records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum gross sales in Completed",
    "code": "=MINIFS(Orders[gross_sales],Orders[status],\"Completed\")",
    "meaning": "Find the smallest gross sales among Completed records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count gross sales in Completed",
    "code": "=COUNTIFS(Orders[status],\"Completed\",Orders[gross_sales],\"<>\")",
    "meaning": "Count Completed records with a nonempty gross_sales field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum gross sales in Electronics",
    "code": "=MAXIFS(Orders[gross_sales],Orders[category],\"Electronics\")",
    "meaning": "Find the largest gross sales among Electronics records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum gross sales in Electronics",
    "code": "=MINIFS(Orders[gross_sales],Orders[category],\"Electronics\")",
    "meaning": "Find the smallest gross sales among Electronics records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count gross sales in Electronics",
    "code": "=COUNTIFS(Orders[category],\"Electronics\",Orders[gross_sales],\"<>\")",
    "meaning": "Count Electronics records with a nonempty gross_sales field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum gross sales in Ada",
    "code": "=MAXIFS(Orders[gross_sales],Orders[sales_rep],\"Ada\")",
    "meaning": "Find the largest gross sales among Ada records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum gross sales in Ada",
    "code": "=MINIFS(Orders[gross_sales],Orders[sales_rep],\"Ada\")",
    "meaning": "Find the smallest gross sales among Ada records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count gross sales in Ada",
    "code": "=COUNTIFS(Orders[sales_rep],\"Ada\",Orders[gross_sales],\"<>\")",
    "meaning": "Count Ada records with a nonempty gross_sales field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum gross sales in Nigeria",
    "code": "=MAXIFS(Orders[gross_sales],Orders[country],\"Nigeria\")",
    "meaning": "Find the largest gross sales among Nigeria records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum gross sales in Nigeria",
    "code": "=MINIFS(Orders[gross_sales],Orders[country],\"Nigeria\")",
    "meaning": "Find the smallest gross sales among Nigeria records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count gross sales in Nigeria",
    "code": "=COUNTIFS(Orders[country],\"Nigeria\",Orders[gross_sales],\"<>\")",
    "meaning": "Count Nigeria records with a nonempty gross_sales field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum gross sales in Retail",
    "code": "=MAXIFS(Orders[gross_sales],Orders[segment],\"Retail\")",
    "meaning": "Find the largest gross sales among Retail records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum gross sales in Retail",
    "code": "=MINIFS(Orders[gross_sales],Orders[segment],\"Retail\")",
    "meaning": "Find the smallest gross sales among Retail records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count gross sales in Retail",
    "code": "=COUNTIFS(Orders[segment],\"Retail\",Orders[gross_sales],\"<>\")",
    "meaning": "Count Retail records with a nonempty gross_sales field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum gross sales in Lagos",
    "code": "=MAXIFS(Orders[gross_sales],Orders[warehouse],\"Lagos\")",
    "meaning": "Find the largest gross sales among Lagos records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum gross sales in Lagos",
    "code": "=MINIFS(Orders[gross_sales],Orders[warehouse],\"Lagos\")",
    "meaning": "Find the smallest gross sales among Lagos records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count gross sales in Lagos",
    "code": "=COUNTIFS(Orders[warehouse],\"Lagos\",Orders[gross_sales],\"<>\")",
    "meaning": "Count Lagos records with a nonempty gross_sales field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum gross sales in NGN",
    "code": "=MAXIFS(Orders[gross_sales],Orders[currency],\"NGN\")",
    "meaning": "Find the largest gross sales among NGN records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum gross sales in NGN",
    "code": "=MINIFS(Orders[gross_sales],Orders[currency],\"NGN\")",
    "meaning": "Find the smallest gross sales among NGN records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count gross sales in NGN",
    "code": "=COUNTIFS(Orders[currency],\"NGN\",Orders[gross_sales],\"<>\")",
    "meaning": "Count NGN records with a nonempty gross_sales field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum gross sales in Card",
    "code": "=MAXIFS(Orders[gross_sales],Orders[payment_method],\"Card\")",
    "meaning": "Find the largest gross sales among Card records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum gross sales in Card",
    "code": "=MINIFS(Orders[gross_sales],Orders[payment_method],\"Card\")",
    "meaning": "Find the smallest gross sales among Card records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count gross sales in Card",
    "code": "=COUNTIFS(Orders[payment_method],\"Card\",Orders[gross_sales],\"<>\")",
    "meaning": "Count Card records with a nonempty gross_sales field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum cost in North",
    "code": "=MAXIFS(Orders[cost],Orders[region],\"North\")",
    "meaning": "Find the largest cost among North records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum cost in North",
    "code": "=MINIFS(Orders[cost],Orders[region],\"North\")",
    "meaning": "Find the smallest cost among North records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count cost in North",
    "code": "=COUNTIFS(Orders[region],\"North\",Orders[cost],\"<>\")",
    "meaning": "Count North records with a nonempty cost field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum cost in Online",
    "code": "=MAXIFS(Orders[cost],Orders[channel],\"Online\")",
    "meaning": "Find the largest cost among Online records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum cost in Online",
    "code": "=MINIFS(Orders[cost],Orders[channel],\"Online\")",
    "meaning": "Find the smallest cost among Online records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count cost in Online",
    "code": "=COUNTIFS(Orders[channel],\"Online\",Orders[cost],\"<>\")",
    "meaning": "Count Online records with a nonempty cost field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum cost in Completed",
    "code": "=MAXIFS(Orders[cost],Orders[status],\"Completed\")",
    "meaning": "Find the largest cost among Completed records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum cost in Completed",
    "code": "=MINIFS(Orders[cost],Orders[status],\"Completed\")",
    "meaning": "Find the smallest cost among Completed records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count cost in Completed",
    "code": "=COUNTIFS(Orders[status],\"Completed\",Orders[cost],\"<>\")",
    "meaning": "Count Completed records with a nonempty cost field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum cost in Electronics",
    "code": "=MAXIFS(Orders[cost],Orders[category],\"Electronics\")",
    "meaning": "Find the largest cost among Electronics records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum cost in Electronics",
    "code": "=MINIFS(Orders[cost],Orders[category],\"Electronics\")",
    "meaning": "Find the smallest cost among Electronics records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count cost in Electronics",
    "code": "=COUNTIFS(Orders[category],\"Electronics\",Orders[cost],\"<>\")",
    "meaning": "Count Electronics records with a nonempty cost field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum cost in Ada",
    "code": "=MAXIFS(Orders[cost],Orders[sales_rep],\"Ada\")",
    "meaning": "Find the largest cost among Ada records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum cost in Ada",
    "code": "=MINIFS(Orders[cost],Orders[sales_rep],\"Ada\")",
    "meaning": "Find the smallest cost among Ada records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count cost in Ada",
    "code": "=COUNTIFS(Orders[sales_rep],\"Ada\",Orders[cost],\"<>\")",
    "meaning": "Count Ada records with a nonempty cost field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum cost in Nigeria",
    "code": "=MAXIFS(Orders[cost],Orders[country],\"Nigeria\")",
    "meaning": "Find the largest cost among Nigeria records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum cost in Nigeria",
    "code": "=MINIFS(Orders[cost],Orders[country],\"Nigeria\")",
    "meaning": "Find the smallest cost among Nigeria records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count cost in Nigeria",
    "code": "=COUNTIFS(Orders[country],\"Nigeria\",Orders[cost],\"<>\")",
    "meaning": "Count Nigeria records with a nonempty cost field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum cost in Retail",
    "code": "=MAXIFS(Orders[cost],Orders[segment],\"Retail\")",
    "meaning": "Find the largest cost among Retail records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum cost in Retail",
    "code": "=MINIFS(Orders[cost],Orders[segment],\"Retail\")",
    "meaning": "Find the smallest cost among Retail records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count cost in Retail",
    "code": "=COUNTIFS(Orders[segment],\"Retail\",Orders[cost],\"<>\")",
    "meaning": "Count Retail records with a nonempty cost field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum cost in Lagos",
    "code": "=MAXIFS(Orders[cost],Orders[warehouse],\"Lagos\")",
    "meaning": "Find the largest cost among Lagos records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum cost in Lagos",
    "code": "=MINIFS(Orders[cost],Orders[warehouse],\"Lagos\")",
    "meaning": "Find the smallest cost among Lagos records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count cost in Lagos",
    "code": "=COUNTIFS(Orders[warehouse],\"Lagos\",Orders[cost],\"<>\")",
    "meaning": "Count Lagos records with a nonempty cost field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum cost in NGN",
    "code": "=MAXIFS(Orders[cost],Orders[currency],\"NGN\")",
    "meaning": "Find the largest cost among NGN records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum cost in NGN",
    "code": "=MINIFS(Orders[cost],Orders[currency],\"NGN\")",
    "meaning": "Find the smallest cost among NGN records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count cost in NGN",
    "code": "=COUNTIFS(Orders[currency],\"NGN\",Orders[cost],\"<>\")",
    "meaning": "Count NGN records with a nonempty cost field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum cost in Card",
    "code": "=MAXIFS(Orders[cost],Orders[payment_method],\"Card\")",
    "meaning": "Find the largest cost among Card records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum cost in Card",
    "code": "=MINIFS(Orders[cost],Orders[payment_method],\"Card\")",
    "meaning": "Find the smallest cost among Card records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count cost in Card",
    "code": "=COUNTIFS(Orders[payment_method],\"Card\",Orders[cost],\"<>\")",
    "meaning": "Count Card records with a nonempty cost field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum profit in North",
    "code": "=MAXIFS(Orders[profit],Orders[region],\"North\")",
    "meaning": "Find the largest profit among North records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum profit in North",
    "code": "=MINIFS(Orders[profit],Orders[region],\"North\")",
    "meaning": "Find the smallest profit among North records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count profit in North",
    "code": "=COUNTIFS(Orders[region],\"North\",Orders[profit],\"<>\")",
    "meaning": "Count North records with a nonempty profit field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum profit in Online",
    "code": "=MAXIFS(Orders[profit],Orders[channel],\"Online\")",
    "meaning": "Find the largest profit among Online records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum profit in Online",
    "code": "=MINIFS(Orders[profit],Orders[channel],\"Online\")",
    "meaning": "Find the smallest profit among Online records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count profit in Online",
    "code": "=COUNTIFS(Orders[channel],\"Online\",Orders[profit],\"<>\")",
    "meaning": "Count Online records with a nonempty profit field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum profit in Completed",
    "code": "=MAXIFS(Orders[profit],Orders[status],\"Completed\")",
    "meaning": "Find the largest profit among Completed records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum profit in Completed",
    "code": "=MINIFS(Orders[profit],Orders[status],\"Completed\")",
    "meaning": "Find the smallest profit among Completed records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count profit in Completed",
    "code": "=COUNTIFS(Orders[status],\"Completed\",Orders[profit],\"<>\")",
    "meaning": "Count Completed records with a nonempty profit field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum profit in Electronics",
    "code": "=MAXIFS(Orders[profit],Orders[category],\"Electronics\")",
    "meaning": "Find the largest profit among Electronics records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum profit in Electronics",
    "code": "=MINIFS(Orders[profit],Orders[category],\"Electronics\")",
    "meaning": "Find the smallest profit among Electronics records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count profit in Electronics",
    "code": "=COUNTIFS(Orders[category],\"Electronics\",Orders[profit],\"<>\")",
    "meaning": "Count Electronics records with a nonempty profit field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum profit in Ada",
    "code": "=MAXIFS(Orders[profit],Orders[sales_rep],\"Ada\")",
    "meaning": "Find the largest profit among Ada records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum profit in Ada",
    "code": "=MINIFS(Orders[profit],Orders[sales_rep],\"Ada\")",
    "meaning": "Find the smallest profit among Ada records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count profit in Ada",
    "code": "=COUNTIFS(Orders[sales_rep],\"Ada\",Orders[profit],\"<>\")",
    "meaning": "Count Ada records with a nonempty profit field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum profit in Nigeria",
    "code": "=MAXIFS(Orders[profit],Orders[country],\"Nigeria\")",
    "meaning": "Find the largest profit among Nigeria records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum profit in Nigeria",
    "code": "=MINIFS(Orders[profit],Orders[country],\"Nigeria\")",
    "meaning": "Find the smallest profit among Nigeria records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count profit in Nigeria",
    "code": "=COUNTIFS(Orders[country],\"Nigeria\",Orders[profit],\"<>\")",
    "meaning": "Count Nigeria records with a nonempty profit field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum profit in Retail",
    "code": "=MAXIFS(Orders[profit],Orders[segment],\"Retail\")",
    "meaning": "Find the largest profit among Retail records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum profit in Retail",
    "code": "=MINIFS(Orders[profit],Orders[segment],\"Retail\")",
    "meaning": "Find the smallest profit among Retail records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count profit in Retail",
    "code": "=COUNTIFS(Orders[segment],\"Retail\",Orders[profit],\"<>\")",
    "meaning": "Count Retail records with a nonempty profit field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum profit in Lagos",
    "code": "=MAXIFS(Orders[profit],Orders[warehouse],\"Lagos\")",
    "meaning": "Find the largest profit among Lagos records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum profit in Lagos",
    "code": "=MINIFS(Orders[profit],Orders[warehouse],\"Lagos\")",
    "meaning": "Find the smallest profit among Lagos records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count profit in Lagos",
    "code": "=COUNTIFS(Orders[warehouse],\"Lagos\",Orders[profit],\"<>\")",
    "meaning": "Count Lagos records with a nonempty profit field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum profit in NGN",
    "code": "=MAXIFS(Orders[profit],Orders[currency],\"NGN\")",
    "meaning": "Find the largest profit among NGN records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum profit in NGN",
    "code": "=MINIFS(Orders[profit],Orders[currency],\"NGN\")",
    "meaning": "Find the smallest profit among NGN records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count profit in NGN",
    "code": "=COUNTIFS(Orders[currency],\"NGN\",Orders[profit],\"<>\")",
    "meaning": "Count NGN records with a nonempty profit field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum profit in Card",
    "code": "=MAXIFS(Orders[profit],Orders[payment_method],\"Card\")",
    "meaning": "Find the largest profit among Card records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum profit in Card",
    "code": "=MINIFS(Orders[profit],Orders[payment_method],\"Card\")",
    "meaning": "Find the smallest profit among Card records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count profit in Card",
    "code": "=COUNTIFS(Orders[payment_method],\"Card\",Orders[profit],\"<>\")",
    "meaning": "Count Card records with a nonempty profit field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum units sold in North",
    "code": "=MAXIFS(Orders[quantity],Orders[region],\"North\")",
    "meaning": "Find the largest units sold among North records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum units sold in North",
    "code": "=MINIFS(Orders[quantity],Orders[region],\"North\")",
    "meaning": "Find the smallest units sold among North records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count units sold in North",
    "code": "=COUNTIFS(Orders[region],\"North\",Orders[quantity],\"<>\")",
    "meaning": "Count North records with a nonempty quantity field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum units sold in Online",
    "code": "=MAXIFS(Orders[quantity],Orders[channel],\"Online\")",
    "meaning": "Find the largest units sold among Online records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum units sold in Online",
    "code": "=MINIFS(Orders[quantity],Orders[channel],\"Online\")",
    "meaning": "Find the smallest units sold among Online records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count units sold in Online",
    "code": "=COUNTIFS(Orders[channel],\"Online\",Orders[quantity],\"<>\")",
    "meaning": "Count Online records with a nonempty quantity field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum units sold in Completed",
    "code": "=MAXIFS(Orders[quantity],Orders[status],\"Completed\")",
    "meaning": "Find the largest units sold among Completed records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum units sold in Completed",
    "code": "=MINIFS(Orders[quantity],Orders[status],\"Completed\")",
    "meaning": "Find the smallest units sold among Completed records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count units sold in Completed",
    "code": "=COUNTIFS(Orders[status],\"Completed\",Orders[quantity],\"<>\")",
    "meaning": "Count Completed records with a nonempty quantity field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum units sold in Electronics",
    "code": "=MAXIFS(Orders[quantity],Orders[category],\"Electronics\")",
    "meaning": "Find the largest units sold among Electronics records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum units sold in Electronics",
    "code": "=MINIFS(Orders[quantity],Orders[category],\"Electronics\")",
    "meaning": "Find the smallest units sold among Electronics records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count units sold in Electronics",
    "code": "=COUNTIFS(Orders[category],\"Electronics\",Orders[quantity],\"<>\")",
    "meaning": "Count Electronics records with a nonempty quantity field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum units sold in Ada",
    "code": "=MAXIFS(Orders[quantity],Orders[sales_rep],\"Ada\")",
    "meaning": "Find the largest units sold among Ada records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum units sold in Ada",
    "code": "=MINIFS(Orders[quantity],Orders[sales_rep],\"Ada\")",
    "meaning": "Find the smallest units sold among Ada records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count units sold in Ada",
    "code": "=COUNTIFS(Orders[sales_rep],\"Ada\",Orders[quantity],\"<>\")",
    "meaning": "Count Ada records with a nonempty quantity field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum units sold in Nigeria",
    "code": "=MAXIFS(Orders[quantity],Orders[country],\"Nigeria\")",
    "meaning": "Find the largest units sold among Nigeria records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum units sold in Nigeria",
    "code": "=MINIFS(Orders[quantity],Orders[country],\"Nigeria\")",
    "meaning": "Find the smallest units sold among Nigeria records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count units sold in Nigeria",
    "code": "=COUNTIFS(Orders[country],\"Nigeria\",Orders[quantity],\"<>\")",
    "meaning": "Count Nigeria records with a nonempty quantity field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum units sold in Retail",
    "code": "=MAXIFS(Orders[quantity],Orders[segment],\"Retail\")",
    "meaning": "Find the largest units sold among Retail records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum units sold in Retail",
    "code": "=MINIFS(Orders[quantity],Orders[segment],\"Retail\")",
    "meaning": "Find the smallest units sold among Retail records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count units sold in Retail",
    "code": "=COUNTIFS(Orders[segment],\"Retail\",Orders[quantity],\"<>\")",
    "meaning": "Count Retail records with a nonempty quantity field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum units sold in Lagos",
    "code": "=MAXIFS(Orders[quantity],Orders[warehouse],\"Lagos\")",
    "meaning": "Find the largest units sold among Lagos records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum units sold in Lagos",
    "code": "=MINIFS(Orders[quantity],Orders[warehouse],\"Lagos\")",
    "meaning": "Find the smallest units sold among Lagos records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count units sold in Lagos",
    "code": "=COUNTIFS(Orders[warehouse],\"Lagos\",Orders[quantity],\"<>\")",
    "meaning": "Count Lagos records with a nonempty quantity field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum units sold in NGN",
    "code": "=MAXIFS(Orders[quantity],Orders[currency],\"NGN\")",
    "meaning": "Find the largest units sold among NGN records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum units sold in NGN",
    "code": "=MINIFS(Orders[quantity],Orders[currency],\"NGN\")",
    "meaning": "Find the smallest units sold among NGN records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count units sold in NGN",
    "code": "=COUNTIFS(Orders[currency],\"NGN\",Orders[quantity],\"<>\")",
    "meaning": "Count NGN records with a nonempty quantity field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum units sold in Card",
    "code": "=MAXIFS(Orders[quantity],Orders[payment_method],\"Card\")",
    "meaning": "Find the largest units sold among Card records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum units sold in Card",
    "code": "=MINIFS(Orders[quantity],Orders[payment_method],\"Card\")",
    "meaning": "Find the smallest units sold among Card records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count units sold in Card",
    "code": "=COUNTIFS(Orders[payment_method],\"Card\",Orders[quantity],\"<>\")",
    "meaning": "Count Card records with a nonempty quantity field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum discount amount in North",
    "code": "=MAXIFS(Orders[discount_amount],Orders[region],\"North\")",
    "meaning": "Find the largest discount amount among North records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum discount amount in North",
    "code": "=MINIFS(Orders[discount_amount],Orders[region],\"North\")",
    "meaning": "Find the smallest discount amount among North records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count discount amount in North",
    "code": "=COUNTIFS(Orders[region],\"North\",Orders[discount_amount],\"<>\")",
    "meaning": "Count North records with a nonempty discount_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum discount amount in Online",
    "code": "=MAXIFS(Orders[discount_amount],Orders[channel],\"Online\")",
    "meaning": "Find the largest discount amount among Online records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum discount amount in Online",
    "code": "=MINIFS(Orders[discount_amount],Orders[channel],\"Online\")",
    "meaning": "Find the smallest discount amount among Online records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count discount amount in Online",
    "code": "=COUNTIFS(Orders[channel],\"Online\",Orders[discount_amount],\"<>\")",
    "meaning": "Count Online records with a nonempty discount_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum discount amount in Completed",
    "code": "=MAXIFS(Orders[discount_amount],Orders[status],\"Completed\")",
    "meaning": "Find the largest discount amount among Completed records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum discount amount in Completed",
    "code": "=MINIFS(Orders[discount_amount],Orders[status],\"Completed\")",
    "meaning": "Find the smallest discount amount among Completed records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count discount amount in Completed",
    "code": "=COUNTIFS(Orders[status],\"Completed\",Orders[discount_amount],\"<>\")",
    "meaning": "Count Completed records with a nonempty discount_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum discount amount in Electronics",
    "code": "=MAXIFS(Orders[discount_amount],Orders[category],\"Electronics\")",
    "meaning": "Find the largest discount amount among Electronics records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum discount amount in Electronics",
    "code": "=MINIFS(Orders[discount_amount],Orders[category],\"Electronics\")",
    "meaning": "Find the smallest discount amount among Electronics records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count discount amount in Electronics",
    "code": "=COUNTIFS(Orders[category],\"Electronics\",Orders[discount_amount],\"<>\")",
    "meaning": "Count Electronics records with a nonempty discount_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum discount amount in Ada",
    "code": "=MAXIFS(Orders[discount_amount],Orders[sales_rep],\"Ada\")",
    "meaning": "Find the largest discount amount among Ada records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum discount amount in Ada",
    "code": "=MINIFS(Orders[discount_amount],Orders[sales_rep],\"Ada\")",
    "meaning": "Find the smallest discount amount among Ada records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count discount amount in Ada",
    "code": "=COUNTIFS(Orders[sales_rep],\"Ada\",Orders[discount_amount],\"<>\")",
    "meaning": "Count Ada records with a nonempty discount_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum discount amount in Nigeria",
    "code": "=MAXIFS(Orders[discount_amount],Orders[country],\"Nigeria\")",
    "meaning": "Find the largest discount amount among Nigeria records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum discount amount in Nigeria",
    "code": "=MINIFS(Orders[discount_amount],Orders[country],\"Nigeria\")",
    "meaning": "Find the smallest discount amount among Nigeria records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count discount amount in Nigeria",
    "code": "=COUNTIFS(Orders[country],\"Nigeria\",Orders[discount_amount],\"<>\")",
    "meaning": "Count Nigeria records with a nonempty discount_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum discount amount in Retail",
    "code": "=MAXIFS(Orders[discount_amount],Orders[segment],\"Retail\")",
    "meaning": "Find the largest discount amount among Retail records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum discount amount in Retail",
    "code": "=MINIFS(Orders[discount_amount],Orders[segment],\"Retail\")",
    "meaning": "Find the smallest discount amount among Retail records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count discount amount in Retail",
    "code": "=COUNTIFS(Orders[segment],\"Retail\",Orders[discount_amount],\"<>\")",
    "meaning": "Count Retail records with a nonempty discount_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum discount amount in Lagos",
    "code": "=MAXIFS(Orders[discount_amount],Orders[warehouse],\"Lagos\")",
    "meaning": "Find the largest discount amount among Lagos records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum discount amount in Lagos",
    "code": "=MINIFS(Orders[discount_amount],Orders[warehouse],\"Lagos\")",
    "meaning": "Find the smallest discount amount among Lagos records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count discount amount in Lagos",
    "code": "=COUNTIFS(Orders[warehouse],\"Lagos\",Orders[discount_amount],\"<>\")",
    "meaning": "Count Lagos records with a nonempty discount_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum discount amount in NGN",
    "code": "=MAXIFS(Orders[discount_amount],Orders[currency],\"NGN\")",
    "meaning": "Find the largest discount amount among NGN records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum discount amount in NGN",
    "code": "=MINIFS(Orders[discount_amount],Orders[currency],\"NGN\")",
    "meaning": "Find the smallest discount amount among NGN records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count discount amount in NGN",
    "code": "=COUNTIFS(Orders[currency],\"NGN\",Orders[discount_amount],\"<>\")",
    "meaning": "Count NGN records with a nonempty discount_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum discount amount in Card",
    "code": "=MAXIFS(Orders[discount_amount],Orders[payment_method],\"Card\")",
    "meaning": "Find the largest discount amount among Card records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum discount amount in Card",
    "code": "=MINIFS(Orders[discount_amount],Orders[payment_method],\"Card\")",
    "meaning": "Find the smallest discount amount among Card records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count discount amount in Card",
    "code": "=COUNTIFS(Orders[payment_method],\"Card\",Orders[discount_amount],\"<>\")",
    "meaning": "Count Card records with a nonempty discount_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum shipping cost in North",
    "code": "=MAXIFS(Orders[shipping_cost],Orders[region],\"North\")",
    "meaning": "Find the largest shipping cost among North records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum shipping cost in North",
    "code": "=MINIFS(Orders[shipping_cost],Orders[region],\"North\")",
    "meaning": "Find the smallest shipping cost among North records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count shipping cost in North",
    "code": "=COUNTIFS(Orders[region],\"North\",Orders[shipping_cost],\"<>\")",
    "meaning": "Count North records with a nonempty shipping_cost field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum shipping cost in Online",
    "code": "=MAXIFS(Orders[shipping_cost],Orders[channel],\"Online\")",
    "meaning": "Find the largest shipping cost among Online records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum shipping cost in Online",
    "code": "=MINIFS(Orders[shipping_cost],Orders[channel],\"Online\")",
    "meaning": "Find the smallest shipping cost among Online records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count shipping cost in Online",
    "code": "=COUNTIFS(Orders[channel],\"Online\",Orders[shipping_cost],\"<>\")",
    "meaning": "Count Online records with a nonempty shipping_cost field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum shipping cost in Completed",
    "code": "=MAXIFS(Orders[shipping_cost],Orders[status],\"Completed\")",
    "meaning": "Find the largest shipping cost among Completed records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum shipping cost in Completed",
    "code": "=MINIFS(Orders[shipping_cost],Orders[status],\"Completed\")",
    "meaning": "Find the smallest shipping cost among Completed records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count shipping cost in Completed",
    "code": "=COUNTIFS(Orders[status],\"Completed\",Orders[shipping_cost],\"<>\")",
    "meaning": "Count Completed records with a nonempty shipping_cost field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum shipping cost in Electronics",
    "code": "=MAXIFS(Orders[shipping_cost],Orders[category],\"Electronics\")",
    "meaning": "Find the largest shipping cost among Electronics records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum shipping cost in Electronics",
    "code": "=MINIFS(Orders[shipping_cost],Orders[category],\"Electronics\")",
    "meaning": "Find the smallest shipping cost among Electronics records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count shipping cost in Electronics",
    "code": "=COUNTIFS(Orders[category],\"Electronics\",Orders[shipping_cost],\"<>\")",
    "meaning": "Count Electronics records with a nonempty shipping_cost field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum shipping cost in Ada",
    "code": "=MAXIFS(Orders[shipping_cost],Orders[sales_rep],\"Ada\")",
    "meaning": "Find the largest shipping cost among Ada records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum shipping cost in Ada",
    "code": "=MINIFS(Orders[shipping_cost],Orders[sales_rep],\"Ada\")",
    "meaning": "Find the smallest shipping cost among Ada records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count shipping cost in Ada",
    "code": "=COUNTIFS(Orders[sales_rep],\"Ada\",Orders[shipping_cost],\"<>\")",
    "meaning": "Count Ada records with a nonempty shipping_cost field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum shipping cost in Nigeria",
    "code": "=MAXIFS(Orders[shipping_cost],Orders[country],\"Nigeria\")",
    "meaning": "Find the largest shipping cost among Nigeria records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum shipping cost in Nigeria",
    "code": "=MINIFS(Orders[shipping_cost],Orders[country],\"Nigeria\")",
    "meaning": "Find the smallest shipping cost among Nigeria records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count shipping cost in Nigeria",
    "code": "=COUNTIFS(Orders[country],\"Nigeria\",Orders[shipping_cost],\"<>\")",
    "meaning": "Count Nigeria records with a nonempty shipping_cost field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum shipping cost in Retail",
    "code": "=MAXIFS(Orders[shipping_cost],Orders[segment],\"Retail\")",
    "meaning": "Find the largest shipping cost among Retail records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum shipping cost in Retail",
    "code": "=MINIFS(Orders[shipping_cost],Orders[segment],\"Retail\")",
    "meaning": "Find the smallest shipping cost among Retail records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count shipping cost in Retail",
    "code": "=COUNTIFS(Orders[segment],\"Retail\",Orders[shipping_cost],\"<>\")",
    "meaning": "Count Retail records with a nonempty shipping_cost field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum shipping cost in Lagos",
    "code": "=MAXIFS(Orders[shipping_cost],Orders[warehouse],\"Lagos\")",
    "meaning": "Find the largest shipping cost among Lagos records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum shipping cost in Lagos",
    "code": "=MINIFS(Orders[shipping_cost],Orders[warehouse],\"Lagos\")",
    "meaning": "Find the smallest shipping cost among Lagos records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count shipping cost in Lagos",
    "code": "=COUNTIFS(Orders[warehouse],\"Lagos\",Orders[shipping_cost],\"<>\")",
    "meaning": "Count Lagos records with a nonempty shipping_cost field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum shipping cost in NGN",
    "code": "=MAXIFS(Orders[shipping_cost],Orders[currency],\"NGN\")",
    "meaning": "Find the largest shipping cost among NGN records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum shipping cost in NGN",
    "code": "=MINIFS(Orders[shipping_cost],Orders[currency],\"NGN\")",
    "meaning": "Find the smallest shipping cost among NGN records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count shipping cost in NGN",
    "code": "=COUNTIFS(Orders[currency],\"NGN\",Orders[shipping_cost],\"<>\")",
    "meaning": "Count NGN records with a nonempty shipping_cost field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum shipping cost in Card",
    "code": "=MAXIFS(Orders[shipping_cost],Orders[payment_method],\"Card\")",
    "meaning": "Find the largest shipping cost among Card records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum shipping cost in Card",
    "code": "=MINIFS(Orders[shipping_cost],Orders[payment_method],\"Card\")",
    "meaning": "Find the smallest shipping cost among Card records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count shipping cost in Card",
    "code": "=COUNTIFS(Orders[payment_method],\"Card\",Orders[shipping_cost],\"<>\")",
    "meaning": "Count Card records with a nonempty shipping_cost field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum tax amount in North",
    "code": "=MAXIFS(Orders[tax_amount],Orders[region],\"North\")",
    "meaning": "Find the largest tax amount among North records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum tax amount in North",
    "code": "=MINIFS(Orders[tax_amount],Orders[region],\"North\")",
    "meaning": "Find the smallest tax amount among North records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count tax amount in North",
    "code": "=COUNTIFS(Orders[region],\"North\",Orders[tax_amount],\"<>\")",
    "meaning": "Count North records with a nonempty tax_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum tax amount in Online",
    "code": "=MAXIFS(Orders[tax_amount],Orders[channel],\"Online\")",
    "meaning": "Find the largest tax amount among Online records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum tax amount in Online",
    "code": "=MINIFS(Orders[tax_amount],Orders[channel],\"Online\")",
    "meaning": "Find the smallest tax amount among Online records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count tax amount in Online",
    "code": "=COUNTIFS(Orders[channel],\"Online\",Orders[tax_amount],\"<>\")",
    "meaning": "Count Online records with a nonempty tax_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum tax amount in Completed",
    "code": "=MAXIFS(Orders[tax_amount],Orders[status],\"Completed\")",
    "meaning": "Find the largest tax amount among Completed records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum tax amount in Completed",
    "code": "=MINIFS(Orders[tax_amount],Orders[status],\"Completed\")",
    "meaning": "Find the smallest tax amount among Completed records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count tax amount in Completed",
    "code": "=COUNTIFS(Orders[status],\"Completed\",Orders[tax_amount],\"<>\")",
    "meaning": "Count Completed records with a nonempty tax_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum tax amount in Electronics",
    "code": "=MAXIFS(Orders[tax_amount],Orders[category],\"Electronics\")",
    "meaning": "Find the largest tax amount among Electronics records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum tax amount in Electronics",
    "code": "=MINIFS(Orders[tax_amount],Orders[category],\"Electronics\")",
    "meaning": "Find the smallest tax amount among Electronics records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count tax amount in Electronics",
    "code": "=COUNTIFS(Orders[category],\"Electronics\",Orders[tax_amount],\"<>\")",
    "meaning": "Count Electronics records with a nonempty tax_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum tax amount in Ada",
    "code": "=MAXIFS(Orders[tax_amount],Orders[sales_rep],\"Ada\")",
    "meaning": "Find the largest tax amount among Ada records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum tax amount in Ada",
    "code": "=MINIFS(Orders[tax_amount],Orders[sales_rep],\"Ada\")",
    "meaning": "Find the smallest tax amount among Ada records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count tax amount in Ada",
    "code": "=COUNTIFS(Orders[sales_rep],\"Ada\",Orders[tax_amount],\"<>\")",
    "meaning": "Count Ada records with a nonempty tax_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum tax amount in Nigeria",
    "code": "=MAXIFS(Orders[tax_amount],Orders[country],\"Nigeria\")",
    "meaning": "Find the largest tax amount among Nigeria records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum tax amount in Nigeria",
    "code": "=MINIFS(Orders[tax_amount],Orders[country],\"Nigeria\")",
    "meaning": "Find the smallest tax amount among Nigeria records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count tax amount in Nigeria",
    "code": "=COUNTIFS(Orders[country],\"Nigeria\",Orders[tax_amount],\"<>\")",
    "meaning": "Count Nigeria records with a nonempty tax_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum tax amount in Retail",
    "code": "=MAXIFS(Orders[tax_amount],Orders[segment],\"Retail\")",
    "meaning": "Find the largest tax amount among Retail records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum tax amount in Retail",
    "code": "=MINIFS(Orders[tax_amount],Orders[segment],\"Retail\")",
    "meaning": "Find the smallest tax amount among Retail records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count tax amount in Retail",
    "code": "=COUNTIFS(Orders[segment],\"Retail\",Orders[tax_amount],\"<>\")",
    "meaning": "Count Retail records with a nonempty tax_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum tax amount in Lagos",
    "code": "=MAXIFS(Orders[tax_amount],Orders[warehouse],\"Lagos\")",
    "meaning": "Find the largest tax amount among Lagos records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum tax amount in Lagos",
    "code": "=MINIFS(Orders[tax_amount],Orders[warehouse],\"Lagos\")",
    "meaning": "Find the smallest tax amount among Lagos records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count tax amount in Lagos",
    "code": "=COUNTIFS(Orders[warehouse],\"Lagos\",Orders[tax_amount],\"<>\")",
    "meaning": "Count Lagos records with a nonempty tax_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum tax amount in NGN",
    "code": "=MAXIFS(Orders[tax_amount],Orders[currency],\"NGN\")",
    "meaning": "Find the largest tax amount among NGN records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum tax amount in NGN",
    "code": "=MINIFS(Orders[tax_amount],Orders[currency],\"NGN\")",
    "meaning": "Find the smallest tax amount among NGN records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count tax amount in NGN",
    "code": "=COUNTIFS(Orders[currency],\"NGN\",Orders[tax_amount],\"<>\")",
    "meaning": "Count NGN records with a nonempty tax_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum tax amount in Card",
    "code": "=MAXIFS(Orders[tax_amount],Orders[payment_method],\"Card\")",
    "meaning": "Find the largest tax amount among Card records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum tax amount in Card",
    "code": "=MINIFS(Orders[tax_amount],Orders[payment_method],\"Card\")",
    "meaning": "Find the smallest tax amount among Card records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count tax amount in Card",
    "code": "=COUNTIFS(Orders[payment_method],\"Card\",Orders[tax_amount],\"<>\")",
    "meaning": "Count Card records with a nonempty tax_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum refund amount in North",
    "code": "=MAXIFS(Orders[refund_amount],Orders[region],\"North\")",
    "meaning": "Find the largest refund amount among North records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum refund amount in North",
    "code": "=MINIFS(Orders[refund_amount],Orders[region],\"North\")",
    "meaning": "Find the smallest refund amount among North records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count refund amount in North",
    "code": "=COUNTIFS(Orders[region],\"North\",Orders[refund_amount],\"<>\")",
    "meaning": "Count North records with a nonempty refund_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum refund amount in Online",
    "code": "=MAXIFS(Orders[refund_amount],Orders[channel],\"Online\")",
    "meaning": "Find the largest refund amount among Online records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum refund amount in Online",
    "code": "=MINIFS(Orders[refund_amount],Orders[channel],\"Online\")",
    "meaning": "Find the smallest refund amount among Online records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count refund amount in Online",
    "code": "=COUNTIFS(Orders[channel],\"Online\",Orders[refund_amount],\"<>\")",
    "meaning": "Count Online records with a nonempty refund_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum refund amount in Completed",
    "code": "=MAXIFS(Orders[refund_amount],Orders[status],\"Completed\")",
    "meaning": "Find the largest refund amount among Completed records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum refund amount in Completed",
    "code": "=MINIFS(Orders[refund_amount],Orders[status],\"Completed\")",
    "meaning": "Find the smallest refund amount among Completed records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count refund amount in Completed",
    "code": "=COUNTIFS(Orders[status],\"Completed\",Orders[refund_amount],\"<>\")",
    "meaning": "Count Completed records with a nonempty refund_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum refund amount in Electronics",
    "code": "=MAXIFS(Orders[refund_amount],Orders[category],\"Electronics\")",
    "meaning": "Find the largest refund amount among Electronics records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum refund amount in Electronics",
    "code": "=MINIFS(Orders[refund_amount],Orders[category],\"Electronics\")",
    "meaning": "Find the smallest refund amount among Electronics records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count refund amount in Electronics",
    "code": "=COUNTIFS(Orders[category],\"Electronics\",Orders[refund_amount],\"<>\")",
    "meaning": "Count Electronics records with a nonempty refund_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum refund amount in Ada",
    "code": "=MAXIFS(Orders[refund_amount],Orders[sales_rep],\"Ada\")",
    "meaning": "Find the largest refund amount among Ada records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum refund amount in Ada",
    "code": "=MINIFS(Orders[refund_amount],Orders[sales_rep],\"Ada\")",
    "meaning": "Find the smallest refund amount among Ada records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count refund amount in Ada",
    "code": "=COUNTIFS(Orders[sales_rep],\"Ada\",Orders[refund_amount],\"<>\")",
    "meaning": "Count Ada records with a nonempty refund_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum refund amount in Nigeria",
    "code": "=MAXIFS(Orders[refund_amount],Orders[country],\"Nigeria\")",
    "meaning": "Find the largest refund amount among Nigeria records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum refund amount in Nigeria",
    "code": "=MINIFS(Orders[refund_amount],Orders[country],\"Nigeria\")",
    "meaning": "Find the smallest refund amount among Nigeria records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count refund amount in Nigeria",
    "code": "=COUNTIFS(Orders[country],\"Nigeria\",Orders[refund_amount],\"<>\")",
    "meaning": "Count Nigeria records with a nonempty refund_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum refund amount in Retail",
    "code": "=MAXIFS(Orders[refund_amount],Orders[segment],\"Retail\")",
    "meaning": "Find the largest refund amount among Retail records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum refund amount in Retail",
    "code": "=MINIFS(Orders[refund_amount],Orders[segment],\"Retail\")",
    "meaning": "Find the smallest refund amount among Retail records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count refund amount in Retail",
    "code": "=COUNTIFS(Orders[segment],\"Retail\",Orders[refund_amount],\"<>\")",
    "meaning": "Count Retail records with a nonempty refund_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum refund amount in Lagos",
    "code": "=MAXIFS(Orders[refund_amount],Orders[warehouse],\"Lagos\")",
    "meaning": "Find the largest refund amount among Lagos records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum refund amount in Lagos",
    "code": "=MINIFS(Orders[refund_amount],Orders[warehouse],\"Lagos\")",
    "meaning": "Find the smallest refund amount among Lagos records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count refund amount in Lagos",
    "code": "=COUNTIFS(Orders[warehouse],\"Lagos\",Orders[refund_amount],\"<>\")",
    "meaning": "Count Lagos records with a nonempty refund_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum refund amount in NGN",
    "code": "=MAXIFS(Orders[refund_amount],Orders[currency],\"NGN\")",
    "meaning": "Find the largest refund amount among NGN records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum refund amount in NGN",
    "code": "=MINIFS(Orders[refund_amount],Orders[currency],\"NGN\")",
    "meaning": "Find the smallest refund amount among NGN records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count refund amount in NGN",
    "code": "=COUNTIFS(Orders[currency],\"NGN\",Orders[refund_amount],\"<>\")",
    "meaning": "Count NGN records with a nonempty refund_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum refund amount in Card",
    "code": "=MAXIFS(Orders[refund_amount],Orders[payment_method],\"Card\")",
    "meaning": "Find the largest refund amount among Card records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum refund amount in Card",
    "code": "=MINIFS(Orders[refund_amount],Orders[payment_method],\"Card\")",
    "meaning": "Find the smallest refund amount among Card records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count refund amount in Card",
    "code": "=COUNTIFS(Orders[payment_method],\"Card\",Orders[refund_amount],\"<>\")",
    "meaning": "Count Card records with a nonempty refund_amount field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum order value in North",
    "code": "=MAXIFS(Orders[order_value],Orders[region],\"North\")",
    "meaning": "Find the largest order value among North records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum order value in North",
    "code": "=MINIFS(Orders[order_value],Orders[region],\"North\")",
    "meaning": "Find the smallest order value among North records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count order value in North",
    "code": "=COUNTIFS(Orders[region],\"North\",Orders[order_value],\"<>\")",
    "meaning": "Count North records with a nonempty order_value field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum order value in Online",
    "code": "=MAXIFS(Orders[order_value],Orders[channel],\"Online\")",
    "meaning": "Find the largest order value among Online records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum order value in Online",
    "code": "=MINIFS(Orders[order_value],Orders[channel],\"Online\")",
    "meaning": "Find the smallest order value among Online records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count order value in Online",
    "code": "=COUNTIFS(Orders[channel],\"Online\",Orders[order_value],\"<>\")",
    "meaning": "Count Online records with a nonempty order_value field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum order value in Completed",
    "code": "=MAXIFS(Orders[order_value],Orders[status],\"Completed\")",
    "meaning": "Find the largest order value among Completed records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum order value in Completed",
    "code": "=MINIFS(Orders[order_value],Orders[status],\"Completed\")",
    "meaning": "Find the smallest order value among Completed records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count order value in Completed",
    "code": "=COUNTIFS(Orders[status],\"Completed\",Orders[order_value],\"<>\")",
    "meaning": "Count Completed records with a nonempty order_value field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum order value in Electronics",
    "code": "=MAXIFS(Orders[order_value],Orders[category],\"Electronics\")",
    "meaning": "Find the largest order value among Electronics records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum order value in Electronics",
    "code": "=MINIFS(Orders[order_value],Orders[category],\"Electronics\")",
    "meaning": "Find the smallest order value among Electronics records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count order value in Electronics",
    "code": "=COUNTIFS(Orders[category],\"Electronics\",Orders[order_value],\"<>\")",
    "meaning": "Count Electronics records with a nonempty order_value field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum order value in Ada",
    "code": "=MAXIFS(Orders[order_value],Orders[sales_rep],\"Ada\")",
    "meaning": "Find the largest order value among Ada records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum order value in Ada",
    "code": "=MINIFS(Orders[order_value],Orders[sales_rep],\"Ada\")",
    "meaning": "Find the smallest order value among Ada records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count order value in Ada",
    "code": "=COUNTIFS(Orders[sales_rep],\"Ada\",Orders[order_value],\"<>\")",
    "meaning": "Count Ada records with a nonempty order_value field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum order value in Nigeria",
    "code": "=MAXIFS(Orders[order_value],Orders[country],\"Nigeria\")",
    "meaning": "Find the largest order value among Nigeria records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum order value in Nigeria",
    "code": "=MINIFS(Orders[order_value],Orders[country],\"Nigeria\")",
    "meaning": "Find the smallest order value among Nigeria records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count order value in Nigeria",
    "code": "=COUNTIFS(Orders[country],\"Nigeria\",Orders[order_value],\"<>\")",
    "meaning": "Count Nigeria records with a nonempty order_value field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum order value in Retail",
    "code": "=MAXIFS(Orders[order_value],Orders[segment],\"Retail\")",
    "meaning": "Find the largest order value among Retail records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum order value in Retail",
    "code": "=MINIFS(Orders[order_value],Orders[segment],\"Retail\")",
    "meaning": "Find the smallest order value among Retail records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count order value in Retail",
    "code": "=COUNTIFS(Orders[segment],\"Retail\",Orders[order_value],\"<>\")",
    "meaning": "Count Retail records with a nonempty order_value field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum order value in Lagos",
    "code": "=MAXIFS(Orders[order_value],Orders[warehouse],\"Lagos\")",
    "meaning": "Find the largest order value among Lagos records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum order value in Lagos",
    "code": "=MINIFS(Orders[order_value],Orders[warehouse],\"Lagos\")",
    "meaning": "Find the smallest order value among Lagos records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count order value in Lagos",
    "code": "=COUNTIFS(Orders[warehouse],\"Lagos\",Orders[order_value],\"<>\")",
    "meaning": "Count Lagos records with a nonempty order_value field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum order value in NGN",
    "code": "=MAXIFS(Orders[order_value],Orders[currency],\"NGN\")",
    "meaning": "Find the largest order value among NGN records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum order value in NGN",
    "code": "=MINIFS(Orders[order_value],Orders[currency],\"NGN\")",
    "meaning": "Find the smallest order value among NGN records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count order value in NGN",
    "code": "=COUNTIFS(Orders[currency],\"NGN\",Orders[order_value],\"<>\")",
    "meaning": "Count NGN records with a nonempty order_value field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Maximum order value in Card",
    "code": "=MAXIFS(Orders[order_value],Orders[payment_method],\"Card\")",
    "meaning": "Find the largest order value among Card records.",
    "watch": "MAXIFS returns zero if no matching numeric records; distinguish no data from genuine zero.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Minimum order value in Card",
    "code": "=MINIFS(Orders[order_value],Orders[payment_method],\"Card\")",
    "meaning": "Find the smallest order value among Card records.",
    "watch": "MINIFS returns zero if no matching numeric records; check eligibility and outliers.",
    "link": "",
    "level": "Intermediate"
  },
  {
    "group": "Excel",
    "title": "Row Count order value in Card",
    "code": "=COUNTIFS(Orders[payment_method],\"Card\",Orders[order_value],\"<>\")",
    "meaning": "Count Card records with a nonempty order_value field.",
    "watch": "COUNTIFS counts matching rows, including cells with text; use numeric validation if required.",
    "link": "",
    "level": "Intermediate"
  }
];
