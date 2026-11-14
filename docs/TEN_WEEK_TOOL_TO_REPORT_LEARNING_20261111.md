# DataLearning · 10-Week Tool-to-Report Learning Journeys

Release: 11 November 2026. Every course begins with the working environment and progresses to analysis, visual communication, and a capstone.

## Changes and compatibility

- 70 core Academy lessons now have revised titles, outcomes, 500+ word guided instructional material, worked examples and corresponding knowledge checks.
- 20 Python and AI specialist weeks receive prominent original masterclass instruction above their existing advanced references.
- 90 practice worksheets now match the rewritten titles and examples, reusing existing synthetic downloads.
- Nine dashboard layout samples and nine executive-storyboard illustrations accompany visual and reporting weeks.
- Week 10 of all nine courses links to the existing private, authenticated, instructor-reviewed capstone submission page.
- Existing per-course progress storage keys, week numbers, quiz results table and course slug identifiers are preserved. Historical quiz results remain stored; the replacement question text is not versioned by the database.
- Existing YouTube URLs are retained as companion resources; their availability, topical chapter alignment and permission to embed depend on YouTube and were not independently re-verified for all 90 links.

## What does a 10-week path teach?

### Microsoft Excel (excel)

- **Week 1: Getting comfortable with the Excel workspace.** Identify ribbon tabs, worksheets, cells, ranges and the formula bar before typing or analysing data. Deliverable: The formula =B2*C2 multiplies 3 by 1500 to return 4500; the source values remain independently readable.
- **Week 2: Entering, formatting and organising data.** Turn raw entries into a well-typed Excel Table that can be filtered without corrupting the source. Deliverable: After filtering, every row still has the correct original OrderID and amount; removing the filter restores all records.
- **Week 3: Essential Excel formulas and cell references.** Build correct arithmetic and summary formulas and know when to lock a reference. Deliverable: A 3-unit order at 1500 produces 4500 before tax; a fixed 7.5% rate in H2 produces 337.50 tax.
- **Week 4: Cleaning text, dates, duplicates and errors.** Fix dirty source data while keeping an auditable record of what changed. Deliverable: A label of '  north ' becomes 'North'; missing dates remain flagged rather than silently fabricated.
- **Week 5: IF, SUMIFS, COUNTIFS and lookup functions.** Calculate business KPIs by conditions and retrieve attributes from a reference table. Deliverable: A missing ProductID returns 'Unmapped' rather than a misleading blank; paid revenue excludes cancelled sales.
- **Week 6: PivotTables, dynamic arrays and reusable analysis.** Summarise thousands of rows into pivot summaries and dynamic filtered lists without manual recalculation. Deliverable: A pivot total for Paid orders must match independently computed SUMIFS on the same data and filters.
- **Week 7: Choosing and interpreting Excel charts.** Create truthful visuals that match the business question and explain what each chart shows. Deliverable: The line must connect Jan, Feb and Mar in order; (135000-150000)/150000 = -10% month-on-month.
- **Week 8: Building a professional interactive Excel dashboard.** Arrange KPI cards, PivotCharts and slicers into one readable decision-making page. Deliverable: Changing the Region slicer must update the connected metrics; original overall totals must remain recoverable.
- **Week 9: Writing and presenting an Excel management report.** Turn dashboard findings into a concise business narrative and deliver a portable report. Deliverable: Explain the ₦60,000 shortfall as a -6.67% variance against target; disclose unknown causes until investigated.
- **Week 10: Excel analytics capstone: dataset to executive dashboard.** Independently design, calculate, validate, present and submit a professional Excel dashboard. Deliverable: Instructor should reproduce totals and confirm a slicer changes relevant visuals; a 70/100 score is required for completion.

### Power BI Desktop (powerbi)

