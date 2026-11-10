/** DataLearning Academy: course browser, weekly lessons, progress and assessments. */
(() => {
  'use strict';
  const catalog = Array.isArray(window.DALP_ACADEMY) ? window.DALP_ACADEMY : [];
  const courses = Object.fromEntries(catalog.map(path => [path.slug, path]));
  const root = document.documentElement;
  const base = root.dataset.base || '';
  const page = root.dataset.academyPage || '';
  const one = (s, context=document) => context.querySelector(s);
  const all = (s, context=document) => [...context.querySelectorAll(s)];
  const safe = input => String(input ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const courseHref = slug => base + 'courses/' + encodeURIComponent(slug) + '.html';
  const quizHref = (slug, week) => base + 'quiz.html?course=' + encodeURIComponent(slug) + '&week=' + encodeURIComponent(week);
  const pathFor = slug => courses[slug];
  const num = week => String(week).padStart(2,'0');
  const labelFor = slug => slug === 'introduction' ? 'Data Analysis' : courses[slug]?.title || slug;
  const icon = slug => ({introduction:'◉',excel:'▦',sql:'⌗',powerbi:'▥',tableau:'◫',powerquery:'⇆',statistics:'Σ'})[slug] || '◈';
  const track = slug => window.ZAHProgressCloud?.COURSE_MAP?.[slug];
  const readProgress = slug => {
    const map = track(slug);
    if (!map) return {};
    try { return window.ZAHProgressCloud.readLocal(map.key) || {}; } catch (_) {return {};}
  };
  const completedCount = slug => Object.values(readProgress(slug)).filter(v => v === true).length;
  const percent = slug => Math.min(100, Math.round(completedCount(slug) * 100 / (courses[slug]?.weeks.length || 10)));
  const user = async () => {
    try {return (await window.ZAH_DB?.client?.auth?.getUser())?.data?.user || null;} catch (_) {return null;}
  };
  async function syncCourse(slug, onUpdate) {
    if (!window.ZAHProgressCloud?.syncCourse || !window.ZAH_DB?.client) return;
    try {
      if (!(await user())) return;
      const result = await window.ZAHProgressCloud.syncCourse(slug);
      if (result?.ok) onUpdate?.(result);
    } catch (error) {console.warn('Course progress sync is temporarily unavailable:',error?.message || error);}
  }
  function renderCard(path, details=false) {
    const s=safe(path.slug),name=safe(path.title);
    const staticPart = `<div class="za-card-top"><span class="za-card-icon" aria-hidden="true">${icon(path.slug)}</span><span class="za-card-index">PATH ${safe(path.number)}</span></div><h3>${name}</h3><p>${safe(path.tagline)}</p>`;
    return `<article class="za-course-card">${staticPart}<div class="za-card-bottom"><small>10 weeks · Hands-on practice</small><a href="${courseHref(path.slug)}" aria-label="Explore ${name}">Explore ↗</a></div></article>`;
  }
  function attachMenu(){
    const open=one('#zaMenuOpen'),close=one('#zaMenuClose'),overlay=one('#zaMenuOverlay');
    if(!open||!close||!overlay)return;
    let before=null;
    function toggle(on){
      overlay.hidden=!on;open.setAttribute('aria-expanded',String(on));document.body.classList.toggle('za-menu-opened',on);
      document.body.style.overflow=on?'hidden':'';
      if(on){before=document.activeElement;close.focus();}
      else (before?.isConnected?before:open).focus();
    }
    open.addEventListener('click',()=>toggle(true));close.addEventListener('click',()=>toggle(false));
    overlay.addEventListener('click',event=>{if(event.target===overlay)toggle(false)});
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&!overlay.hidden)toggle(false);
      if(event.key!=='Tab'||overlay.hidden)return;
      const focusables=all('a[href],button:not([disabled])',overlay).filter(el=>el.getClientRects().length);
      if(!focusables.length)return;
      const first=focusables[0],last=focusables[focusables.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    });
  }
  function discover(){const node=one('#zaDiscoverCards');if(!node)return;node.innerHTML=catalog.map(path=>renderCard(path)).join('');}
  function catalogPage(){
    const box=one('#zaCatalogCards'),search=one('#zaCourseSearch'),empty=one('#zaCatalogEmpty');
    if(!box||!search)return;
    const countLabel=one('#dlcCatalogCount');
    const filters=all('[data-dlc-filter]');
    const focus={introduction:'analytics',excel:'analytics',statistics:'analytics',powerbi:'bi',tableau:'bi',sql:'technical',powerquery:'technical'};
    const focusNames={analytics:'Data foundations',bi:'Dashboards & BI',technical:'Data preparation'};
    let selected='all';
    function render(){
      const q=search.value.trim().toLocaleLowerCase();
      const shown=catalog.filter(path=>(selected==='all'||focus[path.slug]===selected) &&
        (path.title+' '+path.tagline+' '+path.weeks.map(w=>w.title+' '+w.outcome).join(' ')).toLocaleLowerCase().includes(q));
      box.innerHTML=shown.map(path=>{
        const progress=readProgress(path.slug);
        const done=path.weeks.filter(w=>progress[String(w.week)]===true).length;
        const next=path.weeks.find(w=>progress[String(w.week)]!==true)?.week || 1;
        const value=Math.min(100,Math.round(done*100/path.weeks.length));
        const label=done===path.weeks.length?'Review course':done?'Continue week '+num(next):'Start learning';
        const href=courseHref(path.slug)+(done?'?week='+next:'');
        return `<article class="za-catalog-item dlc-course-card" data-course="${safe(path.slug)}">
          <div class="za-catalog-intro"><div class="za-catalog-meta"><span class="za-card-icon" aria-hidden="true">${icon(path.slug)}</span><span class="za-card-index">PATH ${safe(path.number)} / 07</span></div>
          <span class="dlc-card-category">${safe(focusNames[focus[path.slug]])}</span><h3>${safe(path.title)}</h3><p>${safe(path.tagline)}</p>
          <div class="za-catalog-stats"><span>10 weekly modules</span><span>Worked examples</span><span>Practice quizzes</span></div>
          <div class="dlc-card-progress"><div class="dlc-progress-heading"><strong>${done===path.weeks.length?'Course complete':done?'Your learning progress':'Ready when you are'}</strong><span>${done} / ${path.weeks.length} weeks</span></div><div class="dlc-progress-track" role="progressbar" aria-label="${safe(path.title)} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}"><span style="width:${value}%"></span></div></div>
          <div class="za-catalog-links"><a class="za-btn za-btn-primary" href="${href}">${label} <span aria-hidden="true">↗</span></a><a class="dlc-quiz-link" href="${quizHref(path.slug,1)}">Questions to Try <span aria-hidden="true">↗</span></a></div></div>
          <div class="za-catalog-weeks"><details><summary>Explore the 10-week curriculum <span class="dlc-disclosure-indicator" aria-hidden="true">⌄</span></summary>
          <div class="za-week-peek">${path.weeks.map(w=>`<a href="${courseHref(path.slug)}?week=${w.week}"><span class="dlc-week-number">${num(w.week)}</span><span class="dlc-week-title">${safe(w.title)}</span><span class="dlc-week-status">${progress[String(w.week)]===true?'✓ Completed':'Study lesson ↗'}</span></a>`).join('')}</div></details></div>
        </article>`;
      }).join('');
      empty.hidden=shown.length>0;
      if(countLabel)countLabel.textContent=`${shown.length} ${shown.length===1?'course':'courses'} shown`;
    }
    filters.forEach(button=>button.addEventListener('click',()=>{
      selected=button.dataset.dlcFilter;
      filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      render();
    }));
    search.addEventListener('input',render);
    window.addEventListener('storage',render);
    window.addEventListener('pageshow',render);
    render();
  }
  function lessonPage(){
    const slug=document.body.dataset.course;
    const path=pathFor(slug);
    if(!path){one('#zaLessonTitle').textContent='Course unavailable';return;}
    const list=one('#zaWeekList'),open=one('#zaAsideOpen'),close=one('#zaAsideClose'),aside=one('#zaCourseAside');
    const currentUrl=()=>{
      const params=new URLSearchParams(location.search);
      const n=Number(params.get('week'));
      if(Number.isInteger(n)&&n>=1&&n<=path.weeks.length)return n;
      const h=location.hash.match(/^#(?:week|lesson)-?(\d+)$/i);
      return h&&Number(h[1])>=1&&Number(h[1])<=path.weeks.length?Number(h[1]):1;
    };
    let current=currentUrl();
    const setAside=show=>{
      if(!aside||!open)return;
      aside.classList.toggle('is-open',show);
      open.setAttribute('aria-expanded',String(show));
      document.body.classList.toggle('za-sidebar-opened',show);
      document.body.style.overflow=show?'hidden':'';
      if(show)close?.focus();else open.focus();
    };
    open?.addEventListener('click',()=>setAside(true));close?.addEventListener('click',()=>setAside(false));
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&aside.classList.contains('is-open'))setAside(false)});
    function progressView(){
      const count=completedCount(slug);
      const completed=one('#dlcOverviewCompleted'),bar=one('#dlcOverviewBar'),label=one('#dlcOverviewLabel');
      if(completed)completed.textContent=count+' of '+path.weeks.length+' weeks completed';
      if(label)label.textContent=percent(slug)+'% complete';
      if(bar){bar.value=percent(slug);bar.setAttribute('aria-valuenow',String(percent(slug)));}
      one('#zaAsideProgressLabel').textContent=`${count} of ${path.weeks.length} completed`;
      one('#zaAsideProgressFill').style.width=`${percent(slug)}%`;
      all('.za-week-link',list).forEach(button=>{
        const w=Number(button.dataset.week);
        const done=!!readProgress(slug)[String(w)];
        button.querySelector('.za-week-info small').textContent=done?'Completed':'Ready to study';
        button.querySelector('.za-week-done').textContent=done?'✓':'';
      });
    }
    function showLesson(week,updateUrl=true){
      const record=path.weeks[week-1];if(!record)return;
      current=week;
      list.innerHTML=path.weeks.map(w=>`<button type="button" class="za-week-link" data-week="${w.week}" aria-current="${w.week===week?'true':'false'}"><span class="za-week-num">${num(w.week)}</span><span class="za-week-info"><strong>${safe(w.title)}</strong><small>Ready to study</small></span><span class="za-week-done" aria-label="Completion indicator"></span></button>`).join('');
      one('#zaWeekCounter').textContent=`WEEK ${num(week)} / ${path.weeks.length}`;
      const currentLabel=one('#dlcCurrentWeek');if(currentLabel)currentLabel.textContent='Week '+num(week)+' · '+record.title;
      const previousButton=one('#dlcPreviousWeek'),nextButton=one('#dlcNextWeek');
      if(previousButton)previousButton.disabled=week===1;
      if(nextButton)nextButton.disabled=week===path.weeks.length;
      one('#zaLessonKicker').textContent=`${path.title.toUpperCase()} · WEEK ${num(week)}`;
      one('#zaLessonTitle').textContent=record.title;
      one('#zaLessonOutcome').textContent=record.outcome;
      const guide = window.DALP_GUIDED_LESSONS?.[slug]?.[week-1];
      const media = window.DALP_WEEK_MEDIA?.[slug]?.[week-1];
      const kitHtml = media ? `<section class="dl-week-kit" id="zaLessonResources" aria-labelledby="dl-week-kit-title">
        <div class="dl-week-kit-heading"><div><span class="dl-eyebrow">WEEK ${num(week)} · PRACTISE & WATCH</span><h2 id="dl-week-kit-title">Your learning resources</h2></div><span class="dl-kit-tip">Included with this lesson</span></div>
        <div class="dl-week-kit-grid">
          <article class="dl-kit-card"><span class="dl-kit-top">↓ · DOWNLOADABLE PRACTICE</span><h3>${safe(media.datasetLabel)}</h3><p>Work with a fictional dataset selected for this week's topic. Keep an untouched original, record changes and validate your output.</p><div class="dl-kit-links"><a href="${base}downloads/${encodeURIComponent(media.dataset)}" download>Download practice file <span aria-hidden="true">↓</span></a><a class="dl-kit-secondary" href="${base}downloads/${safe(media.worksheet)}" download>Week ${week} worksheet ↓</a></div></article>
          <article class="dl-kit-card dl-kit-card--video"><span class="dl-kit-top">▶ · TOPIC-MATCHED VIDEO</span><h3>Watch this week's video walkthrough</h3><p>Opens in the DataLearning player without navigating away. Chapter links begin near the relevant topic when available.</p><a href="${safe(media.video)}" data-dalp-video="true" data-video-title="${safe(path.title)} · Week ${week} video companion" aria-haspopup="dialog">Watch lesson video <span aria-hidden="true">▶</span></a></article>
        </div></section>` : '';
      const deepHtml = media ? `<section class="dl-week-deep" aria-label="Detailed tool instruction for this week"><header><span>LEARNING IN DEPTH · WEEK ${num(week)}</span><h2>Apply this skill to a real analysis</h2></header><div class="dl-deep-steps">
        <article class="dl-deep-step"><span class="dl-deep-number">01 · UNDERSTAND</span><h3>What you are learning</h3><p>${safe(media.why)}</p></article>
        <article class="dl-deep-step"><span class="dl-deep-number">02 · APPLY</span><h3>Follow along in the tool</h3><p>${safe(media.workthrough)}</p></article>
        <article class="dl-deep-step"><span class="dl-deep-number">03 · EXPLAIN</span><h3>Present and verify your result</h3><p>${safe(media.evidence)}</p></article>
        </div><footer><strong>Analyst's quality check:</strong> ${safe(guide?.verify || record.outcome)} Keep the original practice file intact so you can reproduce the result.</footer></section>` : '';
      const lessonMinutes = guide ? Math.max(6,Math.round(`${guide.concept} ${guide.reason} ${guide.steps.join(' ')} ${guide.verify} ${guide.case || ''} ${record.example} ${record.exercise} ${media?.why || ''} ${media?.workthrough || ''} ${media?.evidence || ''}`.split(/\s+/).length / 165)) : 4;
      const readTime = one('#zaEstimatedTime');
      if(readTime)readTime.textContent=`About ${lessonMinutes} min · guided study`;
      const guideHtml = guide ? `
        <section class="za-lesson-block za-lesson-reading" id="zaConcepts" aria-labelledby="zaConceptsTitle">
          <div class="za-block-head"><span class="za-block-ico" aria-hidden="true">◈</span><div><span class="za-block-kicker">CONCEPTS · PART ONE</span><h2 id="zaConceptsTitle">Understand the idea</h2></div></div>
          <div class="za-teaching-copy"><p>${safe(guide.concept)}</p></div>
        </section>
        <section class="za-lesson-block za-lesson-reading" id="zaWhy" aria-labelledby="zaWhyTitle">
          <div class="za-block-head"><span class="za-block-ico" aria-hidden="true">✧</span><div><span class="za-block-kicker">CONCEPTS · PART TWO</span><h2 id="zaWhyTitle">Why it matters in a real analysis</h2></div></div>
          <div class="za-teaching-copy"><p>${safe(guide.reason)}</p></div>
        </section>
        <section class="za-lesson-block za-lesson-method" id="zaMethod" aria-labelledby="zaMethodTitle">
          <div class="za-block-head"><span class="za-block-ico orange" aria-hidden="true">➜</span><div><span class="za-block-kicker">GUIDED WORKFLOW</span><h2 id="zaMethodTitle">Follow these steps</h2></div></div>
          <p class="za-guided-intro">Work through the steps in order. Try each one with your own sample data before continuing.</p>
          <ol class="za-guided-steps">${guide.steps.map((item,i)=>`<li><span class="za-step-no" aria-hidden="true">${num(i+1)}</span><p>${safe(item)}</p></li>`).join('')}</ol>
          ${guide.artifact ? `<div class="za-formula-header"><span>EXAMPLE TO STUDY</span><span>Illustrative · adapt to your data</span></div><pre class="za-guided-code"><code>${safe(guide.artifact)}</code></pre>` : ''}
        </section>` : '';
      const enrichment = {
        introduction:[['F01','Analyst foundations'],['I07','Statistical reasoning'],['E06','Data governance']],
        excel:[['F02','Spreadsheet foundations'],['I01','Advanced Excel and LET'],['A02','Analytics engineering']],
        sql:[['F03','First SQL queries'],['I02','Window functions and joins'],['A01','Production SQL']],
        powerbi:[['F07','Visual decision-making'],['I05','Power BI and DAX'],['A02','Governed data marts']],
        tableau:[['F07','Chart foundations'],['I06','Tableau storytelling'],['A06','Advanced experiments']],
        powerquery:[['F06','Data cleaning'],['I03','Refreshable ETL'],['A03','Pipeline orchestration']],
        statistics:[['F05','Statistics foundations'],['I07','Inference and experiments'],['A05','Machine learning']]
      };
      const deepDive = `<section class="za-lesson-block za-career-bridge" id="zaCareerBridge" aria-label="Continue learning at higher proficiency levels">
          <span class="za-block-kicker">WHAT COMES NEXT</span><h2>Continue from core lessons to industry mastery</h2>
          <p>These 10 weekly lessons build your foundation. Extend the same skills through the four-stage DataLearning curriculum, with dedicated examples, case studies and practical exercises.</p>
          <div class="za-career-links">${(enrichment[slug]||[]).map(([id,title])=>`<a href="${base}career-path.html#pathway-${id}"><span>${safe(id)}</span><strong>${safe(title)}</strong><span aria-hidden="true">↗</span></a>`).join('')}</div>
          <a class="za-career-all" href="${base}career-path.html#masterLearningPath">View the complete Beginner → Expert roadmap ↗</a>
        </section>`;
      const journey = window.DALP_TOOL_JOURNEYS?.[slug];
      const journeyIndex = Math.min(5, Math.floor((week - 1) * 6 / path.weeks.length));
      const journeyStep = journey?.stages?.[journeyIndex];
      const journeyHtml = journeyStep ? `<section class="za-lesson-block za-tool-journey" aria-label="End-to-end analysis workflow"><span class="za-block-kicker">TOOL-TO-REPORT LEARNING JOURNEY · STAGE ${journeyIndex+1} OF 6</span><h2>${safe(journeyStep.heading)}</h2><p>${safe(journeyStep.detail)}</p><p class="za-journey-check"><strong>Practical checkpoint:</strong> ${safe(journeyStep.task)}</p><a href="${base}career-path.html">Explore the complete data career path →</a></section>` : '';
      one('#zaLessonBody').innerHTML=`
        <nav class="za-lesson-sections" aria-label="Sections in this lesson">
          <span class="za-section-toc-title">IN THIS WEEK</span>
          <button type="button" data-jump="zaConcepts">Read the concepts</button>
          <button type="button" data-jump="zaLessonResources">Dataset & video</button>
          <button type="button" data-jump="zaMethod">Guided walkthrough</button>
          <button type="button" data-jump="zaExample">Worked example</button>
          <button type="button" data-jump="zaExercise">Try an exercise</button>
          <button type="button" data-jump="zaRecap">Review & recap</button>
        </nav>
        <section class="za-lesson-block za-lesson-objective" id="zaGoals"><div class="za-block-head"><span class="za-block-ico" aria-hidden="true">◎</span><div><span class="za-block-kicker">01 · LEARNING GOAL</span><h2>What you will understand</h2></div></div><p>${safe(record.outcome)}.</p><div class="za-tip"><b>How to study this module:</b> Read both explanations, follow the guided workflow, examine the example, and solve the exercise before opening its answer. Finish with the separate weekly questions.</div></section>
        ${kitHtml}
        ${guideHtml}
        ${deepHtml}
        ${journeyHtml}
        <section class="za-lesson-block" id="zaExample"><div class="za-block-head"><span class="za-block-ico" aria-hidden="true">▥</span><div><span class="za-block-kicker">02 · WORKED EXAMPLE</span><h2>See the idea in practice</h2></div></div><p class="za-example-intro">Read the scenario. Identify the input, the operation, and what the result means for the business question.</p><div class="za-example">${safe(record.example)}</div>${guide?.case ? `<div class="za-case-study"><div class="za-case-label">APPLY IT TO A REALISTIC CASE</div><p>${safe(guide.case)}</p></div>` : ''}</section>
        <section class="za-lesson-block" id="zaExercise"><div class="za-block-head"><span class="za-block-ico orange" aria-hidden="true">✎</span><div><span class="za-block-kicker">03 · YOUR TURN</span><h2>Try the practical exercise</h2></div></div><p>${safe(record.exercise)}</p><div class="za-exercise-help">Before revealing the answer: identify the correct input fields, state the rule or formula, and check that your result addresses the question.</div><details class="za-exercise-solution"><summary>Reveal the worked answer and compare your reasoning</summary><div class="za-solution">${safe(record.solution)}</div></details><div class="za-tip"><b>Common mistake to avoid:</b> ${safe(record.pitfall)}.</div></section>
        <section class="za-lesson-block za-lesson-recap" id="zaRecap"><div class="za-block-head"><span class="za-block-ico" aria-hidden="true">✓</span><div><span class="za-block-kicker">LEARNING RECAP</span><h2>Check your understanding</h2></div></div><p class="za-recap-lead">Before you move on, explain the main idea in your own words and confirm that your calculations or decisions can be checked independently.</p><div class="za-recap-card"><strong>What a correct result should show</strong><p>${safe(guide?.verify || record.outcome)}</p></div><div class="za-recap-card za-recap-warning"><strong>Remember this limitation</strong><p>${safe(record.pitfall)}.</p></div><p class="za-recap-next">When you are ready, select <b>Questions to Try</b> below. Questions open on a separate assessment page; completing the lesson and submitting a quiz remain separate actions.</p></section>${deepDive}`;
      all('.za-lesson-sections button',one('#zaLessonBody')).forEach(button=>button.addEventListener('click',()=>{
        const section=document.getElementById(button.dataset.jump);
        section?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
      }));
      const next=path.weeks[week]?`${courseHref(slug)}?week=${week+1}`:base+'capstone.html?course='+encodeURIComponent(slug);
      const done=!!readProgress(slug)[String(week)];
      one('#zaLessonActions').innerHTML=`<button id="zaMarkWeek" type="button" class="za-btn za-btn-line">${done?'✓ Marked as complete':'✓ Mark week complete'}</button><a class="za-btn za-btn-primary" href="${quizHref(slug,week)}">Questions to Try ↗</a><a class="za-btn za-btn-line" href="${next}">${week===path.weeks.length?'Capstone project ↗':'Next week →'}</a>${week===path.weeks.length?`<a class="za-btn za-btn-line" href="${quizHref(slug,'mastery')}">Mastery Assessment ↗</a>`:''}<span class="za-save-status" id="zaSaveStatus" role="status" aria-live="polite"></span>`;
      one('#zaMarkWeek').addEventListener('click', async function(){
        this.disabled=true;one('#zaSaveStatus').textContent='Saving your week…';
        try{
          const result=await window.ZAHProgressCloud.saveWeek(slug,week,true);
          this.textContent='✓ Marked as complete';
          one('#zaSaveStatus').textContent=result.ok?'Week completed and synced to your account.':result.reason==='signed_out'?'Saved on this device. Sign in to sync on other devices.':'Saved locally. Cloud sync is currently unavailable.';
          progressView();
        }catch(error){one('#zaSaveStatus').textContent='Unable to save this week right now. Please retry.';}
        finally{this.disabled=false;}
      });
      all('.za-week-link',list).forEach(button=>button.addEventListener('click',()=>{
        const n=Number(button.dataset.week);showLesson(n);if(aside.classList.contains('is-open'))setAside(false);
        if(window.matchMedia('(max-width:960px)').matches)one('.za-lesson-hero')?.scrollIntoView({block:'start',behavior:'smooth'});
      }));
      progressView();
      if(updateUrl){const url=new URL(location.href);url.searchParams.set('week',String(week));url.hash='';history.replaceState(null,'',url.pathname+url.search);}
    }
    one('#dlcPreviousWeek')?.addEventListener('click',()=>{if(current>1)showLesson(current-1);});
    one('#dlcNextWeek')?.addEventListener('click',()=>{if(current<path.weeks.length)showLesson(current+1);});
    showLesson(current,false);
    window.addEventListener('popstate',()=>showLesson(currentUrl(),false));
    syncCourse(slug,progressView);
  }
  function quizPage(){
    const params=new URLSearchParams(location.search);
    const slug=params.get('course')||'';
    const rawWeek=params.get('week')||'1';
    const path=pathFor(slug);
    const isMastery=rawWeek==='mastery';
    const week=Number(rawWeek);
    if(!path || (!isMastery&&(!Number.isInteger(week)||week<1||week>path.weeks.length))){
      one('#zaQuizTitle').textContent='Questions not found';one('#zaQuizForm').textContent='Select a learning path and week from the course catalogue.';
      one('#zaQuizSubmit').hidden=true;return;
    }
    const questions=isMastery?path.weeks.map((w,i)=>({...w.questions[0],week:i+1})):path.weeks[week-1].questions;
    const label=isMastery?'Course Mastery Assessment':`Week ${num(week)} · Questions to Try`;
    one('#zaQuizEyebrow').textContent=isMastery?'FINAL COURSE CHECKPOINT':`${path.title.toUpperCase()} · KNOWLEDGE CHECK`;
    one('#zaQuizTitle').textContent=label;
    one('#zaQuizIntro').textContent=isMastery?`Review your ${path.title} knowledge across all ten modules. Every result includes a worked explanation.`:`You have learned about ${path.weeks[week-1].title.toLowerCase()}. Try these questions and review what the best answers mean.`;
    one('#zaQuizBread').textContent=isMastery?'Mastery assessment':`Week ${num(week)}`;
    one('#zaQuizCount').textContent=String(questions.length).padStart(2,'0');
    one('#zaQuizCourseLink').href=courseHref(slug);one('#zaQuizCourseLink').textContent=path.title;
    one('#zaQuizBack').href=isMastery?courseHref(slug):courseHref(slug)+`?week=${week}`;
    document.title=`${label} | ${path.title} · DataLearning`;
    const form=one('#zaQuizForm'),submit=one('#zaQuizSubmit'),retry=one('#zaQuizRetry'),result=one('#zaQuizResult'),message=one('#zaQuizSaveStatus');
    function count(){
      const n=questions.filter((_,i)=>!!one(`input[name="q-${i}"]:checked`,form)).length;
      one('#zaQuizProgressText').textContent=`${n} of ${questions.length} answered`;
      one('#zaQuizProgressFill').style.width=`${Math.round(n/questions.length*100)}%`;
      return n;
    }
    function render(){
      form.innerHTML=questions.map((q,i)=>`<section class="za-question" data-index="${i}"><div class="za-q-index"><span>${num(i+1)}</span>${isMastery?'WEEK '+num(q.week):'QUESTION '+num(i+1)+' OF '+num(questions.length)}</div><h2 id="za-q-title-${i}">${safe(q.q)}</h2><div class="za-choice-list" role="group" aria-labelledby="za-q-title-${i}">${q.choices.map((choice,j)=>`<label class="za-choice"><input type="radio" name="q-${i}" value="${j}" aria-label="Option ${String.fromCharCode(65+j)}: ${safe(choice)}"><span class="za-choice-letter" aria-hidden="true">${String.fromCharCode(65+j)}</span><span>${safe(choice)}</span></label>`).join('')}</div><div class="za-feedback" hidden></div></section>`).join('');
      result.hidden=true;retry.hidden=true;submit.hidden=false;message.textContent='';count();
    }
    form.addEventListener('change',count);
    async function save(score){
      const u=await user();
      const localKey=`dalp-academy-quiz:${u?.id||'guest'}:${slug}:${rawWeek}`;
      try{const prior=JSON.parse(localStorage.getItem(localKey)||'{}');localStorage.setItem(localKey,JSON.stringify({best:Math.max(prior.best||0,score),latest:score,total:questions.length,at:new Date().toISOString()}));}catch(_){/* storage optional */}
      if(!u || !window.ZAH_DB?.client){message.textContent='Quiz result saved on this device. Sign in to store results in Supabase.';return;}
      const percentage=Math.round(100*score/questions.length);
      let table,record,conflict;
      if(isMastery){table='mastery_results';conflict='user_id,course_slug';record={user_id:u.id,course_slug:slug,score,total:10,percentage,submitted_at:new Date().toISOString()};}
      else{table='quiz_results';conflict='user_id,course_slug,week_no';record={user_id:u.id,course_slug:slug,week_no:week,score,answered:questions.length,total:questions.length,percentage,submitted_at:new Date().toISOString()};}
      try{
        const {error}=await window.ZAH_DB.client.from(table).upsert(record,{onConflict:conflict});if(error)throw error;
        message.textContent=isMastery?'Mastery Assessment saved to your DataLearning account.':'Weekly quiz result synced to your DataLearning account.';
      }catch(error){console.warn('Quiz result sync unavailable',error?.message);message.textContent='Your result is saved locally; cloud sync could not be completed. You can retry later.';}
    }
    submit.addEventListener('click',async()=>{
      if(count()<questions.length){
        const first=questions.findIndex((_,i)=>!one(`input[name="q-${i}"]:checked`,form));
        result.hidden=false;result.className='za-quiz-result is-warning';result.textContent=`Answer all ${questions.length} questions before checking your score.`;
        all('.za-question',form)[first]?.scrollIntoView({block:'center',behavior:'smooth'});return;
      }
      let score=0;
      questions.forEach((q,i)=>{
        const section=all('.za-question',form)[i],picked=Number(one(`input[name="q-${i}"]:checked`,form).value);
        const good=picked===q.answer;if(good)score++;
        section.classList.add(good?'is-correct':'is-incorrect');
        all('input',section).forEach(input=>input.disabled=true);
        const feedback=one('.za-feedback',section);feedback.hidden=false;
        feedback.classList.toggle('is-wrong',!good);
        feedback.textContent=`${good?'Correct.':'Review this answer.'} ${q.why} Correct option: ${String.fromCharCode(65+q.answer)}.`;
      });
      result.hidden=false;result.className='za-quiz-result';
      result.innerHTML=`<h2>${score} / ${questions.length} correct · ${Math.round(score/questions.length*100)}%</h2><p>${score===questions.length?'Excellent work! Every answer is correct.':'Read the explanations above, then try again to strengthen your understanding.'}</p>`;
      submit.hidden=true;retry.hidden=false;
      message.textContent='Saving your result…';await save(score);
      result.scrollIntoView({block:'start',behavior:'smooth'});
    });
    retry.addEventListener('click',()=>{render();form.scrollIntoView({block:'start',behavior:'smooth'});});
    render();
  }
  function progressPage(){
    const summary=one('#zaProgressSummary'),cards=one('#zaProgressCards'),status=one('#zaProgressStatus');
    if(!summary||!cards)return;
    function render(){
      const completed=catalog.reduce((n,p)=>n+completedCount(p.slug),0);
      const inProgress=catalog.filter(p=>completedCount(p.slug)>0).length;
      const total=catalog.reduce((n,p)=>n+p.weeks.length,0);
      summary.innerHTML=`<div class="za-stat-card"><span>WEEKS COMPLETED</span><strong>${completed}</strong><small>Out of ${total} structured modules</small></div><div class="za-stat-card"><span>LEARNING PATHS STARTED</span><strong>${inProgress}</strong><small>Across seven available paths</small></div><div class="za-stat-card"><span>OVERALL PROGRESS</span><strong>${Math.round(completed/total*100)}%</strong><small>Your completed course units</small></div>`;
      cards.innerHTML=catalog.map(path=>`<article class="za-progress-card"><div class="za-progress-card-head"><span class="za-card-icon" aria-hidden="true">${icon(path.slug)}</span><div><h3>${safe(path.title)}</h3><small>${completedCount(path.slug)} of ${path.weeks.length} weeks complete</small></div></div><div class="za-bar"><span style="width:${percent(path.slug)}%"></span></div><div class="za-progress-card-footer"><b>${percent(path.slug)}% complete</b><a href="${courseHref(path.slug)}">Continue learning ↗</a></div></article>`).join('');
    }
    render();
    (async()=>{
      const u=await user();
      if(!u){status.textContent='You are viewing progress saved on this device. Sign in to securely sync across devices.';return;}
      status.textContent='Checking your synced course progress…';
      await Promise.all(catalog.map(p=>syncCourse(p.slug,render)));
      render();status.textContent='Synced with your signed-in DataLearning account where a connection was available.';
    })();
  }
  function init(){attachMenu();
    if(page==='discover')discover();
    if(page==='courses')catalogPage();
    if(page==='lesson')lessonPage();
    if(page==='quiz')quizPage();
    if(page==='progress')progressPage();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  window.DALP_ACADEMY_APP={catalog,percent,readProgress};
})();
