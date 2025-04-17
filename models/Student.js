// backend/models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  codigoEstudiante: { type: String, required: true, unique: true },
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  correoTutor: { type: String, required: true },
  nacimiento: { type: Date, required: true },
  estado: { type: Boolean, required: true},
});

module.exports = mongoose.model('Student', studentSchema);