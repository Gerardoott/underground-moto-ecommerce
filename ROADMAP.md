# Roadmap y backlog

Ver [`ARCHITECTURE.md`](./ARCHITECTURE.md) para el detalle técnico de cada decisión mencionada aquí.

## Fases

### Fase 0 — Fundamentos (completa)

- [x] Definir stack técnico y arquitectura (`ARCHITECTURE.md`).
- [x] Scaffold del monorepo (este repositorio).
- [x] Crear cuentas de servicios: Vercel, Railway, Neon/Supabase, Upstash, Culqi (sandbox), Cloudflare.
- [x] Registrar el dominio de la marca.
- [x] Definir identidad visual mínima (logo, paleta, tipografía) para poder maquetar el storefront.

### Fase 1 — MVP Perú

Objetivo: vender el primer producto real a un comprador peruano.

- [x] Scaffold de `apps/backend` con Medusa y modelado de catálogo (productos, variantes de talla/color, colecciones).
- [x] Scaffold de `apps/storefront` con Next.js consumiendo la Store API de Medusa.
- [x] Diseño del storefront (estética underground/motera): home, catálogo, PDP, carrito, cuenta (perfil, direcciones, pedidos), checkout — identidad de marca aplicada de punta a punta (paleta, tipografía Anton/Space Mono, sistema de tokens en `packages/ui`, sistema de botones documentado en `0004-sistema-de-botones.md`).
- [x] Checkout con **Culqi** (tarjetas) — proveedor de pago custom construido siguiendo el patrón oficial de Medusa v2 (Payment Module Provider), con ruta de API propia para resolver la tokenización de tarjeta desde el navegador. Captura automática del pago al confirmar el pedido. Flujo probado de punta a punta con múltiples órdenes reales en sandbox (autorización, captura, estados de pago mapeados al español).
- [x] Panel admin de Medusa configurado para gestión de pedidos — verificado funcionando de punta a punta (lista de pedidos, detalle, creación de fulfillment, marcar como entregado) sin necesitar configuración adicional. Inventario: los productos tienen SKUs pero `manage_inventory` está desactivado en todas las variantes ("Not managed") — pendiente activarlo con cantidades reales cuando se haga el conteo físico del almacén.
- [x] Envíos: proceso manual configurado y probado — ubicación "Almacén Lima" con canal de ventas y proveedor Manual conectados, zona de servicio Perú, opción "Envío estándar" a S/12. Confirmado funcionando en el checkout real.
- [x] Autenticación de clientes (cuenta, historial de pedidos) y checkout como invitado — login y registro verificados funcionando; historial de pedidos con detalle completo (envío, pago, resumen) verificado.
- [x] Notificaciones por email (confirmación de pedido) — integrado con Resend (Notification Module Provider custom), plantilla de marca en español, dominio `gettekko.com` verificado y enviando desde `pedidos@gettekko.com`. Probado de punta a punta con pedidos reales.
- [x] SEO básico (metadata, sitemap, datos estructurados de producto) — metadata completa (título, descripción, Open Graph, Twitter Card, URL canónica) en producto, categoría y colección; datos estructurados JSON-LD de producto para resultados enriquecidos en Google; sitemap dinámico (`/sitemap.xml`) generado a partir del catálogo real. De paso se detectaron y eliminaron 7 regiones de demostración del starter (Europa) que no correspondían a Tekko, dejando solo la región Perú activa.
- [x] Analítica básica (PostHog) + monitoreo de errores (Sentry) — PostHog integrado con autocapture de pageviews, clics y web vitals (verificado con eventos reales en el dashboard); Session Replay desactivado a propósito por decisión de privacidad pendiente de evaluar. Sentry integrado con captura de errores cliente y servidor, tracing de performance, y tunnel route para evitar bloqueadores de anuncios (requirió agregar `monitoring` a las exclusiones de `middleware.ts`). Resuelto: Next.js actualizado a 15.5.25 (React 19.3.0), cerrando además los CVEs críticos conocidos de Next 15 a la fecha. El pendiente de source maps con Turbopack se cierra por clarificación, no por cambio de código: el build de producción usa Webpack (`next build`, sin `--turbopack`, que sigue en beta en la rama 15), por lo que Sentry ya sube source maps correctamente por el plugin clásico. Turbopack en producción queda para evaluar a futuro, probablemente junto con una eventual migración a Next 16.
- [ ] Deploy: storefront en Vercel, backend en Railway, CI en GitHub Actions.

