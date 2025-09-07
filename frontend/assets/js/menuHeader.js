function setHeaderHeightVar(headerEl) {
  const h = headerEl?.offsetHeight || 56;
  document.documentElement.style.setProperty('--header-h', `${h}px`);
}

function openMenu(menuEl, backdropEl, btn) {
  menuEl.classList.add('is-open');
  backdropEl.classList.add('is-open');
  backdropEl.hidden = false;
  btn?.setAttribute('aria-expanded', 'true');
}

function closeMenu(menuEl, backdropEl, btn) {
  menuEl.classList.remove('is-open');
  backdropEl.classList.remove('is-open');
  backdropEl.hidden = true;
  btn?.setAttribute('aria-expanded', 'false');
}

function initHeader() {
  const header   = document.querySelector('.index-header');
  const toggle   = document.querySelector('.menu-toggle');
  const menu     = document.querySelector('.navlink-container');
  const backdrop = document.querySelector('.backdrop');

  if (!header || !toggle || !menu || !backdrop) return;

  setHeaderHeightVar(header);
  window.addEventListener('resize', () => {
    setHeaderHeightVar(header);
    closeMenu(menu, backdrop, toggle);
  });

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('is-open');
    isOpen ? closeMenu(menu, backdrop, toggle) : openMenu(menu, backdrop, toggle);
  });

  backdrop.addEventListener('click', () => closeMenu(menu, backdrop, toggle));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(menu, backdrop, toggle); });
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeMenu(menu, backdrop, toggle);
  });
}

initHeader();
