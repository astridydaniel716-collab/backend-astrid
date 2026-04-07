// Se reemplaza el modelo real por un mock para probar solo la logica del
// controlador, sin conectarse a MongoDB ni depender de datos reales.
jest.mock('../models/usuarios', () => {
  const MockUser = jest.fn();
  MockUser.findOne = jest.fn();
  return MockUser;
});

// `bcryptjs` tambien se simula para controlar exactamente que devuelve el hash
// o la comparacion de contrasenas en cada escenario.
jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

const User = require('../models/usuarios');
const bcrypt = require('bcryptjs');
const authController = require('../controllers/auth.controller');
const { createResponse } = require('./helpers/httpMocks');

describe('auth.controller', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    // Cada prueba debe empezar limpia para que el resultado no dependa del
    // historial de llamadas de otra prueba.
    jest.clearAllMocks();

    // Se silencia `console.error` para no ensuciar la salida cuando se prueba
    // el manejo de errores internos.
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test('registrar valida campos requeridos', async () => {
    const res = createResponse();

    // Se ejecuta el controlador con un cuerpo vacio para comprobar la validacion inicial.
    await authController.registrar({ body: { name: '', email: '', password: '' } }, res);

    // Este test protege la regla de negocio que impide crear cuentas incompletas.
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Todos los campos son obligatorios' });
  });

  test('registrar rechaza usuarios duplicados', async () => {
    // El modelo simula que ya existe una cuenta con ese mismo correo.
    User.findOne.mockResolvedValue({ _id: 'user-1' });
    const res = createResponse();

    await authController.registrar(
      { body: { name: 'Astrid', email: 'astrid@mail.com', password: 'secret' } },
      res
    );

    // Se valida tanto la consulta realizada como la respuesta final.
    expect(User.findOne).toHaveBeenCalledWith({ email: 'astrid@mail.com' });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: 'El usuario ya existe' });
  });

  test('registrar crea el usuario con password hasheado', async () => {
    // Escenario exitoso: el correo no existe y el hash funciona correctamente.
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashed-password');

    // Se crea una instancia falsa del modelo para observar como el controlador la usa.
    const save = jest.fn().mockResolvedValue(undefined);
    User.mockImplementation(function MockUser(data) {
      Object.assign(this, data, { _id: 'user-1' });
      this.save = save;
    });

    const res = createResponse();

    await authController.registrar(
      { body: { name: 'Astrid', email: 'astrid@mail.com', password: 'secret' } },
      res
    );

    // Esta prueba protege varios puntos delicados del flujo:
    // - que la contrasena se convierta a hash,
    // - que el modelo reciba ese hash y no la clave en texto plano,
    // - que la respuesta solo exponga datos publicos.
    expect(bcrypt.hash).toHaveBeenCalledWith('secret', 10);
    expect(User).toHaveBeenCalledWith({
      name: 'Astrid',
      email: 'astrid@mail.com',
      password: 'hashed-password',
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ 
      msg: 'Usuario registrado correctamente',
      usuarios: {
        id: 'user-1',
        name: 'Astrid',
        email: 'astrid@mail.com',
      },
    });
  });

      
  test('login rechaza credenciales invalidas', async () => {
    // El usuario existe, pero la contrasena enviada no coincide con el hash guardado.
    User.findOne.mockResolvedValue({ password: 'hash' });
    bcrypt.compare.mockResolvedValue(false);

    const res = createResponse();

    await authController.login({ body: { email: 'astrid@mail.com', password: 'bad' } }, res);

    // Este test protege el control de acceso: no debe aceptarse una clave incorrecta.
    expect(bcrypt.compare).toHaveBeenCalledWith('bad', 'hash');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Credenciales inválidas' });
  });

  test('login devuelve datos del usuario si las credenciales son validas', async () => {
    // Se prepara el caso exitoso completo.
    User.findOne.mockResolvedValue({
      _id: 'user-1',
      name: 'Astrid',
      email: 'astrid@mail.com',
      password: 'hash',
    });
    bcrypt.compare.mockResolvedValue(true);

    const res = createResponse();

    await authController.login({ body: { email: 'astrid@mail.com', password: 'secret' } }, res);

    // Si esta expectativa cambia por accidente, el login exitoso dejaria de
    // entregar la informacion que el cliente espera consumir.
    expect(res.json).toHaveBeenCalledWith({
      msg: 'Login exitoso',
      usuario: {
        id: 'user-1',
        name: 'Astrid',
        email: 'astrid@mail.com',
      },
    });
  });
});