# Feature Specification: Smart Voting MVP Surfaces

**Feature Branch**: `001-voting-saas-ui`  
**Created**: 2025-11-22  
**Status**: Draft  
**Input**: User description: "Construa a Landing Page, Tela de Login (sem registro) e Dashboard estática de um SaaS de Votação Inteligente para Câmara de Vereadores. O MVP deve ser uma versão mínima: exibição fixa na dashboard, sem funcionalidades de votação; itens futuros no menu aparecem desabilitados. O fluxo de login e logout deve ser testável de ponta a ponta."

## Clarifications

### Session 2025-11-22

- Q: Session storage mechanism for Next.js server-side focus → A: HTTP-only secure cookies (server-readable, XSS-safe, enables Server Components)
- Q: Dashboard data fetching strategy for performance → A: Server Components with direct fetch (no client JS, better performance, aligns with Next.js 16)
- Q: Landing page rendering strategy for performance → A: Static Site Generation (SSG) - pre-rendered at build time for optimal performance

## User Scenarios & Testing _(mandatory)_

_Identify which story delivers the constitution-required essential automated test._

### User Story 1 - Autenticar e acessar dashboard (Priority: P1) — **Essential Test**

Como assessor credenciado da Câmara, quero entrar com e-mail institucional e senha para acessar a dashboard estática e confirmar se estou na sessão correta.

**Why this priority**: Sem autenticação não há acesso a informações sensíveis; o valor do SaaS depende de validar que o login funciona.

**Independent Test**: Automatizar fluxo POST `/auth/login` → redirecionamento → renderização da dashboard estática com dados mockados. Teste de integração cobre êxito e falha de credenciais.

**Acceptance Scenarios**:

1. **Given** formulário válido e mock respondendo usuário padrão, **When** envio “Entrar”, **Then** sessão mock é armazenada e dashboard estática é exibida.
2. **Given** credenciais inválidas, **When** envio “Entrar”, **Then** recebo mensagem de erro acessível sem sair da tela.

---

### User Story 2 - Explorar landing page e ir ao login (Priority: P2)

Como servidor curioso, quero navegar pela landing page responsiva para entender benefícios e clicar em “Entrar” sempre visível.

**Why this priority**: Landing gera demanda e explica o SaaS antes da autenticação; sem ela não há funil.

**Independent Test**: Teste funcional percorre hero + seções, verifica CTA fixo, âncoras e responsividade mínima (mobile/desktop) sem depender da dashboard.

**Acceptance Scenarios**:

1. **Given** viewport desktop ou mobile, **When** rolo a landing, **Then** CTA “Entrar” permanece acessível e leva ao login.
2. **Given** seções Hero, Benefícios, Como funciona e rodapé, **When** usuário inspeciona conteúdo, **Then** textos e ícones previstos são exibidos sem placeholders.

---

### User Story 3 - Encerrar sessão e destacar menu futuro (Priority: P3)

Como usuário autenticado, quero clicar em “Sair” para limpar sessão e voltar ao login, percebendo que itens futuros estão desabilitados.

**Why this priority**: Garante ciclo completo de segurança e comunica roadmap sem gerar frustração.

**Independent Test**: Teste UI/integração aciona “Sair” e confirma remoção de sessão, redirecionamento ao login e menu lateral com itens desabilitados/sem navegação.

**Acceptance Scenarios**:

1. **Given** usuário autenticado, **When** clica em “Sair”, **Then** sessão mock é removida e tela de login aparece.
2. **Given** menu lateral, **When** usuário tenta clicar em “Sessões/Pautas/Relatórios/Configurações”, **Then** itens mostram estado desabilitado e não alteram conteúdo.

---

### Edge Cases

