import { z } from 'zod';

/**
 * Session summary for current session card
 */
export const SessionSummarySchema = z.object({
  title: z.string(),
  status: z.enum(['Em andamento', 'Encerrada', 'Agendada']),
  startedAt: z.string().datetime(),
});

export type SessionSummary = z.infer<typeof SessionSummarySchema>;

/**
 * Agenda item for voting card
 */
export const AgendaItemSchema = z.object({
  title: z.string(),
  description: z.string().max(280),
  rapporteur: z.string().optional().default('Mesa Diretora'),
});

export type AgendaItem = z.infer<typeof AgendaItemSchema>;

/**
 * Member presence information
 */
export const MemberPresenceSchema = z.object({
  name: z.string(),
  party: z.string().min(2).max(5).optional(),
  isPresent: z.boolean(),
});

export type MemberPresence = z.infer<typeof MemberPresenceSchema>;

/**
 * Result line for recent results
 */
export const ResultLineSchema = z.object({
  label: z.string(),
  approved: z.boolean(),
  votesYes: z.number().int().min(0),
  votesNo: z.number().int().min(0),
});

export type ResultLine = z.infer<typeof ResultLineSchema>;

/**
 * Complete dashboard snapshot
 */
export const DashboardSnapshotSchema = z.object({
  currentSession: SessionSummarySchema,
  agendaItem: AgendaItemSchema,
  memberPresence: z.array(MemberPresenceSchema).min(1),
  recentResults: z.array(ResultLineSchema).min(1),
});

export type DashboardSnapshot = z.infer<typeof DashboardSnapshotSchema>;

