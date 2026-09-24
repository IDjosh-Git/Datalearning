/* Introduction progress syncs across devices when signed in, but it remains separate from certificate eligibility. */
(() => {
  'use strict';
  const key = 'dalpIntroductionProgressV1';
  const slug = 'introduction';
  const checkboxes = [...document.querySelectorAll('input[data-intro-check]')];
  const progressText = document.getElementById('introProgressText');
  const progressBar = document.getElementById('introProgressBar');
  const progressFill = document.getElementById('introProgressFill');
  const syncStatus = document.getElementById('introSyncStatus');
  const safeRead = () => { try { return JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch { return {}; } };
  const paint = progress => {
    const state = progress || Object.fromEntries(checkboxes.map(c => [c.dataset.introCheck, c.checked]));
    for (const cb of checkboxes) cb.checked = state[cb.dataset.introCheck] === true;
    const count = checkboxes.filter(c => c.checked).length;
    if(progressText) progressText.textContent = `${count} / 8 lessons`;
    if(progressBar) progressBar.setAttribute('aria-valuenow', String(count));
    if(progressFill) progressFill.style.width = `${count / 8 * 100}%`;
  };
  const showSync = (text, state='') => {
    if(!syncStatus) return;
    syncStatus.textContent=text;
    syncStatus.dataset.state=state;
  };
  paint(safeRead());
  for (const cb of checkboxes) {
    cb.addEventListener('change', async () => {
      const next = Object.fromEntries(checkboxes.map(c => [c.dataset.introCheck, c.checked]));
      try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* local fallback */ }
      paint(next);
      if(!window.ZAHProgressCloud){ showSync('Saved on this device','offline'); return; }
      const result=await window.ZAHProgressCloud.saveWeek(slug,Number(cb.dataset.introCheck),cb.checked);
      if(result.ok) showSync('Synced to your account','ok');
      else if(result.reason==='signed_out') showSync('Saved here • sign in to sync across devices','offline');
      else showSync('Saved here • cloud sync will retry','warning');
    });
  }
  (async()=>{
    if(!window.ZAHProgressCloud){ showSync('Saved on this device','offline'); return; }
    try{
      const result=await window.ZAHProgressCloud.syncCourse(slug);
      if(result.ok){ paint(result.progress); showSync('Cloud sync complete','ok'); }
      else if(result.reason==='signed_out') showSync('Sign in to sync this introduction across devices','offline');
      else showSync('Saved on this device • cloud unavailable','warning');
    }catch(error){ console.error('Introduction cloud sync failed',error); showSync('Saved on this device • sync retry available','warning'); }
  })();

  const money = n => new Intl.NumberFormat('en-NG', {style:'currency',currency:'NGN',maximumFractionDigits:2}).format(n);
  const form = document.getElementById('kioskCalc');
  const result = document.getElementById('calcResult');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const values = ['calcUnits','calcPrice','calcCost','calcFixed'].map(id => Number(document.getElementById(id).value));
    const [units,price,cost,fixed] = values;
    if (!values.every(Number.isFinite) || values.some(v => v < 0 || v > 100000000) || !Number.isInteger(units) || units > 100000) {
      result.textContent = 'Enter valid non-negative figures. Meals sold must be a whole number no greater than 100,000.';
      result.classList.add('is-error');
      return;
    }
    result.classList.remove('is-error');
    const revenue = units * price, totalCost = units * cost + fixed, profit = revenue - totalCost;
    const contribution = price - cost;
    const breakEven = contribution > 0 ? `${Math.ceil(fixed / contribution).toLocaleString('en-NG')} meals` : (fixed === 0 && contribution === 0 ? '0 meals (no costs)' : 'not achievable at these prices and costs');
    result.textContent = `At ${units.toLocaleString('en-NG')} meals: revenue ${money(revenue)} · total cost ${money(totalCost)} · ${profit < 0 ? 'loss' : 'profit'} ${money(Math.abs(profit))} · break-even ${breakEven}.`;
  });

  const questions = [
    {q:'What best describes data analysis?', a:['Making colourful charts only','Examining information to answer a question and support a decision','Entering every number into a spreadsheet'], correct:1, why:'A chart may help communicate analysis, but the goal is a useful, evidence-based answer.'},
    {q:'Which is an insight rather than a raw record?',a:['A receipt says ₦3,000','The table contains 10 rows','Tuesday transport cost more than the other two days'],correct:2,why:'An insight interprets or compares records; a receipt is one observation.'},
    {q:'Why is a price per 100 g useful when shopping?',a:['It allows a fairer unit-price comparison','It proves the larger package is healthier','It removes the need to check quality'],correct:0,why:'Compare like quantities while also considering quality and what you will actually use.'},
    {q:'Which is the most measurable question?',a:['Is my business good?','Why is everything expensive?','What was our daily profit last week?'],correct:2,why:'A specific period and defined measure let you gather data and calculate a result.'},
    {q:'If one row is one purchase, 10 rows necessarily means…',a:['10 customers','10 purchases','10 products'],correct:1,why:'The grain is one purchase per row; a customer may purchase more than once.'},
    {q:'What should you do with an unexpectedly blank cost?',a:['Assume it is zero','Delete the whole dataset','Check the source and document the missing value'],correct:2,why:'Zero is a real amount, not an automatic substitute for an unknown amount.'},
    {q:'You spent ₦2,000, ₦3,000 and ₦1,000. What is the average?',a:['₦2,000','₦3,000','₦6,000'],correct:0,why:'The total is ₦6,000 over three days, giving ₦2,000 per day.'},
    {q:'Revenue is ₦36,000, variable cost ₦21,600 and fixed cost ₦6,000. Profit is…',a:['₦36,000','₦14,400','₦8,400'],correct:2,why:'Profit = ₦36,000 − ₦21,600 − ₦6,000 = ₦8,400.'},
    {q:'A ₦4,000 item now costs ₦4,200. What is the percentage increase?',a:['₦200','5%','20%'],correct:1,why:'(4,200 − 4,000) ÷ 4,000 × 100 = 5%.'},
    {q:'At the kiosk, a meal sells for ₦1,500, variable cost is ₦900, and fixed cost is ₦6,000. Break-even is…',a:['6 meals','10 meals','15 meals'],correct:1,why:'Contribution per meal = ₦600. ₦6,000 ÷ ₦600 = 10 meals.'},
    {q:'Two rainy days had lower sales. What can you conclude?',a:['Rain definitely caused the lower sales','The association is worth investigating, but cause is unproven','Rain always lowers all shops’ sales'],correct:1,why:'Five observations cannot isolate weather from other explanations.'},
    {q:'Which next step fits a new learner using the kiosk CSV?',a:['Start with Excel to check rows and calculate profit','Publish customers’ private details in a public dashboard','Skip validation and trust the chart'],correct:0,why:'Begin with a clear table, reproduce formulas, validate totals, and protect private data.'}
  ];
  const questionsEl = document.getElementById('introQuizQuestions');
  const quizForm = document.getElementById('introQuiz');
  const quizResult = document.getElementById('introQuizResult');
  // Static, trusted curriculum data; only textContent is used for question/answer insertion.
  questions.forEach((item,i) => {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'question-card';
    const legend = document.createElement('legend');
    legend.textContent = `${i + 1}. ${item.q}`;
    fieldset.append(legend);
    item.a.forEach((answer,choice) => {
      const label = document.createElement('label');
      const radio = document.createElement('input');
      radio.type = 'radio'; radio.name = `intro-q${i}`; radio.value = String(choice);
      const text = document.createElement('span'); text.textContent = answer;
      label.append(radio,text); fieldset.append(label);
    });
    const feedback = document.createElement('p'); feedback.className = 'question-feedback'; feedback.hidden = true;
    fieldset.append(feedback); questionsEl.append(fieldset);
  });
  quizForm.addEventListener('submit', event => {
    event.preventDefault();
    let score = 0, answered = 0;
    [...questionsEl.children].forEach((fieldset,i) => {
      const chosen = fieldset.querySelector('input:checked');
      const item = questions[i];
      const feedback = fieldset.querySelector('.question-feedback');
      const right = chosen && Number(chosen.value) === item.correct;
      if (chosen) answered++;
      if (right) score++;
      fieldset.classList.toggle('is-correct',Boolean(right));
      fieldset.classList.toggle('is-incorrect',!right);
      feedback.hidden = false;
      feedback.textContent = `${right ? 'Correct.' : chosen ? 'Not quite.' : 'Unanswered.'} ${item.why} Correct answer: ${item.a[item.correct]}`;
    });
    quizResult.hidden = false;
    quizResult.textContent = `${score} / ${questions.length} correct (${answered} answered). ${score >= 10 ? 'Great—try explaining the answers in your own words, then continue to Excel.' : 'Review the explanations and try again. There is no penalty for another attempt.'}`;
    quizResult.scrollIntoView({behavior:'smooth',block:'nearest'});
  });
  document.getElementById('quizReset').addEventListener('click', () => {
    quizForm.reset();
    [...questionsEl.children].forEach(fieldset => {
      fieldset.classList.remove('is-correct','is-incorrect');
      fieldset.querySelector('.question-feedback').hidden = true;
    });
    quizResult.hidden = true;
    questionsEl.scrollIntoView({behavior:'smooth',block:'start'});
  });
})();
