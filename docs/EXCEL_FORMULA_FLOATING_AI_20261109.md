# Formula Lab and Floating AI response release — 9 November 2026

The Excel Formula Lab now calculates formulas in an independent worksheet sandbox without changing the reference dataset used to grade the 50 Excel challenges. The grid shows A1:H20; calculator references can reach A1:AZ1000, with a maximum of 10,000 cells per range. Save a value/formula to a selected cell, Calculate to preview, or Check challenge answer to validate against existing sample and hidden scenarios. Circular formulas return `#CIRC!`, and unsupported formulas return `#NAME?`.

Expanded formula families include array arithmetic, SUMPRODUCT with range expressions, statistics (PERCENTILE, QUARTILE, CORREL, RANK, COVARIANCE, SLOPE), math (trigonometry, FACT, COMBIN, MROUND), text (TEXT, TEXTBEFORE, TEXTAFTER, TEXTSPLIT, REPLACE), and dates (NETWORKDAYS, WORKDAY, EOMONTH, EDATE, WEEKDAY). Function argument validation and behaviour cover common teaching cases, not complete Excel compatibility.

The floating AI message renderer safely parses basic Markdown into headings, lists, code blocks, quotes, and inline emphasis using DOM text nodes. It never inserts the provider's HTML directly; user messages remain plain text. Server instructions now request clean Markdown without stray formatting tokens.

## Limitations

- This is a lightweight, offline teaching engine rather than Microsoft Excel or LibreOffice Calc. It does not support every Excel function, full array spill geometry, external workbook references, VBA, Power Query, or all advanced lookup options and number formats.
- The editable sheet lives in the current lesson workspace and is not automatically synchronized to Supabase.
- Live AI continues to require a configured provider and a signed-in learner.
- For the UI, browser-isolated interaction tests cover formula preview, cell saves, chained references, and safe formatted responses.

## Verification

`npm run verify:deployment`; `node tests/excel-formula-floating-format.mjs`.
