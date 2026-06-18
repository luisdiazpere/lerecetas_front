import type { Category } from './types.ts';

type Listener = () => void;

let _search = '';
let _category: Category | 'All' = 'All';
const _listeners: Set<Listener> = new Set();

function notify() {
  _listeners.forEach(fn => fn());
}

export function getSearch(): string {
  return _search;
}

export function setSearch(q: string): void {
  if (_search === q) return;
  _search = q;
  notify();
}

export function getCategory(): Category | 'All' {
  return _category;
}

export function setCategory(c: Category | 'All'): void {
  if (_category === c) return;
  _category = c;
  notify();
}

export function subscribe(fn: Listener): () => void {
  _listeners.add(fn);
  return () => _listeners.delete(fn);
}
