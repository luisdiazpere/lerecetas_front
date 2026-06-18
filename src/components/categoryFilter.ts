import { CATEGORIES } from '../types.ts';
import type { Category } from '../types.ts';
import { getCategory, setCategory } from '../state.ts';

export function categoryFilter(): string {
  const active = getCategory();

  const chips = (['All', ...CATEGORIES] as Array<'All' | Category>).map(cat => {
    const isActive = cat === active;
    return `
      <button
        data-category="${cat}"
        class="category-chip px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 whitespace-nowrap
               ${isActive
                 ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_10px_rgba(251,191,36,0.15)]'
                 : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:text-white hover:border-zinc-500'
               }"
        aria-pressed="${isActive}"
      >
        ${cat}
      </button>
    `;
  }).join('');

  return `
    <div id="category-filter" class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" role="group" aria-label="Filter by category">
      ${chips}
    </div>
  `;
}

export function bindCategoryFilter(): void {
  const container = document.getElementById('category-filter');
  if (!container) return;
  container.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.category-chip');
    if (!btn?.dataset.category) return;
    setCategory(btn.dataset.category as Category | 'All');
  });
}
