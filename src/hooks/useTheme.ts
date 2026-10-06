import { useSyncExternalStore } from "react";
export type Theme = "dark" | "light";
export const THEME_KEY = "piterai-theme";
const isTheme = (value: unknown): value is Theme =>
  value === "dark" || value === "light";
function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return isTheme(value) ? value : null;
  } catch {
    return null;
  }
}
function systemTheme(): Theme {
  return typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}
let preference = storedTheme();
let theme: Theme = preference ?? systemTheme();
const listeners = new Set<() => void>();
const media =
  typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: light)")
    : null;
function applyTheme() {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue("--theme-color")
    .trim();
  if (color)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", color);
}
function update(next: Theme) {
  theme = next;
  applyTheme();
  listeners.forEach((listener) => listener());
}
function onSystemChange() {
  if (!preference) update(systemTheme());
}
function onStorage(event: StorageEvent) {
  if (event.key !== THEME_KEY && event.key !== null) return;
  preference = storedTheme();
  update(preference ?? systemTheme());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    media?.addEventListener("change", onSystemChange);
    window.addEventListener("storage", onStorage);
    applyTheme();
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      media?.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorage);
    }
  };
}
export function useTheme() {
  const current = useSyncExternalStore(
    subscribe,
    () => theme,
    () => "dark" as Theme,
  );
  function setTheme(next: Theme) {
    preference = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* Permanece en memoria. */
    }
    update(next);
  }
  return {
    theme: current,
    setTheme,
    toggleTheme: () => setTheme(current === "dark" ? "light" : "dark"),
  };
}
