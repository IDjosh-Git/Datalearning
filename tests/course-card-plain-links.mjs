import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = file => readFileSync(new URL('../'+file, import.meta.url), 'utf8');
const home = read('index.html');
const css = read('assets/styles/design-system.css');
const legacy = read('assets/styles/home.css');
const refinements = read('assets/styles/home-refinements.css');

assert.match(home, /id="resumeCourseLink"/, 'Resume link must remain present');
assert.match(home, /class="dalp-plain-link" href="courses\/introduction\.html" id="resumeCourseLink"/, 'Resume/review link must be an ordinary link, not a primary button');
assert.equal((home.match(/class="dalp-plain-link lp-course-cta"/g)||[]).length, 7, 'The six course cards plus the pathfinder action should remain plain links');
assert.equal((home.match(/class="dalp-plain-link lp-studio-cta"/g)||[]).length, 6, 'All six secondary course card links must remain present');
assert.doesNotMatch(legacy, /\.lp-course-cta\s*\{[^}]*background:\s*var\(--track\)/, 'Legacy course CTA must not have a filled track background');
assert.doesNotMatch(legacy, /\.lp-course-cta::after\s*\{\s*content:/, 'Course CTA must not have clickable overlay');
assert.doesNotMatch(refinements, /:is\([^{}]*\.lp-course-cta[^{}]*\)\s*\{[^{}]*background:\s*var\(--primary\)/, 'Old primary theme must not colour course card links');
assert.doesNotMatch(css, /:is\(a,button\)\.lp-course-cta\s*\{[^}]*background:\s*var\(--ui-primary\)/, 'Theme must not force filled course links');
assert.match(css, /body\.lp-home :is\(\.lp-course-footer,\.lp-smart-actions,\.lp-pathfinder-result\) a:is\(\.lp-course-cta,\.lp-studio-cta,\.dalp-plain-link\)/);
assert.match(css, /\.lp-course-cta::after\s*\{content:none!important/);
console.log('Course card and completed-course link styling checks passed.');
