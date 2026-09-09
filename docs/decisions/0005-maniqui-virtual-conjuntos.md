# 0005 - Maniquí virtual y combinador de conjuntos

## Contexto

Los inversionistas plantearon, además del editor de personalización de prendas (ver iniciativa "Personalización de productos" en `ROADMAP.md`, Fase 2), un segundo apartado: un maniquí virtual donde el cliente pueda combinar prendas disponibles del catálogo para ver cómo lucen juntas, facilitando la compra de conjuntos completos. Es una idea en evaluación, sin fecha comprometida todavía.

Es una funcionalidad **distinta** al editor de personalización — ese permite imprimir gráficos propios sobre una prenda en blanco; este permite combinar prendas ya existentes del catálogo entre sí.

## Investigación de alcance

Se evaluaron tres niveles de fidelidad para el maniquí:

1. **Probador virtual fotorrealista con IA generativa** (una silueta humana con las prendas fusionadas de forma realista, tipo "vestidor virtual"). Existen APIs comerciales maduras (Perfect Corp, API4AI, entre otras) para probar **una prenda a la vez** sobre una foto de modelo. Combinar **varias prendas a la vez** de forma fotorrealista es, a la fecha de esta investigación (principios de 2026), un problema todavía en etapa de investigación académica activa (ver paper "Garments2Look: Multi-Reference Dataset for High-Fidelity Outfit-Level Virtual Try-On"), sin solución comercial estable y consistente. Se descarta como base del MVP por riesgo de calidad inconsistente y costo por generación.
2. **Maniquí plano tipo "paper doll"** (muñeca de papel): un maniquí base (ilustrado o fotografiado) con las prendas superpuestas como imágenes recortadas en capas fijas, sin IA. Es la técnica elegida — sin costo variable por uso, calidad predecible, tecnología bien establecida.
3. **Grid plano sin figura humana** (las prendas elegidas se muestran una al lado de la otra). Se descarta por ser menos ilustrativo que la opción 2 para el objetivo de "ver cómo lucen juntas".

## Decisión

Se construye un combinador de conjuntos con **maniquí plano en capas** (opción 2), con las siguientes características:

- **Base del maniquí**: silueta neutra genérica (blanco/gris), sin la identidad visual de marca — el maniquí es solo el soporte, no debe competir visualmente con las prendas.
- **Vistas**: frente y espalda, con un control para alternar entre ambas.
- **Modos de combinación**:
  - **Conjuntos curados**: Tekko arma combinaciones predefinidas (ej. "Look Nocturno": Polera X + Pantalón Y), mostradas listas para que el cliente las vea y agregue al carrito como set.
  - **Combinación libre**: el cliente elige una prenda por categoría (top, bottom, accesorio) desde el catálogo disponible y ve el resultado en el maniquí.

## Requisitos de assets (bloqueante antes de construir)

Por cada producto que participe del combinador, se necesita:

- Foto aislada de la prenda, sin modelo, fondo limpio/transparente (recorte tipo "product shot plano") — **de frente**.
- La misma foto aislada — **de espalda**.
- Categorización por "slot" de la prenda (top / bottom / accesorio) para saber en qué capa y posición del maniquí se ubica.

Sin estas dos vistas por producto, el toggle frente/espalda no tiene contenido que mostrar para esa prenda — el combinador debe manejar con gracia los productos que todavía no tengan ambas vistas cargadas (ej. ocultarlos del combinador hasta que estén completos, en vez de romper el layout).

## Alcance técnico (a definir en detalle antes de implementar)

- Componente de capas con posicionamiento fijo por tipo de prenda (top/bottom/accesorio), superpuestas sobre el maniquí base mediante `z-index`.
- Modelo de datos: extender productos con metadata de "slot" (top/bottom/accesorio) y URLs de las imágenes aisladas frente/espalda.
- Conjuntos curados: se evaluará si conviene modelarlos como una extensión de "Colecciones" de Medusa (ya existe el concepto en el catálogo) o como una entidad nueva.
- Vive como una sección/página propia del storefront (ej. "Arma tu conjunto"), separada de la página de producto individual (PDP).

## Próximos pasos

1. Confirmar con los inversionistas el alcance descrito acá antes de comprometer fecha.
2. Sebastian recolecta/genera las fotos aisladas (frente + espalda) de al menos un subconjunto de productos para el MVP, siguiendo la especificación de la sección siguiente.
3. Definir el diseño visual del maniquí base (tamaño, proporciones, puntos de anclaje por slot) junto con el sistema de diseño existente (`0002`, `0003`).
4. Recién ahí, sesión de implementación técnica siguiendo el mismo patrón de trabajo guiado usado en el resto del proyecto.

Sin fecha comprometida — queda en el backlog de Fase 2, junto a la personalización de productos.

## Especificación de fotografía de prendas (para el combinador 2D)

Esta sección es una guía práctica para cuando Sebastian tome o encargue las fotos — el objetivo es que todas las prendas queden con el mismo estándar, para que el sistema de capas las alinee automáticamente sobre el maniquí sin retoque manual por producto.

### Qué fotografiar

