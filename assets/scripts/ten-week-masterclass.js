/* DataLearning ten-week original masterclasses: code and source records stay independent. */
(() => {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const two = n => String(n).padStart(2,'0');
  const asList = items => items.map(item => `<li>${esc(item)}</li>`).join('');
  const asset = (base,slug,type) => `${base}assets/images/dashboard-samples/${encodeURIComponent(slug)}-${type}.svg`;
  const titleCase = str => String(str).replace(/\b\w/g, char=>char.toUpperCase());
  const capstoneDeliverables = {
    introduction:['Original and cleaned data','Verified KPI table and two charts','Dashboard wireframe or report screenshot','One-page executive presentation and quality log'],
    excel:['Excel workbook (.xlsx) with Raw, Analysis and Dashboard sheets','Working formulas, PivotTables and interactive slicer','Dashboard PDF or screenshots','One-page findings and validation checklist'],
    powerbi:['Power BI Desktop report (.pbix) when available','Power Query and relationship/model evidence','DAX measure list and dashboard screenshots','Executive summary, data dictionary and reconciliation checks'],
    sql:['Read-only SQL script (.sql) with commented stages','Exported CSV with dashboard-ready result','Query-results screenshots and row-count checks','Dashboard layout mockup and executive insight note'],
    python:['Runnable notebook (.ipynb) or Python script (.py)','Charts and dashboard or notebook report screenshots','Data, instructions/requirements or package list','README with findings, tests and limitations'],
    ai:['Prompt log with tool and task disclosure','Original verified formulas, scripts or calculations','Dashboard wireframe and evidence-based report','Independent numerical checks and human review register'],
    tableau:['Tableau workbook or permitted public link','Interactive dashboard and story screenshots','Calculated-field definitions and source checks','Executive presentation and design assumptions'],
    powerquery:['Refreshable Excel or Power BI query project','Cleaned and report-ready CSV export','Applied Steps documentation and refresh log','Reconciliation and downstream dashboard mockup'],
    statistics:['Workbook or notebook with original calculations','Charts and one defensible comparison or interval','Methods, assumptions, sample information and quality checks','One-page executive interpretation and recommendations']
  };
  function visual(slug,base,style='dashboard'){
    const filename=style==='report'?'report-storyboard':'dashboard-wireframe';
    const label=style==='report'?'Presentation storyboard: from business question to evidence, limitations and recommendation':'Dashboard layout example: KPI row, trend chart, category ranking and filter area';
    return `<figure class="dlm-layout-sample"><div class="dlm-image-top"><span>${style==='report'?'PRESENTATION EXAMPLE':'DASHBOARD LAYOUT EXAMPLE'}</span><a href="${asset(base,slug,filename)}" target="_blank" rel="noopener" aria-label="Open full-size ${esc(label)}">View full size ↗</a></div><img src="${asset(base,slug,filename)}" alt="${esc(label)}" loading="lazy" decoding="async"/><figcaption>${style==='report'?'Present findings in this order: question, verified evidence, interpretation and decision.':'Illustrative design with fictional figures. Recreate it with real calculations from the practice dataset; a picture alone is not a functioning dashboard.'}</figcaption></figure>`;
  }
  function capstone(module,base){
    if(!module || module.week!==10) return '';
    const slug=module.slug;
    return `<section class="dlm-capstone" id="dlmCapstoneProject" aria-labelledby="dlm-capstone-title">
      <div class="dlm-capstone-top"><span class="dlm-kicker">WEEK 10 · INDEPENDENT PROJECT</span><span class="dlm-capstone-status">Instructor-reviewed · 100 points</span></div>
      <h2 id="dlm-capstone-title">Your final ${esc(module.courseLabel)} capstone</h2>
      <p class="dlm-lead">${esc(module.business)} You are now expected to apply the entire ten-week process independently, from source inspection through analysis, visual delivery and presentation. The project is assessed for reasoning and reproducibility—not appearance alone.</p>
      <div class="dlm-capstone-grid"><div><h3>Project instructions</h3><ol>${asList([
       'Define the decision question, audience, date range and unambiguous KPI definitions.',
       'Download the weekly practice dataset or use another legally shareable, non-confidential dataset. Save the original separately and provide its source.',
       'Inspect data types, missing values, unique keys and relevant business exclusions. Document each cleaning decision.',
       'Complete the course-specific calculations or queries, create appropriate visuals, and explain three findings supported by evidence.',
       'Validate the most important totals independently, explain limitations, and prepare a one-page management presentation.'
      ])}</ol></div><div><h3>What to submit</h3><ul>${asList(capstoneDeliverables[slug]||[])}</ul><div class="dlm-capstone-note"><strong>Important project note</strong><p>Submit your own work and explain how it was produced. Do not upload real customer information or confidential company data. You may use synthetic or publicly licensed data. Include readable screenshots even when submitting native project files.</p></div></div></div>
      <div class="dlm-rubric"><strong>Assessment rubric</strong><div><span>Problem and objectives · 25</span><span>Data quality · 20</span><span>Technical execution · 20</span><span>Insights · 20</span><span>Communication · 15</span></div></div>
      <p class="dlm-eligibility">Submission requires signing in and syncing completion of all ten weeks. Your instructor—not an AI auto-grader—reviews the project and publishes feedback. The passing score is <strong>70/100</strong>. Files are limited to four attachments, 12 MB each (32 MB combined).</p>
      <div class="dlm-capstone-actions"><a class="dlm-primary" href="${base}capstone.html?course=${encodeURIComponent(slug)}">Submit your ${esc(module.courseLabel)} capstone <span aria-hidden="true">↗</span></a><a class="dlm-secondary" href="${base}capstone-guide.html#${encodeURIComponent(slug)}">Read full capstone guidelines</a></div>
      </section>`;
  }
  function dataDictionary(module){
    const source=window.DALP_WEEK_MEDIA?.[module.slug]?.[module.week-1];
    if(!source?.datasetFields?.length)return '';
    const names=source.datasetFields.map(name=>`<code>${esc(name)}</code>`).join(' ');
    const status=source.datasetStatusValues?.length?`<p><strong>Actual status values:</strong> ${source.datasetStatusValues.map(esc).join(', ')}</p>`:'';
    return `<aside class="dlm-dictionary" aria-label="Source dataset field names"><div class="dlm-dictionary-header"><span>YOUR DOWNLOAD'S REAL FIELDS</span><strong>${esc(source.dataset)}</strong></div><div class="dlm-dictionary-fields">${names}</div>${status}<p>${esc(source.datasetNote||'Check column names before following examples.')}</p></aside>`;
  }
  function core(module,base){
    if(!module)return '';
    const slug=module.slug,topics=module.topics;
    const topicHtml=topics.map((t,i)=>`<article class="dlm-topic"><span>${two(i+1)} · ESSENTIAL CONCEPT</span><h3>${esc(t.heading)}</h3><p>${esc(t.explanation)}</p></article>`).join('');
    return `<section class="dlm-masterclass" id="zaMasterclass" aria-label="Comprehensive ${esc(module.courseLabel)} week ${module.week} masterclass">
      <header class="dlm-masterclass-head"><div><span class="dlm-kicker">FROM THE TOOL TO A VERIFIED REPORT · ${esc(module.stage.toUpperCase())}</span><h2>Learn the skill from the workspace to the result</h2><p>Suggested study: ${module.estimatedMinutes} minutes of guided reading and tool practice, followed by independent work.</p></div><span class="dlm-week-stamp">${two(module.week)}<small>/ 10</small></span></header>
      <div class="dlm-where"><div class="dlm-where-icon" aria-hidden="true">⌘</div><div><h3>First, find your way around the tool</h3><p>${esc(module.where)}</p><p class="dlm-context">If this interface is new, open the tool before continuing and identify each named control. Understanding where an operation lives is as important as remembering its formula or syntax.</p></div></div>
      ${dataDictionary(module)}
      <h3 class="dlm-section-label">Four ideas you need to understand</h3><div class="dlm-topic-grid">${topicHtml}</div>
      <div class="dlm-practice"><div><span class="dlm-kicker">REALISTIC BUSINESS ASSIGNMENT</span><h3>Put the technique to work</h3><p>${esc(module.business)}</p><p><strong>Your own assignment:</strong> ${esc(module.task)}</p></div><div class="dlm-result"><strong>Quality check / expected result</strong><p>${esc(module.check)}</p><strong>Risk to watch for</strong><p>${esc(module.trap)}</p></div></div>
      ${module.week===8?visual(slug,base,'dashboard'):''}${module.week===9?visual(slug,base,'report'):''}${module.week===10?`<div class="dlm-visual-pair">${visual(slug,base,'dashboard')}${visual(slug,base,'report')}</div>`:''}
      </section>`;
  }
  // Python and AI now use the identical masterclass card hierarchy as all seven
  // other paths. Their dedicated guide is rendered by the shared Academy reader.
  function specialist(module,base){
    if(!module)return '';
    return core(module,base) + (module.week===10 ? capstone(module,base) : '');
  }
  window.DALP_TEN_WEEK_UI={renderCore:core,renderSpecialist:specialist,renderCapstone:capstone};
})();
