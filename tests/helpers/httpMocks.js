/**
 * Helper de pruebas para simular el objeto `res` de Express.
 *
 * En los tests unitarios no levantamos un servidor real. En su lugar, creamos
 * un objeto de respuesta falso con funciones simuladas (`jest.fn`) para poder
 * comprobar:
 * - que codigo HTTP quiso devolver el controlador,
 * - que cuerpo JSON quiso responder,
 * - y que el encadenamiento `res.status(...).json(...)` se conserva.
 */
function createResponse() {
  const res = {};

  // Al devolver `res`, estas funciones imitan el comportamiento real de Express
  // y permiten escribir `res.status(...).json(...)` dentro del controlador.
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
}

module.exports = {
  createResponse,
};