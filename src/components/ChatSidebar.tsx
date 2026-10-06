import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  MessageSquare,
  Plus,
  ShieldCheck,
  X,
} from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
export default function ChatSidebar({
  open,
  onClose,
  onReset,
}: {
  open: boolean;
  onClose: () => void;
  onReset: () => void;
}) {
  const panel = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const focusable = () =>
      Array.from(
        panel.current?.querySelectorAll<HTMLElement>(
          'a, button, select, [tabindex="0"]',
        ) ?? [],
      ).filter((element) => element.getClientRects().length > 0);
    focusable()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (
        event.key !== "Tab" ||
        !window.matchMedia("(max-width: 900px)").matches
      )
        return;
      const items = focusable();
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open, onClose]);
  return (
    <>
      <aside
        ref={panel}
        id="chat-sidebar"
        className={open ? "sidebar visible" : "sidebar"}
        aria-label="Menú del asistente"
        role={open ? "dialog" : undefined}
        aria-modal={open ? true : undefined}
      >
        <div className="sidebar-brand">
          <Logo />
          <button
            className="icon-button sidebar-close"
            onClick={() => onClose()}
            aria-label="Cerrar menú"
          >
            <X />
          </button>
        </div>
        <button className="new-chat" onClick={onReset}>
          <Plus size={19} /> Nueva conversación
        </button>
        <p className="sidebar-label">TU ESPACIO TRIBUTARIO</p>
        <div className="sidebar-active">
          <MessageSquare size={18} /> Asistente PiterAi{" "}
          <ChevronRight size={15} />
        </div>
        <div className="sidebar-help">
          <div className="help-icon">
            <BookOpen size={23} />
          </div>
          <h3>Una duda a la vez.</h3>
          <p>Comienza con una pregunta. Te ayudamos a darle claridad.</p>
          <Link to="/inicio">
            Conoce PiterAi <ArrowRight size={15} />
          </Link>
        </div>
        <div className="sidebar-bottom">
          <ShieldCheck size={18} />
          <p>
            Comparte tu contexto,
            <br />
            <strong>protege tus datos personales.</strong>
          </p>
        </div>
        <div className="sidebar-theme">
          <ThemeToggle />
          <span>Elige tu tema</span>
        </div>
      </aside>
      {open && (
        <button
          className="sidebar-overlay"
          onClick={() => onClose()}
          aria-label="Cerrar menú lateral"
        />
      )}
    </>
  );
}
