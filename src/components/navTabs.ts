export function updateNavTabs(route: 'recipes' | 'goat'): void {
  document.querySelectorAll<HTMLAnchorElement>('.nav-tab').forEach(tab => {
    const isActive = tab.dataset.route === route;
    tab.classList.toggle('nav-tab-active', isActive);
    tab.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
}
