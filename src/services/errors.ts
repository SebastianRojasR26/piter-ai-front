export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
export function friendlyError(error: unknown): string {
  if (!(error instanceof ApiError))
    return "Ocurrió un problema inesperado. Inténtalo de nuevo.";
  if (error.code === "TIMEOUT")
    return "La respuesta está tardando más de lo esperado. Inténtalo de nuevo.";
  if (error.code === "NETWORK")
    return "No pudimos conectar. Revisa tu conexión e inténtalo de nuevo.";
  if (error.code === "CONFIG")
    return "El servicio aún no está configurado. Contacta al administrador.";
  if (error.status === 400)
    return "No pudimos procesar tu pregunta. Revisa el texto e inténtalo de nuevo.";
  if (error.status === 401 || error.status === 403)
    return "No tienes acceso al servicio. Revisa la configuración de acceso.";
  if (error.status === 429)
    return "Hay muchas consultas en este momento. Espera un poco y vuelve a intentar.";
  if (error.status && error.status >= 500)
    return "PiterAi no está disponible en este momento. Inténtalo de nuevo en unos minutos.";
  return "No pudimos leer la respuesta del servicio. Inténtalo de nuevo.";
}
