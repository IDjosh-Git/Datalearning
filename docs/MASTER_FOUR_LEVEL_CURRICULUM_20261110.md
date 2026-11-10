# DataLearning — Four-Level Master Curriculum Blueprint
**Curriculum review:** 10 November 2026 · **Audience:** absolute beginners, practising analysts, engineers, and aspiring AI/data-science specialists.

## 1. Gap analysis summary

### Strengths in the existing app
- Seven active 10-week courses (Data Analysis, Excel, SQL, Power BI, Tableau, Power Query, Introductory Statistics), each with worked examples, guided steps, weekly questions, and saved completion states. The separate Python and AI course routes are retained for continuity.
- Practical exercises, SQL and spreadsheet practice surfaces, progress tracking and capstone tools already exist. These provide a strong beginner-to-intermediate analytics base.

### What needed improvement and has been added
- **A clear four-stage progression:** the core 70 weeks were not visibly connected to data engineering, machine learning or expert AI systems. A new 31-module interactive master pathway bridges those gaps.
- **Data engineering:** data contracts, dbt/Snowflake-style transformation practices, orchestration, cloud architecture, ACID lakehouse tables, Spark and Kafka are now explicitly taught at the appropriate progression level.
- **Data science:** Python, pandas, statistical inference, A/B tests, forecasting, supervised ML, temporal validation and production monitoring are mapped into an ascending sequence.
- **Responsible AI:** prompting for data professionals, grounded retrieval, evaluations, permission boundaries and human verification are separate instructional units rather than generic “use AI” suggestions.
- **Reproducibility and safety:** Git, CI, lineage, privacy and security controls are taught before learners encounter production-scale architecture.
- **Applied depth:** every new specialist module contains a substantial concept explanation, concrete worked example with interpretation, realistic case, four steps, a five-minute micro-project, model answer, and mistake to avoid.

### Existing topics to keep, reposition or de-emphasize
- **Keep** fundamental arithmetic, basic SQL, ordinary spreadsheet references and descriptive statistics. Beginners need them, but link each lesson to a tangible analysis problem instead of presenting abstract facts alone.
- **De-emphasize as primary techniques** legacy LOOKUP/VLOOKUP and manual copy-paste spreadsheet consolidations. Teach for maintenance and historical literacy; prefer structured tables, XLOOKUP when available, Power Query and validated transforms.
- **Avoid** chart decoration without metric design, memorizing isolated DAX/SQL syntax, cloud vendor names without architecture concepts, and purely theoretical mathematics disconnected from business interpretation.
- **Update assessments next:** some existing weekly multiple-choice items use generic distractors. Those remain unchanged in this compatibility-safe release; a later content-quality pass should introduce more diagnostic, scenario-specific feedback and version existing quiz banks.

### Delivery and status of implementation
- The complete 31-module supplement is displayed within `catalog.html` beneath the original course catalog. Filter by proficiency and specialization; expand each module to read the practical lesson and reveal the model answer.
- The seven existing 10-week courses link to the relevant specialist modules. **No existing course slug, week number, quiz result or Supabase progress record is changed.**
- The specialist material runs as **mobile-friendly reading, offline synthetic calculations and planning challenges**. Cloud warehouses, Spark, Kafka, MLflow and AI APIs are instructional topics; these cloud platforms are **not** emulated or connected by the new content.
- Treat `E08` as an assessed portfolio assignment and `F01–F07` as a zero-experience on-ramp. Estimated durations are only instructional planning estimates, not measured completions.

## 2. Proficiency-level guide

### Level 1 — Beginner (Foundations)
**Objective:** Start from zero. Understand data, use a spreadsheet, read basic SQL and Python, and explain what a number actually means. **Suggested guided study:** 15–25 guided hours, plus independent project time.

### Level 2 — Intermediate (Applied Skills)
**Objective:** Solve complete analytics tasks: clean data, join tables, explore patterns, design reports, and make your work reproducible. **Suggested guided study:** 25–40 guided hours, plus independent project time.

### Level 3 — Advanced (Specialized Mastery)
**Objective:** Build robust analytics and engineering workflows, evaluate models and experiments, and operate safely in the cloud. **Suggested guided study:** 35–55 guided hours, plus independent project time.

### Level 4 — Expert (Industry Systems)
**Objective:** Design governed, monitored, scalable systems for streaming, distributed data and responsible generative AI. **Suggested guided study:** 40–65 guided hours, plus independent project time.

## 3. Updated master curriculum table

| Level | Module name | Primary tools | Learning outcome |
|---|---|---|---|
| 1 · Beginner | **F01** Think like a data analyst | Paper, Excel / Sheets | Turn an imprecise business request into a testable metric and an appropriate decision. |
| 1 · Beginner | **F02** Spreadsheet literacy and formulas | Excel, Google Sheets | Build a clean table and calculate totals, averages and rates with correct references. |
| 1 · Beginner | **F03** First SQL queries | SQL / SQLite | Read a table and return only the records needed for a business question. |
| 1 · Beginner | **F04** Python from zero | Python | Write short, readable Python scripts that calculate and label a business result. |
| 1 · Beginner | **F05** Statistics you can explain | Excel / Sheets | Describe a small dataset while communicating spread, sample size and uncertainty. |
| 1 · Beginner | **F06** Clean data and protect people | Excel, Power Query | Identify data quality problems without losing traceability or exposing private information. |
| 1 · Beginner | **F07** Visuals that support decisions | Excel, Power BI, Tableau | Choose appropriate charts and write one correct, evidence-based insight. |
| 2 · Intermediate | **I01** Excel formulas and self-updating dashboards | Excel | Build reusable, auditable spreadsheet models with dynamic formulas and summary views. |
| 2 · Intermediate | **I02** Relational SQL: joins, CTEs and windows | SQL / SQLite | Write trustworthy multi-table analyses while preventing duplicated revenue and misplaced filters. |
| 2 · Intermediate | **I03** Power Query and repeatable ETL | Excel, Power BI, Power Query | Create a refreshable extract-transform-load flow with explicit cleaning and quality checks. |
| 2 · Intermediate | **I04** Python pandas and exploratory analysis | Python, pandas | Profile, clean and summarize a dataset with reproducible code and interpretable outputs. |
| 2 · Intermediate | **I05** Power BI modelling and DAX | Power BI, DAX | Build correct measures that respond predictably to filters and support business decisions. |
| 2 · Intermediate | **I06** Tableau and evidence-led storytelling | Tableau | Build an interactive, accessible view that guides users from an observation to a next action. |
| 2 · Intermediate | **I07** Inference and experiment literacy | Excel, Python | Interpret confidence intervals, p-values and experiment designs without overstating conclusions. |
| 2 · Intermediate | **I08** Git and reproducible analysis | Git, Python, SQL | Maintain versioned, reviewable work with tests and a lightweight change log. |
| 3 · Advanced | **A01** Production SQL and query performance | PostgreSQL, SQL Server, Snowflake | Tune and verify analytic queries without sacrificing correctness. |
| 3 · Advanced | **A02** Analytics engineering with dbt and Snowflake | dbt, Snowflake, SQL | Build a tested, documented warehouse transformation project that preserves metric meaning. |
| 3 · Advanced | **A03** Orchestrate resilient data pipelines | Airflow, Fabric Data Factory, SQL | Design a scheduled pipeline with retries, dependencies and observable data-quality checks. |
| 3 · Advanced | **A04** Cloud and lakehouse architecture | Azure/Fabric, AWS, GCP | Choose storage, processing and access patterns that fit cost, scale, governance and workload. |
| 3 · Advanced | **A05** Supervised machine learning that generalizes | Python, scikit-learn | Build and evaluate a baseline model with leakage prevention and an honest test set. |
| 3 · Advanced | **A06** A/B testing and causal evidence | Python, SQL, experimentation | Design, analyze and communicate an experiment with a valid primary metric. |
| 3 · Advanced | **A07** Time series and forecasting | Python, SQL, Power BI | Build a defensible forecast with seasonal baselines and error analysis. |
| 3 · Advanced | **A08** Data contracts, quality tests and CI/CD | dbt, GitHub Actions, Great Expectations | Enforce reliable schemas, freshness and business reconciliations before publishing downstream data. |
| 4 · Expert | **E01** Distributed computing with Spark | Apache Spark, Databricks, Fabric | Explain partitioned execution and choose Spark operations that avoid unnecessary shuffles. |
| 4 · Expert | **E02** Streaming analytics with Kafka | Kafka, Spark Structured Streaming | Design a near-real-time event flow with defined delivery guarantees and late-event handling. |
| 4 · Expert | **E03** MLOps: deployment and monitoring | MLflow, Python, CI/CD | Operate a model with reproducible versions, drift checks, monitoring and rollback. |
| 4 · Expert | **E04** Deep learning, embeddings and RAG | PyTorch, embeddings, vector search | Explain neural models and build a source-grounded retrieval-augmented question-answering prototype. |
| 4 · Expert | **E05** Prompt engineering, GenAI evaluation and agents | LLM API, Python, evaluation sets | Use generative AI to support data work while proving correctness and controlling tool access. |
| 4 · Expert | **E06** Data governance, privacy and security | Cloud IAM, data catalog, policy-as-code | Create enforceable controls for access, lineage, quality, retention and responsible data sharing. |
| 4 · Expert | **E07** Lakehouse engineering and interoperability | Delta Lake, Iceberg, Spark, SQL | Design a scalable, maintainable lakehouse with transactional table formats and clear data contracts. |
| 4 · Expert | **E08** Expert capstone: governed data product | SQL, Git, cloud, BI, Spark, ML | Explain and prototype an end-to-end data product with quality gates, secure access and monitored outcomes. |

