/** Regressions for 2026-11-09 public AI, full-screen mobile nav, contrast and auth search removal. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const publicFiles = [
  ...fs.readdirSync(root).filter(x=>x.endsWith('.html')&&!new Set(['account.html','admin.html','profile.html','progress.html','reviewer.html','certificate.html','connection-test.html','sync-test.html']).has(x)),
  ...fs.readdirSync(path.join(root,'courses')).filter(x=>x.endsWith('.html')).map(x=>'courses/'+x)
];
for(const file of publicFiles){
  const html = read(file), scriptPath = (file.startsWith('courses/')?'../':'')+'assets/scripts/floating-learning-ai.js';
  assert.equal(html.split(scriptPath).length-1,1,`${file}: site-wide floating coach must load once`);
}
assert(!read('auth.html').includes('src="assets/scripts/premium-search.js"'), 'No command search on sign-in');
const coach=read('assets/scripts/floating-learning-ai.js');
for(const item of ['dl-float-launcher','dl-float-panel','dl-float-close','offline-knowledge.js','DALP_KNOWLEDGE','api/tutor','Sign-in required','aria-live','Escape','credentials:\'same-origin\''])
  assert(coach.includes(item),`Floating coach lost ${item}`);
assert(!coach.includes('OPENAI_API_KEY')&&!coach.includes('GROQ_API_KEY'),'No provider API key in client script');
const nav=read('assets/scripts/public-navigation.js');
for(const item of ['dl-mobile-navigation-header','dl-mobile-navigation-close','aria-modal','close(true)','Escape'])assert(nav.includes(item),`Mobile navigation lost ${item}`);
const css=read('assets/styles/premium-unified.css');
for(const item of ['.dl-float-launcher','.dl-float-panel','.dl-mobile-navigation-close','.dl-mobile-nav-open .dl-float-coach','.guide-hero.dalp-themed-hero','body[data-responsive-page="practice"]','background:#f8fbfc'])assert(css.includes(item),`Missing component or readable response style ${item}`);
const contrast=(a,b)=>{const luminance = h=>{const c=h.match(/.{2}/g).map(n=>parseInt(n,16)/255).map(n=>n<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4));return c[0]*.2126+c[1]*.7152+c[2]*.0722;};const [l1,l2]=[luminance(a),luminance(b)].sort((x,y)=>y-x);return(l1+.05)/(l2+.05)};
for(const [name,fg,bg] of [['Arena feedback','203f58','f8fbfc'],['AI chat primary heading','ffffff','203f58'],['AI body','203f58','f8fbfc'],['Course guide heading','ffffff','1b354a'],['Course badge','203f58','e9f8f0']])assert(contrast(fg,bg)>=4.5,`${name} fails normal text contrast`);
console.log(`PASS floating AI/nav/contrast: ${publicFiles.length} learner-facing routes, gated live provider, guest guide, full-screen mobile close, readable workspace colours, no auth search`);
