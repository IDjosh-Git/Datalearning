/* Chapter completion and mastery annotations. Navigation is owned solely by course-premium-sidebar.js. */
(()=>{'use strict';
const init=()=>{
 const chapters=[...document.querySelectorAll('.week[id]')];
 const links=[...document.querySelectorAll('.nav-link[href^="#"],.nav-links a[href^="#"]')];
 const progressInputs=[...document.querySelectorAll('.completeBox')];
 const resolve=hash=>{if(!hash||hash==='#')return null;try{return document.getElementById(decodeURIComponent(hash.slice(1)))}catch{return null}};
 const syncCompleted=()=>{const done=new Set(progressInputs.filter(c=>c.checked).map(c=>String(c.dataset.week)));chapters.forEach((section,i)=>{const match=section.id.match(/\d+/);const key=match?.[0]||String(i+1);const isDone=done.has(key);section.dataset.completed=String(isDone);links.filter(a=>resolve(a.hash)===section).forEach(a=>{a.classList.toggle('is-complete',isDone);a.setAttribute('aria-label',(a.textContent||'Chapter').trim()+(isDone?' (completed)':''))})})};
 progressInputs.forEach(box=>box.addEventListener('change',()=>requestAnimationFrame(syncCompleted)));
 document.getElementById('resetBtn')?.addEventListener('click',()=>setTimeout(syncCompleted,0));
 document.addEventListener('zah:progress-applied',syncCompleted);
 window.addEventListener('storage',e=>{if(e.key?.includes('RoadmapProgress'))setTimeout(syncCompleted,50)});
 // Preserve existing richly written lesson content; improve labeling and provide a universal 4-stage hierarchy.
 document.querySelectorAll('.course-mastery').forEach(module=>{
  const stages=module.querySelectorAll('.mastery-section');
  ['Core concept & real-world analogy','Syntax / architecture blueprint','Step-by-step walkthrough','Guided interactive challenge'].forEach((name,i)=>{
   const s=stages[i];if(!s)return;s.dataset.learningStage=String(i+1);const title=s.querySelector('h5');if(title)title.setAttribute('aria-label',name+' — '+title.textContent.trim());
  });
 });
 syncCompleted();
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
