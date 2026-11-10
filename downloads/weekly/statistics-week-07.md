# Statistics · Week 07 · Correlation is not causation

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Interpret direction, strength and confounding

## Before you begin: open the right file
- Download: `learning_statistics_sample.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: observation_id, delivery_minutes, basket_value_ngn, satisfaction_score, region, complaint_flag.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=xZ_z8KWkhXE.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Correlation describes the direction and strength of a relationship between numeric variables. A correlation coefficient near +1 suggests strong positive linear association, near −1 suggests negative linear association, and near zero suggests little linear association. It does not establish that changing one variable causes the other to change. A third factor, reverse causation or chance can explain an observed relationship.

In a scatterplot, inspect shape, outliers and groups before reporting a coefficient. A strong curved relationship can have weak linear correlation, and one extreme point can substantially affect the calculation. The classic example of ice cream sales and heatstroke is explained by hot weather affecting both. When communicating a correlation, use cautious language and propose better evidence—such as a controlled comparison—if a causal claim matters.

## Guided walkthrough in the tool
1. Create paired observations for two numeric variables and draw a scatterplot.
2. Describe the direction, approximate strength and whether the relationship looks linear.
3. Check whether a single outlier changes the observed pattern.
4. List two possible confounders and explain what evidence would be needed for a causal conclusion.

### Additional hands-on instruction
Scatterplot delivery minutes and satisfaction; examine the outlier and alternative operational explanations.

## Business case
A city records rising ice cream sales and more heatstroke cases during the same hot months. A positive correlation may be real, but weather is a plausible shared influence. A scatterplot alone cannot show that eating ice cream causes heatstroke. State the association and identify additional evidence needed for causal claims.

## Independent practical challenge
Give a plausible third variable linking umbrella sales and wet roads.

**Deliverable:** Write one association statement and two reasons a causal conclusion would be premature.

## Verify your work
A correlation coefficient is a summary of a particular association, not a statement about mechanism. Avoid claiming that high correlation means one variable caused the other.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Rainfall can increase both umbrella sales and wet roads.

**Common pitfall:** Treating a positive correlation as proof of causation.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
