// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation, useNavigationType } from "react-router-dom";
import { afterEach, expect, it } from "vitest";
import App from "./App";
import Logo from "./components/Logo";
import ThemeToggle from "./components/ThemeToggle";
import { fireEvent } from "@testing-library/react";
afterEach(cleanup);
it("el tono explícito del logo prevalece al cambiar de tema", () => {
  render(
    <MemoryRouter>
      <Logo tone="on-light" />
      <Logo tone="on-dark" />
      <ThemeToggle />
    </MemoryRouter>,
  );
  const sources = () =>
    screen.getAllByRole("img").map((image) => image.getAttribute("src"));
  expect(sources()).toEqual([
    "/brand/logo-horizontal.png",
    "/brand/logo-horizontal-white.png",
  ]);
  fireEvent.click(screen.getByRole("button"));
  expect(sources()).toEqual([
    "/brand/logo-horizontal.png",
    "/brand/logo-horizontal-white.png",
  ]);
});
function LocationProbe() {
  const location = useLocation();
  const type = useNavigationType();
  return (
    <output data-testid="route">
      {location.pathname}:{type}
    </output>
  );
}
it("redirige /chat a la landing con replace y mantiene Funciones visible", async () => {
  render(
    <MemoryRouter initialEntries={["/chat"]}>
      <App />
      <LocationProbe />
    </MemoryRouter>,
  );
  await waitFor(() =>
    expect(screen.getByTestId("route").textContent).toBe("/:REPLACE"),
  );
  expect(
    screen.getByRole("heading", { name: /Hola, soy PiterAi/ }),
  ).toBeTruthy();
  expect(
    screen.getByRole("link", { name: "Funciones" }).getAttribute("href"),
  ).toBe("/inicio");
  expect(document.title).toBe("Asistente tributario · PiterAi");
});
it("presenta funciones en /inicio con CTAs al chat", () => {
  render(
    <MemoryRouter initialEntries={["/inicio"]}>
      <App />
    </MemoryRouter>,
  );
  expect(
    screen
      .getByRole("link", { name: "Resuelve tu primera duda" })
      .getAttribute("href"),
  ).toBe("/");
  expect(document.title).toBe("Funciones · PiterAi");
});