## 4. Detailed module breakdowns

## Level 1: Beginner — Foundations

### F01 · Think like a data analyst
**Discipline:** Analytics  
**Primary tools:** Paper, Excel / Sheets  
**Learning objective:** Turn an imprecise business request into a testable metric and an appropriate decision.  
**Prerequisites:** None — suitable for someone who has never used analytics software.

**Core topics:** Observation vs explanation; Population, time frame and grain; KPIs and numerator/denominator; Decision-oriented reporting.

**Teach the concept:** An analyst is not someone who simply makes charts; an analyst converts a decision into a question that can be answered using evidence. First name the audience and the action they may take. Then define precisely what is counted, the time period, and what one record represents. A metric is only meaningful when its numerator and denominator use the same population and date window. Finally distinguish what the dataset directly shows from why you think it happened. This prevents a plausible story from being mistaken for proof.

**Business case study:** A delivery team says “service has become worse”. You have daily on-time and total delivery counts for East and West. The manager must decide where to investigate. Instead of plotting every available field, compare weekly on-time delivery rate for both regions and note missing dates.

**Guided practical walkthrough:**
1. Write the decision and its owner.
2. Choose the grain and define the metric.
3. Compare equal time windows and count missing records.
4. Explain the observed pattern and propose a check.

**Worked example:**

```text
Week 1: 81 on-time / 90 deliveries = 90%; Week 2: 72 on-time / 90 deliveries = 80%. The change is −10 percentage points, not −10 deliveries.
```

**How to interpret the result:** The rate declined, but this does not establish why: staffing, weather and route mix may differ. Check these before recommending a policy change.

**Five-minute mobile micro-project:** On your phone, draft one question about a shop with falling sales, specifying measure, period, comparison and decision.

**Model answer:** “Which shop had the largest week-over-week decline in net revenue over the last four complete weeks, and is it due to order count or average order value?”

**Common mistake:** Do not treat a correlation or a percentage change as a causal explanation.

**Next step:** Take F02 and the Data Analysis course, week 1.

### F02 · Spreadsheet literacy and formulas
**Discipline:** Analytics  
**Primary tools:** Excel, Google Sheets  
**Learning objective:** Build a clean table and calculate totals, averages and rates with correct references.  
**Prerequisites:** F01; ability to type or paste values into a grid.

**Core topics:** Cells, rows and columns; Types, dates and IDs; Relative vs absolute references; SUM, AVERAGE, IF and basic charts.

**Teach the concept:** Each row should represent one observation and each column a single field. Keep a header row, do not merge cells inside the dataset, and store numeric prices as numbers rather than strings with currency symbols. A formula begins with = and changes automatically when input cells change. Relative references move when a formula is copied; a fixed $ reference does not. Structured tables are preferred to scattered ranges because they expand with new data. A chart is a view of a clearly defined calculation, not a substitute for a valid one.

**Business case study:** A kiosk logs three orders: 2 notebooks at 500 each, 1 pen at 200, and 3 folders at 300. The owner wants total sales and a calculation that will remain correct when tomorrow’s data is added.

**Guided practical walkthrough:**
1. Enter Quantity and UnitPrice as numeric fields.
2. Calculate LineSales = Quantity × UnitPrice.
3. Convert the data to a structured table and sum LineSales.
4. Add one order and verify the total updates.

**Worked example:**

```text
Line sales = 2×500 = 1,000; 1×200 = 200; 3×300 = 900. Total = 2,100. In an Excel Table, use =SUM(Orders[LineSales]).
```

**How to interpret the result:** A total is a sum of line values, not a sum of quantities or an average of unit prices. Document whether refunds and discounts are included.

**Five-minute mobile micro-project:** Add a fourth order of 2 pens at 200 and calculate the revised total; list the Excel formula.

**Model answer:** New line sales = 400; revised total = 2,500. In a worksheet: =SUM(D2:D5), where D contains the calculated line totals.

**Common mistake:** Do not sum textual ID columns or assume formatting a cell changes its underlying data type.

**Next step:** Continue with the Excel Analytics weeks 1–4.

### F03 · First SQL queries
**Discipline:** Analytics  
**Primary tools:** SQL / SQLite  
**Learning objective:** Read a table and return only the records needed for a business question.  
**Prerequisites:** F01; understand what a row and column represent.

**Core topics:** Table grain, keys and types; SELECT and FROM; WHERE and Boolean logic; ORDER BY, LIMIT and NULLs.

**Teach the concept:** SQL describes the result you want from a relational database. SELECT chooses fields, FROM selects a source, WHERE checks which individual rows qualify, and ORDER BY determines the output order. A primary key identifies one row; a foreign key connects related tables. Unlike a spreadsheet, a database does not promise an inherent row order. Use AND/OR parentheses and NULL-aware predicates, because missing values are not identical to zero or an empty string.

**Business case study:** A merchant asks for completed East-region orders, highest value first. The orders table contains order_id, region, status and amount. A read-only query answers the request without changing records.

**Guided practical walkthrough:**
1. Inspect the table columns and identify the order grain.
2. Write SELECT with necessary fields only.
3. Add status and region filters.
4. Sort descending with a stable tie-break and inspect totals.

**Worked example:**

```text
SELECT order_id, amount FROM orders WHERE status = 'Completed' AND region = 'East' ORDER BY amount DESC, order_id;
```

**How to interpret the result:** The output contains individual East orders only; it is not a regional total. To obtain a sum, learn aggregation rather than adding a misleading label.

**Five-minute mobile micro-project:** Change the filter to return West completed orders worth at least 5,000, largest first.

**Model answer:** SELECT order_id, amount FROM orders WHERE status = 'Completed' AND region = 'West' AND amount >= 5000 ORDER BY amount DESC, order_id;

**Common mistake:** LIMIT without ORDER BY can return an unpredictable sample; = NULL will not test missing values.

**Next step:** Continue with SQL weeks 1–3 and try the SQL Practice Arena.

### F04 · Python from zero
**Discipline:** Data Science  
**Primary tools:** Python  
**Learning objective:** Write short, readable Python scripts that calculate and label a business result.  
**Prerequisites:** F01; no prior coding experience.

**Core topics:** Variables and scalar types; Lists and dictionaries; Conditions and loops; Functions and exceptions.

**Teach the concept:** Python lets you express an analysis as reproducible instructions. A variable stores a value, a list stores an ordered collection, and a dictionary pairs field names with values. A loop repeats a calculation, while a function packages a reusable step. An if statement controls branches based on a Boolean condition. Use descriptive names and small functions; a script that appears to run is not necessarily correct until you inspect its inputs and expected output.

**Business case study:** A small shop has order values [1200, 800, 500]. You want a total and an average you can recalculate when new orders arrive. This is a first step toward automated reporting.

**Guided practical walkthrough:**
1. Create a list of numeric order amounts.
2. Use sum() and len() with explicit variable names.
3. Handle the empty-list case to avoid division by zero.
4. Print a labelled result and test another list.

**Worked example:**

```text
values = [1200, 800, 500]
total = sum(values)
average = total / len(values) if values else 0
print(total, average)  # 2500 833.333...
```

**How to interpret the result:** Total is 2,500 and the mean is about 833.33 per order. It is not a forecast or a per-customer metric.

**Five-minute mobile micro-project:** Add a fourth order of 1,500. State the new total and average and write the revised code.

**Model answer:** 4,000 total and 1,000 average: values.append(1500); total=sum(values); average=total/len(values).

**Common mistake:** Never divide by len(values) without handling empty input; never confuse quoted numbers with numeric values.

**Next step:** Continue with Python fundamentals and the Python Practice Arena.

### F05 · Statistics you can explain
**Discipline:** Data Science  
**Primary tools:** Excel / Sheets  
**Learning objective:** Describe a small dataset while communicating spread, sample size and uncertainty.  
**Prerequisites:** F02; basic arithmetic.

**Core topics:** Mean, median and mode; Range and standard deviation; Outliers and distributions; Samples vs populations.

**Teach the concept:** Descriptive statistics reduce many observations to useful summaries. The mean is sensitive to extreme values; the median is often more representative of a skewed distribution. Spread matters because two groups can have the same average but very different consistency. Also identify whether the numbers cover every customer or only a sample. A sample estimate is not a guaranteed description of a population, especially when the collection process excludes some groups.

