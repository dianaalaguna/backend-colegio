// backend/models/Subject.js
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  grado: { type: String, required: true },
  periodo: { type: Number, required: true},
  estado: { type: Boolean, required: true},
  profesores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // NUEVO
  estudiantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }] // NUEVO
});

module.exports = mongoose.model('Subject', subjectSchema);