import { getRecipeById } from '../data/recipes.ts';

export function mountDetail(app: HTMLElement, id: string, from: string): void {
  const recipe = getRecipeById(id);

  if (!recipe) {
    app.innerHTML = `
      <div class="max-w-2xl mx-auto px-4 py-24 text-center">
        <div class="text-6xl mb-6">😕</div>
        <h2 class="text-2xl font-bold text-white mb-4">Recipe not found</h2>
        <a href="#/" class="text-amber-400 hover:text-amber-300 text-sm">← Back to recipes</a>
      </div>
    `;
    return;
  }

  const totalMin = recipe.prepMinutes + recipe.cookMinutes;
  const backHash = from === 'goat' ? '#/goat' : '#/';
  const backLabel = from === 'goat' ? '← The Way of the GOAT' : '← All Recipes';

  app.innerHTML = `
    <article class="max-w-3xl mx-auto px-4 sm:px-6 py-10">

      <!-- Back -->
      <a href="${backHash}"
         class="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm mb-8
                transition-colors group">
        <svg class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        ${backLabel}
      </a>

      <!-- Hero image -->
      <div class="relative rounded-2xl overflow-hidden h-64 sm:h-80 mb-8 bg-zinc-900">
        <img src="${recipe.image}"
             alt="${recipe.name}"
             class="w-full h-full object-cover"
             onerror="this.style.background='linear-gradient(135deg,#1c1917,#292524)'" />
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent"></div>
        <span class="absolute top-4 left-4 px-3 py-1 bg-zinc-900/80 backdrop-blur rounded-full
                     text-xs font-semibold text-amber-300 border border-amber-600/30">
          ${recipe.category}
        </span>
      </div>

      <!-- Title -->
      <h1 class="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
        ${recipe.name}
      </h1>
      <p class="text-zinc-400 text-base leading-relaxed mb-6">${recipe.description}</p>

      <!-- Stats bar -->
      <div class="grid grid-cols-3 gap-4 mb-8 p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800">
        <div class="text-center">
          <p class="text-xl font-bold text-white">${recipe.prepMinutes}</p>
          <p class="text-zinc-500 text-xs mt-0.5">Prep min</p>
        </div>
        <div class="text-center border-x border-zinc-800">
          <p class="text-xl font-bold text-white">${recipe.cookMinutes}</p>
          <p class="text-zinc-500 text-xs mt-0.5">Cook min</p>
        </div>
        <div class="text-center">
          <p class="text-xl font-bold text-white">${recipe.servings}</p>
          <p class="text-zinc-500 text-xs mt-0.5">Servings</p>
        </div>
      </div>
      <p class="text-center text-zinc-600 text-xs mb-8">Total: ${totalMin} minutes</p>

      <!-- LeBron Note -->
      ${recipe.lebronNote ? `
      <div class="relative mb-10 p-5 rounded-2xl bg-amber-950/30 border border-amber-700/30">
        <span class="absolute -top-3 left-5 text-2xl">👑</span>
        <p class="text-amber-200/90 italic text-sm leading-relaxed mt-1">${recipe.lebronNote}</p>
      </div>
      ` : ''}

      <!-- Two-column layout: ingredients + steps -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">

        <!-- Ingredients -->
        <div>
          <h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span class="w-1 h-5 bg-amber-500 rounded-full inline-block"></span>
            Ingredients
          </h2>
          <ul class="space-y-2">
            ${recipe.ingredients.map(ing => `
              <li class="flex items-start gap-2.5 text-zinc-300 text-sm leading-relaxed">
                <svg class="w-3.5 h-3.5 mt-1 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"/>
                </svg>
                ${ing}
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Steps -->
        <div>
          <h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span class="w-1 h-5 bg-amber-500 rounded-full inline-block"></span>
            Instructions
          </h2>
          <ol class="space-y-4">
            ${recipe.steps.map((step, i) => `
              <li class="flex gap-3 text-sm text-zinc-300 leading-relaxed">
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/15 border border-amber-500/30
                             flex items-center justify-center text-amber-400 text-xs font-bold">
                  ${i + 1}
                </span>
                <p class="pt-0.5">${step}</p>
              </li>
            `).join('')}
          </ol>
        </div>

      </div>

      <!-- Bottom nav -->
      <div class="border-t border-zinc-800 pt-8 text-center">
        <a href="${backHash}" class="text-amber-400 hover:text-amber-300 text-sm transition-colors">
          ${backLabel}
        </a>
      </div>

    </article>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}
