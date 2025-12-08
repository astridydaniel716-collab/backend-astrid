/**
 * Módulo de rutas para la entidad productos.
 * 
 * Utilizamos el módulo `express` para crear un enrutador que define las rutas
 * del backend relacionadas con los productos. Estas rutas serán consumidas 
 * desde el cliente.
 */

// Importamos express para usar su Router
const express = require('express');
const router = express.Router();

// Importamos el controlador que contiene la lógica de negocio
const usuariosCtrl = require('../controllers/usuarios.controller');

/**
 * Rutas disponibles para el recurso productos.
 * Cada una se asocia con una función definida en el controlador correspondiente.
 */

// Obtener todos los productos
// GET http://localhost:3000/api/usuarios
router.get('/', usuariosCtrl.getusuario);

// Crear un nuevo producto
// POST http://localhost:3000/api/usuarios
router.post('/', usuariosCtrl.createusuario);

// Obtener un producto por su ID
// GET http://localhost:3000/api/usuarios/:id
router.get('/:id', usuariosCtrl.getUnicousuario);

// Actualizar un producto por su ID
// PUT http://localhost:3000/api/usuarios/:id
router.put('/:id', usuariosCtrl.editarusuario);

// Eliminar un producto por su ID
// DELETE http://localhost:3000/api/usuarios/:id
router.delete('/:id', usuariosCtrl.eliminarusuario);

// Exportamos el enrutador para ser usado en index.js
module.exports = router;

