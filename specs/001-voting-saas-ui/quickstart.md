# Quickstart – Smart Voting MVP Surfaces

## 1. Prerequisitos
- Node.js 20.x + pnpm 9.x
- Docker + Docker Compose
- Make (GNU) instalado
- Variáveis `.env` copiadas de `.env.example` nas pastas `apps/frontend`, `apps/backend`, `shared/packages/contracts`

## 2. Subindo ambiente
```bash
make dev            # sobe frontend (Next 16), backend (Nest Fastify), Postgres, Prisma Studio watch
```
- Para rodar sem hot reload: `make up`
- Para parar: `make down`
- Logs combinados: `make logs`

## 3. Scripts úteis
- `make prisma.migrate` – aplica migrations e garante schema alinhado ao pacote de contratos.
- `make seed` – popula usuário padrão (`mesa@camara.gov.br` / `senha123`) e snapshot da dashboard.
- `make theme` – regenera tokens globais do Tailwind v4 + shadcn/ui.
- `make frontend.exec` / `make backend.exec` – shell interativo dentro dos containers.

## 4. Fluxo de desenvolvimento (Constituição)
1. Atualizar `packages/contracts` (Zod) e rodar `pnpm --filter contracts build`.
2. Backend (`apps/backend`) implementa mock `/auth/login` + guard `/dashboard/snapshot`.
3. Frontend (`apps/frontend`) consome contratos para landing/login/dashboard.
4. Criar teste essencial (Playwright `login-dashboard-logout.spec.ts`) + Vitest/RTL/ Supertest suites.
5. Executar `make test` (lint → unit → integration → e2e headless).
6. Rodar smoke manual: landing CTA, login sucesso, erro de login, menu desabilitado, logout.
7. Deploy staging (`make deploy.staging` se disponível) → smoke → produção.
8. Monitorar analytics (`landing_cta_click`, `login_success`, `logout_click`) e erros (Sentry/logs).

## 5. Verificando o MVP
- Landing: http://localhost:3000/ (hero, benefícios, como funciona, rodapé, CTA fixo).
- Login: http://localhost:3000/login (usar credenciais seed).
- Dashboard: http://localhost:3000/dashboard (após login; menu lateral com itens desabilitados, cartões estáticos, botão “Sair”).
- Logout: clicar “Sair” → sessão limpa → redireciona para login.

## 6. Testes
```bash
make test                # lint → vitest (unit+RTL) → supertest → playwright smoke
pnpm --filter frontend test:watch   # desenvolvimento UI
pnpm --filter backend test:watch    # services/guards
pnpm --filter e2e test              # executar somente Playwright
```

## 7. Troubleshooting
- Certifique-se de que portas 3000 (frontend) e 3333 (backend) estejam livres.
- Se migrations falharem, execute `docker volume rm voting_saas_db` e rode `make prisma.migrate`.
- Use `make backend.exec` e `pnpm prisma studio` para inspecionar snapshot estático.

