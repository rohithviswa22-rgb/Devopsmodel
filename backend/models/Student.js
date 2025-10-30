const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  marks: { type: Number, required: true },
});

module.exports = mongoose.model('Student', studentSchema);