- **Week 1: Touring Power BI Desktop and its workspace.** Recognise the Report, Data and Model views, main ribbon and essential panes without prior Power BI experience. Deliverable: The imported table should appear in Data view and Model view; the Report canvas should remain ready for visuals.
- **Week 2: Connecting and profiling data in Power Query.** Import spreadsheets or CSVs and identify incorrect types, missing fields and quality problems before modelling. Deliverable: Your transformed table should include numeric Amount and a valid OrderDate with documented errors.
- **Week 3: Building relationships and a star schema.** Model sales facts with reusable dimension tables to prevent misleading totals and filters. Deliverable: Each fact row must match at most one product dimension key; a filtered total should never increase from an accidental join.
- **Week 4: DAX measures and evaluation context.** Write measures that react correctly to slicers and compare them with calculated columns. Deliverable: AOV must equal selected revenue divided by selected distinct orders, not average of precomputed category averages.
- **Week 5: Time intelligence and period comparisons.** Analyse month-over-month and year-over-year changes with a proper date dimension. Deliverable: For March 135000 versus February 150000, MoM = -10%; date labels must sort chronologically.
- **Week 6: Advanced DAX and analytical scenarios.** Control denominators and create context-aware comparisons without confusing totals. Deliverable: All region shares should sum to 100% when the denominator uses the appropriate total; compare to a source-based cross-check.
- **Week 7: Designing Power BI visuals and interactions.** Select charts for decisions and make drilldown and filters understandable to a new user. Deliverable: A selected region should update related KPIs, while totals in a separate validation table remain consistent.
- **Week 8: Building a premium interactive Power BI report.** Apply grid-based dashboard layout, slicers, bookmarks and visual hierarchy to a decision-ready report page. Deliverable: Every card must reconcile with its source measure; a reset state must restore the intended overview.
- **Week 9: Publishing, sharing and presenting insights.** Explain how Power BI Desktop reports are shared, refreshed and turned into an executive narrative. Deliverable: Do not claim a scheduled refresh is successful until the published model confirms it; screenshots must show selected filters.
- **Week 10: Power BI capstone: model to published executive report.** Build and document an end-to-end data model, DAX KPIs, interactive report and executive presentation. Deliverable: The instructor should reproduce KPIs and navigate slicers; acceptance requires documented limitations and a 70/100 assessment.

### SQL and SQLite (sql)

- **Week 1: Understanding databases and SQL editor environments.** Explore a SQL client, tables, schemas and query results before writing your first analytical statement. Deliverable: The table list appears and the sample query returns no more than five rows; no source records change.
- **Week 2: Writing SELECT, WHERE, ORDER BY and LIMIT.** Retrieve precise records instead of dumping entire tables to the screen. Deliverable: All returned rows are Completed with revenue over 10000 and sorted descending; tie handling should be explained.
- **Week 3: GROUP BY, aggregation and KPI queries.** Turn transaction records into business metrics using grouped aggregations. Deliverable: Sum of regions must reconcile to the Completed-only grand total unless intentionally excluded by HAVING.
- **Week 4: JOINs, table grain and duplicate control.** Combine fact data with reference tables without accidentally multiplying money. Deliverable: LEFT JOIN should keep every source order row if the product dimension is unique; totals should remain unchanged.
- **Week 5: CASE, NULL and conditional business rules.** Classify transactions transparently and avoid incorrect logic for missing fields. Deliverable: High-value flag follows the threshold; NULL Region displays as Unknown only in the reporting output.
- **Week 6: CTEs, subqueries and maintainable reporting SQL.** Split a difficult analysis into readable stages that can be checked separately. Deliverable: The sum of regions should equal the Completed-only sum from the base table, with matching date ranges.
- **Week 7: Window functions and time-based comparisons.** Calculate rankings, running totals and period comparisons without losing transaction detail. Deliverable: For values 10,15,12 by month, running total is 10,25,37; first LAG is NULL.
- **Week 8: Building dashboard-ready SQL datasets.** Shape a query output that a BI tool can visualise without ambiguity. Deliverable: Every row represents one month-region combination; when grouped again by month, totals must reconcile.
- **Week 9: Optimising, validating and presenting SQL analysis.** Explain query results to decision-makers and prepare reproducible validation evidence. Deliverable: Base and final totals reconcile at the same grain; query improvement must not change the answer.
- **Week 10: SQL capstone: end-to-end analytical reporting dataset.** Design, test and submit a repeatable SQL project for a complete business question. Deliverable: An independent reviewer should rerun the SELECT queries and reproduce your metrics; provide screenshots of the editor and output.

### Python and pandas (python)

