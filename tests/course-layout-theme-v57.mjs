import fs from 'node:fs';import assert from 'node:assert/strict';
const css=fs.readFileSync('assets/course-layout-theme-v57.css','utf8');const js=fs.readFileSync('assets/course-layout-theme-v57.js','utf8');
for(const track of ['python','sql','powerbi','excel','ai','introduction']){const html=fs.readFileSync(`courses/${track}.html`,'utf8');assert.match(html,/course-layout-theme-v57\.css\?v=57/);assert.match(html,/course-layout-theme-v57\.js\?v=57/)}
for(const token of ['--course-surface','--course-text','--course-muted','--course-code-bg','--course-edge'])assert.ok(css.includes(token));
for(const selector of ['html[data-theme="dark"]','.question .option','.sidebar.open','.course-drawer-backdrop','body.course-drawer-open'])assert.ok(css.includes(selector));
for(const token of ['aria-expanded','Escape','storedY','requestAnimationFrame'])assert.ok(js.includes(token));
console.log('PASS v57 all six courses: theme tokens, compact quizzes, drawer locking, navigation hooks');
