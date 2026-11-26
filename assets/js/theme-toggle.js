// ===== Dark / Light Theme Toggle =====
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  function apply(theme) {
    const dark = theme === 'dark';
    root.setAttribute('data-theme', theme);
    btn.setAttribute('aria-pressed', String(dark));
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('title', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  apply(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  // Real backdrop refraction via SVG filter — Chromium only.
  // Firefox reports CSS support for url() filters but renders nothing, and
  // Safari has never shipped backdrop displacement, so gate on UA as well.
  (function () {
    const ua = navigator.userAgent;
    const isChromium = /Chrome|Chromium|Edg\/|OPR\//.test(ua) && !/Firefox\//.test(ua);
    const supportsUrlFilter =
      window.CSS &&
      CSS.supports &&
      CSS.supports('backdrop-filter', 'url(#liquid-lens)');
    if (isChromium && supportsUrlFilter) {
      btn.classList.add('lens-on');
    }
  })();

  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
  });

  // Follow the system while the visitor has not picked a theme manually.
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const onSystemChange = (e) => {
    let stored = null;
    try {
      stored = localStorage.getItem('theme');
    } catch (err) {}
    if (!stored) apply(e.matches ? 'dark' : 'light');
  };
  if (mq.addEventListener) {
    mq.addEventListener('change', onSystemChange);
  } else if (mq.addListener) {
    mq.addListener(onSystemChange);
  }
})();
