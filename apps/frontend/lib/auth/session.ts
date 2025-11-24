import type { AuthSessionPayload } from '@shared/contracts';
import { cookies } from 'next/headers';

/**
 * Session Utilities
 * 
 * Server-side session management using HTTP-only secure cookies
 */

/**
 * Get current session from HTTP-only cookie (server-side only)
 */
export async function getSession(): Promise<AuthSessionPayload | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('smartvoto_session');

  if (!sessionCookie?.value) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(sessionCookie.value)) as AuthSessionPayload;
  } catch {
    return null;
  }
}

/**
 * Clear session cookie (logout)
 */
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('smartvoto_session');
}

