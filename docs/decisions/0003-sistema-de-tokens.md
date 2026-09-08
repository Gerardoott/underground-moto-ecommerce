# 0003 - Sistema de tokens de diseño

## Decisión

Centralizar la identidad visual en `packages/ui/`, como paquete compartido dentro del monorepo, en vez de duplicar valores de color/tipografía en cada app por separado:

- **`packages/ui/tokens.css`** — variables CSS (`:root`) con todos los valores de color, tipografía, radio y grid. Fuente única de verdad.
- **`packages/ui/components.css`** — clases de componentes reutilizables (`.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.attr-tag`, `.status-tag`, `.panel`, `.line-grid`) construidas sobre esas variables con `@apply` de Tailwind. Documentación de referencia; ver nota de implementación abajo sobre por qué en el storefront su contenido vive inlineado en `globals.css`.

## Tokens definidos

| Token | Valor | Uso |
|---|---|---|
| `--tekko-black` | `#0A0A0A` | Fondo base de toda la app |
| `--tekko-surface` | `#141414` | Paneles, nav, cards elevadas un nivel |
| `--tekko-surface-2` | `#1C1C1C` | Swatches/placeholders dentro de paneles |
| `--tekko-bone` | `#F2F0EB` | Texto principal |
| `--tekko-bone-muted` | `#8C8880` | Texto secundario (gris cálido, no frío) |
| `--tekko-violet` | `#9B4DFF` | Acento de marca — un solo elemento por vista |
| `--tekko-violet-hover` | `#B876FF` | Estado hover del acento |
| `--tekko-line` | `#2A2A2A` | Bordes y divisores |
| `--tekko-danger` | `#E8232B` | Errores/alertas (reutiliza el rojo de la paleta alterna, ver `0002`) |
| `--font-display` | Anton | Logo, títulos grandes |
| `--font-mono` | Space Mono | Todo lo demás: nav, precios, forms, UI |
| Radio de bordes | `0px` | Global — sin esquinas redondeadas en ningún componente |

## Integración con Tailwind

`apps/storefront/tailwind.config.js` mapea estas variables a nombres de utilidad de Tailwind (`colors.black/surface/bone/violet/line/danger`, `fontFamily.display/mono`) **fusionando** con la configuración existente del starter de Medusa (preset `@medusajs/ui-preset`, screens, keyframes, animaciones) — nunca reemplazando el archivo entero, para no romper los componentes ya construidos sobre esas utilidades.

Detalle relevante: se sobreescribe el `black` por defecto de Tailwind (antes `#000000`) para que apunte a `var(--tekko-black)`. Efecto colateral aprovechado: cualquier clase `bg-black`/`text-black` ya existente en el starter hereda el negro de marca automáticamente, sin editar archivo por archivo.

## Problema técnico resuelto: Turbopack y monorepo

Dos hallazgos durante la implementación, documentados para no repetir la investigación:

1. **Turbopack restringe la resolución de archivos fuera de la carpeta de la app** (`apps/storefront`) por defecto, lo que bloqueaba el `@import` de `packages/ui/tokens.css`. Se resolvió agregando `outputFileTracingRoot` en `next.config.js`, apuntando a la raíz del monorepo.
2. **Turbopack procesa cada archivo CSS importado de forma aislada** — un `@layer components` en un archivo separado sin su propio `@tailwind components` falla al compilar. Por eso, aunque `packages/ui/components.css` sigue siendo la fuente de referencia documentada, su contenido se mantiene **inlineado directamente** dentro del `@layer components` de `globals.css` en cada app que lo consume, en vez de importarse como archivo aparte.

## Paletas y tipografías alternativas

Documentadas en [`0002-identidad-visual.md`](./0002-identidad-visual.md) — no se tokenizan en CSS porque son de uso puntual para gráficos de prendas específicas, no para componentes de UI base.