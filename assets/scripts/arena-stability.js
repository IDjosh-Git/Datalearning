/* Practice Arena stability and adaptive mobile workspace. */
(()=>{'use strict';
const root=document.getElementById('practiceDetail');if(!root)return;
const KEY='dalp-arena-ui-v2';let prefs={};try{const restored=JSON.parse(window.DALP_STORAGE.getItem(KEY)||'{}');prefs=restored&&typeof restored==='object'&&!Array.isArray(restored)?restored:{}}catch{prefs={}}
const save=()=>{try{window.DALP_STORAGE.setItem(KEY,JSON.stringify(prefs))}catch(e){console.warn('Arena UI preferences cannot be saved:',e.message)}};
let scheduled=false,lastShell=null;
function apply(){scheduled=false;try{
 const shell=root.querySelector('.ide-shell');if(!shell||shell===lastShell)return;lastShell=shell;
 const challenge=root.querySelector('h2')?.textContent||'Practice challenge';
 // Task details are already available in the single collapsible Challenge Brief
 // above the workspace. Avoid re-creating them inside the editor.
 root.querySelector('.arena-task-panel')?.remove();
 let nav=shell.querySelector('.arena-triple-nav');
 if(!nav){
  nav=document.createElement('nav');nav.className='arena-triple-nav arena-panel-nav';
  nav.setAttribute('aria-label','Practice workspace panels');
  nav.innerHTML='<button type="button" data-arena-view="editor">Editor</button><button type="button" data-arena-view="output">Output / Results</button>';
  shell.querySelector('.ide-content')?.before(nav);
  nav.addEventListener('click',e=>{
   const button=e.target.closest('[data-arena-view]');if(!button)return;
   const panel=button.dataset.arenaView==='output'?shell.querySelector('.ide-secondary'):shell.querySelector('.ide-primary');
   select(button.dataset.arenaView,shell);
   panel?.scrollIntoView({block:'start',behavior:'auto'});
  });
 }
 // A newly selected challenge always opens the relevant editor, rather than
 // inheriting the previous subject's Task/Output tab on mobile.
 select('editor',shell);
 const saved=prefs.results?.[challenge];if(saved){const target=shell.querySelector('#ideConsoleMount,#arenaConsole');if(target&&(!target.textContent.trim()||target.textContent.includes('Ready.')))target.textContent=saved.text;}
 }catch(err){console.error('Arena layout enhancement:',err);}}
 function select(view,shell){if(!['editor','output'].includes(view))view='editor';shell.dataset.arenaView='editor';prefs.view=view;save();shell.querySelectorAll('.arena-triple-nav button').forEach(b=>{const selected=b.dataset.arenaView===view;b.setAttribute('aria-current',selected?'page':'false');b.classList.toggle('active',selected)})}
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
