/**
 * Static Dashboard Seed Data
 * 
 * Provides default user and dashboard snapshot for MVP testing
 */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedStaticDashboard(prisma: PrismaClient) {
  // Default user credentials: mesa@camara.gov.br / senha123
  const defaultPasswordHash = await bcrypt.hash('senha123', 10);

  const defaultUser = await prisma.authUser.upsert({
    where: { emailInstitucional: 'mesa@camara.gov.br' },
    update: {},
    create: {
      emailInstitucional: 'mesa@camara.gov.br',
      senhaHash: defaultPasswordHash,
      userName: 'Maria Silva',
      role: 'Secretário',
      chamber: 'Câmara Municipal de Nova Aurora',
    },
  });

  // Static dashboard snapshot
  const dashboardSnapshot = await prisma.dashboardSnapshot.upsert({
    where: { id: 'default-snapshot' },
    update: {},
    create: {
      id: 'default-snapshot',
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
    },
  });

  return { defaultUser, dashboardSnapshot };
}

