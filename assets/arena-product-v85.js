/* v85 progressive enhancement. No new executors, authentication, storage or remote calls. */
(()=>{'use strict';
 const root=document.getElementById('practiceDetail');if(!root)return;
 const $=(s,r=document)=>r.querySelector(s);
 const getTask=()=>{const id=root.querySelector('[data-challenge-id]')?.dataset.challengeId;const tasks=[...(window.DALP_PRACTICE||[]),...(window.DALP_PY_CHALLENGES||[])];return tasks.find(t=>t.id===id)||tasks.find(t=>t.title===root.querySelector('h2')?.textContent)};
 let oldId='',scheduled=false;
 function update(){scheduled=false;const t=getTask();if(!t)return;
  const subject=t.kind;
  document.querySelectorAll('[data-arena-subject]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.arenaSubject===subject)));
  // The legacy IDE places grading feedback inside its hidden Console tab.
  // Keep assessment and optional support visible after the workspace instead.
  const shell=$('.ide-shell',root),assessment=$('#practiceFeedback',root),help=$('#practiceSupport',root);
  if(shell&&assessment&&help&&(assessment.previousElementSibling!==shell||help.previousElementSibling!==assessment))root.append(assessment,help);
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
 document.addEventListener('dalp:practice-ready',update);
 document.addEventListener('dalp:arena-editor-selected',()=>{if(!scheduled){scheduled=true;queueMicrotask(update)}});
 new MutationObserver(()=>{if(!scheduled){scheduled=true;queueMicrotask(update)}}).observe(root,{childList:true});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',update,{once:true});else update();
})();
