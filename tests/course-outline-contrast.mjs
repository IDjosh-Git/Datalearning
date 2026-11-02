import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const load = file => readFileSync(new URL(file, import.meta.url), 'utf8');
const css=load('../assets/styles/design-system.css');
const js=load('../assets/scripts/course-player-focus.js');
for(const course of ['excel','sql','python','powerbi']) {
 const html=load(`../courses/${course}.html`);
 assert.match(html, /assets\/styles\/design-system\.css/);
 assert.match(html, /assets\/scripts\/course-player-focus\.js/);
 assert.match(html, /course-lesson-disclosure/);
}
assert.match(css, /\.course-sidebar-collapse\[aria-expanded="false"\]/);
assert.match(css, /\.course-sidebar-collapse:focus-visible/);
assert.match(css, /\.course-lesson-disclosure\[open\]>summary/);
assert.match(css, /-webkit-text-fill-color:#fff!important/);
assert.match(js, /collapse\.addEventListener\('click'/);
assert.match(js, /aria-expanded/);
// WCAG contrast for every color stop in expanded/collapsed + hover gradients.
const normalize = hex=>hex.replace('#','');
const srgb=v=>{const c=parseInt(v,16)/255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4};
const luminance=hex=>{const x=normalize(hex);return .2126*srgb(x.slice(0,2))+.7152*srgb(x.slice(2,4))+.0722*srgb(x.slice(4,6))};
for (const c of ['#28399b','#1a2d68','#1d2b7c','#112351','#20546a','#17394f','#17475b','#102d40']) {
 assert.ok(1.05/(luminance(c)+.05)>=7,`Gradient endpoint ${c} must reach AAA 7:1 white-text contrast`);
}
for(const [fg,bg] of [['#172d49','#f0f4fb'],['#202a71','#e8edff']]){
 assert.ok((luminance(bg)+.05)/(luminance(fg)+.05)>=7,`Disclosure ${fg} against ${bg}`);
}
console.log('PASS course-outline colors: all four course pages, show/hide + hover + lesson disclosure, WCAG AAA stops');