- **Week 1: Python environment, notebooks and first expressions.** Start confidently in a Python editor or notebook, run code cells and understand variables and errors. Deliverable: The printed value is 4500, and changing input values updates the calculation without retyping the formula.
- **Week 2: Python collections, loops and functions.** Represent multiple records and write small reusable calculations. Deliverable: The three given prices total 4700, and sum([]) returns zero rather than failing.
- **Week 3: Reading CSV files into pandas DataFrames.** Load tabular sales data and inspect rows, column types and missing values. Deliverable: Shape reports rows then columns; head(3) previews three records without changing the source.
- **Week 4: Cleaning DataFrames safely.** Handle missing records, duplicates, inconsistent labels and invalid numeric values with reproducible code. Deliverable: Row count should change only if a documented removal rule is applied; missing totals must be reported.
- **Week 5: Filtering, grouping and business KPI calculations.** Compute revenue, customer counts and category KPIs with pandas using explicit business rules. Deliverable: The sum of grouped paid revenue must match the source Paid-only revenue under the same filters.
- **Week 6: Joining datasets and analytical feature engineering.** Combine related tables and create purposeful derived fields without fanout errors. Deliverable: Post-merge row count must equal source orders for a valid many-to-one join; unmatched categories must be counted.
- **Week 7: Exploratory data analysis and charts.** Use descriptive statistics and matplotlib visuals to expose patterns without implying causation. Deliverable: The plotted monthly sums should reconcile with the filtered dataframe; axis labels and units are explicit.
- **Week 8: Building a Python dashboard or interactive report.** Compose KPIs and charts in a reproducible Streamlit or notebook dashboard layout. Deliverable: A region selection must change all linked metrics; the source revenue total is the independent accuracy check.
- **Week 9: Automating reporting and presenting Python insights.** Export clean tables, plots and a reproducible analysis narrative for business stakeholders. Deliverable: The exported totals equal those calculated in memory; the report names its source and reporting period.
- **Week 10: Python capstone: raw CSV to dashboard and report.** Build a full data analysis project from source ingestion through dashboard, validated insights and presentation. Deliverable: An instructor can reproduce your summary from the supplied dataset; submission should disclose versions and limitations.

### AI for Data Analysis (ai)

- **Week 1: Getting to know AI tools for data analysis.** Navigate a chat-based AI tool and understand what AI can and cannot verify on its own. Deliverable: A good response identifies likely data types but flags uncertainty about field definitions.
- **Week 2: Writing clear prompts for analytical tasks.** Build prompts with task, data context, constraints, expected format and verification rules. Deliverable: The answer must show which rows count, the arithmetic and at least one limitation rather than invented figures.
- **Week 3: Using AI to understand and clean datasets.** Ask AI for an audit plan and implement transformations in the actual tool rather than trusting prose. Deliverable: A valid checklist distinguishes detection from correction; each chosen transformation must be demonstrated with real input rows.
- **Week 4: Generating and checking Excel formulas with AI.** Use AI to draft formulas while personally verifying references and edge cases. Deliverable: The Paid North result matches hand arithmetic; an unknown product ID returns an explicit missing value.
- **Week 5: Generating and validating SQL with AI.** Request readable SELECT queries and verify schema, join grain and source totals before using results. Deliverable: A valid join preserves orders when the dimension keys are unique; documented missing matches remain visible.
- **Week 6: AI-assisted Python analysis and debugging.** Use AI to explain code, diagnose errors and draft reproducible pandas transformations. Deliverable: Code must execute without hiding errors; revenue output matches an independent filtered sum.
- **Week 7: AI-supported EDA, visuals and evidence-based insight.** Use AI to suggest appropriate charts and draft explanations from verified results. Deliverable: The reported month-on-month change is -10% and the causal explanation remains a hypothesis.
- **Week 8: Designing dashboards with AI assistance.** Use AI to critique dashboard wireframes and propose layouts that make KPIs and filters understandable. Deliverable: Every visual has a purpose, consistent filters and a reproducible metric definition.
- **Week 9: Reviewing AI-written reports and building a safe workflow.** Create a reliable human approval path for AI-generated analysis and reporting deliverables. Deliverable: Every headline statistic appears in your evidence register, and recommendations are identified as recommendations.
- **Week 10: AI analytics capstone: verified end-to-end insight pack.** Deliver an AI-assisted analysis that is independently verified and transparently documented. Deliverable: Instructor can reproduce numerical findings independently; the AI-use statement clearly separates automation from human verification.

### Tableau (tableau)

