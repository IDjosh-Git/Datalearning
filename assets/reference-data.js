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
  }
];
