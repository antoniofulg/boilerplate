<!--
Sync Impact Report
Version: N/A → 1.0.0
Modified Principles:
- Core slot 1 → I. Qualidade de Codigo (Code Quality)
- Core slot 2 → II. Tipagem entre Front e Back (Shared Types)
- Core slot 3 → III. Testes Minimos e Obrigatorios (Essential Tests)
- Core slot 4 → IV. UX e Consistencia (Design System Discipline)
- Core slot 5 → V. Performance e Confiabilidade (Perf & Reliability)
Added Sections:
- VI. Operacoes
- VII. Fluxo de Desenvolvimento
- VIII. Checklist de Feature Pronta
Removed Sections:
- None
Templates requiring updates:
- ✅ .specify/templates/plan-template.md
- ✅ .specify/templates/spec-template.md
- ✅ .specify/templates/tasks-template.md
Follow-up TODOs:
- None
-->
# Boilerplate Constitution

## Core Principles

### I. Qualidade de Codigo

**Non-negotiables**
- Favor straightforward implementations; reject speculative abstractions and premature layering.
- Keep one repository-wide folder structure; document any variance before coding.
- Enforce ESLint + Prettier locally and in CI for every JS/TS workspace.
- Record architectural decisions (ADR or scoped note) for impactful changes within one business day.
- Vet dependencies ruthlessly; add new packages only when they unlock clear product value.

**Rationale**
Lean, documented codebases stay maintainable, auditable, and onboarding-friendly.

### II. Tipagem entre Front e Back

**Non-negotiables**
- Maintain a single source of truth for contracts (Zod/OpenAPI/tRPC/ts-rest) in a shared package.
- API clients must import generated contracts; `any` or implicit response types are prohibited.
- Validate every input/output at service boundaries using the shared schema.
- Update and review the schema/types before starting feature implementation; CI fails if code references stale contracts.

**Rationale**
Shared, validated types eliminate drift between surfaces and stop runtime class bugs early.

### III. Testes minimos e obrigatorios

**Non-negotiables**
- Each feature ships with at least one automated “essential” test covering its core promise.
- Critical business logic requires unit coverage; APIs additionally need integration tests.
- E2E flows are limited to login → primary action → success for revenue-critical journeys.
- Teams execute and record a manual smoke test before every staging or production release.
- CI order is lint → essential tests → build; the pipeline must fail-fast on any violation.

**Rationale**
Focused, layered testing provides high confidence without wasting cycles on brittle suites.

### IV. UX e Consistencia

**Non-negotiables**
- Maintain a mini design system (button, input, modal, card, typography) and build UIs exclusively from it.
- Keep interactions predictable; error handling and microcopy stay consistent across flows.
- Provide immediate feedback for loading, success, empty, and error states with accessible messaging.
- Guarantee minimum responsiveness (mobile portrait + desktop) before hand-off.
- Instrument analytics for onboarding and the primary business flow using stable event names.

**Rationale**
A consistent, observable UX reduces user friction and shortens iteration loops.

### V. Performance e Confiabilidade

**Non-negotiables**
- Keep the initial bundle below ~250 KB gzipped; treat overruns as blocking regressions.
- Ensure API p95 latency stays under 300 ms with alerting on breaches.
- Apply code splitting and lazy loading to all non-critical routes and components.
- Ship front-end caching (React Query or equivalent) plus CDN-backed static assets by default.
- Monitor errors and latency continuously; releases require green dashboards.
- Follow the release path: deploy to staging → smoke test → production behind reversible feature flags.

**Rationale**
Aggressive budgets and guardrails keep the product fast, resilient, and safe to iterate.

## VI. Operacoes

- CI/CD must be automated, lightweight, and reproducible from local machines.
- Security minimums are non-negotiable: HTTPS everywhere, secure password hashing, input validation, and rate limiting.
- Emit structured logs and feed them into active monitoring/alerting for both backend and frontend.

## VII. Fluxo de Desenvolvimento

1. Atualizar tipos compartilhados com o escopo da feature.
2. Implementar o backend seguindo os contratos validados.
3. Implementar o frontend consumindo os mesmos tipos/geradores.
4. Criar o teste essencial (unitario ou de integracao) e garantir falha antes da implementacao.
5. Executar smoke test manual.
6. Fazer deploy em staging.
7. Fazer deploy em producao somente apos staging aprovado.
8. Monitorar erros, latencia e analytics do fluxo principal.

## VIII. Checklist de Feature Pronta

- Tipos compartilhados atualizados e versionados.
- Backend pronto e alinhado aos contratos.
- Frontend integrado e sem console errors.
- Teste essencial criado e executado em CI.
- Smoke test manual aprovado.
- Deploy realizado em staging e producao com log de auditoria.
- Monitoramento ativo (erros + latencia + analytics principais).

## Governance

- Esta constituicao prevalece sobre outras convenções do projeto; conflitos devem ser resolvidos referenciando estas regras.
- Emendas exigem PR com ADR ou justificativa objetiva, revisão dos responsaveis de plataforma e atualização sincronizada das templates.
- Versionamento segue SemVer: MAJOR para mudancas incompatíveis, MINOR para novos principios/secoes, PATCH para ajustes textuais.
- Auditorias trimestrais verificam conformidade (lint config, tipos compartilhados, testes essenciais, design system, monitoramento).
- Cada PR deve indicar explicitamente como passou pelo checklist da feature; merges sem checklist e smoke test documentado são bloqueados.

**Version**: 1.0.0 | **Ratified**: 2025-11-22 | **Last Amended**: 2025-11-22
