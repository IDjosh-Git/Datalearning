/* DataLearning — Practice Arena workspace presentation. The existing engines, answers and storage stay authoritative. */
(()=>{'use strict';
 const root=document.getElementById('practiceDetail');if(!root)return;
 const $=(selector,scope=root)=>scope.querySelector(selector);
 const subjectName=()=>root.dataset.activeEditor||'SQL';
 function prepareReference(){
   const reference=$('.pc-schema:not(.arena-reference-ready)');
   if(!reference||subjectName()!=='SQL')return;
   reference.classList.add('arena-reference-ready');
   const content=document.createElement('div');content.className='arena-reference-content';content.id='arenaSqlReference';content.hidden=true;
   while(reference.firstChild)content.appendChild(reference.firstChild);
   const heading=document.createElement('div');heading.className='arena-reference-heading';
   const copy=document.createElement('div');copy.className='arena-reference-copy';
   copy.innerHTML='<span class="arena-small-kicker">SCHEMA REFERENCE</span><strong>Database tables</strong><small>Four sample tables. Expand only when you need their fields.</small>';
   const toggle=document.createElement('button');toggle.type='button';toggle.className='arena-table-toggle';toggle.setAttribute('aria-controls','arenaSqlReference');toggle.setAttribute('aria-expanded','false');
   toggle.innerHTML='<span class="arena-table-toggle-icon" aria-hidden="true">▤</span><span class="arena-table-toggle-label">Show schema</span><span class="arena-table-chevron" aria-hidden="true">⌄</span>';
   toggle.addEventListener('click',()=>{const expanded=content.hidden;content.hidden=!expanded;toggle.setAttribute('aria-expanded',String(expanded));toggle.querySelector('.arena-table-toggle-label').textContent=expanded?'Hide schema':'Show schema';});
   heading.append(copy,toggle);reference.append(heading,content);
 }
 function addWorkspaceHeading(){
   const anchor=$('.ide-shell')||$('.python-in-challenge');
   if(!anchor||root.querySelector('.arena-workspace-heading'))return;
   const block=document.createElement('div');block.className='arena-workspace-heading';
   const title=subjectName()==='Excel'?'Excel Formula Studio':subjectName()==='SQL'?'SQL Query Studio':'Python Coding Studio';
   block.innerHTML='<div><span class="arena-small-kicker">02 · BUILD YOUR SOLUTION</span><h3></h3><p>Write, execute and inspect your work. Challenge grading remains separate from successful execution.</p></div><span class="arena-workspace-indicator" aria-label="Local browser-based practice">● Practice workspace</span>';
   block.querySelector('h3').textContent=title;
   anchor.before(block);
 }
 function polishAssessment(){
   const feedback=$('#practiceFeedback');if(feedback){feedback.classList.add('arena-assessment-zone');feedback.setAttribute('aria-label','Challenge assessment and answer feedback');}
   const support=$('#practiceSupport');if(support)support.classList.add('arena-premium-answer-zone');
 }
 function prepare(){prepareReference();addWorkspaceHeading();polishAssessment();}
 let scheduled=false;
 function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;prepare();});}
 new MutationObserver(schedule).observe(root,{childList:true});
 document.addEventListener('dalp:arena-editor-selected',schedule);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
})();
