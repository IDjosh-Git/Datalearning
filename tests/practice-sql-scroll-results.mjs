import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const css=readFileSync('assets/styles/practice-arena-premium-final.css','utf8');
const js=readFileSync('assets/scripts/arena-upgrade.js','utf8');
const page=readFileSync('practice.html','utf8');
assert(page.includes('practice-arena-premium-final.css?v=20261111-mobile-sql-results-r2'),'Updated table theme must load');
for (const token of [
 '#practiceDetail[data-active-editor="SQL"] .ide-content',
 'grid-template-columns:minmax(0,1fr)!important',
 'grid-template-rows:auto auto!important',
 '#practiceDetail[data-active-editor="SQL"] .arena-table-scroll',
 'overflow-x:auto!important', 'overscroll-behavior-x:contain!important',
 'max-height:480px!important', 'width:max-content!important',
 'min-width:100%!important', 'table-layout:auto!important',
 'position:sticky!important', 'white-space:nowrap!important',
 '#practiceDetail[data-active-editor="SQL"] .arena-summary',
 'display:flex!important',
]) assert(css.includes(token),`Missing SQL results layout feature: ${token}`);
for (const token of [
 'aria-label="SQL query results, scroll horizontally for more columns"',
 'aria-describedby="arenaResultScrollHint"',
 'tabindex="0"','<caption class="arena-table-caption">SQL query results</caption>',
 '<th scope="col">',
 'Scroll sideways to explore all ${cols.length} result columns',
]) assert(js.includes(token),`Missing accessible SQL table markup: ${token}`);
assert(js.includes('window.DALP_ARENA_UPGRADE={decorate,report,diagnose}'),'Keep the SQL runner render integration');
console.log('PASS SQL outputs: full-width result card, intrinsic scrollable table, accessible headers and navigation, sticky header and row status');
