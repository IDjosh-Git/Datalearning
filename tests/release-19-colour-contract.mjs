import assert from 'node:assert/strict';import fs from 'node:fs';
const css=fs.readFileSync('assets/styles/brand-runtime.css','utf8');const premium=fs.readFileSync('assets/styles/premium-color-system.css','utf8');const footer=fs.readFileSync('assets/styles/public-footer-unified.css','utf8');const admin=fs.readFileSync('assets/styles/admin-brand-settings.css','utf8');
for(const t of ['--dl-brand-primary','--dl-brand-secondary','--dl-brand-background','--dl-text','--dl-border','--dl-danger'])assert(css.includes(t)&&premium.includes(t),`missing ${t}`);
assert(!/#0B0909|#023048|rgb\(11,9,9\)/i.test(footer),'legacy footer colour');assert(!/#0B0909|#023048|#F0EDDE/i.test(admin),'legacy Appearance colour');assert(css.includes('footer.dalp-public-footer')&&css.includes('focus-visible'));
const lum=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);const ratio=(a,b)=>{const x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
for(const [fg,bg,min] of [['#FFFFFF','#123B4A',4.5],['#FFFFFF','#183047',4.5],['#172B3A','#F8FAFC',4.5],['#526475','#FFFFFF',4.5],['#F1F6FA','#183047',4.5],['#B42318','#FFFFFF',4.5]])assert(ratio(fg,bg)>=min,`${fg} / ${bg} below ${min}`);
console.log('PASS release 19 semantic colours, live footer, Appearance tokens and six WCAG AA reference pairs');
