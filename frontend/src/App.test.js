import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );

  window.alert = jest.fn(); // evita errores si algún componente hace alert
});

describe("Pruebas de navegación", () => {
  
  test("Home: botón Productos navega correctamente", async () => {
    window.history.pushState({}, "", "/");
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: /Productos/i }));
    expect(await screen.findByText(/Gestión de Productos/i)).toBeInTheDocument();
  });

  test("Home: botón Usuarios navega correctamente", async () => {
    window.history.pushState({}, "", "/");
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: /Usuarios/i }));
    expect(await screen.findByText(/Gestión de Usuarios/i)).toBeInTheDocument();
  });
});