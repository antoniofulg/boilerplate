import { getSession, clearSession } from '../../../lib/auth/session';
import { Button } from '@shared/ui';
import { LogoutButton } from './LogoutButton';

/**
 * Dashboard Header Component (Server Component)
 * 
 * Displays user name and logout button
 */
export async function DashboardHeader() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return (
    <header className="bg-white border-b border-neutral-200 px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-semibold text-neutral-900">Dashboard</h1>
        <p className="text-sm text-neutral-600">
          Bem-vindo, {session.userName} ({session.role})
        </p>
      </div>
      <LogoutButton />
    </header>
  );
}

