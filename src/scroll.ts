let observer: IntersectionObserver | null = null;

export function initScrollReveal(): void {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => {
    observer!.observe(el);
  });
}

export function observeReveal(el: Element): void {
  observer?.observe(el);
}

export function initTrophyTilt(container: HTMLElement): () => void {
  const trophies = container.querySelectorAll<HTMLElement>('.trophy-3d');
  if (!trophies.length) return () => {};

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return () => {};

  const handlers: Array<{ el: HTMLElement; fn: (e: MouseEvent) => void }> = [];

  trophies.forEach(trophy => {
    const fn = (e: MouseEvent) => {
      const rect = trophy.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      trophy.style.setProperty('--rx', `${(-dy * 12).toFixed(1)}deg`);
      trophy.style.setProperty('--ry', `${(dx * 12).toFixed(1)}deg`);
    };

    const reset = () => {
      trophy.style.setProperty('--rx', '0deg');
      trophy.style.setProperty('--ry', '0deg');
    };

    trophy.addEventListener('mousemove', fn);
    trophy.addEventListener('mouseleave', reset);
    handlers.push({ el: trophy, fn });
  });

  return () => {
    handlers.forEach(({ el, fn }) => el.removeEventListener('mousemove', fn));
  };
}
