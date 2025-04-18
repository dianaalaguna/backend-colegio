// backend/models/userTypes.js
const mongoose = require('mongoose');

const userTypeSchema = new mongoose.Schema({
  number: { 
    type: Number, 
    unique: true, // Aseguramos que el 'number' sea único
    required: true 
  },
  type: { 
    type: String, 
    required: true 
  }
});

module.exports = mongoose.model('UserType', userTypeSchema);