**Business case study:** Five delivery times in minutes are 10, 11, 12, 12 and 35. The manager asks for a “typical delivery time” and whether there is a delay problem.

**Guided practical walkthrough:**
1. Order the values and compute mean and median.
2. Identify the long-tail observation.
3. Write what the mean and median each communicate.
4. Propose one additional measurement before acting.

**Worked example:**

```text
Mean = (10+11+12+12+35)/5 = 16 minutes. Median = 12 minutes. Range = 35−10 = 25 minutes.
```

**How to interpret the result:** Most jobs are near 12 minutes but one took 35 minutes. Investigate the outlier rather than automatically deleting it.

**Five-minute mobile micro-project:** A second courier has times 12,12,12,12,12. Both groups have median 12; explain how service reliability differs.

**Model answer:** The second courier has zero observed range while the first ranges over 25 minutes; similar median does not mean similar predictability.

**Common mistake:** Averages alone hide outliers and sampling bias. A small sample cannot establish a stable service-level agreement.

**Next step:** Continue with Statistics weeks 1–5.

### F06 · Clean data and protect people
**Discipline:** Analytics  
**Primary tools:** Excel, Power Query  
**Learning objective:** Identify data quality problems without losing traceability or exposing private information.  
**Prerequisites:** F01–F02; basic tables.

**Core topics:** Missingness and duplicates; Identifiers and date locale; Validation rules and change logs; PII minimization and ethical use.

**Teach the concept:** Quality is not simply deleting blanks. Completeness, validity, uniqueness, consistency and timeliness each require a business rule. A missing delivery date may be correct for an open order but invalid for a completed order. Preserve the raw input and log transformations; record how many rows were changed or excluded. Treat names, phone numbers and account IDs as sensitive when they identify a person. Use small synthetic datasets in exercises and share only what a learning task actually needs.

**Business case study:** A CSV has 100 orders, five repeated IDs and six missing completion dates. Four of the missing dates belong to still-open orders. A safe quality report distinguishes expected blanks from data errors.

**Guided practical walkthrough:**
1. Define rules based on order status.
2. Count duplicate keys and affected records.
3. Separate acceptable from invalid missing dates.
4. Create a reconciliation log and redact personally identifying fields.

**Worked example:**

```text
Of six missing completion dates, only two are exceptions if the other four belong to open orders. Report “2 invalid completed orders” rather than “6 corrupt rows.”
```

**How to interpret the result:** Dedupe rules require evidence: repeated IDs may represent accidental duplication or legitimate source updates. Do not delete before inspecting their business meaning.

**Five-minute mobile micro-project:** List three checks for a customer sales table and say which columns you would mask in a public learning example.

**Model answer:** Checks: unique order ID, nonnegative sale amount, required completion date for completed status. Mask customer name, phone number and email.

**Common mistake:** Replacing unknown amounts with zero biases financial totals; never publish personal records to a classroom sandbox.

**Next step:** Continue with Power Query weeks 2–3 and Data Analysis week 8.

### F07 · Visuals that support decisions
**Discipline:** Business Intelligence  
**Primary tools:** Excel, Power BI, Tableau  
**Learning objective:** Choose appropriate charts and write one correct, evidence-based insight.  
**Prerequisites:** F01–F05; an understanding of percentages.

**Core topics:** Bar vs line vs scatter; Axes and baselines; Measures, dimensions and rates; Plain-language chart commentary.

**Teach the concept:** Visual design begins with the question. Compare categories with bars and change over time with lines; use a scatterplot only when investigating the relationship between two quantitative variables. Label units, periods and population. Avoid truncated bar-chart axes that exaggerate differences, and never put incompatible scales on one axis. An insight should state the observed pattern, its likely operational relevance, and what remains unknown.

**Business case study:** A weekly sales dashboard shows East = 120,000 and West = 80,000 over the same seven days. A regional manager wants to allocate follow-up calls.

**Guided practical walkthrough:**
1. Define the aggregation and time filter.
2. Choose a horizontal bar chart with zero baseline.
3. Annotate the values and relevant comparison.
4. Write an observation plus one question for further analysis.

**Worked example:**

```text
East contributes 120,000 / 200,000 = 60% of the observed two-region revenue; West contributes 40%.
```

**How to interpret the result:** Being 60% of revenue does not mean East is 60% more profitable. Profit requires expenses, returns and margins.

**Five-minute mobile micro-project:** Pick a chart for monthly sales trend and one for order value by category; say why each fits.

**Model answer:** Line chart for month-to-month trend; bar chart for category comparisons. Both need clear labels, an explicit period and a consistent metric.

**Common mistake:** Do not infer causality from chart shape or compare values from different populations without normalization.

**Next step:** Continue with Power BI or Tableau weeks 1–3.

## Level 2: Intermediate — Applied Skills

### I01 · Excel formulas and self-updating dashboards
**Discipline:** Analytics  
**Primary tools:** Excel  
**Learning objective:** Build reusable, auditable spreadsheet models with dynamic formulas and summary views.  
**Prerequisites:** F02, F05; comfortable with formulas and basic tables.

**Core topics:** XLOOKUP, SUMIFS and LET; FILTER, UNIQUE and SORT; Tables and PivotTables; Validation and dashboard usability.

**Teach the concept:** As workbooks grow, avoid copying the same hard-coded formula into many cells. Structured references name the business fields, XLOOKUP connects a fact table to a dimension, SUMIFS aggregates with explicit conditions, and LET assigns readable names to parts of a calculation. Dynamic arrays spill variable-sized results into adjacent cells; keep the spill area free. Validate each formula against a manually checked small dataset, and put the data grain and refresh date on the dashboard.

**Business case study:** A shop receives new rows daily. The owner needs completed revenue by region, with a product lookup for cost and a gross-margin KPI that updates after new orders.

**Guided practical walkthrough:**
1. Create named Excel Tables for Orders and Products.
2. Use XLOOKUP to populate unit cost and LET to name intermediate metrics.
3. Build a PivotTable or SUMIFS summary with month and region filters.
4. Compare dashboard totals against the raw table and document omissions.

**Worked example:**

```text
=LET(sales, SUMIFS(Orders[Revenue],Orders[Status],"Completed"), cost, SUMIFS(Orders[Cost],Orders[Status],"Completed"), IFERROR((sales-cost)/sales,0))
```

**How to interpret the result:** Gross margin is (revenue−cost)/revenue, not profit divided by cost. A zero-revenue case needs deliberate handling rather than a hidden error.

**Five-minute mobile micro-project:** Given completed sales of 200,000 and cost of 150,000, calculate gross margin and explain the denominator.

**Model answer:** 25%: (200,000−150,000)/200,000. Revenue is the denominator because margin is the share of sales retained after costs.

**Common mistake:** Gross margin differs from net margin; spill formulas do not work identically in every older Excel version.

**Next step:** Take Excel weeks 4–10, then progress to dbt and warehouse modelling.

### I02 · Relational SQL: joins, CTEs and windows
**Discipline:** Analytics  
**Primary tools:** SQL / SQLite  
**Learning objective:** Write trustworthy multi-table analyses while preventing duplicated revenue and misplaced filters.  
**Prerequisites:** F03; SELECT, WHERE and ORDER BY.

**Core topics:** Join cardinality and grain; GROUP BY and HAVING; CTEs and window functions; NULL-safe reconciliation.

**Teach the concept:** A join combines tables based on related keys, but it can also multiply rows: an order with three lines appears three times after joining headers to lines. Know the grain of each table before aggregating. A CTE makes multi-step logic readable; a window function calculates rankings or running totals without collapsing individual rows. Validate against a known source total and count distinct business keys after any join.

**Business case study:** A retailer keeps Orders(order_id, region) and Lines(order_id, product_id, amount). Operations wants revenue by region and the top-selling product without counting each header repeatedly.

**Guided practical walkthrough:**
1. Check uniqueness on the order and line keys.
2. Join lines to orders and sum line amount by region.
3. Use a CTE to aggregate product revenue.
4. Use DENSE_RANK over revenue to identify top products and reconcile totals.

**Worked example:**

```text
WITH product_sales AS (SELECT product_id, SUM(amount) AS revenue FROM lines GROUP BY product_id) SELECT product_id,revenue,DENSE_RANK() OVER (ORDER BY revenue DESC) AS rank_no FROM product_sales;
```

**How to interpret the result:** The ranking is across products because the window has no PARTITION BY. Add PARTITION BY region only after a region column exists in the grouped result.

**Five-minute mobile micro-project:** A header has total 100 and three line records of 20,30,50. Why does SUM(header.total) after a join return 300, and what would you sum instead?

**Model answer:** The header value repeats on every line (3×100). Sum line amount = 100, or pre-aggregate at order grain before joining.

**Common mistake:** SELECT DISTINCT is not a reliable fix for a bad join; it may hide duplicate records instead of reconciling the grain.

