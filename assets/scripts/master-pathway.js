/* DataLearning four-stage curriculum explorer; no network or learner data required. */
(()=>{
 'use strict';
 const root=document.getElementById('masterLearningPath');
 const syllabus=window.DALP_MASTER_PATHWAY;
 if(!root||!syllabus)return;
 const safe=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const levelMeta=id=>syllabus.levels.find(l=>l.id===id);
 const counts=id=>syllabus.modules.filter(m=>m.level===id).length;
 const state={level:0,track:'all',query:''};
 const trackChoices=[...new Set(syllabus.modules.map(m=>m.track))].sort();
 const byId=new Map(syllabus.modules.map(m=>[m.id,m]));
 const guidedCourses=[
  {slug:'introduction',name:'Data Analysis',mark:'DA',label:'FOUNDATION',description:'Learn data types, analysis workflows, business questions, and the foundations of sound decision-making.'},
  {slug:'excel',name:'Microsoft Excel',mark:'XL',label:'SPREADSHEETS',description:'Clean, calculate, summarize, and report business data using formulas, tables, and PivotTables.'},
  {slug:'sql',name:'SQL for Analytics',mark:'SQL',label:'DATA QUERIES',description:'Query relational data, join tables, verify totals, and explain the results in plain language.'},
  {slug:'powerbi',name:'Power BI',mark:'BI',label:'BUSINESS INTELLIGENCE',description:'Model data, create DAX measures, and turn metrics into reliable interactive reports.'},
  {slug:'tableau',name:'Tableau',mark:'TB',label:'DATA VISUALIZATION',description:'Explore patterns visually and communicate useful findings through purposeful dashboards.'},
  {slug:'powerquery',name:'Power Query',mark:'PQ',label:'DATA PREPARATION',description:'Build repeatable transformations and prepare trusted, analysis-ready datasets.'},
  {slug:'statistics',name:'Statistics',mark:'ST',label:'DATA REASONING',description:'Understand distributions, relationships, uncertainty, and evidence-based conclusions.'},
  {slug:'python',name:'Python for Data Analytics',mark:'PY',label:'PROGRAMMING',description:'Move from Python basics to pandas, data cleaning, exploratory analysis, and reproducible reports.'},
  {slug:'ai',name:'AI for Data Analysis',mark:'AI',label:'ARTIFICIAL INTELLIGENCE',description:'Use AI thoughtfully for analysis, prompt design, checking outputs, and responsible reporting.'}
 ];
 const weekLinks=Object.fromEntries(guidedCourses.map(course=>[course.slug,`courses/${course.slug}.html`]));
 const courseBySlug=new Map(guidedCourses.map(course=>[course.slug,course]));
 const courseCard=course=>`<article class="dlp-course-card dlp-course-${safe(course.slug)}"><div class="dlp-course-card-top"><span class="dlp-course-mark" aria-hidden="true">${safe(course.mark)}</span><span class="dlp-course-tag">${safe(course.label)}</span></div><h4>${safe(course.name)}</h4><p>${safe(course.description)}</p><div class="dlp-course-card-bottom"><span>10 guided weeks</span><a href="${safe(weekLinks[course.slug])}" aria-label="Open ${safe(course.name)} course">Open course <span aria-hidden="true">↗</span></a></div></article>`;

 function levelButton(l){return `<button class="dlp-level" type="button" data-level="${l.id}" aria-pressed="false"><span class="dlp-level-count">LEVEL ${String(l.id).padStart(2,'0')} · ${counts(l.id)} MODULES</span><strong>${safe(l.name)}</strong><span>${safe(l.subtitle)}</span></button>`;}
 root.innerHTML=`<div class="dlp-shell">
  <div class="dlp-intro"><div><span class="dlp-eyebrow">YOUR COMPLETE DATA CAREER PATH</span><h2>From your first spreadsheet to <em>expert data systems.</em></h2><p>Choose your level, learn the concept, follow a worked business example, and complete a short, phone-friendly challenge. All nine guided courses have 10 weekly lessons each, and your saved progress stays exactly where it is.</p></div><div class="dlp-intro-side"><span class="dlp-big-number">31</span><strong>specialist learning modules</strong><span>4 proficiency levels · Analytics · Engineering · Data Science · AI</span><a href="courses/introduction.html">Start at zero experience <span aria-hidden="true">↗</span></a></div></div>
  <section class="dlp-guided-courses" aria-labelledby="dlpGuidedCoursesTitle" id="guidedCourses"><div class="dlp-guided-header"><div><span class="dlp-mini-kicker">NINE GUIDED COURSES · 90 WEEKS OF LEARNING</span><h3 id="dlpGuidedCoursesTitle">Choose a course. Build the skills.</h3><p>All nine subjects have dedicated weekly lessons, practice activities, and mastery assessments. Python and AI are part of this pathway—not separate roadmaps.</p></div><span class="dlp-guided-count">09 <small>COURSES</small></span></div><div class="dlp-guided-grid">${guidedCourses.map(courseCard).join('')}</div></section>
  <div class="dlp-levels" role="group" aria-label="Choose a proficiency level"><button class="dlp-level dlp-level-all" data-level="0" type="button" aria-pressed="true"><span class="dlp-level-count">ALL LEVELS</span><strong>Full roadmap</strong><span>Beginner → Expert</span></button>${syllabus.levels.map(levelButton).join('')}</div>
  <div class="dlp-toolbar"><div class="dlp-toolbar-heading"><h3>Explore the modules</h3><p>All examples use fictional or synthetic data. Cloud services are taught with lightweight, conceptual exercises before hands-on deployment.</p></div><label class="dlp-search"><span>Search modules and topics</span><input id="dlpModuleSearch" type="search" autocomplete="off" placeholder="Try dbt, Excel, Kafka, AI…"/></label><label class="dlp-track"><span>Specialization</span><select id="dlpModuleTrack"><option value="all">All specializations</option>${trackChoices.map(s=>`<option value="${safe(s)}">${safe(s)}</option>`).join('')}</select></label></div>
  <p id="dlpStatus" class="dlp-status" role="status" aria-live="polite"></p>
  <div class="dlp-programme"><details class="dlp-outcomes"><summary><span class="dlp-outcomes-icon" aria-hidden="true">▤</span><span><span class="dlp-mini-kicker">OPTIONAL REFERENCE TABLE</span><strong>Compare every module and learning outcome</strong><small>Open the full curriculum matrix when you need to compare tools and outcomes.</small></span><span class="dlp-outcomes-toggle" aria-hidden="true">⌄</span></summary><div class="dlp-table-hint">Swipe horizontally to compare columns on a smaller screen.</div><div class="dlp-table-scroll"><table class="dlp-table"><caption>Four-level DataLearning curriculum, tools and outcomes</caption><thead><tr><th scope="col">Level</th><th scope="col">Module</th><th scope="col">Primary tools</th><th scope="col">Learning outcome</th></tr></thead><tbody id="dlpRows"></tbody></table></div></details></div>
  <div class="dlp-module-header"><div><span class="dlp-mini-kicker">DEEP STUDY GUIDE</span><h3>Detailed lessons and micro-projects</h3><p>Open a module for an explanation, prerequisites, four-step workflow, realistic case study and a revealable model answer.</p></div><button type="button" class="dlp-collapse" id="dlpCollapseAll">Collapse all</button></div>
  <div class="dlp-module-list" id="dlpModules"></div><p id="dlpEmpty" class="dlp-empty" hidden>No matching modules. Clear the search or select another proficiency level.</p>
  <div class="dlp-footer"><div><span class="dlp-mini-kicker">READY TO LEARN?</span><h3>Use the guided lessons and practice tools.</h3><p>All nine guided courses contain 90 separate weekly lessons and continue to track your existing progress. Specialist modules above are supplemental study content; they do not create unverified completion records.</p></div><div class="dlp-footer-links"><a href="courses/introduction.html">Foundation lessons ↗</a><a href="practice.html">Practice Arena ↗</a><a href="capstone.html">Capstone projects ↗</a></div></div>
 </div>`;
 const tableBody=root.querySelector('#dlpRows'),list=root.querySelector('#dlpModules'),status=root.querySelector('#dlpStatus');
 const buttons=[...root.querySelectorAll('[data-level]')];
 function filter(m){
  const q=state.query;return (!state.level||state.level===m.level)&&(state.track==='all'||state.track===m.track)&&(!q||[m.title,m.outcome,m.track,m.tools,m.id,...m.topics,m.lesson].join(' ').toLowerCase().includes(q));
 }
 function moduleCard(m){const lvl=levelMeta(m.level);
  const related=Object.entries(syllabus.courseBridges||{}).filter(([slug,ids])=>weekLinks[slug]&&ids.includes(m.id));
  const courseLinks=related.length?`<section class="dlp-related-courses" aria-label="Related guided courses"><span class="dlp-detail-kicker">CONTINUE LEARNING</span><h4>Explore this topic in a guided course</h4><div class="dlp-related-links">${related.map(([slug])=>`<a href="${safe(weekLinks[slug])}">${safe(courseBySlug.get(slug).name)} <span aria-hidden="true">↗</span></a>`).join('')}</div></section>`:'';
  return `<details class="dlp-module" id="pathway-${safe(m.id)}" data-module="${safe(m.id)}"><summary><span class="dlp-module-index">${safe(m.id)}</span><span class="dlp-module-label"><span class="dlp-module-meta">LEVEL ${m.level} · ${safe(m.track)} · ${safe(lvl.subtitle)}</span><strong>${safe(m.title)}</strong><span class="dlp-module-outcome">${safe(m.outcome)}</span></span><span class="dlp-module-toggle" aria-hidden="true">+</span></summary>
   <div class="dlp-detail"><div class="dlp-detail-rail"><section><h4>Prerequisites</h4><p>${safe(m.prerequisites)}</p></section><section><h4>Primary tools</h4><p>${safe(m.tools)}</p></section><section><h4>Four core topics</h4><ul>${m.topics.map(x=>`<li>${safe(x)}</li>`).join('')}</ul></section></div>
   <div class="dlp-detail-body"><section><span class="dlp-detail-kicker">01 · UNDERSTAND</span><h4>Learn the concept</h4><p>${safe(m.lesson)}</p></section><section class="dlp-case"><span class="dlp-detail-kicker">02 · APPLIED CASE STUDY</span><h4>Why a business needs this skill</h4><p>${safe(m.caseStudy)}</p></section><section><span class="dlp-detail-kicker">03 · GUIDED WORKFLOW</span><h4>Follow four practical steps</h4><ol>${m.steps.map(x=>`<li>${safe(x)}</li>`).join('')}</ol></section><section class="dlp-worked"><span class="dlp-detail-kicker">04 · WORKED EXAMPLE</span><h4>Study an example and its meaning</h4><pre><code>${safe(m.workedExample)}</code></pre><p><strong>Interpretation:</strong> ${safe(m.interpretation)}</p></section><section class="dlp-try"><span class="dlp-detail-kicker">05 · FIVE-MINUTE CHALLENGE</span><h4>Your turn — micro-project</h4><p>${safe(m.microProject)}</p><details class="dlp-answer"><summary>Reveal model answer</summary><p>${safe(m.modelAnswer)}</p></details></section><section class="dlp-caution"><strong>Quality check · </strong>${safe(m.commonMistake)}</section><p class="dlp-next"><strong>Next:</strong> ${safe(m.next)}</p>${courseLinks}</div></div></details>`;
 }
 function render(){
  buttons.forEach(b=>{const selected=Number(b.dataset.level)===state.level;b.setAttribute('aria-pressed',String(selected));});
  const matching=syllabus.modules.filter(filter);
  status.textContent=`Showing ${matching.length} of ${syllabus.modules.length} modules`;
  tableBody.innerHTML=matching.map(m=>`<tr><td><span class="dlp-row-stage">${safe(levelMeta(m.level).name)}</span></td><th scope="row"><a href="#pathway-${safe(m.id)}" data-jump-module="${safe(m.id)}">${safe(m.title)}</a></th><td>${safe(m.tools)}</td><td>${safe(m.outcome)}</td></tr>`).join('');
  list.innerHTML=matching.map(moduleCard).join('');
  root.querySelector('#dlpEmpty').hidden=!!matching.length;
 }
 function openModule(id){const m=byId.get(id);if(!m)return;let el=root.querySelector('#pathway-'+id);if(!el){state.level=0;state.track='all';state.query='';root.querySelector('#dlpModuleSearch').value='';root.querySelector('#dlpModuleTrack').value='all';render();el=root.querySelector('#pathway-'+id);}if(el){el.open=true;el.scrollIntoView({block:'start',behavior:'auto'});}}
 buttons.forEach(b=>b.addEventListener('click',()=>{state.level=Number(b.dataset.level);render();}));
 root.querySelector('#dlpModuleSearch').addEventListener('input',e=>{state.query=e.target.value.trim().toLowerCase();render();});
 root.querySelector('#dlpModuleTrack').addEventListener('change',e=>{state.track=e.target.value;render();});
 root.querySelector('#dlpCollapseAll').addEventListener('click',()=>root.querySelectorAll('.dlp-module').forEach(el=>el.open=false));
 root.addEventListener('click',e=>{const link=e.target.closest('[data-jump-module]');if(link)openModule(link.dataset.jumpModule);});
 window.addEventListener('hashchange',()=>{const id=decodeURIComponent(location.hash).replace(/^#pathway-/,'');if(byId.has(id))openModule(id);});
 render();
 const initial=decodeURIComponent(location.hash).replace(/^#pathway-/,'');
 if(byId.has(initial))requestAnimationFrame(()=>openModule(initial));
})();
