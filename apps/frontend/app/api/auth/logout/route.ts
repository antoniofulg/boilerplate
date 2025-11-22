import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Logout API Route
 * 
 * Clears the session cookie
 */
export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('smartvoto_session');

  return NextResponse.json({ success: true });
}

