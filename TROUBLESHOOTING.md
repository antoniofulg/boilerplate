# 🔧 Troubleshooting - Problemas Comuns

## Problema: `make dev` falha

### Erro: "Cannot find module" ou "Module not found"

**Solução:**
```bash
# Parar containers
make down

# Limpar volumes (se necessário)
docker-compose down -v

# Reconstruir do zero
make dev
```

### Erro: "npm ci" falha (package-lock.json não encontrado)

**Solução:**
Os Dockerfiles de desenvolvimento agora usam `npm install` que cria o lock file automaticamente.

### Erro: "Prisma Client not generated"

**Solução:**
```bash
# Gerar Prisma Client manualmente
make prisma.generate

# Ou dentro do container
docker-compose exec backend npm run prisma:generate
```

### Erro: Porta já em uso

**Solução:**
```bash
# Verificar o que está usando a porta
lsof -i :3000  # Frontend
lsof -i :3001  # Backend
lsof -i :5432  # PostgreSQL

# Matar processo
kill -9 <PID>

# Ou mudar portas no docker-compose.yml
```

### Erro: "Cannot connect to database"

**Solução:**
```bash
# Verificar se PostgreSQL está rodando
docker-compose ps postgres

# Ver logs do PostgreSQL
docker-compose logs postgres

# Reiniciar PostgreSQL
docker-compose restart postgres
```

### Erro: Build muito lento

**Solução:**
```bash
# Limpar cache do Docker
docker system prune -a

# Reconstruir sem cache
docker-compose build --no-cache
```

### Erro: "Workspace not found"

**Solução:**
```bash
# Instalar dependências localmente primeiro
npm install

# Depois rodar docker
make dev
```

## Problema: Backend não inicia

### Verificar logs
```bash
docker-compose logs backend
```

### Erro comum: Prisma Client
```bash
make prisma.generate
```

### Erro comum: Dependências faltando
```bash
docker-compose exec backend npm install
```

## Problema: Frontend não inicia

### Verificar logs
```bash
docker-compose logs frontend
```

### Erro comum: Porta 3000 ocupada
```bash
# Mudar porta no docker-compose.yml ou matar processo
lsof -i :3000
kill -9 <PID>
```

### Erro comum: Next.js build
```bash
# Limpar .next
docker-compose exec frontend rm -rf .next
docker-compose restart frontend
```

## Problema: Banco de dados

### Resetar banco completamente
```bash
make down
docker volume rm boilerplate_postgres_data
make dev
make prisma.migrate
make seed
```

### Conectar ao banco manualmente
```bash
docker-compose exec postgres psql -U smartvoto -d smartvoto
```

## Comandos Úteis de Debug

```bash
# Ver status de todos os containers
docker-compose ps

# Ver logs de um serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Entrar no container
docker-compose exec backend sh
docker-compose exec frontend sh

# Reconstruir um serviço específico
docker-compose build --no-cache backend
docker-compose up backend

# Limpar tudo e começar do zero
make down
docker-compose down -v
docker system prune -a
make dev
```

## Se Nada Funcionar

1. **Parar tudo:**
   ```bash
   make down
   docker-compose down -v
   ```

2. **Limpar Docker:**
   ```bash
   docker system prune -a
   ```

3. **Reinstalar dependências localmente:**
   ```bash
   npm install
   ```

4. **Recomeçar:**
   ```bash
   make dev
   ```

5. **Aguardar build completo** (pode levar 5-10 minutos na primeira vez)

6. **Executar migrações:**
   ```bash
   make prisma.migrate
   make seed
   ```


