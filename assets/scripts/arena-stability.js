/* Practice Arena stability and adaptive mobile workspace. */
(()=>{'use strict';
const root=document.getElementById('practiceDetail');if(!root)return;
const KEY='dalp-arena-ui-v2';let prefs={};try{const restored=JSON.parse(localStorage.getItem(KEY)||'{}');prefs=restored&&typeof restored==='object'&&!Array.isArray(restored)?restored:{}}catch{prefs={}}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(prefs))}catch(e){console.warn('Arena UI preferences cannot be saved:',e.message)}};
let scheduled=false,lastShell=null;
function apply(){scheduled=false;try{
 const shell=root.querySelector('.ide-shell');if(!shell||shell===lastShell)return;lastShell=shell;
 const current=root.querySelector('.pc-overline')?.textContent||'';
 const challenge=root.querySelector('h2')?.textContent||'Practice challenge';
 let task=root.querySelector('.arena-task-panel');
 if(!task){task=document.createElement('section');task.className='arena-task-panel';task.id='arenaTaskPanel';task.setAttribute('aria-label','Task information');task.innerHTML='<div class="arena-task-head"><span>CHALLENGE BRIEF</span><button type="button" class="arena-task-toggle" aria-expanded="true" aria-controls="arenaTaskBody">Hide details</button></div><div class="arena-task-body" id="arenaTaskBody"></div>';shell.querySelector('.ide-content')?.prepend(task);
 task.querySelector('.arena-task-toggle').addEventListener('click',()=>{const collapsed=task.classList.toggle('is-collapsed');const button=task.querySelector('.arena-task-toggle');button.textContent=collapsed?'Show details':'Hide details';button.setAttribute('aria-expanded',String(!collapsed));task.querySelector('.arena-task-body').hidden=collapsed;});}
 const body=task.querySelector('.arena-task-body');body.replaceChildren();
 const h=document.createElement('h3');h.textContent=challenge;body.append(h);
 const kicker=document.createElement('span');kicker.className='arena-task-kind';kicker.textContent=current;body.append(kicker);
 const prompt=document.createElement('p');prompt.textContent=root.querySelector('.pc-question')?.textContent||'Select a challenge to see its instructions.';body.append(prompt);
 const meta=document.createElement('p');meta.className='arena-task-context';meta.textContent='Queries execute against bundled sample data. The SQL and formula engines support documented subsets, not full SQLite, DAX, or Python execution.';body.append(meta);
 let nav=shell.querySelector('.arena-triple-nav');if(!nav){nav=document.createElement('nav');nav.className='arena-triple-nav';nav.setAttribute('aria-label','Practice workspace');nav.innerHTML='<button type="button" data-arena-view="task">Task Info</button><button type="button" data-arena-view="editor">Editor</button><button type="button" data-arena-view="output">Output / Results</button>';shell.querySelector('.ide-content')?.before(nav);nav.addEventListener('click',e=>{const b=e.target.closest('[data-arena-view]');if(b){const panel=b.dataset.arenaView==='task'?shell.querySelector('.arena-task-panel'):b.dataset.arenaView==='output'?shell.querySelector('.ide-secondary'):shell.querySelector('.ide-primary');select(b.dataset.arenaView,shell);panel?.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}});}
 // A newly selected challenge always opens the relevant editor, rather than
 // inheriting the previous subject's Task/Output tab on mobile.
 select('editor',shell);
 const saved=prefs.results?.[challenge];if(saved){const target=shell.querySelector('#ideConsoleMount,#arenaConsole');if(target&&(!target.textContent.trim()||target.textContent.includes('Ready.')))target.textContent=saved.text;}
 }catch(err){console.error('Arena layout enhancement:',err);}}
 function select(view,shell){if(!['task','editor','output'].includes(view))view='editor';shell.dataset.arenaView='editor';prefs.view=view;save();shell.querySelectorAll('.arena-triple-nav button').forEach(b=>{const selected=b.dataset.arenaView===view;b.setAttribute('aria-current',selected?'page':'false');b.classList.toggle('active',selected)})}
 const mo=new MutationObserver(()=>{if(!scheduled){scheduled=true;queueMicrotask(apply)}});mo.observe(root,{childList:true});apply();
 root.addEventListener('click',e=>{if(e.target.closest('#ideRun,#practiceCheck,.arena-mobile-run')){const shell=root.querySelector('.ide-shell');if(shell&&matchMedia('(max-width:767px)').matches)select('output',shell);}});
 root.addEventListener('click',e=>{if(e.target.closest('#ideReset')){const name=root.querySelector('h2')?.textContent;if(name&&prefs.results)delete prefs.results[name];save();}});
 let editSave;root.addEventListener('input',e=>{if(e.target.matches('#practiceAnswer,#ideFormulaBar')){prefs.lastEdited=Date.now();clearTimeout(editSave);editSave=setTimeout(save,650)}});
 // Listen to feedback changes only: syntax highlight DOM updates must not trigger storage writes.
 let observedFeedback=null;
 const feedbackObserver=new MutationObserver(()=>{const message=observedFeedback?.textContent?.trim();const name=root.querySelector('h2')?.textContent;if(!message||!name)return;prefs.results={...(prefs.results||{}),[name]:{text:message.slice(0,1800),saved:Date.now()}};save();});
 function watchFeedback(){const next=root.querySelector('#practiceFeedback');if(next===observedFeedback)return;feedbackObserver.disconnect();observedFeedback=next;if(next)feedbackObserver.observe(next,{childList:true,characterData:true,subtree:true});}
 new MutationObserver(watchFeedback).observe(root,{childList:true});watchFeedback();
 window.addEventListener('error',e=>{if(!String(e.filename||'').includes('practice')&&!String(e.filename||'').includes('arena'))return;console.error('Practice Arena:',e.message)});
})();
