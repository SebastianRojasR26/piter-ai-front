# PiterAi · Tu impulso Tributario

Frontend en español de un asistente tributario para Colombia. La landing es el chat (`/`) y la Home de funciones vive en `/inicio`. `/chat` redirige a `/` con `Navigate replace` para conservar enlaces anteriores. Incluye marca oficial, modo claro/oscuro, preguntas sugeridas, escritura progresiva, errores y reintentos. Las respuestas son orientativas y no reemplazan a un contador o asesor tributario.

## Requisitos e instalación

Node.js **22.12 o superior** y npm. Verificado con Node 24.21.0.

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Abre la URL que muestra Vite. Sin `.env`, también funciona: el modo demostración está activado por defecto. No se necesita backend ni servicios pagos.

## Scripts

| Comando             | Propósito                           |
| ------------------- | ----------------------------------- |
| `npm run dev`       | Servidor local Vite                 |
| `npm run build`     | Typecheck y producción en `dist/`   |
| `npm run preview`   | Previsualizar el build              |
| `npm run typecheck` | Comprobación estricta de TypeScript |
| `npm run lint`      | ESLint y reglas de hooks            |
| `npm test`          | Pruebas de servicios, tema y rutas  |

## Estructura

```text
src/
  App.tsx           Rutas y redirección de enlaces antiguos
  main.tsx          Entrada React
  styles.css       Entrada de estilos y Tailwind
  styles/          Tokens, base, Home, chat y responsive
  pages/           Chat, Home y NotFound
  components/      Headers, Logo, ThemeToggle, Sidebar, Composer y mensajes
  hooks/useTheme.ts Tema compartido y persistente
  types/chat.ts    Tipos de mensajes y estados
  services/        Único lugar para llamadas API
    http.ts        Fetch, token, timeout y cancelación
    chat.ts        Selección mock/API y validación de respuesta
    mock.ts        Respuestas de demostración y errores controlables
    errors.ts      Errores tipados y mensajes en español
public/brand/      Logos y patrón usados
brand/BRAND.md     Guía de marca
docs/              Contrato OpenAPI y pantallas/estados
```

Los originales en `brand/web/`, `brand/svg/` y el brandboard se conservan localmente, fuera de `src`, y no se incluyen en Git. Los recursos usados están en `public/`. El favicon PNG proviene de `icon-app.png`. Fredoka y Barlow son fuentes libres, servidas localmente mediante Fontsource, sin llamadas a Google Fonts. Las variables CSS `--font-display` y `--font-body` se referencian desde `tailwind.config.js`; no se incluyen KG Blank Space Solid ni Bahnschrift.

## Rutas y tema

- `/`: landing del asistente. Su header incluye marca, enlace **Funciones**, selector de tema y badge de modo, también en móvil.
- `/inicio`: presentación de funciones, beneficios y pasos; todos los CTAs llevan al chat `/`.
- `/chat`: redirección a `/` reemplazando la entrada de historial.
- El logo siempre lleva a `/`; «Conoce PiterAi» en el menú lleva a `/inicio`.

El botón Sol/Luna aparece en ambos headers y en el menú lateral móvil. Guarda la preferencia en `localStorage` (`piterai-theme`). Si no hay preferencia válida, sigue el tema del sistema; sin preferencia del sistema usa oscuro. Con almacenamiento bloqueado funciona en memoria. Se sincronizan cambios de sistema y de almacenamiento entre pestañas. Un script inicial evita el parpadeo; `data-theme`, `color-scheme`, el logo y `theme-color` acompañan la selección. Las transiciones respetan movimiento reducido.

Los colores semánticos y la [tabla de contrastes](docs/design-tokens.md) se documentan aparte. El modo oscuro conserva la composición original y el área de lectura clara. El modo claro adapta Home, menú y controles a blanco azulado y texto navy. El composer respeta `dvh` y safe-area, y el menú móvil tiene cierre con Escape y ciclo de foco.

## Variables de entorno

