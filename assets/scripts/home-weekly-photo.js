/* A stable photograph for each ISO week. No timer, tracking, or API key. */
(function () {
  'use strict';
  const photos = [
    {id:'photo-1522071820081-009f0129c71c', alt:'Professionals collaborating around laptops at work', caption:'Learn together. Build something useful.'},
    {id:'photo-1552664730-d307ca884978', alt:'A team sharing ideas during a collaborative session', caption:'Every skill starts with curiosity.'},
    {id:'photo-1498050108023-c5249f4df085', alt:'Laptop and programming workspace on a desk', caption:'Practise with real tools and real problems.'},
    {id:'photo-1516321318423-f06f85e504b3', alt:'A learner working on a laptop', caption:'Small steps. Meaningful progress.'}
  ];
  function isoWeekKey(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const year = d.getUTCFullYear();
    const first = new Date(Date.UTC(year, 0, 1));
    return year * 53 + Math.ceil((((d - first) / 86400000) + 1) / 7);
  }
  function init() {
    const img = document.getElementById('dlWeeklyHeroImage');
    const caption = document.getElementById('dlWeeklyHeroCaption');
    if (!img) return;
    const item = photos[isoWeekKey(new Date()) % photos.length];
    const photo = new Image();
    photo.referrerPolicy = 'no-referrer';
    photo.onload = function () {
      img.src = photo.src;
      img.alt = item.alt;
      if (caption) caption.textContent = item.caption;
    };
    photo.src = 'https://images.unsplash.com/' + item.id + '?auto=format&fit=crop&w=1600&q=80';
    if (!img.getAttribute('src')) img.src = '/assets/images/capstone-dashboard-preview.webp';
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
