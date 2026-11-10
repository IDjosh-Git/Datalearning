# Power Bi · Week 08 · Visual design

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Match visuals to reader tasks

## Before you begin: open the right file
- Download: `learning_monthly_kpis.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=36534s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Report design begins with tasks, not visual variety. A KPI card answers “How much?”, a line chart answers “How has it changed?”, a bar chart compares categories, and a matrix provides exact details when needed. Arrange the most important questions from top to bottom, with a clear visual hierarchy, usable labels and consistent numbers. Limit decorative elements that compete with data.

Accessibility is part of design quality. Use contrast that keeps text readable, do not rely on colour alone to encode status, give visuals meaningful titles and alt text where supported, and ensure tooltips add rather than replace essential context. Keep units and display precision consistent. A report should be usable on different screen sizes, with a mobile layout that intentionally rearranges rather than merely shrinks desktop visuals.

## Guided walkthrough in the tool
1. List three real questions the reader should answer with the report.
2. Choose a KPI, trend and comparison visual and validate the underlying measures.
3. Arrange visuals with clear hierarchy, consistent units and sufficient spacing.
4. Check the mobile layout and ask a test viewer to explain the main finding.

### Additional hands-on instruction
Create a KPI summary, sales trend and region variance bar chart using the monthly KPI data.

## Business case
A mobile report shrinks four desktop charts into a narrow grid; labels become unreadable. Build a dedicated phone layout with a KPI first, a vertically stacked trend next, and a category comparison after it. Keep units visible and make touch targets generous. Mobile responsiveness is an analytical requirement, not just a visual finishing step.

## Independent practical challenge
What belongs in a useful KPI tooltip?

**Deliverable:** Write a one-minute explanation: headline, evidence, caveat and action.

## Verify your work
If a viewer cannot identify the measure, timeframe and comparison, the visual needs revision. Confirm that a chart still communicates in greyscale and at small size.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
definition; timeframe; comparison; filter context

**Common pitfall:** Using many colours without semantic meaning.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
