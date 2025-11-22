# Tasks: Smart Voting MVP Surfaces

**Input**: Design documents from `/specs/001-voting-saas-ui/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Every feature MUST include at least one constitution-mandated essential test. Layer unit/integration coverage for critical logic and only add new E2E flows when they cover login → primary action → sucesso.

**Workflow**: Tasks should track the sequence Tipos → Backend → Frontend → Teste essencial → Smoke test → Deploy staging → Deploy producao → Monitoramento.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`
- **Shared packages**: `packages/`
- **Tests**: `tests/`

---

## Phase 0: Shared Types & Contracts (Blocking)

**Purpose**: Update the single source of truth (Zod/OpenAPI) before building code.

- [ ] T000 Bump `packages/contracts/package.json` version and add `AuthSessionPayload`, `DashboardSnapshot`, `MenuItemState` schemas in `packages/contracts/src/auth.ts` and `packages/contracts/src/dashboard.ts`
- [ ] T001 [P] Regenerate shared exports in `packages/contracts/src/index.ts` and update imports in `apps/backend/src/common/zod/contracts.ts` + `apps/frontend/lib/contracts.ts`
- [ ] T002 Add runtime validation hooks: Nest pipes in `apps/backend/src/auth/auth.controller.ts` and React form/schema guards in `apps/frontend/app/login/page.tsx`
- [ ] T003 Update API reference `specs/001-voting-saas-ui/contracts/openapi.yaml` to reflect final schema property names and examples

**Checkpoint**: Contracts published and consumed; feature work can reference the new version safely.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T010 Create frontend route scaffolding (`apps/frontend/app/(marketing)/page.tsx`, `apps/frontend/app/login/page.tsx`, `apps/frontend/app/dashboard/page.tsx`)
- [ ] T011 Initialize backend feature modules (`apps/backend/src/auth/auth.module.ts`, `apps/backend/src/dashboard/dashboard.module.ts`) and wire to `app.module.ts`
- [ ] T012 [P] Extend shared lint/format configs (`shared/config/eslint/.eslintrc.cjs`, `shared/config/prettier/.prettierrc`) to cover new apps and ensure Makefile hooks run
- [ ] T013 [P] Seed/extend shadcn + Tailwind tokens in `shared/packages/ui/tokens.css` and export DS components (Button, Input, Card, Modal, Typography)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T020 Define Prisma models + migrations for `AuthUser` and `DashboardSnapshot` in `infrastructure/prisma/schema.prisma` and run `make prisma.migrate`
- [ ] T021 [P] Implement seeded data (`infrastructure/prisma/seeds/staticDashboard.ts`) for default user + session snapshot
- [ ] T022 [P] Configure Fastify routes + global validation pipes/rate limiter in `apps/backend/src/main.ts`
- [ ] T023 Create shared Prisma service + repositories (`apps/backend/src/common/prisma/prisma.service.ts`) consumed by auth/dashboard modules
- [ ] T024 Configure structured logging + analytics dispatcher in `apps/backend/src/common/logging/logger.service.ts` and `apps/frontend/lib/telemetry/events.ts`
- [ ] T025 Setup environment handling + secrets loading in `apps/backend/src/config/config.module.ts` and `.env` templates for frontend/backend
- [ ] T026 Add security baseline: HTTPS-only cookies, helmet/HSTS middleware in `apps/backend/src/main.ts`, and CSRF-safe fetch wrapper in `apps/frontend/lib/http/client.ts`
- [ ] T027 [P] Configure shared feature flag registry in `packages/config/featureFlags.ts`, surface env toggles, and inject into `apps/backend/src/main.ts` + `apps/frontend/lib/featureFlag.ts`
- [ ] T028 Add Fastify request timing middleware + metrics emitter in `apps/backend/src/common/observability/perf.interceptor.ts` logging `/auth/login` durations for p95 tracking

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Autenticar e acessar dashboard (Priority: P1) 🎯 MVP

**Goal**: Permitir login institucional, armazenar sessão e exibir dashboard estática.

**Independent Test**: Playwright scenario `tests/e2e/login-dashboard-logout.spec.ts` cobrindo login válido/ inválido, renderização do snapshot e logout.

### Tests for User Story 1 (Essential first)

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T100 [US1] Essential Playwright test `tests/e2e/login-dashboard-logout.spec.ts` cobrindo sucesso, erro e logout
- [ ] T101 [P] [US1] Supertest + Vitest spec `apps/backend/tests/auth/login.spec.ts` validando `/auth/login` e `GET /dashboard/snapshot`
- [ ] T102 [P] [US1] RTL + Vitest test `apps/frontend/tests/login/LoginForm.spec.tsx` garantindo validações e mensagens de erro acessíveis
- [ ] T103 [US1] Playwright toggle test `tests/e2e/feature-flag-dashboard.spec.ts` garantindo que `flag.staticDashboardMvp` ativa/desativa a dashboard e apresenta mensagem “Em breve”
- [ ] T104 [P] [US1] RTL spec `apps/frontend/tests/dashboard/NoVotingActions.spec.tsx` falhando se qualquer botão de votação/gestão for renderizado

