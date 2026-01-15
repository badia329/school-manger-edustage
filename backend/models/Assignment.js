const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
module.exports = Assignment;
