/** Lightweight interaction smoke test without depending on a GUI browser. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const listeners=new Map();
function emitter(props={}){return {...props,addEventListener(name,fn){this.handlers??={};this.handlers[name]=fn;}};}
const classes=new Set();
const nav=emitter({classList:{add(x){classes.add(x)},remove(x){classes.delete(x)},contains(x){return classes.has(x)}},querySelectorAll:()=>menus});
const button=emitter({attributes:{'aria-expanded':'false'},setAttribute(k,v){this.attributes[k]=v},getAttribute(k){return this.attributes[k]},focus(){this.focused=true},blur(){this.focused=false}});
const scrim=emitter();
const menus=[emitter({open:false}),emitter({open:false})];
const header={querySelector(sel){return sel.includes('toggle')?button:sel.includes('global-nav')?nav:sel.includes('scrim')?scrim:null},contains(node){return [button,nav,scrim,...menus].includes(node)}};
const documentStub={readyState:'complete',activeElement:button,querySelector(sel){return sel.includes('global-header')?header:null},addEventListener(name,fn){listeners.set(name,fn)}};
const media=emitter({matches:false});
const script=fs.readFileSync('assets/scripts/public-navigation.js','utf8');
vm.runInNewContext(script,{document:documentStub,matchMedia:()=>media});
const assertOpen=state=>{assert.equal(nav.classList.contains('is-open'),state);assert.equal(button.getAttribute('aria-expanded'),String(state));};
button.handlers.click(); assertOpen(true);
listeners.get('keydown')({key:'Escape',preventDefault(){this.prevented=true}});assertOpen(false);assert.equal(button.focused,true);
button.handlers.click();assertOpen(true);
nav.handlers.click({target:{closest(name){return name==='a'?{}:null}}});assertOpen(false);
menus[0].open=true;menus[1].open=true;menus[0].handlers.toggle();assert.equal(menus[1].open,false,'Opening Courses closes Tools');
listeners.get('pointerdown')({target:{}});assert.equal(menus[0].open,false,'Outside click closes menu');
button.handlers.click();assertOpen(true);media.matches=true;media.handlers.change();assertOpen(false);
console.log('PASS public navigation interactions: open/close, Escape, link selection, exclusive flyouts, outside click and desktop breakpoint');
