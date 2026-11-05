/* v85 progressive enhancement. No new executors, authentication, storage or remote calls. */
(()=>{'use strict';
 const root=document.getElementById('practiceDetail');if(!root)return;
 const $=(s,r=document)=>r.querySelector(s);
 const getTask=()=>{const id=root.querySelector('[data-challenge-id]')?.dataset.challengeId;const tasks=[...(window.DALP_PRACTICE||[]),...(window.DALP_PY_CHALLENGES||[])];return tasks.find(t=>t.id===id)||tasks.find(t=>t.title===root.querySelector('h2')?.textContent)};
 let oldId='',scheduled=false;
 function update(){const t=getTask();if(!t)return;
  const subject=t.kind;
  document.querySelectorAll('[data-arena-subject]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.arenaSubject===subject)));
  // The legacy IDE places grading feedback inside its hidden Console tab.
  // Keep assessment and optional support visible after the workspace instead.
  const shell=$('.ide-shell',root),assessment=$('#practiceFeedback',root),help=$('#practiceSupport',root);
  // The IDE shell may be nested inside another wrapper. Comparing its sibling
  // position to root-level feedback made this condition permanently true and
  // triggered the MutationObserver indefinitely, freezing the whole page.
  if(shell&&assessment&&help&&
     (assessment.parentElement!==root||help.parentElement!==root||
      assessment.nextElementSibling!==help)){root.append(assessment,help);}
  if(t.id===oldId)return;oldId=t.id;
  const bridge=$('.arena-course-bridge');bridge?.remove();
  const course={SQL:['SQL course','courses/sql.html'],Excel:['Excel course','courses/excel.html'],Python:['Python course','courses/python.html']}[subject];
  if(course){const aside=document.createElement('aside');aside.className='arena-course-bridge';aside.setAttribute('aria-label','Connect practice to your course');const p=document.createElement('p');p.textContent=`Practising ${t.topic.toLowerCase()}? Use the ${course[0]} to learn the concept, then apply it in your capstone.`;const a=document.createElement('a');a.href=course[1];a.textContent='Review course lessons ↗';aside.append(p,a);$('.arena-subject-launcher')?.after(aside);}
  // The SQL/Excel IDE inserts its own task panel. Keep our learning metadata
  // separate above the IDE, not nested in hidden mobile tabs.
  const brief=$('.arena-learning-brief',root);if(brief){brief.setAttribute('data-challenge-id',t.id)}
  const feedback=$('#practiceFeedback');if(feedback)feedback.setAttribute('aria-label','Challenge assessment feedback');
  const support=$('#practiceSupport');if(support)support.setAttribute('aria-label','Optional hints and worked answer');
 }
 // A DOM observer must never react to its own updates in an endless
 // microtask chain. Suspend observation during our mutations and schedule
 // at most once per animation frame so input and scrolling remain responsive.
 const observer=new MutationObserver(scheduleUpdate);
 function scheduleUpdate(){
  if(scheduled)return;
  scheduled=true;
  requestAnimationFrame(()=>{
   scheduled=false;observer.disconnect();
   try{update();}finally{observer.observe(root,{childList:true});}
  });
 }
 observer.observe(root,{childList:true});
 document.addEventListener('dalp:practice-ready',scheduleUpdate);
 document.addEventListener('dalp:arena-editor-selected',scheduleUpdate);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scheduleUpdate,{once:true});else scheduleUpdate();
})();
