const rawCodespaceName = import.meta.env.VITE_CODESPACE_NAME;
export const codespaceName = typeof rawCodespaceName === 'string' && rawCodespaceName.trim() !== '' ? rawCodespaceName.trim() : '';
export const isCodespaceUrl = Boolean(codespaceName);
const protocol = codespaceName ? 'https' : 'http';
const host = codespaceName ? `${codespaceName}-8000.app.github.dev` : 'localhost:8000';
export const apiBaseUrl = `${protocol}://${host}/api`;

export function getApiUrl(endpoint: string) {
  const safeEndpoint = endpoint.replace(/^\/+/, '');
  return `${apiBaseUrl}/${safeEndpoint}`;
}

export function normalizeApiResponse<T>(body: unknown): T[] {
  if (Array.isArray(body)) return body;
  if (!body || typeof body !== 'object') return [];

  const payload = body as Record<string, unknown>;
  const candidates = [payload.data, payload.results, payload.items];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate as T[];
  }

  return [];
}

export async function fetchList<T>(endpoint: string): Promise<T[]> {
  const response = await fetch(getApiUrl(endpoint));
  const payload = await response.json();

  if (!response.ok) {
    const errorMessage = typeof payload === 'object' && payload && 'error' in payload
      ? (payload as Record<string, unknown>).error
      : response.statusText;
    throw new Error(String(errorMessage || `Request failed: ${response.status}`));
  }

  return normalizeApiResponse<T>(payload);
}
