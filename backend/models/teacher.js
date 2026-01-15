const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialty: String,
  cv: String,
  isValidated: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Teacher', teacherSchema);
