/* Data Analysis Learning Path · v84 learner experience improvements.
   Progressive enhancement only. No new API calls, data uploads or tracking. */
(()=>{'use strict';
 const root=document.documentElement;
 const path=location.pathname;
 const onHome=document.body.classList.contains('lp-home');
 const courses={
  introduction:{title:'Introduction to Data Analysis',href:'courses/introduction.html',units:8,local:'dalpIntroductionProgressV1',kind:'lessons',intro:'Start without prerequisites. Learn the analytical process through a fictional kiosk case study.'},
  excel:{title:'Excel for Data Analysis',href:'courses/excel.html',units:10,local:'excelRoadmapProgress',kind:'weeks',intro:'Clean business data, use formulas and PivotTables, then build an Excel dashboard.'},
  sql:{title:'SQL for Data Analysis',href:'courses/sql.html',units:10,local:'sqlRoadmapProgress',kind:'weeks',intro:'Query relational datasets, join tables and deliver checked business reporting queries.'},
  powerbi:{title:'Power BI & DAX',href:'courses/powerbi.html',units:10,local:'powerbiRoadmapProgress',kind:'weeks',intro:'Model data, write DAX measures and present a clear interactive report.'},
  python:{title:'Python for Data Analytics',href:'courses/python.html',units:10,local:'pythonRoadmapProgress',kind:'modules',intro:'Work with pandas, statistics, data quality and reproducible analysis.'},
  ai:{title:'AI Integration in Data Analysis',href:'courses/ai.html',units:10,local:'aiRoadmapProgress',kind:'weeks',intro:'Apply AI to analytical workflows while protecting sensitive data and verifying outputs.'}
 };
 const getProgress=(c)=>{try{const data=JSON.parse(localStorage.getItem(c.local)||'{}');return data&&typeof data==='object'?data:{};}catch{return {};}};
 const nextUnit=c=>{const p=getProgress(c);return Array.from({length:c.units},(_,i)=>i+1).find(i=>p[String(i)]!==true)||0;};
 const introHash=['lesson-1','lesson-2','lesson-3','lesson-4','lesson-5','lesson-6','case-study','lesson-8'];
 function nextHref(id){const c=courses[id],n=nextUnit(c);const anchor=n?(id==='introduction'?introHash[n-1]:'week'+n):'';return c.href+(anchor?'#'+anchor:'');}
 function pathfinder(){
  const form=document.getElementById('lp-pathfinder-form');if(!form)return;
  form.addEventListener('submit',event=>{
   event.preventDefault();
   const experience=form.elements.experience.value,goal=form.elements.goal.value,tool=form.elements.tool.value,time=form.elements.time.value;
   const byGoal={explore:'introduction',clean:'excel',query:'sql',dash:'powerbi',code:'python',ai:'ai'};
   const byTool={excel:'excel',sql:'sql',powerbi:'powerbi',python:'python',ai:'ai'};
   const desired=byTool[tool]||byGoal[goal]||'introduction';
   const course=experience==='new'?'introduction':desired;
   const selected=courses[course];
   const next=course==='introduction'&&desired!=='introduction'?` After Foundations, explore ${courses[desired].title}.`:'';
   const plan=time==='short'?'With up to 2 hours each week, complete one small lesson or exercise at a time.':time==='steady'?'With 2–5 hours each week, combine a lesson with a practice task.':'With more than 5 hours each week, work through lessons and revisit exercises independently.';
   document.getElementById('path-result-title').textContent=selected.title;
   document.getElementById('path-result-desc').textContent=selected.intro+next;
   document.getElementById('path-result-plan').textContent=plan+' This is a pacing suggestion, not a guaranteed completion date.';
   const link=document.getElementById('path-result-link');link.href=nextHref(course);link.textContent=nextUnit(selected)?`Start ${selected.kind.slice(0,-1)||'lesson'} ${nextUnit(selected)} →`:'Review the course →';
   const result=document.getElementById('path-result');result.hidden=false;result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'});
  });
 }
 function enhanceCards(){
  document.querySelectorAll('.lp-course[data-track]').forEach(card=>{
   const id=card.dataset.track==='intro'?'introduction':card.dataset.track;
   const c=courses[id];if(!c)return;
   const meter=card.querySelector('.lp-progress-line');const label=card.querySelector('.lp-progress-meta');
   if(meter){meter.setAttribute('role','progressbar');meter.setAttribute('aria-label',c.title+' completion');meter.setAttribute('aria-valuemin','0');meter.setAttribute('aria-valuemax','100');}
   const update=()=>{
    const data=getProgress(c),done=Array.from({length:c.units},(_,i)=>data[String(i+1)]===true).filter(Boolean).length;
    const percent=Math.round(done/c.units*100);
    meter?.setAttribute('aria-valuenow',String(percent));
    const cta=card.querySelector('.lp-course-cta');if(cta){const arrow=cta.querySelector('span');cta.href=nextHref(id);cta.firstChild.textContent=done?done===c.units?'Review completed course ':'Continue next '+(id==='introduction'?'lesson':'week')+' ':'Start '+(id==='introduction'?'lesson 1':'week 1')+' ';if(arrow)arrow.textContent='↗';}
    if(label)label.setAttribute('aria-label',`${done} of ${c.units} ${c.kind} completed`);
   };
   update();document.addEventListener('dalp:progress-updated',update);
  });
 }
 function guideNextLesson(){
  const m=path.match(/\/courses\/([a-z]+)\.html$/);if(!m)return;
  const id=m[1],c=courses[id];if(!c)return;
  const content=document.querySelector('main');if(!content)return;
  const banner=document.createElement('aside');banner.className='dalp-lesson-next';banner.setAttribute('aria-label','Your next learning action');
  const heading=document.createElement('div');heading.className='dalp-lesson-next-copy';const label=document.createElement('span');label.className='dalp-next-label';label.textContent='YOUR NEXT STEP';
  const title=document.createElement('strong'),meta=document.createElement('p');heading.append(label,title,meta);
  const actions=document.createElement('div');actions.className='dalp-next-actions';actions.setAttribute('role','group');actions.setAttribute('aria-label','Continue learning, practice and project actions. Scroll horizontally for more on small screens.');actions.tabIndex=0;const next=document.createElement('a');next.className='dalp-next-primary';const practice=document.createElement('a');practice.href=['excel','sql','python'].includes(id)?'../practice.html?tool='+({excel:'Excel',sql:'SQL',python:'Python'}[id]):'../studio.html?course='+id;practice.textContent=['excel','sql','python'].includes(id)?'Open Practice Arena ↗':'Open Practice Studio ↗';practice.className='dalp-next-secondary';
  const project=document.createElement('a');project.href='../capstone-guide.html';project.textContent='Project guidelines ↗';project.className='dalp-next-secondary';
  actions.append(next,practice,project);banner.append(heading,actions);
  function update(){const n=nextUnit(c),done=n===0?c.units:n-1;title.textContent=n?`${id==='introduction'?'Lesson':id==='python'?'Module':'Week'} ${n} is next`:'Your learning units are complete';meta.textContent=`${done} of ${c.units} ${c.kind} marked complete on this device. ${n?'Study the next unit, practise, then mark it complete when you understand it.':'Review your work, quizzes and project requirements before submitting.'}`;next.href='../'+nextHref(id);next.textContent=n?`Go to ${id==='introduction'?'lesson':id==='python'?'module':'week'} ${n} →`:'Review course →';}
  update();content.prepend(banner);
  document.addEventListener('dalp:progress-updated',update);
  content.addEventListener('change',()=>requestAnimationFrame(update));
  window.addEventListener('storage',e=>{if(e.key===c.local)update();});
 }
 function clarifyTools(){
  const note=(selector,text)=>{const host=document.querySelector(selector);if(!host)return;const p=document.createElement('p');p.className='dalp-context-note';p.textContent=text;host.append(p);};
  if(path.endsWith('/tutor.html'))note('.tutor-intro','For privacy, use fictional or anonymised examples. Check answers against your data and course materials; the tutor can make mistakes.');
  if(path.endsWith('/capstone.html'))note('.cap-hero .wrap','Only share project files you are authorised to submit. Remove personal data before upload; review is performed by an authorised instructor, not automatically by AI.');
  if(path.endsWith('/auth.html'))note('.auth-story','You can browse the introduction and course outlines before registering. Account-based progress depends on a successful sign-in and sync.');
 }
 function activeNav(){
  document.querySelectorAll('.nav-shell nav a').forEach(a=>{
   let target;try{target=new URL(a.getAttribute('href')||'',location.href);}catch{return;}
   if(target.pathname===location.pathname&&(!target.hash||!location.hash)&&target.pathname!==new URL('index.html',location.href).pathname){a.setAttribute('aria-current','page');}
  });
 }
 function practiceArenaConnections(){
  const recommended={
   excel:[['week3','excel021','Total sales'],['week4','excel027','Total East sales'],['week6','excel028','Count West orders']],
   sql:[['week1','sql001','Choose columns'],['week2','sql002','Filter by country'],['week3','sql008','Revenue by region']],
   python:[['week2','py_sales_total','Calculate total sales'],['week3','py_group','Revenue by region'],['week4','py_filter','Filter high-value transactions'],['week7','py_average','Average order value']]
  };
  if(onHome){
   const home=document.querySelector('.ps-home-promo');if(home&&!document.querySelector('.dlp90-arena-cta')){
    const section=document.createElement('section');section.className='dalp-arena-home';section.setAttribute('aria-labelledby','dalpArenaHomeTitle');
    section.innerHTML='<div class="dalp-arena-home-copy"><span>TRY IT YOURSELF</span><h2 id="dalpArenaHomeTitle">Practice Arena: learn by doing</h2><p>Choose from 45 SQL, 50 Excel and 54 Python challenges. Run an attempt, check the result and try again. Your progress is stored in this browser.</p></div><div class="dalp-arena-home-links"><a href="practice.html?tool=Excel">Excel formula practice ↗</a><a href="practice.html?tool=SQL">SQL query practice ↗</a><a href="practice.html?tool=Python">Python coding practice ↗</a></div>';
    home.after(section);
   }
   return;
  }
  const m=path.match(/\/courses\/(excel|sql|python)\.html$/);if(!m)return;
  const tool=m[1]==='sql'?'SQL':m[1]==='excel'?'Excel':'Python';
  const top=document.querySelector('.dalp-next-actions');if(top){const link=document.createElement('a');link.className='dalp-next-secondary dalp-arena-link';link.href='../practice.html?tool='+tool;link.textContent='Open '+tool+' Practice Arena ↗';top.append(link);}
  for(const [week,id,title] of recommended[m[1]]){
   const unit=document.getElementById(week);if(!unit)continue;
   const aside=document.createElement('aside');aside.className='dalp-arena-lesson';aside.setAttribute('aria-label','Apply this lesson in Practice Arena');
   const p=document.createElement('p');p.innerHTML='<strong>Ready to apply this lesson?</strong> Try a related challenge in the Practice Arena. Your attempt will be checked locally.';
   const a=document.createElement('a');a.href='../practice.html?challenge='+encodeURIComponent(id)+'&tool='+tool;a.textContent='Try: '+title+' ↗';
   aside.append(p,a);const heading=unit.querySelector('h2,h3');if(heading)heading.after(aside);else unit.prepend(aside);
  }
 }
 function init(){if(onHome){pathfinder();enhanceCards();}guideNextLesson();practiceArenaConnections();clarifyTools();activeNav();}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
