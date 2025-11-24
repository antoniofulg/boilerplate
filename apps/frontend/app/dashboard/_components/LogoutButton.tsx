'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@shared/ui';
import { trackEvent } from '../../../lib/telemetry/events';

/**
 * Logout Button Component (Client Component)
 * 
 * Handles logout action and redirects to login
 */
export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // Track logout event
    trackEvent({ type: 'logout_click' });

    // Clear session cookie
    await fetch('/api/auth/logout', { method: 'POST' });

    // Redirect to login
    router.push('/login');
    router.refresh();
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Sair
    </Button>
  );
}

