import { render, screen, fireEvent,waitFor } from "@testing-library/react";
import ProductosList from "./productoslist";

describe("ProductosList", () => {
  const mockProductos = [
    { _id: "1", name: "Alfajores", price: 2500, description: "rellenos con arequipe" },
    { _id: "2", name: "Cupcake Vainilla decorado", price: 6500, description: "Suave y dulce" },
    { _id: "3", name: "Torta 3 leches", price: 13000, description: "Fresca y bien húmeda" },
  ];

  const mockOnEdit = jest.fn();
  const mockOnDeleted = jest.fn();

  beforeEach(() => {
    // Mock de alert y confirm para que no interrumpan las pruebas
    window.alert = jest.fn();
    window.confirm = jest.fn(() => true); // siempre acepta eliminar
    global.fetch = jest.fn((url, options) => {
        if (!options) {
      return Promise.resolve({
        json: () => Promise.resolve(mockProductos),
      })
      }  ;

      return Promise.resolve({
        json: () => Promise.resolve ({}),
      });
    });
});

  test("muestra toda la lista de productos en la tabla", () => {
    render(
      <ProductosList
        Productos={mockProductos}
        onEdit={mockOnEdit}
        onDeleted={mockOnDeleted}
      />
    );

    // Verificamos que el título se muestre
    expect(screen.getByText(/Lista de Productos/i)).toBeInTheDocument();

    // Verificamos que cada producto aparezca en la tabla
    mockProductos.forEach((producto) => {
      expect(screen.getByText(producto.name)).toBeInTheDocument();
      expect(screen.getByText(producto.price.toString())).toBeInTheDocument();
      expect(screen.getByText(producto.description)).toBeInTheDocument();
    });

    // Verificamos que haya 3 filas de productos (tbody > tr)
    const filas = screen.getAllByRole("row"); // incluye el header
    expect(filas.length - 1).toBe(mockProductos.length); // restamos el header
  });

  test("llama a onEdit cuando se hace click en Editar", () => {
    render(
      <ProductosList
        Productos={mockProductos}
        onEdit={mockOnEdit}
        onDeleted={mockOnDeleted}
      />
    );

    // Hacemos click en el primer botón de editar
    fireEvent.click(screen.getAllByText("Editar")[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(mockProductos[0]);
  });

  test("elimina un producto y llama a onDeleted", async () => {
    render(
      <ProductosList
        Productos={mockProductos}
        onEdit={mockOnEdit}
        onDeleted={mockOnDeleted}
      />
    );

    fireEvent.click(screen.getAllByText("Eliminar")[0]);
    // Verifica que confirm se llamó
    expect(window.confirm).toHaveBeenCalled();

    // Verifica que fetch DELETE fue llamado
    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:3000/api/productos/${mockProductos[0]._id}`,
      { method: "DELETE" }
    );

    // Verifica que onDeleted se llamó
     await waitFor(() => {
        expect(mockOnDeleted).toHaveBeenCalled();
        });
      });
    });

   