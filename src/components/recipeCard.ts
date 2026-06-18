import type { Recipe } from '../types.ts';

const CATEGORY_COLORS: Record<string, string> = {
  'Taco Tuesday':      'bg-amber-900/60 text-amber-300 border-amber-700/50',
  'Game Day':          'bg-blue-900/60 text-blue-300 border-blue-700/50',
  'Recovery Smoothies':'bg-green-900/60 text-green-300 border-green-700/50',
  'Breakfast':         'bg-orange-900/60 text-orange-300 border-orange-700/50',
  'Family Dinner':     'bg-red-900/60 text-red-300 border-red-700/50',
};

export function recipeCard(recipe: Recipe): string {
  const badgeClass = CATEGORY_COLORS[recipe.category] ?? 'bg-zinc-800 text-zinc-300 border-zinc-700';
  const totalMin = recipe.prepMinutes + recipe.cookMinutes;

  return `
    <article class="group flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden
                    hover:border-amber-600/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.08)]
                    transition-all duration-300 cursor-pointer"
             onclick="window.location.hash='#/recipe/${recipe.id}'">
      <div class="relative overflow-hidden h-48">
        <img src="${recipe.image}"
             alt="${recipe.name}"
             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
             loading="lazy"
             onerror="this.style.background='linear-gradient(135deg,#1c1917,#292524)';this.style.display='block'" />
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent"></div>
        <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeClass}">
          ${recipe.category}
        </span>
      </div>

      <div class="flex flex-col flex-1 p-5">
        <h3 class="text-lg font-bold text-white mb-2 leading-snug group-hover:text-amber-300 transition-colors">
          ${recipe.name}
        </h3>
        <p class="text-zinc-400 text-sm leading-relaxed flex-1 mb-4 line-clamp-2">
          ${recipe.description}
        </p>
        <div class="flex items-center gap-4 text-xs text-zinc-500 border-t border-zinc-800 pt-4">
          <span class="flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            ${totalMin} min
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            Serves ${recipe.servings}
          </span>
          <span class="ml-auto text-amber-500/70 group-hover:text-amber-400 transition-colors text-xs font-medium">
            View Recipe →
          </span>
        </div>
      </div>
    </article>
  `;
}
