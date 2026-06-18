import { recipes } from '../data/recipes.ts';
import { getSearch, getCategory, subscribe } from '../state.ts';
import { recipeCard } from '../components/recipeCard.ts';
import { searchBar, bindSearchBar } from '../components/searchBar.ts';
import { categoryFilter, bindCategoryFilter } from '../components/categoryFilter.ts';

function filteredRecipes() {
  const q = getSearch();
  const cat = getCategory();
  return recipes.filter(r => {
    const matchCat = cat === 'All' || r.category === cat;
    const matchQ = !q || r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
    return matchCat && matchQ;
  });
}

function categoryTotal(): number {
  const cat = getCategory();
  if (cat === 'All') return recipes.length;
  return recipes.filter(r => r.category === cat).length;
}

function renderGrid(container: HTMLElement): void {
  const list = filteredRecipes();
  const grid = container.querySelector<HTMLElement>('#recipe-grid');
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full flex flex-col items-center justify-center py-24 text-center gap-4">
        <div class="text-6xl">🤷</div>
        <p class="text-xl font-bold text-zinc-300">No recipes match</p>
        <p class="text-zinc-500 text-sm">Try a different search or reset the category filter.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map(r => recipeCard(r)).join('');
}

let _unsub: (() => void) | null = null;

export function mountHome(app: HTMLElement): void {
  if (_unsub) { _unsub(); _unsub = null; }

  app.innerHTML = `
    <!-- Hero banner -->
    <div class="relative overflow-hidden border-b border-zinc-800/60 py-16 px-4 text-center">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(251,191,36,0.10),transparent_60%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_100%,rgba(249,115,22,0.08),transparent_50%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_100%,rgba(16,185,129,0.08),transparent_50%)]"></div>
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>
      <div class="relative max-w-2xl mx-auto">
        <p class="text-amber-400/90 text-xs font-bold uppercase tracking-[0.3em] mb-3">👑 Chef LeBron</p>
        <h1 class="text-5xl sm:text-6xl font-black leading-none mb-4">
          Fuel Like <span class="text-gold-gradient">The GOAT</span>
        </h1>
        <p class="text-zinc-400 text-lg leading-relaxed">
          Every recipe LeBron eats, trains on, and feeds his family with.
          Athlete food. Real food. Championship food.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      <!-- Search + Filter -->
      <div class="flex flex-col gap-4 mb-6">
        <div class="max-w-lg mx-auto w-full">
          ${searchBar()}
        </div>
        <div class="flex justify-center">
          ${categoryFilter()}
        </div>
      </div>

      <!-- Results count -->
      <p id="results-count" class="text-zinc-500 text-sm mb-6 text-center"></p>

      <!-- Grid -->
      <div id="recipe-grid"
           class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      </div>

    </div>
  `;

  bindSearchBar();
  bindCategoryFilter();
  renderGrid(app);

  const count = app.querySelector<HTMLElement>('#results-count');

  function updateCount() {
    if (!count) return;
    const n = filteredRecipes().length;
    const total = categoryTotal();
    const cat = getCategory();
    const label = cat === 'All' ? 'recipes' : `${cat} recipes`;
    count.textContent = n === total
      ? `Showing all ${n} ${label}`
      : `${n} of ${total} ${label}`;
  }
  updateCount();

  _unsub = subscribe(() => {
    renderGrid(app);
    updateCount();

    const active = getCategory();
    app.querySelectorAll<HTMLButtonElement>('.category-chip').forEach(btn => {
      const isActive = btn.dataset.category === active;
      btn.classList.toggle('bg-amber-500/20', isActive);
      btn.classList.toggle('text-amber-300', isActive);
      btn.classList.toggle('border-amber-500/50', isActive);
      btn.classList.toggle('shadow-[0_0_10px_rgba(251,191,36,0.15)]', isActive);
      btn.classList.toggle('bg-zinc-900', !isActive);
      btn.classList.toggle('text-zinc-400', !isActive);
      btn.classList.toggle('border-zinc-700', !isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  });
}

export function unmountHome(): void {
  if (_unsub) { _unsub(); _unsub = null; }
}
