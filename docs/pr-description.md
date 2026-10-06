PiterAi incorpora una Home y un asistente tributario en español con la identidad visual oficial. El chat permite preguntas libres, sugerencias, respuestas con efecto de escritura, cancelación al iniciar una conversación y errores con reintento.

Las llamadas al backend se concentran en `src/services/`, con URL por entorno, token opcional, timeout y validación de respuesta. El modo de demostración funciona sin backend e incluye controles reproducibles de errores. Se documentan instalación, estados y contrato OpenAPI.

Validación: instalación npm, servidor Vite, build, lint, typecheck, pruebas de servicios y revisión del chat en escritorio/móvil. El backend real y la autenticación final requieren integración. Sin despliegue ni merge.
