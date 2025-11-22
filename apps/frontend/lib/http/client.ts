/**
 * HTTP Client
 * 
 * CSRF-safe fetch wrapper for API calls
 * Automatically includes credentials (cookies) for authenticated requests
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export type FetchOptions = RequestInit & {
  body?: unknown;
};

/**
 * CSRF-safe fetch wrapper
 * 
 * Features:
 * - Automatic credentials (cookies) inclusion
 * - JSON body serialization
 * - Error handling
 */
export async function apiFetch(endpoint: string, options: FetchOptions = {}) {
  const { body, ...fetchOptions } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
    credentials: 'include', // Include cookies for HTTP-only session
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

