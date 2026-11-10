# Statistics · Week 01 · Types of data and populations

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Separate variables, samples and populations

## Before you begin: open the right file
- Download: `learning_statistics_sample.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: observation_id, delivery_minutes, basket_value_ngn, satisfaction_score, region, complaint_flag.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=bvglAgAZtXE.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Statistics helps us reason about groups using observed data. A population is the complete group you wish to understand, such as every order placed in a quarter. A sample is the subset you actually observe. A variable records a characteristic—age, order value, satisfaction rating or delivery status. Variables may be numerical or categorical, and the type determines which descriptive summaries and statistical procedures are meaningful.

Do not confuse the sample with the target population. If your data includes only online purchases, the conclusions may not describe customers who buy in physical stores. Measurements can be continuous (order value) or discrete (number of orders), while categories can be nominal (region) or ordered (satisfaction level). Identifiers are not numerical measurements even when stored as digits. State the population and the collection process before drawing general conclusions.

## Guided walkthrough in the tool
1. Define a target population for a delivery-service question and describe the records available.
2. Classify OrderID, DeliveryTime, Region and Rating by variable type.
3. Identify whether the data contains a full population or a sample of the target.
4. Record one potential source of selection bias and explain its effect on interpretation.

### Additional hands-on instruction
Use the delivery observations to identify variable types and the population you hope to describe.

## Business case
A delivery company serves 100,000 customers but surveys only 300 people who open its marketing email. The 300 responses are a sample, not the population. Even if the survey arithmetic is flawless, customers who rarely open marketing emails may be missing. State the target population and identify whether the collection method represents it before generalising the result.

## Independent practical challenge
Classify customer ID, revenue and satisfaction rating.

**Deliverable:** Explain why 100 observations do not necessarily represent every order in another region.

## Verify your work
A valid statistical summary starts with a clear statement of who or what was measured. If the observed sample excludes a population segment, say so instead of generalising without qualification.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Identifier, numeric, and ordinal rating respectively.

**Common pitfall:** Treating customer IDs as measurements.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
