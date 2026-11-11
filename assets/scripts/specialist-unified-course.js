/* Unified premium reading experience for the existing AI and Python courses.
   Presentation only: keeps week IDs, quizzes, progress inputs and course service bindings intact. */
(() => {
  'use strict';
  const course = document.body?.dataset.course;
  if (!['python','ai'].includes(course)) return;
  const definitions = {
    python: {name:'Python for Data Analytics',label:'PYTHON ANALYTICS',icon:'icon-python.svg',subtitle:'From your first Python workspace to a reproducible analytics report.',tools:[['Python setup','../downloads/PYTHON_GETTING_STARTED.md'],['Practice Arena','../practice.html?course=python'],['Capstone project','../capstone.html?course=python']]},
    ai: {name:'AI for Data Analysis',label:'AI-POWERED ANALYTICS',icon:'icon-ai.svg',subtitle:'From confident prompting and responsible AI use to verified analytical reporting.',tools:[['Prompt Library','../prompt-library.html'],['AI Tutor','../tutor.html?topic=ai'],['Capstone project','../capstone.html?course=ai']]}
  };
  const d = definitions[course];
  const sanitize = value => String(value ?? '').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const svgArrow = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
  function init() {
    const workspace = document.querySelector('#course-week-workspace.cw-workspace');
    const sidebar = document.querySelector('#sidebar.dl-lesson-rail');
    if (!workspace || !sidebar || !document.body.classList.contains('cw-workspace-ready')) return;
    const weeks = Array.from(document.querySelectorAll('.cw-module[id^="week"]')).filter(el => /^week(?:[1-9]|10)$/.test(el.id));
    if (weeks.length !== 10 || workspace.querySelector('.sxl-course-hero')) return;

    const rail = document.createElement('div');
    rail.className = 'sxl-rail-brand';
    rail.innerHTML = `<a class="sxl-rail-back" href="../catalog.html">← Browse all courses</a><div class="sxl-rail-course"><img src="../assets/icons/${d.icon}" alt="" width="49" height="49"><div><span>YOUR LEARNING PATH</span><strong>${d.name}</strong><small>10 practical weeks</small></div></div>`;
    const existingDrawerHeading = sidebar.querySelector('.dl-lesson-drawer-heading');
    if (existingDrawerHeading) existingDrawerHeading.after(rail); else sidebar.prepend(rail);

    const hero = document.createElement('section');
    hero.className = 'sxl-course-hero';
    hero.setAttribute('aria-label',d.name+' weekly learning workspace');
    const identity = document.createElement('div');
    identity.className = 'sxl-hero-identity';
    identity.innerHTML = `<span class="sxl-icon-surface"><img src="../assets/icons/${d.icon}" alt="" width="38" height="38"></span><div><span class="sxl-track-label">DATALEARNING / ${d.label}</span><strong>${d.name}</strong><small>${d.subtitle}</small></div><a href="../catalog.html" class="sxl-return" aria-label="Return to all courses">All courses ${svgArrow}</a>`;
    hero.append(identity);
    const breadcrumb=workspace.querySelector('.cw-breadcrumb');
    const heading=workspace.querySelector('.cw-overview-head');
    if(breadcrumb)hero.append(breadcrumb);
    if(heading)hero.append(heading);
    const meter = document.createElement('div');
    meter.className = 'sxl-hero-meter';
    meter.innerHTML = '<div class="sxl-meter-text"><strong id="sxlProgressTitle">Your course progress</strong><span id="sxlProgressCount" aria-live="polite">0 of 10 weeks complete</span></div><div class="sxl-meter-track" role="progressbar" aria-label="Course completion" aria-valuemin="0" aria-valuemax="10" aria-valuenow="0"><span id="sxlProgressFill"></span></div>';
    hero.append(meter);
    workspace.prepend(hero);

    const toolbar = document.createElement('div');
    toolbar.className = 'sxl-week-toolbar';
    toolbar.innerHTML = `<div class="sxl-week-picker"><label for="sxlWeekSelect">JUMP TO A WEEK</label><div class="sxl-select-wrap"><select id="sxlWeekSelect" aria-label="Choose a week in the ${d.name} course"></select><svg viewBox="0 0 24 24" aria-hidden="true" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></div></div><div class="sxl-week-resources"><span class="sxl-tools-label">QUICK ACCESS</span><div class="sxl-tools-links">${d.tools.map(([label,href])=>`<a href="${href}">${sanitize(label)} ${svgArrow}</a>`).join('')}</div></div>`;
    const select = toolbar.querySelector('#sxlWeekSelect');
    weeks.forEach((week,index) => {
      const option = document.createElement('option');
      option.value=String(index+1);
      const lesson = week.querySelector('.week-title h3, .unit-head h2');
      option.textContent=`Week ${String(index+1).padStart(2,'0')} · ${(lesson?.textContent||'Course module').trim()}`;
      select.append(option);
    });
    hero.after(toolbar);
    select.addEventListener('change',()=>{
      const target=Number(select.value);
      if(!Number.isInteger(target)||target<1||target>10)return;
      // The existing weekly-workspace controller owns navigation and saved progress.
      const next='#week'+target;
      if(location.hash!==next)location.hash=next;
    });

    const utilityLinks=document.querySelector('.course-top-actions');
    if(utilityLinks){
      const details=document.createElement('details');details.className='sxl-course-options';
      details.innerHTML='<summary>Account & course options <span aria-hidden="true">⌄</span></summary>';
      details.append(utilityLinks);
      toolbar.after(details);
    }

    function sync() {
      const active = weeks.findIndex(week=>week.classList.contains('cw-current'))+1 || 1;
      select.value=String(active);
      const complete=weeks.filter(week=>!!week.querySelector('.completeBox')?.checked).length;
      const meterNode=hero.querySelector('[role="progressbar"]');
      meterNode.setAttribute('aria-valuenow',String(complete));
      hero.querySelector('#sxlProgressCount').textContent=`${complete} of 10 weeks complete`;
      hero.querySelector('#sxlProgressFill').style.width=(complete*10)+'%';
      rail.classList.toggle('sxl-all-complete',complete===10);
    }
    weeks.forEach(week=>new MutationObserver(sync).observe(week,{attributes:true,attributeFilter:['class']}));
    document.addEventListener('change',event=>{if(event.target.matches('.completeBox'))sync();});
    document.addEventListener('zah:progress-applied',sync);
    window.addEventListener('hashchange',sync);
    sync();
    document.body.classList.add('sxl-unified-course');
  }
  if (document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