**Next step:** Take SQL weeks 4–10 and write reconciliation tests.

### I03 · Power Query and repeatable ETL
**Discipline:** Data Engineering  
**Primary tools:** Excel, Power BI, Power Query  
**Learning objective:** Create a refreshable extract-transform-load flow with explicit cleaning and quality checks.  
**Prerequisites:** F02, F06; basic spreadsheet transformations.

**Core topics:** Connectors and type inference; Append, merge and unpivot; M transformations and parameters; Refresh validation and error handling.

**Teach the concept:** Power Query records a reproducible set of transformation steps. First inspect source fields and types, then apply changes deliberately: parse dates with the right locale, remove or flag invalid values, append similar files and merge dimension fields using verified join keys. Unpivot repeated month columns into tidy rows before analysis. A good pipeline is idempotent: rerunning it with the same input produces the same output. Record input row counts and exceptions so refresh failures are visible.

**Business case study:** A training company collects Jan and Feb attendance files, but one file writes dates as DD/MM/YYYY and the other as ISO dates. The owner wants one monthly participation report.

**Guided practical walkthrough:**
1. Append the files without deleting source copies.
2. Apply date parsing per source and normalize status codes.
3. Merge the course lookup on a unique course ID.
4. Group monthly counts and log invalid rows.

**Worked example:**

```text
M example: Table.TransformColumnTypes(Source, {{"Date", type date}, {"Attended", Int64.Type}}, "en-GB")
```

**How to interpret the result:** The locale affects how dates are parsed, not merely how they display. A mistaken locale can silently move attendance between months.

**Five-minute mobile micro-project:** Describe why January and February data should be appended rather than merged when the columns represent the same fields.

**Model answer:** Append stacks rows for the same schema; merge adds columns using key matches. Check the combined row count equals the input counts, less documented exclusions.

**Common mistake:** Removing errors silently makes totals unreliable; inspect the cause and report exclusions.

**Next step:** Take the Power Query course and learn orchestration at A-level.

### I04 · Python pandas and exploratory analysis
**Discipline:** Data Science  
**Primary tools:** Python, pandas  
**Learning objective:** Profile, clean and summarize a dataset with reproducible code and interpretable outputs.  
**Prerequisites:** F04–F06; functions, lists and descriptive statistics.

**Core topics:** Reading CSV and dataframes; Types, missing values and groupby; Merges and deduplication; EDA charts and notebooks.

**Teach the concept:** A pandas DataFrame is an in-memory table with labelled columns. Loading a CSV is not the same as validating it: check dtypes, null counts, duplicates and business keys before computing a result. GroupBy summarizes by categories, while merge can accidentally duplicate records when a lookup key is not unique. A notebook should explain why each transformation is appropriate, not only display the output. For reproducibility, freeze the sample dataset, seed any randomized steps and keep assertions on known totals.

**Business case study:** You receive 200 synthetic orders with region, status, amount and refund. The business wants net revenue by region and a list of suspicious duplicates.

**Guided practical walkthrough:**
1. Read the file and inspect shape, dtypes and nulls.
2. Flag duplicate order IDs and resolve them with a documented rule.
3. Define net revenue and filter completed orders.
4. Group by region, check source totals, and plot a labelled comparison.

**Worked example:**

```text
net = df.loc[df['status'].eq('Completed')].assign(net=lambda x:x.amount-x.refund); net.groupby('region')['net'].sum()
```

**How to interpret the result:** `net` must be defined at a consistent row grain; subtracting refunds from unrelated rows would overstate or understate revenue.

**Five-minute mobile micro-project:** Explain why `df.drop_duplicates()` without a business key can be dangerous on an order dataset.

**Model answer:** Identical-looking rows may reflect real repeated purchases, while two versions of one ID may differ. Verify an order key and update policy before deduplicating.

**Common mistake:** EDA patterns are observations, not causal findings; redact or synthesize personal data in shared notebooks.

**Next step:** Continue to statistical inference, forecasting and production ML.

### I05 · Power BI modelling and DAX
**Discipline:** Business Intelligence  
**Primary tools:** Power BI, DAX  
**Learning objective:** Build correct measures that respond predictably to filters and support business decisions.  
**Prerequisites:** F02, F05, F07 and basic SQL joins.

**Core topics:** Facts, dimensions and star schema; CALCULATE and filter context; Measures vs calculated columns; Date tables and report interaction.

**Teach the concept:** A Power BI report depends on its semantic model. Store transactions in fact tables and descriptive attributes in dimension tables with clear one-to-many relationships. Measures calculate at query time in the filter context created by slicers and visuals; calculated columns materialize during refresh. CALCULATE changes filter context, so denominator choice requires care. A robust report reconciles grand totals and makes users aware of the time window and units.

**Business case study:** A workforce report measures assigned hours against available hours by team. Management asks whether 80% team utilization means each person is near 80%.

**Guided practical walkthrough:**
1. Model Resources, Dates and Allocations with documented keys.
2. Write total assigned and available hours measures.
3. Calculate weighted utilization with DIVIDE.
4. Test a single resource, then team and date slicers and compare totals.

**Worked example:**

```text
Utilization % = DIVIDE(SUM(Allocations[AssignedHours]), SUM(Capacity[AvailableHours]))
```

**How to interpret the result:** The team ratio is weighted by available hours, not necessarily the unweighted average of individual utilization percentages.

**Five-minute mobile micro-project:** Two people have 20/40 and 36/40 assigned hours. Calculate weighted team utilization.

**Model answer:** (20+36)/(40+40) = 70%. The arithmetic average of 50% and 90% also happens to be 70% here because capacity is equal.

**Common mistake:** Be careful with many-to-many relationships and denominators altered by filters; validate each context.

**Next step:** Take Power BI weeks 3–10 and progress to enterprise modelling.

### I06 · Tableau and evidence-led storytelling
**Discipline:** Business Intelligence  
**Primary tools:** Tableau  
**Learning objective:** Build an interactive, accessible view that guides users from an observation to a next action.  
**Prerequisites:** F05, F07; comfort with categorical and time-series data.

**Core topics:** Marks, encodings and chart choice; Calculated fields, LOD and table calculations; Parameters, filters and actions; Dashboard accessibility and narrative.

**Teach the concept:** Tableau creates views by combining dimensions, measures and visual encodings. First decide the unit of analysis, then place a metric in the view and test the aggregation. Tableau LOD calculations fix or change the aggregation scope independently of some view details; table calculations operate over the marks in the rendered partition. Interactive filters should clarify the result rather than make it impossible to compare periods. Provide explicit units, colour-safe labels and tooltips with key definitions.

**Business case study:** A retail operations analyst wants to identify which branch is falling behind the prior quarter. A dashboard should let a manager filter region, inspect the branch, and read the relevant contribution to the decline.

**Guided practical walkthrough:**
1. Create a trend with correctly ordered dates.
2. Build a region comparison and a metric definition tooltip.
3. Add a parameter or action to inspect one branch.
4. Add a short caveat and check dashboard behaviour at mobile width.

**Worked example:**

```text
Example calculated field: SUM([Sales]) / SUM([Orders]) — only valid as average order value if [Orders] is a suitable count field at the intended grain.
```

**How to interpret the result:** Dividing two aggregated measures is often preferable to averaging per-row ratios. Confirm what an order count represents.

**Five-minute mobile micro-project:** Create a title and insight sentence for a dashboard where Branch A declines from 100k to 85k.

**Model answer:** “Branch A net sales fell 15% quarter over quarter (100k → 85k); inspect traffic and returns before attributing the change.”

**Common mistake:** Using an LOD expression does not automatically fix erroneous joins or mismatched grain.

**Next step:** Take Tableau weeks 4–10 and compare with Power BI modelling.

### I07 · Inference and experiment literacy
**Discipline:** Data Science  
**Primary tools:** Excel, Python  
**Learning objective:** Interpret confidence intervals, p-values and experiment designs without overstating conclusions.  
**Prerequisites:** F05; percentages and basic probability.

**Core topics:** Sampling and confidence intervals; Hypotheses and p-values; Effect sizes and power; Randomization, confounders and segmentation.

**Teach the concept:** Statistical inference uses sample data to estimate a population quantity under stated assumptions. A confidence interval expresses uncertainty using a procedure that would cover the true fixed value at its advertised rate over repeated samples. A p-value describes how surprising a statistic would be if a null model were true; it is not the probability that the null is true. Before trusting an A/B experiment, verify random assignment, sample size, eligibility and a pre-selected primary metric.

**Business case study:** A website tests a shorter checkout. Version A converts 20 of 100 visitors and B converts 24 of 100. The team wants to declare a winner immediately.

**Guided practical walkthrough:**
1. Define eligible visitors and conversion before calculating.
2. Compute the observed conversion rates.
3. State the absolute difference and what uncertainty remains.
4. Discuss sample size, randomization and what a significance test would assess.

**Worked example:**

