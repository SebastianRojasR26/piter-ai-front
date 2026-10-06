# Pantallas y estados

- `/`: landing del chat, con marca, enlace a Funciones, tema, badge de modo, menú lateral, sugerencias, composer abajo y aviso profesional visible.
- `/inicio`: Home con presentación, ejemplo de conversación, funciones, pasos y CTA hacia `/`.
- `/chat`: redirección a `/` mediante `Navigate replace`, sin crear otra entrada de historial.
- Otras rutas: página de ruta no encontrada con acceso al asistente.

## Estados del chat

- Vacío: saludo y cuatro preguntas sugeridas.
- Cargando: indicador mientras se espera la API; envío bloqueado para evitar solicitudes simultáneas.
- Escribiendo: respuesta progresiva local después de recibir el JSON; no es streaming del servidor.
- Respuesta: texto plano, seguro, con saltos de línea; lector de pantalla recibe la respuesta completa al terminar.
- Error: mensaje en español, reintento del mismo turno sin duplicar la pregunta, o botón para escribir otra pregunta.
- Nueva conversación: cancela la solicitud/escritura actual y reinicia el ID. El historial solo vive en memoria, no se persiste al recargar.
- Móvil: menú lateral desplegable y composición adaptada al ancho disponible.
- Movimiento reducido: muestra la respuesta completa y desactiva las animaciones.

## Verificación manual

1. Abrir `/`, enviar con Enter y comprobar saltos de línea con Shift + Enter.
2. En «Controles de demostración», seleccionar cada error y enviar una pregunta.
3. Seleccionar «Normal» y reintentar: debe aparecer una respuesta sin duplicar la pregunta.
4. Pulsar «Nueva conversación» durante carga o escritura: la respuesta anterior no debe reaparecer.
5. Verificar `/` y `/inicio` en 375, 768 y 1280 px, temas oscuro/claro, teclado, foco visible y movimiento reducido. Capturas en `tmp/themes/`.
6. Con mock desactivado, comprobar un backend que respete el contrato y su configuración CORS.
7. Comprobar `/chat` → `/`, logo → `/` y Funciones/Conoce PiterAi → `/inicio`.
8. Cambiar tema desde ambos headers y menú móvil; recargar y comprobar persistencia, logo, meta theme-color, preferencia de sistema y funcionamiento con almacenamiento bloqueado.

## Tema

Claro y oscuro comparten todas las pantallas y estados. El header de chat mantiene Funciones y el toggle visibles en móvil, con el badge en una segunda fila para evitar overflow. El menú móvil permite Escape, ciclo de foco y regreso al botón de apertura. Tokens y contrastes: [design-tokens.md](design-tokens.md).
