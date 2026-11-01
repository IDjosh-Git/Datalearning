/* One public footer for learner, course, library and resource pages.
   Protected administrative pages intentionally use their own shell. */
(()=>{
  const source=document.currentScript;
  if(!source)return;
  const siteRoot=new URL('../../',source.src);
  const href=(path)=>new URL(path,siteRoot).href;
  const render=()=>{
    if(document.querySelector('.dalp-public-footer'))return;
    const footer=document.createElement('footer');
    footer.className='dalp-public-footer';
    footer.setAttribute('aria-label','Website information and links');
    const year=String(new Date().getFullYear());
    footer.innerHTML=`
      <div class="dalp-public-footer__inner">
        <div class="dalp-public-footer__grid">
          <div class="dalp-public-footer__about">
            <a class="dalp-public-footer__brand" href="${href('index.html')}" aria-label="Data Analysis Learning Path home">
              <img src="${href('assets/icons/da-logo.svg')}" alt="" width="40" height="40" loading="lazy">
              <span><strong>Data Analysis</strong><span>Learning Path</span></span>
            </a>
            <p>Build practical analysis skills through guided lessons, hands-on projects and clear explanations.</p>
          </div>
          <nav class="dalp-public-footer__section" aria-label="Footer courses">
            <h2>Explore courses</h2>
            <a href="${href('courses/introduction.html')}">Foundations</a>
            <a href="${href('courses/excel.html')}">Excel</a>
            <a href="${href('courses/sql.html')}">SQL</a>
            <a href="${href('courses/powerbi.html')}">Power BI</a>
            <a href="${href('courses/python.html')}">Python</a>
            <a href="${href('courses/ai.html')}">AI Integration</a>
          </nav>
          <nav class="dalp-public-footer__section" aria-label="Footer resources">
            <h2>Learning resources</h2>
            <a href="${href('catalog.html')}">Course catalogue</a>
            <a href="${href('reference.html')}">Formula Library</a>
            <a href="${href('prompt-library.html')}">AI Prompt Library</a>
            <a href="${href('practice.html')}">Practice Arena</a>
            <a href="${href('tutor.html')}">Learning Coach</a>
            <a href="${href('capstone.html')}">Capstone Studio</a>
          </nav>
          <div class="dalp-public-footer__section dalp-public-footer__support">
            <h2>Need help?</h2>
            <p>Questions about a lesson or learning resource?</p>
            <a class="dalp-public-footer__contact" href="mailto:esoterikjoshua@gmail.com">Contact Support</a>
            <a href="${href('verify.html')}">Verify a certificate</a>
          </div>
        </div>
        <div class="dalp-public-footer__bottom">
          <span>© ${year} Data Analysis Learning Path. All rights reserved.</span>
          <a href="${href('index.html')}">Back to dashboard</a>
        </div>
      </div>`;
    document.body.appendChild(footer);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});
  else render();
})();
