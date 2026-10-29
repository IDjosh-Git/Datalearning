import fs from 'node:fs';
import assert from 'node:assert/strict';
const css=fs.readFileSync(new URL('../assets/theme-foundation-v65.css',import.meta.url),'utf8');
const light=css.split('html[data-theme="dark"]')[0];
const dark=css.split('html[data-theme="dark"]')[1].split('html {')[0];
const parse=(s)=>Object.fromEntries([...s.matchAll(/(--[\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map(m=>[m[1],m[2]]));
const luminance=(h)=>{const rgb=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);return rgb[0]*0.2126+rgb[1]*0.7152+rgb[2]*0.0722};
const ratio=(a,b)=>{const v=[luminance(a),luminance(b)].sort((x,y)=>x-y);return (v[1]+.05)/(v[0]+.05)};
const pairs=[['--text-main','--background'],['--text-main','--surface'],['--text-muted','--surface'],['--on-primary','--primary'],['--focus-ring','--background'],['--positive','--background'],['--danger','--background']];
for(const [name,colors] of [['light',parse(light)],['dark',parse(dark)]]){
 for(const [a,b] of pairs){assert(colors[a] && colors[b],`${name}: missing ${a}/${b}`);assert(ratio(colors[a],colors[b])>=7,`${name}: ${a}/${b} ${ratio(colors[a],colors[b]).toFixed(2)} < 7`);}
}
console.log('PASS: 14 semantic contrast pairs at or above 7:1 in light and dark');
