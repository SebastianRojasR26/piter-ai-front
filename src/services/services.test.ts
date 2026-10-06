import { afterEach, describe, expect, it, vi } from "vitest";
import { postJson } from "./http";
import { ApiError, friendlyError } from "./errors";
import { mockChat } from "./mock";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});
describe("cliente HTTP", () => {
  it("envía conversación y token opcional al backend configurado", async () => {
    vi.stubEnv("VITE_API_URL", "https://api.example.test/");
    vi.stubEnv("VITE_API_TOKEN", "test-token");
    const fetch = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ reply: "Hola", conversation_id: "c1" })),
      );
    vi.stubGlobal("fetch", fetch);
    await expect(
      postJson("/chat", { message: "Hola", conversation_id: null }),
    ).resolves.toEqual({ reply: "Hola", conversation_id: "c1" });
    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.test/chat",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer test-token",
        },
        body: '{"message":"Hola","conversation_id":null}',
      }),
    );
  });
  it("omite autorización si no hay token", async () => {
    vi.stubEnv("VITE_API_URL", "https://api.example.test");
    vi.stubEnv("VITE_API_TOKEN", "");
    const fetch = vi.fn().mockResolvedValue(new Response("{}"));
    vi.stubGlobal("fetch", fetch);
    await postJson("/chat", {});
    expect(fetch.mock.calls[0][1].headers).not.toHaveProperty("Authorization");
  });
  it.each([400, 401, 429, 500, 503])(
    "convierte HTTP %s en un error tipado incluso si no es JSON",
    async (status) => {
      vi.stubEnv("VITE_API_URL", "https://api.example.test");
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(new Response("Error", { status })),
      );
      await expect(postJson("/chat", {})).rejects.toMatchObject({
        status,
        code: "HTTP_ERROR",
      });
      expect(
        friendlyError(new ApiError("HTTP_ERROR", "Detalle privado", status)),
      ).not.toContain("Detalle privado");
    },
  );
  it("distingue red de timeout y cancelación", async () => {
    vi.stubEnv("VITE_API_URL", "https://api.example.test");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new TypeError("fetch failed")),
    );
    await expect(postJson("/chat", {})).rejects.toMatchObject({
      code: "NETWORK",
    });
    vi.useFakeTimers();
    vi.stubEnv("VITE_API_TIMEOUT_MS", "50");
    vi.stubGlobal(
      "fetch",
      vi.fn(
        (_url, options) =>
          new Promise((_resolve, reject) =>
            options.signal.addEventListener("abort", () =>
              reject(new Error("aborted")),
            ),
          ),
      ),
    );
    const pending = postJson("/chat", {});
    const assertion = expect(pending).rejects.toMatchObject({
      code: "TIMEOUT",
    });
    await vi.advanceTimersByTimeAsync(50);
    await assertion;
    const controller = new AbortController();
    const cancelled = postJson("/chat", {}, controller.signal);
    controller.abort();
    await expect(cancelled).rejects.toMatchObject({ code: "CANCELLED" });
  });
  it("rechaza JSON inválido y configuración ausente", async () => {
    vi.stubEnv("VITE_API_URL", "https://api.example.test");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("not json")));
    await expect(postJson("/chat", {})).rejects.toMatchObject({
      code: "INVALID_RESPONSE",
    });
    vi.stubEnv("VITE_API_URL", "");
    await expect(postJson("/chat", {})).rejects.toMatchObject({
      code: "CONFIG",
    });
  });
});
describe("demostración", () => {
  it("conserva conversación y rotula la respuesta", async () => {
    vi.stubEnv("VITE_MOCK_LATENCY_MS", "0");
    vi.stubEnv("VITE_MOCK_ERROR_RATE", "0");
    const result = await mockChat({
      message: "¿Qué es el RUT?",
      conversation_id: "existing",
    });
    expect(result.conversation_id).toBe("existing");
    expect(result.reply).toContain("Respuesta de demostración");
    expect(result.reply).toContain("Registro Único Tributario");
  });
  it.each(["400", "401", "429", "500", "503"] as const)(
    "reproduce el error %s sin depender del azar",
    async (scenario) => {
      vi.stubEnv("VITE_MOCK_LATENCY_MS", "0");
      await expect(
        mockChat({ message: "Hola", conversation_id: null }, scenario),
      ).rejects.toMatchObject({ status: Number(scenario) });
    },
  );
  it("cancela un mock antes de responder", async () => {
    const controller = new AbortController();
    const result = mockChat(
      { message: "Hola", conversation_id: null },
      "normal",
      controller.signal,
    );
    controller.abort();
    await expect(result).rejects.toMatchObject({ code: "CANCELLED" });
  });
});
