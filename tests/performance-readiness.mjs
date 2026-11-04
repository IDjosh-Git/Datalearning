/** Regression protection for responsive interaction and low-blocking page startup. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {discoverPages,root} from './page-assets.mjs';
const pages=discoverPages();
let scriptCount=0;
for (const page of pages){
 const tags=[...page.html.matchAll(/<script\b[^>]*\bsrc=["'][^"']+["'][^>]*>/gi)].map(x=>x[0]);
 for (const tag of tags){
  assert(/\bdefer\b|\basync\b|\btype=["']module["']/.test(tag),`${page.route}: parsing-blocking external script: ${tag}`);
  scriptCount++;
 }
 // The dependency chain remains ordered: vendor -> config -> client -> protected access guard.
 const vendor=tags.findIndex(x=>x.includes('supabase-js@'));
 if(vendor>=0){
  const config=tags.findIndex(x=>x.includes('supabase-config.js'));
  const client=tags.findIndex(x=>x.includes('supabase-client.js'));
  assert(vendor<config&&config<client,`${page.route}: auth library loading order changed`);
  const gate=tags.findIndex(x=>x.includes('auth-gate.js'));
  if(gate>=0)assert(client<gate,`${page.route}: permission gate before auth client`);
 }
}
const ui=fs.readFileSync(path.join(root,'assets/scripts/experience.js'),'utf8');
const css=fs.readFileSync(path.join(root,'assets/styles/design-system.css'),'utf8');
const nav=fs.readFileSync(path.join(root,'assets/scripts/public-navigation.js'),'utf8');
const coach=fs.readFileSync(path.join(root,'assets/scripts/learner-companion.js'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const account=fs.readFileSync(path.join(root,'account.html'),'utf8');
assert.match(ui,/addEventListener\('scroll', schedule, \{passive:true\}\)/,'passive scroll handler absent');
assert.match(ui,/requestAnimationFrame\(paint\)/,'scroll bar not coalesced by frame');
assert.match(ui,/scaleX\(/,'scroll indicator does not use compositor transform');
assert.match(ui,/requestIdleCallback\(batch/,'large table enhancements must be chunked');
assert.doesNotMatch(ui,/scroll',onScroll/,'old synchronous scroll layout polling remains');
assert.match(css,/scroll-behavior:auto!important/,'anchor navigation must be responsive');
assert.match(nav,/matchMedia\('\(min-width:1131px\)'\)/,'global nav still runs a handler on every resize');
assert.match(coach,/matchMedia\('\(max-width:950px\)'\)/,'coach still relocates on every pixel of resize');
assert.match(sw,/event\.waitUntil\(caches\.open\(CACHE\)\.then\(cache=>cache\.put\(/,'cache writes should not delay user responses');
assert.match(sw,/const PRIVATE/,'protected resources must be excluded from public caching');
assert.match(sw,/authorization/,'authenticated requests must bypass public cache');
assert.match(account,/const quizRequest=Promise\.resolve/,'account queries must launch in parallel');
assert.match(account,/const certificateRequest=Promise\.resolve/);
assert.match(account,/const capstoneRequest=Promise\.resolve/);
console.log(`PASS performance readiness: ${pages.length} pages, ${scriptCount} non-blocking script references; responsive scroll, async cache writes, auth order and concurrent account reads`);
