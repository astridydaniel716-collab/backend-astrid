import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UsuariosPage from "./UsuariosPage";

beforeEach(() => {
  global.fetch = jest.fn((url, options) => {
    
    // GET productos
    if (!options) {
      return Promise.resolve({
        json: () => Promise.resolve([]),
      });
    }

    // POST o PUT
    return Promise.resolve({
      json: () => Promise.resolve({ name: "Astrid" }),
    });
  });
  // MOCK DE ALERT
  window.alert = jest.fn();
});

describe("UsuariosPage", () => {

  test("renderiza el formulario", async () => {
    render(<UsuariosPage />);

    expect(
      await screen.findByText(/Gestión de Usuarios/i)
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
});

});

test("no envía el formulario si los campos están vacíos", async () => {
  render(<UsuariosPage />);

  fireEvent.click(screen.getByText("Guardar"));

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
  });
});
