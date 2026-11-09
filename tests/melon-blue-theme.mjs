import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
const theme=read('assets/styles/premium-unified.css');
const logo=read('assets/icons/da-logo.svg');
const sw=read('service-worker.js');
for(const hex of ['#F9F7F6','#E9E4DF','#F69268','#35637C','#203F58','#102030']){
 assert(theme.includes(hex),`Missing supplied palette tone ${hex}`);
}
assert(theme.includes('body.ac-ready .ac-sidebar'),'Private sidebar styling missing');
assert(theme.includes('linear-gradient(160deg,#F9F7F6,#F1EBE5'),'Private/course sidebar light gradient missing');
assert(theme.includes('body.dlp-course-v29'),'Course sidebar styling missing');
assert(theme.includes('body.lp-home main#main-content section.lp-hero'),'Discover hero palette missing');
assert(theme.includes('body[data-responsive-page="capstone"]'),'Capstone palette missing');
assert(theme.includes('body[data-responsive-page="tutor"]'),'Tutor palette missing');
assert(logo.includes('#35637C') && logo.includes('#F69268'),'Logo not using supplied palette');
assert(sw.includes('dalp-public-premium-responsive-v53'),'Service worker cache not revised');
const contrast=(fg,bg)=>{
 const rgb=hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);
 const luminosity=hex=>rgb(hex).reduce((t,c,i)=>t+c*[.2126,.7152,.0722][i],0);
 const [a,b]=[luminosity(fg),luminosity(bg)].sort((x,y)=>y-x);
 return (a+.05)/(b+.05);
};
for(const [fg,bg] of [['#203F58','#F9F7F6'],['#203F58','#E9E4DF'],['#102030','#F69268'],['#FFFFFF','#35637C'],['#35637C','#FFFFFF']]){
 assert(contrast(fg,bg)>=4.5,`Low contrast ${fg} on ${bg}`);
}
const pages=[...fs.readdirSync(root).filter(x=>x.endsWith('.html')),...fs.readdirSync(path.join(root,'courses')).filter(x=>x.endsWith('.html')).map(x=>'courses/'+x)];
for(const page of pages){const html=read(page);assert(/<meta(?=[^>]*name="theme-color")(?=[^>]*content="#F9F7F6")[^>]*>/.test(html),`${page}: warm theme-color missing`)}
console.log(`PASS Melon + Blueprint visual design: ${pages.length} pages, supplied palette, responsive sidebars, cache revision, five AA contrast pairs`);
