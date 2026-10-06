import type { RefObject } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Message, ChatStatus } from "../types/chat";
export default function MessageList({
  messages,
  status,
  error,
  bottom,
  onRetry,
  onDiscard,
}: {
  messages: Message[];
  status: ChatStatus;
  error: string;
  bottom: RefObject<HTMLDivElement | null>;
  onRetry: () => void;
  onDiscard: () => void;
}) {
  return (
    <div className="messages">
      {messages.map((message) => (
        <article
          key={message.id}
          className={`message ${message.role}`}
          aria-label={
            message.role === "user" ? "Tu pregunta" : "Respuesta de PiterAi"
          }
        >
          {message.role === "assistant" && (
            <div className="message-avatar">
              <img src="/brand/icon-light.png" alt="" />
            </div>
          )}
          <div className="message-body">
            <span className="message-author">
              {message.role === "user" ? "Tú" : "PiterAi"}
            </span>
            <p>
              {message.content}
              {message.role === "assistant" &&
                status === "typing" &&
                message.id === messages.at(-1)?.id && (
                  <span className="typing-cursor" aria-hidden="true" />
                )}
            </p>
          </div>
        </article>
      ))}
      {status === "loading" && (
        <div className="loading" role="status">
          <Sparkles size={18} />
          <span>PiterAi está preparando tu respuesta</span>
          <span className="loading-dots" aria-hidden="true">
            •••
          </span>
        </div>
      )}
      {status === "error" && (
        <div className="error-card" role="alert">
          <strong>No pudimos responder esta vez</strong>
          <p>{error}</p>
          <button onClick={onRetry}>
            Reintentar pregunta <ArrowRight size={15} />
          </button>
          <button className="discard-error" onClick={onDiscard}>
            Escribir otra pregunta
          </button>
        </div>
      )}
      <div ref={bottom} />
    </div>
  );
}
