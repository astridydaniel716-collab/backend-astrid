// El modelo se simula para aislar el controlador y evitar acceso real a MongoDB.
jest.mock('../models/productos', () => {
  const MockProductos = jest.fn();
  MockProductos.find = jest.fn();
  MockProductos.findById = jest.fn();
  MockProductos.findByIdAndUpdate = jest.fn();
  MockProductos.findByIdAndDelete = jest.fn();
  return MockProductos;
});

const Producto = require('../models/productos');
const productosCtrl = require('../controllers/productos.controller');
const { createResponse } = require('./helpers/httpMocks');

describe('productos.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ GET TODOS
  test('getproducto responde con la lista obtenida del modelo', async () => {
    const productos = [{ name: 'Alfajores' }, { name: 'Brownies' }];
    Producto.find.mockResolvedValue(productos);

    const res = createResponse();

    await productosCtrl.getproducto({}, res);

    expect(Producto.find).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(productos);
  });

   // ✅ GET POR ID
  test('getUnicoproducto busca por id y responde el documento', async () => {
    const producto = { _id: 'prod-1', name: 'Alfajores' };
    Producto.findById.mockResolvedValue(producto);

    const res = createResponse();

    await productosCtrl.getUnicoproducto({ params: { id: 'prod-1' } }, res);

    expect(Producto.findById).toHaveBeenCalledWith('prod-1');
    expect(res.json).toHaveBeenCalledWith(producto);
  });

  // ✅ UPDATE
  test('editarproducto actualiza campos esperados y confirma la operacion', async () => {
    Producto.findByIdAndUpdate.mockResolvedValue({});

    const req = {
      params: { id: 'prod-1' },
      body: { name: 'Alfajores', price: 2500, description: 'rellenos con arequipe' },
    };

    const res = createResponse();

    await productosCtrl.editarproducto(req, res);

    expect(Producto.findByIdAndUpdate).toHaveBeenCalledWith(
      'prod-1',
      {
        $set: {
          name: 'Alfajores',
          price: 2500,
          description: 'rellenos con arequipe',
        },
      },
      { new: true }
    );

    expect(res.json).toHaveBeenCalledWith({ status: 'producto actualizado' });
  });

  // ✅ DELETE
  test('eliminarproducto elimina por id y responde confirmacion', async () => {
    Producto.findByIdAndDelete.mockResolvedValue({});

    const res = createResponse();

    await productosCtrl.eliminarproducto({ params: { id: 'prod-1' } }, res);

    expect(Producto.findByIdAndDelete).toHaveBeenCalledWith('prod-1');
    expect(res.json).toHaveBeenCalledWith({ status: 'producto eliminado' });
  });
});