import { eras } from '../data/eras.ts';
import { recipes } from '../data/recipes.ts';
import { eraSection } from '../components/eraSection.ts';
import { initScrollReveal, initTrophyTilt } from '../scroll.ts';

let _tiltCleanup: (() => void) | null = null;

export function mountGoat(app: HTMLElement): void {
  if (_tiltCleanup) { _tiltCleanup(); _tiltCleanup = null; }

  const totalChampionships = eras
    .flatMap(e => e.trophies.filter(t => t.kind === 'championship').flatMap(t => t.years))
    .length;

  const totalMVPs = eras
    .flatMap(e => e.trophies.filter(t => t.kind === 'mvp').flatMap(t => t.years))
    .length;

  app.innerHTML = `
    <!-- Hall of Fame Hero Banner -->
    <div class="relative overflow-hidden bg-zinc-950 border-b border-zinc-800/50 py-20 px-4 text-center">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(251,191,36,0.08),transparent_65%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_-10%,rgba(111,38,61,0.2),transparent_50%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_-10%,rgba(85,37,131,0.2),transparent_50%)]"></div>

      <div class="relative max-w-4xl mx-auto">
        <p class="text-amber-400/80 text-xs font-bold uppercase tracking-[0.25em] mb-4">Career Hall of Fame</p>
        <h1 class="text-5xl sm:text-7xl font-black tracking-tight mb-6 text-gold-gradient leading-none">
          The Way of<br />the GOAT
        </h1>
        <p class="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          Four eras. Four teams. Four decades of dominance — and a signature meal
          from every chapter of the greatest career in basketball history.
        </p>

        <!-- Trophy totals -->
        <div class="inline-flex gap-6 sm:gap-10 px-8 py-5 rounded-2xl bg-zinc-900/70 border border-zinc-700/60
                    backdrop-blur-sm">
          <div class="text-center">
            <p class="text-3xl font-black text-amber-400">${totalChampionships}</p>
            <p class="text-zinc-500 text-xs mt-1 uppercase tracking-wide">Rings 💍</p>
          </div>
          <div class="w-px bg-zinc-700/60"></div>
          <div class="text-center">
            <p class="text-3xl font-black text-amber-400">${totalMVPs}</p>
            <p class="text-zinc-500 text-xs mt-1 uppercase tracking-wide">MVP Awards</p>
          </div>
          <div class="w-px bg-zinc-700/60"></div>
          <div class="text-center">
            <p class="text-3xl font-black text-amber-400">${eras.length}</p>
            <p class="text-zinc-500 text-xs mt-1 uppercase tracking-wide">Eras</p>
          </div>
        </div>

        <!-- Scroll hint -->
        <div class="mt-10 flex flex-col items-center gap-2 text-zinc-600 text-xs animate-bounce">
          <span>Scroll the timeline</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Era timeline -->
    <div id="era-timeline">
      ${eras.map((era, i) => {
        const recipe = recipes.find(r => r.id === era.signatureRecipeId);
        return eraSection(era, recipe, i);
      }).join('')}
    </div>

    <!-- Closing block -->
    <div class="py-20 px-4 text-center bg-zinc-950 border-t border-zinc-800/50">
      <div class="max-w-2xl mx-auto">
        <p class="text-5xl mb-6">👑</p>
        <blockquote class="text-2xl sm:text-3xl font-black text-white leading-tight mb-4">
          "Strive for greatness."
        </blockquote>
        <p class="text-zinc-500 text-sm mb-8">— LeBron James</p>
        <a href="#/"
           class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30
                  text-amber-300 text-sm font-medium hover:bg-amber-500/20 transition-colors">
          🍽️ Browse all recipes
        </a>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    initScrollReveal();
    _tiltCleanup = initTrophyTilt(app);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function unmountGoat(): void {
  if (_tiltCleanup) { _tiltCleanup(); _tiltCleanup = null; }
}
