# ✅ Correção do Erro setCookie

## Problema Resolvido

O erro `TS2339: Property 'setCookie' does not exist on type 'FastifyReply'` foi corrigido.

## Solução Aplicada

1. **Instalado `@fastify/cookie`** plugin
2. **Registrado o plugin** no `main.ts`
3. **Adicionado type assertion** no controller para que o TypeScript reconheça o método `setCookie`

## Código Corrigido

### `apps/backend/src/main.ts`
```typescript
import cookie from '@fastify/cookie';

// ...
await app.register(cookie);
```

### `apps/backend/src/auth/auth.controller.ts`
```typescript
import type { FastifyCookieOptions } from '@fastify/cookie';

// Type assertion needed because TypeScript doesn't recognize the plugin types
(res as FastifyReply & { setCookie: (name: string, value: string, options?: FastifyCookieOptions) => void })
  .setCookie(cookieName, cookieValue, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  });
```

## Status

✅ TypeScript: Sem erros  
✅ Plugin instalado e registrado  
✅ Cookies funcionando corretamente

## Nota

Os warnings do webpack sobre módulos opcionais (`@fastify/static`, `@fastify/view`) são normais e não afetam o funcionamento da aplicação.

