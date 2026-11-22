/** DataLearning Academy: course browser, weekly lessons, progress and assessments. */
(() => {
  'use strict';
  const catalog = Array.isArray(window.DALP_ACADEMY) ? window.DALP_ACADEMY : [];
  // Every course, including Python and AI, is a first-class Academy record.
  const completeCatalog = catalog;
  const courses = Object.fromEntries(catalog.map(path => [path.slug, path]));
  const root = document.documentElement;
  const base = root.dataset.base || '';
  const page = root.dataset.academyPage || '';
  const one = (s, context=document) => context.querySelector(s);
  const all = (s, context=document) => [...context.querySelectorAll(s)];
  const safe = input => String(input ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const courseHref = slug => base + 'courses/' + encodeURIComponent(slug) + '.html';
  const quizHref = (slug, week) => base + 'quiz.html?course=' + encodeURIComponent(slug) + '&week=' + encodeURIComponent(week);
  const masteryHref = slug => quizHref(slug, 'mastery');
  const masteryCount = path => Array.isArray(window.DALP_MASTERY_EXAMS?.[path?.slug]) ? window.DALP_MASTERY_EXAMS[path.slug].length : 50;
  const pathFor = slug => courses[slug];
  const num = week => String(week).padStart(2,'0');
  const labelFor = slug => slug === 'introduction' ? 'Data Analysis' : courses[slug]?.title || slug;
  const icon = slug => `<img class="dl-course-logo" data-brand-course="${safe(slug)}" src="${base}assets/icons/icon-${safe(slug)}.svg" alt="" width="46" height="46" loading="lazy" decoding="async">`;
  const track = slug => window.ZAHProgressCloud?.COURSE_MAP?.[slug];
  const readProgress = slug => {
    const map = track(slug);
    if (!map) return {};
    try { return window.ZAHProgressCloud.readLocal(map.key) || {}; } catch (_) {return {};}
  };
  const WEEK_PASS_PERCENT = 80;
  const quizStorageKey = (uid,slug,week) => `dalp-academy-quiz:${uid||'guest'}:${slug}:${week}`;
  function readQuizBest(uid,slug,week){
    try {
      const result=JSON.parse(window.DALP_STORAGE.getItem(quizStorageKey(uid,slug,week))||'{}');
      return Number(result.bestPercent ?? (result.total ? 100*Number(result.best||0)/Number(result.total) : 0))||0;
    } catch (_) {return 0;}
  }
  async function verifiedWeekScore(slug,week){
    const u=await user();
    const local=readQuizBest(u?.id,slug,week);
    if(u && window.ZAH_DB?.client){
      try{
        const {data,error}=await window.ZAH_DB.client.from('quiz_results')
          .select('percentage').eq('user_id',u.id).eq('course_slug',slug).eq('week_no',week).maybeSingle();
        if(error)throw error;
        return {percent:Math.max(local,Number(data?.percentage)||0),user:u};
      }catch(e){return {percent:local,user:u,offline:true};}
    }
    return {percent:local,user:u,offline:true};
  }
  const completedCount = slug => Object.values(readProgress(slug)).filter(v => v === true).length;
  const percent = slug => Math.min(100, Math.round(completedCount(slug) * 100 / (courses[slug]?.weeks.length || 10)));
  const user = async () => {
    if(window.DALP_AUTH_GATE?.whenReady)return window.DALP_AUTH_GATE.whenReady;
    await window.DALP_AUTH_RESTORE;
    try {return (await window.ZAH_DB?.client?.auth?.getUser())?.data?.user || null;} catch (_) {return null;}
  };
  async function syncCourse(slug, onUpdate) {
    if (!window.ZAHProgressCloud?.syncCourse || !window.ZAH_DB?.client) return;
    try {
      if (!(await user())) return;
      const result = await window.ZAHProgressCloud.syncCourse(slug);
      if (result?.ok) {onUpdate?.(result);window.dispatchEvent(new CustomEvent('dalp:progress-synced',{detail:{slug,percent:result.percent}}));}
    } catch (error) {console.warn('Course progress sync is temporarily unavailable:',error?.message || error);}
  }
  function renderCard(path, details=false) {
    const s=safe(path.slug),name=safe(path.title);
    const staticPart = `<div class="za-card-top"><span class="za-card-icon" aria-hidden="true">${icon(path.slug)}</span><span class="za-card-index">LEARNING PATH ${safe(path.number)} / 09</span></div><div class="za-discover-eyebrow">BEGINNER → PRACTICAL SKILLS</div><h3>${name}</h3><p>${safe(path.tagline)}</p>`;
    return `<article class="za-course-card" data-course="${s}">${staticPart}<div class="za-card-bottom"><small><span aria-hidden="true">◷</span> 10 weeks · Guided practice</small><a href="${courseHref(path.slug)}" aria-label="Explore ${name}">Explore course <span aria-hidden="true">↗</span></a></div></article>`;
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
  function discover(){const node=one('#zaDiscoverCards');if(!node)return;const featured=['excel','sql','powerbi'].map(slug=>completeCatalog.find(path=>path.slug===slug)).filter(Boolean);node.innerHTML=featured.map(path=>renderCard(path)).join('');}
  function catalogPage(){
    const box=one('#zaCatalogCards'),search=one('#zaCourseSearch'),empty=one('#zaCatalogEmpty');
    if(!box||!search)return;
    const countLabel=one('#dlcCatalogCount');
    const filters=all('[data-dlc-filter]');
    const focus={introduction:'analytics',excel:'analytics',statistics:'analytics',powerbi:'bi',tableau:'bi',sql:'technical',powerquery:'technical',python:'specialist',ai:'specialist'};
    const focusNames={analytics:'Data foundations',bi:'Dashboards & BI',technical:'Data preparation',specialist:'Python & AI'};
    let selected='all';
    function render(){
      const q=search.value.trim().toLocaleLowerCase();
      const shown=completeCatalog.filter(path=>(selected==='all'||focus[path.slug]===selected) &&
        (path.title+' '+path.tagline+' '+path.weeks.map(w=>w.title+' '+w.outcome).join(' ')).toLocaleLowerCase().includes(q));
      box.innerHTML=shown.map(path=>{
        const progress=readProgress(path.slug);
        const done=path.weeks.filter(w=>progress[String(w.week)]===true).length;
        const next=path.weeks.find(w=>progress[String(w.week)]!==true)?.week || 1;
        const value=Math.min(100,Math.round(done*100/path.weeks.length));
        const label=done===path.weeks.length?'Review course':done?'Continue week '+num(next):'Start learning';
        const href=courseHref(path.slug)+(done?'?week='+next:'');
        return `<article class="za-catalog-item dlc-course-card" data-course="${safe(path.slug)}">
          <div class="za-catalog-intro"><div class="za-catalog-meta"><span class="za-card-icon" aria-hidden="true">${icon(path.slug)}</span><span class="za-card-index">PATH ${safe(path.number)} / 09</span></div>
          <span class="dlc-card-category">${safe(focusNames[focus[path.slug]])}</span><h3>${safe(path.title)}</h3><p>${safe(path.tagline)}</p>
          <div class="za-catalog-stats"><span>10 weekly modules</span><span>Worked examples</span><span>Practice quizzes</span></div>
          <div class="dlc-card-progress"><div class="dlc-progress-heading"><strong>${done===path.weeks.length?'Course complete':done?'Your learning progress':'Ready when you are'}</strong><span>${done} / ${path.weeks.length} weeks</span></div><div class="dlc-progress-track" role="progressbar" aria-label="${safe(path.title)} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}"><span style="width:${value}%"></span></div></div>
          <div class="za-catalog-links"><a class="za-btn za-btn-primary" href="${href}">${label} <span aria-hidden="true">↗</span></a><a class="dlc-quiz-link" href="${quizHref(path.slug,1)}">Questions to Try <span aria-hidden="true">↗</span></a></div></div>
          <div class="za-catalog-weeks"><details><summary>Explore the 10-week curriculum <span class="dlc-disclosure-indicator" aria-hidden="true">⌄</span></summary>
          <div class="za-week-peek">${path.weeks.map(w=>`<a href="${courseHref(path.slug)}?week=${w.week}"><span class="dlc-week-number">${num(w.week)}</span><span class="dlc-week-title">${safe(w.title)}</span><span class="dlc-week-status">${progress[String(w.week)]===true?'✓ Completed':'Study lesson ↗'}</span></a>`).join('')}</div><div class="dlc-mastery-row"><div><strong>Course mastery assessment</strong><small>${masteryCount(path)} review questions · Recommended after Week 10</small></div><a href="${masteryHref(path.slug)}" aria-label="Open ${safe(path.title)} mastery assessment">Start assessment <span aria-hidden="true">↗</span></a></div></details></div>
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
    // Shared final checkpoint: the same premium element appears for all nine courses.
    const asideBottom=one('.za-aside-bottom',aside);
    if(asideBottom){
      asideBottom.insertAdjacentHTML('beforebegin',`<section class="za-mastery-aside-card" aria-label="Course mastery assessment"><div class="za-mastery-aside-top"><span class="za-mastery-medal" aria-hidden="true">✦</span><span class="za-mastery-kicker">FINAL KNOWLEDGE CHECK</span></div><a href="${masteryHref(slug)}" class="za-mastery-aside-link">Mastery assessment <span aria-hidden="true">↗</span></a><p>${masteryCount(path)} questions · Recommended after completing Week 10</p></section>`);
    }
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
      const rebuiltModule = window.DALP_TOOL_TO_REPORT?.[slug]?.[week-1];
      // AI and Python use the same guided reading/steps structure as all other courses.
      const guide = window.DALP_GUIDED_LESSONS?.[slug]?.[week-1] || rebuiltModule?.guide;
      const media = window.DALP_WEEK_MEDIA?.[slug]?.[week-1];
      const conceptDiagram = window.DALP_CONCEPT_DIAGRAMS?.[`${slug}:${week}`];
      const educator = window.DALP_EDUCATOR_DEPTH?.[slug]?.[week-1];
      const masterclassHtml = path.specialist ? (window.DALP_TEN_WEEK_UI?.renderSpecialist?.(rebuiltModule,base) || '') : (window.DALP_TEN_WEEK_UI?.renderCore?.(rebuiltModule,base) || '');
      const capstoneProjectHtml = week === 10 && !path.specialist ? (window.DALP_TEN_WEEK_UI?.renderCapstone?.(rebuiltModule,base) || '') : '';
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
      // One non-repeating skill ladder per week, edited for first-time learners and
      // independently verifiable advanced practice. Existing mastery, scoring and
      // course progress remain untouched.
      const deeperLearningHtml = educator && rebuiltModule ? `<section class="za-lesson-block za-learning-depth" id="zaDeeperLearning" aria-labelledby="zaDeeperLearningTitle">
        <div class="za-block-head"><span class="za-block-ico orange" aria-hidden="true">✦</span><div><span class="za-learning-depth-kicker">${safe(educator.level.toUpperCase())} · WEEK ${num(week)} OF 10</span><h2 id="zaDeeperLearningTitle">From first understanding to professional practice</h2></div></div>
        <p class="za-learning-stage-lead">Start with the idea, test it on a small example, and then build the judgment used in real analysis. Advance only after you can explain and verify your result.</p>
        <div class="za-learning-concepts">
          <article class="za-learning-concept"><span>01 · UNDERSTAND</span><h4>Begin with the why</h4><p>${safe(educator.foundation)}</p></article>
          <article class="za-learning-concept"><span>02 · SEE IT WORK</span><h4>Small worked example</h4><p>${safe(educator.worked)}</p></article>
          <article class="za-learning-concept"><span>03 · CHECK THE REASONING</span><h4>Why the method works</h4><p>Identify the input, the transformation, and the expected output. Explain which assumption could change the result.</p></article>
        </div>
        <div class="za-teacher-journey" aria-label="Seven stages of guided instruction">
          <article><span>01 · WHY IT MATTERS</span><h4>Start with the business question</h4><p>${safe(educator.whyItMatters)}</p></article>
          <article><span>02 · UNDERSTAND</span><h4>Explain the idea simply</h4><p>${safe(educator.foundation)}</p></article>
          <article><span>03 · WATCH THE METHOD</span><h4>Step-by-step demonstration</h4><ol>${educator.walkthrough.map(step=>`<li>${safe(step)}</li>`).join('')}</ol></article>
          <article><span>04 · INTERPRET</span><h4>What the result means</h4><p>${safe(educator.outputMeaning)}</p></article>
          <article><span>05 · DEBUG</span><h4>Recognise and correct a common mistake</h4><p>${safe(educator.commonMistake)}</p></article>
          <article><span>06 · PRACTISE</span><h4>Guided attempt</h4><p>${safe(educator.guidedPractice)}</p><h4>Independent challenge</h4><p>${safe(educator.independentPractice)}</p></article>
          <article><span>07 · APPLY PROFESSIONALLY</span><h4>Prove and explain your result</h4><p>${safe(educator.verification)}</p><p>${safe(educator.reflection)}</p></article>
        </div>
        <h3>Turn this week's idea into a working result</h3>
        <ol class="za-learning-process">
          <li><span><strong>Predict:</strong> State the expected output before executing any formula, query, prompt or visual change.</span></li>
          <li><span><strong>Reproduce:</strong> Recreate the worked example using its named fields. Check your input values and the grain of the result.</span></li>
          <li><span><strong>Challenge:</strong> Change one assumption or input, and explain the observed difference without guessing.</span></li>
          <li><span><strong>Defend:</strong> Independently validate the output and document one limitation relevant to the decision.</span></li>
        </ol>
        <details class="za-learning-example-disclosure"><summary>Inspect the companion formula, code or model example</summary>
          <pre class="za-learning-depth-worked"><code>${safe(rebuiltModule.worked)}</code></pre>
          <p>This is a teaching illustration. Match its table and column names to the source file or editor before executing it.</p>
        </details>
        <div class="za-learning-depth-case"><strong>CHECKPOINT · EVIDENCE TO PRODUCE</strong><p>${safe(educator.evidence)}</p></div>
        <div class="za-learning-interpretation"><div><strong>✓ Acceptance criteria</strong><p>${safe(rebuiltModule.check)}</p></div><div><strong>! Mistake to avoid</strong><p>${safe(rebuiltModule.trap)}</p></div></div>
        <div class="za-learning-depth-next"><strong>Continue your practice:</strong> ${safe(rebuiltModule.task)}. Use the included dataset and submit an explanation alongside your output.</div>
      </section>` : '';
      const lessonMinutes = guide ? Math.max(6,Math.round(`${guide.concept} ${guide.reason} ${guide.steps.join(' ')} ${guide.verify} ${guide.case || ''} ${record.example} ${record.exercise} ${media?.why || ''} ${media?.workthrough || ''} ${media?.evidence || ''} ${rebuiltModule?.business || ''} ${rebuiltModule?.worked || ''} ${rebuiltModule?.task || ''} ${rebuiltModule?.check || ''} ${rebuiltModule?.topics?.map(t=>t.heading+' '+t.explanation).join(' ') || ''} ${educator ? [educator.foundation,educator.worked,educator.extension,educator.evidence].join(' ') : ''}`.split(/\s+/).length / 165)) : 4;
      const readTime = one('#zaEstimatedTime');
      if(readTime)readTime.textContent=`Week ${num(week)} · self-paced study`; // Reading-length calculations are not verified study-time estimates.
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
        statistics:[['F05','Statistics foundations'],['I07','Inference and experiments'],['A05','Machine learning']],
        python:[['F04','Python fundamentals'],['I04','pandas analysis'],['A05','Machine learning']],
        ai:[['A05','Machine learning'],['E05','Deep learning'],['E06','Data governance']]
      };
      const deepDive = `<section class="za-lesson-block za-career-bridge" id="zaCareerBridge" aria-label="Continue learning at higher proficiency levels">
          <span class="za-block-kicker">WHAT COMES NEXT</span><h2>Explore specialist learning after this course</h2>
          <p>You have reached the final week of this course. The Advanced Learning Library offers optional specialist modules, worked examples and challenges to help you explore the next level. These modules do not award course completion or certification.</p>
          <div class="za-career-links">${(enrichment[slug]||[]).map(([id,title])=>`<a href="${base}career-path.html#pathway-${id}"><span>${safe(id)}</span><strong>${safe(title)}</strong><span aria-hidden="true">↗</span></a>`).join('')}</div>
          <a class="za-career-all" href="${base}career-path.html#masterLearningPath">Explore the Advanced Learning Library ↗</a>
        </section>`;
      const formulaWeeks = {
        excel:{3:'SUM',4:'TRIM',5:'SUMIFS',6:'LET',7:'chart',8:'SUMIFS',9:'SUMIFS',10:'XLOOKUP'},
        powerbi:{4:'CALCULATE',5:'DATEADD',6:'RANKX',7:'measure',8:'CALCULATE',9:'measure',10:'CALCULATE'},
        sql:{2:'SELECT',3:'GROUP BY',4:'JOIN',5:'CASE',6:'CTE',7:'ROW_NUMBER',8:'GROUP BY',9:'EXPLAIN',10:'JOIN'},
        python:{1:'variables',2:'function',3:'read_csv',4:'missing',5:'groupby',6:'merge',7:'plot',8:'dashboard',9:'report',10:'pipeline'},
        powerquery:{2:'type',3:'null',4:'Text',5:'Table.AddColumn',6:'Table.Combine',7:'Table.NestedJoin',8:'Table.Group',9:'let',10:'Table.TransformColumnTypes'},
        ai:{4:'IF',5:'SELECT',6:'read_csv'}
      };
      const groupForFormula = slug => ({excel:'Excel',powerbi:'DAX',sql:'SQL',python:'Python',powerquery:'Power Query M',ai:week===4?'Excel':week===5?'SQL':'Python'})[slug];
      const formulaSearch = formulaWeeks[slug]?.[week];
      const referenceGroup = formulaSearch ? groupForFormula(slug) : '';
      const formulaHref = formulaSearch ? `${base}reference.html?group=${encodeURIComponent(referenceGroup)}&q=${encodeURIComponent(formulaSearch)}#referenceSearch` : '';
      const formulaHtml = formulaSearch ? `<section class="za-lesson-block za-formula-companion" id="zaFormulaCompanion" aria-labelledby="zaFormulaCompanionTitle"><div class="za-formula-companion-copy"><span class="za-block-kicker">STUDY COMPANION · ${safe(referenceGroup.toUpperCase())}</span><h2 id="zaFormulaCompanionTitle">Practise the formulas and code from this week</h2><p>Open the Formula &amp; Code Lab for a worked ${safe(referenceGroup)} example. Read the explanation, copy the sample and adapt it to your practice dataset. Examples are reference material, not a live execution environment.</p></div><a class="za-btn za-btn-primary" href="${formulaHref}" aria-label="Open Formula and Code Lab for ${safe(referenceGroup)}, week ${week}">Explore ${safe(referenceGroup)} examples <span aria-hidden="true">↗</span></a></section>` : '';
      const aiPromptHtml = slug==='ai' ? `<section class="za-lesson-block za-ai-prompt-guide" aria-label="AI Prompt Library"><div class="za-block-head"><span class="za-block-ico" aria-hidden="true">✧</span><div><span class="za-block-kicker">PRACTICAL AI RESOURCE</span><h2>Prompt Library for Data Analysis</h2></div></div><p>Use curated prompts alongside the weekly exercise. Replace sample business facts with your own non-sensitive data and independently verify any AI-generated calculation.</p><a class="za-btn za-btn-primary" href="${base}prompt-library.html">Explore Prompt Library ↗</a></section>` : '';
      const journey = window.DALP_TOOL_JOURNEYS?.[slug];
      const journeyIndex = Math.min(5, Math.floor((week - 1) * 6 / path.weeks.length));
      const journeyStep = journey?.stages?.[journeyIndex];
      const journeyHtml = journeyStep ? `<section class="za-lesson-block za-tool-journey" aria-label="End-to-end analysis workflow"><span class="za-block-kicker">TOOL-TO-REPORT LEARNING JOURNEY · STAGE ${journeyIndex+1} OF 6</span><h2>${safe(journeyStep.heading)}</h2><p>${safe(journeyStep.detail)}</p><p class="za-journey-check"><strong>Practical checkpoint:</strong> ${safe(journeyStep.task)}</p></section>` : '';
      // Course-specific coaching: avoid a one-size-fits-all hint for nine distinct tools.
      const practiceCoaching = {
        introduction: {hint:'First write the decision the analysis should support. Identify the unit of observation, a measurable outcome, and a meaningful comparison.',check:'Can someone else identify the metric, population, comparison and decision from your question?',mistake:'A broad question such as “How are sales?” cannot be tested without a defined metric and period.'},
        excel: {hint:'Inspect the table headers and data types. Work through two rows manually, then choose the appropriate Excel formula or PivotTable operation.',check:'Compare your Excel result with a hand-calculated sample; verify ranges, absolute references and filtered rows.',mistake:'A formula can return a plausible number while referencing the wrong range or mixing text with numbers.'},
        sql: {hint:'Write down the desired output columns and one-row-per-what grain. Build a SELECT with the smallest needed filter before adding joins or aggregation.',check:'Inspect sample rows and row counts; reconcile grouped totals and check for duplicate multiplication after joins.',mistake:'Joining tables without checking key uniqueness can inflate totals even when the SQL executes.'},
        powerbi: {hint:'Identify the fact table, dimension fields and intended filter context. Validate the measure in a table before formatting a visual.',check:'Reconcile a KPI with source rows and test whether slicers change the result as intended.',mistake:'A calculated column and a measure evaluate in different contexts; confusing them can misstate totals.'},
        tableau: {hint:'Identify the measure, dimension and level of detail before selecting marks or filters. Start with a simple view.',check:'Compare plotted values with a source summary and check whether filters or aggregation alter the population.',mistake:'A convincing chart may hide incorrect aggregation or a misleading axis.'},
        powerquery: {hint:'Inspect the source column types and the Applied Steps order. Change one transformation at a time and preview affected rows.',check:'Compare row counts, column types and representative values before and after the transformation; confirm refresh produces the same schema.',mistake:'Automatic type detection and reordered steps can silently change values or break refresh.'},
        statistics: {hint:'Identify the variable types, sample, question and any assumptions before selecting a summary or statistical method.',check:'Show the calculation or software output, explain the units and interpretation, and state a limitation.',mistake:'Correlation, statistical significance and causation are different claims.'},
        python: {hint:'Inspect the input schema and a few records. Run the smallest working expression, then build up the transformation and add an assertion.',check:'Run the code on a small known example; compare row counts, missing values and numerical totals against expected results.',mistake:'Code that runs without an exception can still produce wrong answers because of types, nulls or joins.'},
        ai: {hint:'Specify the actual input fields, task and output format. Ask the model to identify missing evidence rather than fill gaps.',check:'Verify every numerical claim against the original dataset or a real calculation engine and document corrections.',mistake:'Fluent AI-generated text is not evidence that the numbers, formulas or citations are correct.'}
      };
      const coach = practiceCoaching[slug] || practiceCoaching.introduction;
      one('#zaLessonBody').innerHTML=`
        <nav class="za-lesson-sections" aria-label="Sections in this lesson">
          <span class="za-section-toc-title">IN THIS WEEK</span>
          ${guide?'<button type="button" data-jump="zaConcepts">Read the concepts</button>':''}
          <button type="button" data-jump="zaVisualGuide">Visual interface guide</button>
          <button type="button" data-jump="zaMasterclass">Tool masterclass</button>
          <button type="button" data-jump="zaLessonResources">Dataset & video</button>
          ${formulaHtml?'<button type="button" data-jump="zaFormulaCompanion">Formula & code lab</button>':''}
          ${guide?'<button type="button" data-jump="zaMethod">Guided walkthrough</button>':''}
          ${rebuiltModule?'<button type="button" data-jump="zaDeeperLearning">Beginner to advanced practice</button>':''}
          <button type="button" data-jump="zaExample">Worked example</button>
          <button type="button" data-jump="zaExercise">Try an exercise</button>
          <button type="button" data-jump="zaRecap">Review & recap</button>
        </nav>
        <section class="za-lesson-block za-lesson-objective" id="zaGoals"><div class="za-block-head"><span class="za-block-ico" aria-hidden="true">◎</span><div><span class="za-block-kicker">01 · LEARNING GOAL</span><h2>What you will understand</h2></div></div><p>${safe(record.outcome)}.</p><p><strong>Learning evidence:</strong> ${safe(educator?.evidence || record.exercise)}</p><div class="za-tip"><b>How to study this module:</b> Read both explanations, follow the guided workflow, examine the example, and solve the exercise before opening its answer. Finish with the separate weekly questions.</div></section>
        <figure class="za-week-interface-visual" id="zaVisualGuide">
          <div class="za-week-interface-head"><div><span>VISUAL LEARNING GUIDE · WEEK ${num(week)}</span><h2>${safe(record.title)}</h2></div><span class="za-visual-badge">Illustrative interface</span></div>
          <img src="${base}assets/images/lesson-interfaces/${safe(slug)}-week-${week}.${slug==='excel'&&week===1?'png':'svg'}" alt="Illustrated interface for ${safe(path.title)} Week ${week}: ${safe(record.title)}" width="1200" height="600" loading="lazy" decoding="async" />
          <figcaption><strong>Study the visual:</strong> ${safe(record.outcome)}. This topic-specific diagram illustrates the workflow or analytical concept; use your practice dataset to reproduce and verify it.</figcaption>
        </figure>
        ${conceptDiagram ? `<figure class="za-concept-diagram" aria-label="Concept diagram: ${safe(conceptDiagram.title)}"><div class="za-concept-diagram-heading"><span>CONCEPT EXPLAINED VISUALLY</span><h2>${safe(conceptDiagram.title)}</h2></div><img src="${base}assets/images/lesson-concepts/${safe(conceptDiagram.file)}" width="720" height="${slug==='powerbi'&&week===3?880:440}" loading="lazy" decoding="async" alt="${safe(conceptDiagram.description)}"><figcaption>${safe(conceptDiagram.description)} <strong>Try it:</strong> Identify the inputs, follow the connections, and explain what changes in the output.</figcaption></figure>` : ''}
        ${kitHtml}
        ${formulaHtml}
        ${masterclassHtml}
        ${guideHtml}
        ${deeperLearningHtml}
        ${deepHtml}
        ${journeyHtml}
        ${aiPromptHtml}
        <section class="za-lesson-block" id="zaExample"><div class="za-block-head"><span class="za-block-ico" aria-hidden="true">▥</span><div><span class="za-block-kicker">02 · WORKED EXAMPLE</span><h2>See the idea in practice</h2></div></div><p class="za-example-intro">Read the scenario. Identify the input, the operation, and what the result means for the business question.</p><div class="za-example">${safe(record.example)}</div>${guide?.case ? `<div class="za-case-study"><div class="za-case-label">APPLY IT TO A REALISTIC CASE</div><p>${safe(guide.case)}</p></div>` : ''}</section>
        <section class="za-lesson-block" id="zaExercise"><div class="za-block-head"><span class="za-block-ico orange" aria-hidden="true">✎</span><div><span class="za-block-kicker">03 · YOUR TURN</span><h2>Try the practical exercise</h2></div></div><p>${safe(record.exercise)}</p><div class="za-exercise-help"><strong>Attempt first · independent practice.</strong> Identify the input fields, write down your expected result, complete the task in the relevant tool, and explain what the output means. This is practice, not an instructor-graded submission.</div>
          ${['sql','excel','python'].includes(slug)?`<div class="za-lesson-practice-bridge" role="region" aria-label="Practise this lesson"><strong>Practise this lesson in the ${safe(path.title)} editor</strong><p>Open a relevant challenge with its task brief, dataset and editor. Your place in Week ${num(week)} is preserved when you return.</p><a class="za-btn za-btn-primary" href="${base}practice.html?tool=${encodeURIComponent(slug)}&week=${week}&lesson=${encodeURIComponent(record.title)}&return=${encodeURIComponent(courseHref(slug)+'?week='+week+'#zaExercise')}">Practise this concept ↗</a></div>`:''}
          <details class="za-teaching-hint"><summary>Show hint — reveal the next step, not the answer</summary><p>${safe(coach.hint)}</p></details>
          <div class="za-practice-check"><h3>Check your work before viewing the solution</h3><p>${safe(guide?.verify || rebuiltModule?.check || record.outcome)}</p><p><strong>Evidence to keep:</strong> ${safe(educator?.evidence || record.exercise)}</p><p>${safe(coach.check)} Record one assumption or limitation.</p></div>
          <details class="za-exercise-solution"><summary>Show solution and explanation — open after your attempt</summary><div class="za-solution">${safe(record.solution)}</div><p><strong>Why a common approach fails:</strong> ${safe(record.pitfall)}</p><p>${safe(coach.mistake)} Compare the method, intermediate steps and final interpretation with your own work.</p></details>
          ${educator ? `<div class="za-practice-transfer"><h3>Apply the skill to a new situation</h3><p>${safe(educator.extension)}</p><p><strong>Success check:</strong> ${safe(educator.evidence)}</p></div>` : ''}
          <div class="za-practice-support"><h3>If you are stuck</h3><p>Review the worked example and guided steps above, try the hint, then compare your attempt with the solution. Revisit the practice file and relevant reference material before continuing.</p>${formulaHref ? `<a href="${formulaHref}">Open the verified formula and code reference for this week</a>` : ''}</div></section>
        <section class="za-lesson-block za-lesson-recap" id="zaRecap"><div class="za-block-head"><span class="za-block-ico" aria-hidden="true">✓</span><div><span class="za-block-kicker">LEARNING RECAP</span><h2>Check your understanding</h2></div></div><p class="za-recap-lead">Before you move on, explain the main idea in your own words and confirm that your calculations or decisions can be checked independently.</p><div class="za-recap-card"><strong>What a correct result should show</strong><p>${safe(guide?.verify || record.outcome)}</p></div><div class="za-recap-card za-recap-warning"><strong>Remember this limitation</strong><p>${safe(record.pitfall)}.</p></div><p class="za-recap-next">When you are ready, select <b>Questions to Try</b> below. Questions open on a separate assessment page; completing the lesson and submitting a quiz remain separate actions.</p></section>${capstoneProjectHtml}${week===path.weeks.length?deepDive:''}`;
      all('.za-lesson-sections button',one('#zaLessonBody')).forEach(button=>button.addEventListener('click',()=>{
        const section=document.getElementById(button.dataset.jump);
        section?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
      }));
      const next=path.weeks[week]?`${courseHref(slug)}?week=${week+1}`:base+'capstone.html?course='+encodeURIComponent(slug);
      const done=!!readProgress(slug)[String(week)];
      const practiceLink=['sql','excel','python'].includes(slug)?`<a class="za-btn za-btn-line" href="${base}practice.html?tool=${encodeURIComponent(slug)}&week=${week}&lesson=${encodeURIComponent(record.title)}&return=${encodeURIComponent(courseHref(slug)+'?week='+week+'#zaExercise')}" aria-label="Practise ${safe(path.title)} in the Practice Arena">Practice Arena ↗</a>`:'';
      const roadmapLink=``;
      one('#zaLessonActions').innerHTML=`<button id="zaMarkWeek" type="button" class="za-btn za-btn-line">${done?'✓ Previously completed':'Check completion eligibility'}</button><a class="za-btn za-btn-primary" href="${quizHref(slug,week)}">Questions to Try ↗</a><a class="za-btn za-btn-line" href="${next}">${week===path.weeks.length?'Capstone project ↗':'Next week →'}</a>${practiceLink}${roadmapLink}${week===path.weeks.length?`<a class="za-btn za-btn-mastery" href="${masteryHref(slug)}">✦ Mastery Assessment · ${masteryCount(path)} Questions ↗</a>`:''}<span class="za-save-status" id="zaSaveStatus" role="status" aria-live="polite"></span>`;
      const completionButton=one('#zaMarkWeek');
      const completionStatus=one('#zaSaveStatus');
      async function refreshCompletionEligibility(){
        if(done){
          completionButton.textContent='✓ Previously completed';
          completionButton.disabled=true;
          completionStatus.textContent='Your existing completion is preserved.';
          return;
        }
        completionButton.disabled=true;
        completionStatus.textContent='Checking weekly assessment…';
        const result=await verifiedWeekScore(slug,week);
        const passed=result.percent>=WEEK_PASS_PERCENT;
        completionButton.disabled=!passed;
        completionButton.textContent=passed?'✓ Mark week complete':'Assessment required · 80% to pass';
        completionStatus.textContent=passed
          ? `Best verified assessment score: ${Math.round(result.percent)}%. You can complete this week.`
          : `Best recorded assessment score: ${Math.round(result.percent)}%. Complete the weekly assessment with at least ${WEEK_PASS_PERCENT}% to unlock completion.`;
      }
      completionButton.addEventListener('click', async function(){
        const eligible=await verifiedWeekScore(slug,week);
        if(eligible.percent<WEEK_PASS_PERCENT){
          await refreshCompletionEligibility();return;
        }
        this.disabled=true;completionStatus.textContent='Saving your week…';
        try{
          const result=await window.ZAHProgressCloud.saveWeek(slug,week,true);
          if(result.ok){
            this.textContent='✓ Marked as complete';
            completionStatus.textContent='Week completed and synced to your account.';
          } else {
            this.textContent='Retry saving week';
            completionStatus.textContent='Your completion is pending cloud sync. Please retry.';
          }
          progressView();
        }catch(error){completionStatus.textContent='Unable to save this week right now. Please retry.';}
        finally{if(this.textContent!=='✓ Marked as complete')this.disabled=false;}
      });
      void refreshCompletionEligibility();
      window.addEventListener('pageshow',()=>{if(current===week)void refreshCompletionEligibility();},{once:true});
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
    window.addEventListener('dalp:progress-updated',event=>{if(event.detail?.slug===slug)progressView();});
    window.addEventListener('pageshow',event=>{if(event.persisted)void syncCourse(slug,progressView);});
  }
  /* A standalone guided exam: 50 original questions, exactly one visible at a time.
     Only a chosen answer enables Check Answer. Results are never revealed early. */
  function masteryPage(path, questions, slug){
    const form=one('#zaQuizForm'),check=one('#zaQuizSubmit'),retry=one('#zaQuizRetry');
    const result=one('#zaQuizResult'),message=one('#zaQuizSaveStatus');
    const actions=one('.za-quiz-actions');
    const total=questions.length;
    const draftKey=`dalp:mastery:draft:v2:${slug}`;
    let index=0, answers=Array(total).fill(null), reviewed=Array(total).fill(false);
    let finished=false;
    try {
      const draft=JSON.parse(window.DALP_STORAGE.getItem(draftKey)||'null');
      if(draft?.version===2&&Array.isArray(draft.answers)&&draft.answers.length===total&&Array.isArray(draft.reviewed)&&draft.reviewed.length===total){
        answers=draft.answers.map((a,i)=>Number.isInteger(a)&&a>=0&&a<questions[i].choices.length?a:null);
        reviewed=draft.reviewed.map((v,i)=>v===true&&answers[i]!==null);
        index=Math.max(0,Math.min(total-1,Number(draft.index)||0));
      }
    } catch(_) {/* Browser storage is optional. */}
    const remember=()=>{try{window.DALP_STORAGE.setItem(draftKey,JSON.stringify({version:2,index,answers,reviewed}));}catch(_){}};
    const rich=value=>safe(value).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
    const percentage=n=>Math.round(n/total*100);
    check.textContent='Check answer';check.disabled=true;
    check.hidden=false;retry.hidden=true;result.hidden=true;
    actions.classList.add('is-mastery-actions');
    check.insertAdjacentHTML('afterend',`<div class="za-mastery-navigation" aria-label="Question navigation"><button id="zaMasteryPrevious" class="za-btn za-btn-line" type="button">← Previous</button><button id="zaMasteryNext" class="za-btn za-btn-primary" type="button">Next question →</button></div>`);
    const previous=one('#zaMasteryPrevious'),next=one('#zaMasteryNext');
    const formatAnswer=q=>String.fromCharCode(65+q.answer);
    const resultFeedback=(q,picked,correct)=>`<div class="za-mastery-feedback ${correct?'is-correct':'is-incorrect'}" aria-live="polite" tabindex="-1">
      <div class="za-mastery-feedback-heading"><span class="za-mastery-feedback-mark" aria-hidden="true">${correct?'✓':'↗'}</span><div><span class="za-mastery-kicker">QUESTION REVIEW · WEEK ${num(q.week)}</span><h3>${correct?'Correct — well reasoned':'Review the reasoning'}</h3><p>Best answer: <strong>${formatAnswer(q)}. ${safe(q.choices[q.answer])}</strong></p></div></div>
      <div class="za-mastery-feedback-section"><h4>Why this is the best answer</h4><p>${safe(q.why)}</p></div>
      <div class="za-mastery-feedback-section"><h4>Understand every option</h4><ol class="za-mastery-option-review">${q.optionNotes.map((note,i)=>`<li class="${i===q.answer?'is-best-option':''}"><strong>${String.fromCharCode(65+i)}</strong><span>${safe(note)}</span></li>`).join('')}</ol></div>
      <div class="za-mastery-feedback-section"><h4>Worked example · apply the reasoning</h4><pre class="za-mastery-worked"><code>${safe(q.worked)}</code></pre><p><strong>How to validate your work:</strong> ${safe(q.validation)}</p></div>
      <div class="za-mastery-feedback-foot"><p><strong>Common trap:</strong> ${safe(q.pitfall)}</p><p><strong>Try independently:</strong> ${safe(q.practice)}</p></div></div>`;
    function paint(){
      if(finished)return;
      const q=questions[index];const picked=answers[index],checked=reviewed[index];
      const correct=checked&&picked===q.answer;
      const reviewedCount=reviewed.filter(Boolean).length;
      one('#zaQuizProgressText').textContent=`Question ${index+1} of ${total} · ${reviewedCount} reviewed`;
      one('#zaQuizProgressFill').style.width=percentage(reviewedCount)+'%';
      one('#zaQuizCount').textContent=String(total);
      form.hidden=false;result.hidden=true;
      form.innerHTML=`<section class="za-question za-mastery-question ${checked?(correct?'is-correct':'is-incorrect'):''}" data-question-id="${safe(q.id)}" aria-label="Question ${index+1} of ${total}">
        <div class="za-mastery-question-top"><span class="za-q-index"><span>${num(index+1)}</span> QUESTION ${index+1} OF ${total}</span><span class="za-mastery-topic">WEEK ${num(q.week)} · ${safe(q.topic)}</span></div>
        <h2 tabindex="-1" id="za-mastery-question-heading">${rich(q.q)}</h2>
        <p class="za-mastery-question-instruction">Choose the strongest answer. The explanation unlocks after you select and check your choice.</p>
        <div class="za-choice-list" role="radiogroup" aria-labelledby="za-mastery-question-heading">${q.choices.map((choice,j)=>`<label class="za-choice za-mastery-choice ${checked&&j===q.answer?'is-best':''} ${checked&&j===picked&&j!==q.answer?'is-missed':''}"><input type="radio" name="mastery-option" value="${j}" ${picked===j?'checked':''} ${checked?'disabled':''} aria-label="Option ${String.fromCharCode(65+j)}: ${safe(choice)}"><span class="za-choice-letter" aria-hidden="true">${String.fromCharCode(65+j)}</span><span>${safe(choice)}</span>${checked&&j===q.answer?'<span class="za-mastery-choice-status">Correct</span>':''}</label>`).join('')}</div>
        ${checked?resultFeedback(q,picked,correct):'<p class="za-mastery-locked-note" role="status">Select an option to enable <strong>Check answer</strong>.</p>'}
      </section>`;
      check.disabled=picked===null||checked;
      check.hidden=checked;
      previous.disabled=index===0;next.disabled=!checked;
      next.textContent=index===total-1?'Finish assessment ✓':'Next question →';
      retry.hidden=true;
    }
    async function saveMastery(score){
      const u=await user();
      try{const key=`dalp-academy-quiz:${u?.id||'guest'}:${slug}:mastery`;
        const prior=JSON.parse(window.DALP_STORAGE.getItem(key)||'{}');
        window.DALP_STORAGE.setItem(key,JSON.stringify({best:Math.max(prior.best||0,score),latest:score,total,percentage:percentage(score),at:new Date().toISOString()}));
      }catch(_) {/* Storage is optional. */}
      if(!u||!window.ZAH_DB?.client){message.textContent='Sign in to save your result to your DataLearning account. Unsaved results disappear when you close this page.';return;}
      try {
        // Existing mastery_results schema requires an integer 0–10 score and total=10.
        // Keep the accurate 50-item percentage; normalize the stored legacy score only.
        const {error}=await window.ZAH_DB.client.from('mastery_results').upsert({
          user_id:u.id,course_slug:slug,score:Math.round(score/5),total:10,
          percentage:percentage(score),submitted_at:new Date().toISOString()
        },{onConflict:'user_id,course_slug'});
        if(error)throw error;
        message.textContent='Your 50-question mastery result has been synced to your DataLearning account.';
      }catch(error){console.warn('Mastery sync unavailable:',error?.message||error);message.textContent='Cloud save failed. Your result is only held in memory; retry when your connection returns.';}
    }
    async function finish(){
      if(!reviewed.every(Boolean))return;
      finished=true;
      const score=questions.reduce((sum,q,i)=>sum+Number(answers[i]===q.answer),0);
      const rows=Array.from({length:10},(_,i)=>({week:i+1,score:questions.reduce((n,q,j)=>n+Number(q.week===i+1&&answers[j]===q.answer),0)}));
      form.hidden=true;check.hidden=true;previous.hidden=true;next.hidden=true;retry.hidden=false;
      one('#zaQuizProgressText').textContent=`Completed · ${total} of ${total} answers reviewed`;
      one('#zaQuizProgressFill').style.width='100%';
      result.hidden=false;result.className='za-quiz-result za-mastery-summary';
      result.innerHTML=`<span class="za-mastery-kicker">MASTERY ASSESSMENT COMPLETED</span><h2>${score} / ${total} correct · ${percentage(score)}%</h2><p>${score>=40?'Strong result. Use your explanations to consolidate the remaining gaps.':'You completed the exam. Review the weaker weeks below and study the worked solutions before trying again.'}</p><h3>Performance by learning week</h3><div class="za-mastery-breakdown">${rows.map(row=>`<div><span>Week ${num(row.week)}</span><strong>${row.score} / 5</strong><span class="za-mastery-mini-bar" aria-label="${row.score} of 5 correct"><i style="width:${row.score*20}%"></i></span></div>`).join('')}</div><p class="za-mastery-summary-note">Each question was checked with a worked explanation. Your course mastery percentage is calculated from all 50 questions.</p>`;
      try{window.DALP_STORAGE.removeItem(draftKey);}catch(_){}
      message.textContent='Saving your 50-question result…';
      result.scrollIntoView({block:'start',behavior:'smooth'});
      await saveMastery(score);
    }
    form.addEventListener('change',event=>{
      if(finished||reviewed[index]||event.target.name!=='mastery-option')return;
      answers[index]=Number(event.target.value);
      check.disabled=false;
      remember();
    });
    check.addEventListener('click',()=>{
      if(finished||reviewed[index]||answers[index]===null)return;
      reviewed[index]=true;remember();paint();
      one('.za-mastery-feedback',form)?.focus({preventScroll:true});
    });
    previous.addEventListener('click',()=>{if(index>0){index--;remember();paint();one('#za-mastery-question-heading')?.focus({preventScroll:true});form.scrollIntoView({block:'start'});}});
    next.addEventListener('click',()=>{if(!reviewed[index])return;if(index===total-1){finish();return;}index++;remember();paint();one('#za-mastery-question-heading')?.focus({preventScroll:true});form.scrollIntoView({block:'start'});});
    retry.addEventListener('click',()=>{
      finished=false;answers=Array(total).fill(null);reviewed=Array(total).fill(false);index=0;
      check.hidden=false;previous.hidden=false;next.hidden=false;retry.hidden=true;result.hidden=true;message.textContent='';
      remember();paint();form.scrollIntoView({block:'start'});
    });
    // Restore an interrupted attempt after authenticated cloud state finishes hydrating.
    window.addEventListener('dalp:cloud-hydrated',()=>{
      if(finished||answers.some(a=>a!==null))return;
      try{const draft=JSON.parse(window.DALP_STORAGE.getItem(draftKey)||'null');
        if(draft?.version===2&&Array.isArray(draft.answers)&&draft.answers.length===total&&Array.isArray(draft.reviewed)&&draft.reviewed.length===total){
          answers=draft.answers.map((a,i)=>Number.isInteger(a)&&a>=0&&a<questions[i].choices.length?a:null);
          reviewed=draft.reviewed.map((v,i)=>v===true&&answers[i]!==null);
          index=Math.max(0,Math.min(total-1,Number(draft.index)||0));paint();}
      }catch(_){}
    },{once:true});
    paint();
  }
  function masteryCourseSelection(){
    const pageRoot=one('.za-quiz-page');
    pageRoot?.classList.add('za-mastery-selection-page');
    one('#zaQuizEyebrow').textContent='DATALEARNING · EXAM READINESS';
    one('#zaQuizTitle').textContent='Mastery Assessment';
    one('#zaQuizIntro').textContent='Choose a course to begin. Your exam stays closed until you select a learning path.';
    one('#zaQuizCount').textContent='50';
    one('#zaQuizBread').textContent='Choose a course';
    one('#zaQuizCourseLink').textContent='Learning paths';
    one('#zaQuizCourseLink').href=base+'index.html#zaDiscoverCards';
    one('#zaQuizProgressText').textContent='Your assessment has not started';
    one('#zaQuizProgressFill').style.width='0%';
    one('#zaQuizBack').href=base+'index.html#zaDiscoverCards';
    one('#zaQuizBack').textContent='← Explore courses';
    const form=one('#zaQuizForm');
    const actions=one('.za-quiz-actions');
    one('#zaQuizSubmit').hidden=true;
    one('#zaQuizRetry').hidden=true;
    one('#zaQuizResult').hidden=true;
    actions?.classList.add('za-mastery-selection-actions');
    document.title='Choose Your Mastery Assessment · DataLearning';
    const cards=completeCatalog.map(path=>`<button type="button" class="za-mastery-course-card" data-mastery-course="${safe(path.slug)}" aria-label="Select ${safe(path.title)} for the 50-question mastery assessment">
      <span class="za-mastery-course-icon">${icon(path.slug)}</span>
      <span class="za-mastery-course-copy"><strong>${safe(path.title)}</strong><small>10 weeks · 50 questions · Detailed answer review</small></span>
      <span class="za-mastery-course-arrow" aria-hidden="true">↗</span></button>`).join('');
    form.innerHTML=`<section class="za-mastery-launch" aria-labelledby="za-mastery-launch-title">
      <div class="za-mastery-launch-head"><span class="za-mastery-launch-symbol" aria-hidden="true">✦</span><div><span class="za-mastery-kicker">READY FOR YOUR FINAL CHECKPOINT?</span><h2 id="za-mastery-launch-title">Choose what you want to master.</h2><p>Each assessment tests knowledge from Weeks 01–10. You will receive one question per screen, immediate feedback after checking your answer, worked examples and a final breakdown by week.</p></div></div>
      <div class="za-mastery-launch-stats" aria-label="Assessment at a glance"><span><b>50</b> questions</span><span><b>10</b> learning weeks</span><span><b>1</b> question per page</span><span><b>4</b> answer options</span></div>
      <div class="za-mastery-select-heading"><div><span class="za-mastery-kicker">STEP 01 · SELECT A COURSE</span><h3>Available mastery exams</h3></div><span class="za-mastery-course-total">${completeCatalog.length} courses</span></div>
      <div class="za-mastery-course-grid">${cards}</div>
      <div class="za-mastery-how"><div><span class="za-mastery-how-index">01</span><strong>Select a course</strong><p>No questions appear before you choose your exam.</p></div><div><span class="za-mastery-how-index">02</span><strong>Answer and check</strong><p>Check Answer unlocks only after you select a choice.</p></div><div><span class="za-mastery-how-index">03</span><strong>Learn from feedback</strong><p>Review why each option works or does not before moving ahead.</p></div></div>
    </section>`;
    form.addEventListener('click',event=>{const button=event.target.closest('[data-mastery-course]');if(!button)return;
      location.href=masteryHref(button.dataset.masteryCourse);
    });
  }
  function quizPage(){
    const params=new URLSearchParams(location.search);
    const slug=params.get('course')||'';
    const rawWeek=params.get('week')||(slug?'1':'mastery');
    if(!slug&&rawWeek==='mastery'){masteryCourseSelection();return;}
    const path=pathFor(slug);
    const isMastery=rawWeek==='mastery';
    const week=Number(rawWeek);
    if(isMastery&&!path){masteryCourseSelection();return;}
    if(!path || (!isMastery&&(!Number.isInteger(week)||week<1||week>path.weeks.length))){
      one('#zaQuizTitle').textContent='Questions not found';one('#zaQuizForm').textContent='Select a learning path and week from the course catalogue.';
      one('#zaQuizSubmit').hidden=true;return;
    }
    const questions=isMastery?window.DALP_MASTERY_EXAMS?.[slug]:path.weeks[week-1].questions;
    if(isMastery&&(!Array.isArray(questions)||questions.length!==50)){one('#zaQuizTitle').textContent='Mastery assessment unavailable';one('#zaQuizForm').textContent='The 50-question assessment could not be loaded. Refresh the page and try again.';one('#zaQuizSubmit').hidden=true;return;}
    const label=isMastery?'Course Mastery Assessment':`Week ${num(week)} · Questions to Try`;
    one('#zaQuizEyebrow').textContent=isMastery?'FINAL COURSE CHECKPOINT':`${path.title.toUpperCase()} · KNOWLEDGE CHECK`;
    one('#zaQuizTitle').textContent=label;
    one('#zaQuizIntro').textContent=isMastery?`Complete ${masteryCount(path)} exam-style questions across all ten weeks in ${path.title}. One question appears at a time; select an answer to unlock the detailed explanation and continue.`:`You have learned about ${path.weeks[week-1].title.toLowerCase()}. Try these questions and review what the best answers mean.`;
    one('#zaQuizBread').textContent=isMastery?'Mastery assessment':`Week ${num(week)}`;
    one('#zaQuizCount').textContent=String(questions.length).padStart(2,'0');
    one('#zaQuizCourseLink').href=courseHref(slug);one('#zaQuizCourseLink').textContent=path.title;
    one('#zaQuizBack').href=isMastery?courseHref(slug):courseHref(slug)+`?week=${week}`;
    document.title=`${label} | ${path.title} · DataLearning`;
    if(isMastery){
      one('#zaQuizIntro').insertAdjacentHTML('afterend',`<a class="za-mastery-switch" href="${base}quiz.html?week=mastery" aria-label="Change mastery assessment course">↔ Change course</a>`);
      one('.za-quiz-page')?.classList.add('za-mastery-active-page');
      masteryPage(path,questions,slug);return;
    }
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
      try{const prior=JSON.parse(window.DALP_STORAGE.getItem(localKey)||'{}');window.DALP_STORAGE.setItem(localKey,JSON.stringify({best:Math.max(prior.best||0,score),bestPercent:Math.max(prior.bestPercent||0,Math.round(100*score/questions.length)),latest:score,total:questions.length,at:new Date().toISOString()}));}catch(_){/* storage optional */}
      if(!u || !window.ZAH_DB?.client){message.textContent='Quiz result saved on this device. Sign in to store results in Supabase.';return;}
      const percentage=Math.round(100*score/questions.length);
      let table,record,conflict;
      if(isMastery){table='mastery_results';conflict='user_id,course_slug';record={user_id:u.id,course_slug:slug,score:Math.round(score*10/questions.length),total:10,percentage,submitted_at:new Date().toISOString()};}
      else{table='quiz_results';conflict='user_id,course_slug,week_no';record={user_id:u.id,course_slug:slug,week_no:week,score,answered:questions.length,total:questions.length,percentage,submitted_at:new Date().toISOString()};}
      try{
        if(!isMastery){
          const {data:previous,error:readError}=await window.ZAH_DB.client.from('quiz_results')
            .select('percentage,score,answered,total').eq('user_id',u.id)
            .eq('course_slug',slug).eq('week_no',week).maybeSingle();
          if(readError)throw readError;
          if(previous && Number(previous.percentage)>percentage){
            record.percentage=Number(previous.percentage);
            record.score=Number(previous.score);
            record.answered=Number(previous.answered);
            record.total=Number(previous.total);
          }
        }
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
      const completed=completeCatalog.reduce((n,p)=>n+completedCount(p.slug),0);
      const inProgress=completeCatalog.filter(p=>completedCount(p.slug)>0).length;
      const total=completeCatalog.reduce((n,p)=>n+p.weeks.length,0);
      summary.innerHTML=`<div class="za-stat-card"><span>WEEKS COMPLETED</span><strong>${completed}</strong><small>Out of ${total} structured modules</small></div><div class="za-stat-card"><span>LEARNING PATHS STARTED</span><strong>${inProgress}</strong><small>Across nine available paths</small></div><div class="za-stat-card"><span>OVERALL PROGRESS</span><strong>${Math.round(completed/total*100)}%</strong><small>Your completed course units</small></div>`;
      cards.innerHTML=completeCatalog.map(path=>`<article class="za-progress-card"><div class="za-progress-card-head"><span class="za-card-icon" aria-hidden="true">${icon(path.slug)}</span><div><h3>${safe(path.title)}</h3><small>${completedCount(path.slug)} of ${path.weeks.length} weeks complete</small></div></div><div class="za-bar"><span style="width:${percent(path.slug)}%"></span></div><div class="za-progress-card-footer"><b>${percent(path.slug)}% complete</b><a href="${courseHref(path.slug)}">Continue learning ↗</a><a class="za-mastery-progress-link" href="${masteryHref(path.slug)}" aria-label="Open ${safe(path.title)} mastery assessment">Mastery · ${masteryCount(path)} questions ↗</a></div></article>`).join('');
    }
    render();
    (async()=>{
      const u=await user();
      if(!u){status.textContent='You are viewing progress saved on this device. Sign in to securely sync across devices.';return;}
      status.textContent='Checking your synced course progress…';
      const outcomes=await Promise.all(completeCatalog.map(async p=>{try{const result=await window.ZAHProgressCloud?.syncCourse(p.slug);render();return result;}catch(error){console.warn('Progress sync failed',p.slug,error);return {ok:false};}}));
      render();status.textContent=outcomes.every(r=>r?.ok)?'Your course progress is synced with your account.':'Showing available progress. Some cloud records could not be refreshed; retry when connected.';
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
  window.DALP_ACADEMY_APP={catalog:completeCatalog,percent,readProgress};
})();
