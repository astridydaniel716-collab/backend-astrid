/**
 * Importa el modelo `Producto` desde la carpeta de modelos.
 * Este modelo representa la colección de productos en la base de datos MongoDB,
 * y permite realizar operaciones como crear, leer, actualizar y eliminar productos (CRUD).
 */
const Producto = require('../models/productos');

/**
 * Objeto `productosCtrl` que agrupa todos los métodos del controlador.
 * 
 * Esta estructura permite organizar las funciones relacionadas con los productos,
 * como obtener todos los productos, obtener uno por ID, crear nuevos,
 * actualizar y eliminar.
 * 
 * Luego este objeto será exportado y utilizado por las rutas (routes/productos.js)
 * para manejar las solicitudes HTTP.
 */
const productosCtrl = {};


// Obtener todos los productos
productosCtrl.getproducto = async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
};

// Crear producto
productosCtrl.createproducto = async (req, res) => { 
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.json({ status: 'producto guardado' });
};

// Conseguir un único producto
productosCtrl.getUnicoproducto = async (req, res) => {
    const productoUnico = await Producto.findById(req.params.id);
    res.json(productoUnico);
};

// Actualizar producto
productosCtrl.editarproducto = async (req, res) => {
    const { id } = req.params;
    const productoEdit = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    };
    await Producto.findByIdAndUpdate(id, { $set: productoEdit }, { new: true });
    res.json({ status: 'producto actualizado' });
};

// Eliminar producto
productosCtrl.eliminarproducto = async (req, res) => {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ status: 'producto eliminado' });
};

module.exports = productosCtrl;

