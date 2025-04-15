const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password, nombres, apellidos, telefono, tipoUsuario } = req.body;

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Usuario ya existe' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed, nombres, apellidos, telefono, tipoUsuario });
    await user.save();

    res.status(201).json({ message: 'Usuario creado' });
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Por favor, ingrese ambos campos" });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas Usuario' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas encriptión' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};