### Implementation for User Story 1

- [ ] T110 [P] [US1] Implementar controller/serviço `/auth/login` em `apps/backend/src/auth/auth.controller.ts` + `auth.service.ts` (hash check, sessão mock, rate limit)
- [ ] T111 [P] [US1] Expor `GET /dashboard/snapshot` em `apps/backend/src/dashboard/dashboard.controller.ts` retornando dados estáticos
- [ ] T112 [US1] Criar middleware de sessão e utilitários em `apps/frontend/lib/auth/session.ts` + `apps/frontend/middleware.ts` para proteger `/dashboard`
- [ ] T113 [US1] Construir tela de login em `apps/frontend/app/login/page.tsx` usando shadcn components, validações Zod e feedback de loading/erro
- [ ] T114 [US1] Implementar dashboard estática com cabeçalho, cartões e listas em `apps/frontend/app/dashboard/page.tsx` consumindo React Query + snapshot
- [ ] T115 [US1] Instrumentar analytics `login_attempt`, `login_success`, `login_failure` em `apps/frontend/lib/telemetry/events.ts` e disparar no login/dashboard
- [ ] T116 [US1] Exibir mensagem “Esqueci a senha” (informativa) via modal/toast em `apps/frontend/app/login/_components/ForgotPasswordNotice.tsx`
- [ ] T117 [US1] Gatear `/dashboard` no frontend via `apps/frontend/lib/featureFlag.ts` + fallback `app/dashboard/coming-soon.tsx`, lendo `flag.staticDashboardMvp`
- [ ] T118 [US1] Configurar React Query caching para `DashboardSnapshot` (staleTime, retry) em `apps/frontend/lib/query/dashboardSnapshot.ts`

**Checkpoint**: User Story 1 funcional e testável independentemente.

---

## Phase 4: User Story 2 - Explorar landing page e ir ao login (Priority: P2)

**Goal**: Landing responsiva com CTA sempre visível direcionando ao login.

**Independent Test**: RTL/Playwright teste garantindo CTA fixo, conteúdo completo e navegação correta.

### Tests for User Story 2 (Maintain coverage)

- [ ] T200 [US2] RTL test `apps/frontend/tests/landing/LandingPage.spec.tsx` validando seções Hero/Benefícios/Como funciona e CTA fixo
- [ ] T201 [P] [US2] Playwright viewport regression `tests/e2e/landing-responsive.spec.ts` cobrindo mobile ≤360 px e desktop

### Implementation for User Story 2

- [ ] T210 [P] [US2] Implementar Hero + CTA em `apps/frontend/app/(marketing)/_components/HeroSection.tsx` com copy institucional
- [ ] T211 [P] [US2] Criar componentes `BenefitsSection` e `HowItWorksSection` em `apps/frontend/app/(marketing)/_components/`
- [ ] T212 [US2] Adicionar CTA sticky/floating que rotea para `/login` em `apps/frontend/app/(marketing)/page.tsx`
- [ ] T213 [US2] Implementar rodapé institucional em `apps/frontend/app/(marketing)/_components/Footer.tsx`
- [ ] T214 [US2] Instrumentar evento `landing_cta_click` e `landing_section_view` em `apps/frontend/lib/telemetry/events.ts`
- [ ] T215 [P] [US2] Configurar code splitting/lazy loading (dynamic imports + `loading=\"lazy\"` imagens hero) em `apps/frontend/app/(marketing)/page.tsx` e validar com `pnpm next:analyze`

**Checkpoint**: Landing pronta e testável independentemente.

---

## Phase 5: User Story 3 - Encerrar sessão e destacar menu futuro (Priority: P3)

**Goal**: Logout funcional que limpa sessão e menu lateral comunicando módulos futuros desabilitados.

**Independent Test**: Playwright teste garantindo clique em “Sair” limpa sessão e itens desabilitados não mudam conteúdo.

### Tests for User Story 3 (Optional only if story approved)

- [ ] T300 [US3] Playwright spec `tests/e2e/logout-menu-disabled.spec.ts` verificando logout + resistência a clique em itens desabilitados
- [ ] T301 [P] [US3] RTL test `apps/frontend/tests/dashboard/SidebarNav.spec.tsx` garantindo `aria-disabled` + feedback

### Implementation for User Story 3

