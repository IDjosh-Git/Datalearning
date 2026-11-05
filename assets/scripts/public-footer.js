/* Shared public footer. Injects once; asset URLs resolve from this script's location.
   Administrative surfaces and the sign-in page intentionally do not import it. */
(()=>{
  'use strict';
  const source=document.currentScript;
  if(!source)return;
  const siteRoot=new URL('../../',source.src);
  const href=(path)=>new URL(path,siteRoot).href;
  const render=()=>{
    if(document.querySelector('.dalp-public-footer'))return;
    const footer=document.createElement('footer');
    footer.className='dalp-public-footer';
    footer.setAttribute('aria-label','Site footer');
    const year=String(new Date().getFullYear());
    footer.innerHTML=`
      <div class="dalp-public-footer__inner">
        <div class="dalp-footer-invite">
          <div class="dalp-footer-invite__copy">
            <span class="dalp-footer-invite__eyebrow"><span aria-hidden="true" class="dalp-footer-sparkle">✦</span> LEARN BY BUILDING</span>
            <h2>Great analysis starts <em>with curiosity.</em></h2>
            <p>From your first question to a polished project, explore a learning path designed around real practice.</p>
          </div>
          <a class="dalp-footer-invite__action" href="${href('catalog.html')}">Explore courses <span aria-hidden="true">↗</span></a>
          <span class="dalp-footer-invite__orb" aria-hidden="true"></span>
        </div>
        <div class="dalp-public-footer__grid">
          <div class="dalp-public-footer__about">
            <a class="dalp-public-footer__brand" href="${href('index.html')}" aria-label="DataLearning Discover">
              <span class="dalp-public-footer__brand-mark"><img src="${href('assets/icons/da-logo.svg')}" alt="" width="42" height="42" loading="lazy"></span>
              <span><strong>data<span class="dalp-footer-wordmark-accent">learning</span></strong><span>LEARN · BUILD · GROW</span></span>
            </a>
            <p>Practical data skills, clear explanations, and room to grow at your own pace.</p>
            <span class="dalp-footer-brand-detail"><span class="dalp-footer-status-dot" aria-hidden="true"></span> Built for curious minds</span>
          </div>
          <nav class="dalp-public-footer__section" aria-label="Footer courses">
            <h2>Learning paths</h2>
            <a href="${href('courses/introduction.html')}">Data Analysis</a>
            <a href="${href('courses/excel.html')}">Excel</a>
            <a href="${href('courses/sql.html')}">SQL</a>
            <a href="${href('courses/powerbi.html')}">Power BI &amp; DAX</a>
            <a href="${href('courses/python.html')}">Python</a>
            <a href="${href('courses/ai.html')}">AI for Analysts</a>
          </nav>
          <nav class="dalp-public-footer__section" aria-label="Footer resources">
            <h2>Explore</h2>
            <a href="${href('catalog.html')}">Course catalogue</a>
            <a href="${href('reference.html')}">Reference library</a>
            <a href="${href('prompt-library.html')}">Prompt library</a>
            <a href="${href('learning-lab.html')}">Learning Lab</a>
            <a href="${href('practice.html')}">Practice Arena</a>
            <a href="${href('capstone.html')}">Capstone Studio</a>
          </nav>
          <div class="dalp-public-footer__section dalp-public-footer__support">
            <h2>Stay on track</h2>
            <p>Need guidance with a lesson or your learning account? We're here to help.</p>
            <a class="dalp-public-footer__contact" href="mailto:esoterikjoshua@gmail.com">Contact support <span aria-hidden="true">↗</span></a>
            <a href="${href('tutor.html')}">Learning Coach</a>
            <a href="${href('verify.html')}">Verify a certificate</a>
          </div>
        </div>
        <div class="dalp-public-footer__bottom">
          <span>© ${year} Data Learning. Made for lifelong learners.</span>
          <div class="dalp-footer-bottom-links"><a href="${href('index.html')}">Discover more</a><a href="${href('catalog.html')}">All courses</a></div>
        </div>
      </div>`;
    document.body.appendChild(footer);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});
  else render();
})();
