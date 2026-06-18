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
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-10">

      <!-- Hero -->
      <div class="mb-12 text-center">
        <p class="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Chef LeBron</p>
        <h1 class="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
          Fuel Like <span class="text-gold-gradient">The GOAT</span>
        </h1>
        <p class="text-zinc-400 text-lg max-w-xl mx-auto">
          Every recipe LeBron eats, trains on, and feeds his family with.
          Athlete food. Real food. Championship food.
        </p>
      </div>

      <!-- Search + Filter -->
      <div class="flex flex-col gap-4 mb-8">
        <div class="max-w-md mx-auto w-full">
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
    count.textContent = n === recipes.length
      ? `Showing all ${n} recipes`
      : `${n} of ${recipes.length} recipes`;
  }
  updateCount();

  _unsub = subscribe(() => {
    renderGrid(app);
    updateCount();

    const filter = app.querySelector('#category-filter');
    if (filter) {
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
    }
  });
}

export function unmountHome(): void {
  if (_unsub) { _unsub(); _unsub = null; }
}
