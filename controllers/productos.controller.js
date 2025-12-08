const Producto = require('../models/productos');
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

