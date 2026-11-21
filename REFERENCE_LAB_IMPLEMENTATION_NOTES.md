# Reference Lab: individual worked-example coverage

All 639 reference records now include a workedExample with:
- a domain-specific synthetic setup,
- a title-specific task and expected behaviour,
- execution/inspection steps,
- independent verification guidance.

153 Excel SUMIFS/COUNTIFS/AVERAGEIFS/SUM entries have independently computed numeric results from synthetic rows. Other examples deliberately use **expected behaviour**, not fabricated numeric outputs, because they require running the original expression in Excel, SQL, DAX, M, or Python with compatible source tables and model context.

Important distinction: all entries now have a guided worked-example scaffold, but only the 153 deterministic Excel entries have computed numeric expected results. These are NOT all runtime-executed or individually validated examples. The existing cloud bookmarks, filters, search and practice links remain intact.

Tests: JavaScript syntax, record coverage, unique reference keys, ZIP integrity. Full browser/E2E testing and Vercel deployment remain outstanding.
