import assert from 'node:assert/strict';
import fs from 'node:fs';
const css=fs.readFileSync('assets/arena-scroll-and-theme-v54.css','utf8');
const depth=fs.readFileSync('assets/arena-mobile-depth.css','utf8');
const scripts=['arena-ide.js','arena-mobile-depth.js','arena-responsive-tabs.js','arena-vibrance.js','arena-stability.js','arena-editor-selection-v49.js','python-lab-v41.js'];
assert.match(css, /#practiceAnswer,#pythonCode,#ideFormulaBar/);
assert.match(css, /touch-action: pan-x pan-y pinch-zoom !important/);
assert.match(css, /overscroll-behavior-y: auto !important/);
assert.match(css, /#practiceDetail\.pc-detail\[data-active-editor="Python"\]/);
assert.doesNotMatch(depth, /background:var\(--bg\)!important;overscroll-behavior:none/);
for(const name of scripts){
 const code=fs.readFileSync('assets/'+name,'utf8');
 const calls=[...code.matchAll(/addEventListener\(['"](?:touchstart|touchmove|touchend|pointerdown|pointermove|pointerup)['"][\s\S]{0,220}/g)];
 for(const c of calls) assert.doesNotMatch(c[0], /preventDefault\s*\(/, `${name}: touch listener cancellation`);
}
console.log('PASS v55 editor touch-scroll CSS and touch handler audit');
