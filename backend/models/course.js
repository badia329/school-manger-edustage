const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: String,
  description: String,
  duration: Number,
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
