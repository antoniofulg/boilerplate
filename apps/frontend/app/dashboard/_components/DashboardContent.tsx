import type { DashboardSnapshot } from '../../../lib/contracts';
import { Card, Typography } from '@shared/ui';

type DashboardContentProps = {
  snapshot: DashboardSnapshot;
};

/**
 * Dashboard Content Component
 * 
 * Renders static dashboard cards and lists
 */
export function DashboardContent({ snapshot }: DashboardContentProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Current Session Card */}
      <Card title="Sessão Atual">
        <div className="space-y-2">
          <Typography variant="h4">{snapshot.currentSession.title}</Typography>
          <p className="text-sm text-neutral-600">
            Status: <span className="font-medium">{snapshot.currentSession.status}</span>
          </p>
          <p className="text-sm text-neutral-600">
            Iniciada em: {new Date(snapshot.currentSession.startedAt).toLocaleString('pt-BR')}
          </p>
        </div>
      </Card>

      {/* Agenda Item Card */}
      <Card title="Pauta em votação">
        <div className="space-y-2">
          <Typography variant="h4">{snapshot.agendaItem.title}</Typography>
          <p className="text-neutral-700">{snapshot.agendaItem.description}</p>
          {snapshot.agendaItem.rapporteur && (
            <p className="text-sm text-neutral-600">
              Relator: {snapshot.agendaItem.rapporteur}
            </p>
          )}
        </div>
      </Card>

      {/* Member Presence List */}
      <Card title="Membros Presentes">
        <ul className="space-y-2">
          {snapshot.memberPresence.map((member, index) => (
            <li
              key={index}
              className={`flex items-center justify-between p-2 rounded ${
                member.isPresent ? 'bg-green-50' : 'bg-neutral-50'
              }`}
            >
              <span className="font-medium">{member.name}</span>
              {member.party && <span className="text-sm text-neutral-600">{member.party}</span>}
              <span className={`text-sm ${member.isPresent ? 'text-green-600' : 'text-neutral-400'}`}>
                {member.isPresent ? 'Presente' : 'Ausente'}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Recent Results List */}
      <Card title="Resultados Recentes">
        <ul className="space-y-3">
          {snapshot.recentResults.map((result, index) => (
            <li key={index} className="border-b border-neutral-200 pb-3 last:border-0">
              <div className="flex items-center justify-between mb-1">
                <Typography variant="body">{result.label}</Typography>
                <span
                  className={`text-sm font-medium ${
                    result.approved ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {result.approved ? 'Aprovado' : 'Rejeitado'}
                </span>
              </div>
              <div className="text-sm text-neutral-600">
                Sim: {result.votesYes} | Não: {result.votesNo}
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