```text
A = 20%, B = 24%; observed lift = +4 percentage points (relative lift +20%). This alone is not proof of a repeatable improvement.
```

**How to interpret the result:** An apparent 20% relative lift sounds substantial, but only four additional conversions occurred in these small samples.

**Five-minute mobile micro-project:** Explain the difference between +4 percentage points and +20% relative lift in this example.

**Model answer:** Absolute difference = 24%−20% = 4 points; relative lift = (24−20)/20 = 20% measured against A.

**Common mistake:** Never stop an experiment early just because the current p-value looks favourable without a valid sequential design.

**Next step:** Continue to advanced A/B testing and causal inference.

### I08 · Git and reproducible analysis
**Discipline:** Data Engineering  
**Primary tools:** Git, Python, SQL  
**Learning objective:** Maintain versioned, reviewable work with tests and a lightweight change log.  
**Prerequisites:** F03 or F04; a small working SQL or Python script.

**Core topics:** Git add, commit, branch and merge; README and environment files; Tests and reproducibility; Review workflows and secret hygiene.

**Teach the concept:** Version control tells you what changed, why, and when, making analysis auditable. A repository should keep code, sample synthetic inputs, instructions and tests while excluding secrets and raw personal data. Use descriptive commits, feature branches for experimentation and peer review before merging. Record tool versions and assumptions so another analyst can reproduce the results. A correct analysis with no provenance is hard to maintain or defend.

**Business case study:** Two analysts share a weekly revenue query. One quietly changes how refunds are handled; the reported number changes without an explanation.

**Guided practical walkthrough:**
1. Create a repository with a README and synthetic sample.
2. Commit the initial query and expected total.
3. Create a branch for refund handling and add a test.
4. Review the diff, explain the changed metric and merge.

**Worked example:**

```text
Example commit flow: git switch -c fix/refunds; git add revenue.sql tests/; git commit -m "Account for completed-order refunds"
```

**How to interpret the result:** The test should record an expected result and fail if a future edit changes it accidentally.

**Five-minute mobile micro-project:** Write a one-line commit message for fixing a duplicate join and list two files that should never be committed.

**Model answer:** Commit: “Fix order-line fanout in revenue calculation”. Exclude .env with API secrets and raw customer exports.

**Common mistake:** Git does not replace secure backups or data-access permissions; never place credentials in a training repository.

**Next step:** Continue to dbt projects and CI/CD.

## Level 3: Advanced — Specialized Mastery

### A01 · Production SQL and query performance
**Discipline:** Data Engineering  
**Primary tools:** PostgreSQL, SQL Server, Snowflake  
**Learning objective:** Tune and verify analytic queries without sacrificing correctness.  
**Prerequisites:** I02, I08; fluency with joins and window functions.

**Core topics:** Execution plans, scans and joins; Indexes, partitions and pruning; Incremental logic and SCDs; Reconciliation and query tests.

**Teach the concept:** Production SQL must be both correct and efficient. The optimizer selects a plan using table statistics, estimated cardinality and available access paths. Examine actual plans and measure the bottleneck before creating indexes or rewriting queries. Filter early when possible, keep predicates searchable, and distinguish OLTP index design from warehouse partition pruning. A slowly changing dimension preserves history so a transaction can be reported using the category valid at the time. Every optimization must preserve row counts and business totals.

**Business case study:** A daily sales dashboard is slowing as the orders table reaches millions of rows. A developer suggests adding DISTINCT to every join, masking duplicated revenue rather than fixing the data model.

**Guided practical walkthrough:**
1. Capture baseline timing and reconciled totals.
2. Inspect the explain plan for large scans or many-to-many joins.
3. Rewrite the join at a documented grain and test date pruning.
4. Compare execution time, rows and totals after changes.

**Worked example:**

```text
SELECT region, SUM(net_amount) FROM fact_orders WHERE order_date >= DATE '2026-01-01' GROUP BY region;  -- Verify pruning/partition choice in the actual target engine.
```

**How to interpret the result:** Query syntax and date types differ by engine. Correctness must be checked independently of performance.

**Five-minute mobile micro-project:** An order header of 400 joins to four lines. Why is SUM(header_amount) = 1,600 and what source should control the total?

**Model answer:** The header repeats four times. Aggregate transaction line amounts or a one-row-per-order intermediate table, then reconcile the result to 400.

**Common mistake:** An index that speeds a demo may slow writes or be ignored by a columnar cloud warehouse.

**Next step:** Continue to A02 and A08 for governed transformations.

### A02 · Analytics engineering with dbt and Snowflake
**Discipline:** Data Engineering  
**Primary tools:** dbt, Snowflake, SQL  
**Learning objective:** Build a tested, documented warehouse transformation project that preserves metric meaning.  
**Prerequisites:** I02 and I08; query validation and Git basics.

**Core topics:** Staging, intermediate and marts; dbt models, refs and sources; Unique/not-null/relationship tests; Incremental models, lineage and docs.

**Teach the concept:** Modern analytics engineering treats transformations like software. Stage source fields without altering business logic, use intermediate models for reusable joins and build marts at clearly defined grains. In dbt, `ref()` expresses dependencies between models; source declarations document upstream tables. Test uniqueness, relationships and accepted values to detect silent data errors before a dashboard reads them. Decide when a view, table or incremental materialization is appropriate; incremental updates require a sound unique key and late-arriving record strategy.

**Business case study:** A subscription service calculates monthly recurring revenue in three dashboards, each with slightly different refund rules. An analytics engineer creates one reviewed revenue mart and publishes its definition.

**Guided practical walkthrough:**
1. Define raw sources and a staging contract.
2. Build customer and transaction staging models.
3. Create a monthly revenue mart with an explicit grain.
4. Add tests, documentation and a reconciliation query before deploying.

**Worked example:**

```text
dbt source example: SELECT customer_id, SUM(net_amount) AS net_revenue FROM {{ ref('stg_payments') }} GROUP BY customer_id;  -- model tests must enforce customer_id uniqueness in the output.
```

**How to interpret the result:** Whether the model is at customer or customer-month grain is part of the contract; date must be included if the latter is intended.

**Five-minute mobile micro-project:** Choose two data tests for a customer revenue mart and say what each catches.

**Model answer:** Unique customer_id detects unexpected duplicate rows; not_null customer_id prevents unassignable revenue. Add relationship checks where dimensions are required.

**Common mistake:** Modelling tools cannot compensate for an undefined KPI or incorrect source grain.

**Next step:** Explore certified metrics, lineage and CI alongside governance.

### A03 · Orchestrate resilient data pipelines
**Discipline:** Data Engineering  
**Primary tools:** Airflow, Fabric Data Factory, SQL  
**Learning objective:** Design a scheduled pipeline with retries, dependencies and observable data-quality checks.  
**Prerequisites:** I03, I08; reproducible transformations.

**Core topics:** DAGs and dependency order; Idempotent tasks and backfills; Retries, SLAs and alerts; Watermarks and schema drift.

**Teach the concept:** A data pipeline is a directed flow of tasks, not a collection of unrelated scripts. An orchestrator coordinates ingestion, transformation, quality checks and publishing while recording what ran and when. Design each task to be safe to retry: processing the same date twice should not double sales. Watermarks track how far data has arrived; backfills recompute a bounded period after late data. Use failure alerts based on business impact, not just whether a job exited with code zero.

**Business case study:** A retailer receives a daily order file at 02:00. A dashboard refresh at 02:05 sometimes reports incomplete revenue because delivery is late.

**Guided practical walkthrough:**
1. Define a freshness threshold and arrival check.
2. Ingest only once per batch ID and record row counts.
3. Run transformations and validation after ingestion succeeds.
4. Publish after validation and alert if freshness or totals fail.

**Worked example:**

```text
DAG: wait_for_file → ingest_raw → validate_schema → transform_daily → reconcile_totals → publish_report.
```

**How to interpret the result:** If validation fails, the publishing task should not run; the previous confirmed dataset should remain available with a freshness warning.

**Five-minute mobile micro-project:** What happens when the 01 Nov file arrives late after the 02 Nov run, and how would you repair the date window?

**Model answer:** Use a bounded backfill for affected partitions, rerun idempotent tasks and reconcile final totals before republishing. Do not insert duplicate batches.

**Common mistake:** Blind retries can multiply records or overload source systems if tasks are not idempotent.

**Next step:** Move to A04 for cloud architectural decisions.

### A04 · Cloud and lakehouse architecture
**Discipline:** Data Engineering  
**Primary tools:** Azure/Fabric, AWS, GCP  
**Learning objective:** Choose storage, processing and access patterns that fit cost, scale, governance and workload.  
**Prerequisites:** I02, I03, I08; SQL and ETL fundamentals.

**Core topics:** Object storage vs databases; Warehouse vs lakehouse; IAM, networks and encryption; Cost, scaling and regional residency.

