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
| `--chrome-*`, `--badge-*`                              | Header, controles y modo de conexión          |
| `--danger`, `--danger-bg`, `--danger-border`           | Error con índigo de marca y neutros derivados |
| `--disabled-*`                                         | Controles deshabilitados                      |
| `--gradient-*`, `--overlay*`, `--pattern-opacity`      | Degradados y textura                          |
| `--shadow*`, `--backdrop`                              | Profundidad y fondo del menú móvil            |
| `--scrollbar*`, `--selection-*`                        | Scrollbar y selección de texto                |
| `--theme-color`                                        | Interfaz del navegador                        |

El tema oscuro conserva la composición original: Home y menú en azul noche/navy, con área de lectura del chat y ejemplo claros. `.chat-main` y `.preview-card` reasignan los roles compartidos a `--chat-*`; el header usa `--chrome-*` para acompañar el logo del tema. El tema claro usa fondo #F4F7FB, superficies blancas, texto azul noche y secundarios derivados del navy. Los enlaces sobre fondos claros usan petróleo. `icon-light.png` se apoya siempre en una superficie clara. El patrón tiene opacidad 0,055 en oscuro y 0,025 en claro.

## Contrastes

Calculados con luminancia relativa sRGB: `(L mayor + 0,05) / (L menor + 0,05)`. Texto normal requiere 4,5:1; límites de inputs y foco, 3:1. En Home oscura se comprueba el extremo más claro del degradado (#143057); en superficies claras se comprueba el fondo más desfavorable usado por el rol. Los bordes decorativos de tarjetas/divisiones y controles deshabilitados no se usan como indicadores de foco.

| Elemento / tema                             | Primer plano | Fondo   | Ratio   | Resultado       |
| ------------------------------------------- | ------------ | ------- | ------- | --------------- |
| CTA y selección / ambos                     | #0A1738      | #009984 | 4,94:1  | AA texto normal |
| Hover CTA / ambos                           | #FFFFFF      | #186868 | 6,52:1  | AA texto normal |
| Texto principal / claro                     | #0A1738      | #F4F7FB | 16,39:1 | AA              |
| Enlaces y eyebrows / claro                  | #186868      | #EDF2F8 | 5,80:1  | AA              |
| Secundario / claro                          | #52647D      | #F4F7FB | 5,62:1  | AA              |
| Sutil / claro                               | #596B82      | #EDF2F8 | 4,85:1  | AA              |
| Eyebrows / oscuro                           | #A6C6CE      | #143057 | 7,29:1  | AA              |
| Secundario / oscuro                         | #B5C3D9      | #143057 | 7,40:1  | AA              |
| Sutil / oscuro                              | #9BAECB      | #143057 | 5,86:1  | AA              |
| Acento y foco / oscuro                      | #57D2B6      | #143057 | 7,11:1  | AA texto y foco |
| Títulos de sugerencias / ambos              | #143057      | #FFFFFF | 13,21:1 | AA              |
| Secundario chat / oscuro                    | #617087      | #F7F9FC | 4,77:1  | AA              |
| Placeholder, contador y notas chat / oscuro | #64738A      | #F7F9FC | 4,57:1  | AA              |
| Enlaces, carga y foco chat / ambos          | #186868      | #FFFFFF | 6,52:1  | AA texto y foco |
| Burbuja usuario / ambos                     | #FFFFFF      | #143057 | 13,21:1 | AA              |
| Autor de burbuja / ambos                    | #BBD0E9      | #143057 | 8,37:1  | AA              |
| Error / ambos                               | #26295A      | #F0F0F7 | 11,96:1 | AA              |
| Borde input/select / blanco                 | #7C8DA4      | #FFFFFF | 3,39:1  | Componentes     |
| Borde input / chat oscuro                   | #7C8DA4      | #F7F9FC | 3,21:1  | Componentes     |
| Borde input / chat claro                    | #7C8DA4      | #F4F7FB | 3,15:1  | Componentes     |

Blanco sobre #009984 obtiene 3,57:1 y se evita para texto normal. El envío usa también azul noche sobre teal. El error usa índigo de marca y se identifica mediante título, texto y acciones, sin depender del color.

## Tema y accesibilidad

- `useTheme` comparte el estado y lee/escribe `piterai-theme` con try/catch. Con almacenamiento bloqueado mantiene la selección en memoria.
- La preferencia guardada válida prevalece. Sin ella sigue `prefers-color-scheme`; sin preferencia clara o sin matchMedia, usa oscuro. Atiende cambios del sistema y del almacenamiento entre pestañas.
- El script de `index.html` aplica `data-theme`, `color-scheme` y `theme-color` antes de React. El hook mantiene el meta usando `--theme-color`.
- ThemeToggle tiene etiqueta dinámica, `aria-pressed` (presionado en oscuro), foco visible y área mínima 44 × 44 px. El logo enlaza al chat.
- El menú móvil incluye toggle, cierre con Escape, ciclo de foco y retorno al control de apertura. El formulario usa layout flex, `100dvh` y padding de safe-area; la conversación hace scroll sin quedar detrás del composer.
- Se respetan `prefers-reduced-motion`, teclado, respuesta completa en aria-live y `lang="es"`.

## Revisión

Capturas en `tmp/themes/` (ignoradas): `/` y `/inicio`, claro/oscuro, 375, 768 y 1280 px. Chat vacío, cargando, con respuesta y error. También se comprueban reintento sin duplicados, cancelación durante escritura, Funciones, toggle del menú, persistencia y redirección, sin overflow horizontal o superposición del composer. Se corrigieron los títulos de sugerencias y el select en claro tras la primera ronda.
