# Storefront (Next.js)

Este directorio está reservado para la tienda de cara al cliente. Aún no se ha generado el proyecto porque Next.js y el starter de Medusa incluyen su propio generador — es mejor usarlo en vez de recrear los archivos a mano.

## Cómo scaffoldear (primera vez)

Desde la raíz del monorepo:

```bash
cd apps
npx create-next-app@latest storefront --typescript --tailwind --app --src-dir --import-alias "@/*"
```

Recomendado: partir del starter oficial de Medusa para Next.js, que ya trae la integración con la Store API:

```bash
npx create-medusa-app@latest --with-nextjs-starter
```

Ajustar luego:

- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` apuntando a `apps/backend` (ver `.env.example` en la raíz).
- Mover el proyecto generado dentro de `apps/storefront` si el comando lo crea en otra ruta.
- Agregar el `package.json` generado a los workspaces (ya cubierto por `pnpm-workspace.yaml`).

Ver `ARCHITECTURE.md` en la raíz del repo para las decisiones de stack detrás de esta app.
