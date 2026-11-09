/* Dedicated weekly assessments with original questions and answer keys. */
(() => {
  'use strict';
  const $=s=>document.querySelector(s);
  const params=new URLSearchParams(location.search);
  const slug=params.get('course')||'';
  const week=params.get('week')||'';
  const label={introduction:'Data Analysis Foundations',excel:'Excel',sql:'SQL',powerbi:'Power BI',python:'Python for Data Analytics',ai:'AI Integration'};
  const bank=window.DALP_WEEKLY_QUIZZES||{};
  const valid=Object.prototype.hasOwnProperty.call(label,slug) && (week==='mastery' || (slug==='introduction'&&week==='final') || (/^(10|[1-9])$/.test(week)&&slug!=='introduction'));
  const data=valid?bank[slug]?.[week]:null;
  if(!valid || (!Array.isArray(data)&&week!=='mastery')){
    $('#dl-quiz-title').textContent='Assessment not found';
    $('#dl-quiz-description').textContent='Choose a valid course and week to access its questions.';
    $('#dl-weekly-mount').hidden=true;
    $('#dl-quiz-save-status').textContent='No answers or progress were changed.';
    return;
  }
  const courseUrl=`courses/${slug}.html`;
  const backUrl=slug==='introduction'?`${courseUrl}#knowledge-check`:`${courseUrl}#week${week==='mastery'?10:week}`;
  const back=$('#dl-quiz-back'); back.href=backUrl;
  $('#dl-quiz-actions-back').href=backUrl;
  $('#dl-quiz-course-crumb').href=courseUrl;
  $('#dl-quiz-course-crumb').textContent=label[slug];
  const title=week==='mastery'?'Course mastery checkpoint':slug==='introduction'?'Foundation knowledge check':`Week ${week} · Knowledge check`;
  document.title=`${title} | ${label[slug]} · DataLearning`;
  $('#dl-quiz-title').textContent=title;
  $('#dl-quiz-crumb-current').textContent=week==='mastery'?'Mastery checkpoint':week==='final'?'Final knowledge check':`Week ${week}`;
  $('#dl-quiz-description').textContent=week==='mastery'?`Put your ${label[slug]} skills to the test. Apply what you have learned and review worked explanations.`:`Check your understanding of ${label[slug]} before moving forward. Every answer is an opportunity to learn.`;
  if(week==='mastery'){
    $('#dl-weekly-mount').hidden=true;
    $('#dl-master-mount').hidden=false;
    $('#dl-quiz-counter').textContent='Course-wide checkpoint · Practice';
    $('#dl-quiz-progress-label').textContent='Answer every question';
    $('.dl-quiz-progress').hidden=true;
  } else {
    $('#dl-quiz-counter').textContent=`${data.length} questions · About ${Math.max(4,data.length*2)} minutes`;
    const form=$('#dl-quiz-form'),list=$('#dl-quiz-questions'),progress=$('.dl-quiz-progress-track');
    const render=()=>{
      list.replaceChildren();
      data.forEach((item,i)=>{
        const field=document.createElement('fieldset');field.className='dl-quiz-question';field.dataset.question=String(i);
        const heading=document.createElement('div');heading.className='dl-quiz-q-head';
        const counter=document.createElement('span');counter.className='dl-quiz-q-number';counter.textContent=String(i+1).padStart(2,'0');
        const intro=document.createElement('div');intro.className='dl-quiz-q-intro';
        const eyebrow=document.createElement('span');eyebrow.className='dl-quiz-q-kicker';eyebrow.textContent=`QUESTION ${i+1} OF ${data.length}`;
        const title=document.createElement('h2');title.id=`dl-q-${i}`;title.textContent=item.question;
        intro.append(eyebrow,title);heading.append(counter,intro);field.append(heading);
        field.setAttribute('aria-labelledby',title.id);
        const options=document.createElement('div');options.className='dl-quiz-options';
        item.options.forEach((option,j)=>{
          const choice=document.createElement('label');choice.className='dl-quiz-option';
          const radio=document.createElement('input');radio.type='radio';radio.name=`question-${i}`;radio.value=option.value;
          const letter=document.createElement('span');letter.className='dl-quiz-option-letter';letter.setAttribute('aria-hidden','true');letter.textContent=String.fromCharCode(65+j);
          const answer=document.createElement('span');answer.className='dl-quiz-option-text';answer.textContent=option.text;
          const check=document.createElement('span');check.className='dl-quiz-option-check';check.setAttribute('aria-hidden','true');check.textContent='✓';
          choice.append(radio,letter,answer,check);options.append(choice);
        });
        const feedback=document.createElement('div');feedback.className='dl-quiz-feedback';feedback.hidden=true;
        field.append(options,feedback);list.append(field);
      });
    };
    render();
    const result=$('#dl-quiz-results'),submit=$('#dl-grade');
    const count=()=>{
      const answered=[...list.querySelectorAll('.dl-quiz-question')].filter(q=>q.querySelector('input:checked')).length;
      $('#dl-quiz-progress-label').textContent=`${answered} / ${data.length} answered`;
      const pct=Math.round(answered/data.length*100);
      progress.setAttribute('aria-valuenow',String(pct));
      $('#dl-quiz-progress-fill').style.width=`${pct}%`;
      return answered;
    };
    list.addEventListener('change',e=>{
      if(!e.target.matches('input[type="radio"]'))return;
      e.target.closest('.dl-quiz-question')?.classList.remove('needs-answer');
      count();
    });
    const save=async(score)=>{
      // Best score is local to the account when verified; no impact on weekly completion.
      const user=window.DALP_AUTH_USER || await window.ZAH_DB?.client?.auth?.getUser().then(r=>r?.data?.user).catch(()=>null);
      const key=`dalp-week-quiz:${user?.id||'local'}:${slug}:${week}`;
      try{const prior=JSON.parse(localStorage.getItem(key)||'{}');localStorage.setItem(key,JSON.stringify({best:Math.max(Number(prior.best)||0,score),last:score,total:data.length,submitted:new Date().toISOString()}));}catch(_){/* storage is optional */}
      if(!user || slug==='introduction'){$('#dl-quiz-save-status').textContent='Score saved on this device. Sign in to save quiz attempts to your learning account.';return;}
      if(!window.ZAH_DB?.client){$('#dl-quiz-save-status').textContent='Score saved on this device. Cloud sync is currently unavailable.';return;}
      try{
        const row={user_id:user.id,course_slug:slug,week_no:Number(week),score,answered:data.length,total:data.length,percentage:Math.round(score/data.length*100),submitted_at:new Date().toISOString()};
        const {error}=await window.ZAH_DB.client.from('quiz_results').upsert(row,{onConflict:'user_id,course_slug,week_no'});
        if(error)throw error;
        $('#dl-quiz-save-status').textContent='Quiz score saved to your learning account. Week completion remains a separate action.';
      }catch(_){$('#dl-quiz-save-status').textContent='Quiz finished. Score saved on this device, but account sync was unavailable. You can retry later.';}
    };
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const answered=count();
      if(answered!==data.length){
        const missing=list.querySelector('.dl-quiz-question:not(:has(input:checked))');
        missing?.classList.add('needs-answer');
        result.hidden=false;result.className='dl-quiz-results dl-quiz-results-warning';
        result.textContent=`Answer the remaining ${data.length-answered} question${data.length-answered===1?'':'s'} before checking your score.`;
        missing?.scrollIntoView({behavior:'smooth',block:'center'});
        missing?.querySelector('input')?.focus({preventScroll:true});return;
      }
      let score=0;
      data.forEach((item,i)=>{
        const field=list.children[i];
        const chosen=field.querySelector('input:checked');
        const correct=chosen.value===item.answer;
        if(correct)score++;
        field.classList.toggle('is-correct',correct);
        field.classList.toggle('is-incorrect',!correct);
        field.querySelectorAll('.dl-quiz-option').forEach(el=>{
          const input=el.querySelector('input');
          el.classList.toggle('is-answer',input.value===item.answer);
          el.classList.toggle('is-wrong',input.checked && !correct);
        });
        const feedback=field.querySelector('.dl-quiz-feedback');feedback.replaceChildren();feedback.hidden=false;
        const status=document.createElement('strong');status.textContent=correct?'✓ Correct answer':'↗ Let’s review this';
        const explanation=document.createElement('p');explanation.textContent=item.explanation || 'Review the relevant lesson, then explain why the correct option fits.';
        const actual=document.createElement('p');actual.className='dl-quiz-correct-text';actual.textContent=`Correct answer: ${item.options.find(x=>x.value===item.answer)?.text||''}`;
        feedback.append(status,explanation,actual);
      });
      const pct=Math.round(score/data.length*100);
      result.hidden=false;result.className='dl-quiz-results';result.replaceChildren();
      const icon=document.createElement('span');icon.className='dl-quiz-results-icon';icon.textContent=pct>=80?'✦':'↗';
      const copy=document.createElement('div');const h=document.createElement('h2');h.textContent=`${score} of ${data.length} correct · ${pct}%`;
      const p=document.createElement('p');p.textContent=pct===100?'Excellent work. You can explain every answer. Continue to the next lesson.':pct>=70?'Good progress. Read the feedback on anything you missed and try once more.':'Your practice is paying off. Review the explanations, revisit the lesson, and retake this quiz.';
      copy.append(h,p);result.append(icon,copy);submit.textContent='Check my answers again';
      result.scrollIntoView({behavior:'smooth',block:'center'});
      void save(score);
    });
    $('#dl-retry').addEventListener('click',()=>{
      form.reset();list.querySelectorAll('.dl-quiz-question').forEach(el=>{el.classList.remove('is-correct','is-incorrect','needs-answer');el.querySelectorAll('.dl-quiz-option').forEach(x=>x.classList.remove('is-answer','is-wrong'));el.querySelector('.dl-quiz-feedback').hidden=true});
      result.hidden=true;submit.innerHTML='Check my answers <span aria-hidden="true">→</span>';count();
      list.querySelector('input')?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'smooth'});
    });
    count();
  }
  if(slug!=='introduction'&&week!=='mastery'){
    const n=Number(week);for(const [id,wn] of [['dl-prev-quiz',n-1],['dl-next-quiz',n+1]]){
      const a=$('#'+id);if(wn>=1&&wn<=10){a.href=`quiz.html?course=${slug}&week=${wn}`;a.hidden=false;}
    }
  }
})();
