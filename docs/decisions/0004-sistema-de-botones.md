# 0004 - Sistema de botones

## Decisión

Se formaliza un sistema de 4 variantes de botón, ya definidas en `packages/ui/components.css` / `globals.css`, para reemplazar el uso directo de `<Button>` de `@medusajs/ui` en toda la app. El uso de componentes de Medusa sin nuestras clases fue la causa raíz de varios bugs de identidad visual detectados durante la sesión de estilizado de `/account` (botones con colores y bordes genéricos, sin pasar por la marca).

## Las 4 variantes

| Clase | Fondo | Texto | Borde | Hover | Cuándo usarlo |
|---|---|---|---|---|---|
| `.btn-primary` | Violeta (`bg-violet`) | Negro (`text-black`) | Ninguno | Violeta más claro (`bg-violet-hover`) | Una sola acción principal por vista — "Agregar al carrito", "Confirmar pedido", "Iniciar sesión". Nunca dos `primary` en la misma pantalla. |
| `.btn-secondary` | Transparente | Hueso (`text-bone`) | Hueso (`border-bone`) | Se invierte: fondo hueso, texto negro | Acción alternativa junto a una `primary` — "Cancelar", "Agregar a favoritos", "Editar". |
| `.btn-ghost` | Transparente | Hueso (`text-bone`) | Ninguno, solo subrayado en hover | Aparece el subrayado (`decoration-bone`) | Acción de bajo peso visual — links de navegación con forma de botón, "Ver más". |
| Variante `danger` (definida en `SubmitButton`) | Transparente | Rojo (`text-danger`) | Rojo (`border-danger`) | Se invierte: fondo rojo, texto negro | Acciones destructivas o de alerta real — eliminar cuenta, cancelar pedido. Poco frecuente, no usar para errores de validación normales. |

## Regla de oro para combinar

El violeta (`btn-primary`) se reserva exclusivamente para la acción principal de cada pantalla — es la misma regla que ya aplica al resto de la marca ("un solo elemento con acento violeta por vista", ver `0002-identidad-visual.md`). Si una pantalla tiene dos botones, casi siempre debe ser `btn-primary` + `btn-secondary`, nunca dos `primary` compitiendo por atención.

## Estado deshabilitado

Aplica a las 4 variantes por igual — nunca cambia de color, solo baja la opacidad y bloquea el clic:

```
opacity-35 (o opacity-40) cursor-not-allowed pointer-events-none
```

Un botón deshabilitado en gris, azul u otro color fuera de la paleta es señal de que no está usando nuestras clases.

## Radio buttons y checkboxes

No son "botones" en sentido estricto, pero siguen la misma lógica de color:

- No seleccionado: `border-line`
- Seleccionado: `border-violet` (radio) o `bg-violet` con check negro (checkbox)
- Nunca el azul por defecto del navegador.

## Errores comunes a evitar

Detectados y corregidos durante el estilizado de `/account` (Profile, Addresses, Orders):

1. **Botones que vienen directo de `@medusajs/ui` (`<Button variant="secondary">`) sin nuestras clases** — se ven con colores/bordes genéricos de esa librería, no de la marca. Siempre reemplazar por `<button className="btn-...">` o por `<SubmitButton>` (nuestro wrapper compartido en `@modules/checkout/components/submit-button`, que ya aplica `btn-primary` por defecto vía `variantClasses`).
2. **Anchos forzados con `w-[100px]` o `max-w-[140px]`** que cortan el texto — mejor usar `whitespace-nowrap` + padding (`px-4`, `px-6`, `px-8`) para que el botón se ajuste al contenido.
3. **`Heading` y `Text` de `@medusajs/ui` usados sin `font-mono` explícito** — estos componentes traen su propia tipografía interna que pisa la fuente global de la marca (Space Mono). Si se usan (por ejemplo dentro de `Modal.Title` o formularios que ya traían estos componentes del starter), hay que forzar `className="... font-mono"` explícitamente.

## Componente compartido de referencia

`SubmitButton` (`@modules/checkout/components/submit-button/index.tsx`) ya centraliza las 4 variantes:

```ts
const variantClasses: Record<string, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  transparent: "btn-ghost",
  danger: "bg-transparent text-danger border border-danger font-mono text-[13px] font-bold px-7 py-3.5 cursor-pointer hover:bg-danger hover:text-black transition-colors duration-150",
}
```

Al ser compartido entre checkout, PDP y `/account`, es el punto único de verdad para el estilo de botones de acción de formulario en toda la app — cualquier ajuste futuro a estas 4 variantes debería hacerse ahí primero.
