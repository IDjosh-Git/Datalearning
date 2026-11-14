/* DataLearning public footer · one site-wide, accessible component. */
(()=>{'use strict';
 const source=document.currentScript;
 if(!source)return;
 const siteRoot=new URL('../../',source.src);
 const link=path=>new URL(path,siteRoot).href;
 const paths=[['Data Analysis','courses/introduction.html'],['Excel','courses/excel.html'],['SQL','courses/sql.html'],['Power BI','courses/powerbi.html'],['Tableau','courses/tableau.html'],['Power Query','courses/powerquery.html'],['Statistics','courses/statistics.html']];
 const tools=[['Study Tools','study-tools.html'],['Learning Coach','learning-coach.html'],['Learning Lab','learning-lab.html'],['AI Tutor','tutor.html'],['Practice Arena','practice.html'],['Practice Studio','studio.html'],['Reference Library','reference.html'],['AI Prompt Library','prompt-library.html']];
 const render=()=>{
  if(document.querySelector('.dalp-public-footer'))return;
  const footer=document.createElement('footer');footer.className='dalp-public-footer dlx-v5-footer';footer.setAttribute('aria-label','DataLearning site footer');
  const year=new Date().getFullYear();
  const links=items=>items.map(([label,path])=>`<a href="${link(path)}">${label}<span aria-hidden="true">↗</span></a>`).join('');
  footer.innerHTML=`<div class="dlx-v5-footer-container">
   <div class="dlx-v5-footer-banner"><div class="dlx-v5-footer-banner-copy"><span class="dlx-v5-overline">YOUR NEXT STEP STARTS HERE</span><h2>Turn curiosity into <em>capability.</em></h2><p>Build confidence with guided lessons, hands-on practice and a learning path you can call your own.</p></div><div class="dlx-v5-footer-banner-actions"><a class="dlx-v5-footer-primary" href="${link('index.html#zaDiscoverCards')}">Explore learning paths <span aria-hidden="true">↗</span></a><a class="dlx-v5-footer-secondary" href="${link('study-tools.html')}">Browse study tools <span aria-hidden="true">↗</span></a></div><span class="dlx-v5-footer-glow" aria-hidden="true"></span></div>
   <div class="dlx-v5-footer-body"><div class="dlx-v5-footer-identity"><a class="dlx-v5-footer-brand" href="${link('index.html')}" aria-label="DataLearning Discover"><span class="dlx-v5-footer-logo"><img src="${link('assets/icons/da-logo.svg')}" alt="" width="42" height="42" loading="lazy"></span><span><strong>data<span>learning</span></strong><small>LEARN · PRACTISE · GROW</small></span></a><p>Thoughtful lessons, practical exercises and tools that help new analysts learn by doing.</p><div class="dlx-v5-footer-trust"><span aria-hidden="true"></span> Independent learning, real-world practice</div></div>
   <nav class="dlx-v5-footer-col" aria-label="Footer learning paths"><h3>Learning paths</h3>${links(paths)}</nav>
   <nav class="dlx-v5-footer-col" aria-label="Footer study tools"><h3>Study tools</h3>${links(tools)}</nav>
   <nav class="dlx-v5-footer-col" aria-label="Footer account and help"><h3>Account &amp; support</h3>${links([['My progress','account.html#course-progress-heading'],['My dashboard','account.html'],['Capstone projects','capstone.html'],['Certificates','certificate.html'],['Verify certificate','verify.html']])}<a href="mailto:esoterikjoshua@gmail.com">Contact support<span aria-hidden="true">↗</span></a></nav></div>
   <div class="dlx-v5-footer-base"><span>© ${year} DataLearning. Learn, practise, grow.</span><div><a href="${link('index.html')}">Discover</a><a href="${link('index.html#zaDiscoverCards')}">Courses</a><a href="${link('study-tools.html')}">Study Tools</a><a href="${link('admin.html')}">Admin Login</a></div></div>
  </div>`;
  document.body.appendChild(footer);
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});else render();
})();
