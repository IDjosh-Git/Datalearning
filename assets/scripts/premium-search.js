/* DataLearning Premium Search — accessible in-page command search, no external requests. */
(()=>{'use strict';
const base=location.pathname.includes('/courses/')?'../':'';
const records=[
 ['overview.html','Learning overview','Explore','See recorded course interest and build a study plan','insights popularity trends overview statistics learners'],
 ['index.html','Discover','Explore','Choose a learning goal and start your next skill','discover find my path start goal home'],
 ['catalog.html','All courses','Explore','Discover the complete course catalogue','catalogue subjects browse'],
 ['courses/introduction.html','Introduction to data analysis','Courses','Data quality, business questions and foundations','beginner foundation types data basics'],
 ['courses/excel.html','Excel analytics','Courses','Formulas, XLOOKUP, pivots and dashboards','sumifs spreadsheet pivot tables cleaning'],
 ['courses/sql.html','SQL analytics','Courses','Queries, joins, CTEs and window functions','select group by database joins cte'],
 ['courses/powerbi.html','Power BI & DAX','Courses','Power Query, models and visual reports','bi dashboard star schema dax measures'],
 ['courses/python.html','Python analytics','Courses','pandas, NumPy and reproducible analysis','coding statistics automation dataframe'],
 ['courses/ai.html','AI integration','Courses','Verified AI workflows for data analysis','prompting automation responsible chatgpt'],
 ['practice.html','Practice Arena','Study tools','SQL, Excel and Python challenges with working editor','challenge editor run code grade skills'],
 ['studio.html','Practice Studio','Study tools','Guided hands-on learning and exercises','studio project'],
 ['tutor.html','AI Learning Tutor','Study tools','Guided explanations, follow-up questions and knowledge checks','coach tutor chat explain'],
 ['reference.html','Reference library','Study tools','Formulas and worked examples across analytics tools','dax formulas excel sql functions'],
 ['learning-lab.html#study-plan','Learning Lab & Study Plan','Study tools','Personal seven-session study routes, active recall and 500+ guided lessons','study plan learning schedule guided recall learning lab weekly goals reflection flashcards recap'],
 ['prompt-library.html','AI prompt library','Study tools','Practical prompts for analysts','ai chatgpt prompts'],
 ['account.html','My learning dashboard','My workspace','Personal course progress and achievements','my courses results certificates'],
 ['capstone.html','Capstone studio','My workspace','Submit projects and review instructor feedback','projects assignments submission'],
 ['preview.html','Try a lesson','Explore','Read a sample before signing in','trial lesson preview'],
 ['auth.html','Sign in','My workspace','Save your course progress across devices','account login register']
 ];
const searchIcon='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="7.5"/><path d="m16 16 5 5"/></svg>';
function init(){if(document.getElementById('premiumSearchDialog'))return;
 const header=document.querySelector('.dalp-global-header .dalp-global-inner');
 const privateTop=document.querySelector('.ac-topbar .ac-top-actions');
 const trigger=document.createElement('button');trigger.type='button';trigger.className='premium-search-trigger';trigger.setAttribute('aria-label','Search courses and learning tools');trigger.innerHTML=searchIcon+'<span>Search learning</span><kbd>⌘ K</kbd>';
 if(header){const nav=header.querySelector('.dalp-global-nav');header.insertBefore(trigger,header.querySelector('.dalp-global-toggle')||nav||null);}
 else if(privateTop){privateTop.prepend(trigger);}
 else {trigger.classList.add('premium-search-floating');document.body.append(trigger);}
 const dlg=document.createElement('dialog');dlg.id='premiumSearchDialog';dlg.className='premium-search-dialog';dlg.setAttribute('aria-label','Search the DataLearning platform');
 dlg.innerHTML='<div class="ps-shell"><div class="ps-heading"><div><span class="ps-eyebrow">DATALEARNING · QUICK FIND</span><h2>Where would you like to go?</h2></div><button class="ps-close" type="button" aria-label="Close search">✕</button></div><label class="ps-input-shell">'+searchIcon+'<input id="psInput" type="search" placeholder="Search courses, tools or topics…" autocomplete="off" spellcheck="false" aria-label="Search courses, tools or topics"><kbd>ESC</kbd></label><div class="ps-note"><span>Search across learning destinations</span><span id="psCount" aria-live="polite"></span></div><div class="ps-result-grid" id="psResults" aria-label="Search results"></div><footer class="ps-footer"><span><kbd>↑</kbd><kbd>↓</kbd> Move</span><span><kbd>↵</kbd> Open</span><a href="'+base+'overview.html">Learning overview ↗</a></footer></div>';
 document.body.append(dlg);
 const inp=dlg.querySelector('#psInput'),results=dlg.querySelector('#psResults'),count=dlg.querySelector('#psCount');let cards=[];
 function render(){const q=inp.value.trim().toLowerCase(),parts=q.split(/\s+/).filter(Boolean);
  const scored=records.map((r,i)=>{const search=(r[1]+' '+r[2]+' '+r[3]+' '+r[4]).toLowerCase();let score=0;for(const term of parts){if(!search.includes(term))return null;score+=r[1].toLowerCase().startsWith(term)?8:r[1].toLowerCase().includes(term)?5:2;}return {...{r,i,score}};}).filter(Boolean).sort((a,b)=>b.score-a.score||a.i-b.i);
  const visible=(q?scored:scored.filter(x=>['Courses','Study tools'].includes(x.r[2])||x.i===0||x.i===15)).slice(0,14);
  results.replaceChildren();cards=[];
  for(const {r} of visible){const a=document.createElement('a');a.className='ps-card';a.href=base+r[0];const left=document.createElement('span');left.className='ps-icon';left.textContent=({Courses:'▦','Study tools':'✦','My workspace':'◉',Explore:'◎'})[r[2]]||'◎';const copy=document.createElement('span');copy.className='ps-copy';const badge=document.createElement('small');badge.textContent=r[2];const name=document.createElement('strong');name.textContent=r[1];const note=document.createElement('span');note.textContent=r[3];copy.append(badge,name,note);const arrow=document.createElement('span');arrow.className='ps-arrow';arrow.textContent='↗';a.append(left,copy,arrow);results.append(a);cards.push(a);}
  if(!cards.length){const empty=document.createElement('p');empty.className='ps-empty';empty.textContent='No matching destination. Try “Excel”, “SQL”, “Tutor”, “Practice” or “DAX”.';results.append(empty);}
  count.textContent=cards.length+' result'+(cards.length===1?'':'s');
 }
 function open(){render();dlg.showModal();inp.focus();}
 function close(){dlg.close();trigger.focus({preventScroll:true});}
 trigger.addEventListener('click',open);dlg.querySelector('.ps-close').addEventListener('click',close);
 dlg.addEventListener('click',e=>{if(e.target===dlg)close()});
 inp.addEventListener('input',render);
 inp.addEventListener('keydown',e=>{if(e.key==='ArrowDown'&&cards.length){e.preventDefault();cards[0].focus()}else if(e.key==='Enter'&&cards.length){e.preventDefault();location.assign(cards[0].href)}});
 dlg.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close()}});
 results.addEventListener('keydown',e=>{if(!['ArrowDown','ArrowUp'].includes(e.key))return;const idx=cards.indexOf(document.activeElement);if(idx<0)return;e.preventDefault();if(e.key==='ArrowUp'&&idx===0)inp.focus();else cards[Math.max(0,Math.min(cards.length-1,idx+(e.key==='ArrowDown'?1:-1)))].focus();});
 document.addEventListener('keydown',e=>{const t=e.target;if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();dlg.open?close():open()}else if(e.key==='/'&&!dlg.open&&!['INPUT','TEXTAREA','SELECT'].includes(t.tagName)&&!t.isContentEditable){e.preventDefault();open()}});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