- **Week 1: Tableau interface, worksheets and first connection.** Become familiar with Tableau's start page, data source pane, shelves, Marks card and sheet/dashboard/story tabs. Deliverable: The sheet should show a bar per region when Region is on Rows and SUM(Revenue) on Columns.
- **Week 2: Understanding field types, measures and data relationships.** Set data types and link tables while respecting their analytical grain. Deliverable: Revenue by Product Category should reconcile to the same total as the underlying valid sales data.
- **Week 3: Building bar charts, line charts and a readable visual.** Choose the right shelf/marks combinations for rankings and trends. Deliverable: Regional totals sum to the same filtered base revenue; monthly dates appear chronologically.
- **Week 4: Calculated fields and business KPI definitions.** Create reproducible calculations and understand row-level versus aggregate expressions. Deliverable: For revenue 1000 and cost 700, profit is 300 and margin 30%; aggregate ratios should be computed from total components.
- **Week 5: Filters, parameters and purposeful interactions.** Give viewers useful controls while keeping metric definitions consistent. Deliverable: Changing Region must update dependent charts; Revenue and Profit are not interchangeable currency concepts.
- **Week 6: Level of detail and advanced aggregate reasoning.** Apply FIXED and INCLUDE calculations carefully when category grain differs from metric grain. Deliverable: Repeated region totals are not additive product facts, so summing the repeated figure across products would double count.
- **Week 7: Table calculations for running totals and comparisons.** Add running sums, ranks and percent-of-total calculations to an existing visual. Deliverable: The cumulative sequence must be 10,25,37 for the sample; ranking should honour the intended metric.
- **Week 8: Building a Tableau dashboard with layout containers.** Combine worksheets, filters and actions into a premium interactive canvas. Deliverable: Region selection must update expected views; reset view restores the overall total.
- **Week 9: Creating Tableau stories and presenting findings.** Organise dashboard views into a sequence that supports an evidence-based recommendation. Deliverable: Each claim can be traced to a calculated field or worksheet; changed filters are disclosed.
- **Week 10: Tableau capstone: interactive dashboard and story.** Submit a complete Tableau analysis with verifiable calculations and an executive narrative. Deliverable: The instructor can check chart data, filter behaviour and presentation against the stated metric definitions.

### Power Query (powerquery)

- **Week 1: Finding the Power Query editor and importing data.** Learn the Power Query editor, Query pane, preview grid, ribbon and Applied Steps before transformations. Deliverable: The loaded output reflects the source preview and recorded transformations; raw CSV is unchanged.
- **Week 2: Data types, date locale and column profiling.** Ensure values are correctly typed before creating calculated analysis fields. Deliverable: After conversion, date sorting is chronological and revenue can be summed numerically; IDs retain leading zeroes.
- **Week 3: Cleaning nulls, duplicates and transformation errors.** Build a repeatable quality-control sequence with defensible exception handling. Deliverable: The number of cleaned rows plus investigated removals must reconcile to the input rows.
- **Week 4: Transforming text, split columns and date fields.** Standardise inconsistent labels and create helpful structured fields without changing source meaning. Deliverable: '  north ' should become 'North'; derived month remains numeric or uses an explicit date dimension.
- **Week 5: Custom columns, filtering and conditional business rules.** Create transparent derived labels and filter only records that meet published KPI definitions. Deliverable: Every high-value result follows the chosen threshold; excluded statuses are documented.
- **Week 6: Appending monthly files and controlling schema drift.** Combine compatible files vertically into one analysis-ready table. Deliverable: Combined row count equals the sum of compatible sources and revenue equals the sum of each month's revenue.
- **Week 7: Merging lookup tables and checking join matches.** Enrich transactions with attributes while preventing duplicate-key fanout. Deliverable: A unique product lookup should preserve one result per order row; unmatched ProductID remains visible.
- **Week 8: Grouping and reshaping dashboard-ready data.** Use Group By and Unpivot to produce tidy monthly KPI data for visual analytics. Deliverable: Summing the tidy output must reproduce the source figures; each Month value should be a valid period.
- **Week 9: Reading M language and designing a refreshable pipeline.** Inspect Generated M steps, document dependencies and verify refresh without modifying original files. Deliverable: A fresh file of the same expected schema loads cleanly and the quality checks still reconcile.
- **Week 10: Power Query capstone: reliable data preparation pipeline.** Prepare an auditable ETL output and show how downstream dashboards can consume it. Deliverable: Re-running the transformation on the same inputs reproduces row counts and sums; changes to source are traceable.

### Applied Statistics (statistics)

