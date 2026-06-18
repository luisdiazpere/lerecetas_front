import type { Trophy, TrophyKind } from '../types.ts';

function championshipSVG(): string {
  return `<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <defs>
      <linearGradient id="ball-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F97316"/>
        <stop offset="100%" stop-color="#C2410C"/>
      </linearGradient>
      <linearGradient id="cup-g" x1="0%" y1="0%" x2="60%" y2="100%">
        <stop offset="0%" stop-color="#FDE68A"/>
        <stop offset="40%" stop-color="#F59E0B"/>
        <stop offset="100%" stop-color="#92400E"/>
      </linearGradient>
      <linearGradient id="base-g" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#D97706"/>
        <stop offset="100%" stop-color="#78350F"/>
      </linearGradient>
    </defs>
    <!-- Basketball -->
    <circle cx="50" cy="18" r="14" fill="url(#ball-g)"/>
    <path d="M36 18 Q50 30 64 18" stroke="#9A3412" fill="none" stroke-width="1.5"/>
    <path d="M36 18 Q50 6 64 18"  stroke="#9A3412" fill="none" stroke-width="1.5"/>
    <line x1="50" y1="4" x2="50" y2="32" stroke="#9A3412" stroke-width="1.5"/>
    <!-- Shine on ball -->
    <ellipse cx="43" cy="12" rx="4" ry="2.5" fill="white" opacity="0.25" transform="rotate(-20,43,12)"/>
    <!-- Cup body -->
    <path d="M30 32 L18 72 L82 72 L70 32 Z" fill="url(#cup-g)"/>
    <!-- Cup vertical facets -->
    <line x1="40" y1="32" x2="34" y2="72" stroke="#FDE68A" stroke-width="0.6" opacity="0.5"/>
    <line x1="50" y1="32" x2="50" y2="72" stroke="#FDE68A" stroke-width="0.6" opacity="0.5"/>
    <line x1="60" y1="32" x2="66" y2="72" stroke="#FDE68A" stroke-width="0.6" opacity="0.5"/>
    <!-- Cup highlight -->
    <path d="M34 36 Q37 54 35 68" stroke="white" stroke-width="2.5" opacity="0.18" stroke-linecap="round"/>
    <!-- Handles -->
    <path d="M18 72 Q4 62 7 44 Q10 36 18 40" stroke="url(#cup-g)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M82 72 Q96 62 93 44 Q90 36 82 40" stroke="url(#cup-g)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <!-- Stem -->
    <rect x="44" y="72" width="12" height="36" fill="url(#base-g)" rx="2"/>
    <!-- Base tiers -->
    <rect x="26" y="108" width="48" height="10" fill="#D97706" rx="3"/>
    <rect x="18" y="118" width="64" height="14" fill="url(#base-g)" rx="4"/>
    <!-- Base shine -->
    <rect x="22" y="120" width="56" height="4" fill="white" opacity="0.06" rx="2"/>
  </svg>`;
}

function mvpSVG(secondary = false): string {
  const topColor = secondary ? '#C0C0C0' : '#FDE68A';
  const midColor = secondary ? '#A0A0A0' : '#F59E0B';
  const darkColor = secondary ? '#707070' : '#92400E';

  return `<svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <defs>
      <linearGradient id="mvp-g-${secondary ? 's' : 'g'}" x1="0%" y1="0%" x2="60%" y2="100%">
        <stop offset="0%" stop-color="${topColor}"/>
        <stop offset="50%" stop-color="${midColor}"/>
        <stop offset="100%" stop-color="${darkColor}"/>
      </linearGradient>
    </defs>
    <!-- Star on top -->
    <text x="50" y="26" font-size="24" text-anchor="middle" fill="${midColor}">★</text>
    <!-- Cup body -->
    <path d="M28 30 L16 75 L84 75 L72 30 Z" fill="url(#mvp-g-${secondary ? 's' : 'g'})"/>
    <!-- Cup highlight -->
    <path d="M33 34 Q36 52 34 70" stroke="white" stroke-width="2.5" opacity="0.2" stroke-linecap="round"/>
    <!-- Handles -->
    <path d="M16 75 Q3 64 6 46 Q9 37 16 41"  stroke="${midColor}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M84 75 Q97 64 94 46 Q91 37 84 41" stroke="${midColor}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <!-- MVP text on cup -->
    <text x="50" y="60" font-size="13" font-weight="bold" text-anchor="middle"
          fill="white" opacity="0.85" letter-spacing="1">MVP</text>
    <!-- Stem -->
    <rect x="44" y="75" width="12" height="32" fill="${darkColor}" rx="2"/>
    <!-- Base -->
    <rect x="28" y="107" width="44" height="10" fill="${midColor}" rx="2"/>
    <rect x="20" y="117" width="60" height="12" fill="${darkColor}" rx="3"/>
  </svg>`;
}

