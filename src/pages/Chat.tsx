import { useEffect, useRef, useState } from "react";
import { isMock, sendMessage } from "../services/chat";
import { friendlyError } from "../services/errors";
import type { MockScenario } from "../services/mock";
import type { Message, ChatStatus } from "../types/chat";
import ChatSidebar from "../components/ChatSidebar";
import ChatHeader from "../components/ChatHeader";
import ChatWelcome from "../components/ChatWelcome";
import Composer from "../components/Composer";
import MessageList from "../components/MessageList";
import Disclaimer from "../components/Disclaimer";
import { demoConversations } from "../data/demoConversations";
export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [error, setError] = useState("");
  const [scenario, setScenario] = useState<MockScenario>("normal");
  const [sidebar, setSidebar] = useState(false);
  const [available, setAvailable] = useState(5);
  const [activeExample, setActiveExample] = useState<string | null>(null);
  const conversation = useRef<string | null>(null);
  const lastQuestion = useRef("");
  const controller = useRef<AbortController | null>(null);
  const generation = useRef(0);
  const typingTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const busy = status === "loading" || status === "typing";
  useEffect(() => {
    document.title = "Asistente tributario · PiterAi";
    const requestGeneration = generation;
    return () => {
      requestGeneration.current++;
      controller.current?.abort();
      if (typingTimer.current) clearInterval(typingTimer.current);
    };
  }, []);
  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "instant", block: "end" });
  }, [messages, status]);
  function reset() {
    setActiveExample(null);
    generation.current++;
    controller.current?.abort();
    if (typingTimer.current) clearInterval(typingTimer.current);
    setMessages([]);
    setDraft("");
    setStatus("idle");
    setError("");
    conversation.current = null;
    lastQuestion.current = "";
    setSidebar(false);
    input.current?.focus();
  }
  function openExample(id: string) {
    const example = demoConversations.find((item) => item.id === id);
    if (!example) return;
    reset();
    setActiveExample(id);
    setMessages(example.messages.map((message) => ({ ...message })));
  }
  async function submit(question: string, retry = false) {
    const text = question.trim();
    if (
      !text ||
      text.length > 4000 ||
      busy ||
      (isMock && available === 0) ||
      (status === "error" && !retry)
    )
      return;
    const current = ++generation.current;
    controller.current?.abort();
    controller.current = new AbortController();
    lastQuestion.current = text;
    if (!retry) {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "user", content: text },
      ]);
      setDraft("");
    }
    setError("");
    setStatus("loading");
    setSidebar(false);
    try {
      const result = await sendMessage(
        { message: text, conversation_id: conversation.current },
        scenario,
        controller.current.signal,
      );
      if (current !== generation.current) return;
      if (isMock) setAvailable((prev) => Math.max(0, prev - 1));
      conversation.current = result.conversation_id;
      const id = crypto.randomUUID();
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      setMessages((prev) => [
        ...prev,
        { id, role: "assistant", content: reduced ? result.reply : "" },
      ]);
      if (reduced) {
        setStatus("idle");
        return;
      }
      setStatus("typing");
      let position = 0;
      typingTimer.current = setInterval(() => {
        position = Math.min(position + 12, result.reply.length);
        setMessages((prev) =>
          prev.map((message) =>
            message.id === id
              ? { ...message, content: result.reply.slice(0, position) }
              : message,
          ),
        );
        if (position === result.reply.length) {
          if (typingTimer.current) clearInterval(typingTimer.current);
          typingTimer.current = null;
          setStatus("idle");
        }
      }, 20);
    } catch (err) {
      if (current !== generation.current) return;
      setError(friendlyError(err));
      setStatus("error");
    }
  }
  return (
    <div className="chat-shell">
      <ChatSidebar
        open={sidebar}
        onClose={() => setSidebar(false)}
        onReset={reset}
        onExample={isMock ? openExample : undefined}
        activeExample={activeExample}
      />
      <div className="chat-main">
        <ChatHeader
          sidebarOpen={sidebar}
          onOpenSidebar={() => setSidebar(true)}
        />
        <main
          className="chat-content"
          id="conversation"
          aria-label="Conversación con PiterAi"
        >
          {messages.length === 0 ? (
            <ChatWelcome
              busy={busy || (isMock && available === 0)}
              submit={submit}
            />
          ) : (
            <MessageList
              messages={messages}
              status={status}
              error={error}
              bottom={bottom}
              onRetry={() => void submit(lastQuestion.current, true)}
              onDiscard={() => {
                setStatus("idle");
                setError("");
                input.current?.focus();
              }}
            />
          )}
        </main>
        <div className="composer-area">
          {isMock && (
            <div className="demo-quota">
              <p role="status" aria-live="polite">
                <strong>{available} de 5</strong> consultas disponibles{" "}
                <span>· Cupo de demostración</span>
              </p>
              {available === 0 ? (
                <button onClick={() => setAvailable(5)}>
                  Reiniciar cupo de prueba
                </button>
              ) : (
                <span>Los ejemplos no consumen consultas.</span>
              )}
            </div>
          )}
          {isMock && (
            <details className="mock-controls">
              <summary>Controles de demostración</summary>
              <label htmlFor="mock-scenario">Próxima respuesta</label>
              <select
                id="mock-scenario"
                value={scenario}
                disabled={busy}
                onChange={(event) =>
                  setScenario(event.target.value as MockScenario)
                }
              >
                <option value="normal">Normal</option>
                <option value="network">Error de red</option>
                <option value="timeout">Timeout</option>
                {["400", "401", "429", "500", "503"].map((code) => (
                  <option value={code} key={code}>
                    Error HTTP {code}
                  </option>
                ))}
              </select>
              <p>Para reintentar con éxito, selecciona «Normal».</p>
            </details>
          )}
          <Composer
            draft={draft}
            setDraft={setDraft}
            status={status}
            busy={busy}
            exhausted={isMock && available === 0}
            input={input}
            submit={submit}
          />
          <Disclaimer compact />
          <div
            className="sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {status === "loading"
              ? "Preparando respuesta."
              : status === "idle" && messages.at(-1)?.role === "assistant"
                ? messages.at(-1)?.content
                : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
