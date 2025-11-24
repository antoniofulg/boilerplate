# Smart Voting SaaS MVP

Sistema de Votação Inteligente para Câmaras Municipais - MVP

## 🚀 Quick Start

### Pré-requisitos

- Docker & Docker Compose
- Node.js 18+ (para desenvolvimento local)
- npm 9+

### Passo a Passo para Executar

#### 1. Clone o repositório (se ainda não fez)

```bash
git clone <repository-url>
cd boilerplate
```

#### 2. Instale as dependências (primeira vez)

```bash
npm install
```

#### 3. Inicie os serviços com Docker Compose

```bash
make dev
```

Ou diretamente:

```bash
docker-compose up --build
```

Isso irá:
- Subir o PostgreSQL (porta 5432)
- Subir o backend NestJS (porta 3001)
- Subir o frontend Next.js (porta 3000)

#### 4. Execute as migrações do Prisma

Em outro terminal:

```bash
make prisma.migrate
```

Ou:

```bash
docker-compose exec backend npm run prisma:migrate
```

#### 5. Popule o banco de dados com dados iniciais

```bash
make seed
```

Ou:

```bash
docker-compose exec backend npx ts-node infrastructure/prisma/seeds/index.ts
```

#### 6. Acesse a aplicação

- **Frontend (Landing Page)**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Login**: http://localhost:3000/login

### Credenciais de Teste

- **Email**: `mesa@camara.gov.br`
- **Senha**: `senha123`

## 📋 Comandos Disponíveis

### Makefile

```bash
make dev          # Inicia todo o ambiente (Docker Compose)
make up           # Sobe containers em background
make down         # Para containers
make logs         # Mostra logs
make prisma.migrate  # Executa migrações
make seed         # Popula banco com dados iniciais
make test         # Executa todos os testes
make lint         # Executa ESLint
make format       # Formata código com Prettier
make backend.exec # Acessa shell do container backend
make frontend.exec # Acessa shell do container frontend
```

### NPM Scripts

```bash
# Root
npm install       # Instala dependências de todos os workspaces
npm run build     # Builda todos os projetos
npm run test      # Executa testes de todos os projetos

# Backend
npm run start:dev --workspace=@apps/backend
npm run test --workspace=@apps/backend

# Frontend
npm run dev --workspace=@apps/frontend
npm run build --workspace=@apps/frontend
npm run test --workspace=@apps/frontend
```

## 🏗️ Estrutura do Projeto

```
boilerplate/
├── apps/
│   ├── backend/          # NestJS + Fastify backend
│   └── frontend/          # Next.js 16 + React 19 frontend
├── shared/
│   └── packages/
│       ├── contracts/    # Zod schemas compartilhados
│       ├── config/        # Feature flags e configs
│       └── ui/            # Componentes de design system
├── infrastructure/
│   └── prisma/           # Schema e migrations do Prisma
├── tests/
│   └── e2e/              # Testes E2E com Playwright
└── specs/                # Documentação e especificações
```

## 🧪 Testes

### Executar todos os testes

```bash
make test
```

### Testes E2E (Playwright)

```bash
cd apps/frontend
npm run test:e2e
```

### Testes de API (Supertest)

```bash
cd apps/backend
npm test
```

## 🔧 Desenvolvimento Local (sem Docker)

### Backend

```bash
cd apps/backend
npm install
npm run prisma:generate
npm run start:dev
```

### Frontend

```bash
cd apps/frontend
npm install
npm run dev
```

### Banco de Dados

Certifique-se de ter PostgreSQL rodando localmente e configure `DATABASE_URL` no `.env` do backend.

## 📝 Variáveis de Ambiente

### Backend (`apps/backend/.env`)

```env
DATABASE_URL=postgresql://smartvoto:smartvoto123@localhost:5432/smartvoto
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
SESSION_SECRET=dev-secret-key-change-in-production
```

### Frontend (`apps/frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_FEATURE_FLAG_STATIC_DASHBOARD_MVP=true
```

## 🐛 Troubleshooting

### Erro: "Cannot find module '@shared/contracts'"

Execute:

```bash
npm install
npm run build --workspace=@shared/contracts
```

### Erro: "Prisma Client not generated"

Execute:

```bash
make prisma.generate
# ou
docker-compose exec backend npm run prisma:generate
```

### Erro: "Port already in use"

Pare os containers:

```bash
make down
```

Ou altere as portas no `docker-compose.yml`.

### Banco de dados não conecta

Verifique se o PostgreSQL está rodando:

```bash
docker-compose ps
```

## 📚 Documentação

- [Especificação](./specs/001-voting-saas-ui/spec.md)
- [Plano Técnico](./specs/001-voting-saas-ui/plan.md)
- [Quickstart](./specs/001-voting-saas-ui/quickstart.md)

## 🎯 Features Implementadas

- ✅ Landing Page (SSG)
- ✅ Login com autenticação
- ✅ Dashboard estática
- ✅ Logout funcional
- ✅ Menu lateral com itens desabilitados
- ✅ Testes E2E, API e Componentes
- ✅ Design System básico
- ✅ Analytics/Telemetry

## 📄 Licença

Private - Todos os direitos reservados

