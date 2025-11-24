import { redirect } from 'next/navigation';
import { getSession } from '../../lib/auth/session';
import { isFeatureEnabled } from '../../lib/featureFlag';
import { apiFetch } from '../../lib/http/client';
import type { DashboardSnapshot } from '../../lib/contracts';
import { DashboardHeader } from './_components/DashboardHeader';
import { SidebarNav } from './_components/SidebarNav';
import { DashboardContent } from './_components/DashboardContent';

/**
 * Dashboard Page (Server Component)
 * 
 * Fetches dashboard snapshot from backend and renders static content
 * Uses Next.js cache for performance (revalidate: 60 seconds)
 */
export const revalidate = 60; // Cache for 60 seconds

export default async function DashboardPage() {
  // Check feature flag
  const isDashboardEnabled = isFeatureEnabled('staticDashboardMvp');

  if (!isDashboardEnabled) {
    redirect('/dashboard/coming-soon');
  }

  // Check authentication
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  // Fetch dashboard snapshot
  let snapshot: DashboardSnapshot;
  try {
    snapshot = await apiFetch<DashboardSnapshot>('/dashboard/snapshot', {
      method: 'GET',
    });
  } catch (error) {
    console.error('Failed to fetch dashboard snapshot:', error);
    // Fallback static data
    snapshot = {
      currentSession: {
        title: 'Sessão Ordinária - 22/11/2025',
        status: 'Em andamento',
        startedAt: new Date().toISOString(),
      },
      agendaItem: {
        title: 'Projeto de Lei 123/2025 - Reforma do Estatuto',
        description: 'Aprovação da reforma do estatuto da câmara municipal com atualizações de procedimentos internos.',
        rapporteur: 'Mesa Diretora',
      },
      memberPresence: [
        { name: 'Maria Silva', party: 'PT', isPresent: true },
        { name: 'João Santos', party: 'PSDB', isPresent: true },
        { name: 'Ana Costa', party: 'MDB', isPresent: false },
        { name: 'Pedro Lima', party: 'PSB', isPresent: true },
      ],
      recentResults: [
        { label: 'Projeto de Lei 120/2025', approved: true, votesYes: 12, votesNo: 3 },
        { label: 'Projeto de Lei 119/2025', approved: false, votesYes: 5, votesNo: 10 },
        { label: 'Projeto de Lei 118/2025', approved: true, votesYes: 15, votesNo: 0 },
      ],
    };
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <DashboardHeader />
      <div className="flex">
        <SidebarNav />
        <main className="flex-1">
          <DashboardContent snapshot={snapshot} />
        </main>
      </div>
    </div>
  );
}
