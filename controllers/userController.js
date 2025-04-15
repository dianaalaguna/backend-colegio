// backend/controllers/userController.js

const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('tipoUsuario');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).populate('tipoUsuario');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
};

exports.updateUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const updatedData = req.body;

    const user = await User.findOneAndUpdate({ username }, updatedData, {
      new: true
    }).populate('tipoUsuario');

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json({ message: 'Usuario actualizado', user });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

exports.deleteUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const deletedUser = await User.findOneAndDelete({ username });
    if (!deletedUser) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};