- Formulário de login submetido com campos vazios exibe validações de campo sem chamar API.
- Falha de rede ou atraso no mock `/auth/login` mostra estado de carregamento e erro genérico, permitindo nova tentativa.
- Exibição da landing e dashboard em telas ≤360 px mantém CTA/tipografia legível e evita overflow horizontal.
- Usuário acessa `/dashboard` sem sessão → redirecionamento imediato ao login.
- Navegação por teclado destaca itens desabilitados sem permitir ativação, garantindo clareza para leitores de tela.

## Shared Types & Validation _(mandatory)_

- **Schema Source of Truth**: `packages/contracts/src/auth.ts` (Zod) contendo `AuthLoginRequest`, `AuthSessionPayload`, `DisabledMenuItem`, `DashboardSnapshot`.
- **Coverage**: Login request/response mock, estrutura do snapshot da dashboard (`currentSession`, `agendaItem`, `memberPresence`, `recentResults`). Não há outros endpoints neste MVP.
- **Validation Plan**: Backend mock do `/auth/login` valida request e response com Zod antes de devolver o usuário fixo; frontend reutiliza os mesmos esquemas para validar formulário, hidratar dados estáticos e bloquear `any`.
- **Type Consumers**:
  - Frontend app (landing/login/dashboard) importa `AuthSessionPayload`, `DashboardSnapshot`.
  - Backend mock handler importa `AuthLoginRequest`.
  - Essential test importa contratos para montar fixtures consistentes.
- **Rollout**: Publicar versão 0.1.0 do pacote `contracts` antes da implementação; CI adiciona verificação `pnpm typecheck` e falha se o pacote estiver desatualizado ou se `tsc` detectar `any` implícito.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: Landing page responsiva deve apresentar Hero, três benefícios, seção “Como funciona” em 3 passos e rodapé institucional.
- **FR-002**: CTA “Entrar” deve permanecer visível em toda a landing (sticky/floating) e direcionar para a rota de login.
- **FR-003**: Tela de login deve aceitar e-mail institucional e senha, validar campos obrigatórios e chamar mock `POST /auth/login`.
- **FR-004**: Mock `/auth/login` deve retornar sempre o mesmo usuário autorizado em caso de credenciais válidas e erro descritivo quando inválidas.
- **FR-005**: Sucesso no login redireciona para dashboard estática com cabeçalho contendo nome do usuário e botão “Sair”.
- **FR-006**: Dashboard deve conter cartões estáticos: “Sessão Atual”, “Pauta em votação”, lista “Membros Presentes” e “Resultados Recentes” com textos predefinidos.
- **FR-007**: Menu lateral deve mostrar “Dashboard” ativo e demais itens (“Sessões”, “Pautas”, “Relatórios”, “Configurações”) desabilitados visual e funcionalmente.
- **FR-008**: Botão "Sair" deve limpar sessão armazenada em HTTP-only secure cookies e retornar o usuário ao login.
- **FR-009**: Fluxo de logout deve utilizar cookies HTTP-only seguros para sessão, permitindo validação server-side e impedindo acesso direto à rota `/dashboard`.
- **FR-010**: “Esqueci a senha” precisa exibir mensagem informando disponibilidade futura sem abrir fluxo real.
- **FR-011**: Nenhuma ação de votação, gestão ou criação de pautas pode estar interativa neste MVP.

### Key Entities _(include if feature involves data)_

- **AuthLoginRequest**: `{ emailInstitucional, senha }` usados no mock `/auth/login`; ambos obrigatórios.
- **AuthSessionPayload**: `{ userName, role, chamber }` retornado pelo mock e armazenado na sessão após login.
- **DashboardSnapshot**: `{ currentSession, agendaItem, memberPresence[], recentResults[] }` descrevendo dados exibidos na tela estática.
- **MenuItemState**: `{ label, route, isActive, isDisabled }` usado para renderizar menu lateral e comunicar roadmap.

### Assumptions & Dependencies

