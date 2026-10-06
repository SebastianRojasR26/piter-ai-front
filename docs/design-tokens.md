# Tokens de diseño y contraste

Los colores se definen únicamente en `src/styles/tokens.css`: `:root` contiene el modo oscuro y `[data-theme="light"]` sus sustituciones. `tailwind.config.js` referencia roles semánticos y constantes de marca. Los componentes nuevos combinan utilidades Tailwind con CSS de composición.

## Roles

| Tokens                                                 | Uso                                           |
| ------------------------------------------------------ | --------------------------------------------- |
| `--bg`, `--bg-elevated`                                | Fondo principal y bloques destacados          |
| `--surface`, `--surface-2`                             | Tarjetas y controles secundarios              |
| `--text`, `--text-muted`, `--text-subtle`, `--eyebrow` | Jerarquía de lectura                          |
| `--border`, `--border-strong`, `--input-border`        | Divisiones y límites de controles             |
| `--accent`, `--accent-strong`, `--accent-text`         | CTA, hover y enlaces/iconos                   |
| `--on-accent`, `--on-strong`                           | Texto en fondos teal y petróleo               |
| `--focus`, `--focus-ring`                              | Foco visible y halo                           |
| `--chat-*`, `--user-*`, `--icon-*`                     | Lectura, burbuja del usuario e isotipo        |
| `--home-header-*`, `--badge-*`                         | Header, controles y modo de conexión          |
| `--danger`, `--danger-bg`, `--danger-border`           | Error con índigo de marca y neutros derivados |
| `--disabled-*`                                         | Controles deshabilitados                      |
| `--gradient-*`, `--overlay*`, `--pattern-opacity`      | Degradados y textura                          |
| `--shadow*`, `--backdrop`                              | Profundidad y fondo del menú móvil            |
| `--scrollbar*`, `--selection-*`                        | Scrollbar y selección de texto                |
| `--theme-color`                                        | Interfaz del navegador                        |

Home y menú mantienen la paleta azul noche/navy en oscuro. El header del chat pertenece al área de lectura que acompaña el tema completo: fondo `--chat-bg`, texto `--chat-text`/`--chat-muted`, borde inferior `--chat-border`. Hereda los roles de `.chat-main` sin overrides de chrome. Los tokens `--chrome-*` se eliminaron; `--home-header-bg` y `--home-header-text` se usan únicamente para el header de Home. El tema claro usa fondo #F4F7FB, superficies blancas, texto azul noche y secundarios derivados del navy. Los enlaces sobre fondos claros usan petróleo. `icon-light.png` se apoya siempre en una superficie clara. El patrón tiene opacidad 0,055 en oscuro y 0,025 en claro.

El header de escritorio no muestra logo: usa el título Fredoka «Asistente tributario» y el chip Colombia. Hasta 900 px muestra el logo por tema: blanco en oscuro y azul noche en claro. Los otros contextos conservan la elección por tema si no especifican tono. El bloque de marca lateral y el header miden 76 px en escritorio y sus separadores se alinean. ThemeToggle y el badge usan `--input-border`; el hover del toggle refuerza el borde con `--chat-focus` sobre `--chat-surface`. Se eliminó también `--badge-border`, que quedó sin uso.

## Contrastes

