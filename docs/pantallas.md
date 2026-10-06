# Pantallas y estados

- `/`: Home con presentación, ejemplo ilustrativo de conversación, funciones, pasos y CTA al chat.
- `/chat`: asistente con menú lateral, sugerencias, formulario fijo abajo y aviso profesional visible.
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

1. Abrir `/chat`, enviar con Enter y comprobar saltos de línea con Shift + Enter.
2. En «Controles de demostración», seleccionar cada error y enviar una pregunta.
3. Seleccionar «Normal» y reintentar: debe aparecer una respuesta sin duplicar la pregunta.
4. Pulsar «Nueva conversación» durante carga o escritura: la respuesta anterior no debe reaparecer.
5. Verificar ambas rutas en 375 px, teclado, foco visible y preferencia de movimiento reducido.
6. Con mock desactivado, comprobar un backend que respete el contrato y su configuración CORS.
