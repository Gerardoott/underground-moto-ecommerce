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
- [ ] Panel admin de Medusa configurado para gestión de pedidos e inventario — **en progreso**.
- [x] Envíos: proceso manual configurado y probado — ubicación "Almacén Lima" con canal de ventas y proveedor Manual conectados, zona de servicio Perú, opción "Envío estándar" a S/12. Confirmado funcionando en el checkout real.
- [x] Autenticación de clientes (cuenta, historial de pedidos) y checkout como invitado — login y registro verificados funcionando; historial de pedidos con detalle completo (envío, pago, resumen) verificado.
- [x] Notificaciones por email (confirmación de pedido) — integrado con Resend (Notification Module Provider custom), plantilla de marca en español, probado con pedido real de punta a punta. Pendiente: verificar dominio `gettekko.com` en Resend para enviar desde un remitente propio en vez de `onboarding@resend.dev` (necesario antes de producción, no bloquea desarrollo).
- [ ] SEO básico (metadata, sitemap, datos estructurados de producto) — **parcial**: título de la home ya actualizado, faltan categorías/colecciones/producto individual.
- [ ] Analítica básica (PostHog) + monitoreo de errores (Sentry).
- [ ] Deploy: storefront en Vercel, backend en Railway, CI en GitHub Actions.

### Fase 2 — Consolidación nacional

Objetivo: operar de forma sostenible en Perú antes de expandirse.

- [ ] Integrar **Yape** como método de pago (fast follow post-lanzamiento, ver `ARCHITECTURE.md` §4).
- [ ] **Personalización de productos** (iniciativa grande, requiere su propio ADR de alcance antes de construir): editor donde el cliente diseñe camisetas/hoodies en blanco, colocando imágenes o gráficos propios de la marca dentro de zonas de impresión predefinidas. Evaluado en sesión de chat: arrancar con posicionamiento manual tipo Printful (sin IA); boceto generado por IA queda como posible mejora posterior, no como base — implica costo por generación y sigue necesitando conversión manual a diseño imprimible.
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