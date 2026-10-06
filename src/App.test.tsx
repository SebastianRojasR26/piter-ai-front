// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation, useNavigationType } from "react-router-dom";
import { afterEach, expect, it } from "vitest";
import App from "./App";
afterEach(cleanup);
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
