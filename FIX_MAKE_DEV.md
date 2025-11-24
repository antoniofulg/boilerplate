# 🔧 Correções Aplicadas para `make dev`

## O que foi corrigido:

1. ✅ **Dockerfiles de desenvolvimento criados** (`Dockerfile.dev`)
   - Versões simplificadas para desenvolvimento
   - Não requerem package-lock.json
   - Instalam dependências de forma mais tolerante

2. ✅ **docker-compose.yml atualizado**
   - Usa Dockerfiles de desenvolvimento
   - Removido `version` (obsoleto)
   - Comandos simplificados

3. ✅ **Prisma Client** gerado automaticamente no start

## Como testar agora:

### Opção 1: Limpar e reconstruir (recomendado)

```bash
# Parar tudo
make down

# Limpar containers e volumes
docker-compose down -v

# Reconstruir do zero
make dev
```

### Opção 2: Se ainda houver problemas

```bash
# Parar tudo
make down

# Limpar cache do Docker
docker system prune -f

# Reconstruir sem cache
docker-compose build --no-cache

# Iniciar
docker-compose up
```

### Opção 3: Desenvolvimento local (sem Docker)

Se o Docker continuar dando problemas, você pode rodar localmente:

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar PostgreSQL (ou usar Docker só para o banco)
docker-compose up postgres -d

# 3. Gerar Prisma Client
cd apps/backend
npm run prisma:generate

# 4. Executar migrações
npm run prisma:migrate

# 5. Popular banco
npm run prisma:seed

# 6. Iniciar backend (novo terminal)
cd apps/backend
npm run start:dev

# 7. Iniciar frontend (novo terminal)
cd apps/frontend
npm run dev
```

## Verificar se está funcionando:

```bash
# Ver containers rodando
docker-compose ps

# Ver logs
make logs

# Testar backend
curl http://localhost:3001/health

# Abrir frontend
open http://localhost:3000
```

## Erros comuns e soluções:

### "Cannot find module '@shared/contracts'"
```bash
# Reinstalar dependências
npm install
```

### "Prisma Client not generated"
```bash
make prisma.generate
```

### "Port already in use"
```bash
# Verificar portas
lsof -i :3000
lsof -i :3001
lsof -i :5432

# Matar processos ou mudar portas no docker-compose.yml
```

### Build muito lento
```bash
# Limpar cache
docker system prune -a
```

## Se nada funcionar:

1. Verifique se Docker está rodando: `docker ps`
2. Verifique logs: `docker-compose logs`
3. Tente desenvolvimento local (Opção 3 acima)
4. Consulte `TROUBLESHOOTING.md` para mais detalhes


