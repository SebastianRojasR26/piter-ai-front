import { ApiError } from './errors';
export type MockScenario = 'normal' | 'network' | 'timeout' | '400' | '401' | '429' | '500' | '503';
export type ChatRequest = { message: string; conversation_id: string | null };
export type ChatResponse = { reply: string; conversation_id: string };
export async function mockChat(request: ChatRequest, scenario: MockScenario = 'normal', signal?: AbortSignal): Promise<ChatResponse> {
  const latency = Number(import.meta.env.VITE_MOCK_LATENCY_MS ?? 900);
  await new Promise<void>((resolve, reject) => {
    const abort = () => { clearTimeout(timer); reject(new ApiError('CANCELLED', 'Solicitud cancelada')); };
    const timer = setTimeout(() => { signal?.removeEventListener('abort', abort); resolve(); }, Number.isFinite(latency) ? Math.max(0, latency) : 900);
    signal?.addEventListener('abort', abort, { once: true });
    if (signal?.aborted) { signal.removeEventListener('abort', abort); abort(); }
  });
  const rate = Math.min(1, Math.max(0, Number(import.meta.env.VITE_MOCK_ERROR_RATE ?? 0) || 0));
  const outcome = scenario === 'normal' && Math.random() < rate ? '503' : scenario;
  if (outcome !== 'normal') throw new ApiError(outcome === 'network' ? 'NETWORK' : outcome === 'timeout' ? 'TIMEOUT' : 'MOCK_ERROR', 'Error simulado', /^\d+$/.test(outcome) ? Number(outcome) : undefined);
  const message = request.message.toLocaleLowerCase('es');
  let reply = 'Vamos paso a paso. Para orientar esta consulta, conviene identificar tu actividad económica, el tipo de contribuyente y el año al que se refiere tu pregunta.\n\nCuéntame un poco más sobre tu situación y qué necesitas entender. Evita compartir tu número de identificación, contraseñas o información financiera privada.';
  if (/renta|declar/.test(message)) reply = 'Entender tu declaración de renta empieza por organizar tu información.\n\n1. Identifica el año gravable que quieres revisar.\n2. Reúne tus certificados de ingresos, retenciones y la información de tu patrimonio.\n3. Revisa los requisitos y topes aplicables a ese año en la información oficial de la DIAN.\n\nDeclarar y pagar son cosas distintas: presentar una declaración no significa necesariamente que debas pagar un impuesto.\n\n¿Tu consulta es como persona natural o como empresa?';
  else if (/rut/.test(message)) reply = 'El RUT es el Registro Único Tributario: reúne la información con la que la DIAN identifica tu actividad y responsabilidades tributarias.\n\nPuedes revisar tu RUT para confirmar que tus datos y actividad económica reflejen tu situación actual. Los trámites y requisitos dependen de lo que necesites actualizar.\n\n¿Quieres entender qué es el RUT, inscribirte o actualizar un dato?';
  else if (/iva/.test(message)) reply = 'El IVA es un impuesto asociado al consumo de determinados bienes y servicios. Su aplicación depende de la operación y de las responsabilidades tributarias de quien la realiza.\n\nPara revisar tu caso, necesitamos saber qué vendes o qué servicio prestas y si consultas como persona natural o empresa.\n\n¿A qué actividad se refiere tu pregunta?';
  else if (/reten/.test(message)) reply = 'La retención en la fuente es un mecanismo de recaudo anticipado de impuestos. Su aplicación depende del tipo de pago, de las partes que intervienen y de las reglas del periodo correspondiente.\n\nPara orientarte, cuéntame si se trata de un salario, un servicio o una compra. No compartas datos personales sensibles.';
  return { reply: `Respuesta de demostración · No consulta normas en tiempo real.\n\n${reply}`, conversation_id: request.conversation_id ?? crypto.randomUUID() };
}