**Teach the concept:** Cloud architecture is a sequence of trade-offs rather than one magic service. Object storage handles large durable files; a warehouse offers managed SQL analytics; a lakehouse combines file-based storage with table reliability and computational engines. Separate raw, curated and serving layers and document who can read each. Use least-privilege roles, retention policies and encryption. Choose services according to volume, freshness, concurrency and budget; a small batch workload may not justify an expensive streaming cluster.

**Business case study:** A regional health NGO wants monthly aggregate reports from three offices. Data includes personally identifying records and must be accessible only to an approved team.

**Guided practical walkthrough:**
1. Classify raw and aggregate fields and residency rules.
2. Sketch landing, curated and reporting layers.
3. Assign restricted IAM roles and retention policies.
4. Estimate workload costs and pick an appropriately simple engine.

**Worked example:**

```text
Architecture: restricted bucket → ingestion job → curated table with pseudonymized IDs → SQL reporting view with aggregated counts.
```

**How to interpret the result:** Distributing dashboards does not require publishing the raw person-level data. Access controls must be enforced at the storage and query layers.

**Five-minute mobile micro-project:** Name one reason to choose a warehouse over a Spark cluster for a small daily reporting workload.

**Model answer:** A managed warehouse can run familiar SQL with fewer operational components and often lower total maintenance burden for small, structured batch queries.

**Common mistake:** Never place secret keys in front-end code or treat region selection as a purely technical preference.

**Next step:** Continue to L4 governance, Spark and streaming.

### A05 · Supervised machine learning that generalizes
**Discipline:** Data Science  
**Primary tools:** Python, scikit-learn  
**Learning objective:** Build and evaluate a baseline model with leakage prevention and an honest test set.  
**Prerequisites:** I04 and I07; pandas and probability.

**Core topics:** Target and feature definition; Train/validation/test split; Regression vs classification; Metrics, bias and leakage.

**Teach the concept:** Machine learning learns statistical patterns from examples; it does not inherently uncover causal rules. Define the prediction target and decision deadline first, so you do not include future information as a feature. Split data according to the use case: time-based data often needs temporal validation rather than random splitting. Begin with a simple baseline, choose metrics aligned with error costs, and inspect performance across groups. Document model limitations and never claim a strong accuracy score without saying what dataset produced it.

**Business case study:** A shop predicts next-week stockouts from prior sales and supply lead time. Using the actual future stockout quantity as a feature produces an unrealistic near-perfect model.

**Guided practical walkthrough:**
1. Define the point of prediction and available features.
2. Build a time-based holdout set.
3. Train a simple classifier against a no-skill baseline.
4. Compare precision/recall on a held-out period and check leakage.

**Worked example:**

```text
If 8 out of 10 predicted stockouts are genuine, precision = 80%. If there were 20 actual stockouts and the model found 8, recall = 40%.
```

**How to interpret the result:** An 80% precision model may still miss most stockouts. Choose a threshold based on the cost of missed shortages versus false alarms.

**Five-minute mobile micro-project:** Which metric is more useful if missing a stockout is very costly: precision or recall, and why?

**Model answer:** Recall is usually prioritized because it measures how many actual stockouts were found; still monitor precision so false alarms remain manageable.

**Common mistake:** Do not normalize or impute using all rows before splitting; it leaks test information into training.

**Next step:** Continue to L4 MLOps, drift and responsible deployment.

### A06 · A/B testing and causal evidence
**Discipline:** Data Science  
**Primary tools:** Python, SQL, experimentation  
**Learning objective:** Design, analyze and communicate an experiment with a valid primary metric.  
**Prerequisites:** I07; sample inference, proportions and business metrics.

**Core topics:** Randomization and eligibility; Sample size and detectable effect; Confidence intervals and peeking; Guardrail metrics and subgroup bias.

**Teach the concept:** Controlled experiments attempt to estimate a treatment effect by comparing randomized groups. Define the hypothesis, allocation unit, primary metric and stopping rule before launch. Check whether users remain in assigned groups and whether sample ratios match the plan. A result can be statistically detectable but economically unimportant, or useful but too uncertain to make a decision. Watch guardrails such as refunds and latency so optimizing one metric does not cause collateral damage.

**Business case study:** A checkout layout test appears to increase conversion, but the treatment group receives fewer mobile users due to a tracking bug.

**Guided practical walkthrough:**
1. Pre-register the conversion outcome and mobile guardrails.
2. Audit randomization and sample-ratio balance.
3. Calculate effect size and an appropriate uncertainty interval.
4. Decide whether to ship, extend or invalidate the experiment and document the rationale.

**Worked example:**

```text
A converts 200/1,000 = 20%; B converts 220/1,000 = 22%. Observed uplift = +2 percentage points, or +10% relative.
```

**How to interpret the result:** The difference is an estimate. Statistical confidence requires an uncertainty calculation and a valid randomization and measurement process.

**Five-minute mobile micro-project:** Treatment causes refunds to rise from 1% to 4%. Should a conversion lift alone justify rollout?

**Model answer:** No. Evaluate the refund guardrail and business value; a higher conversion rate may be offset by costly negative effects.

**Common mistake:** A significant p-value does not repair broken assignment, multiple unplanned analyses or a biased measurement pipeline.

**Next step:** Continue to causal methods and monitoring.

### A07 · Time series and forecasting
**Discipline:** Data Science  
**Primary tools:** Python, SQL, Power BI  
**Learning objective:** Build a defensible forecast with seasonal baselines and error analysis.  
**Prerequisites:** I04 and I07; date handling and descriptive statistics.

**Core topics:** Trends, cycles and seasonality; Time-based backtesting; MAE, MAPE and sMAPE; Scenario and prediction intervals.

**Teach the concept:** Forecasting is about predicting future observations using information available at the forecast origin. Begin with a naive or seasonal-naive baseline; complex models are only useful when they outperform this. Keep the training and evaluation periods ordered in time to prevent future leakage. Measure accuracy using an appropriate metric: percentage error is unstable around zero, while mean absolute error remains interpretable in original units. Explain uncertainty and the operational cost of over- or under-forecasting.

**Business case study:** A warehouse forecasts weekly demand for a product that sells more during holidays. A random train/test split mixes future holiday patterns into the past and overstates accuracy.

**Guided practical walkthrough:**
1. Visualize demand by week and annotate major events.
2. Define the horizon and seasonal baseline.
3. Backtest on successive future windows.
4. Compare MAE and bias; describe limitations and uncertainty.

**Worked example:**

```text
Actual demand [100,120] and forecasts [90,130] yield absolute errors [10,10] and MAE = 10 units.
```

**How to interpret the result:** A MAE of 10 is only useful compared with stockout and inventory costs and a baseline such as last-week demand.

**Five-minute mobile micro-project:** If a model systematically underforecasts holiday weeks by 20 units, what operational risk follows?

**Model answer:** Understocking and missed sales; add an event/holiday indicator or increase safety stock while validating on past holiday windows.

**Common mistake:** Do not evaluate time-series models on randomly shuffled data or declare precision without uncertainty.

**Next step:** Continue to ML deployment and alerting.

### A08 · Data contracts, quality tests and CI/CD
**Discipline:** Data Engineering  
**Primary tools:** dbt, GitHub Actions, Great Expectations  
**Learning objective:** Enforce reliable schemas, freshness and business reconciliations before publishing downstream data.  
**Prerequisites:** I03, I08 and A02; SQL transformations and Git workflow.

**Core topics:** Schema and semantic contracts; Freshness and uniqueness tests; CI pipelines and staged release; Incidents, backfills and lineage.

**Teach the concept:** Production pipelines fail in ways that look like success: a source adds a new status code, a late partition arrives, or a join quietly doubles transactions. A data contract defines expected types, allowed keys and freshness standards between teams. Test each layer’s correctness and reconcile significant business totals before releases. CI runs checks on every change; deployment promotion should be possible to reverse, with incident owners and clear rollback procedures.

**Business case study:** An upstream team changes amount from numeric to formatted text. Reports still refresh but net revenue becomes null for part of the month.

**Guided practical walkthrough:**
1. Define amount type and non-null rules in a source contract.
2. Add a duplicate-key and daily total check.
3. Run tests in CI against representative fixtures.
4. Quarantine invalid batches and publish a failure status instead of a misleading total.

**Worked example:**

```text
Example test: number of completed orders in curated data = source completed order count ± documented exclusions.
```

**How to interpret the result:** A quality test should express a business invariant, not only the absence of SQL exceptions.

**Five-minute mobile micro-project:** Give one semantic test a report should pass before being released, beyond checking a column data type.

**Model answer:** Revenue reconciles within a documented tolerance to the source ledger for the same dates, status rules and currency; explain deviations.

**Common mistake:** Passing unit tests does not guarantee correctness if they only assert that code runs rather than what numbers mean.

**Next step:** Continue to real-time observability and governance.

## Level 4: Expert — Industry Systems

