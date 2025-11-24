# 🚀 Quick Start Guide - Smart Voting MVP

## Passo a Passo Completo

### 1️⃣ Instalar Dependências (Primeira Vez)

```bash
cd /Users/antoniofulg/Projects/boilerplate
npm install
```

**Tempo**: 2-5 minutos

### 2️⃣ Iniciar Serviços com Docker

```bash
make dev
```

Isso inicia:
- ✅ PostgreSQL (porta 5432)
- ✅ Backend NestJS (porta 3001)  
- ✅ Frontend Next.js (porta 3000)

**Aguarde até ver:**
```
✅ Backend server running on http://0.0.0.0:3001
✅ Ready on http://localhost:3000
```

**Tempo**: 2-3 minutos (primeira vez)

### 3️⃣ Executar Migrações do Banco

**Em um novo terminal** (mantenha `make dev` rodando):

```bash
make prisma.migrate
```

**Saída esperada:**
```
✅ Migration applied successfully
```

### 4️⃣ Popular Banco com Dados Iniciais

```bash
make seed
```

**Saída esperada:**
```
🌱 Seeding database...
✅ Seeding completed!
```

### 5️⃣ Acessar a Aplicação

**Frontend (Landing Page):**
👉 http://localhost:3000

**Backend API:**
👉 http://localhost:3001/health

**Login:**
👉 http://localhost:3000/login

### 6️⃣ Testar o Fluxo

1. **Landing Page**: http://localhost:3000
   - Veja Hero, Benefícios, Como Funciona
   - Clique em "Entrar"

2. **Login**: http://localhost:3000/login
   - Email: `mesa@camara.gov.br`
   - Senha: `senha123`
   - Clique em "Entrar"

3. **Dashboard**: Após login
   - Veja sessão atual, pauta, membros, resultados
   - Teste o menu lateral (itens desabilitados)
   - Clique em "Sair" para logout

## ✅ Verificação Rápida

```bash
# Ver containers rodando
docker-compose ps

# Ver logs
make logs

# Testar backend
curl http://localhost:3001/health
```

## 🐛 Problemas?

### Porta em uso
```bash
make down
# Ou mude portas no docker-compose.yml
```

### Erro de módulo
```bash
npm install
```

### Banco não conecta
```bash
docker-compose restart postgres
```

## 📋 Comandos Úteis

```bash
make dev          # Inicia tudo
make down         # Para tudo
make logs         # Ver logs
make prisma.migrate  # Migrações
make seed         # Dados iniciais
make test         # Testes
```

## 🎯 Credenciais de Teste

- **Email**: `mesa@camara.gov.br`
- **Senha**: `senha123`

---

**Pronto!** O projeto está rodando. 🎉

