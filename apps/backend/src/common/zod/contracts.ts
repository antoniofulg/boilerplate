/**
 * Re-export shared contracts for backend use
 * This ensures backend always uses the same types as frontend
 */
export {
  AuthLoginRequestSchema,
  AuthSessionPayloadSchema,
  MenuItemStateSchema,
  DashboardSnapshotSchema,
  SessionSummarySchema,
  AgendaItemSchema,
  MemberPresenceSchema,
  ResultLineSchema,
  type AuthLoginRequest,
  type AuthSessionPayload,
  type MenuItemState,
  type DashboardSnapshot,
  type SessionSummary,
  type AgendaItem,
  type MemberPresence,
  type ResultLine,
} from '@shared/contracts';

