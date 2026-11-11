/** AI learners can always discover the existing Prompt Library. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const page=read('courses/ai.html');
const workspace=read('assets/scripts/weekly-workspace.js');
const styles=read('assets/styles/ai-prompt-course-link.css');
assert(fs.existsSync(path.join(root,'prompt-library.html')),'Prompt Library target missing');
assert(page.includes('href="../prompt-library.html" aria-label="Open the AI Prompt Library"'),'AI course resource card missing');
assert(page.includes('class="dl-prompt-rail-link" href="../prompt-library.html"'),'AI course sidebar support link missing');
assert(page.includes('ai-prompt-course-link.css?v=ai-prompts-20261111'),'AI prompt stylesheet missing');
assert(page.indexOf('ai-prompt-course-link.css') < page.indexOf('public-search-premium.css'),'Preserve public search stylesheet order');
assert(workspace.includes("course==='ai'?`<aside class=\"dl-ai-prompt-feature\""),'Weekly workspace callout not AI specific');
assert(workspace.includes('class="dl-ai-prompt-feature-action" href="../prompt-library.html"'),'Weekly workspace CTA missing');
for(const token of ['.dl-ai-prompt-feature-action:focus-visible','@media (max-width:680px)','prefers-reduced-motion']) assert(styles.includes(token),`Missing responsive/accessibility style ${token}`);
console.log('PASS: AI course and visible weekly workspace link to existing Prompt Library on desktop and mobile.');
