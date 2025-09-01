document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  const backdrop = document.querySelector('.backdrop');

  function toggleMenu(force) {
    const open = (typeof force === 'boolean') ? force : !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    btn?.setAttribute('aria-expanded', String(open));
    backdrop?.toggleAttribute('hidden', !open);
  }

  btn?.addEventListener('click', () => toggleMenu());
  backdrop?.addEventListener('click', () => toggleMenu(false));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(false);
  });

  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
});