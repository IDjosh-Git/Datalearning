/* The current six course pages share a last-loaded premium CSS layer.
 * Keep responsive card-width and static-first table fixes from regressing. */
import fs from 'node:fs';
import assert from 'node:assert/strict';
const css=fs.readFileSync(new URL('../assets/styles/premium-unified.css',import.meta.url),'utf8');
const courses=['introduction','excel','sql','powerbi','python','ai'];
for(const course of courses){
 const html=fs.readFileSync(new URL(`../courses/${course}.html`,import.meta.url),'utf8');
 const sheetTags=[...html.matchAll(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi)].map(m=>m[0]);
 assert.match(sheetTags.at(-1)||'',/premium-unified\.css/,`${course} must load the canonical premium CSS last`);
 assert.match(html,/dlp-course-v29/,`${course} must be within the scoped course UI`);
}
for(const marker of [
 'Premium full-width learning cards',
 'body.dlp-course-v29[data-ui-course] .content .side-stack',
 'Premium readable teaching tables',
 'main table.learning-table tbody tr',
 'main table.learning-table caption',
 'main table.learning-table tbody :is(td,th):nth-child(3)::before',
 '@media(max-width:767px)',
 '@media(max-width:640px)',
]) assert(css.includes(marker),`missing responsive card layout safeguard: ${marker}`);
assert.match(css,/body\.dlp-course-v29 \:is\(\.hero[^\n]*\)::before/, 'decorative veil protection must remain scoped');
console.log('PASS six course pages, wide teaching cards, unobstructed panels and static-first mobile tables');
