/* Week 10 capstone learning content — v75. */
(()=>{
 const cfg={"slug": "sql", "label": "Sql", "title": "Customer Orders and Revenue Analysis", "brief": "Investigate customer purchasing patterns, product performance and monthly revenue using a relational sales dataset.", "deliverable": "A commented SQL script (.sql), table/schema description, query outputs, validation evidence and a concise insight report.", "steps": "Load and inspect tables; define joins and business metrics; clean invalid records; write aggregation, CTE and window-function queries; cross-check key results; explain business findings."};
 const week=document.getElementById('week10');
 if(!week || document.getElementById('week10-capstone-project')) return;
 const box=document.createElement('section');box.id='week10-capstone-project';box.className='week10-capstone-v75';
 box.setAttribute('aria-labelledby','week10-capstone-heading');
 box.innerHTML=`<div class="capstone-v75-kicker">WEEK 10 · FINAL PRACTICAL ASSESSMENT</div>
 <h3 id="week10-capstone-heading">Capstone Project: ${cfg.title}</h3>
 <p><strong>Congratulations on reaching Week 10.</strong> Your final task is to apply what you have learned to a realistic business problem. This capstone is a required, independently assessed part of course completion.</p>
 <h4>Project brief</h4><p>${cfg.brief}</p>
 <h4>Dataset guidance</h4><p>Use a realistic, legally shareable dataset with enough records to demonstrate your skills. You may use a public retail or customer dataset or a suitably anonymised dataset of your own. Include the source, column descriptions and any assumptions. Never submit private or confidential information.</p>
 <h4>Step-by-step project instructions</h4><ol>${cfg.steps.split('; ').map(s=>`<li>${s}</li>`).join('')}</ol>
 <h4>What you must submit</h4><p>${cfg.deliverable}</p>
 <p>Also include a short project overview stating your business question, methods, 3–5 findings, recommendations, limitations and how you checked the accuracy of your results.</p>
 <h4>How your project is assessed (100 points)</h4><ul><li>Problem definition and objectives — 25</li><li>Data preparation and quality — 20</li><li>Technical execution — 20</li><li>Analysis and insights — 20</li><li>Communication and evidence — 15</li></ul>
 <p><strong>Passing score:</strong> 70/100 after instructor review. Complete the Week 10 lessons and quiz, then submit your evidence in Capstone Studio. Follow any submission eligibility prompts shown there.</p>
 <div class="capstone-v75-actions"><a href="../capstone-guide.html#${cfg.slug}">Read detailed ${cfg.label} guidelines</a><a href="../capstone.html?course=${cfg.slug}">Submit in Capstone Studio</a></div>`;
 week.appendChild(box);
})();