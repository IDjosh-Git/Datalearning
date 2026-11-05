/* Discover hub — local-only goal selection; no fabricated learner metrics. */
(() => {
  'use strict';
  const root = document.getElementById('discover-focus');
  if (!root) return;
  const options = {
    foundation:{title:'Data analysis foundations',description:'Learn how analysts frame questions, work with information and turn observations into decisions.',meta:'Beginner friendly · Guided lessons',url:'courses/introduction.html#lesson-1',icon:'icon-intro.svg'},
    excel:{title:'Excel for Data Analysis',description:'Build confidence with spreadsheet formulas, data cleaning, PivotTables and repeatable reporting.',meta:'Hands-on spreadsheets · Guided examples',url:'courses/excel.html#week1',icon:'icon-excel.svg'},
    sql:{title:'SQL for Data Analysis',description:'Start querying real-world-style tables, filtering results and understanding the logic behind useful answers.',meta:'Query fundamentals · Practical exercises',url:'courses/sql.html#week1',icon:'icon-sql.svg'},
    powerbi:{title:'Power BI and DAX',description:'Transform data into useful dashboards with Power Query, modelling, DAX and clear visual storytelling.',meta:'Business intelligence · Practical dashboards',url:'courses/powerbi.html#week1',icon:'icon-powerbi.svg'}
  };
  const buttons = [...root.querySelectorAll('[data-dh-goal]')];
  const title = root.querySelector('#dhRecommendTitle');
  const desc = root.querySelector('#dhRecommendDesc');
  const meta = root.querySelector('#dhRecommendMeta');
  const link = root.querySelector('#dhRecommendLink');
  const icon = root.querySelector('#dhRecommendIcon');
  const hint = root.querySelector('#dhSavedHint');
  const key = 'dalp-discover-goal-v1';
  function select(value,persist=false){
    const focus = options[value] || options.foundation;
    buttons.forEach(btn=>{const active=btn.dataset.dhGoal===value;btn.classList.toggle('is-selected',active);btn.setAttribute('aria-pressed',String(active));});
    title.textContent=focus.title;desc.textContent=focus.description;meta.textContent=focus.meta;link.href=focus.url;icon.src='assets/icons/'+focus.icon;
    if(persist){try{localStorage.setItem(key,value);hint.textContent='Saved on this device. You can change your goal at any time.';}catch(_){hint.textContent='Your selection is active for this visit.';}}
  }
  buttons.forEach(btn=>btn.addEventListener('click',()=>select(btn.dataset.dhGoal,true)));
  let saved='';try{saved=localStorage.getItem(key)||''}catch(_){}
  if(saved && options[saved])select(saved);
})();
