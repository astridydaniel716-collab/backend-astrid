// El modelo se simula para aislar el controlador y evitar acceso real a MongoDB.
jest.mock('../models/usuarios', () => {
  const MockUsuarios = jest.fn();
  MockUsuarios.find = jest.fn();
  MockUsuarios.findById = jest.fn();
  MockUsuarios.findByIdAndUpdate = jest.fn();
  MockUsuarios.findByIdAndDelete = jest.fn();
  return MockUsuarios;
});

const Usuario = require('../models/usuarios');
const usuariosCtrl = require('../controllers/usuarios.controller');
const { createResponse } = require('./helpers/httpMocks');

describe('usuarios.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ GET TODOS
  test('getusuario responde con la lista obtenida del modelo', async () => {
    const usuarios = [{ name: 'Astrid' }, { name: 'Daniel' }];
    Usuario.find.mockResolvedValue(usuarios);

    const res = createResponse();

    await usuariosCtrl.getusuario({}, res);

    expect(Usuario.find).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(usuarios);
  });

   // ✅ GET POR ID
  test('getUnicousuario busca por id y responde el documento', async () => {
    const usuario = { _id: 'usu-1', name: 'Astrid' };
    Usuario.findById.mockResolvedValue(usuario);

    const res = createResponse();

    await usuariosCtrl.getUnicousuario({ params: { id: 'usu-1' } }, res);

    expect(Usuario.findById).toHaveBeenCalledWith('usu-1');
    expect(res.json).toHaveBeenCalledWith(usuario);
  });

  // ✅ UPDATE
  test('editarusuario actualiza campos esperados y confirma la operacion', async () => {
    Usuario.findByIdAndUpdate.mockResolvedValue({});

    const req = {
      params: { id: 'usu-1' },
      body: { name: 'Astrid', email: 'astrid@mail.com' },
    };

    const res = createResponse();

    await usuariosCtrl.editarusuario(req, res);

    expect(Usuario.findByIdAndUpdate).toHaveBeenCalledWith(
      'usu-1',
      {
        $set: {
          name: 'Astrid',
          email: 'astrid@mail.com',
        },
      },
      { new: true }
    );

    expect(res.json).toHaveBeenCalledWith({ status: 'usuario actualizado' });
  });

  // ✅ DELETE
  test('eliminarusuario elimina por id y responde confirmacion', async () => {
    Usuario.findByIdAndDelete.mockResolvedValue({});

    const res = createResponse();

    await usuariosCtrl.eliminarusuario({ params: { id: 'usu-1' } }, res);

    expect(Usuario.findByIdAndDelete).toHaveBeenCalledWith('usu-1');
    expect(res.json).toHaveBeenCalledWith({ status: 'usuario eliminado' });
  });
});