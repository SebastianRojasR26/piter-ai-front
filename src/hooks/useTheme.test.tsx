// @vitest-environment jsdom
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const media = {
  matches: false,
  media: "(prefers-color-scheme: light)",
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
};
vi.stubGlobal(
  "matchMedia",
  vi.fn(() => media),
);
const { useTheme, THEME_KEY } = await import("./useTheme");
function Probe() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme}</button>;
}
function refreshPreference() {
  act(() => {
    window.dispatchEvent(new StorageEvent("storage", { key: THEME_KEY }));
  });
}
beforeEach(() => {
  localStorage.clear();
  media.matches = false;
  document.head.innerHTML = '<meta name="theme-color" content="">';
  document.documentElement.style.setProperty("--theme-color", "#0a1738");
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
describe("useTheme", () => {
  it("usa oscuro sin una preferencia clara del sistema", () => {
    render(<Probe />);
    refreshPreference();
    expect(screen.getByRole("button").textContent).toBe("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.documentElement.style.colorScheme).toBe("dark");
  });
  it("aplica la preferencia guardada sobre la del sistema y actualiza meta", () => {
    localStorage.setItem(THEME_KEY, "dark");
    media.matches = true;
    render(<Probe />);
    refreshPreference();
    expect(screen.getByRole("button").textContent).toBe("dark");
    expect(document.querySelector("meta")?.content).toBe("#0a1738");
  });
  it("ignora valores guardados inválidos y sigue el sistema", () => {
    localStorage.setItem(THEME_KEY, "invalid");
    media.matches = true;
    render(<Probe />);
    refreshPreference();
    expect(screen.getByRole("button").textContent).toBe("light");
  });
  it("sincroniza varios consumidores y conserva el cambio", () => {
    render(
      <>
        <Probe />
        <Probe />
      </>,
    );
    refreshPreference();
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(
      screen
        .getAllByRole("button")
        .every((button) => button.textContent === "light"),
    ).toBe(true);
    expect(localStorage.getItem(THEME_KEY)).toBe("light");
  });
  it("funciona cuando leer o escribir localStorage falla", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    render(<Probe />);
    refreshPreference();
    fireEvent.click(screen.getByRole("button"));
    expect(document.documentElement.dataset.theme).toBe("light");
  });
  it("escucha cambios de sistema solo sin preferencia explícita", () => {
    render(<Probe />);
    refreshPreference();
    const listener = media.addEventListener.mock.calls.at(-1)?.[1];
    act(() => {
      media.matches = true;
      listener();
    });
    expect(screen.getByRole("button").textContent).toBe("light");
    fireEvent.click(screen.getByRole("button"));
    act(() => {
      media.matches = true;
      listener();
    });
    expect(screen.getByRole("button").textContent).toBe("dark");
  });
  it("retira los listeners al desmontar el último consumidor", () => {
    const { unmount } = render(<Probe />);
    const handler = media.addEventListener.mock.calls.at(-1)?.[1];
    unmount();
    expect(media.removeEventListener).toHaveBeenCalledWith("change", handler);
  });
});
