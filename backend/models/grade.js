const mongoose = require("mongoose");

// Grade Schema - للدرجات والتقييمات
const gradeSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  grade: {
    type: Number, 
    required: true,
    min: 0,
    max: 20,
  },
  evaluation: {
    type: String, 
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Grade = mongoose.model("Grade", gradeSchema);
module.exports = Grade;

