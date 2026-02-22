/**
 * Importamos las dependencias necesarias para configurar el servidor:
 *
 * - express: framework para crear el servidor y manejar rutas.
 * - morgan: middleware que muestra información de las solicitudes HTTP en consola.
 * - cors: permite la comunicación entre el servidor y aplicaciones externas (por ejemplo, Angular).
 */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

/**
 * Inicializamos la aplicación de Express.
 * La constante `app` contendrá toda la configuración y funcionamiento del servidor.
 */
const app = express();

/**
 * Importamos únicamente la conexión a la base de datos desde el archivo `database.js`.
 * Gracias a esto, la conexión se establece cuando el servidor se inicia.
 */
const { mongoose } = require('./database');

/**
 * ---------------------------
 *     CONFIGURACIONES
 * ---------------------------
 */

/**
 * Definimos el puerto donde se ejecutará el servidor.
 * Si existe una variable de entorno PORT (por ejemplo en producción), se usa esa.
 * Caso contrario, el servidor utilizará el puerto 3000 por defecto.
 */
app.set('port', process.env.PORT || 3000);

/**
 * Middleware que registra todas las peticiones HTTP en consola (GET, POST, PUT, DELETE, etc.).
 * Esto ayuda a depurar y ver qué solicitudes llegan al servidor.
 */
app.use(morgan('dev'));

/**
 * Middleware que permite al servidor recibir y procesar datos en formato JSON
 * enviados desde el cliente.
 */
app.use(express.json());

/**
 * Habilitamos el uso de CORS para permitir que aplicaciones externas
 * (como Angular que se ejecuta en http://localhost:4200)
 * puedan comunicarse con este backend.
 */
app.use(cors({ origin: 'http://localhost:3001' }));

/**
 * ---------------------------
 *           RUTAS
 * ---------------------------
 *
 * Asignamos las rutas principales del servidor.
 * Cada ruta usa un archivo diferente para organizar la lógica de negocio:
 *
 * - /api/usuarios  → rutas relacionadas con usuarios
 * - /api/productos → rutas relacionadas con productos
 */
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

/**
 * ---------------------------
 *      INICIAR SERVIDOR
 * ---------------------------
 *
 * Arrancamos el servidor en el puerto definido anteriormente.
 * Una vez iniciado, muestra un mensaje en consola indicando el puerto activo.
 */
app.listen(app.get('port'), () => {
    console.log('server activo en el puerto', app.get('port'));
});
