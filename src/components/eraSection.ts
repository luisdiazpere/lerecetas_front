import type { Era } from '../types.ts';
import type { Recipe } from '../types.ts';
import { trophy3d } from './trophy3d.ts';

const ERA_ICONS: Record<string, string> = {
  'cavs-i':  '🏀',
  'heat':    '🔥',
  'cavs-ii': '👑',
  'lakers':  '💜',
};

export function eraSection(era: Era, recipe: Recipe | undefined, index: number): string {
  const icon = ERA_ICONS[era.id] ?? '🏆';
  const isEven = index % 2 === 0;
  const delay1 = '0s';
  const delay2 = '0.2s';
  const delay3 = '0.35s';

  const trophyHtml = era.trophies.map((t, i) => trophy3d(t, i)).join('');

  const recipeSnippet = recipe
    ? `
      <div class="reveal reveal-delay-3 mt-6 bg-zinc-950/70 border border-zinc-700/50 rounded-2xl p-5
                  hover:border-amber-600/40 transition-colors cursor-pointer group"
           onclick="window.location.hash='#/recipe/${recipe.id}'">
        <p class="text-xs text-zinc-500 uppercase tracking-widest mb-2 font-medium">Era Signature Recipe</p>
        <div class="flex gap-4 items-start">
          <img src="${recipe.image}" alt="${recipe.name}"
               class="w-20 h-16 rounded-xl object-cover flex-shrink-0"
               onerror="this.style.background='#1c1917'" />
          <div class="flex-1 min-w-0">
            <h4 class="text-white font-bold text-base leading-tight mb-1 group-hover:text-amber-300 transition-colors">
              ${recipe.name}
            </h4>
            <p class="text-zinc-400 text-xs leading-relaxed line-clamp-2">${recipe.description}</p>
            <span class="inline-block mt-2 text-xs text-amber-500/70 group-hover:text-amber-400 transition-colors">
              View full recipe →
            </span>
          </div>
        </div>
      </div>
    `
    : '';

  return `
    <section class="era-section py-24 px-4 sm:px-6 border-b border-zinc-800/50"
             style="--era-primary:${era.accent.primary};--era-secondary:${era.accent.secondary};background-color:${era.accent.bg}">
      <div class="max-w-6xl mx-auto">

        <!-- Era header -->
        <div class="reveal mb-16 text-center" style="transition-delay:${delay1}">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/60
                      text-zinc-400 text-sm mb-6">
            <span>${icon}</span>
            <span>${era.team}</span>
            <span class="text-zinc-600">·</span>
            <span>${era.years}</span>
          </div>
          <h2 class="text-5xl sm:text-6xl font-black tracking-tight mb-4 text-gold-gradient">
            ${era.title}
          </h2>
        </div>

        <!-- Content grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${isEven ? '' : 'lg:[&>*:first-child]:order-2'}">

          <!-- Left: blurb + recipe card -->
          <div>
            <div class="reveal" style="transition-delay:${delay1}">
              <p class="text-zinc-300 text-base sm:text-lg leading-relaxed">
                ${era.blurb}
              </p>
            </div>
            ${recipeSnippet}
          </div>

          <!-- Right: trophies -->
          <div class="reveal" style="transition-delay:${delay2}">
            <p class="text-xs text-zinc-500 uppercase tracking-widest mb-8 font-medium text-center">
              Hardware
            </p>
            <div class="flex flex-wrap justify-center gap-8 sm:gap-12">
              ${trophyHtml}
            </div>
          </div>

        </div>

        <!-- Championship count ring (for multi-championship eras) -->
        ${era.trophies.filter(t => t.kind === 'championship').flatMap(t => t.years).length > 0 ? `
        <div class="reveal mt-16 flex justify-center" style="transition-delay:${delay3}">
          <div class="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-zinc-900/60 border border-zinc-700/60">
            ${era.trophies.filter(t => t.kind === 'championship').flatMap(t => t.years).map(y => `
              <span class="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/40
                           flex items-center justify-center text-amber-300 text-sm font-bold">'${y.slice(2)}</span>
            `).join('<span class="text-zinc-700">·</span>')}
            <span class="text-zinc-400 text-sm ml-1">
              ${era.trophies.filter(t => t.kind === 'championship').flatMap(t => t.years).length}
              ${era.trophies.filter(t => t.kind === 'championship').flatMap(t => t.years).length === 1 ? 'Ring' : 'Rings'} 💍
            </span>
          </div>
        </div>
        ` : ''}

      </div>
    </section>
  `;
}
