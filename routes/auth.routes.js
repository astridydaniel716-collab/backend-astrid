// Se importa el módulo express para crear rutas del servidor
const express = require('express');

// Se crea una instancia del Router de Express
// Router permite definir rutas de forma modular
const router = express.Router();

// Se importan las funciones registrar y login desde el controlador de autenticación
// Estas funciones contienen la lógica para registrar usuarios e iniciar sesión
const { registrar, login } = require('../controllers/auth.controller');

// Ruta para registrar un nuevo usuario
// Método: POST
// URL: /api/auth/register
// Descripción: recibe los datos del usuario y los guarda en la base de datos
router.post('/register', registrar);

// Ruta para iniciar sesión
// Método: POST
// URL: /api/auth/login
// Descripción: valida las credenciales del usuario
router.post('/login', login);

// Se exporta el router para poder ser utilizado en el archivo principal del servidor
module.exports = router;
