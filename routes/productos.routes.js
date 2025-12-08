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
const productosCtrl = require('../controllers/productos.controller');

/**
 * Rutas disponibles para el recurso productos.
 * Cada una se asocia con una función definida en el controlador correspondiente.
 */

// Obtener todos los productos
// GET http://localhost:3000/api/productos
router.get('/', productosCtrl.getproducto);

// Crear un nuevo producto
// POST http://localhost:3000/api/productos
router.post('/', productosCtrl.createproducto);

// Obtener un producto por su ID
// GET http://localhost:3000/api/productos/:id
router.get('/:id', productosCtrl.getUnicoproducto);

// Actualizar un producto por su ID
// PUT http://localhost:3000/api/productos/:id
router.put('/:id', productosCtrl.editarproducto);

// Eliminar un producto por su ID
// DELETE http://localhost:3000/api/productos/:id
router.delete('/:id', productosCtrl.eliminarproducto);

// Exportamos el enrutador para ser usado en index.js
module.exports = router;
