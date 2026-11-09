# Underground Moto Ecommerce

Plataforma de e-commerce para ropa enfocada en la cultura underground y motera. Lanzamiento inicial en Perú, con arquitectura preparada desde el día uno para escalar a mercados internacionales.

## Documentos de referencia

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — stack técnico, diagrama de arquitectura, justificación de cada decisión.
- [`ROADMAP.md`](./ROADMAP.md) — fases del proyecto y backlog priorizado.
- [`docs/decisions/`](./docs/decisions/) — Architecture Decision Records (ADRs), un archivo por cada decisión técnica relevante.

## Estructura del monorepo

```
underground-moto-ecommerce/
├── apps/
│   ├── storefront/     # Next.js — tienda de cara al cliente
│   └── backend/        # Medusa.js — motor de comercio, admin, API
├── packages/
│   ├── ui/              # Design system / componentes compartidos
│   └── config/          # Configuración compartida (eslint, tsconfig, tailwind)
├── docs/
│   └── decisions/       # ADRs
├── docker-compose.yml   # Postgres + Redis para desarrollo local
└── .env.example
```

Monorepo gestionado con **pnpm workspaces** + **Turborepo**.

## Quickstart (desarrollo local)

```bash
# 1. Instalar dependencias
pnpm install

# 2. Levantar Postgres y Redis localmente
docker compose up -d

# 3. Copiar variables de entorno
cp .env.example .env

# 4. Scaffoldear las apps (primera vez, ver apps/storefront/README.md
#    y apps/backend/README.md para los comandos exactos)

# 5. Correr todo en modo desarrollo
pnpm dev
```

## Estado del proyecto

Fase actual: **Fase 1 — MVP Perú**. Ver [`ROADMAP.md`](./ROADMAP.md) para el detalle.
