import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const names = ['excel', 'sql', 'powerbi', 'ai', 'introduction'];
const sheet = fs.readFileSync(path.join(root, 'assets/course-polish-v29.css'), 'utf8');
const script = fs.readFileSync(path.join(root, 'assets/course-polish-v29.js'), 'utf8');
const targets = ['--dlp29-canvas','--dlp29-surface','--dlp29-grid','--dlp29-ink', 'html[data-theme="dark"]','min-height:48px','@media(max-width:640px)','prefers-reduced-motion','overflow-x:auto','focus-visible'];
for (const token of targets) assert(sheet.includes(token), `Missing CSS safeguard: ${token}`);
for (const name of names) {
  const filename = path.join(root, 'courses', `${name}.html`);
  const html = fs.readFileSync(filename, 'utf8');
  assert(html.includes('dlp-course-v29'), `Body not scoped for ${name}`);
  assert.equal(html.split('id="course-guide-v29"').length - 1, 1, `Expected one course guide: ${name}`);
  for (const resource of ['course-polish-v29.css?v=20261023.29','course-polish-v29.js?v=20261023.29']) {
    assert.equal(html.split(`../assets/${resource}`).length - 1, 1, `${name} missing or duplicating ${resource}`);
    assert(fs.existsSync(path.join(root, 'assets', resource.split('?')[0])), `Missing ${resource}`);
  }
  assert(html.indexOf('course-polish-v29.css') > html.indexOf('dashboard-analytics-v28.css'), `${name} CSS cascade order incorrect`);
  assert(html.indexOf('course-guide-v29') < html.indexOf('applied-mastery'), `Course overview should precede mastery: ${name}`);
  for (const fragment of ['data-course-tablist','data-tab="outcomes"','data-tab="prepare"','data-tab="example"','data-panel="outcomes"','data-panel="prepare"','data-panel="example"','dlp29-milestone','dlp29-checkpoint','<pre tabindex="0"><code>']) {
    assert(html.includes(fragment), `${name} missing guide feature ${fragment}`);
  }
  const section = html.split('id="course-guide-v29"')[1].split('</section>')[0];
  assert(section.length > 1500, `Insufficient course overview: ${name}`);
  const milestoneHrefs = [...html.matchAll(/class="dlp29-milestone" href="#([^"\s]+)"/g)].map(x => x[1]);
  assert.equal(milestoneHrefs.length, 4, `Four stages required: ${name}`);
  for (const fragment of milestoneHrefs) assert(html.includes(`id="${fragment}"`), `${name} invalid milestone anchor #${fragment}`);
}
// No browser dependencies are needed to verify tab interaction and roving focus.
class Node {
  constructor(id, dataset = {}) {
    this.id = id; this.dataset = dataset; this.attrs = {}; this.listeners = {}; this.hidden = false; this.tabIndex = undefined; this.focused = false;
  }
  setAttribute(name, value) { this.attrs[name] = value; }
  addEventListener(event, callback) { this.listeners[event] = callback; }
  focus() { this.focused = true; }
  dispatch(name, props = {}) { const evt = { ...props, prevented: false, preventDefault() {this.prevented=true;} }; this.listeners[name]?.(evt); return evt; }
}
const tabs = ['outcomes','prepare','example'].map(x => new Node(`tab-${x}`, {tab:x}));
const panels = ['outcomes','prepare','example'].map(x => new Node(`panel-${x}`, {panel:x}));
const tablist = new Node('list');
const host = {
  active: false,
  classList: {add(name){assert.equal(name,'is-enhanced');host.active=true;}},
  querySelector(selector){return selector === '[data-course-tablist]' ? tablist : null;},
  querySelectorAll(selector){return selector === '[data-tab]' ? tabs : panels;}
};
const document = {querySelectorAll(selector) {return selector === '[data-course-tabs]' ? [host] : [];}};
vm.runInNewContext(script, {document});
assert.equal(tablist.attrs.role,'tablist');
assert.equal(tabs[0].attrs['aria-selected'],'true');
assert.equal(panels[1].hidden,true);
assert.equal(panels[2].hidden,true);
tabs[1].dispatch('click');
assert.equal(tabs[1].attrs['aria-selected'],'true');
assert.equal(panels[1].hidden,false);
const move=tabs[1].dispatch('keydown',{key:'ArrowRight'});
assert(move.prevented); assert(tabs[2].focused); assert.equal(panels[2].hidden,false);
tabs[2].dispatch('keydown',{key:'Home'});
assert(tabs[0].focused); assert.equal(panels[0].hidden,false);
tabs[0].dispatch('keydown',{key:'End'});
assert.equal(tabs[2].attrs['aria-selected'],'true');
console.log(`PASS v29: ${names.length} course pages, static paths, milestone anchors, focusable guides, reduced motion and accessible tab behavior`);
