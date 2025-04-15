const mongoose = require('mongoose');

const userTypeSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  type: { type: String, required: true }
});

module.exports = mongoose.model('UserType', userTypeSchema);
