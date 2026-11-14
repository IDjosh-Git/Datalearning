import fs from 'node:fs';
import assert from 'node:assert/strict';
const luminance=hex=>{const rgb=hex.match(/[a-f0-9]{2}/gi).map(c=>parseInt(c,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};
const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
const pairs=[['Primary copy','#023048','#F0EDDE'],['Card copy','#023048','#FFFFFF'],['Muted copy','#675D58','#FFFFFF'],['Muted on soft panel','#675D58','#F7F3EA'],['Eyebrow','#770101','#FFFFFF'],['Primary CTA','#FFFFFF','#770101'],['Hero text','#F0EDDE','#023048'],['Hero eyebrow','#D9BFA4','#023048'],['Hero eyebrow at gradient burgundy end','#D9BFA4','#770101'],['Navigation sign-in','#023048','#F0EDDE']];
for(const [name,a,b] of pairs){const ratio=contrast(a,b);assert(ratio>=4.5,`${name}: ${ratio.toFixed(2)} must meet AA normal text contrast`);console.log(`PASS ${name}: ${ratio.toFixed(2)}:1`);}
const css=fs.readFileSync('public-course-guide.css','utf8');
for(const file of ['public-pages/start-here.html','course-info/catalog.html',...['introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai'].map(x=>`course-info/${x}.html`)]){
 const html=fs.readFileSync(file,'utf8');
 assert(html.includes('<body class="public-guide">'),file+' uses isolated theme scope');
 assert.equal(html.match(/<style id="public-critical-styles">([\s\S]*?)<\/style>/)[1],css,file+' includes current stylesheet for reliable delivery');
}
assert(!fs.readFileSync('public-pages/landing.html','utf8').includes('<body class="public-guide">'),'Homepage keeps its own layout');
assert(css.includes('.public-guide .premium-hero .hero-visual p{')||css.includes('.public-guide .premium-hero .hero-visual p,'),'Preview copy must override hero text on light panel');
console.log('PASS all 11 guide pages embed the app theme; homepage remains isolated');
