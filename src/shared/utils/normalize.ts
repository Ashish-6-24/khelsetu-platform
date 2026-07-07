/**
 * Defensive response normalizers for API calls.
 * Backend APIs may return unexpected shapes — these ensure the app never crashes.
 */

/** Ensure response data is an array. Checks common wrapper keys. */
export function normalizeArray<T>(data: unknown, fallback: T[] = []): T[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') {
    const obj = data as Record<string, unknown>;
    if (Array.isArray(obj.data)) return obj.data as T[];
    if (Array.isArray(obj.matches)) return obj.matches as T[];
    if (Array.isArray(obj.items)) return obj.items as T[];
    if (Array.isArray(obj.results)) return obj.results as T[];
    if (Array.isArray(obj.teams)) return obj.teams as T[];
  }
  return fallback;
}

/** Ensure response data is a non-array object. Returns fallback otherwise. */
export function normalizeObject<T>(
  data: unknown,
  fallback: T | null = null,
): T | null {
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    return data as T;
  }
  return fallback;
}
