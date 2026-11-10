/* Preserve bookmarked coach links from previous combined Lab/Coach page. */
(()=>{'use strict';if(!location.pathname.endsWith('/learning-lab.html'))return;const hash=location.hash;if(hash==='#study-plan'||hash==='#study-recall'||hash==='#learning-coach'){location.replace('learning-coach.html'+(hash==='#study-recall'?'#study-recall':''));}})();
