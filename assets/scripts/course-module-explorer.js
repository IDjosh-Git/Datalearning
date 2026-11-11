/* DataLearning weekly curriculum explorer.
 * Read-only views of the existing canonical course data: no progress writes,
 * no replacing lessons, no duplicate quiz implementation. */
(() => {
  'use strict';
  const library = window.DALP_COURSES_V97 || {};
  const slugs = ['introduction', 'excel', 'sql', 'powerbi', 'python', 'ai'];
  const names = { introduction:'Data analysis', excel:'Excel', sql:'SQL', powerbi:'Power BI', python:'Python', ai:'AI for analysts' };
  const icons = { introduction:'intro', excel:'excel', sql:'sql', powerbi:'powerbi', python:'python', ai:'ai' };
  const $ = (sel, parent = document) => parent.querySelector(sel);
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = String(text);
    return node;
  };
  const isIntro = slug => slug === 'introduction';
  const unitWord = slug => isIntro(slug) ? 'Lesson' : 'Week';
  const unitNumber = number => String(number).padStart(2, '0');
  const courseUrl = slug => `courses/${slug}.html`;
  const lessonUrl = (slug, unit) => `${courseUrl(slug)}#${encodeURIComponent(unit.id)}`;
  const quizUrl = (slug, unit) => `quiz.html?course=${encodeURIComponent(slug)}&week=${isIntro(slug) ? 'final' : unit.number}`;

  function stages(slug, units) {
    const intro = isIntro(slug);
    return intro ? [
      { name:'Discover the foundations', desc:'Begin with the questions that make analysis useful.', units: units.slice(0, 3) },
      { name:'Build data confidence', desc:'Learn to inspect, check and calculate with real records.', units: units.slice(3, 6) },
      { name:'Apply what you learned', desc:'Complete the case study and choose your next tool.', units: units.slice(6) }
    ] : [
      { name:'Start with the essentials', desc:'Get oriented and establish a reliable foundation.', units: units.slice(0, 3) },
      { name:'Build practical skills', desc:'Work through the core analytical techniques.', units: units.slice(3, 7) },
      { name:'Apply and demonstrate', desc:'Bring the ideas together in reporting and project work.', units: units.slice(7) }
    ];
  }

  function progress(slug) {
    const course = library[slug];
    if (!course || !window.DALP_AUTH_USER) return null;
    try {
      const stored = JSON.parse(localStorage.getItem(course.storageKey) || '{}');
      return course.units.filter(item => stored?.[String(item.number)] === true).length;
    } catch (_) { return null; }
  }

  function unitCard(slug, unit, compact = false) {
    const card = el('article', compact ? 'dlmx-compact-unit' : 'dlmx-unit-card');
    card.dataset.unitNumber = String(unit.number);
    const row = el('div', 'dlmx-unit-main');
    const number = el('span','dlmx-unit-index',unitNumber(unit.number)); number.setAttribute('aria-hidden','true');
    const copy = el('div','dlmx-unit-copy');
    copy.append(el('span','dlmx-unit-eyebrow',`${unitWord(slug)} ${unitNumber(unit.number)}${unit.time ? ' · ' + unit.time : ''}`),
      el(compact ? 'h4' : 'h3','dlmx-unit-title',unit.title));
    if (!compact) copy.append(el('p','dlmx-unit-desc',unit.description || 'Read the lesson and practise the techniques.'));
    row.append(number,copy); card.append(row);

    const actions = el('div','dlmx-unit-actions');
    const lesson = el('a','dlmx-link dlmx-link-primary','Study lesson');
    lesson.href= lessonUrl(slug,unit);
    lesson.setAttribute('aria-label',`Study ${unitWord(slug).toLowerCase()} ${unit.number}: ${unit.title}`);
    actions.append(lesson);
    if (!isIntro(slug)) {
      const quiz = el('a','dlmx-link dlmx-link-secondary','Questions to try');
      quiz.href=quizUrl(slug,unit);
      quiz.setAttribute('aria-label',`Questions to try for week ${unit.number} of ${names[slug]}`);
      actions.append(quiz);
    } else if (unit.number === library.introduction.units.length) {
      const quiz = el('a','dlmx-link dlmx-link-secondary','Foundation questions');
      quiz.href=quizUrl(slug,unit);
      actions.append(quiz);
    }
    card.append(actions);
    return card;
  }

  function makeCatalog() {
    const mount = $('#dlmx-explorer');
    if (!mount || slugs.some(slug=>!library[slug])) return;
    const buttons = $('#dlmx-subjects',mount);
    const display = $('#dlmx-active-course',mount);
    if (!buttons || !display) return;
    const params = new URLSearchParams(location.search);
    let active = library[params.get('course')] ? params.get('course') : 'excel';

    slugs.forEach(slug => {
      const course = library[slug];
      const button = el('button','dlmx-subject');
      button.type='button'; button.dataset.slug=slug;
      button.setAttribute('aria-controls','dlmx-active-course');
      const image = el('img','dlmx-subject-icon');
      image.src=`assets/icons/icon-${icons[slug]}.svg`; image.dataset.brandCourse=slug; image.alt=''; image.width=42;image.height=42; image.loading='lazy';
      const copy = el('span','dlmx-subject-copy');
      copy.append(el('strong','',names[slug]),el('small','',`${course.units.length} ${isIntro(slug)?'lessons':'weeks'}`));
      const arrow=el('span','dlmx-subject-arrow','→');arrow.setAttribute('aria-hidden','true');
      button.append(image,copy,arrow);
      button.addEventListener('click',()=>select(slug));
      buttons.append(button);
    });

    function updateProgress() {
      const counter = $('#dlmx-completed-count',display);
      const bar = $('#dlmx-completion-fill',display);
      if (!counter || !bar) return;
      const count=progress(active);
      const total=library[active].units.length;
      if (count===null) {
        counter.textContent='Sign in to track your completed lessons';
        bar.style.width='0%';
      } else {
        counter.textContent=`${count} of ${total} lessons completed`;
        bar.style.width=`${Math.round(count / total * 100)}%`;
      }
    }

    function select(slug) {
      if (!library[slug]) return;
      active=slug;
      for (const button of buttons.children) {
        const selected=button.dataset.slug===slug;
        button.classList.toggle('is-active',selected);
        button.setAttribute('aria-pressed',String(selected));
      }
      display.replaceChildren();
      const course=library[slug];
      const cover=el('div','dlmx-course-cover');
      const heading=el('div','dlmx-course-heading');
      const icon=el('img','dlmx-course-icon');icon.src=`assets/icons/icon-${icons[slug]}.svg`;icon.dataset.brandCourse=slug;icon.alt='';icon.width=64;icon.height=64;
      const copy=el('div','dlmx-course-copy');
      copy.append(el('span','dlmx-course-eyebrow',`${course.category} · ${course.level}`),el('h3','dlmx-course-title',course.name),el('p','dlmx-course-description',course.description));
      heading.append(icon,copy);
      const start=el('a','dlmx-start','Open full course →');start.href=courseUrl(slug);
      cover.append(heading,start);
      const progressWrap=el('div','dlmx-progress-row');
      const progressCopy=el('div','dlmx-progress-copy');
      progressCopy.append(el('span','','YOUR LEARNING PROGRESS'));
      const count=el('strong','');count.id='dlmx-completed-count';progressCopy.append(count);
      const track=el('div','dlmx-progress-track');track.setAttribute('role','presentation');
      const fill=el('span','');fill.id='dlmx-completion-fill';track.append(fill);
      progressWrap.append(progressCopy,track);
      display.append(cover,progressWrap);
      const overview=el('div','dlmx-learning-steps');
      for(const [number, iconText, label] of [['01','01','Understand'],['02','02','Practise'],['03','03','Test yourself']]) {
        const step=el('div','dlmx-learning-step');step.append(el('span','dlmx-learning-step-icon',iconText),el('span','',label));overview.append(step);
      }
      display.append(overview);
      const groups=el('div','dlmx-stages');
      stages(slug,course.units).forEach((stage,index)=>{
        if (!stage.units.length) return;
        const group=el('section','dlmx-stage');
        const hd=el('div','dlmx-stage-head');
        const kicker=el('span','dlmx-stage-number',`PHASE ${unitNumber(index+1)}`);
        const texts=el('div','dlmx-stage-head-copy');
        texts.append(el('h4','',stage.name),el('p','',stage.desc));
        hd.append(kicker,texts);group.append(hd);
        const units=el('div','dlmx-week-grid');
        stage.units.forEach(unit=>units.append(unitCard(slug,unit)));
        group.append(units);groups.append(group);
      });
      display.append(groups);
      if(isIntro(slug)) {
        const note=el('div','dlmx-intro-check');
        note.append(el('p','','The introductory course includes eight lessons and one final knowledge check rather than separate weekly quizzes.'));
        const link=el('a','dlmx-link dlmx-link-secondary','Open foundation questions');link.href=quizUrl(slug,course.units.at(-1));note.append(link);
        display.append(note);
      }
      updateProgress();
    }
    select(active);
    document.addEventListener('dalp:auth-ready',updateProgress);
    window.addEventListener('storage',updateProgress);
  }

  function makeCourseOutline(slug) {
    const course=library[slug];if (!course) return;
    const host = slug==='introduction' ? $('.intro-lessons') : slug==='ai' ? $('.course-wrap') : $('.app .content, .content');
    if(!host || host.querySelector('.dlmx-course-outline'))return;
    const wrapper=el('section','dlmx-course-outline');wrapper.id='course-weekly-roadmap';
    const intro=el('div','dlmx-outline-header');
    const copy=el('div','dlmx-outline-title');
    copy.append(el('span','dlmx-outline-kicker','YOUR LEARNING ROUTE'),el('h2','',isIntro(slug)?'Eight lessons, one strong foundation.':'Your course, organized week by week.'),el('p','',isIntro(slug)?'Follow the lessons in order, practise as you go, then take the foundation knowledge check.':'See what each week covers. Open a lesson or head straight to its dedicated Questions to Try page.'));
    intro.append(copy);
    const catalogLink=el('a','dlmx-outline-catalog','Compare all courses →');catalogLink.href='../catalog.html#dlmx-explorer';intro.append(catalogLink);
    wrapper.append(intro);
    const details=el('details','dlmx-outline-details');details.open = false;
    const summary=el('summary','dlmx-outline-summary',`Browse ${course.units.length} ${isIntro(slug)?'lessons':'weekly modules'}`);
    details.append(summary);
    const nav=el('nav','dlmx-outline-list');nav.setAttribute('aria-label','Course weekly modules');
    course.units.forEach(unit=>{
      const anchor=el('a','dlmx-outline-item');anchor.href='#'+encodeURIComponent(unit.id);
      const badge=el('span','dlmx-outline-number',unitNumber(unit.number));
      const inner=el('span','dlmx-outline-item-content');
      inner.append(el('small','',`${unitWord(slug)} ${unitNumber(unit.number)}`),el('strong','',unit.title));
      const chev=el('span','dlmx-outline-arrow','↗');chev.setAttribute('aria-hidden','true');
      anchor.append(badge,inner,chev);nav.append(anchor);
    });
    details.append(nav);wrapper.append(details);
    if(slug==='introduction') {
      const a=el('a','dlmx-outline-final','Questions to try · Foundation knowledge check →');a.href='../quiz.html?course=introduction&week=final';wrapper.append(a);
    }
    const first=slug==='introduction' ? $('.intro-lesson',host) : slug==='ai' ? $('[id="week1"]',host) : $('.week',host);
    if(first)first.before(wrapper);else host.prepend(wrapper);
  }

  const path = location.pathname.match(/\/courses\/(introduction|excel|sql|powerbi|python|ai)\.html$/);
  function init(){ makeCatalog(); if(path) makeCourseOutline(path[1]); }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
