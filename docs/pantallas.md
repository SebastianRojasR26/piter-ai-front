# Pantallas y estados

- `/`: landing del chat, con marca, enlace a Funciones, tema, badge de modo, menú lateral, sugerencias, composer abajo y aviso profesional visible.
- `/inicio`: Home rediseñada con estética editorial y la paleta del brandboard (teal, petróleo y azules), con superficies claras derivadas en modo claro. Incluye hero, conversación ilustrativa, beneficios, pasos, cuatro planes con precios y límites publicados, FAQ desplegable y CTAs hacia `/`. Navegación por anclas y menú móvil. No hay enlaces externos, pagos ni activación de planes; se explican los límites del chat de prueba.
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

Claro y oscuro comparten todas las pantallas y estados. Todo el chat, incluido header, mensajes, controles y composer, cambia de tema. En escritorio mide 76 px, alineado con la marca lateral, y muestra «Asistente tributario» + chip Colombia; el único logo está en la barra lateral. Hasta 900 px el logo del header acompaña el tema. Funciones y el toggle siguen visibles, con el badge en una segunda fila en móvil para evitar overflow. Capturas de vacío, respuesta y error en `tmp/header/` a 375/768/1280 px, ambos temas. El menú móvil permite Escape, ciclo de foco y regreso al botón de apertura. Tokens y contrastes: [design-tokens.md](design-tokens.md).

Entradas animadas de bienvenida, tarjetas, mensajes y errores; hover y pulsación en botones; apertura del menú. Todas se desactivan con movimiento reducido.

## Ejemplos y cupo local

La barra lateral del chat en mock ofrece tres conversaciones precargadas: renta, RUT y retenciones. Abrir un ejemplo cancela solicitudes/escritura pendientes, muestra mensajes ilustrativos y no consume consultas. Se puede continuar la conversación usando el mock habitual.

El cupo empieza en 5 consultas por visita al chat. Solo una respuesta correcta descuenta una consulta; errores y solicitudes canceladas no consumen. Nueva conversación y ejemplos no reponen el cupo. Al llegar a cero se desactiva el envío y se ofrece reiniciar el cupo de prueba. Al recargar o volver a montar la pantalla también se reinicia; no representa facturación ni un límite real del backend. En modo API estos controles no aparecen.

La cabecera de la Home es sticky y las anclas conservan espacio superior para que los títulos no queden debajo. El header del chat permanece visible mientras solo se desplaza el área de mensajes.

## Auditoría puntual de la landing

Los botones de temas abren `/` con una pregunta en el composer mediante estado de navegación; no envían ni descuentan cupo hasta confirmar. La cabecera usa transparencia y blur de 18px, con sombra solo después de 8px de scroll. Fondo sólido con transparencia reducida; borde definido con contraste aumentado. El nav tiene 44px de alto mínimo.

Eyebrows/metadatos: mínimo 12px; avisos legales: 13px, usando los tokens con contraste AA. Los planes comparan cantidades reales (10 frente a 5 y 100 frente a 10); no se añaden prestaciones. El logo conserva su marca gráfica recortando el lema incrustado y representa «Tu impulso tributario» como texto editable. Los eyebrows usan text-transform para mayúsculas.

Pulsación de CTAs: scale(0.97), 100ms ease-out; elevación hover solo con puntero que admite hover. Movimiento reducido elimina transformaciones. Verificación en `tmp/audit-{tema}-{390|1440}.png`, pruebas de temas en `App.test.tsx` y controles manuales de transparencia/contraste.
