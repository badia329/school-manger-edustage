const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  tel: String,
  password: String,
  role: String,
});

module.exports = mongoose.model('User', userSchema);
