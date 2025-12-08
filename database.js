/**
 * Importamos la librería `mongoose`, la cual nos permite conectarnos
 * y trabajar con bases de datos MongoDB desde Node.js de forma sencilla
 * y basada en modelos.
 */
const mongoose = require('mongoose');

/**
 * Definimos la URL de conexión (URI) a MongoDB.
 *
 * En este caso:
 * - `mongodb://localhost/usuarios`
 *
 * Donde:
 * - `localhost` indica que la base de datos está en el equipo local.
 * - `usuarios` es el nombre de la base de datos que se utilizará.
 *
 * Si esta base de datos no existe, MongoDB la creará automáticamente
 * al ingresar el primer documento.
 */
const URI = 'mongodb://localhost/usuarios';

/**
 * Se realiza la conexión a MongoDB usando Mongoose.
 *
 * `mongoose.connect(URI)` inicia la conexión.
 *
 * - `.then()` se ejecuta cuando la conexión es exitosa y muestra un mensaje en consola.
 * - `.catch()` captura cualquier error ocurrido durante la conexión
 *   y lo imprime en consola para facilitar la depuración.
 */
mongoose.connect(URI)
    .then(db => console.log('DB está conectada'))
    .catch(err => console.error(err));

/**
 * Exportamos el objeto `mongoose` para que pueda ser utilizado
 * en otras partes del proyecto (por ejemplo, en modelos o controladores).
 */
module.exports = mongoose;
