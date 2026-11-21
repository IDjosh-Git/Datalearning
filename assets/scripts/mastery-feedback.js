/* Formative mastery checks: per-user cloud workspace state; not official grades. */
(() => {
  'use strict';
  const bank = {
    introduction: {title:'Data Analysis',url:'courses/introduction.html',items:[
      ['A shop reports that sales fell 20%. What should an analyst do first?',['Recommend more advertising immediately','Confirm the metric, time period and source data','Delete low-sales records'],1,'Validate the definition, time range and data quality before recommending action.'],
      ['A dataset contains one row per item sold. What is its grain?',['One transaction item','One customer','One month'],0,'Grain describes exactly what a single row represents.']]},
    excel:{title:'Excel',url:'courses/excel.html',items:[
      ['A tax rate is stored in F1. Which reference stays fixed when copied down?',['F1','$F$1','F$1 only when copied across'],1,'$F$1 locks both column and row.'],
      ['A PivotTable shows unexpected doubled totals. What should you inspect?',['Source records and duplicate keys','The font size','The worksheet tab colour'],0,'Reconcile source grain and duplicates before trusting aggregates.']]},
    sql:{title:'SQL',url:'courses/sql.html',items:[
      ['You need customers with total spending above 100,000 after grouping. Which clause filters totals?',['WHERE','HAVING','ORDER BY'],1,'HAVING filters aggregated groups; WHERE filters source rows before grouping.'],
      ['A JOIN unexpectedly doubles revenue. What is the best first check?',['Remove all JOINs','Check key uniqueness and join cardinality','Add DISTINCT without investigating'],1,'Non-unique join keys can multiply rows and inflate totals.']]},
    powerbi:{title:'Power BI',url:'courses/powerbi.html',items:[
      ['A sales fact table relates to a product dimension. Which side usually holds unique ProductID?',['FactSales','DimProduct','Both tables must be unique'],1,'The dimension key is unique on the one side; many fact rows can reference it.'],
      ['A measure changes when a slicer is selected. What is the key DAX concept?',['Filter context','Font formatting','Data source compression'],0,'Filter context controls which rows contribute to measure evaluation.']]},
    tableau:{title:'Tableau',url:'courses/tableau.html',items:[
      ['You need sales by region. Which field generally defines the categories?',['Region dimension','Sales measure','Tooltip text'],0,'Dimensions partition the view; measures provide numeric aggregation.'],
      ['A fixed LOD result differs from a view-level aggregate. What should you examine?',['Level of detail and filter order','Colour palette only','Workbook filename'],0,'LOD expressions and filter order affect the granularity of calculations.']]},
    powerquery:{title:'Power Query',url:'courses/powerquery.html',items:[
      ['You have identical monthly CSV columns and need one long table. Use:',['Append','Merge','Pivot'],0,'Append stacks rows; merge joins columns using matching keys.'],
      ['A refreshed file adds a new column. What should you check?',['Schema-dependent steps and refresh behaviour','Only report background colour','Disable all data-quality checks'],0,'Type, select, reorder and rename steps can fail when schemas drift.']]},
    statistics:{title:'Statistics',url:'courses/statistics.html',items:[
      ['Two variables are correlated. Which statement is justified?',['One causes the other','They vary together, but causation is unproven','Both are normally distributed'],1,'Correlation alone cannot establish causation.'],
      ['An extreme outlier pulls the average upward. Which summary is often more robust?',['Median','Maximum','Range'],0,'The median is less sensitive to extreme values than the mean.']]},
    python:{title:'Python',url:'courses/python.html',items:[
      ['In pandas, which operation groups sales by region before summing?',['groupby followed by sum','sort_values only','head only'],0,'groupby partitions records and sum aggregates each group.'],
      ['A merge doubles your row count unexpectedly. What should you inspect?',['Join keys and duplicate matches','Chart title','Notebook theme'],0,'Validate join cardinality and key uniqueness before accepting the output.']]},
    ai:{title:'AI for Data Professionals',url:'courses/ai.html',items:[
      ['An AI assistant generates a plausible SQL query. What next?',['Run and validate against expected results','Assume it is correct','Share confidential records publicly'],0,'AI output must be tested for correctness, safety and data handling.'],
      ['A model invents a source that does not exist. This is an example of:',['Hallucination','Normalization','Indexing'],0,'Check cited sources and independently verify factual claims.']]}
  };
  const $=id=>document.getElementById(id);
  const select=$('masteryCourse'),question=$('masteryQuestion'),feedback=$('masteryFeedback'),next=$('masteryNext'),reset=$('masteryReset'),plan=$('masteryPlan');
  if(!select||!question||!feedback||!next||!reset||!plan)return;
  const STORAGE_KEY='dalp-formative-mastery-v2';
  let history={},index=0,answered=false;
  function restore(){
    try { const parsed=JSON.parse(window.DALP_STORAGE?.getItem(STORAGE_KEY)||'{}');
      history=Object.fromEntries(Object.entries(parsed).filter(([key,value])=>bank[key]&&Array.isArray(value)).map(([key,value])=>[key,value.filter(r=>Number.isInteger(r.index)&&r.index>=0&&r.index<bank[key].items.length&&typeof r.correct==='boolean').slice(-100)]));
    }catch{history={}}
    renderPlan();
  }
  window.addEventListener('dalp:cloud-hydrated',restore);
  window.addEventListener('dalp:auth-ready',()=>void window.DALP_CLOUD_WORKSPACE?.hydrate?.().then(restore));
  Object.entries(bank).forEach(([id,course])=>{const opt=document.createElement('option');opt.value=id;opt.textContent=course.title;select.append(opt)});
  const requested=new URLSearchParams(location.search).get('course');if(requested&&bank[requested])select.value=requested;
  function save(){
    if(!window.DALP_CLOUD_WORKSPACE?.ready){const note=document.createElement('p');note.className='mastery-muted';note.textContent='Answer checked; sign in to save attempts to your account.';feedback.append(note);return}
    window.DALP_STORAGE?.setItem(STORAGE_KEY,JSON.stringify(history));
    void window.DALP_CLOUD_WORKSPACE.persist(STORAGE_KEY).then(ok=>{
      if(!ok){const note=document.createElement('p');note.className='mastery-muted';note.textContent='Cloud save is pending. Reconnect and retry before leaving.';feedback.append(note)}
    });
  }
  function renderPlan(){plan.replaceChildren();const records=history[select.value]||[];const attempts=records.length,correct=records.filter(r=>r.correct).length;const summary=document.createElement('p');summary.textContent=attempts?`${correct} correct out of ${attempts} submitted attempts. This is practice evidence, not certified mastery.`:'No attempts yet. Answer a scenario to receive targeted revision guidance.';plan.append(summary);
    const weak=[...new Set(records.filter(r=>!r.correct).map(r=>r.index))];const strong=[...new Set(records.filter(r=>r.correct).map(r=>r.index))];
    const div=document.createElement('div');div.className='mastery-plan-card';const heading=document.createElement('h3');heading.textContent=weak.length?'Priority: revisit these concepts':'Recommended next step';div.append(heading);
    const p=document.createElement('p');p.textContent=weak.length?weak.map(i=>bank[select.value].items[i][0]).join(' · '):strong.length?'Continue to a fresh exercise and verify your work independently.':'Start with the course introduction, then attempt the first scenario.';div.append(p);
    const a=document.createElement('a');a.href=bank[select.value].url;a.textContent='Review course lessons →';div.append(a);plan.append(div);
    const links=document.createElement('p');links.className='mastery-muted';
    const practice=document.createElement('a');practice.href='practice.html';practice.textContent='Practice Arena';
    const capstone=document.createElement('a');capstone.href='capstone.html?course='+encodeURIComponent(select.value);capstone.textContent='Capstone';
    const tutor=document.createElement('a');tutor.href='tutor.html?topic='+encodeURIComponent(select.value)+'&mode=hint&q='+encodeURIComponent('Give me one hint, not the answer, for this '+bank[select.value].title+' concept: '+(weak.length?bank[select.value].items[weak[0]][0]:'Help me practise the current topic'));tutor.textContent='Ask for a tutor hint';
    links.append(practice,' · ',capstone,' · ',tutor);plan.append(links);
  }
  function render(){answered=false;feedback.replaceChildren();question.replaceChildren();const item=bank[select.value].items[index];const field=document.createElement('fieldset');const legend=document.createElement('legend');legend.textContent=`Scenario ${index+1} of ${bank[select.value].items.length}: ${item[0]}`;field.append(legend);
    item[1].forEach((option,i)=>{const label=document.createElement('label');label.className='mastery-option';const radio=document.createElement('input');radio.type='radio';radio.name='masteryAnswer';radio.value=String(i);label.append(radio,document.createTextNode(option));field.append(label)});question.append(field);
    const submit=document.createElement('button');submit.type='button';submit.textContent='Check my answer';submit.addEventListener('click',()=>{if(answered)return;const chosen=question.querySelector('input:checked');if(!chosen){feedback.textContent='Choose an answer before checking.';return}answered=true;const correct=Number(chosen.value)===item[2];const entry=document.createElement('div');entry.className=`mastery-result ${correct?'good':'retry'}`;const lead=document.createElement('strong');lead.textContent=correct?'Correct.':'Not quite.';const explain=document.createElement('p');explain.textContent=`${item[3]} Correct answer: ${item[1][item[2]]}.`;entry.append(lead,explain);feedback.replaceChildren(entry);question.querySelectorAll('input').forEach(x=>x.disabled=true);submit.disabled=true;history[select.value]??=[];history[select.value].push({index,correct,at:new Date().toISOString()});history[select.value]=history[select.value].slice(-100);save();renderPlan()});question.append(submit);renderPlan();}
  restore();
  select.addEventListener('change',()=>{index=0;render()});next.addEventListener('click',()=>{index=(index+1)%bank[select.value].items.length;render()});reset.addEventListener('click',()=>{if(!confirm('Clear this course’s local formative practice attempts?'))return;delete history[select.value];save();render()});render();
})();
