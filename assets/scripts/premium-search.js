/* DataLearning Premium Search — accessible in-page command search, no external requests. */
(()=>{'use strict';
const base=location.pathname.includes('/courses/')?'../':'';
const records=[
 ['account.html#course-progress-heading','My progress','My workspace','Review completed weeks across all nine courses','insights popularity trends overview statistics learners'],
 ['index.html','Discover','Explore','Choose a learning goal and start your next skill','discover find my path start goal home'],
 ['index.html#zaDiscoverCards','All courses','Explore','Discover the complete course catalogue','catalogue subjects browse'],
 ['courses/introduction.html','Introduction to data analysis','Courses','Data quality, business questions and foundations','beginner foundation types data basics'],
 ['courses/excel.html','Excel analytics','Courses','Formulas, XLOOKUP, pivots and dashboards','sumifs spreadsheet pivot tables cleaning'],
 ['courses/sql.html','SQL analytics','Courses','Queries, joins, CTEs and window functions','select group by database joins cte'],
 ['courses/powerbi.html','Power BI & DAX','Courses','Power Query, models and visual reports','bi dashboard star schema dax measures'],
 ['courses/tableau.html','Tableau visual analytics','Courses','Build calculated fields and interactive dashboards','tableau charts visual storytelling'],
 ['courses/powerquery.html','Power Query','Courses','Clean and combine repeatable datasets','power query transform M ETL'],
 ['courses/statistics.html','Statistics','Courses','Descriptive statistics and useful inference','mean median probability correlation hypothesis'],
 ['courses/python.html','Python analytics','Courses','pandas, NumPy and reproducible analysis','coding statistics automation dataframe'],
 ['courses/ai.html','AI integration','Courses','Verified AI workflows for data analysis','prompting automation responsible chatgpt'],
 ['practice.html','Practice Arena','Study tools','SQL, Excel and Python challenges with working editor','challenge editor run code grade skills'],
 ['study-tools.html','Study Tools hub','Study tools','Find the right study and practice tool','all learning tools study hub planner'],
 ['learning-lab.html','Learning Lab','Study tools','Review explanations and save understanding status','study review reading confidence library'],
 ['certificate.html','Certificates','My workspace','View and verify completed course achievements','certificate award completion verification'],
 ['tutor.html','AI Learning Tutor','Study tools','Guided explanations, follow-up questions and knowledge checks','coach tutor chat explain'],
 ['reference.html','Reference library','Study tools','Formulas and worked examples across analytics tools','dax formulas excel sql functions'],
 ['learning-coach.html','Learning Coach','Study tools','Personal seven-session study routes and active recall','study plan learning schedule guided recall learning lab weekly goals reflection flashcards recap'],
 ['prompt-library.html','AI prompt library','Study tools','Practical prompts for analysts','ai chatgpt prompts'],
 ['account.html','Learning Dashboard','My workspace','Personal course progress and achievements','my courses results certificates'],
 ['capstone.html','Capstone studio','My workspace','Submit projects and review instructor feedback','projects assignments submission'],
 ['preview.html','Try a lesson','Explore','Review an example lesson in your learning workspace','trial lesson preview'],
 ['auth.html','Sign in','My workspace','Save your course progress across devices','account login register']
 ];
const searchIcon='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="7.5"/><path d="m16 16 5 5"/></svg>';
function init(){if(document.getElementById('premiumSearchDialog'))return;
 const unifiedHeader=document.querySelector('.dlu-header .dlu-header-actions');
 const header=document.querySelector('.dalp-global-header .dalp-global-inner');
 const privateTop=document.querySelector('.ac-topbar .ac-top-actions');
 const quizTop=document.querySelector('.dl-quiz-nav-actions');
 const sharedHeader=document.querySelector('.dlx-header-inner,.za-header-inner');
 const trigger=document.createElement('button');trigger.type='button';trigger.className='premium-search-trigger dalp-unified-search';trigger.setAttribute('aria-label','Search courses and learning tools');trigger.setAttribute('aria-haspopup','dialog');trigger.setAttribute('aria-controls','premiumSearchDialog');trigger.setAttribute('aria-expanded','false');trigger.innerHTML=searchIcon+'<span>Search learning</span><kbd>'+(/Mac|iPhone|iPad/i.test(navigator.platform||'')?'⌘ K':'Ctrl K')+'</kbd>'; 
 if(unifiedHeader){trigger.classList.add('dlu-search-button');unifiedHeader.prepend(trigger);}
 else if(header){const nav=header.querySelector('.dalp-global-nav');header.insertBefore(trigger,header.querySelector('.dalp-global-toggle')||nav||null);}
 else if(sharedHeader){let actions=sharedHeader.querySelector('.dlx-utility-actions');if(!actions){actions=document.createElement('div');actions.className='dlx-utility-actions';actions.setAttribute('aria-label','Quick learning tools');const menu=sharedHeader.querySelector('.dlx-menu-button,.za-menu-open');sharedHeader.insertBefore(actions,menu||null);}trigger.classList.add('dlx-header-search');actions.append(trigger);} 
 else if(privateTop){privateTop.prepend(trigger);}
 else if(quizTop){quizTop.prepend(trigger);}
 else {trigger.classList.add('premium-search-floating');document.body.append(trigger);}
 const dlg=document.createElement('dialog');dlg.id='premiumSearchDialog';dlg.className='premium-search-dialog';dlg.setAttribute('aria-label','Search the DataLearning platform');
 dlg.innerHTML='<div class="ps-shell"><div class="ps-heading"><div><span class="ps-eyebrow">DATALEARNING · QUICK FIND</span><h2>Find your next learning step.</h2></div><button class="ps-close" type="button" aria-label="Close search">×</button></div><div class="ps-search-zone"><label class="ps-input-shell">'+searchIcon+'<input id="psInput" type="search" placeholder="Search courses, tools or topics…" autocomplete="off" spellcheck="false" aria-label="Search courses, tools or topics"><kbd>ESC</kbd></label><div class="ps-filter-list" aria-label="Filter destinations"><button type="button" class="ps-filter" data-filter="all" aria-pressed="true">All results</button><button type="button" class="ps-filter" data-filter="Courses" aria-pressed="false">Courses</button><button type="button" class="ps-filter" data-filter="Study tools" aria-pressed="false">Study Tools</button><button type="button" class="ps-filter" data-filter="My workspace" aria-pressed="false">Learning Dashboard</button></div></div><div class="ps-note"><span>Quick links and practical resources</span><span id="psCount" aria-live="polite"></span></div><div class="ps-result-grid" id="psResults" aria-label="Search results"></div><footer class="ps-footer"><span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span><span><kbd>↵</kbd> Open</span><a href="'+base+'study-tools.html">Explore Study Tools ↗</a></footer></div>';
 document.body.append(dlg);
 const inp=dlg.querySelector('#psInput'),results=dlg.querySelector('#psResults'),count=dlg.querySelector('#psCount');let cards=[],activeFilter='all';
 const filterButtons=[...dlg.querySelectorAll('.ps-filter')];
 filterButtons.forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;filterButtons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));render();inp.focus({preventScroll:true});}));
 function render(){const q=inp.value.trim().toLowerCase(),parts=q.split(/\s+/).filter(Boolean);
  const scored=records.map((r,i)=>{const search=(r[1]+' '+r[2]+' '+r[3]+' '+r[4]).toLowerCase();let score=0;for(const term of parts){if(!search.includes(term))return null;score+=r[1].toLowerCase().startsWith(term)?8:r[1].toLowerCase().includes(term)?5:2;}return {...{r,i,score}};}).filter(Boolean).sort((a,b)=>b.score-a.score||a.i-b.i);
  const filtered=activeFilter==='all'?scored:scored.filter(x=>x.r[2]===activeFilter);
  const visible=(q?filtered:filtered.filter(x=>activeFilter!=='all'||['Courses','Study tools'].includes(x.r[2])||x.r[0]==='index.html')).slice(0,20);
  results.replaceChildren();cards=[];
  for(const {r} of visible){const a=document.createElement('a');a.className='ps-card';a.href=base+r[0];const left=document.createElement('span');left.className='ps-icon';left.textContent=({Courses:'▦','Study tools':'✦','My workspace':'◉',Explore:'◎'})[r[2]]||'◎';const copy=document.createElement('span');copy.className='ps-copy';const badge=document.createElement('small');badge.textContent=r[2];const name=document.createElement('strong');name.textContent=r[1];const note=document.createElement('span');note.textContent=r[3];copy.append(badge,name,note);const arrow=document.createElement('span');arrow.className='ps-arrow';arrow.textContent='↗';a.append(left,copy,arrow);results.append(a);cards.push(a);}
  if(!cards.length){const empty=document.createElement('p');empty.className='ps-empty';empty.textContent='No matching destination. Try “Excel”, “SQL”, “Tutor”, “Practice” or “DAX”.';results.append(empty);}
  count.textContent=cards.length+' result'+(cards.length===1?'':'s');
 }
 function open(){if(dlg.open)return;render();dlg.showModal();trigger.setAttribute('aria-expanded','true');inp.focus({preventScroll:true});}
 function close(){if(dlg.open)dlg.close();trigger.setAttribute('aria-expanded','false');trigger.focus({preventScroll:true});}
 trigger.addEventListener('click',open);dlg.querySelector('.ps-close').addEventListener('click',close);
 dlg.addEventListener('cancel',()=>{trigger.setAttribute('aria-expanded','false')});
 dlg.addEventListener('close',()=>{trigger.setAttribute('aria-expanded','false')});
 dlg.addEventListener('click',e=>{if(e.target===dlg)close()});
 inp.addEventListener('input',render);
 inp.addEventListener('keydown',e=>{if(e.key==='ArrowDown'&&cards.length){e.preventDefault();cards[0].focus()}else if(e.key==='Enter'&&cards.length){e.preventDefault();location.assign(cards[0].href)}});
 dlg.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close()}});
 results.addEventListener('keydown',e=>{if(!['ArrowDown','ArrowUp'].includes(e.key))return;const idx=cards.indexOf(document.activeElement);if(idx<0)return;e.preventDefault();if(e.key==='ArrowUp'&&idx===0)inp.focus();else cards[Math.max(0,Math.min(cards.length-1,idx+(e.key==='ArrowDown'?1:-1)))].focus();});
 document.addEventListener('keydown',e=>{const t=e.target;if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();dlg.open?close():open()}else if(e.key==='/'&&!dlg.open&&!['INPUT','TEXTAREA','SELECT'].includes(t.tagName)&&!t.isContentEditable){e.preventDefault();open()}});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
