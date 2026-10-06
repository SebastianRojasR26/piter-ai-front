import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { isMock } from "../services/chat";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
export default function ChatHeader({
  sidebarOpen,
  onOpenSidebar,
}: {
  sidebarOpen: boolean;
  onOpenSidebar: () => void;
}) {
  return (
    <header className="chat-header">
      <div className="chat-brand">
        <button
          className="icon-button chat-menu"
          aria-label="Abrir menú"
          aria-expanded={sidebarOpen}
          aria-controls="chat-sidebar"
          onClick={onOpenSidebar}
        >
          <Menu size={21} />
        </button>
        <Logo />
        <span className="colombia">Colombia</span>
      </div>
      <div className="chat-header-actions">
        <Link
          to="/inicio"
          className="functions-link inline-flex min-h-11 items-center font-medium"
        >
          Funciones
        </Link>
        <ThemeToggle />
      </div>
      <div className="mode-badge">
        <span className="dot" />
        {isMock ? "Modo demostración" : "Modo API"}
      </div>
    </header>
  );
}
