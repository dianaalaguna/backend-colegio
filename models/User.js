// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  telefono: { type: String, required: true },
  estado: { type: Boolean, required: true},
  tipoUsuario: {
    type: mongoose.Schema.Types.ObjectId, // Usamos ObjectId para la referencia
    ref: 'UserType',  // Hacemos referencia a la colección 'userTypes'
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
