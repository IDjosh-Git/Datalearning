import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=file=>fs.readFileSync(file,'utf8');
const ds=read('assets/styles/design-system.css');
const catalog=read('assets/styles/catalog.css');
const intro=read('assets/styles/course-page-improvements.css');
const shared=read('assets/styles/course-shared-responsiveness.css');
const introPage=read('courses/introduction.html');
const aiPage=read('courses/ai.html');
assert.match(ds,/body\.dlp97-catalog-page \.dlp97-card\{height:auto;min-height:0;box-sizing:border-box/,'Catalog cards must size within grid rows');
assert.doesNotMatch(ds,/:is\(\.lp-course,\.lp-feature,\.dlp97-card\)\{height:100%/,'Content-box heights must not overlap catalog cards');
assert.match(catalog,/\.dlp97-cards \{column-gap:clamp\([^}]+row-gap:clamp\(/,'Catalog needs independent row spacing');
for(const [file,css] of [['Introduction',intro],['other courses',shared]]){
 assert.match(css,/background:var\(--dalp-page-hero,#263d5d\)!important/ ,`${file} header must have a dark colour`);
 assert.match(css,/color:#fff!important;-webkit-text-fill-color:#fff!important/ ,`${file} headers need visible light titles`);
 assert.doesNotMatch(css,/:is\(\.hero,\.intro-hero,\.ai-hero\)\s*\{[^}]*background:\s*var\(--course-page-canvas\)/,`${file} still has a pale hero override`);
}
assert.match(introPage,/intro-hero dalp-themed-hero/);
assert.match(aiPage,/ai-hero dalp-themed-hero/);
assert.match(ds,/--dalp-header-height:56px/,'Top navigation must use the compact height');
assert.match(ds,/main a\[href\]:not\(\.dalp-themed-hero a\)/,'Plain link rules must leave dark-hero contrast intact');
assert.match(catalog,/\.dlp97-catalog-hero \{[^}]*background:var\(--dalp-page-hero,#263d5d\)/,'Learn page hero must be flat, dark and legible');
console.log('PASS catalog spacing, dark course/banner contrast, compact header and plain hero link regression');
