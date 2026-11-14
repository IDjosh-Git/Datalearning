import fs from 'node:fs';
import assert from 'node:assert/strict';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const css=read('public-course-guide.css');
for(const page of ['public-pages/landing.html','public-pages/start-here.html','course-info/catalog.html',...['introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai'].map(s=>'course-info/'+s+'.html')]){
 const html=read(page);
 assert(html.includes('id="public-critical-styles"'),page+' must embed critical styles');
 assert(html.includes('.premium-hero{'),page+' must include premium layout styles');
 assert(html.includes('.brand img{'),page+' must constrain brand logo');
 assert(html.includes('<link rel="stylesheet" href="/public-course-guide.css">'),page+' must retain external CSS');
 assert(html.includes('width="42"')||html.includes('width="44"'),page+' must constrain logo dimensions');
}
assert(css.includes('.hero-visual>img{'));
console.log('PASS all 12 public pages self-style without relying on external CSS');
