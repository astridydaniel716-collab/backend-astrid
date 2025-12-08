/**
 * Importa el modelo `Usuario` desde la carpeta de modelos.
 * 
 * El modelo `Usuario` representa la colección de usuarios en MongoDB
 * y proporciona acceso a los métodos necesarios para realizar operaciones
 * CRUD (crear, leer, actualizar y eliminar usuarios).
 */
const Usuario = require('../models/usuarios');

/**
 * Objeto `usuariosCtrl` que contendrá todas las funciones del controlador
 * relacionadas con los usuarios.
 * 
 * Este objeto sirve como contenedor para agrupar funciones como:
 * - obtener todos los usuarios
 * - obtener un usuario por ID
 * - crear un usuario
 * - actualizar un usuario
 * - eliminar un usuario
 * 
 * Luego este objeto será exportado y utilizado en las rutas (routes/usuarios.js)
 * para manejar las solicitudes HTTP correspondientes.
 */
const usuariosCtrl = {};


// Obtener todos los productos
usuariosCtrl.getusuario = async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
};

// Crear producto
usuariosCtrl.createusuario = async (req, res) => { 
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.json({ status: 'usuario guardado' });
};

// Conseguir un único producto
usuariosCtrl.getUnicousuario = async (req, res) => {
    const usuarioUnico = await Usuario.findById(req.params.id);
    res.json(usuarioUnico);
};

// Actualizar producto
usuariosCtrl.editarusuario = async (req, res) => {
    const { id } = req.params;
    const usuarioEdit = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email
    };
    await Usuario.findByIdAndUpdate(id, { $set: usuarioEdit }, { new: true });
    res.json({ status: 'usuario actualizado' });
};

// Eliminar producto
usuariosCtrl.eliminarusuario = async (req, res) => {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ status: 'usuario eliminado' });
};

module.exports = usuariosCtrl;