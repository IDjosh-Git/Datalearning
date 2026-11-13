/** Verify the canonical Practice Arena mobile/full-width and SQL light theme contract. */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const css=readFileSync('assets/styles/practice-arena-premium-final.css','utf8');
const page=readFileSync('practice.html','utf8');
const upgrade=readFileSync('assets/scripts/arena-upgrade.js','utf8');
assert(page.includes('practice-arena-premium-final.css?v=20261111-mobile-sql-results-r2'),'Browser should load the revised CSS');
for(const clause of [
 'main.pc-wrap {', 'width:100%!important;max-width:100%!important;min-width:0!important;',
 'padding:0 6px 22px!important', '.ide-editor-toolbar{',
 '#practiceDetail[data-active-editor="SQL"] .ide-primary .arena-editor',
 'background:#F0EDDE!important', '.arena-code pre#arenaHighlight',
 'color:#023048!important', '#practiceAnswer.sql-editor-textarea',
 'background:transparent!important', '-webkit-text-fill-color:transparent!important',
 '#arenaLines.arena-lines', 'background:#F6F0E8!important',
]) assert(css.includes(clause),`Missing mobile/light-theme rule: ${clause}`);
assert(upgrade.includes("textarea.addEventListener('input'"),'Native editor and highlighting must remain active');
assert(upgrade.includes("textarea.addEventListener('scroll'"),'Highlighter must remain scroll-synchronized');
console.log('PASS Practice Arena mobile near-edge-to-edge layouts, one SQL light editor, and preserved native input/highlighting');
