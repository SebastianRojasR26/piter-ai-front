import type { RefObject } from "react";
import { ArrowUp } from "lucide-react";
import type { ChatStatus } from "../types/chat";
export default function Composer({
  draft,
  setDraft,
  status,
  busy,
  input,
  submit,
}: {
  draft: string;
  setDraft: (draft: string) => void;
  status: ChatStatus;
  busy: boolean;
  input: RefObject<HTMLTextAreaElement | null>;
  submit: (question: string) => Promise<void>;
}) {
  return (
    <form
      className="composer"
      onSubmit={(event) => {
        event.preventDefault();
        void submit(draft);
      }}
    >
      <label className="sr-only" htmlFor="question">
        Tu pregunta tributaria
      </label>
      <textarea
        id="question"
        ref={input}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            !event.shiftKey &&
            !event.nativeEvent.isComposing
          ) {
            event.preventDefault();
            void submit(draft);
          }
        }}
        placeholder="Escribe tu pregunta tributaria…"
        rows={2}
        maxLength={4000}
        disabled={busy || status === "error"}
      />
      <div className="composer-bottom">
        <span>
          {busy
            ? "Preparando tu respuesta…"
            : status === "error"
              ? "Reintenta o elige escribir otra pregunta"
              : "Enter para enviar · Shift + Enter para un salto"}{" "}
          {draft.length > 3500 && `· ${draft.length}/4000`}
        </span>
        <button
          type="submit"
          aria-label="Enviar pregunta"
          disabled={!draft.trim() || busy || status === "error"}
        >
          <ArrowUp size={21} />
        </button>
      </div>
    </form>
  );
}
