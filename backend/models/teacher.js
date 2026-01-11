const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  isValidated: Boolean,
  specialty: String,
  role: String,
  tel: Number,
});

const teacher = mongoose.model("teacher", teacherSchema);
module.exports = teacher;
