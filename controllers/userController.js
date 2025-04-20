// backend/controllers/userController.js
const UserType = require('../models/UserType');  // Ajusta la ruta si es necesario
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

// Obtener todos los usuarios con tipo 'Profesor'
exports.getAllProfesores = async (req, res) => {
  try {
    // Obtener el tipo de usuario "Profesor" desde la colección `usertypes`
    const tipoProfesor = await UserType.findOne({ type: 'Profesor' });

    if (!tipoProfesor) {
      return res.status(404).json({ message: 'Tipo de usuario "Profesor" no encontrado' });
    }

    // Obtener todos los usuarios que tengan el tipo "Profesor" asociado
    const profesores = await User.find({ tipoUsuario: tipoProfesor._id }).populate('tipoUsuario');

    res.json(profesores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener los profesores' });
  }
};



