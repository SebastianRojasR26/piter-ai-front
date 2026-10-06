import { ApiError } from "./errors";
export async function postJson(
  path: string,
  data: unknown,
  signal?: AbortSignal,
): Promise<unknown> {
  const base = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "");
  if (!base) throw new ApiError("CONFIG", "Falta VITE_API_URL");
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal?.addEventListener("abort", abort, { once: true });
  if (signal?.aborted) controller.abort();
  let timedOut = false;
  const configured = Number(import.meta.env.VITE_API_TIMEOUT_MS);
  const timeout = setTimeout(
    () => {
      timedOut = true;
      controller.abort();
    },
    configured > 0 ? configured : 20000,
  );
  try {
    const token = import.meta.env.VITE_API_TOKEN?.trim();
    const response = await fetch(`${base}${path}`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new ApiError(
        typeof error?.code === "string" ? error.code : "HTTP_ERROR",
        typeof error?.message === "string" ? error.message : "Error HTTP",
        response.status,
      );
    }
    return await response.json().catch(() => {
      throw new ApiError("INVALID_RESPONSE", "Respuesta JSON inválida");
    });
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (timedOut) throw new ApiError("TIMEOUT", "Tiempo de espera agotado");
    if (signal?.aborted) throw new ApiError("CANCELLED", "Solicitud cancelada");
    throw new ApiError("NETWORK", "Error de conexión");
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", abort);
  }
}
