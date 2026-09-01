# ADR 0001: Elección de stack técnico

- **Estado:** Aceptado
- **Fecha:** 2026-09-01

## Contexto

Se necesita elegir un stack de e-commerce para una marca de ropa underground/motera, operado por un solo developer, con lanzamiento en Perú y expansión internacional planificada desde el diseño.

## Decisión

- Frontend: Next.js.
- Motor de comercio: Medusa.js (self-hosted, open source).
- Base de datos: PostgreSQL gestionado (Neon/Supabase).
- Cache/event bus: Redis (Upstash).
- Pagos: Culqi para el MVP en Perú; Yape como fast-follow; Stripe para expansión internacional.
- Hosting: Vercel (storefront) + Railway (backend) en el MVP, con ruta de migración a AWS/GCP para escalar.

## Alternativas descartadas

- **Shopify (no headless):** limita el control sobre el diseño de la tienda, algo crítico para una marca con identidad visual fuerte. Además, Shopify Payments no opera en Perú, por lo que igual requeriría integrar una pasarela local — se pierde la principal ventaja de Shopify sin ganar nada a cambio.
- **Vendure:** alternativa headless open source válida, pero con ecosistema/comunidad más pequeño que Medusa al momento de esta decisión.
- **Niubiz/Izipay como pasarela principal del MVP:** integración técnica más lenta y afiliación más demorada que Culqi; se revalúan como proveedor secundario si el volumen lo justifica.

## Consecuencias

- Operar Postgres/Redis/Medusa implica más responsabilidad operativa que una plataforma 100% gestionada — mitigado usando proveedores managed (Neon, Upstash, Railway) en las fases iniciales.
- El modelo de "regiones" de Medusa es la pieza clave que habilita la expansión internacional sin reescritura mayor; cualquier decisión futura que rompa ese modelo debe pasar por un ADR nuevo.
