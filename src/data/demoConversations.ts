import type { Message } from "../types/chat";

export const demoConversations: {
  id: string;
  title: string;
  messages: Message[];
}[] = [
  {
    id: "renta",
    title: "Declarar y pagar renta",
    messages: [
      {
        id: "renta-user",
        role: "user",
        content: "¿Declarar renta significa que debo pagar?",
      },
      {
        id: "renta-answer",
        role: "assistant",
        content:
          "Ejemplo de demostración · No consulta normas en tiempo real.\n\nDeclarar y pagar son cosas distintas. La declaración organiza la información de tu situación tributaria; el resultado puede o no incluir un impuesto a pagar.\n\nRevisa el año gravable y la información oficial aplicable con un contador.",
      },
      {
        id: "renta-followup",
        role: "user",
        content: "¿Cómo organizo la información para revisarla?",
      },
      {
        id: "renta-next",
        role: "assistant",
        content:
          "Ejemplo de demostración.\n\nPuedes empezar por tus certificados de ingresos y retenciones, y por organizar la información de tu patrimonio. Evita compartir documentos o datos personales aquí. Un profesional puede ayudarte a revisar lo que corresponde a tu caso.",
      },
    ],
  },
  {
    id: "rut",
    title: "Entender mi RUT",
    messages: [
      { id: "rut-user", role: "user", content: "¿Para qué sirve el RUT?" },
      {
        id: "rut-answer",
        role: "assistant",
        content:
          "Ejemplo de demostración · No consulta normas en tiempo real.\n\nEl Registro Único Tributario reúne información sobre tu actividad y responsabilidades tributarias. Te ayuda a identificar qué datos debes revisar cuando cambia tu situación.\n\nPara trámites y requisitos vigentes, consulta los canales oficiales de la DIAN.",
      },
    ],
  },
  {
    id: "retenciones",
    title: "Una retención en mi pago",
    messages: [
      {
        id: "ret-user",
        role: "user",
        content: "¿Por qué aparece una retención en mi pago?",
      },
      {
        id: "ret-answer",
        role: "assistant",
        content:
          "Ejemplo de demostración · No consulta normas en tiempo real.\n\nLa retención en la fuente es un mecanismo de recaudo anticipado. Para entenderla, conviene identificar el tipo de pago y el periodo de la operación.\n\nNo es suficiente ver el descuento para determinar cómo aplica a tu caso: revisa el soporte con un profesional.",
      },
    ],
  },
];
