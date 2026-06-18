import './style.css';
import { on, initRouter } from './router.ts';
import { mountHome, unmountHome } from './views/home.ts';
import { mountDetail } from './views/detail.ts';
import { mountGoat, unmountGoat } from './views/goat.ts';
import { updateNavTabs } from './components/navTabs.ts';

const app = document.getElementById('app') as HTMLElement;

let _currentView: 'home' | 'detail' | 'goat' | null = null;
let _lastFrom: string = 'recipes';

function teardown() {
  if (_currentView === 'home') unmountHome();
  if (_currentView === 'goat') unmountGoat();
}

on('/', () => {
  teardown();
  _currentView = 'home';
  updateNavTabs('recipes');
  mountHome(app);
});

on('/goat', () => {
  teardown();
  _currentView = 'goat';
  updateNavTabs('goat');
  mountGoat(app);
});

on('/recipe/:id', ({ id }) => {
  const comingFromGoat = _currentView === 'goat';
  if (comingFromGoat) _lastFrom = 'goat';
  else _lastFrom = 'recipes';
  teardown();
  _currentView = 'detail';
  updateNavTabs(_lastFrom === 'goat' ? 'goat' : 'recipes');
  mountDetail(app, id, _lastFrom);
});

initRouter();
