// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, //-- Mismo e-mail, validado desde el frontend --
  password: { type: String, required: true },
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  telefono: { type: String, required: true },
  tipoUsuario: { type: Number, required: true }
});

module.exports = mongoose.model('User', userSchema);
