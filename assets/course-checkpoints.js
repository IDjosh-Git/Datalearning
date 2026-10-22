/* Offline, auto-scored course checkpoints: original questions, no AI service. */
(function(){'use strict';const bank={
introduction:[['Which is a correctly specified KPI?',['Sales are weak','Increase monthly net revenue by 10% versus the same month last year','Customers seem unhappy','Make a better dashboard'],1,'A measurable metric needs a definition, comparison period and target.'],['Why preserve leading zeros in customer ID 00125?',['They increase the customer count','Identifiers are categorical labels, not measures','Every number must be text','To improve chart colors'],1,'Identifiers are labels, not values for arithmetic.'],['A correlation between advertising and sales demonstrates:',['That advertising caused all sales','That neither variable can be measured','Association, not necessarily causation','That the data is inaccurate'],2,'Confounders and seasonality can explain some correlations.']],
excel:[['Which formula sums sales in B2:B7 for East in C2:C7?',['=COUNTIF(C2:C7,"East")','=SUMIF(C2:C7,"East",B2:B7)','=SUM(B2:B7,"East")','=AVERAGEIF(B2:B7,"East")'],1,'SUMIF combines criteria and sum ranges in that order.'],['What happens when copying $A$1 from D2 to D3?',['It changes to $A$2','It becomes A1','It remains $A$1','It becomes #REF!'],2,'Absolute column and row references remain fixed.'],['What is the best tool to summarise revenue by region interactively in Excel?',['Conditional formatting alone','A PivotTable with a region field','Find and Replace','Freeze Panes'],1,'PivotTables summarise dimensions and measures and support filtering.']],
sql:[['Which clause filters grouped totals?',['WHERE','ORDER BY','HAVING','LIMIT'],2,'HAVING applies after grouping; WHERE filters source rows.'],['Which join preserves every left-table record?',['INNER JOIN','LEFT JOIN','CROSS JOIN','SELF JOIN'],1,'LEFT JOIN keeps all left rows and matches available right rows.'],['What does COUNT(amount) omit?',['Rows with zero amounts','Rows where amount is NULL','All duplicate amounts','Rows with amounts greater than zero'],1,'COUNT(column) skips NULL and counts zeros.']],
powerbi:[['Where should a transaction-level SalesAmount be stored in a star schema?',['Fact sales table','Calendar dimension only','Customer attribute table','Role table'],0,'Additive numeric metrics belong in the fact table at its stated grain.'],['Which DAX function changes filter context in measures?',['CONCATENATE','CALCULATE','FORMAT','RELATEDTABLE'],1,'CALCULATE evaluates an expression in a modified filter context.'],['What usually improves a Power BI model?',['Bidirectional filters on every relation','One large flat table for every need','A clear star schema with appropriate relationships','Calculated columns for all measures'],2,'Good star schemas support clear dimensions and efficient measures.']],
ai:[['What should you do with AI-generated numerical conclusions?',['Publish them unchanged','Validate against source records and calculations','Assume they are accurate','Remove the source data'],1,'AI outputs can hallucinate values and must be verified.'],['Which prompt is most useful for an analytical task?',['Analyse this','Do it quickly','Calculate monthly net sales by region, excluding cancelled orders, and explain assumptions','Give numbers'],2,'Clear definitions, scope, filters, and format improve reproducibility.'],['Before pasting sensitive customer data into an AI system, you should:',['Remove controls to improve performance','Ensure approved handling and minimise or de-identify data','Add personal identifiers','Publish the data'],1,'Data minimization, privacy and organization rules apply to AI workflows.']]};
const course=location.pathname.split('/').pop().replace('.html','');
if(!Object.prototype.hasOwnProperty.call(bank,course))return;
const questions=bank[course], key='dalp-checkpoint-'+course;
const escapeHTML=value=>String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
// Place the mastery assessment inside the existing course reading column rather than
// appending an unconstrained, full-viewport section directly to <main>.
const main=document.querySelector('main')||document.body;
const anchor=main.querySelector('.content')||main.querySelector('.course-wrap')||main;
const shell=document.createElement('div');
shell.className='course-mastery-wrap';
shell.id='course-mastery-checkpoint';
const section=document.createElement('section');
section.className='study-studio course-mastery';
section.setAttribute('aria-labelledby','dalp-mastery-title');
section.innerHTML=`<header class="course-mastery-head">
  <span class="studio-eyebrow">COURSE MASTERY CHECKPOINT</span>
  <h2 id="dalp-mastery-title">Check your understanding</h2>
  <p>Three short questions to check how well you can apply this course. Choose one answer for each, then review the explanations. You can try again.</p>
  <div class="course-mastery-meta"><span>3 questions · About 3 minutes</span><strong id="dalp-mastery-count" aria-live="polite">0 of 3 answered</strong></div>
</header>
<form id="dalp-mastery-form" novalidate><div id="dalp-questions" class="course-mastery-questions"></div>
  <div class="course-mastery-actions"><button type="submit" id="dalp-grade" class="studio-done">Check my answers</button><button type="button" id="dalp-retry" class="course-mastery-retry" hidden>Try again</button></div>
  <div class="course-mastery-outcome" id="dalp-outcome" role="status" aria-live="polite"></div>
</form>
<p class="course-mastery-foot">This is a practice checkpoint, not a certificate assessment. Review the lesson and retry to build confidence.</p>`;
shell.appendChild(section);
anchor.appendChild(shell);
// Intro uses a narrow study-grid: the full-width checkpoint belongs after the lesson
// grid rather than as a third (overflowing) grid cell.
if(course==='introduction'){
 const grid=main.querySelector('.intro-body');
 if(grid)grid.insertAdjacentElement('afterend',shell);
 shell.classList.add('course-mastery-intro');
}
const list=section.querySelector('#dalp-questions');
list.innerHTML=questions.map((q,i)=>`<fieldset class="course-mastery-question" data-question="${i}">
  <legend><span class="course-mastery-number">${String(i+1).padStart(2,'0')}</span>${escapeHTML(q[0])}</legend>
  <div class="course-mastery-options">${q[1].map((answer,j)=>`<label class="course-mastery-option"><input type="radio" name="checkpoint${i}" value="${j}"/><span>${escapeHTML(answer)}</span></label>`).join('')}</div>
</fieldset>`).join('');
const count=section.querySelector('#dalp-mastery-count');
const outcome=section.querySelector('#dalp-outcome');
const retry=section.querySelector('#dalp-retry');
const form=section.querySelector('#dalp-mastery-form');
const getAnswer=i=>section.querySelector(`input[name="checkpoint${i}"]:checked`);
function updateCount(){const answered=questions.filter((_,i)=>Boolean(getAnswer(i))).length;count.textContent=`${answered} of ${questions.length} answered`;return answered;}
form.addEventListener('change',()=>{updateCount();outcome.textContent='';section.querySelectorAll('.course-mastery-question').forEach(node=>node.classList.remove('needs-answer'));});
form.addEventListener('submit',event=>{
 event.preventDefault();
 const answered=updateCount();
 if(answered!==questions.length){
  outcome.innerHTML=`<p class="course-mastery-warning">Answer all ${questions.length} questions before checking your score.</p>`;
  const first=questions.findIndex((_,i)=>!getAnswer(i));
  section.querySelectorAll('.course-mastery-question').forEach((node,i)=>node.classList.toggle('needs-answer',!getAnswer(i)));
  const target=section.querySelector(`input[name="checkpoint${first}"]`);
  if(target)target.focus({preventScroll:true});
  return;
 }
 let score=0;
 const details=questions.map((q,i)=>{
  const actual=Number(getAnswer(i).value),right=actual===q[2];
  if(right)score++;
  return `<li class="${right?'is-correct':'needs-review'}"><strong>Question ${i+1}: ${right?'Correct':'Review this'}.</strong> ${escapeHTML(q[3])}<span>Correct answer: ${escapeHTML(q[1][q[2]])}</span></li>`;
 }).join('');
 let best=score;
 try{
  const old=JSON.parse(localStorage.getItem(key)||'{}');
  best=Math.max(score,Number(old.best)||0);
  localStorage.setItem(key,JSON.stringify({best,latest:score,total:questions.length,date:new Date().toISOString()}));
 }catch(e){}
 outcome.innerHTML=`<div class="course-mastery-result"><div class="course-mastery-score"><strong>${score} / ${questions.length}</strong><span>${score===questions.length?'Well done! You have mastered this checkpoint.':'Good effort. Use the feedback below to improve.'}</span></div><p>Personal best: ${best} / ${questions.length}</p><ol class="course-mastery-review">${details}</ol></div>`;
 retry.hidden=false;
 outcome.scrollIntoView({behavior:'auto',block:'nearest'});
});
retry.addEventListener('click',()=>{
 form.reset();outcome.textContent='';retry.hidden=true;updateCount();
 const first=list.querySelector('input');if(first)first.focus({preventScroll:true});
});
updateCount();
})();
