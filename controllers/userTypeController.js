// backend/controllers/userTypeController.js
const UserType = require('../models/UserType');

exports.getUserTypes = async (req, res) => {
  try {
    const userTypes = await UserType.find().sort({ number: 1 });
    res.json(userTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los tipos de usuario' });
  }
};