- **Dos tomas por prenda**: una de frente, una de espalda. No sirve una sola foto "de 3/4" o en ángulo — el combinador necesita las dos vistas rectas para el toggle frente/espalda.
- **La prenda sola, no puesta en un modelo ni en un maniquí físico**: ya sea en un colgador (foto tipo "ghost mannequin"/maniquí fantasma, donde se recorta el maniquí después) o en flat lay (la prenda tendida y fotografiada desde arriba). Cualquiera de las dos formas funciona, pero **hay que ser consistente**: elegir una técnica y usarla para todo el catálogo, no mezclar.
- **Encuadre recto, sin perspectiva forzada**: cámara centrada y perpendicular a la prenda, no en ángulo. Si la prenda se ve "torcida" o en escorzo, después no calza bien sobre el maniquí.

### Cómo fotografiar

- **Fondo liso y contrastante** con la prenda (blanco o verde chroma si es posible) — facilita muchísimo el recorte después. Evitar fondos con textura o del mismo color que la prenda (ej. prenda negra sobre fondo negro).
- **Luz pareja, sin sombras duras**: idealmente luz difusa (softbox, o luz natural indirecta cerca de una ventana grande), evitando sombras marcadas de un solo lado que después se noten raras al superponer la prenda sobre el maniquí.
- **Misma distancia y encuadre para todas las prendas del mismo tipo**: por ejemplo, todas las poleras encuadradas de la misma forma entre sí (mismo margen arriba/abajo), para que al pasar de una prenda a otra en el combinador no "salten" de tamaño. Usar un trípode fijo y no mover la cámara entre tomas de la misma sesión ayuda mucho acá.

### Formato de entrega

- **Resolución mínima recomendada**: 2000×2000 px (cuadrado) — da margen para que el combinador la escale sin perder nitidez, y sirve también para las fotos normales del catálogo.
- **Formato de archivo**: PNG con fondo transparente (canal alfa), no JPG — el combinador necesita transparencia real para que las prendas se apilen en capas sin fondo blanco tapando la prenda de abajo.
- **Convención de nombres sugerida**: `{handle-del-producto}-frente.png` y `{handle-del-producto}-espalda.png` (ej. `polera-tekko-frente.png`), usando el mismo `handle` que ya usa el producto en Medusa — así después es directo relacionar cada imagen con su producto en el código.

### Herramientas para el recorte (quitar el fondo)

No hace falta comprar software caro. Opciones, de más simple a más control manual:

- **remove.bg** — herramienta web gratuita/freemium, sube la foto y descarga el PNG recortado automáticamente. La opción más rápida para arrancar.
- **Photoshop** (si ya lo tenés, mencionaste Microsoft Designer/Bing Image Creator en tus herramientas) — usando "Seleccionar sujeto" + "Perfeccionar borde" para un recorte más prolijo en prendas con bordes complicados (flecos, correas sueltas, etc.).
- **Photopea** — alternativa gratuita y web de Photoshop, con las mismas herramientas de selección, sin instalar nada.

Recomendación práctica: probar primero con `remove.bg` en un par de prendas — si el recorte automático queda limpio (funciona muy bien con fondos lisos y contrastantes), no hace falta nada más elaborado. Si el contorno queda con errores (típico en prendas con muchos detalles sueltos), pasar a Photopea/Photoshop para ese caso puntual.

Cuando tengas un primer lote de fotos en este formato, retomamos la sesión y armamos el combinador con datos reales en vez de asunciones.

## Visión futura: maniquí virtual 3D interactivo (fuera de alcance por ahora)

Además del combinador plano (2D, este documento), se identificó como posible evolución futura un **maniquí 3D movible/rotable**, donde el cliente pueda girar la figura y ver la prenda desde cualquier ángulo, no solo frente/espalda fijos.

Esto es una iniciativa considerablemente más grande y se deja explícitamente **fuera de alcance del MVP de conjuntos**, para etapas posteriores del roadmap (probablemente alineada con Fase 3 o 4, escalamiento, no antes):

- Requiere modelado 3D real de cada prenda (no solo fotos) — vía software especializado de simulación de tela como **CLO3D** o **Marvelous Designer**, que son el estándar de la industria para digitalizar prendas en 3D con caída de tela realista.
- El visor interactivo en el storefront se construiría con **Three.js** o **React Three Fiber** (la librería `three` ya está disponible en el entorno de artifacts del proyecto, aunque el storefront de producción necesitaría su propia integración).
- Alternativa de menor esfuerzo pero también menor calidad: fotogrametría (fotografiar la prenda desde muchos ángulos y reconstruir un modelo 3D aproximado por software), más barata que modelar a mano pero con resultados menos prolijos para tela.
- Implica una curva de aprendizaje y/o costo de tercerización significativa (modelar en 3D con caída de tela realista no es trivial), por lo que no se recomienda como parte del MVP que se le muestra a inversionistas — el combinador 2D ya cumple el objetivo de negocio ("facilitar comprar conjuntos") sin ese costo.

Cuando el negocio esté en una etapa donde esto se justifique, retomamos con su propia sesión de scoping, igual que se hizo acá.
