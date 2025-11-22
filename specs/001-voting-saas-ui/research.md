# Research – Smart Voting MVP Surfaces

## Decision 1: Frontend will use Next.js 16 + React 19 with Tailwind v4 + shadcn/ui
- **Rationale**: Matches user mandate, keeps routing/layout/server components aligned with the boilerplate, and offers first-class tooling for responsive marketing (landing) plus authenticated dashboard shells. shadcn/ui gives us audited button/input/card/modal primitives needed by the constitution’s mini design system requirement.
- **Alternatives considered**: 
  - Keep plain React SPA → rejected because we need hybrid routing + SSR for SEO on the landing.
  - Use Chakra/MUI instead of shadcn → heavier bundle and conflicts with Tailwind v4 tokens dictated by existing Makefile workflows.

## Decision 2: Backend remains NestJS + Fastify serving a mocked `/auth/login`
- **Rationale**: Existing backend boilerplate already wires Fastify adapters, logging, validation pipes, and Prisma; adding a mock login controller keeps parity with future real endpoints and allows Supertest/Vitest coverage without extra frameworks.
- **Alternatives considered**: 
  - Express microservice → diverges from platform stack and would add redundant infra.
  - Serverless route in Next.js → would undermine shared rate limiting + security middleware already enforced in Nest.

## Decision 3: Shared contracts live in `packages/contracts` using Zod
- **Rationale**: Zod works in both Node and browser contexts, generates TypeScript types, and aligns with Constitution II (single source of truth). We only need schemas for `AuthLoginRequest`, `AuthSessionPayload`, `DashboardSnapshot`, and `MenuItemState`, which map directly to the spec entities.
- **Alternatives considered**:
  - Rely on Nest DTOs only → frontend would re-declare shapes and risk `any`.
  - Adopt OpenAPI first → heavier setup for one endpoint; can be layered later when APIs expand.

## Decision 4: Testing toolbox = Vitest + React Testing Library + Supertest + Playwright
- **Rationale**: Vitest provides fast TS-native unit tests for hooks/services; RTL ensures components respect accessibility; Supertest validates Nest controllers + guards without full deployment; Playwright gives the constitution-required essential E2E (login → dashboard → logout) plus responsive snapshots.
- **Alternatives considered**:
  - Jest → slower, redundant since Vitest already recommended.
  - Cypress → heavier to containerize and less aligned with Next.js 16 support matrix than Playwright.

## Decision 5: Orchestration via Docker Compose + Makefile with Prisma/Postgres
- **Rationale**: Compose already defined in user instructions; pairing with Makefile commands ensures consistent developer onboarding (make dev/up/down/test). Prisma migrations plus seed script deliver the static dashboard dataset and login credentials for QA.
- **Alternatives considered**:
  - Nix/Dev Containers → unnecessary complexity at MVP stage.
  - Local Postgres installs per developer → harder to keep schema parity and violates “make dev” automation flow.

## Decision 6: Analytics & performance monitoring through shared telemetry util
- **Rationale**: Implementing events (`landing_cta_click`, `login_attempt`, etc.) via a single helper ensures consistent payloads and allows later wiring to whichever analytics sink is standard. Also simplifies instrumentation for success criteria tracking.
- **Alternatives considered**:
  - Hardcode `window.gtag` calls → brittle and blocks SSR builds.
  - Defer analytics entirely → conflicts with constitution section IV and would leave success metrics unmeasurable.

