import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UsuariosList from "./usuarioslist";

describe("UsuariosList", () => {
  const mockUsuarios = [
    { _id: "1", name: "Astrid", email: "astrid@mail.com" },
    { _id: "2", name: "Jose", email: "jose@mail.com" },
    { _id: "3", name: "Daniel",email: "daniel@mail.com" },
  ];

  const mockOnEdit = jest.fn();
  const mockOnDeleted = jest.fn();

  beforeEach(() => {
    window.alert = jest.fn();
    window.confirm = jest.fn(() => true);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );
  });

  test("muestra toda la lista de Usuarios en la tabla", () => {
    render(
      <UsuariosList
        Usuarios={mockUsuarios} 
        onEdit={mockOnEdit}
        onDeleted={mockOnDeleted}
      />
    );

    expect(screen.getByText(/Lista de Usuarios/i)).toBeInTheDocument();

    mockUsuarios.forEach((usuario) => {
      expect(screen.getByText(usuario.name)).toBeInTheDocument();
      expect(screen.getByText(usuario.email)).toBeInTheDocument();
    });

    const filas = screen.getAllByRole("row");
    expect(filas.length - 1).toBe(mockUsuarios.length);
  });

  test("llama a onEdit cuando se hace click en Editar", () => {
    render(
      <UsuariosList
        Usuarios={mockUsuarios}
        onEdit={mockOnEdit}
        onDeleted={mockOnDeleted}
      />
    );

    fireEvent.click(screen.getAllByText("Editar")[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(mockUsuarios[0]);
  });

  test("elimina un usuario y llama a onDeleted", async () => {
    render(
      <UsuariosList
        Usuarios={mockUsuarios}
        onEdit={mockOnEdit}
        onDeleted={mockOnDeleted}
      />
    );

    fireEvent.click(screen.getAllByText("Eliminar")[0]);

    expect(window.confirm).toHaveBeenCalled();

    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:3000/api/usuarios/${mockUsuarios[0]._id}`,
      { method: "DELETE" }
    );

    await waitFor(() => {
      expect(mockOnDeleted).toHaveBeenCalled();
    });
  });
});

