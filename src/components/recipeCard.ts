import type { Recipe } from '../types.ts';

interface CategoryStyle {
  badge: string;
  border: string;
  hoverBorder: string;
  glow: string;
  gradient: string;
  icon: string;
}

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  'Taco Tuesday': {
    badge:       'bg-amber-500/20 text-amber-200 border-amber-400/40',
    border:      'border-amber-900/50',
    hoverBorder: 'hover:border-amber-400/70',
    glow:        'hover:shadow-[0_0_40px_rgba(245,158,11,0.22)]',
    gradient:    'from-amber-950/70',
    icon:        '🌮',
  },
  'Game Day': {
    badge:       'bg-blue-500/20 text-blue-200 border-blue-400/40',
    border:      'border-blue-900/50',
    hoverBorder: 'hover:border-blue-400/70',
    glow:        'hover:shadow-[0_0_40px_rgba(59,130,246,0.22)]',
    gradient:    'from-blue-950/70',
    icon:        '🏀',
  },
  'Recovery Smoothies': {
    badge:       'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
    border:      'border-emerald-900/50',
    hoverBorder: 'hover:border-emerald-400/70',
    glow:        'hover:shadow-[0_0_40px_rgba(16,185,129,0.22)]',
    gradient:    'from-emerald-950/70',
    icon:        '🥤',
  },
  'Breakfast': {
    badge:       'bg-orange-500/20 text-orange-200 border-orange-400/40',
    border:      'border-orange-900/50',
    hoverBorder: 'hover:border-orange-400/70',
    glow:        'hover:shadow-[0_0_40px_rgba(249,115,22,0.22)]',
    gradient:    'from-orange-950/70',
    icon:        '🌅',
  },
  'Family Dinner': {
    badge:       'bg-rose-500/20 text-rose-200 border-rose-400/40',
    border:      'border-rose-900/50',
    hoverBorder: 'hover:border-rose-400/70',
    glow:        'hover:shadow-[0_0_40px_rgba(244,63,94,0.22)]',
    gradient:    'from-rose-950/70',
    icon:        '🍽️',
  },
};

const FALLBACK_STYLE: CategoryStyle = {
  badge:       'bg-zinc-800 text-zinc-300 border-zinc-700',
  border:      'border-zinc-800',
  hoverBorder: 'hover:border-zinc-600',
  glow:        'hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]',
  gradient:    'from-zinc-900/70',
  icon:        '🍴',
};

export function recipeCard(recipe: Recipe): string {
  const s = CATEGORY_STYLES[recipe.category] ?? FALLBACK_STYLE;
  const totalMin = recipe.prepMinutes + recipe.cookMinutes;

  return `
    <article
      class="group flex flex-col bg-zinc-900 border ${s.border} ${s.hoverBorder} ${s.glow}
             rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
      onclick="window.location.hash='#/recipe/${recipe.id}'"
    >
      <!-- Image -->
      <div class="relative overflow-hidden h-48 bg-zinc-800">
        <img
          src="${recipe.image}"
          alt="${recipe.name}"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
          onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex'"
        />
        <!-- Fallback shown when image errors -->
        <div class="absolute inset-0 hidden items-center justify-center text-5xl
                    bg-gradient-to-br from-zinc-800 to-zinc-900" aria-hidden="true">
          ${s.icon}
        </div>
        <!-- Bottom gradient -->
        <div class="absolute inset-0 bg-gradient-to-t ${s.gradient} via-transparent to-transparent"></div>
        <!-- Category badge -->
        <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${s.badge}">
          ${s.icon} ${recipe.category}
        </span>
        <!-- Time badge top-right -->
        <span class="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium
                     bg-black/50 text-white border border-white/10 backdrop-blur-sm">
          ⏱ ${totalMin}m
        </span>
      </div>

      <!-- Body -->
      <div class="flex flex-col flex-1 p-5">
        <h3 class="text-base font-bold text-white mb-1.5 leading-snug group-hover:text-amber-300 transition-colors duration-200">
          ${recipe.name}
        </h3>
        <p class="text-zinc-400 text-sm leading-relaxed flex-1 mb-4 line-clamp-2">
          ${recipe.description}
        </p>
        <div class="flex items-center justify-between text-xs border-t border-zinc-800 pt-3.5">
          <span class="text-zinc-500 flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            Serves ${recipe.servings}
          </span>
          <span class="text-amber-500/70 group-hover:text-amber-400 font-medium transition-colors duration-200">
            View Recipe →
          </span>
        </div>
      </div>
    </article>
  `;
}
