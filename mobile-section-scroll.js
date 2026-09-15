/* Mobile section navigation shared by the SPA and News & Events page.
   A short section advances one screen per swipe. A tall section (forms, maps
   and card lists) keeps normal reading scroll until its top or bottom edge. */
(() => {
  const mobile = () => window.matchMedia('(max-width: 760px)').matches;
  const selector = [
    'main > div > section',
    '.about-gallery-screen', '.about-philosophy-screen',
    '.lm-projects-filter-bar', '.lm-project-pair',
    '.contact-form-screen', '.contact-visual-screen',
    '.ne-hero-banner', '.ne-subbar', '.ne-section-header', '.ne-content-section .ne-card-pair', '.ne-footer'
  ].join(',');
  let touch = null;
  let stepping = false;
  let settleTimer = null;

  const headerHeight = () => document.querySelector('header')?.getBoundingClientRect().height || 0;
  const sections = () => [...document.querySelectorAll(selector)].filter((node) => {
    const style = window.getComputedStyle(node);
    return style.display !== 'none'
      && !node.matches('.lm-about-story, .contact-interaction, .lm-projects-list-section')
      && node.getBoundingClientRect().height > 0;
  }).map((node) => ({
    node,
    top: window.scrollY + node.getBoundingClientRect().top,
    height: node.getBoundingClientRect().height
  })).sort((a, b) => a.top - b.top);

  const step = (direction) => {
    // Consume the rest of a gesture while its first section move is running.
    // Mobile browsers otherwise keep applying touch momentum and can carry the
    // page through the section we just selected.
    if (stepping) return true;
    const list = sections();
    if (!list.length) return false;
    const header = headerHeight();
    const y = window.scrollY + header;
    let index = 0;
    list.forEach((section, i) => { if (section.top <= y + 10) index = i; });
    const current = list[index];
    const viewport = window.visualViewport?.height || window.innerHeight;

    // Preserve normal scrolling while the user is reading a long section.
    if (current.height > viewport + 20) {
      const bottom = current.top + current.height;
      if (direction > 0 && y < bottom - viewport - 10) return false;
      if (direction < 0 && window.scrollY > current.top + 10) return false;
    }

    const target = list[index + direction];
    if (!target) return false;
    const top = Math.max(0, target.top - header);
    const root = document.documentElement;
    const previousSnap = root.style.scrollSnapType;
    stepping = true;
    root.style.scrollSnapType = 'none';

    const settle = () => {
      if (!stepping) return;
      stepping = false;
      clearTimeout(settleTimer);
      settleTimer = null;
      // Remove the last sub-pixel difference before restoring CSS snapping.
      if (Math.abs(window.scrollY - top) > 1) window.scrollTo({ top, behavior: 'auto' });
      root.style.scrollSnapType = previousSnap;
    };

    // Do not use scrollend here. The cancelled finger movement can emit its
    // own scrollend before the programmatic animation finishes, especially on
    // the first Home transition, which restores snapping too early.
    settleTimer = window.setTimeout(settle, 750);
    try {
      window.scrollTo({ top, behavior: 'smooth' });
    } catch (error) {
      settle();
      window.scrollTo(0, top);
    }
    return true;
  };

  window.addEventListener('touchstart', (event) => {
    if (!mobile() || event.touches.length !== 1) return;
    if (event.target.closest('input, textarea, select, button, a, [contenteditable="true"]')) return;
    touch = { x: event.touches[0].clientX, y: event.touches[0].clientY, handled: stepping };
  }, { passive: true });

  window.addEventListener('touchmove', (event) => {
    if (!touch || !mobile() || event.touches.length !== 1) return;
    if (touch.handled) {
      if (event.cancelable) event.preventDefault();
      return;
    }
    const dx = event.touches[0].clientX - touch.x;
    const dy = event.touches[0].clientY - touch.y;
    if (Math.abs(dy) < 52 || Math.abs(dy) < Math.abs(dx) * 1.35) return;
    if (step(dy < 0 ? 1 : -1)) {
      touch.handled = true;
      if (event.cancelable) event.preventDefault();
    }
  }, { passive: false });

  window.addEventListener('touchend', () => { touch = null; }, { passive: true });
  window.addEventListener('touchcancel', () => { touch = null; }, { passive: true });
})();
