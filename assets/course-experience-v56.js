/* Progressive enhancement: chapter navigation, completion state and compact lesson stages. */
(()=>{'use strict';
let holdUntil=0;
const init=()=>{
 const sections=[...document.querySelectorAll('section[id],.week[id]')];
 const links=[...document.querySelectorAll('.nav-link[href^="#"],.nav-links a[href^="#"]')];
 const chapters=[...document.querySelectorAll('.week[id]')];
 const progressInputs=[...document.querySelectorAll('.completeBox')];
 const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const resolve=(hash)=>{if(!hash||hash==='#')return null;try{return document.getElementById(decodeURIComponent(hash.slice(1)))}catch{return null}};
 let selected=null;
 function setActive(target){if(!target)return; selected=target;links.forEach(a=>{const active=resolve(a.hash)===target;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});}
 function jump(target,{historyMode='push'}={}){if(!target)return;setActive(target);if(historyMode==='push')history.pushState(null,'','#'+encodeURIComponent(target.id));target.scrollIntoView({block:'start',behavior:reduced()?'instant':'auto'});document.getElementById('sidebar')?.classList.remove('open');}
 links.forEach(a=>a.addEventListener('click',e=>{const target=resolve(a.hash);if(!target)return;e.preventDefault();jump(target)}));
 window.addEventListener('popstate',()=>{const target=resolve(location.hash);if(target)jump(target,{historyMode:'none'});else window.scrollTo({top:0,behavior:'instant'})});
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
 if('IntersectionObserver'in window && sections.length){const observer=new IntersectionObserver(entries=>{
  if(performance.now()<holdUntil)return;
  const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
  if(visible.length)setActive(visible[0].target);
 },{rootMargin:'-90px 0px -65% 0px',threshold:0});sections.forEach(s=>observer.observe(s));}
 let target=resolve(location.hash);if(target){requestAnimationFrame(()=>jump(target,{historyMode:'none'}));}
 syncCompleted();
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
