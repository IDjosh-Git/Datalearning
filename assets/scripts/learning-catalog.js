/* Current course catalog and progress guide.
   The retired all-courses sidebar was deleted: the site header selects courses,
   and course-premium-sidebar.js alone manages each course's lesson navigation. */
(()=>{'use strict';
 const data=window.DALP_COURSES_V97||{};
 const page=location.pathname.split('/').pop().toLowerCase()||'index.html';
 const course=location.pathname.match(/\/courses\/(introduction|excel|sql|powerbi|python|ai)(?:\.html)?\/?$/)?.[1];
 if(!(page==='index.html'||page==='catalog.html'||course))return;
 document.body.classList.add('dlp97-learning-page');
 const root=new URL(course?'../':'./',location.href);
 const uri=p=>new URL(p,root).href;
 const e=s=>String(s??'').replace(/[&<>"']/g,v=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[v]));
 const unitHash=(slug,n)=>'#'+data[slug].units[n-1].id;
 const signin=(dest)=>{const target=new URL('auth.html',root);const wanted=new URL(dest,location.href);target.searchParams.set('return',wanted.pathname+wanted.search+wanted.hash);return target.href;};
 const cardOrder=['introduction','excel','sql','powerbi','python','ai'];
 let user=null,cloudOK=false;
 const onCatalog=page==='catalog.html';
 // The canonical courses dropdown remains in the shared site header.
 // No second course-list rail, detached sidebar markup or old drawer controller.
 if(!onCatalog&&!document.querySelector('a.dlp97-skip')){
  const skip=document.createElement('a');
  skip.href=course?'#dlp97-course-content':'#courses';
  skip.className='dlp97-skip';
  skip.textContent='Skip to learning content';
  document.body.prepend(skip);
 }

 function state(slug){const c=data[slug];if(!user)return Object.fromEntries(c.units.map(u=>[u.number,false]));let saved={};try{saved=JSON.parse(localStorage.getItem(c.storageKey)||'{}')||{};}catch(_){ }return saved;}
 function doneCount(slug){return data[slug].units.reduce((n,u)=>n+(state(slug)[String(u.number)]===true?1:0),0);}
 function nextNumber(slug){return data[slug].units.find(u=>state(slug)[String(u.number)]!==true)?.number||0;}
 function paintCatalog(){if(!onCatalog)return;for(const slug of cardOrder){const el=document.querySelector(`.dlp97-course-progress[data-for="${slug}"]`);if(!el)continue;const done=doneCount(slug);el.textContent=user?(cloudOK?`${done} / ${data[slug].units.length} complete`:`${done} / ${data[slug].units.length} on this device`):'Preview without signing in';}}
 function initFilters(){if(!onCatalog)return;const search=document.getElementById('dlp97-search'),subject=document.getElementById('dlp97-category'),counter=document.getElementById('dlp97-result-count'),empty=document.getElementById('dlp97-empty'),cards=[...document.querySelectorAll('.dlp97-card')];
  function apply(){const q=search.value.toLowerCase().trim();let n=0;for(const card of cards){const yes=(subject.value==='all'||subject.value===card.dataset.category)&&(!q||card.dataset.search.includes(q));card.hidden=!yes;if(yes)n++;}counter.textContent=`${n} ${n===1?'course':'courses'} found`;empty.hidden=!!n;}
  function clearAll(){search.value='';subject.value='all';apply();search.focus();}
  search.addEventListener('input',apply);subject.addEventListener('change',apply);document.getElementById('dlp97-clear').addEventListener('click',clearAll);document.getElementById('dlp97-empty-clear').addEventListener('click',clearAll);apply();
 }
 // Clicking non-interactive card space opens the same course as the visible link.
 // Do not intercept links, controls, selected text, or modified clicks.
 function initCourseCardLinks(){
  if(!onCatalog)return;
  document.querySelectorAll('.dlp97-card').forEach(card=>{
   const primary=card.querySelector('a.dlp97-primary[href]');
   if(!primary)return;
   card.classList.add('dlp97-card-clickable');
   card.addEventListener('click',event=>{
    if(event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.altKey||event.shiftKey)return;
    if(event.target.closest('a,button,input,select,textarea,[role="button"],[contenteditable="true"]'))return;
    if(window.getSelection()?.toString().trim())return;
    window.location.assign(primary.href);
   });
  });
 }
 function getSelectedBoxes(){return [...document.querySelectorAll(course==='introduction'?'[data-intro-check]':'input.completeBox')];}
 function guide(){
  if(!course)return;
  const c=data[course],main=document.querySelector('main');if(!main)return;
  if(!main.id)main.id='dlp97-course-content';
  const hero=main.querySelector(course==='introduction'?'.intro-hero':course==='ai'?'.ai-hero':'.hero');
  const guide=document.createElement('section');guide.className='dlp97-course-guide dalp-quick-guide';guide.setAttribute('aria-labelledby','dlp97-course-guide-title');
  guide.innerHTML=`<div class="dalp-quick-guide-intro"><div><span class="dlp97-eyebrow">YOUR COURSE AT A GLANCE</span><h2 id="dlp97-course-guide-title">${e(c.name)}</h2><p>${e(c.description)}</p></div><span class="dalp-quick-guide-count">${c.units.length} ${e(c.unitLabel)}s · ${e(c.level)}</span></div>
  <div class="dalp-quick-guide-bottom"><div class="dalp-quick-guide-progress"><strong id="dlp97-progress-heading">Preview this course</strong><p id="dlp97-progress-caption" role="status" aria-live="polite">Sign in to save your progress.</p><div class="dlp97-meter" role="progressbar" aria-label="Course completion" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span></span></div></div>
  <nav class="dalp-quick-guide-links" aria-label="${e(c.name)} quick links"><a class="dalp-quick-link" id="dlp97-next" href="#${e(c.units[0].id)}">Start first ${e(c.unitLabel)} <span aria-hidden="true">↓</span></a></nav></div>
  <a class="dalp-quick-guide-signin" id="dlp97-course-signin" href="${signin(location.href)}">Sign in to save learning progress →</a>`;
  if(hero){hero.insertAdjacentElement('afterend',guide)}else{main.prepend(guide)}
  function progressPaint(){
   const amount=doneCount(course),total=c.units.length,percent=Math.round(amount/total*100),next=nextNumber(course);
   const caption=guide.querySelector('#dlp97-progress-caption'),heading=guide.querySelector('#dlp97-progress-heading'),meter=guide.querySelector('.dlp97-meter'),button=guide.querySelector('#dlp97-next'),signinButton=guide.querySelector('#dlp97-course-signin');
   meter.setAttribute('aria-valuenow',user?String(percent):'0');meter.querySelector('span').style.width=(user?percent:0)+'%';
   heading.textContent=user?(amount===total?'All course units complete':`${amount} of ${total} ${c.unitLabel}s completed`):'Preview this course';
   caption.textContent=user?(cloudOK?`${percent}% complete · progress synced`:`${percent}% complete on this device`):'Sign in to save your learning progress.';
   button.href='#'+c.units[(next||1)-1].id;
   button.textContent=user?(next?amount?`Continue ${c.unitLabel} ${next} ↓`:`Start ${c.unitLabel} 1 ↓`:'Review lessons ↓'):`Preview first ${c.unitLabel} ↓`;
   signinButton.hidden=!!user;
  }
  window.dlp97PaintCourse=progressPaint;
  document.addEventListener('zah:progress-applied',progressPaint);
  document.addEventListener('dalp:progress-updated',progressPaint);
  getSelectedBoxes().forEach(cb=>cb.addEventListener('change',()=>setTimeout(progressPaint,30)));
  progressPaint();
 }
 async function account(){
  // Login and progress sync are retained; old sidebar-only auth controls are gone.
  const updateControls=()=>{getSelectedBoxes().forEach(cb=>{cb.disabled=!user;cb.title=!user?'Sign in to save completion':'Mark this unit complete';});};
  updateControls();
  try{
   const client=window.ZAH_DB?.client;
   if(client){
    const {data:result,error}=await Promise.race([
     client.auth.getUser(),
     new Promise((_,reject)=>setTimeout(()=>reject(new Error('Account status timed out')),12000))
    ]);
    if(!error&&result?.user&&!result.user.is_anonymous){
     user=result.user;window.DALP_AUTH_USER=user;
     try{
      const owner=localStorage.getItem('dalpLastLearnerId');
      if(owner&&owner!==user.id)cardOrder.forEach(x=>localStorage.removeItem(data[x].storageKey));
      localStorage.setItem('dalpLastLearnerId',user.id);
     }catch(_){ }
     const gated=document.querySelector('.dlp97-hero-actions a+a');
     if(gated){gated.href=uri('account.html');gated.textContent='My learning dashboard';}
     updateControls();
     document.dispatchEvent(new CustomEvent('dalp:auth-ready',{detail:{role:'learner'}}));
     try{
      if(window.ZAHProgressCloud){
       const task=course?window.ZAHProgressCloud.syncCourse(course,{user}):window.ZAHProgressCloud.syncAll({user});
       const synced=await Promise.race([task,new Promise((_,reject)=>setTimeout(()=>reject(new Error('Progress sync timed out')),15000))]);
       cloudOK=!!synced?.ok;
      }
     }catch(err){console.warn('Course progress sync unavailable',err);}
     paintCatalog();window.dlp97PaintCourse?.();return;
    }
   }
  }catch(err){console.warn('Account status could not be loaded',err);}
  paintCatalog();window.dlp97PaintCourse?.();
 }
 const catalogAccountLink=document.querySelector('.dlp97-hero-actions a+a');if(onCatalog&&catalogAccountLink)catalogAccountLink.href=signin(uri('account.html'));
 initFilters();initCourseCardLinks();guide();void account();
})();