### E01 · Distributed computing with Spark
**Discipline:** Data Engineering  
**Primary tools:** Apache Spark, Databricks, Fabric  
**Learning objective:** Explain partitioned execution and choose Spark operations that avoid unnecessary shuffles.  
**Prerequisites:** A01, A03, A04; SQL, partitioning and pipelines.

**Core topics:** Driver, executors and partitions; Spark DataFrames and SQL; Shuffle, skew, broadcast joins; Delta/Iceberg table formats and optimization.

**Teach the concept:** Spark distributes data processing across worker executors. Operations such as filtering and simple projections are often local to partitions; joins and groupings may trigger a network shuffle. Big data performance depends on data size, partition layout and key distribution—not only writing short code. DataFrame transformations are lazy until an action runs. Open table formats can add transaction semantics and schema evolution to object storage, but each format has its own feature support and operational trade-offs.

**Business case study:** A telecom data lake receives millions of call records daily. Grouping by country works, but one extremely common country key slows a shuffle stage and causes skew.

**Guided practical walkthrough:**
1. Describe the record grain and daily partition strategy.
2. Inspect stage metrics and locate the skewed grouping key.
3. Filter early and consider targeted salting or re-partitioning only after measurement.
4. Validate total record counts and billable amounts after tuning.

**Worked example:**

```text
Pseudocode: df.filter("date >= date_sub(current_date(), 7)").groupBy("region").count() — partition pruning requires matching the physical layout.
```

**How to interpret the result:** Running groupBy can produce a shuffle. Verify skew using task metrics; repartitioning blindly may increase costs.

**Five-minute mobile micro-project:** Why does one very frequent join key cause slow tasks even when many executors are available?

**Model answer:** Rows with the same key may concentrate in a few partitions, creating long-running straggler tasks and unbalanced work.

**Common mistake:** Caching every DataFrame can exhaust memory; do not assume a cloud cluster removes data-quality responsibilities.

**Next step:** Continue to E07 for scalable lakehouse lifecycle design.

### E02 · Streaming analytics with Kafka
**Discipline:** Data Engineering  
**Primary tools:** Kafka, Spark Structured Streaming  
**Learning objective:** Design a near-real-time event flow with defined delivery guarantees and late-event handling.  
**Prerequisites:** A03, A04 and E01; batch ETL and distributed concepts.

**Core topics:** Brokers, topics and partitions; Consumer groups and offsets; Event time, watermarks and windows; Idempotency and exactly-once trade-offs.

**Teach the concept:** Streaming systems read an unbounded flow of events and update results as new information arrives. Kafka topics are partitioned append-only logs; consumer groups coordinate readers and manage offsets. Differentiate event time (when something happened) from processing time (when the system saw it). Watermarks limit how long late events can revise an aggregate. Delivery guarantees depend on the entire pipeline, including external sinks; claiming “exactly once” without end-to-end evidence is unsafe.

**Business case study:** A payments platform flags a surge of failed transactions over five-minute event-time windows. Network delays cause some failures to arrive after their original interval.

**Guided practical walkthrough:**
1. Define an event key and event-time field.
2. Choose topic partitions and a consumer group.
3. Aggregate per event-time window with a documented watermark.
4. Write idempotently to the sink and monitor lag and missing partitions.

**Worked example:**

```text
If failures per five-minute window increase from 10 to 35, the observed increment is 25; alert thresholds should also account for volume and known outages.
```

**How to interpret the result:** A late event may update an earlier window if it arrives within the allowed lateness; outside it, the system needs a documented policy.

**Five-minute mobile micro-project:** Explain why counting consumed messages without deduplicating by stable transaction ID can overstate payments.

**Model answer:** At-least-once delivery may replay an event after retries. Use an idempotent sink or dedupe by event ID and explain any retention window.

**Common mistake:** Kafka does not automatically guarantee one row per business event in every downstream database.

**Next step:** Continue to E08 incident exercises and observability.

### E03 · MLOps: deployment and monitoring
**Discipline:** Data Science  
**Primary tools:** MLflow, Python, CI/CD  
**Learning objective:** Operate a model with reproducible versions, drift checks, monitoring and rollback.  
**Prerequisites:** A05, A08; model evaluation and pipeline quality.

**Core topics:** Model registry and experiment tracking; Feature/target leakage safeguards; Batch vs online serving; Data drift, fairness and monitoring.

**Teach the concept:** An accurate notebook is not a production model. Production requires pinned dependencies, artifact and data versioning, tested feature transformations, and monitored serving. Separate prediction latency, error rate, feature distributions and real-world target quality because drift may occur long before labels become available. Define rollback criteria and an owner for investigations. Monitor error slices for affected groups; aggregate accuracy can hide systematic failures for a smaller population.

**Business case study:** A churn predictor trained on last year’s users degrades when the subscription product changes. Weekly serving continues without an error, but accuracy drops in a new user segment.

**Guided practical walkthrough:**
1. Register model version and training data signature.
2. Deploy with monitored feature schema and latency.
3. Compare incoming features with training distribution and evaluate labelled outcomes.
4. Trigger investigation, fallback or rollback when guardrails fail.

**Worked example:**

```text
A model with overall 90% accuracy but 55% accuracy on a new segment requires slice-level review even if its global KPI looks healthy.
```

**How to interpret the result:** Operational monitoring is broader than model accuracy: track drift, outages, missing features, outcomes and business costs.

**Five-minute mobile micro-project:** Name two signals to monitor before delayed ground-truth labels are available.

**Model answer:** Input schema/feature drift and serving latency or error rate; label-based precision/recall cannot be trusted until labels arrive.

**Common mistake:** Retraining automatically on unvalidated drift can reinforce bias or learn from corrupted data.

**Next step:** Continue to E04 and responsible AI controls.

### E04 · Deep learning, embeddings and RAG
**Discipline:** AI / ML  
**Primary tools:** PyTorch, embeddings, vector search  
**Learning objective:** Explain neural models and build a source-grounded retrieval-augmented question-answering prototype.  
**Prerequisites:** A05 and Python fluency; E03 recommended.

**Core topics:** Neural network training and overfitting; Tokenization and embeddings; Vector retrieval and chunking; RAG citations and evaluation.

**Teach the concept:** Deep learning uses trainable layered representations to capture complex relationships. Large language models generate tokens conditioned on context and do not verify truth by default. Retrieval-augmented generation first searches a document corpus, then gives relevant passages to the model as supporting context. The system must evaluate retrieval accuracy separately from answer correctness and abstain when documents do not support a claim. Embeddings encode semantic similarity, not legal permission or factual reliability.

**Business case study:** A company wants an internal policy assistant. A naive chatbot invents a leave allowance. A retrieval-based assistant must answer from approved, versioned HR policy paragraphs with citations.

**Guided practical walkthrough:**
1. Split approved policy text into labelled chunks.
2. Embed and index chunks with restricted access metadata.
3. Retrieve relevant chunks and instruct the model to cite them.
4. Test answer accuracy, missing-answer abstention and document permissions.

**Worked example:**

```text
Question: “How many days of leave?” If no retrieved policy passage states a number, a correct response is “The available policy excerpts do not specify the allowance.”
```

**How to interpret the result:** Responding with a plausible generic leave figure is a failure because it is not grounded in the organization’s source.

**Five-minute mobile micro-project:** Explain one reason a semantic search result can be relevant but still unsafe to display.

**Model answer:** The passage may be outdated, restricted to another team or contain confidential data. Enforce document access and effective-date checks.

**Common mistake:** RAG reduces some hallucinations but cannot eliminate them; prompt text never substitutes for access controls.

**Next step:** Continue to E05 prompt evaluation and E06 governance.

### E05 · Prompt engineering, GenAI evaluation and agents
**Discipline:** AI / ML  
**Primary tools:** LLM API, Python, evaluation sets  
**Learning objective:** Use generative AI to support data work while proving correctness and controlling tool access.  
**Prerequisites:** I04, I08 and E04; SQL/Python basics.

**Core topics:** Task framing and structured outputs; Verification against known totals; Prompt injection and tool permissions; Evaluation sets, costs and human review.

**Teach the concept:** A productive data prompt provides context, input schema, allowed methods, output format, and checks. Asking a model to “analyze the data” is less reliable than asking for specific SQL with a known definition and an expected reconciliation test. Evaluate the model on representative examples, including adversarial inputs and deliberate missing data. If an agent can call tools, limit its permissions and separate read actions from approvals to publish or mutate records. Generated charts, formulas and narratives still require human validation.

**Business case study:** A reporting assistant proposes SQL that multiplies revenue after joining order headers to lines. Its explanation is eloquent, but the number fails reconciliation.

**Guided practical walkthrough:**
1. Write a task specification with table grains and metric definition.
2. Request a read-only SQL result and an accompanying validation query.
3. Compare counts and totals with a trusted fixture.
4. Log success, failure, cost and whether a reviewer approved the output.

**Worked example:**

```text
Prompt frame: “Use only the listed synthetic tables. Return SQL and a validation query. State the order grain. Do not claim the result is audited unless totals reconcile.”
```

