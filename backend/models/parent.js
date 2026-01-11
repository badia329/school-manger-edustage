const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  childPhone: String
});

module.exports = mongoose.model('Parent', parentSchema);
