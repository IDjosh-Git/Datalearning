/* DataLearning guided study journey. Local-only, learner-scoped, and independent of official progress. */
(()=>{'use strict';
const root=document.getElementById('study-plan');if(!root)return;
const $=id=>document.getElementById(id);
const pythonSkills=[
 ['Variables and data types','Describe how integers, floats, strings and booleans support calculations.','amount = 125.5','Write a Python expression for a 12% tax on amount and explain the result.','tax = amount * 0.12; the result is 15.06.','Confusing string values with numeric values.'],
 ['Lists and dictionaries','Organise data and access fields safely.','row = {"region":"North","sales":250}','Write Python to read the sales value from row and explain the chosen key.','row["sales"] evaluates to 250. Use a valid key, or .get for optional fields.','Using positional indexes for a dictionary key.'],
 ['Loops and comprehensions','Apply a transformation to each observation.','numbers = [4, 7, 9]','Create a list containing each number multiplied by two.','[value * 2 for value in numbers] gives [8, 14, 18].','Mutating a list while iterating over it unnecessarily.'],
 ['Pandas DataFrames','Interpret rows, columns and data types before analysis.','import pandas as pd','How can you check the column names and data types of a DataFrame called df?','df.info() summarises columns, non-null counts and dtypes; df.dtypes lists types.','Assuming a numeric-looking object column is already numeric.'],
 ['Reading and validating CSV files','Load source data and verify shape and expected fields.','df = pd.read_csv("orders.csv")','Give two checks immediately after loading a CSV.','Check df.shape and df.head(), then inspect df.dtypes and missing values.','Assuming successful import means accurate field types.'],
 ['Missing values and data quality','Measure nulls before deciding how to handle them.','df.isna().sum()','Write a check for missing counts in each column.','df.isna().sum() returns null counts by column. Decide handling from business context.','Dropping missing values blindly without investigating why.'],
 ['Duplicate keys and granularity','Detect duplicates using the correct business key.','df.duplicated(subset=["order_id"])','Count duplicated order IDs and explain why row grain matters.','df.duplicated(subset=["order_id"]).sum() counts repeat keys after the first.','Treating legitimate multiple line items as accidental duplicates.'],
 ['Filtering and selecting','Extract business-relevant observations with explicit conditions.','df.loc[df["status"] == "Paid"]','Select only paid orders and the columns order_id and amount.','df.loc[df["status"] == "Paid", ["order_id", "amount"]]','Using assignment = instead of comparison ==.'],
 ['GroupBy analytics','Aggregate consistently using a named metric and grain.','df.groupby("region")["sales"].sum()','Calculate total sales by region and explain what happens to missing regions.','df.groupby("region", dropna=False)["sales"].sum() retains null group keys.','Unintentionally omitting missing group categories.'],
 ['Joining datasets','Check join cardinality and key uniqueness.','orders.merge(customers, on="customer_id")','How do you validate a many-to-one merge with customers?','orders.merge(customers, on="customer_id", validate="many_to_one")','Ignoring join duplication or unmatched keys.'],
 ['Dates and time series','Parse dates before monthly aggregation.','df["order_date"] = pd.to_datetime(df["order_date"])','Create a monthly period from a parsed order_date column.','df["month"] = df["order_date"].dt.to_period("M")','Grouping text dates instead of parsed timestamps.'],
 ['Reproducible reporting','Document inputs, assumptions, validation and outputs.','df.to_csv("summary.csv", index=False)','Name four items that make a Python analysis reproducible.','Record source/version, transformation steps, validation results and environment/dependencies.','Sharing only the final chart without a reproducible process.']
];
let catalog={...(window.COURSE_STUDIO_DATA||{}),python:pythonSkills};
const labels={introduction:'Data analysis foundations',excel:'Excel analytics',sql:'SQL analytics',powerbi:'Power BI & DAX',python:'Python analytics',ai:'AI for analysts'};
const colors={introduction:'#7258cf',excel:'#137e62',sql:'#246bb6',powerbi:'#94630b',python:'#455dc1',ai:'#8750ac'};
const stages=['Read and understand the concept','Attempt the guided exercise','Explain the result from memory'];
const startAt={new:0,some:2,confident:5};
const initial={course:'introduction',experience:'new',minutes:30};
const storedGoal=(()=>{try{return localStorage.getItem('dalp-discover-goal-v1')}catch{return null}})();
const discovered={foundation:'introduction',excel:'excel',sql:'sql',powerbi:'powerbi',python:'python',ai:'ai'}[storedGoal];
let storageKey='',model={},prefs={...initial,course:discovered||'introduction'},focus=0,shown=false;
const validCourse=c=>Object.hasOwn(labels,c)&&Array.isArray(catalog[c])&&catalog[c].length>0;
const safeState=s=>s&&typeof s==='object'&&!Array.isArray(s)?s:{};
function learnerId(){return window.DALP_AUTH_USER?.id||'guest'}
function restore(){storageKey='dalp-study-success-v1:'+learnerId();let saved={};try{saved=safeState(JSON.parse(localStorage.getItem(storageKey)||'{}'))}catch{}
 model={plans:safeState(saved.plans),preferences:safeState(saved.preferences)};
 const p=model.preferences;
 prefs={course:validCourse(p.course)?p.course:(validCourse(discovered)?discovered:'introduction'),experience:Object.hasOwn(startAt,p.experience)?p.experience:'new',minutes:[15,30,60].includes(Number(p.minutes))?Number(p.minutes):30};
 $('ss-course').value=prefs.course;$('ss-experience').value=prefs.experience;$('ss-minutes').value=String(prefs.minutes);focus=0;shown=false;
 render();
 if(learnerId()!=='guest')setStatus('Your signed-in study plan is separate from other learners on this device.');
}
function setStatus(message){$('ss-status').textContent=message;}
function persist(){model.preferences={...prefs};try{localStorage.setItem(storageKey,JSON.stringify(model));return true}catch{setStatus('Browser storage is unavailable. Keep a copy of your reflections using Export.');return false}}
const activeId=()=>prefs.course+':'+prefs.experience;
function activePlan(){const id=activeId();if(!model.plans[id]||typeof model.plans[id]!=='object'||Array.isArray(model.plans[id]))model.plans[id]={};return model.plans[id]}
function session(i){const data=catalog[prefs.course]||[];const base=Math.min(startAt[prefs.experience]||0,Math.max(0,data.length-7));return {index:Math.min(base+i,Math.max(0,data.length-1)),unit:data[Math.min(base+i,Math.max(0,data.length-1))]||['Getting started','Begin with the lesson and revisit the key idea.','','Explain what you learned.','Describe the main concept in your own words.','']}}
function readEntry(i){const entries=safeState(activePlan().entries);const e=safeState(entries[i]);return {steps:Array.isArray(e.steps)?stages.map((_,j)=>e.steps[j]===true):[false,false,false],response:typeof e.response==='string'?e.response.slice(0,2500):'',confidence:['notyet','developing','confident'].includes(e.confidence)?e.confidence:'notyet'};}
function writeEntry(i,e){const plan=activePlan();plan.entries=safeState(plan.entries);plan.entries[i]={steps:e.steps.map(x=>x===true),response:e.response.slice(0,2500),confidence:e.confidence};persist();}
function complete(i){return readEntry(i).steps.every(Boolean)}
function allDone(){return Array.from({length:7},(_,i)=>i).filter(complete).length}
function renderSummary(){const finished=allDone(),percent=Math.round(finished/7*100);$('ss-plan-count').textContent=`${finished} of 7 sessions complete`;$('ss-percent').textContent=percent+'%';$('ss-meter-bar').style.width=percent+'%';root.querySelector('.ss-meter').setAttribute('aria-valuenow',String(percent));}
function renderList(){const list=$('ss-session-list');list.replaceChildren();for(let i=0;i<7;i++){
 const skill=session(i),entry=readEntry(i),li=document.createElement('li');li.className='ss-session'+(complete(i)?' ss-session-done':'')+(i===focus?' ss-session-active':'');
 const head=document.createElement('div');head.className='ss-session-heading';const num=document.createElement('span');num.className='ss-session-number';num.textContent=String(i+1).padStart(2,'0');const copy=document.createElement('span');copy.className='ss-session-copy';const title=document.createElement('strong');title.textContent=skill.unit[0];const sub=document.createElement('small');sub.textContent=`Session ${i+1} · ${prefs.minutes} min · ${complete(i)?'Completed':'At your pace'}`;copy.append(title,sub);
 const go=document.createElement('button');go.type='button';go.className='ss-open-session';go.dataset.focus=String(i);go.textContent=i===focus?'Reviewing ↗':'Recall & explain ↗';go.setAttribute('aria-label',`Review session ${i+1}: ${skill.unit[0]}`);head.append(num,copy,go);
 const checks=document.createElement('div');checks.className='ss-session-checks';stages.forEach((stage,j)=>{const label=document.createElement('label');label.className='ss-check';const input=document.createElement('input');input.type='checkbox';input.checked=entry.steps[j];input.dataset.session=String(i);input.dataset.stage=String(j);input.setAttribute('aria-label',`Session ${i+1}: ${stage}`);const name=document.createElement('span');name.textContent=['Understand','Apply','Recall'][j];label.append(input,name);checks.append(label)});
 const links=document.createElement('div');links.className='ss-session-links';const learn=document.createElement('a');learn.href=`courses/${prefs.course}.html`;learn.textContent='Open course ↗';const exercise=document.createElement('a');exercise.href=prefs.course==='python'?'practice.html?tool=Python':`studio.html?course=${prefs.course}&skill=${skill.index+1}`;exercise.textContent=prefs.course==='python'?'Python challenge ↗':'Guided exercise ↗';links.append(learn,exercise);li.append(head,checks,links);list.append(li);
 }
 renderSummary();}
function renderRecall(){const {index,unit}=session(focus),entry=readEntry(focus);$('ss-question-label').textContent=`SESSION ${focus+1} · ${labels[prefs.course].toUpperCase()}`;$('ss-recall-skill').textContent=unit[0];$('ss-recall-question').textContent=unit[3]||unit[1]||'Summarise the idea in your own words.';$('ss-attempt').value=entry.response;$('ss-confidence').value=entry.confidence;$('ss-solution-text').textContent=unit[4]||'Review the course and compare your explanation with its worked example.';$('ss-pitfall').textContent=unit[5]?'Common pitfall: '+unit[5]:'';$('ss-solution').hidden=true;$('ss-reveal').textContent='Reveal worked answer';shown=false;$('ss-studio-link').href=prefs.course==='python'?'practice.html?tool=Python':`studio.html?course=${prefs.course}&skill=${index+1}`;$('ss-studio-link').firstChild.textContent=prefs.course==='python'?'Open Python challenges ':'Open guided exercise ';
 $('ss-guidance').textContent=entry.confidence==='confident'?'Try a new problem without notes to confirm your confidence.':entry.confidence==='developing'?'Revisit the worked example, then practise again without looking.':'Start with the course explanation, then ask the Tutor to clarify what you missed.';}
function render(){root.style.setProperty('--ss-accent',colors[prefs.course]||'#6250bd');$('ss-course-label').textContent=labels[prefs.course];$('ss-time-badge').textContent=prefs.minutes+' min / session';$('ss-plan-description').textContent=({new:'Start with core ideas and build confidence step by step.',some:'Move from your foundations to stronger practical skills.',confident:'Focus on deeper application and explaining your reasoning.'})[prefs.experience];renderList();renderRecall();}
$('ss-plan-form').addEventListener('submit',e=>{e.preventDefault();const course=$('ss-course').value,experience=$('ss-experience').value,minutes=Number($('ss-minutes').value);if(!validCourse(course)||!Object.hasOwn(startAt,experience)||![15,30,60].includes(minutes)){setStatus('Select a course, confidence level and session duration.');return;}prefs={course,experience,minutes};focus=0;persist();render();setStatus(`Study route ready: ${labels[course]}. Your existing sessions for this route are preserved.`);$('ss-route-title').focus?.({preventScroll:true});});
$('ss-session-list').addEventListener('change',e=>{const el=e.target;if(!el.matches('input[data-session][data-stage]'))return;const i=Number(el.dataset.session),j=Number(el.dataset.stage);if(!Number.isInteger(i)||i<0||i>=7||j<0||j>=3)return;const entry=readEntry(i);entry.steps[j]=el.checked;writeEntry(i,entry);renderList();const successor=$('ss-session-list').querySelector(`input[data-session="${i}"][data-stage="${j}"]`);successor?.focus({preventScroll:true});setStatus(complete(i)?`Session ${i+1} marked complete. Choose the next skill when ready.`:`Session ${i+1} updated. You can return to this activity later.`);});
$('ss-session-list').addEventListener('click',e=>{const b=e.target.closest('button[data-focus]');if(!b)return;focus=Number(b.dataset.focus);renderList();renderRecall();$('study-recall').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});$('ss-recall-skill').setAttribute('tabindex','-1');$('ss-recall-skill').focus({preventScroll:true});});
$('ss-reveal').addEventListener('click',()=>{shown=!shown;$('ss-solution').hidden=!shown;$('ss-reveal').textContent=shown?'Hide worked answer':'Reveal worked answer';});
$('ss-confidence').addEventListener('change',e=>{const val=e.target.value;$('ss-guidance').textContent=val==='confident'?'Try a new problem without notes to confirm your confidence.':val==='developing'?'Revisit the worked example, then practise again without looking.':'Start with the course explanation, then ask the Tutor to clarify what you missed.';});
$('ss-save').addEventListener('click',()=>{const response=$('ss-attempt').value.trim();if(response.length<12){setStatus('Write at least one short explanation before saving your recall attempt.');$('ss-attempt').focus();return;}const entry=readEntry(focus);entry.response=response;entry.confidence=$('ss-confidence').value;entry.steps[2]=true;writeEntry(focus,entry);renderList();setStatus(`Reflection saved for session ${focus+1}. Your independent recall is marked complete.`);});
$('ss-export').addEventListener('click',()=>{const info={product:'DataLearning personal study plan',version:1,exported_at:new Date().toISOString(),preferences:prefs,plans:model.plans};const blob=new Blob([JSON.stringify(info,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='DataLearning-study-plan.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);setStatus('Study-plan backup downloaded. Keep it private; it may include your written reflections.');});
$('ss-import').addEventListener('click',()=>$('ss-import-file').click());
$('ss-import-file').addEventListener('change',async e=>{
 const file=e.target.files?.[0];e.target.value='';if(!file)return;
 if(file.size>500000){setStatus('The file is too large for a study-plan backup (500 KB maximum).');return;}
 try{
  const backup=JSON.parse(await file.text());
  if(backup.version!==1||backup.product!=='DataLearning personal study plan'||!backup.plans||typeof backup.plans!=='object'||Array.isArray(backup.plans)||!backup.preferences||typeof backup.preferences!=='object')throw Error('Invalid backup structure');
  if(Object.keys(backup.plans).length>35)throw Error('Too many saved plans');
  const sanitized={};
  for(const [id,plan] of Object.entries(backup.plans)){
   if(!/^(introduction|excel|sql|powerbi|python|ai):(new|some|confident)$/.test(id)||!plan||typeof plan!=='object'||Array.isArray(plan))continue;
   const entries=safeState(plan.entries),clean={};
   for(const [i,item] of Object.entries(entries)){
    if(!/^[0-6]$/.test(i)||!item||typeof item!=='object')continue;
    clean[i]={steps:stages.map((_,j)=>item.steps?.[j]===true),response:typeof item.response==='string'?item.response.slice(0,2500):'',confidence:['notyet','developing','confident'].includes(item.confidence)?item.confidence:'notyet'};
   }
   sanitized[id]={entries:clean};
  }
  if(!Object.keys(sanitized).length)throw Error('No valid study sessions');
  if(!window.confirm('Replace your saved study plan on this device with the selected backup? Export your current plan first if you want to keep it.'))return;
  const p=backup.preferences;
  model={plans:sanitized,preferences:{course:validCourse(p.course)?p.course:'introduction',experience:Object.hasOwn(startAt,p.experience)?p.experience:'new',minutes:[15,30,60].includes(Number(p.minutes))?Number(p.minutes):30}};
  prefs={...model.preferences};persist();restore();setStatus('Study plan imported. Your previous plan on this device was replaced.');
 }catch{setStatus('Unable to import: choose a valid DataLearning study-plan JSON backup.');}
});
window.addEventListener('dalp:auth-ready',()=>{if(storageKey!=='dalp-study-success-v1:'+learnerId())restore();});
function prepare(){
 if(window.COURSE_STUDIO_DATA){catalog={...window.COURSE_STUDIO_DATA,python:pythonSkills};restore();return;}
 const candidate=document.createElement('script');candidate.src='assets/scripts/course-studio-data.js';candidate.async=true;
 candidate.onload=()=>{catalog={...(window.COURSE_STUDIO_DATA||{}),python:pythonSkills};if(!validCourse('introduction')){setStatus('The guided study catalogue is unavailable. Try reloading.');return;}restore();};
 candidate.onerror=()=>{setStatus('The guided study catalogue could not load. Try again when the page is connected.');$('ss-session-list').replaceChildren();};
 document.head.append(candidate);
}
prepare();
})();
