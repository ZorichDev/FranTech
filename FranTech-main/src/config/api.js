const configuredOrigin = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '');
const configuredApiRoot = configuredOrigin.endsWith('/api')
  ? configuredOrigin
  : `${configuredOrigin}/api`;

export const API_ROOT = import.meta.env.DEV ? '/api' : configuredApiRoot;

export function apiUrl(path) {
  return `${API_ROOT}${path.startsWith('/') ? path : `/${path}`}`;
}