function rotysvg(): string {
  return `<svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <defs>
      <linearGradient id="roty-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#93C5FD"/>
        <stop offset="100%" stop-color="#1D4ED8"/>
      </linearGradient>
    </defs>
    <!-- Shield / plaque -->
    <path d="M20 15 L80 15 L80 75 Q80 95 50 105 Q20 95 20 75 Z" fill="url(#roty-g)"/>
    <!-- Shield highlight -->
    <path d="M27 20 Q30 35 28 68" stroke="white" stroke-width="2.5" opacity="0.22" stroke-linecap="round"/>
    <!-- ROTY text -->
    <text x="50" y="48" font-size="10" font-weight="bold" text-anchor="middle" fill="white" opacity="0.9" letter-spacing="0.5">ROOKIE</text>
    <text x="50" y="62" font-size="10" font-weight="bold" text-anchor="middle" fill="white" opacity="0.9" letter-spacing="0.5">OF THE</text>
    <text x="50" y="76" font-size="10" font-weight="bold" text-anchor="middle" fill="white" opacity="0.9" letter-spacing="0.5">YEAR</text>
    <!-- Star on shield -->
    <text x="50" y="30" font-size="14" text-anchor="middle" fill="#FDE68A" opacity="0.9">★</text>
    <!-- Pedestal stem -->
    <rect x="44" y="105" width="12" height="10" fill="#1D4ED8" rx="1"/>
    <!-- Base -->
    <rect x="28" y="115" width="44" height="10" fill="#1E40AF" rx="3"/>
  </svg>`;
}

function milestoneSVG(): string {
  return `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <defs>
      <radialGradient id="ms-g" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#FDE68A"/>
        <stop offset="50%" stop-color="#F59E0B"/>
        <stop offset="100%" stop-color="#78350F"/>
      </radialGradient>
    </defs>
    <!-- Diamond/star burst -->
    <polygon points="50,5 58,32 82,32 63,50 70,76 50,60 30,76 37,50 18,32 42,32"
             fill="url(#ms-g)" stroke="#FDE68A" stroke-width="0.5" opacity="0.9"/>
    <!-- Crown on top of star -->
    <text x="50" y="44" font-size="18" text-anchor="middle">👑</text>
    <!-- Points flash -->
    <polygon points="50,5 58,32 82,32 63,50 70,76 50,60 30,76 37,50 18,32 42,32"
             fill="none" stroke="white" stroke-width="0.8" opacity="0.25"/>
    <!-- Stem -->
    <rect x="44" y="76" width="12" height="30" fill="#D97706" rx="2"/>
    <!-- Base -->
    <rect x="28" y="106" width="44" height="10" fill="#D97706" rx="2"/>
    <rect x="20" y="116" width="60" height="12" fill="#78350F" rx="3"/>
  </svg>`;
}

function trophySVG(kind: TrophyKind): string {
  switch (kind) {
    case 'championship': return championshipSVG();
    case 'finals-mvp':   return mvpSVG(true);
    case 'mvp':          return mvpSVG(false);
    case 'roty':         return rotysvg();
    case 'milestone':    return milestoneSVG();
  }
}

export function trophy3d(trophy: Trophy, index = 0): string {
  const delay = index * 0.8;
  const yearBadges = trophy.years.map((y, i) => `
    <span class="year-badge inline-block px-2 py-0.5 bg-zinc-900/90 border border-amber-600/40
                 text-amber-300 text-xs font-bold rounded-full"
          style="animation-delay:${0.3 + i * 0.15}s">
      ${y}
    </span>
  `).join('');

  return `
    <div class="flex flex-col items-center gap-3" style="animation-delay:${delay}s">
      <div class="trophy-3d w-20 h-24 sm:w-24 sm:h-28" title="${trophy.label}" style="animation-delay:${delay}s">
        <div class="shine-layer"></div>
        ${trophySVG(trophy.kind)}
      </div>
      <div class="text-center">
        <p class="text-xs font-semibold text-zinc-300 mb-1.5">${trophy.label}</p>
        <div class="flex flex-wrap gap-1 justify-center">
          ${yearBadges}
        </div>
      </div>
    </div>
  `;
}
