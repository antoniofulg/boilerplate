# 🚀 Guia de Setup Passo a Passo

Este guia detalha cada passo para executar o projeto Smart Voting MVP pela primeira vez.

## Pré-requisitos

Certifique-se de ter instalado:

- ✅ **Docker** (versão 20.10+)
- ✅ **Docker Compose** (versão 2.0+)
- ✅ **Node.js** 18+ (opcional, para desenvolvimento local)
- ✅ **npm** 9+ (opcional, para desenvolvimento local)

### Verificar instalações

```bash
docker --version
docker-compose --version
node --version  # Opcional
npm --version   # Opcional
```

## Passo 1: Clonar e Navegar

```bash
cd /Users/antoniofulg/Projects/boilerplate
```

## Passo 2: Instalar Dependências (Primeira Vez)

```bash
npm install
```

Isso instalará dependências de todos os workspaces (backend, frontend, shared packages).

**Tempo estimado**: 2-5 minutos

## Passo 3: Iniciar Serviços com Docker

```bash
make dev
```

Ou diretamente:

```bash
docker-compose up --build
```

**O que acontece:**
1. 🐘 PostgreSQL inicia (porta 5432)
2. 🔧 Backend NestJS inicia (porta 3001)
3. ⚛️ Frontend Next.js inicia (porta 3000)

**Tempo estimado**: 2-3 minutos na primeira vez (build das imagens)

**Aguarde até ver:**
```
✅ Backend server running on http://0.0.0.0:3001
✅ Ready on http://localhost:3000
```

## Passo 4: Executar Migrações do Banco

**Em um novo terminal** (mantenha o `make dev` rodando):

```bash
make prisma.migrate
```

Ou:

```bash
docker-compose exec backend npm run prisma:migrate
```

**O que acontece:**
- Cria as tabelas `auth_users` e `dashboard_snapshots`
- Aplica o schema do Prisma

**Saída esperada:**
```
✅ Migration applied successfully
```

## Passo 5: Popular Banco com Dados Iniciais

```bash
make seed
```

Ou:

```bash
docker-compose exec backend npx ts-node infrastructure/prisma/seeds/index.ts
```

**O que acontece:**
- Cria usuário padrão: `mesa@camara.gov.br` / `senha123`
- Cria snapshot estático do dashboard

**Saída esperada:**
```
🌱 Seeding database...
✅ Seeding completed!
```

## Passo 6: Verificar se Tudo Está Funcionando

### 6.1 Verificar Containers

```bash
docker-compose ps
```

Deve mostrar 3 containers rodando:
- `smartvoto-postgres`
- `smartvoto-backend`
- `smartvoto-frontend`

### 6.2 Testar Backend

```bash
curl http://localhost:3001/health
```

Ou abra no navegador: http://localhost:3001

### 6.3 Testar Frontend

Abra no navegador: **http://localhost:3000**

Você deve ver a **Landing Page** com:
- Hero section
- Benefícios
- Como funciona
- Footer

## Passo 7: Testar o Fluxo Completo

### 7.1 Acessar Login

1. Clique no botão **"Entrar"** na landing page
2. Ou acesse diretamente: http://localhost:3000/login

### 7.2 Fazer Login

Use as credenciais de teste:
- **Email**: `mesa@camara.gov.br`
- **Senha**: `senha123`

### 7.3 Verificar Dashboard

Após login, você deve ver:
- ✅ Cabeçalho com nome do usuário
- ✅ Botão "Sair"
- ✅ Card "Sessão Atual"
- ✅ Card "Pauta em votação"
- ✅ Lista "Membros Presentes"
- ✅ Lista "Resultados Recentes"
- ✅ Menu lateral com itens desabilitados

### 7.4 Testar Logout

1. Clique no botão **"Sair"**
2. Deve redirecionar para `/login`
3. Tentar acessar `/dashboard` deve redirecionar para `/login`

## 🎉 Pronto!

O projeto está funcionando. Você pode:

- ✅ Explorar a landing page
- ✅ Fazer login
- ✅ Ver o dashboard estático
- ✅ Testar logout

## Comandos Úteis

### Ver Logs

```bash
make logs
# ou
docker-compose logs -f
```

### Parar Serviços

```bash
make down
# ou
docker-compose down
```

### Reiniciar do Zero

```bash
make down
docker-compose down -v  # Remove volumes (apaga banco)
make dev
make prisma.migrate
make seed
```

### Acessar Shell dos Containers

```bash
make backend.exec   # Shell do backend
make frontend.exec  # Shell do frontend
```

## 🐛 Problemas Comuns

### Erro: "Port 3000 already in use"

**Solução:**
```bash
# Encontrar processo usando a porta
lsof -i :3000
# Matar processo
kill -9 <PID>
# Ou mudar porta no docker-compose.yml
```

### Erro: "Cannot connect to database"

**Solução:**
```bash
# Verificar se PostgreSQL está rodando
docker-compose ps postgres
# Reiniciar
docker-compose restart postgres
```

### Erro: "Module not found '@shared/contracts'"

**Solução:**
```bash
# Reinstalar dependências
npm install
# Buildar shared packages
cd shared/packages/contracts && npm run build
```

### Erro: "Prisma Client not generated"

**Solução:**
```bash
make prisma.generate
# ou
docker-compose exec backend npm run prisma:generate
```

## 📚 Próximos Passos

1. **Explorar o código**: Navegue pelos arquivos em `apps/backend/src` e `apps/frontend/app`
2. **Rodar testes**: `make test`
3. **Ver documentação**: Leia `specs/001-voting-saas-ui/spec.md`
4. **Desenvolver**: Faça suas alterações e veja hot-reload funcionando

## 💡 Dicas

- Use `make logs` para ver logs em tempo real
- O frontend tem hot-reload automático
- O backend reinicia automaticamente ao salvar arquivos
- Use `docker-compose exec backend sh` para acessar o container

---

**Precisa de ajuda?** Verifique os logs com `make logs` ou consulte a documentação em `specs/`.

