// backend/models/Subject.js
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  grado: { type: String, required: true },
  periodo: { type: Number, required: true},
  estado: { type: Boolean, required: true},
});

module.exports = mongoose.model('Subject', subjectSchema);