/**
 * Importa la librería Mongoose, utilizada para interactuar con MongoDB
 * mediante esquemas y modelos.
 */
const mongoose = require("mongoose");

/**
 * Define el esquema `productosSchema`, que representa la estructura
 * que tendrán los documentos dentro de la colección "productos" en la base de datos.
 *
 * Cada campo del esquema define un atributo del producto y su tipo de dato:
 * - name: Nombre del producto (String)
 * - price: Precio del producto (Number)
 * - description: Descripción del producto (String)
 *
 * Este esquema permite validar los datos y mantener una estructura coherente
 * dentro de la colección.
 */
const productosSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

/**
 * Exporta un modelo basado en el esquema definido.
 *
 * El modelo "productos":
 * - se asocia automáticamente a la colección `productos` en MongoDB
 * - permite realizar operaciones CRUD (crear, leer, actualizar, eliminar)
 *   a través de los métodos proporcionados por Mongoose.
 */
module.exports = mongoose.model("productos", productosSchema);
