import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="header-inner">
        <Logo />
        <div className="header-actions">
          <nav
            id="navigation"
            className={open ? "navigation open" : "navigation"}
            aria-label="Navegación principal"
          >
            <NavLink to="/inicio" onClick={() => setOpen(false)}>
              Funciones
            </NavLink>
            <NavLink to="/" end onClick={() => setOpen(false)}>
              Asistente tributario
            </NavLink>
            <Link className="button small" to="/">
              Hablemos <ArrowRight size={16} />
            </Link>
          </nav>
          <ThemeToggle />
          <button
            className="icon-button menu-toggle"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