- Credenciais válidas padronizadas (ex.: `mesa@camara.gov.br` / `senha123`) serão documentadas para QA e demonstrações.
- Link "Esqueci a senha" abre modal/toast explicando indisponibilidade atual e canal de suporte temporário (sem fluxo adicional).
- Hospedagem reutiliza infraestrutura existente; não há dependência de sistemas externos além do mock localizado.
- Sessão utiliza HTTP-only secure cookies para compatibilidade com Next.js Server Components e validação server-side.
- Foco em performance: lógica de componentes mantida no server-side sempre que possível; preferir `type` ao invés de `interface` em TypeScript.

## UX, Design System & Analytics _(mandatory)_

- **Design System Elements**: Usar componentes Button, Input, Card, Modal/Toast, Typography e Layout Shell; landing e dashboard compartilham tokens de cor institucionais.
- **Interaction Consistency**: Estados de loading/erro replicam padrões do DS; itens desabilitados seguem token `isDisabled` com contraste adequado.
- **Responsiveness Plan**: Grid fluido; landing reorganiza cards em coluna ≤768 px; dashboard reduz menu para ícone mantendo CTA “Sair” acessível.
- **Feedback & Accessibility**: Labels ligados a inputs, mensagens de erro com `aria-live`, foco visível em CTA/menu, contraste AA em textos e ícones, navegação completa por teclado.
- **Analytics Events**: `landing_cta_click`, `login_attempt`, `login_success`, `login_failure`, `logout_click`. Payload mínimo: `{ userType, viewport, section, timestamp }`.

## Performance & Reliability Targets _(mandatory)_

- **Bundle Budget**: Compartilhar componentes para manter bundle inicial <250 KB gzipped; imagens hero otimizadas (SVG).
- **API Latency Goal**: Mock `/auth/login` responde <50 ms localmente garantindo p95 <300 ms em produção; timeout de 5 s com mensagem amigável.
- **Code Splitting / Lazy Loading**: Landing page gerada estaticamente (SSG) no build; módulo autenticado (dashboard) lazy-loaded após login; assets secundários com `loading="lazy"`.
- **Data Fetching Strategy**: Dashboard utiliza Server Components com fetch direto (sem JavaScript no cliente para dados, melhor performance); dados estáticos do snapshot carregados server-side.
- **Caching & CDN**: Landing page (SSG) e assets estáticos servidos via CDN existente; respostas de login marcadas como `no-store`; dashboard snapshot pode usar cache server-side (Next.js cache).
- **Monitoring**: Integrar com monitoramento atual (ex.: Sentry/Datadog) para erros JS, tempo de carregamento e eventos analytics críticos.
- **Feature Flags**: `flag.staticDashboardMvp` ativa dashboard; fallback redireciona usuários autenticados para mensagem “Em breve”.

## Operational & Release Considerations _(mandatory)_

- **CI/CD**: Pipeline executa `lint → essential-test (login/logout integração) → build`; merge exige checklist anexado.
- **Security Baseline**: Forçar HTTPS, armazenar senha de forma segura na mock store, aplicar rate limit mínimo e mascarar campos sensíveis em logs.
- **Manual Smoke Test**: Checklist inclui: carregar landing, clicar CTA, login sucesso, erro de login, verificar se menu desabilitado não navega, efetuar logout.
- **Deploy Plan**: Publicar em staging, executar smoke test e analytics sanity check, depois promover para produção em janela acordada com stakeholders.
- **Post-Deploy Monitoring**: Acompanhar `landing_cta_click`, `login_success`, erros JS e latência do mock; rollback se erro >2% ou se CTA conversão <30% nas primeiras 24h.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 90% dos visitantes conseguem visualizar todas as seções da landing sem glitches em desktop e mobile (via monitoramento de sessão/analytics).
- **SC-002**: Fluxo login → dashboard → logout completo em menos de 30 segundos para 95% dos testes registrados.
- **SC-003**: Mensagem de erro de credencial inválida aparece em <1 s em 95% das tentativas de login mal sucedidas.
- **SC-004**: Pelo menos 60% dos visitantes que clicam no CTA “Entrar” concluem o formulário de login (mesmo em mock), demonstrando engajamento com o MVP.
