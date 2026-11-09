/* Data Learning Path: one-week-at-a-time learning workspace. No new network requests. */
(()=>{
 'use strict';
 const course = (document.body.dataset.course || document.body.dataset.uiCourse || location.pathname.split('/').pop().replace('.html','')).toLowerCase();
 const names = {excel:'Excel',sql:'SQL',powerbi:'Power BI',ai:'AI Integration',python:'Python for Data Analytics',introduction:'Data Analysis Foundations'};
 if (!names[course]) return;
 const resources={
  excel:{main:['Download sales dataset','../downloads/retail_orders.csv'], files:[['Customers CSV','../downloads/retail_customers.csv'],['Sales targets CSV','../downloads/retail_targets.csv'],['Dataset guide','../downloads/START_HERE.md']], video:['Watch Excel beginner walkthrough','https://www.youtube.com/watch?v=LgXzzu68j7M'], note:'Open the CSV in Excel, convert it to a table, and follow this week’s example using the same records.'},
  sql:{main:['Download ready-to-use SQLite database','../downloads/retail_practice.sqlite'], files:[['SQL setup script','../downloads/retail_sqlite_setup.sql'],['Sales CSV','../downloads/retail_orders.csv'],['Dataset guide','../downloads/START_HERE.md']], video:['Watch SQL fundamentals','https://www.youtube.com/watch?v=HXV3zeQKqGY'], reading:['SQL course reading guide','https://www.freecodecamp.org/news/sql-and-databases-full-course'], note:'Open the SQLite database using an SQLite-compatible query editor. The supplied sample query files use SQLite syntax.'},
  powerbi:{main:['Download sales dataset','../downloads/retail_orders.csv'], files:[['Customers CSV','../downloads/retail_customers.csv'],['Targets CSV','../downloads/retail_targets.csv'],['Dataset guide','../downloads/START_HERE.md']], video:['Watch Power BI beginner walkthrough','https://www.youtube.com/watch?v=VaOhNqNtGGE'], note:'Import the three CSV files into Power BI Desktop and model them before creating measures and visuals.'},
  ai:{main:['Download synthetic sales dataset','../downloads/retail_orders.csv'], files:[['Customers CSV','../downloads/retail_customers.csv'],['Targets CSV','../downloads/retail_targets.csv'],['AI glossary','../downloads/AI_ANALYTICS_GLOSSARY.md']], video:['Watch AI foundations','https://www.youtube.com/watch?v=tchN4xa4pfg'], reading:['Explore AI for Everyone','https://www.deeplearning.ai/courses/ai-for-everyone/'], note:'Use only the synthetic practice files with approved AI tools. Validate calculations independently.'},
  python:{main:['Download Python practice CSV','../downloads/mastery_orders.csv'], files:[['Python beginner setup guide','../downloads/PYTHON_GETTING_STARTED.md'],['Shared training schema','../downloads/MASTERY_DATA_DICTIONARY.md'],['Dataset guide','../downloads/START_HERE.md']], video:['Watch Python fundamentals','https://www.youtube.com/watch?v=rfscVS0vtbw'], reading:['Official Python tutorial','https://docs.python.org/3/tutorial/'], note:'Set up Python and pandas, then open the fictional retail CSV. You can also practise in the separate Python Practice Arena using its supported local execution checks.'},
  introduction:{main:['Download kiosk case study','../downloads/kiosk_week.csv'],files:[['Retail sample orders','../downloads/retail_orders.csv'],['Dataset guide','../downloads/START_HERE.md']],video:['Watch a practical data-workbook introduction','https://www.youtube.com/watch?v=LgXzzu68j7M'],note:'Start with the five-day kiosk file. Read the short explanations before attempting the full case study.'}
 };
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const toLink=(label,url,css='')=>{
   const external=/^https:\/\//.test(url);
   const video=css==='cw-video' && /^(https:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url);
   const extra=video?'data-dalp-video="true" aria-haspopup="dialog"':external?'target="_blank" rel="noopener noreferrer"':'download';
   return `<a class="${css}" href="${esc(url)}" ${extra}>${esc(label)} <span aria-hidden="true">${video?'▶':external?'↗':'↓'}</span></a>`;
 };
 const safeTitle=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
 const getUserId=()=>window.DALP_AUTH_USER?.id||'';
 function finishStartup(anchor) {
   document.documentElement.classList.remove('dl-course-initializing');
   // A direct Week/Lesson link points to a node that becomes hidden/repositioned
   // when the single-week workspace mounts. Scroll to the visible workspace,
   // not the obsolete pre-hydration fragment position.
   if (!window.DALP_PENDING_LESSON_HASH) return;
   window.DALP_PENDING_LESSON_HASH = '';
   const target = anchor || document.querySelector('.cw-workspace, .cw-intro-nav');
   if (!target) return;
   requestAnimationFrame(() => {
     const top = target.getBoundingClientRect().top + window.scrollY - 84;
     window.scrollTo({top:Math.max(0,top),behavior:'instant'});
   });
 }
 function init(){
   if(course==='introduction') initIntro(); else initWeekly();
   // Fail open rather than leaving a blank course if a legacy page differs.
   if (document.documentElement.classList.contains('dl-course-initializing') &&
       !document.body.classList.contains('cw-workspace-ready') &&
       !document.body.classList.contains('cw-intro-ready')) finishStartup();
 }
 function initWeekly(){
  const host=document.querySelector(course==='ai'?'.course-wrap':'.app .content');
  if(!host)return;
  const weeks=Array.from(host.querySelectorAll(':scope > section[id^="week"]')).filter(x=>/^week\d+$/.test(x.id));
  if(weeks.length!==10)return;
  const db=resources[course]; const info=weeks.map((w,i)=>({n:i+1,id:w.id,el:w,title:safeTitle(w.querySelector('.week-title h3, .unit-head h2'))||`Week ${i+1}`,goal:safeTitle(w.querySelector('.week-title p, .unit-head .goal'))}));
  const savedKey=`dalp-week-workspace:${course}`;
  const oldNodes=Array.from(host.children).filter(x=>!weeks.includes(x));
  const bar=document.createElement('div');bar.className='cw-workspace';bar.id='course-week-workspace';
  bar.innerHTML=`<div class="cw-breadcrumb"><a href="../index.html">My learning</a><span aria-hidden="true">›</span><span>${esc(names[course])}</span><span aria-hidden="true">›</span><strong id="cw-crumb-current">Week 1</strong></div>
  <div class="cw-overview-head"><div><span class="cw-kicker">YOUR LEARNING WORKSPACE · 10 WEEKS</span><h1 id="cw-focus-title">Week 1</h1><p id="cw-focus-goal">Learn at your own pace.</p></div><div class="cw-overview-actions"><button type="button" class="cw-text-action" id="cw-guide-toggle" aria-expanded="false">Course guide & final project</button><a class="cw-text-action cw-mastery-link" href="#course-mastery-checkpoint">Mastery checkpoint ↓</a><a class="cw-help" href="../tutor.html?topic=${course}">✦ Ask the tutor</a></div></div>
  <div class="dl-workspace-shortcuts"><a href="${course==='python'?'../downloads/PYTHON_GETTING_STARTED.md':'../studio.html?course='+course}" ${course==='python'?'download':''}>${course==='python'?'Python setup guide':'Open Practice Studio'} <span aria-hidden="true">↗</span></a><a href="../tutor.html?topic=${course}">Ask the tutor <span aria-hidden="true">↗</span></a></div>
  <div class="cw-mobile-week-head" aria-label="Current course week"><div class="cw-mobile-week-copy"><span class="cw-mobile-step" id="cw-mobile-week-counter">WEEK 1 OF 10</span><strong id="cw-mobile-week-title">Start learning</strong><div class="cw-mobile-progress" role="progressbar" aria-label="Current lesson" aria-valuemin="1" aria-valuemax="10" aria-valuenow="1"><span id="cw-mobile-progress-fill"></span></div></div></div>
  <div class="cw-resources"><div class="cw-resource-primary"><span class="cw-resource-icon" aria-hidden="true">▤</span><div><b>Practice dataset</b><small>Ready for this week's exercises · local download</small></div>${toLink(db.main[0],db.main[1],'cw-download')}</div><details class="cw-resource-more"><summary>More datasets & resources <span aria-hidden="true">⌄</span></summary><div>${db.files.map(d=>toLink(d[0],d[1],'cw-resource-link')).join('')}${db.reading?toLink(db.reading[0],db.reading[1],'cw-resource-link'):''}${toLink('Worked solutions','../downloads/WORKED_SOLUTIONS.md','cw-resource-link')}</div></details><div class="cw-resource-side">${toLink(db.video[0],db.video[1],'cw-video')}<small>Watch in DataLearning · video opens here</small></div></div>
  <details class="dl-resource-how"><summary>How to use the practice files <span class="dl-disclosure-indicator" aria-hidden="true"></span></summary><p>${esc(db.note)}</p></details>
  <details class="dl-lessons-disclosure"><summary>What you will learn <span class="dl-disclosure-indicator" aria-hidden="true"></span></summary><div id="cw-week-context" class="cw-week-context" aria-live="polite"></div></details>`;
  host.prepend(bar);
  const foot=document.createElement('div');foot.className='cw-bottom';foot.innerHTML=`<div class="cw-bottom-inner"><div><strong id="cw-bottom-label">Week 1</strong><small>One step at a time. You can revisit any week.</small></div><div class="cw-bottom-buttons"><button type="button" data-cw-move="-1" class="cw-arrow">← Previous</button><button type="button" id="cw-complete-btn" class="cw-finish">Mark week complete ✓</button><button type="button" data-cw-move="1" class="cw-arrow cw-next">Next week →</button></div></div>`;host.appendChild(foot);
  oldNodes.forEach(n=>{if(!n.classList.contains('course-mastery-wrap'))n.classList.add('cw-extra')});
  weeks.forEach((w,i)=>{
    w.classList.add('cw-module');w.setAttribute('aria-label',`Week ${i+1}: ${info[i].title}`);
    const learning=w.querySelector(':scope > .week-body, :scope > .unit-grid');
    const lab=w.querySelector(':scope > .guided-lab, :scope > .tool-deep-dive');
    const assignment=w.querySelector(':scope > .job-ready-extension, :scope > .expanded-lessons');
    const quiz=w.querySelector('.quiz');
    const practice=w.querySelector('.mini.practice');
    const tabs=document.createElement('div');tabs.className='cw-module-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label',`Week ${i+1} learning steps`);
    const panels=document.createElement('div');panels.className='cw-module-panels';
    const items=[{key:'learn',name:'1 · Learn',nodes:course==='ai'?[learning,assignment]:[learning]},{key:'practise',name:'2 · Practise',nodes:course==='ai'?[lab]:[practice,lab,assignment]},{key:'quiz',name:'3 · Check knowledge',nodes:[quiz]}];
    items.forEach(item=>{
      const panel=document.createElement('div');panel.className='cw-tab-panel';panel.id=`cw-${course}-${i+1}-${item.key}`;panel.setAttribute('role','tabpanel');panel.dataset.cwPanel=item.key;
      const button=document.createElement('button');button.type='button';button.className='cw-tab';button.dataset.cwTab=item.key;button.setAttribute('role','tab');button.setAttribute('aria-controls',panel.id);button.setAttribute('aria-selected',item.key==='learn'?'true':'false');button.textContent=item.name;
      tabs.appendChild(button);
      item.nodes.forEach(n=>{if(n)panel.appendChild(n)});
      panels.appendChild(panel);
    });
    // If a quiz originally lived inside week-body, it was moved to the quiz panel above.
    w.append(tabs,panels);
    // Every panel uses the original teaching content; no copies or detached listeners.
    activateTab(w,'learn');
  });
  const buttons=[]; // Week selection is controlled by the course sidebar only.
  let active=1,guide=false,starting=true;
  const store=()=>{try{const id=getUserId();if(id)localStorage.setItem(`${savedKey}:${id}`,String(active))}catch{}};
  const checked=n=>!!info[n-1].el.querySelector(`.completeBox[data-week="${n}"]`)?.checked;
  function syncIndicators(){buttons.forEach((b,i)=>{b.querySelector('.cw-check').textContent=checked(i+1)?'✓':'◌';b.classList.toggle('cw-done',checked(i+1));b.setAttribute('aria-label',`Week ${i+1}: ${info[i].title}${checked(i+1)?', completed':''}`)});const b=foot.querySelector('#cw-complete-btn');b.textContent=checked(active)?'Week complete ✓':'Mark week complete ✓';b.classList.toggle('cw-is-done',checked(active));}
  function openGuide(){guide=true;document.body.classList.add('cw-show-guide');weeks.forEach(x=>x.classList.remove('cw-current'));bar.querySelector('#cw-focus-title').textContent='Course guide & final project';bar.querySelector('#cw-focus-goal').textContent='Review the full learning route, resources, capstone requirements and certificate criteria.';bar.querySelector('#cw-guide-toggle').textContent='Return to my week';bar.querySelector('#cw-guide-toggle').setAttribute('aria-expanded','true');bar.querySelector('#cw-week-context').innerHTML='<p>The full course overview and final assessment details are below. Use the lesson sidebar to return to your lessons.</p>';foot.hidden=true;window.scrollTo({top:0,behavior:'instant'});}
  function openWeek(n, opts={}){
    const v=Math.max(1,Math.min(info.length,Number(n)||1)); if(!opts.keepSearch){const searchBox=document.getElementById('searchInput');if(searchBox?.value){searchBox.value='';searchBox.dispatchEvent(new Event('input',{bubbles:true}));}} active=v;guide=false; document.body.classList.remove('cw-show-guide');
    weeks.forEach((x,i)=>x.classList.toggle('cw-current',i+1===v));
    buttons.forEach((b,i)=>{const on=i+1===v;b.classList.toggle('cw-selected',on);b.setAttribute('aria-pressed',String(on))});
    
    const mobileLabel=bar.querySelector('#cw-mobile-week-title');
    if(mobileLabel){
      bar.querySelector('#cw-mobile-week-counter').textContent=`WEEK ${v} OF ${info.length}`;
      mobileLabel.textContent=info[v-1].title;
      const progress=bar.querySelector('.cw-mobile-progress');
      progress.setAttribute('aria-valuenow',String(v));
      bar.querySelector('#cw-mobile-progress-fill').style.width=`${v/info.length*100}%`;
    }
    bar.classList.remove('cw-week-nav-open');

    bar.querySelector('#cw-crumb-current').textContent=`Week ${v}`;
    bar.querySelector('#cw-focus-title').textContent=`Week ${String(v).padStart(2,'0')} · ${info[v-1].title}`;
    bar.querySelector('#cw-focus-goal').textContent=info[v-1].goal||'Read the lesson, complete practical exercises and check your learning.';
    bar.querySelector('#cw-guide-toggle').textContent='Course guide & final project';bar.querySelector('#cw-guide-toggle').setAttribute('aria-expanded','false');
    const legacyLessons=Array.from(info[v-1].el.querySelectorAll('.lesson h4, .expanded-lessons > h3')).map(safeTitle).filter(x=>!/^Detailed teaching sessions|^Week \d/.test(x)).slice(0,5);const lessons=legacyLessons.length?legacyLessons:Array.from(info[v-1].el.querySelectorAll('.v34-action-steps > li')).slice(0,3).map(safeTitle);
    bar.querySelector('#cw-week-context').innerHTML=`<div><span class="cw-what">WHAT YOU'LL LEARN THIS WEEK</span><ul>${(lessons.length?lessons:[info[v-1].goal||info[v-1].title]).map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div><p><strong>Your learning route:</strong> Read the lesson → practise on the provided dataset → take the knowledge check → mark complete.</p>`;
    foot.hidden=false;foot.querySelector('#cw-bottom-label').textContent=`Week ${v} of 10 · ${info[v-1].title}`;
    document.querySelectorAll('[data-cw-move]').forEach(b=>b.disabled=(v===1&&b.dataset.cwMove==='-1')||(v===10&&b.dataset.cwMove==='1'));
    document.querySelectorAll(`.sidebar .nav-link[href^="#week"]`).forEach(l=>{const selected=l.getAttribute('href')===`#week${v}`;l.classList.toggle('cw-sidebar-active',selected);if(selected)l.setAttribute('aria-current','step');else l.removeAttribute('aria-current')});
    syncIndicators();store();
    const url=new URL(location.href);url.hash=`week${v}`;url.searchParams.delete('week');if(opts.fromHistory!==true)history.replaceState(null,'',url.pathname+url.search+url.hash);
    if(!starting&&!opts.silent){window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
    // The left lesson rail is now the single source of navigation; no duplicate scrolling strip.
    starting=false;
  }
  bar.addEventListener('click',e=>{const wk=e.target.closest('[data-cw-week]');if(wk){openWeek(wk.dataset.cwWeek);return;}if(e.target.closest('#cw-guide-toggle')){if(guide)openWeek(active);else openGuide();}});
  document.addEventListener('click',e=>{
    const move=e.target.closest('[data-cw-move]');if(move&&document.body.classList.contains('cw-workspace-ready')){openWeek(active+Number(move.dataset.cwMove));return;}
    const link=e.target.closest('a[href^="#week"]');if(link&&/^#week\d+$/.test(link.getAttribute('href'))){e.preventDefault();openWeek(link.getAttribute('href').slice(5));document.querySelector('.sidebar')?.classList.remove('open');return;}
    const overview=e.target.closest('a[href="#overview"]');if(overview){e.preventDefault();openGuide();}
  });
  foot.querySelector('#cw-complete-btn').addEventListener('click',()=>{
    const box=info[active-1].el.querySelector(`.completeBox[data-week="${active}"]`);if(!box)return;
    if(!box.checked){box.checked=true;box.dispatchEvent(new Event('change',{bubbles:true}));syncIndicators()}
    else{const btn=foot.querySelector('#cw-complete-btn');btn.textContent='Already marked complete ✓'}
  });
  document.addEventListener('change',e=>{if(e.target.matches('.completeBox'))syncIndicators()});document.addEventListener('zah:progress-applied',()=>setTimeout(syncIndicators,0));
  document.addEventListener('click',e=>{const tab=e.target.closest('[data-cw-tab]');if(tab){const week=tab.closest('.cw-module');if(week)activateTab(week,tab.dataset.cwTab);}});
  document.addEventListener('keydown',e=>{const tab=e.target.closest?.('[data-cw-tab]');if(!tab)return;const tabs=Array.from(tab.closest('.cw-module-tabs').querySelectorAll('[data-cw-tab]'));const at=tabs.indexOf(tab);let next=-1;if(e.key==='ArrowRight')next=(at+1)%tabs.length;else if(e.key==='ArrowLeft')next=(at-1+tabs.length)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;if(next>=0){e.preventDefault();tabs[next].focus();activateTab(tab.closest('.cw-module'),tabs[next].dataset.cwTab);}});
  const search=document.getElementById('searchInput');if(search)search.addEventListener('input',()=>{const text=search.value.trim().toLowerCase();if(!text)return;const first=info.find(w=>w.el.textContent.toLowerCase().includes(text)||w.title.toLowerCase().includes(text));if(first&&first.n!==active)openWeek(first.n,{silent:true,keepSearch:true});});
  window.addEventListener('hashchange',()=>{const found=location.hash.match(/^#week(10|[1-9])$/);if(found)openWeek(Number(found[1]),{fromHistory:true})});
  document.body.classList.add('cw-workspace-ready');
  const fromHash=(window.DALP_PENDING_LESSON_HASH || location.hash).match(/^#week(10|[1-9])$/);const fromQuery=new URLSearchParams(location.search).get('week');let start=fromHash?Number(fromHash[1]):(/^\d+$/.test(fromQuery||'')?Number(fromQuery):0);
  if(!start){try{const id=getUserId();start=Number(id&&localStorage.getItem(`${savedKey}:${id}`))||0}catch{}}
  if(!start){const first=info.find(x=>!checked(x.n));start=first?first.n:1}
  openWeek(start,{silent:true});
  finishStartup(bar);
  window.addEventListener('dalp:auth-ready',()=>{ // Persist current week only under the verified account ID.
    store();syncIndicators();
  });
 }
 function activateTab(week,key){
  week.querySelectorAll(':scope > .cw-module-tabs [data-cw-tab]').forEach(b=>{const on=b.dataset.cwTab===key;b.classList.toggle('cw-tab-active',on);b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1});
  week.querySelectorAll(':scope > .cw-module-panels [data-cw-panel]').forEach(p=>{p.hidden=p.dataset.cwPanel!==key;});
 }
 function initIntro(){
   const wrap=document.querySelector('.intro-lessons');if(!wrap)return;
   const lessons=Array.from(wrap.querySelectorAll(':scope > .intro-lesson'));
   if(lessons.length<8)return;
   const nav=document.createElement('div');nav.className='cw-intro-nav';
   nav.innerHTML=`<div class="cw-breadcrumb"><a href="../index.html">My learning</a><span aria-hidden="true">›</span>Introduction to data analysis</div><div class="cw-intro-head"><span class="cw-kicker">THE FOUNDATION COURSE · ${lessons.length} LEARNING STEPS</span><h2 id="cw-intro-title">Your next lesson</h2><p>Read one short lesson at a time. Use Next to continue; you will never need to scroll back through earlier lessons.</p></div><div class="dl-workspace-shortcuts"><a href="../studio.html?course=introduction">Open Practice Studio <span aria-hidden="true">↗</span></a></div><div class="cw-resources cw-intro-resources"><div class="cw-resource-primary"><span class="cw-resource-icon">▤</span><div><b>Download the five-day practice dataset</b><small>Use the same sample for the kiosk case study</small></div>${toLink(resources.introduction.main[0],resources.introduction.main[1],'cw-download')}</div><div class="cw-resource-side">${toLink(resources.introduction.video[0],resources.introduction.video[1],'cw-video')}<small>Watch in DataLearning · video opens here</small></div></div>`;
   const main=wrap.closest('main');if(main)main.prepend(nav);else wrap.prepend(nav);
   const guide=document.createElement('button');guide.type='button';guide.className='cw-text-action cw-intro-guide';guide.textContent='View course introduction & progress';guide.setAttribute('aria-expanded','false');nav.querySelector('.cw-intro-head').appendChild(guide);guide.addEventListener('click',()=>{const show=document.body.classList.toggle('cw-intro-show-guide');guide.textContent=show?'Hide course introduction':'View course introduction & progress';guide.setAttribute('aria-expanded',String(show))});const masteryLink=document.createElement('a');masteryLink.className='cw-text-action cw-mastery-link';masteryLink.href='#course-mastery-checkpoint';masteryLink.textContent='Mastery checkpoint ↓';nav.querySelector('.cw-intro-head').appendChild(masteryLink);
   const foot=document.createElement('div');foot.className='cw-bottom cw-intro-bottom';foot.innerHTML='<div class="cw-bottom-inner"><strong id="cw-intro-count">Lesson 1</strong><div class="cw-bottom-buttons"><button type="button" data-ci-move="-1" class="cw-arrow">← Previous</button><button type="button" data-ci-move="1" class="cw-arrow cw-next">Next lesson →</button></div></div>';wrap.append(foot);
   let active=0,starting=true;
   const ids=lessons.map(x=>x.id);
   const introChips=[]; // Intro-side links are the only step selector.
   function open(i,silent=false){active=Math.max(0,Math.min(lessons.length-1,Number(i)||0));lessons.forEach((l,k)=>l.classList.toggle('cw-intro-current',k===active));const label=safeTitle(lessons[active].querySelector('h2,h3'));nav.querySelector('#cw-intro-title').textContent=`${active===lessons.length-1?'Knowledge check':`Lesson ${active+1}`} · ${label}`;introChips.forEach((c,k)=>{const on=k===active;c.classList.toggle('cw-selected',on);c.setAttribute('aria-pressed',String(on));if(on)c.setAttribute('aria-current','step');else c.removeAttribute('aria-current')});foot.querySelector('#cw-intro-count').textContent=`Step ${active+1} of ${lessons.length}`;document.querySelectorAll('[data-ci-move]').forEach(b=>b.disabled=(active===0&&b.dataset.ciMove==='-1')||(active===lessons.length-1&&b.dataset.ciMove==='1'));
   document.querySelectorAll('.intro-side a[href^="#"]').forEach(a=>{const yes=a.getAttribute('href')==='#'+ids[active];a.classList.toggle('cw-sidebar-active',yes);if(yes)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current')});
   const url=new URL(location.href);url.hash=ids[active];history.replaceState(null,'',url.pathname+url.search+url.hash);if(!silent&&!starting)window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});starting=false;}
   document.addEventListener('click',e=>{const b=e.target.closest('[data-ci-move]');if(b){open(active+Number(b.dataset.ciMove));return;}const link=e.target.closest('a[href^="#"]');if(link&&ids.includes(link.getAttribute('href').slice(1))){e.preventDefault();open(ids.indexOf(link.getAttribute('href').slice(1)));}});
   window.addEventListener('hashchange',()=>{const i=ids.indexOf(decodeURIComponent(location.hash.slice(1)));if(i!==-1)open(i,true)});
   document.body.classList.add('cw-intro-ready');const initial=ids.indexOf(decodeURIComponent((window.DALP_PENDING_LESSON_HASH || location.hash).slice(1)));open(initial===-1?0:initial,true);finishStartup(nav);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
