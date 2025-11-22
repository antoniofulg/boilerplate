/**
 * Re-export shared contracts for frontend use
 * This ensures frontend always uses the same types as backend
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