- [ ] T310 [P] [US3] Implementar botão “Sair” em `apps/frontend/app/dashboard/_components/HeaderActions.tsx` chamando `session.clear()` e roteando para `/login`
- [ ] T311 [US3] Criar `SidebarNav` com itens desabilitados e tooltip explicativa em `apps/frontend/components/layout/SidebarNav.tsx`
- [ ] T312 [US3] Adicionar guarda backend para `/dashboard/snapshot` que invalida sessão expirada em `apps/backend/src/dashboard/dashboard.guard.ts`
- [ ] T313 [US3] Emitir evento `logout_click` + log estruturado em `apps/frontend/lib/telemetry/events.ts` e `apps/backend/src/common/logging/logger.service.ts`

**Checkpoint**: Todos os fluxos autenticados cobertos e independentes.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements que afetam múltiplos user stories

- [ ] T400 [P] Documentação final em `docs/adr/0001-static-dashboard.md` e `specs/001-voting-saas-ui/quickstart.md` (atualizar passos executados)
- [ ] T401 Código/estilo cleanup após QA em `apps/frontend` e `apps/backend`
- [ ] T402 Ajustes de performance: rodar `next-bundle-analyzer` e otimizar imagens hero (`apps/frontend/public/hero/*.svg`)
- [ ] T403 [P] Segurança/observabilidade extra: configurar Sentry/Datadog no `apps/frontend/lib/telemetry/` e `apps/backend/src/common/observability/`
- [ ] T404 Rodar `quickstart.md` validation checklist e anexar resultados ao PR
- [ ] T405 Executar teste de carga leve (`scripts/perf/login-p95.k6.ts` ou autocannon) para `/auth/login`, registrar p95 <300 ms e anexar relatório em `docs/adr/0001-static-dashboard.md`
- [ ] T406 [P] Configurar cache/CDN headers: ajustar `next.config.js` e `apps/backend/src/auth/auth.controller.ts` para servir landing assets com `Cache-Control` adequado e respostas de login com `no-store`, validando via `curl -I`

---

## Release Checklist & Monitoring (Constitution)

- [ ] R001 Shared types/contracts atualizados, publicados e referenciados por backend + frontend
- [ ] R002 Backend deployado com validação de schema + baseline de segurança habilitada
- [ ] R003 Frontend integrado com design system e sem erros no console
- [ ] R004 Teste essencial automatizado registrado no CI (lint → test → build)
- [ ] R005 Smoke test manual executado com link para checklist
- [ ] R006 Deploy staging → smoke → produção com feature flag/rollback documentado
- [ ] R007 Monitoramento pós-deploy ativo (erros, latência, analytics onboarding + fluxo principal)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational completion; they can proceed in parallel or by priority (P1 → P2 → P3)
- **Polish**: Depends on all targeted stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Phase 2; no dependency on other stories
- **User Story 2 (P2)**: Starts after Phase 2; independent but reuses telemetry utilities
- **User Story 3 (P3)**: Starts after Phase 2; depends on US1 session utilities

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Models/seeds before services
- Services before endpoints/hooks
- Frontend data fetching before UI wiring
- Story complete and independently testable before moving on

### Parallel Opportunities

- All `[P]` tasks within Setup/Foundation can run concurrently (different files)
- While US1 backend tasks (T110/T111) run, frontend tasks (T113/T114) can progress once contracts are stable
- US2 layout components (T210/T211) can be built in parallel
- US3 logout button (T310) and sidebar nav (T311) target separate files and can proceed simultaneously once session util exists

---

## Parallel Example: User Story 1

```bash
# Tests first
pnpm --filter e2e test --login-suite        # T100
pnpm --filter backend test login.spec.ts    # T101
pnpm --filter frontend test LoginForm.spec  # T102

# Implementation split
apps/backend/src/auth/{auth.controller,auth.service}.ts   # T110
apps/backend/src/dashboard/dashboard.controller.ts       # T111
apps/frontend/lib/auth/session.ts & middleware.ts        # T112
apps/frontend/app/login/page.tsx + components            # T113/T116
apps/frontend/app/dashboard/page.tsx + cards             # T114
apps/frontend/lib/telemetry/events.ts                    # T115
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 + Phase 2
2. Deliver US1 end-to-end (login → dashboard → logout)
3. Run essential tests + smoke

### Incremental Delivery

1. Setup + Foundational
2. US1 → deploy/demo
3. US2 → deploy/demo (landing ready for marketing)
4. US3 → deploy/demo (logout/menu states)

### Parallel Team Strategy

1. Shared types + infra together
2. Developer A: Backend auth/snapshot (US1)
3. Developer B: Frontend login/dashboard (US1)
4. Developer C: Landing (US2) while US1 wraps tests
5. Developer D: Logout/menu (US3) once session utils exist

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label mapeia tarefa para user story específica
- Cada user story deve ser concluída e testada de forma independente
- Verifique que os testes falham antes da implementação
- Commit após cada tarefa ou grupo lógico
- Pare em cada checkpoint para validar incrementos independentes