**How to interpret the result:** The model response is a draft. Passing a deterministic assertion is stronger evidence than sounding confident.

**Five-minute mobile micro-project:** An AI query reports revenue 300 from three order lines whose actual total is 100. What test should reject it?

**Model answer:** Assert that grouped line revenue equals the source line sum (100) at the same date/status grain; flag or block the 300 result.

**Common mistake:** Never upload private records to an unapproved external AI service or let a prompt override enforced role permissions.

**Next step:** Continue to E06 security and E08 expert capstone.

### E06 · Data governance, privacy and security
**Discipline:** Data Engineering  
**Primary tools:** Cloud IAM, data catalog, policy-as-code  
**Learning objective:** Create enforceable controls for access, lineage, quality, retention and responsible data sharing.  
**Prerequisites:** F06, A04, A08; cloud access and data-quality basics.

**Core topics:** Least privilege and role-based access; Lineage, ownership and data catalogs; Retention, masking and minimization; Threat models and audit evidence.

**Teach the concept:** Data governance defines who owns information, what it means and how it may safely be used. A catalog is useful only when important fields have stewards, definitions and lineage to trusted sources. Security begins at storage and service permissions; hiding a button in the browser does not prevent direct API access. Use least privilege, row/column-level controls, encryption and rotation of credentials. Set data retention according to legal and operational requirements and prepare a clear incident response path.

**Business case study:** A university analytics app exposes learner scores. A viewer should see only their own progress, while instructors need verified access to cohorts they are assigned to.

**Guided practical walkthrough:**
1. Classify user IDs, grades and enrolment information.
2. Define role-to-data access rules at the database layer.
3. Test unauthorized direct API requests and log access.
4. Document retention and data-subject request workflows.

**Worked example:**

```text
Access matrix: Learner → own progress; Instructor → assigned cohort aggregated results; Admin → permitted management scope; Public → no private records.
```

**How to interpret the result:** The user interface should reflect permissions, but database row-level security and server checks must enforce them.

**Five-minute mobile micro-project:** Why is hiding the “Admin” menu insufficient to secure learner records?

**Model answer:** An attacker could call the database or API directly. Policies must be enforced server-side and in RLS, with tests for denied access.

**Common mistake:** Never publish real learner data in demonstrations, tests or reusable prompts.

**Next step:** Continue to E08 governance review and incident response.

### E07 · Lakehouse engineering and interoperability
**Discipline:** Data Engineering  
**Primary tools:** Delta Lake, Iceberg, Spark, SQL  
**Learning objective:** Design a scalable, maintainable lakehouse with transactional table formats and clear data contracts.  
**Prerequisites:** A02, A04, E01; warehouse models and distributed storage.

**Core topics:** Bronze/silver/gold data layers; ACID tables, compaction and evolution; Catalogs, lineage and portability; Retention, recovery and cost controls.

**Teach the concept:** Object files alone do not provide a reliable analytical table. Lakehouse formats add metadata and transactional behaviour so readers can obtain consistent snapshots during updates. A layered architecture retains raw provenance, applies validated transformations and exposes purpose-built serving tables. Catalogs help resolve which table is authoritative and who may access it. Choose table format and compute engines with compatibility, upgrade paths, file sizes and retention requirements in mind; avoid promising universal interchangeability.

**Business case study:** A business maintains a year of transaction history in object storage. Analysts repeatedly scan tiny CSV files and disagree over whether a failed load created partial totals.

**Guided practical walkthrough:**
1. Define raw landing with immutable batch identifiers.
2. Transform to validated partitioned silver transactions.
3. Publish a gold daily-revenue mart with reconciled totals.
4. Plan compaction, schema changes, snapshots and rollback testing.

**Worked example:**

```text
Example contract: gold_daily_revenue has one row per business_date and region; its sum for a day must match accepted silver transactions.
```

**How to interpret the result:** An ACID table format helps with atomic visibility but cannot validate whether a business KPI is defined correctly.

**Five-minute mobile micro-project:** What is the purpose of keeping an immutable raw/bronze layer after creating cleaned tables?

**Model answer:** It enables reprocessing, tracing source errors and auditing transformation decisions without needing to reconstruct the original input.

**Common mistake:** Do not delete historical files solely for short-term performance without checking recovery, compliance and retention needs.

**Next step:** Complete E08 with batch, streaming, BI and ML paths.

### E08 · Expert capstone: governed data product
**Discipline:** Cross-functional  
**Primary tools:** SQL, Git, cloud, BI, Spark, ML  
**Learning objective:** Explain and prototype an end-to-end data product with quality gates, secure access and monitored outcomes.  
**Prerequisites:** Complete one advanced engineering module, one analytical module and the governance module.

**Core topics:** Architectural decision records; Batch/stream ingestion and tests; Metric definitions and reporting; Model/LLM checks, incident and cost review.

**Teach the concept:** A strong portfolio capstone shows a business problem, a data contract, reproducible transformations and a measurable decision—not a collection of screenshots. State boundaries: simulated architecture is fine for a mobile learning lab, but do not claim cloud infrastructure was deployed when it was only designed. Provide a traceable chain from raw inputs through reconciled metrics to a dashboard, prediction or alert. Document failure modes, access scopes, rollback criteria and the cost/latency trade-off.

**Business case study:** A fictional logistics operator wants daily delivery KPIs, a five-minute delay alert and a stockout predictor. Records arrive from different sources with late updates and limited permissions.

**Guided practical walkthrough:**
1. Draw source, raw, curated and serving layers and specify grains.
2. Create SQL/Python pseudocode with three deterministic quality tests.
3. Propose a dashboard, event-time alert and model evaluation plan.
4. Write an access matrix, monitoring SLA and one-page incident runbook.

**Worked example:**

```text
Minimum evidence: daily on-time rate = on-time deliveries / eligible completed deliveries; reconcile eligible counts, reject negative transit time, and verify duplicate delivery IDs do not inflate results.
```

**How to interpret the result:** The product should explain what it knows, what data is missing and what failures prevent a trusted decision.

**Five-minute mobile micro-project:** A pipeline reports 95% on-time delivery but 15% of completed orders lack arrival timestamps. Should the dashboard show “verified 95%” without qualification?

**Model answer:** No. Fail or qualify the metric, publish the coverage rate and investigate missing arrivals. A valid service rate needs a defined eligible population.

**Common mistake:** Do not substitute demo diagrams for a running service or present simulated test results as production evidence.

**Next step:** Publish a portfolio README, limitations, versioned assets and an honest validation checklist.

## 5. Suggested teaching and assessment workflow

1. **Micro-lesson (3–5 min):** describe one concept with a plain-language analogy and an explicit example.
2. **Worked example (3–5 min):** identify input data, operation, output, interpretation and limitations.
3. **Guided practice (5–10 min):** use a six-row synthetic dataset or a read-only query/formula in the app.
4. **Knowledge check (2–3 min):** short diagnostic question, feedback for wrong answers and a revealed worked solution.
5. **Case application (15–45 min):** gradually extend the micro-project into a business decision, a reproducible script or an architecture sketch.
6. **Evidence checkpoint:** source-to-result reconciliation, documented assumptions, limitation statement and rubric-based review before earning a credential.

### Suggested capstone gates
- **Level 1:** clean and summarize six synthetic orders, explain the metric, show a table and a chart.
- **Level 2:** produce a refreshable business dashboard with SQL joins, checks and a short insight memo.
- **Level 3:** prototype an auditable transformation pipeline or validation-aware ML experiment with CI and tests.
- **Level 4:** architecture plus demonstrable synthetic tests for access, lineage, latency, reliability, a failure drill and human-reviewed AI behavior.

### Tool and cost safeguards
- Mobile/app exercises should work with miniature synthetic datasets. Where real Spark/Kafka/cloud access is unavailable, clearly label the activity **simulation or design exercise**.
- Optional paid cloud labs should have a published spending cap, teardown steps and free/local alternatives. Do not require credentials or real customer data for an introductory task.
- Practical assessment should measure correctness, interpretation, reproducibility and security—not simply a page visit or attractive output.

## 6. Modern reference topics (official documentation)

- Microsoft Learn, Apache Spark in Fabric: https://learn.microsoft.com/en-us/training/modules/use-apache-spark-work-files-lakehouse/
- Microsoft Learn, Fabric Data Engineering overview: https://learn.microsoft.com/en-us/fabric/data-engineering/data-engineering-overview
- dbt Developer Hub, best-practice guides: https://docs.getdbt.com/best-practices
- Google for Developers, production ML monitoring: https://developers.google.com/machine-learning/crash-course/production-ml-systems/monitoring
- Microsoft Learn, Copilot in Fabric Data Engineering: https://learn.microsoft.com/en-us/training/modules/get-started-copilot-fabric-data-engineering

**Privacy and progress:** this release adds curriculum content and links only; existing Supabase tables, authentication, learner records, week progress, and assessment results are not migrated or reset.
