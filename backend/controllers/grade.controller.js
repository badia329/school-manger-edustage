const Grade = require("../models/grade");

// Business Logic: Add Grade and Evaluation
exports.addGrade = (req, res) => {
  console.log("Business Logic: Add Grade", req.body);
  let gradeObj = new Grade(req.body);
  gradeObj.save().then((savedGrade) => {
    res.json({ msg: "Grade added successfully", grade: savedGrade });
  });
};

// Business Logic: Get Grades by Student ID
exports.getGradesByStudent = (req, res) => {
  const studentId = req.params.studentId;
  Grade.find({ studentId: studentId })
    .populate("courseId", "name")
    .populate("teacherId")
    .then((grades) => {
      res.json({ tab: grades, nbr: grades.length });
    });
};

// Business Logic: Get Grades by Course ID
exports.getGradesByCourse = (req, res) => {
  const courseId = req.params.courseId;
  Grade.find({ courseId: courseId })
    .populate("studentId")
    .then((grades) => {
      res.json({ tab: grades, nbr: grades.length });
    });
};

// Business Logic: Get Grades by Student and Course
exports.getGradeByStudentAndCourse = (req, res) => {
  const studentId = req.params.studentId;
  const courseId = req.params.courseId;
  Grade.findOne({ studentId: studentId, courseId: courseId })
    .populate("courseId", "name")
    .populate("teacherId")
    .then((grade) => {
      if (grade) {
        res.json({ grade: grade });
      } else {
        res.json({ msg: "No grade found for this student in this course" });
      }
    });
};

// Business Logic: Update Grade
exports.updateGrade = (req, res) => {
  const gradeId = req.params.id;
  Grade.findByIdAndUpdate(gradeId, req.body, { new: true })
    .then((updatedGrade) => {
      if (updatedGrade) {
        res.json({ msg: "Grade updated successfully", grade: updatedGrade });
      } else {
        res.json({ msg: "Grade not found" });
      }
    });
};

// Business Logic: Delete Grade
exports.deleteGrade = (req, res) => {
  const gradeId = req.params.id;
  Grade.findByIdAndDelete(gradeId)
    .then((deletedGrade) => {
      if (deletedGrade) {
        res.json({ msg: "Grade deleted successfully" });
      } else {
        res.json({ msg: "Grade not found" });
      }
    });
};

