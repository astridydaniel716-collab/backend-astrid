/**
 * Importa la librería Mongoose, que permite definir esquemas y modelos
 * para interactuar fácilmente con MongoDB.
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Define el esquema `usuariosSchema`, que establece la estructura
 * de los documentos dentro de la colección "usuarios" en la base de datos.
 *
 * Cada campo del esquema incluye su tipo y si es requerido:
 * - name: Nombre del usuario (String, requerido)
 * - lastname: Apellido del usuario (String, requerido)
 * - email: Correo electrónico del usuario (String, requerido)
 *
 * Este esquema asegura que cada usuario registrado cumpla con la
 * estructura y requisitos mínimos necesarios.
 */
const usuariosSchema = new Schema({
    name: { type: String, require: true },
    email:  { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

/**
 * Exporta el modelo "usuarios", el cual:
 * - se basa en el esquema definido arriba
 * - se vincula automáticamente a la colección `usuarios` en MongoDB
 * - permite realizar operaciones CRUD usando los métodos de Mongoose
 */
module.exports = mongoose.model('usuarios', usuariosSchema);