| Variable               | Uso / valor predeterminado                                          |
| ---------------------- | ------------------------------------------------------------------- |
| `VITE_API_URL`         | URL base del backend; ejemplo `http://localhost:8000`               |
| `VITE_USE_MOCK`        | `true` por defecto; `false` activa llamadas reales                  |
| `VITE_API_TOKEN`       | Opcional, vacío por defecto; header `Authorization: Bearer <token>` |
| `VITE_API_TIMEOUT_MS`  | Tiempo de espera, 20000 ms                                          |
| `VITE_MOCK_LATENCY_MS` | Latencia simulada, 900 ms                                           |
| `VITE_MOCK_ERROR_RATE` | Probabilidad de error 503 aleatorio, de 0 a 1; 0 por defecto        |

Reinicia Vite después de modificar `.env`. No guardes secretos en Git: `.env` y variantes están ignorados. **Todo valor `VITE_` se integra en el frontend y es visible al usuario**: el token opcional debe ser de acceso apropiado para un cliente público, nunca una llave privada del backend. Para producción con sesiones, usa un flujo de autenticación del backend; este proyecto no implementa login.

## Conectar el backend

1. Implementa `POST /chat` según [el contrato](docs/api-contract.yaml). Envía `{ message, conversation_id }`; el primer turno lleva `null`. Devuelve `{ reply, conversation_id }`, ambos strings no vacíos.
2. Configura `VITE_API_URL` y `VITE_USE_MOCK=false` en `.env`. Agrega token solo si el servidor lo necesita.
3. Autoriza el origen local de Vite en CORS, con método POST y headers Content-Type y Authorization (si aplica). Usa HTTPS en un entorno publicado.
4. Reinicia Vite y prueba preguntas, continuación de conversación y errores. `GET /health` está documentado como opcional y no se consulta desde la interfaz.

El historial y el ID se mantienen en memoria. El backend conserva el contexto usando ese ID. No se envía el historial completo. «Nueva conversación» cancela la solicitud pendiente y elimina el ID local. La escritura es un efecto visual sobre la respuesta JSON completa. El texto se renderiza como texto plano, sin HTML inyectado ni Markdown del servidor.

## Errores y demostración

Los controles del chat en modo mock permiten elegir una respuesta normal, fallo de red, timeout o HTTP 400/401/429/500/503. Para reproducir exactamente un error, selecciona su opción; para reintentar con éxito, cambia a «Normal». `VITE_MOCK_ERROR_RATE=1` fuerza errores aleatorios 503; 0 los desactiva.

| Caso                  | Comportamiento                                                |
| --------------------- | ------------------------------------------------------------- |
| Red / CORS            | Mensaje para revisar conexión y reintentar                    |
| Timeout               | Cancela la petición y propone reintentar                      |
| 400                   | Pide revisar la pregunta                                      |
| 401 / 403             | Pide revisar la configuración de acceso                       |
| 429                   | Sugiere esperar y volver a intentar, sin reintento automático |
| 500 / 503             | Informa indisponibilidad temporal                             |
| JSON/esquema inválido | Explica que la respuesta no pudo leerse                       |
| Configuración ausente | Indica contactar al administrador                             |

Todos muestran «Reintentar pregunta» y «Escribir otra pregunta». No se muestran detalles técnicos del servidor. Reintentar conserva el ID y no duplica el mensaje local. El servidor debe considerar que un timeout puede ocurrir después de procesar una solicitud: este contrato no garantiza idempotencia.

El mock no consulta normas vigentes ni proporciona cifras tributarias. Sus respuestas están rotuladas como demostración. Consulta [pantallas y estados](docs/pantallas.md) para la verificación manual.

## Git y GitHub

El desarrollo vive en `develop`. `main` contiene solo el commit inicial vacío. La identidad Git se configura únicamente en este repositorio. No se desplegó ni se hizo merge.

GitHub CLI no tenía sesión iniciada durante la construcción. Cuando Sebas tenga `gh` autenticado con su cuenta, ejecutar desde esta carpeta:

```powershell
gh auth status
gh repo create piter-ai-front --private --source=. --remote=origin
git push -u origin main
git push -u origin develop
gh pr create --base main --head develop --title "feat: frontend PiterAi" --body-file docs/pr-description.md
```

Si el nombre ya existe en la cuenta, elige un nombre nuevo en `gh repo create`. No hacer merge; la revisión y aprobación corresponde a Sebas. Para alojamiento futuro, el servidor debe dirigir rutas SPA como `/inicio` y el alias `/chat` a `index.html`.