Calculados con luminancia relativa sRGB: `(L mayor + 0,05) / (L menor + 0,05)`. Texto normal requiere 4,5:1; límites de inputs y foco, 3:1. En Home oscura se comprueba el extremo más claro del degradado (#143057); en superficies claras se comprueba el fondo más desfavorable usado por el rol. Los bordes decorativos de tarjetas/divisiones y controles deshabilitados no se usan como indicadores de foco.

| Elemento / tema              | Primer plano | Fondo   | Ratio   | Criterio |
| ---------------------------- | ------------ | ------- | ------- | -------- |
| CTA / ambos                  | #0A1738      | #009984 | 4,94:1  | ≥4,5:1   |
| Hover CTA / ambos            | #FFFFFF      | #186868 | 6,52:1  | ≥4,5:1   |
| Texto chat / oscuro          | #F4F7FB      | #182C4A | 13,05:1 | ≥4,5:1   |
| Secundario chat / oscuro     | #C4D0E2      | #182C4A | 8,99:1  | ≥4,5:1   |
| Placeholder y notas / oscuro | #AEBED5      | #182C4A | 7,43:1  | ≥4,5:1   |
| Acentos y foco / oscuro      | #57D2B6      | #182C4A | 7,54:1  | ≥4,5:1   |
| Texto chat / claro           | #0A1738      | #F4F7FB | 16,39:1 | ≥4,5:1   |
| Secundario chat / claro      | #52647D      | #F4F7FB | 5,62:1  | ≥4,5:1   |
| Acentos y foco / claro       | #186868      | #FFFFFF | 6,52:1  | ≥4,5:1   |
| Badge / oscuro               | #A1E8D6      | #173D42 | 8,43:1  | ≥4,5:1   |
| Badge / claro                | #186868      | #F0F8F5 | 6,04:1  | ≥4,5:1   |
| Error / oscuro               | #E3E5FA      | #26295A | 10,89:1 | ≥4,5:1   |
| Error / claro                | #26295A      | #F0F0F7 | 11,96:1 | ≥4,5:1   |
| Borde input / oscuro         | #7C8DA4      | #182C4A | 4,14:1  | ≥3:1     |
| Borde input / claro          | #7C8DA4      | #F4F7FB | 3,15:1  | ≥3:1     |
| Borde badge / oscuro         | #7C8DA4      | #173D42 | 3,48:1  | ≥3:1     |
| Borde badge / claro          | #7C8DA4      | #F0F8F5 | 3,14:1  | ≥3:1     |

Blanco sobre #009984 obtiene 3,57:1 y se evita para texto normal. El envío usa también azul noche sobre teal. El error usa índigo de marca y se identifica mediante título, texto y acciones, sin depender del color.

El enlace Funciones, el título y los iconos heredan el texto de lectura en cada tema. ThemeToggle y badge conservan bordes e iconos con ratio mínimo 3:1; sus textos y los mensajes mantienen al menos 4,5:1. Los acentos sobre superficies oscuras usan mint derivado del teal y en claro usan petróleo.

## Tema y accesibilidad

- `useTheme` comparte el estado y lee/escribe `piterai-theme` con try/catch. Con almacenamiento bloqueado mantiene la selección en memoria.
- La preferencia guardada válida prevalece. Sin ella sigue `prefers-color-scheme`; sin preferencia clara o sin matchMedia, usa oscuro. Atiende cambios del sistema y del almacenamiento entre pestañas.
- El script de `index.html` aplica `data-theme`, `color-scheme` y `theme-color` antes de React. El hook mantiene el meta usando `--theme-color`.
- ThemeToggle tiene etiqueta dinámica, `aria-pressed` (presionado en oscuro), foco visible y área mínima 44 × 44 px. El logo enlaza al chat.
- El menú móvil incluye toggle, cierre con Escape, ciclo de foco y retorno al control de apertura. El formulario usa layout flex, `100dvh` y padding de safe-area; la conversación hace scroll sin quedar detrás del composer.
- Se respetan `prefers-reduced-motion`, teclado, respuesta completa en aria-live y `lang="es"`.

## Revisión

Capturas en `tmp/themes/` (ignoradas): `/` y `/inicio`, claro/oscuro, 375, 768 y 1280 px. Chat vacío, cargando, con respuesta y error. También se comprueban reintento sin duplicados, cancelación durante escritura, Funciones, toggle del menú, persistencia y redirección, sin overflow horizontal o superposición del composer. Se corrigieron los títulos de sugerencias y el select en claro tras la primera ronda.

Revisión posterior del header: 18 capturas en `tmp/header/`, ambos temas y 375/768/1280 px, estados vacío, respuesta y error. Se verifica un solo logo visible en escritorio, tono correcto en móvil/tablet, alineación a 76 px, foco y contraste de texto/bordes/iconos.

## Movimiento

`src/styles/motion.css` define entradas breves de mensajes, errores y bienvenida, aparición escalonada de tarjetas, deslizamiento del menú y microinteracciones en botones/iconos. Los colores de superficies, bordes y textos transicionan al cambiar de tema. Las animaciones no bloquean el envío ni reinician respuestas. Se usa fill-mode backwards para permitir hover después de las entradas. Con prefers-reduced-motion se desactivan animaciones, transiciones y desplazamientos decorativos.

## Home editorial

El rediseño de `/inicio` usa roles propios `--ed-bg`, `--ed-card`, `--ed-panel`, `--ed-text`, `--ed-muted`, `--ed-border`, `--ed-accent`, `--ed-button-bg`, `--ed-accent-hover`, `--ed-on-accent` y `--ed-on-hover`. Son aliases de la paleta compartida; todos los colores permanecen centralizados en `tokens.css`.

La paleta se verificó visualmente en `BRANDBOARD PITER/BrandboardPITER.pdf`, dentro del ZIP proporcionado: teal #009984, petróleo #186868, navy #143057, azul noche #0A1738 e índigo #26295A. Se retiraron crema y verde bosque. En claro se usan blanco y grises azulados derivados; en oscuro azul noche, navy y superficies de lectura derivadas. Botones y badge usan teal con texto azul noche; hover petróleo con texto blanco. El acento de texto oscuro es el tono accesible #57D2B6 derivado del teal. Navegación, iconos y foco heredan estos roles dentro de la Home; el chat conserva sus tokens de lectura.

Entradas breves de hero y ejemplo, hover de planes y botones, FAQ nativa accesible con teclado. Se respeta movimiento reducido. Capturas de revisión en `tmp/redesign-{tema}-{ancho}.png`, 375/768/1280 px, y vistas de planes en `tmp/plans-*`.
