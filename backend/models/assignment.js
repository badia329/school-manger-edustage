const mongoose = require("mongoose");

// Assignment Schema - لربط الطلاب بالمعلمين في كورس محدد
const assignmentSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  assignedBy: {
    type: String, // من قام بالإضافة (admin)
    required: true,
  },
  assignedDate: {
    type: Date,
    default: Date.now,
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
module.exports = Assignment;

