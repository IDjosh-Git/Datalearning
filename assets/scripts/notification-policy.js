/** DataLearning learner feedback: routine status inline; actionable errors visible. */
(() => {
  'use strict';
  function isAdminWorkspace() {
    // This is only a display decision; actual admin access must be enforced server-side.
    return /^\/admin(?:\.html)?\/?$/i.test(window.location.pathname);
  }
  function feedback(element, message, kind = 'routine') {
    if (!element) return;
    const floating = kind === 'critical' || isAdminWorkspace();
    element.textContent = message;
    element.classList.toggle('show', floating);
    element.setAttribute('role', kind === 'critical' ? 'alert' : 'status');
    element.setAttribute('aria-live', kind === 'critical' ? 'assertive' : 'polite');
    let status = element.previousElementSibling;
    if (status && status.classList.contains('dl-inline-feedback')) {
      status.textContent = '';
      status.hidden = true;
    }
    if (floating) return;
    if (!status || !status.classList.contains('dl-inline-feedback')) {
      status = document.createElement('span');
      status.className = 'dl-inline-feedback';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      element.before(status);
    }
    status.hidden = false;
    status.textContent = message;
  }
  window.DALP_NOTIFICATION_POLICY = Object.freeze({ feedback, isAdminWorkspace });
})();