- **Week 1: Discovering statistical tools and data types.** Understand how Excel's Analysis ToolPak or Python notebooks support practical statistical questions. Deliverable: CustomerID must not be summed, and the chosen statistical operation matches the variable type.
- **Week 2: Mean, median, mode and interpreting typical values.** Calculate central tendency and explain what outliers do to the story. Deliverable: The mean is 29.8 and median 13; the unusually high 100 pushes the mean upward.
- **Week 3: Spread: range, variance and standard deviation.** Describe volatility alongside an average rather than hiding unstable results. Deliverable: The means match, but Team B has a substantially larger range and standard deviation.
- **Week 4: Frequency tables, histograms and distribution patterns.** Create charts that reveal where observations cluster and which values are unusual. Deliverable: The sample contains two spends in 0–49 and two in 50–99; bins must not overlap.
- **Week 5: Sampling design and identifying bias.** Plan a sample that supports a specific conclusion without excluding important customers. Deliverable: The sampling plan includes each relevant segment and documents its selection probabilities and constraints.
- **Week 6: Probability and risks in business decisions.** Compute basic unconditional and conditional probabilities using observed counts. Deliverable: P(Error) = 15/60 = 25%; every probability statement names the conditioning group.
- **Week 7: Correlation and exploratory relationship analysis.** Measure associations and explain why they do not automatically establish causation. Deliverable: A strong association may justify investigation but does not prove advertising caused the difference.
- **Week 8: Confidence intervals and uncertainty dashboard.** Construct and interpret a confidence interval in business terms without overstating certainty. Deliverable: Across repeated comparable samples, the 95% method captures the fixed population rate about 95% of the time.
- **Week 9: Hypothesis testing, experiments and result interpretation.** Use clear hypotheses and effect sizes to decide whether an apparent change is meaningful. Deliverable: At pre-specified alpha 0.05, reject H0 when p=0.03, subject to assumptions; do not call it proof of causation without design.
- **Week 10: Statistics capstone: analysis to executive recommendations.** Perform descriptive analysis and one defensible inferential check, then present uncertainty to stakeholders. Deliverable: Reviewer can trace all statistics to data and see why selected methods are appropriate; unsupported causal claims are flagged.

### Data Analysis (introduction)

- **Week 1: The data analyst's workspace and way of thinking.** Learn the full analysis workflow and recognise the interfaces analysts commonly use before specialising. Deliverable: Your question names a metric, comparison period, audience and decision that could follow.
- **Week 2: Data files, columns, types and measurement.** Become confident reading CSVs and spreadsheets and recognising the meaning of each field. Deliverable: IDs preserve leading zeroes, and revenue or quantity fields have meaningful numeric units.
- **Week 3: Data grain, keys and simple relationships.** Understand what one row represents and why duplicates can be legitimate. Deliverable: COUNTROWS = 3 but DISTINCTCOUNT(OrderID) = 2; both figures are right for different questions.
- **Week 4: Understanding and measuring data quality.** Identify missing values, erroneous amounts and duplicate keys before trusting a calculation. Deliverable: Each rule has a count, rationale and treatment; source and cleaned totals reconcile after approved changes.
- **Week 5: Basic calculations and descriptive KPIs.** Understand totals, counts, averages and the difference between typical and exceptional values. Deliverable: AOV = Paid Revenue / Distinct Paid Orders, and the sample median is 23.
- **Week 6: Preparing data for a repeatable analysis.** Separate raw source, cleaned records and reporting summaries into traceable layers. Deliverable: Every dropped or excluded record has a reason, and category totals reconcile to the clean rows.
- **Week 7: Choosing effective charts and reading trends.** Connect business questions to line, bar, table and KPI displays without misleading viewers. Deliverable: A descending bar ranking identifies top region and the monthly line correctly shows a February peak.
- **Week 8: Planning the first dashboard and selecting KPIs.** Design a clean dashboard layout before choosing a complicated tool. Deliverable: A reader can answer the business question in 30 seconds and every visual has a clear purpose.
- **Week 9: Explaining results and writing an executive briefing.** Write an evidence-first management report and prepare a brief verbal presentation. Deliverable: The statement uses correct arithmetic, cites the reporting dataset and identifies what cannot yet be concluded.
- **Week 10: Data analysis capstone: question to presentation.** Complete one end-to-end analysis using a realistic fictional business dataset. Deliverable: Each chart and KPI traces back to documented source and filters, and the instructor can follow all exclusions.

## Capstone instructions and rubric

Each Week 10 presents the business problem, submission requirements, source validation and a link with the correct course selector preselected. Learners must be signed in and have 10 synced completed weeks before uploading.

Submissions allow 1–4 project files of up to 12 MB each and 32 MB total; assessments are instructor-reviewed, requiring at least 70/100.

Rubric: Problem and objectives (25); Data preparation and quality (20); Technical execution (20); Analysis and insights (20); Communication and evidence (15).

## Notes on sample images

All image values are explicitly fictional, are for visual-layout teaching only and do not represent executed dashboards. Learners must still produce their own working calculations and project evidence.
