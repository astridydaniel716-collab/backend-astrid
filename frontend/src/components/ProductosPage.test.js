import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductosPage from "./ProductosPage";

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
      json: () => Promise.resolve({ name: "Alfajores" }),
    });
  });
  // MOCK DE ALERT
  window.alert = jest.fn();
});

describe("ProductosPage", () => {

    test("permite escribir en el formulario", async () => {
    render(<ProductosPage />);

    const inputname = await screen.findByPlaceholderText("Nombre de producto");
    const inputprice = screen.getByPlaceholderText("Precio");
    const inputdescription = screen.getByPlaceholderText("Descripción");

    fireEvent.change(inputname, { target: { value: "Alfajores" } });
    fireEvent.change(inputprice, { target: { value: "2500" } });
    fireEvent.change(inputdescription, { target: { value: "rellenos con arequipe" } });

    expect(inputname.value).toBe("Alfajores");
    expect(inputprice.value).toBe("2500");
    expect(inputdescription.value).toBe("rellenos con arequipe");
  });

  test("envía el formulario", async () => {
    render(<ProductosPage />);

    const inputname = await screen.findByPlaceholderText("Nombre de producto");
    const inputprice = screen.getByPlaceholderText("Precio");
    const inputdescription = screen.getByPlaceholderText("Descripción");

    fireEvent.change(inputname, { target: { value: "Alfajores" } });
    fireEvent.change(inputprice, { target: { value: "2500"} });
    fireEvent.change(inputdescription, { target: { value: "rellenos con arequipe"} });

    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

});


