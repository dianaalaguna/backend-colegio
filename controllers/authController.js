const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password, nombres, apellidos, telefono, tipoUsuario } = req.body;
    const estado = true;

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Usuario ya existe' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed, nombres, apellidos, telefono, tipoUsuario, estado });
    await user.save();

    res.status(201).json({ message: 'Usuario creado' });
  } catch (err) {
    console.error('🔴 Error al registrar usuario:', err);
    res.status(500).json({ message: 'Error del servidor', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Por favor, ingrese ambos campos" });
    }

    const user = await User.findOne({ username }).populate('tipoUsuario');

    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        nombres: user.nombres,
        apellidos: user.apellidos,
        estado: user.estado,
        tipoUsuario: {
          _id: user.tipoUsuario._id,
          type: user.tipoUsuario.type
        }
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};


// Endpoint para obtener el perfil del usuario con el tipo de usuario
exports.getProfile = async (req, res) => {
  try {
    // Encontramos al usuario y hacemos el populate de tipoUsuario
    const user = await User.findById(req.userId)
      .populate('tipoUsuario') // Usamos populate para obtener los detalles del tipo de usuario
      .lean();

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json({
      nombre: `${user.nombres} ${user.apellidos}`,
      estado,
      tipoUsuario: {
        number: user.tipoUsuario.number,
        type: user.tipoUsuario.type
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener datos del usuario' });
  }
};
