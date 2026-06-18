type RouteHandler = (params: Record<string, string>) => void;

interface Route {
  pattern: RegExp;
  keys: string[];
  handler: RouteHandler;
}

const routes: Route[] = [];

export function on(path: string, handler: RouteHandler): void {
  const keys: string[] = [];
  const pattern = new RegExp(
    '^' +
      path.replace(/:([a-z]+)/g, (_: string, key: string) => {
        keys.push(key);
        return '([^/]+)';
      }) +
      '$'
  );
  routes.push({ pattern, keys, handler });
}

export function navigate(path: string): void {
  window.location.hash = path;
}

function resolve(): void {
  const hash = window.location.hash.slice(1) || '/';
  for (const route of routes) {
    const match = hash.match(route.pattern);
    if (match) {
      const params: Record<string, string> = {};
      route.keys.forEach((key, i) => {
        params[key] = decodeURIComponent(match[i + 1] ?? '');
      });
      route.handler(params);
      return;
    }
  }
}

export function initRouter(): void {
  window.addEventListener('hashchange', resolve);
  resolve();
}
