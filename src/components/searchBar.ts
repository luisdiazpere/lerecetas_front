import { getSearch, setSearch } from '../state.ts';

export function searchBar(): string {
  return `
    <div class="relative">
      <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none"
           fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <input
        id="recipe-search"
        type="search"
        placeholder="Search LeBron's recipes…"
        value="${getSearch()}"
        class="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white
               placeholder-zinc-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30
               transition-all duration-200"
        autocomplete="off"
        spellcheck="false"
      />
    </div>
  `;
}

export function bindSearchBar(): void {
  const input = document.getElementById('recipe-search') as HTMLInputElement | null;
  if (!input) return;
  input.addEventListener('input', () => setSearch(input.value.trim().toLowerCase()));
  input.focus();
}
