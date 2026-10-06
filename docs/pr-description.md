PiterAi abre el asistente tributario directamente en `/` y presenta sus funciones en `/inicio`. El alias `/chat` redirige con replace. Logos y CTAs llevan a la landing; el header del chat permite abrir Funciones en escritorio y móvil.

Los headers y el menú móvil incorporan modo claro/oscuro persistente, preferencia del sistema, inicialización antes de pintar y logos por tema. Los colores se concentran en tokens semánticos, conectados a Tailwind y documentados con ratios AA. El modo oscuro conserva la composición de marca y el claro adapta superficies, texto, menú y controles. Pantallas y componentes están separados; el composer respeta dvh/safe-area.

Las llamadas al backend se concentran en `src/services/`, con URL por entorno, token opcional, timeout y validación de respuesta. El modo de demostración funciona sin backend e incluye controles reproducibles de errores. Se documentan instalación, estados y contrato OpenAPI.

Validación: lint, typecheck, 25 pruebas de servicios/tema/rutas y build. Revisión Playwright de ambas rutas en ambos temas a 375/768/1280 px, incluidos chat vacío, carga, respuesta y error, reintento, cancelación, persistencia y redirección. Capturas en tmp ignorado. El backend real y la autenticación final requieren integración. Sin push, despliegue ni merge.
