import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import type { DashboardSnapshot } from '@shared/contracts';

/**
 * Dashboard Service
 * 
 * Provides static dashboard snapshot data for MVP
 */
@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSnapshot(): Promise<DashboardSnapshot> {
    // Get the default snapshot from database
    const snapshot = await this.prisma.dashboardSnapshot.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    if (!snapshot) {
      // Fallback static data if no snapshot exists
      return {
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

    // Parse JSON fields from database
    return {
      currentSession: snapshot.currentSession as DashboardSnapshot['currentSession'],
      agendaItem: snapshot.agendaItem as DashboardSnapshot['agendaItem'],
      memberPresence: snapshot.memberPresence as DashboardSnapshot['memberPresence'],
      recentResults: snapshot.recentResults as DashboardSnapshot['recentResults'],
    };
  }
}

