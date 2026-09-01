# Backend (Medusa.js)

Este directorio está reservado para el motor de comercio. Igual que el storefront, se genera con el CLI oficial en vez de escribirlo a mano.

## Cómo scaffoldear (primera vez)

Desde la raíz del monorepo:

```bash
cd apps
npx create-medusa-app@latest backend
```

Durante el setup:

- Configurar `DATABASE_URL` y `REDIS_URL` apuntando a los servicios de `docker-compose.yml` (ver `.env.example` en la raíz).
- Crear la región inicial: Perú, moneda PEN.
- Instalar el plugin/proveedor de pago de **Culqi** (ver `ARCHITECTURE.md` §4 para la justificación de por qué es la pasarela del MVP).

## Comandos útiles una vez scaffoldeado

```bash
pnpm --filter backend dev        # levantar Medusa en modo desarrollo
pnpm --filter backend migrations run
```

Ver `ARCHITECTURE.md` y `ROADMAP.md` en la raíz del repo para el contexto completo.