### Fase 2 — Consolidación nacional

Objetivo: operar de forma sostenible en Perú antes de expandirse.

- [ ] Integrar **Yape** como método de pago (fast follow post-lanzamiento, ver `ARCHITECTURE.md` §4).
- [ ] **Personalización de productos** (iniciativa grande, requiere su propio ADR de alcance antes de construir): editor donde el cliente diseñe camisetas/hoodies en blanco, colocando imágenes o gráficos propios de la marca dentro de zonas de impresión predefinidas. Evaluado en sesión de chat: arrancar con posicionamiento manual tipo Printful (sin IA); boceto generado por IA queda como posible mejora posterior, no como base — implica costo por generación y sigue necesitando conversión manual a diseño imprimible.
- [ ] **Maniquí virtual y combinador de conjuntos** (iniciativa grande, ver `docs/decisions/0005-maniqui-virtual-conjuntos.md`): sección donde el cliente combina prendas del catálogo (conjuntos curados por Tekko + combinación libre) sobre un maniquí plano en capas con vistas de frente/espalda, para facilitar la compra de conjuntos completos. Distinta de la personalización — acá se combinan prendas ya existentes, no se imprime diseño propio. Bloqueante antes de construir: fotos aisladas (frente + espalda, fondo transparente) de cada producto participante — especificación completa de fotografía y herramientas documentada en el ADR. Maniquí 3D interactivo/rotable queda anotado como visión futura, fuera de alcance de esta iniciativa.
- [ ] Automatizar cotización/generación de guías de envío (API Olva o Shalom).
- [ ] Códigos de descuento y promociones.
- [ ] Reviews de producto.
- [ ] Wishlist / favoritos.
- [ ] Búsqueda y filtros de catálogo (por talla, categoría, precio).
- [ ] Presencia en redes (pixel de Instagram/TikTok para retargeting).
- [ ] Inventario multi-almacén si se abre un segundo punto de stock.

### Fase 3 — Expansión regional (LatAm)

Objetivo: vender a un segundo país sin reescribir el core.

- [ ] Crear segunda **región** en Medusa (moneda, impuestos, proveedor de pago local del nuevo país).
- [ ] Integrar **Stripe** como pasarela para mercados donde no aplique un proveedor local peruano.
- [ ] i18n del storefront (rutas por país/idioma).
- [ ] Cálculo de impuestos/aranceles de importación si aplica.
- [ ] Integración de courier internacional (DHL/EMS o agregador tipo Shippo).

### Fase 4 — Escalamiento internacional

Objetivo: infraestructura lista para volumen y mercados múltiples.

- [ ] Migrar backend de Railway a AWS Fargate / GCP Cloud Run (o multi-región si el tráfico lo justifica).
- [ ] Soporte multi-idioma más allá de español (inglés, portugués).
- [ ] Cumplimiento fiscal internacional (VAT/GST según mercado).
- [ ] Evaluar canal B2B/wholesale (Medusa lo soporta de forma nativa).
- [ ] Programa de afiliados/influencers (relevante para la comunidad underground/motera).

## Backlog priorizado (Fase 1, formato MoSCoW)

**Must have**
- Catálogo con variantes (talla, color)
- PDP (página de producto) con galería de imágenes
- Carrito
- Checkout con Culqi
- Checkout como invitado
- Panel admin para gestión de pedidos
- Diseño responsive (mobile-first — la mayoría del tráfico de e-commerce en Perú es móvil)

**Should have**
- Pago con Yape
- Notificación de confirmación de pedido por email
- Búsqueda/filtro básico de catálogo
- Cupones de descuento

**Could have**
- Reviews de producto
- Productos relacionados / "también te puede interesar"
- Blog o lookbook editorial (contenido de marca)
- Programa de puntos/fidelización

**Won't have (por ahora)**
- Portal B2B/wholesale
- Suscripciones recurrentes
- Multi-almacén
- App móvil nativa