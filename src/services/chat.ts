import { ApiError } from "./errors";
import { postJson } from "./http";
import {
  mockChat,
  type ChatRequest,
  type ChatResponse,
  type MockScenario,
} from "./mock";
export const isMock = import.meta.env.VITE_USE_MOCK !== "false";
export async function sendMessage(
  request: ChatRequest,
  scenario: MockScenario,
  signal?: AbortSignal,
): Promise<ChatResponse> {
  if (isMock) return mockChat(request, scenario, signal);
  const result = await postJson("/chat", request, signal);
  if (
    !result ||
    typeof result !== "object" ||
    !("reply" in result) ||
    typeof result.reply !== "string" ||
    !result.reply.trim() ||
    !("conversation_id" in result) ||
    typeof result.conversation_id !== "string" ||
    !result.conversation_id.trim()
  )
    throw new ApiError("INVALID_RESPONSE", "Formato de respuesta inválido");
  return { reply: result.reply, conversation_id: result.conversation_id };
}
