# Implementation Plan: Smart Voting MVP Surfaces

**Branch**: `001-voting-saas-ui` | **Date**: 2025-11-22 | **Spec**: [`spec.md`](./spec.md)
**Input**: Feature specification from `/specs/001-voting-saas-ui/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Deliver a public-facing landing page (SSG), institutional login, and static dashboard (Server Components) for the Câmara's "Votação Inteligente" SaaS. The MVP keeps dashboard data fixed (no live votes), focuses on a reliable login/logout loop via HTTP-only secure cookies, and visually communicates future modules via disabled menu items. Implementation leverages Next.js 16 + React 19 + Tailwind v4 + shadcn/ui on the frontend (SSG for landing, Server Components for dashboard); NestJS + Fastify + Prisma + Postgres on the backend with shared Zod contracts. Testing emphasis: essential integration test covering login → dashboard → logout, Vitest + RTL for UI, Supertest for API mock, Playwright for smoke-level E2E.

## Technical Context

**Language/Version**: Frontend Node.js 20 + Next.js 16 (React 19), Backend Node.js 20 + NestJS (Fastify adapter)  
**Primary Dependencies**: Tailwind CSS v4, shadcn/ui components, Zod shared contracts, Prisma ORM, Postgres (Dockerized). Note: Dashboard uses Server Components with direct fetch (no client-side React Query for static data).  
**Storage**: Postgres (Docker Compose service) for auth seed + dashboard snapshot; Prisma client handles access. Session storage: HTTP-only secure cookies (server-readable, XSS-safe).  
**Testing**: Vitest (unit/logic + React Testing Library), Supertest (API integration), Playwright (E2E smoke), Prisma test utils for data layer  
**Target Platform**: Responsive web app (landing SSG + authenticated dashboard Server Components) deployed on Linux containers behind HTTPS  
**Project Type**: Monorepo with `apps/frontend` (Next.js) and `apps/backend` (NestJS), plus shared packages (`packages/contracts`, `packages/ui`)  
**Performance Goals**: Frontend initial bundle <250 KB gzipped; `/auth/login` p95 <300 ms end-to-end; dashboard render <1.5 s on mid-tier mobile. Landing page: SSG for optimal CDN delivery. Dashboard: Server Components eliminate client JS for data fetching.  
**Constraints**: No live voting interactions, menu items beyond dashboard remain disabled; release path staging → smoke → prod behind `flag.staticDashboardMvp`; must capture analytics events and enforce ESLint+Prettier. TypeScript: prefer `type` over `interface` for shared contracts.  
**Scale/Scope**: Single municipality pilot (tens of concurrent officials); supports marketing audiences + authenticated clerks; total surface = landing (SSG) + login + static dashboard (Server Components)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Qualidade de Codigo**: ESLint + Prettier configs live under `shared/config`, both run in CI (`make test` chain) and via Git hooks. Folder layout above is the single source; ADR logged in `/docs/adr/0001-static-dashboard.md` (to be created alongside implementation). TypeScript: prefer `type` over `interface` for shared contracts.
- **II. Tipagem entre Front e Back**: `packages/contracts` holds Zod schemas for login + dashboard snapshot; Nest pipes and React hooks both import these types, and `pnpm typecheck` fails if versions misalign. No API call ships without schema validation. All contracts use `type` (not `interface`) per performance preference.
- **III. Testes minimos**: Essential automated test = Playwright scenario `login-dashboard-logout.spec.ts`, plus Vitest + RTL for login form and Supertest for `/auth/login`. Manual smoke test script defined in quickstart; CI order enforced by Makefile (`lint → test → build`).
- **IV. UX e Consistencia**: shadcn/ui + Tailwind tokens define button/input/card/modal/typography. Responsive breakpoints (≥360px mobile, ≥1280 desktop) documented; analytics events from spec wired via shared telemetry util. Loading/error/empty states reuse DS primitives.
- **V. Performance e Confiabilidade**: Bundle budget guarded by Next.js analytics + `next-bundle-analyzer`; landing page uses SSG (zero server load, optimal CDN delivery); dashboard uses Server Components with direct fetch (no client JS for data, reduces bundle); code splitting by route, lazy load hero media, Next.js server-side cache for dashboard snapshot. `/auth/login` mock stays in-memory to keep p95 <300 ms; release path uses `flag.staticDashboardMvp` + staging smoke.
- **VI–VIII. Operacoes & Workflow**: CI/CD via `make dev/up/down/test` automations; HTTPS termination handled upstream but app enforces HSTS + secure cookies (HTTP-only for session). Input validation + rate limit implemented in Nest guard. Feature checklist executed in quickstart (types → backend → frontend → essential test → smoke → deploy → monitor). All gates satisfied—proceeding to research.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
apps/
├── frontend/                # Next.js 16 + React 19 + Tailwind v4 + shadcn/ui
│   ├── app/
│   │   ├── (marketing)/    # Landing page (SSG)
│   │   ├── login/          # Login page (Server Component)
│   │   └── dashboard/      # Dashboard (Server Component with direct fetch)
│   ├── components/
│   ├── lib/
│   └── tests/
├── backend/                 # NestJS + Fastify + Prisma
│   ├── src/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── common/zod/
│   │   └── main.ts
│   └── tests/
└── shared/
    ├── packages/
    │   ├── contracts/       # Zod schemas + generated TS types (using `type`)
    │   └── ui/              # shadcn composition + theme tokens
    └── config/
        ├── eslint/
        ├── prettier/
        └── tailwind/

infrastructure/
├── docker-compose.yml
├── Dockerfile.frontend
├── Dockerfile.backend
├── prisma/
│   ├── schema.prisma
│   └── seeds/staticDashboard.ts
└── Makefile

tests/
├── unit/                    # cross-package unit specs (Vitest)
├── integration/             # API + shared flows (Vitest + Supertest)
└── e2e/                     # Playwright scenarios (login/logout smoke)
```

**Structure Decision**: Dual-app monorepo (frontend Next.js + backend NestJS) sharing contracts/UI packages aligns with the constitution's type-sharing mandate and keeps deployment parity with Docker Compose + Makefile orchestration already defined. Frontend uses Next.js App Router with SSG for landing and Server Components for dashboard (performance-focused architecture).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| *None* | — | All constitutional gates satisfied without exceptions |
