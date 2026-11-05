/** Tutor Studio design checks: visual changes must not break user controls. */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('tutor.html');
const css=read('assets/styles/premium-unified.css');
const tutor=read('assets/scripts/tutor.js');
const ai=read('assets/scripts/tutor-ai.js');
for (const id of ['chatForm','chatQuestion','sendQuestion','tutorTopic','tutorModeAi','tutorModeOffline','tutorFollowups','topReset','clearChat','cancelTutor','chatMessages','practiceTopic']) {
 assert(html.includes('id="'+id+'"'),`Tutor control removed: ${id}`);
}
for (const name of ['tutor-hero-steps','tutor-hero-aside','tutor-side-top','tutor-sidebar','tutor-toolbar','tutor-welcome-icon','tutor-compose-icon','tutor-privacy']) {
 assert(html.includes(name),`Premium Tutor region missing: ${name}`);
}
assert(html.includes('class="tutor-resource-link" data-action="tutor-resource"'), 'Tutor navigation must remain styled as clickable cards');
assert.match(css,/Tutor Studio — premium workspace/);
assert.match(css,/\.tutor-chat \.tutor-composer:focus-within/);
assert.match(css,/\.tutor-chat \.tutor-composer label\.sr-only/);
assert.match(css,/\.tutor-sidebar \{/);
assert.match(css,/@media\(max-width:600px\)/);
assert.match(tutor,/form\.addEventListener\('submit'/);
assert.match(ai,/\.tutor-mode-block/);
assert.match(ai,/quick\.insertBefore\(el,examples\)/);
console.log('PASS Tutor Studio premium header, sidebar navigation, accessible composer and preserved live/offline controls');
