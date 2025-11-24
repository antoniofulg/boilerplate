# Data Model – Smart Voting MVP Surfaces

## Entity: AuthLoginRequest
| Field | Type | Validation Rules | Notes |
|-------|------|------------------|-------|
| emailInstitucional | string | Required, must be institutional domain (`*@camara.gov.br`), lowercased before storage | Collected via login form; validated by Zod + Nest pipes |
| senha | string | Required, min 8 chars, trims whitespace, never logged | Only checked against seeded hash during mock |

## Entity: AuthSessionPayload
| Field | Type | Validation Rules | Notes |
|-------|------|------------------|-------|
| userName | string | Required, 3–80 chars | Displayed in dashboard header |
| role | enum | One of `("Presidente", "Secretário", "Vereador")` | Controls future authorization (not leveraged yet) |
| chamber | string | Required, matches landing copy (e.g., "Câmara Municipal de Nova Aurora") | Used in hero + dashboard context |
| issuedAt | ISO datetime | Required | Stored client-side for telemetry/debug |

## Entity: DashboardSnapshot
| Field | Type | Validation Rules | Notes |
|-------|------|------------------|-------|
| currentSession | SessionSummary | Required object defined below | Drives “Sessão Atual” card |
| agendaItem | AgendaItem | Required | “Pauta em votação” card |
| memberPresence | MemberPresence[] | Min 1 entry | Rendered as static list |
| recentResults | ResultLine[] | Min 1 entry | Shows historical outcomes |

### SessionSummary
| Field | Type | Validation | Notes |
| title | string | Required | e.g., “Sessão Ordinária 42/2025” |
| status | enum | `("Em andamento","Encerrada","Agendada")` | Only “Em andamento” for MVP |
| startedAt | ISO datetime | Required | Display only |

### AgendaItem
| Field | Type | Validation |
| title | string | Required |
| description | string | Required, max 280 chars |
| rapporteur | string | Optional, defaults “Mesa Diretora” |

### MemberPresence
| Field | Type | Validation |
| name | string | Required |
| party | string | Optional, uppercase 2–5 chars |
| isPresent | boolean | Required |

### ResultLine
| Field | Type | Validation |
| label | string | Required |
| approved | boolean | Required |
| votesYes | number | >=0 |
| votesNo | number | >=0 |

## Entity: MenuItemState
| Field | Type | Validation Rules | Notes |
| label | string | Required, matches UI copy |
| route | string | `/dashboard`, `/sessions`, etc. Must be lowercase slug | Used for analytics payload |
| isActive | boolean | Exactly one item true (Dashboard) |
| isDisabled | boolean | True for future modules; when true, UI prevents navigation |

## Relationships & Flows
- `AuthLoginRequest` → (validated) → `AuthSessionPayload`: backend mock checks email/senha and produces payload if credentials match seeded record.
- `AuthSessionPayload.userName` hydrates dashboard header and analytics context.
- `DashboardSnapshot` fields hydrate UI cards; snapshot is read-only and seeded via Prisma.
- `MenuItemState` array is derived per session; `isDisabled = true` for “Sessões”, “Pautas”, “Relatórios”, “Configurações”.

## Validation & State Rules
- Session presence on client is stored in secure cookie/local storage; middleware guards `/dashboard` by checking payload validity and `issuedAt` freshness (<24h).
- Disabled menu items remain focusable for accessibility but `aria-disabled` ensures no navigation; analytics event logs attempt to access disabled routes for future prioritization.
- All models share the `packages/contracts` Zod schemas; Prisma schema mirrors the same fields for seeds/migrations ensuring end-to-end type parity.

