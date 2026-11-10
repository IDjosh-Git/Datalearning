# Introduction · Week 08 · Data ethics and privacy

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Minimise sensitive data and disclose limitations

## Before you begin: open the right file
- Download: `learning_staff_operations.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: employee_id, department, region, monthly_hours, completed_tasks, status.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=TImRJTzphhE.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Responsible analysis begins with data minimisation. Only use personal or sensitive attributes needed for a legitimate analytical purpose. Replace direct identifiers with aggregates or pseudonymous keys when possible; avoid publishing small groups that could identify individuals indirectly. Know who is authorised to view the underlying records and separate raw access from published summary access.

Fairness also depends on how data was collected. A survey may exclude people without internet access; an operational system may systematically miss events during outages. Cleaning and modelling choices can amplify these gaps. Document consent, retention assumptions, uncertainty and known biases in plain language. A technically accurate calculation can still support a harmful decision if it ignores who was missing from the data.

## Guided walkthrough in the tool
1. Identify personal or confidential fields and ask whether each is necessary for the decision.
2. Design a group-level report that avoids names, phone numbers, and very small identifying segments.
3. Check which groups and periods are poorly represented or missing.
4. Write a short limitations note and verify that report access follows your organisation’s policy.

### Additional hands-on instruction
Use synthetic staff operations. Publish department totals but do not expose row-level worker IDs in the presentation.

## Business case
A report grouped by department and age may contain a cell with only one employee. Even if names are removed, a colleague could infer that person’s salary from the total. Prefer larger reporting groups or suppress small cells according to policy. Evaluate identifiability across all combinations of visible filters, not just each individual column.

## Independent practical challenge
Give two safeguards when sharing customer analytics.

**Deliverable:** Create a report sharing checklist covering roles, retention, purpose, and suppression of small groups.

## Verify your work
A safe report contains only the information needed for the reader’s role. Test whether two or more visible dimensions could combine to reveal an individual; if so, aggregate further.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
anonymise data; restrict access

**Common pitfall:** Publishing identifiable raw data in an open dashboard.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
