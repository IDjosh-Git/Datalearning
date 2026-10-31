/* v97: Public browsing and shared learning navigation. Existing progress services remain authoritative. */
(()=>{'use strict';
 const data=window.DALP_COURSES_V97||{};
 const page=location.pathname.split('/').pop().toLowerCase()||'index.html';
 const course=location.pathname.match(/\/courses\/(introduction|excel|sql|powerbi|python|ai)\.html$/)?.[1];
 if(!(page==='index.html'||page==='catalog.html'||course))return;
 document.body.classList.add('dlp97-learning-page');
 const root=new URL(course?'../':'./',location.href);
 const uri=p=>new URL(p,root).href;
 const e=s=>String(s??'').replace(/[&<>"']/g,v=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[v]));
 const unitHash=(slug,n)=>'#'+data[slug].units[n-1].id;
 const signin=(dest)=>{const target=new URL('auth.html',root);const wanted=new URL(dest,location.href);target.searchParams.set('return',wanted.pathname+wanted.search+wanted.hash);return target.href;};
 const cardOrder=['introduction','excel','sql','powerbi','python','ai'];
 const navLinks=[['Dashboard','index.html','home'],['All courses','catalog.html','courses'],['My learning · sign-in required','account.html','learning'],['Reference library · sign-in required','reference.html','resources']];
 let user=null,cloudOK=false,signingOut=false;
 const onCatalog=page==='catalog.html';
 const active=(id)=>id==='courses'?onCatalog:id==='home'&&page==='index.html';
 const markup=`<div class="dlp97-mobile-bar"><button type="button" class="dlp97-menu-toggle" aria-expanded="false" aria-controls="dlp97-side" aria-label="Open learning menu">☰ <span>Learning menu</span></button><a href="${uri('catalog.html')}">All courses</a></div><div class="dlp97-backdrop" hidden></div>
 <aside id="dlp97-side" class="dlp97-side" aria-label="Learning navigation" tabindex="-1">
 <div class="dlp97-side-head"><a class="dlp97-brand" href="${uri('catalog.html')}"><img alt="" src="${uri('assets/icons/da-logo.svg')}" width="39" height="39"><span><strong>Data Analysis</strong><small>Learning Path</small></span></a><button type="button" class="dlp97-close" aria-label="Close learning menu">×</button></div>
 <nav aria-label="Main learning sections" class="dlp97-primary-nav"><span class="dlp97-nav-label">EXPLORE</span>${navLinks.map(([label,target,id])=>`<a href="${uri(target)}" ${active(id)?'aria-current="page"':''} class="${active(id)?'is-active':''}">${e(label)}${id==='learning'||id==='resources'?'<span class="dlp97-locked" aria-hidden="true">↗</span>':''}</a>`).join('')}</nav>
 <nav aria-label="Courses by subject" class="dlp97-subject-nav"><span class="dlp97-nav-label">COURSES BY SUBJECT</span>${cardOrder.map(slug=>`<a href="${uri('courses/'+slug+'.html')}" ${course===slug?'aria-current="page"':''} class="${course===slug?'is-active':''}"><span class="dlp97-subject-icon"><img alt="" width="21" height="21" src="${uri('assets/icons/icon-'+data[slug].icon+'.svg')}"></span><span><small>${e(data[slug].category)}</small><strong>${e(data[slug].name)}</strong></span></a>`).join('')}</nav>
 <div class="dlp97-side-bottom"><p id="dlp97-auth-label" aria-live="polite">Checking account status…</p><a id="dlp97-auth-link" href="${signin(location.href)}">Sign in to save progress</a><button type="button" id="dlp97-signout" hidden>Sign out</button></div></aside>`;
 const holder=document.createElement('div');holder.className='dlp97-navigation';holder.innerHTML=markup;
 document.body.prepend(holder);
 const toggle=holder.querySelector('.dlp97-menu-toggle'),close=holder.querySelector('.dlp97-close'),backdrop=holder.querySelector('.dlp97-backdrop'),side=holder.querySelector('.dlp97-side');
 const isMobile=()=>matchMedia('(max-width:1100px)').matches;
 let previousFocus=null;
 function setOpen(open){const show=open&&isMobile();document.body.classList.toggle('dlp97-nav-open',show);toggle.setAttribute('aria-expanded',String(show));toggle.setAttribute('aria-label',show?'Close learning menu':'Open learning menu');backdrop.hidden=!show;side.setAttribute('role',show?'dialog':'complementary');if(show)side.setAttribute('aria-modal','true');else side.removeAttribute('aria-modal');if(show){previousFocus=document.activeElement;close.focus();}else if(open===false&&isMobile()&&previousFocus){previousFocus.focus();previousFocus=null;}}
 toggle.addEventListener('click',()=>setOpen(!document.body.classList.contains('dlp97-nav-open')));
 close.addEventListener('click',()=>setOpen(false));backdrop.addEventListener('click',()=>setOpen(false));
 side.addEventListener('click',ev=>{if(ev.target.closest('a')&&isMobile())setOpen(false);});
 document.addEventListener('keydown',ev=>{if(!document.body.classList.contains('dlp97-nav-open'))return;if(ev.key==='Escape'){ev.preventDefault();setOpen(false);return;}if(ev.key!=='Tab')return;const focusables=[...side.querySelectorAll('a[href],button:not([hidden]):not([disabled])')].filter(x=>x.getClientRects().length);if(!focusables.length)return;const first=focusables[0],last=focusables.at(-1);if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last.focus();}else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first.focus();}});
 matchMedia('(max-width:1100px)').addEventListener('change',()=>setOpen(false));
 if(!document.querySelector('a.dlp97-skip')){const skip=document.createElement('a');skip.href=onCatalog?'#main-content':course?'#dlp97-course-content':'#courses';skip.className='dlp97-skip';skip.textContent='Skip to learning content';document.body.prepend(skip);}

 function state(slug){const c=data[slug];if(!user)return Object.fromEntries(c.units.map(u=>[u.number,false]));let saved={};try{saved=JSON.parse(localStorage.getItem(c.storageKey)||'{}')||{};}catch(_){ }return saved;}
 function doneCount(slug){return data[slug].units.reduce((n,u)=>n+(state(slug)[String(u.number)]===true?1:0),0);}
 function nextNumber(slug){return data[slug].units.find(u=>state(slug)[String(u.number)]!==true)?.number||0;}
 function paintCatalog(){if(!onCatalog)return;for(const slug of cardOrder){const el=document.querySelector(`.dlp97-course-progress[data-for="${slug}"]`);if(!el)continue;const done=doneCount(slug);el.textContent=user?(cloudOK?`${done} / ${data[slug].units.length} complete`:`${done} / ${data[slug].units.length} on this device`):'Preview without signing in';}}
 function initFilters(){if(!onCatalog)return;const search=document.getElementById('dlp97-search'),subject=document.getElementById('dlp97-category'),counter=document.getElementById('dlp97-result-count'),empty=document.getElementById('dlp97-empty'),cards=[...document.querySelectorAll('.dlp97-card')];
  function apply(){const q=search.value.toLowerCase().trim();let n=0;for(const card of cards){const yes=(subject.value==='all'||subject.value===card.dataset.category)&&(!q||card.dataset.search.includes(q));card.hidden=!yes;if(yes)n++;}counter.textContent=`${n} ${n===1?'course':'courses'} found`;empty.hidden=!!n;}
  function clearAll(){search.value='';subject.value='all';apply();search.focus();}
  search.addEventListener('input',apply);subject.addEventListener('change',apply);document.getElementById('dlp97-clear').addEventListener('click',clearAll);document.getElementById('dlp97-empty-clear').addEventListener('click',clearAll);apply();
 }
 function getSelectedBoxes(){return [...document.querySelectorAll(course==='introduction'?'[data-intro-check]':'input.completeBox')];}
 function protectExamples(){if(!course)return;document.querySelectorAll('main table').forEach(t=>{if(t.closest('.dlp97-table-scroll'))return;const wrap=document.createElement('div');wrap.className='dlp97-table-scroll';wrap.setAttribute('tabindex','0');wrap.setAttribute('role','region');wrap.setAttribute('aria-label','Scrollable course data table');t.parentNode.insertBefore(wrap,t);wrap.append(t);});}
 function guide(){if(!course)return;const c=data[course],main=document.querySelector('main');if(!main)return;
  if(!main.id)main.id='dlp97-course-content';
  const section=main.querySelector(course==='introduction'?'.intro-hero':course==='ai'?'.ai-hero':'.hero');
  const after=section||main.querySelector('.content')||main;
  const guide=document.createElement('section');guide.className='dlp97-course-guide';guide.setAttribute('aria-labelledby','dlp97-course-guide-title');
  guide.innerHTML=`<div class="dlp97-guide-intro"><div><span class="dlp97-eyebrow">COURSE ROADMAP</span><h2 id="dlp97-course-guide-title">${e(c.name)}</h2><p>${e(c.description)}</p></div><div class="dlp97-course-facts"><span>${e(c.level)}</span><span>${e(c.duration)}</span><span>${c.units.length} ${e(c.unitLabel)}s</span><span>Before you start: ${e(c.prerequisites)}</span></div></div>
  <div class="dlp97-guide-metrics"><div><strong id="dlp97-progress-heading">Preview the course</strong><p id="dlp97-progress-caption" role="status" aria-live="polite">Sign in to see and save your progress.</p><div class="dlp97-meter" role="progressbar" aria-label="${e(c.name)} completed units" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span></span></div></div><div><h3>Key skills</h3><ul>${c.topics.map(x=>`<li>${e(x)}</li>`).join('')}</ul></div></div>
  <div class="dlp97-guide-actions"><a class="dlp97-primary" id="dlp97-next" href="#${c.units[0].id}">Preview first ${e(c.unitLabel)} →</a><a class="dlp97-secondary" id="dlp97-course-signin" href="${signin(location.href)}">Sign in to save learning progress ↗</a></div>
  <h3 class="dlp97-outline-title">Modules and learning milestones</h3><p class="dlp97-outline-intro">Follow the existing ${c.unitLabel}s in order or reopen an earlier one. Completion is recorded using the course’s existing checkboxes; quizzes and practice activities remain in the original lessons.</p>
  <div class="dlp97-outline">${c.units.map((u,i)=>`${i===0||i===3||i===7?`<h4> ${i===0?'Getting started':i===3?'Building your skills':'Putting skills together'} · ${e(c.unitLabel)}s ${i+1}–${i===0?3:i===3?7:c.units.length}</h4>`:''}<a class="dlp97-outline-row" href="#${e(u.id)}" data-unit="${u.number}"><span class="dlp97-unit-number">${String(u.number).padStart(2,'0')}</span><span class="dlp97-unit-main"><strong>${e(u.title)}</strong><small>${e(u.description||'Explore this module in the course below.')}</small>${u.activities?.length?`<span class="dlp97-activity-tags">${u.activities.map(t=>`<em>${e(t)}</em>`).join('')}</span>`:''}</span><span class="dlp97-unit-side"><span class="dlp97-unit-time">${e(u.time||'Self-paced')}</span><span class="dlp97-unit-status">Not started</span></span></a>`).join('')}</div>${course==='introduction'?'<p class="dlp97-intro-check"><a href="#knowledge-check">Take the existing 12-question knowledge check →</a></p>':''}
  <p class="dlp97-guide-note" id="dlp97-guide-note">You can read the outline and lessons before registration. Sign in to mark units complete and keep progress across devices.</p>`;
  if(after===main){main.prepend(guide);}else{after.insertAdjacentElement('afterend',guide);}
  // The existing checkbox and cloud-sync implementations remain the only sources of completion.
  function progressPaint(){const amount=doneCount(course),total=c.units.length,percent=Math.round(amount/total*100),next=nextNumber(course);
   const caption=guide.querySelector('#dlp97-progress-caption'),heading=guide.querySelector('#dlp97-progress-heading'),meter=guide.querySelector('.dlp97-meter'),button=guide.querySelector('#dlp97-next'),signinButton=guide.querySelector('#dlp97-course-signin');
   meter.setAttribute('aria-valuenow',user?String(percent):'0');meter.querySelector('span').style.width=(user?percent:0)+'%';
   heading.textContent=user?(amount===total?'Course units completed':amount?`${amount} of ${total} ${c.unitLabel}s completed`:`Ready to begin · 0 of ${total} complete`):'Preview the course';
   caption.textContent=user?(cloudOK?`${percent}% of course units marked complete. Saved progress synced.`:`${percent}% marked complete on this device. Check the sync indicator for cloud status.`):'Sign in to view and save your course progress.';
   button.href='#'+c.units[(next||1)-1].id;
   button.textContent=user?(next?amount?`Continue ${c.unitLabel} ${next} →`:`Start ${c.unitLabel} 1 →`:'Review completed lessons →'):`Preview first ${c.unitLabel} →`;
   signinButton.hidden=!!user;
   guide.querySelectorAll('.dlp97-outline-row').forEach(row=>{const n=Number(row.dataset.unit),completed=!!user&&state(course)[String(n)]===true,st=row.querySelector('.dlp97-unit-status');row.classList.toggle('is-completed',completed);row.classList.toggle('is-next',!!user&&!completed&&n===next);st.textContent=completed?'Completed':user&&n===next?'Next up · Not started':'Not started';});
   guide.querySelector('#dlp97-guide-note').textContent=user?'You can reopen completed lessons at any time. A module is complete only when you mark it complete in the original lesson.': 'Course material is open for preview. Sign in to mark a lesson complete and sync progress.';
  }
  window.dlp97PaintCourse=progressPaint;
  document.addEventListener('zah:progress-applied',progressPaint);
  document.addEventListener('dalp:progress-updated',progressPaint);
  getSelectedBoxes().forEach(cb=>cb.addEventListener('change',()=>setTimeout(progressPaint,30)));
  progressPaint();
 }
 async function account(){const note=holder.querySelector('#dlp97-auth-label'),link=holder.querySelector('#dlp97-auth-link'),logout=holder.querySelector('#dlp97-signout');
  // Restrict completion controls for visitors, not browsing or independent practice.
  const updateControls=()=>{getSelectedBoxes().forEach(cb=>{cb.disabled=!user;cb.title=!user?'Sign in to save completion':'Mark this unit complete';});};
  updateControls();
  try{const client=window.ZAH_DB?.client;if(client){const {data:result,error}=await Promise.race([client.auth.getUser(),new Promise((_,reject)=>setTimeout(()=>reject(new Error('Account status timed out')),12000))]);if(!error&&result?.user&&!result.user.is_anonymous){user=result.user;window.DALP_AUTH_USER=user;try{const owner=localStorage.getItem('dalpLastLearnerId');if(owner&&owner!==user.id){cardOrder.forEach(x=>localStorage.removeItem(data[x].storageKey));}localStorage.setItem('dalpLastLearnerId',user.id);}catch(_){}
   note.textContent='Signed in · your progress can sync';link.hidden=true;logout.hidden=false;holder.querySelectorAll('.dlp97-primary-nav a').forEach(a=>a.textContent=a.textContent.replace(' · sign-in required',''));const gated=document.querySelector('.dlp97-hero-actions a+a');if(gated){gated.href=uri('account.html');gated.textContent='My learning dashboard';}updateControls();document.dispatchEvent(new CustomEvent('dalp:auth-ready',{detail:{role:'learner'}}));
   try{if(window.ZAHProgressCloud){const task=course?window.ZAHProgressCloud.syncCourse(course,{user}):window.ZAHProgressCloud.syncAll({user});const synced=await Promise.race([task,new Promise((_,reject)=>setTimeout(()=>reject(new Error('Progress sync timed out')),15000))]);cloudOK=course?!!synced.ok:!!synced.ok;if(!cloudOK){note.textContent='Signed in · progress sync temporarily unavailable';}}}
   catch(err){console.warn('Course progress sync unavailable',err);note.textContent='Signed in · progress sync temporarily unavailable';}
   paintCatalog();window.dlp97PaintCourse?.();return;
  }}
  }catch(err){console.warn('Account status could not be loaded',err);note.textContent='Account status unavailable · sign in to save progress';}
  note.textContent=note.textContent.startsWith('Account status unavailable')?note.textContent:'Browsing courses as a guest';link.hidden=false;logout.hidden=true;paintCatalog();window.dlp97PaintCourse?.();
 }
 holder.querySelector('#dlp97-signout').addEventListener('click',async()=>{if(signingOut)return;signingOut=true;const b=holder.querySelector('#dlp97-signout');b.disabled=true;b.textContent='Signing out…';try{await window.DALP_SERVER_SESSION?.clear?.();await window.ZAH_DB?.client?.auth.signOut();cardOrder.forEach(x=>localStorage.removeItem(data[x].storageKey));localStorage.removeItem('dalpLastLearnerId');user=null;location.replace(uri('catalog.html'));}catch(_){b.disabled=false;b.textContent='Sign out';signingOut=false;holder.querySelector('#dlp97-auth-label').textContent='Unable to sign out. Try again.';}});
 const catalogAccountLink=document.querySelector('.dlp97-hero-actions a+a');if(onCatalog&&catalogAccountLink)catalogAccountLink.href=signin(uri('account.html'));
 initFilters();protectExamples();guide();void account();
})();
