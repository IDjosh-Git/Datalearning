/* 2026-11-04 release invariants: grouped navigation, full editor, Tutor sidebar. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {discoverPages} from './page-assets.mjs';
const pages=discoverPages();
const style=fs.readFileSync('assets/styles/modern-workspace-20261104.css','utf8');
const navScript=fs.readFileSync('assets/scripts/public-navigation.js','utf8');
const arenaScript=fs.readFileSync('assets/scripts/arena-workspace-visibility.js','utf8');
const tutor=fs.readFileSync('tutor.html','utf8');
const prac=fs.readFileSync('practice.html','utf8');
let count=0;
for (const page of pages){
 const nav=page.html.match(/<nav[^>]*class="dalp-global-nav"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
 if(!nav)continue;
 count++;
 assert.equal((nav.match(/<details class="dalp-study-tools"/g)||[]).length,1,`${page.route}: one grouped menu`);
 assert.equal((nav.match(/<a\s+href=/g)||[]).length,10,`${page.route}: all ten destinations must remain available`);
 assert.match(nav,/<summary aria-label="Study tools menu">/,`${page.route}: accessible dropdown`);
 assert.equal((nav.match(/class="dalp-menu-symbol"><svg/g)||[]).length,5,`${page.route}: vector icons for all dropdown entries`);
 assert.match(nav,/Learning Lab[\s\S]*Prompt Library[\s\S]*Reference Library[\s\S]*Capstone Studio[\s\S]*AI Tutor/,`${page.route}: consistent grouped item order`);
}
assert.equal(count,27,'Public header must be consistent across all 27 templates');
assert.match(navScript,/Escape/,'Escape must close dropdown');
assert.match(navScript,/1131px/,'Header breakpoint must match responsive CSS');
assert.match(style,/\.ide-content>\.ide-primary\{grid-column:1!important/,'Editor must use the first desktop grid column');
assert.match(style,/\.ide-content>\.ide-secondary\{grid-column:2!important/,'Output must use the second desktop grid column');
assert.match(style,/\.ide-content:has\(>\.arena-task-panel\)/,'Challenge briefing must have its own row');
assert.match(style,/#arenaInputHost\{[\s\S]*?position:relative!important/,'Editor input host cannot remain absolutely positioned');
assert.match(style,/ide-content\.ide-show-output>\.ide-primary/,'Mobile output selection must not hide editor');
assert.match(style,/\.ide-shell\.is-editor-expanded/,'Expandable full-width editor must be styled');
assert.match(arenaScript,/aria-pressed/,'Expand-editor control must report its state');
assert.match(prac,/arena-workspace-visibility\.js/,'Practice page must load expanded editor behavior');
for (const anchor of ['tutorModeHeading','tutorTopic','tutorPromptsHeading','tutorResourcesHeading','chatQuestion']){
 assert.match(tutor,new RegExp(`(?:id="${anchor}"|href="#${anchor}")`),`Tutor destination missing: ${anchor}`);
 assert.match(tutor,new RegExp(`href="#${anchor}"`),`Tutor sidebar link missing: ${anchor}`);
}
assert.match(tutor,/aria-label="Tutor workspace sections"/,'Tutor sidebar navigation must be labeled');
assert.match(style,/\.tutor-rail-link/,'Tutor sidebar must be styled');
console.log(`PASS grouped public navigation (${count} routes), full-width editor/results, and modern accessible Tutor rail`);
