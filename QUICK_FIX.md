# ⚡ Correção Rápida - make dev

## Problemas corrigidos:

1. ✅ Criados `Dockerfile.dev` simplificados para desenvolvimento
2. ✅ Removido `version` obsoleto do docker-compose.yml
3. ✅ Comandos ajustados para funcionar sem package-lock.json
4. ✅ Prisma Client gerado automaticamente

## Execute agora:

```bash
# 1. Parar tudo que está rodando
make down
docker-compose down -v

# 2. Limpar cache (opcional, mas recomendado)
docker system prune -f

# 3. Reconstruir e iniciar
make dev
```

## Aguarde:

- **Primeira vez**: 5-10 minutos (build das imagens)
- **Próximas vezes**: 1-2 minutos

## Quando ver estas mensagens, está pronto:

```
✅ Backend server running on http://0.0.0.0:3001
✅ Ready on http://localhost:3000
```

## Depois execute:

```bash
# Em outro terminal
make prisma.migrate
make seed
```

## Acesse:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001/health

## Se ainda der erro:

1. **Ver logs**: `make logs` ou `docker-compose logs`
2. **Ver status**: `docker-compose ps`
3. **Tentar desenvolvimento local**: Veja `FIX_MAKE_DEV.md` opção 3


