const Usuario = require('../models/usuarios');
const bcrypt = require('bcryptjs');

// 👉 Registrar usuario
exports.registrar = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validar campos
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
    }

    // Verificar si el usuario ya existe
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ msg: 'El usuario ya existe' });

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar el usuario
    const usuarios = new Usuario({ name, email, password: hashedPassword });
    await usuarios.save();

    res.status(201).json({
      msg: 'Usuario registrado correctamente',
      usuarios: {
        id: usuarios._id,
        name: usuarios.name,
        email: usuarios.email
      }
    });
  } catch (error) {
    console.error('🔥 Error en registrar:', error);
    res.status(500).json({
      msg: 'Error en el servidor',
      error: error.message || error.toString()
    });
  }
};

// 👉 Login sin token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar datos
    if (!email || !password) {
      return res.status(400).json({ msg: 'Debe ingresar email y contraseña' });
    }

    // Buscar el usuario
    const usuarios = await Usuario.findOne({ email });
    if (!usuarios) return res.status(400).json({ msg: 'Usuario no encontrado' });

    // Comparar contraseñas
    const esValido = await bcrypt.compare(password, usuarios.password);
    if (!esValido) return res.status(401).json({ msg: 'Credenciales inválidas' });

    // ✅ Devolver datos del usuario (sin token)
    res.json({
      msg: 'Login exitoso',
      usuario: {
        id: usuarios._id,
        name: usuarios.name,
        email: usuarios.email
      }
    });
  } catch (error) {
    console.error('🔥 Error en login:', error);
    res.status(500).json({
      msg: 'Error en el servidor',
      error: error.message || error.toString()
    });
  }
};