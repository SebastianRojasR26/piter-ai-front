import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const label =
    theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro";
  return (
    <button
      type="button"
      className="theme-toggle inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border bg-surface-2 text-text transition-colors hover:bg-surface disabled:opacity-50"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      aria-pressed={theme === "dark"}
    >
      {theme === "dark" ? (
        <Sun size={19} aria-hidden="true" />
      ) : (
        <Moon size={19} aria-hidden="true" />
      )}
    </button>
  );
}
