const Assignment = require("../models/assignment");
const Course = require("../models/course");
const Student = require("../models/student");
const Teacher = require("../models/teacher");

// Business Logic: Assign Student to Teacher in Course
exports.assignStudent = (req, res) => {
  console.log("Business Logic: Assign Student", req.body);
  let assignmentObj = new Assignment(req.body);
  
  // Check if already assigned
  Assignment.findOne({
    studentId: req.body.studentId,
    courseId: req.body.courseId,
  }).then((existing) => {
    if (existing) {
      return res.json({ msg: "Student already assigned to this course" });
    }
    
    assignmentObj.save().then((savedAssignment) => {
      res.json({ msg: "Student assigned successfully", assignment: savedAssignment });
    });
  });
};

// Business Logic: Get Students by Course
exports.getStudentsByCourse = (req, res) => {
  const courseId = req.params.courseId;
  Assignment.find({ courseId: courseId })
    .populate("studentId")
    .populate("teacherId")
    .populate("courseId", "name")
    .then((assignments) => {
      res.json({ tab: assignments, nbr: assignments.length });
    });
};

// Business Logic: Get Courses by Student
exports.getCoursesByStudent = (req, res) => {
  const studentId = req.params.studentId;
  Assignment.find({ studentId: studentId })
    .populate("courseId")
    .populate("teacherId")
    .then((assignments) => {
      res.json({ tab: assignments, nbr: assignments.length });
    });
};

// Business Logic: Get Assignments by Teacher
exports.getAssignmentsByTeacher = (req, res) => {
  const teacherId = req.params.teacherId;
  Assignment.find({ teacherId: teacherId })
    .populate("studentId")
    .populate("courseId")
    .then((assignments) => {
      res.json({ tab: assignments, nbr: assignments.length });
    });
};

// Business Logic: Delete Assignment
exports.deleteAssignment = (req, res) => {
  const assignmentId = req.params.id;
  Assignment.findByIdAndDelete(assignmentId)
    .then((deletedAssignment) => {
      if (deletedAssignment) {
        res.json({ msg: "Assignment deleted successfully" });
      } else {
        res.json({ msg: "Assignment not found" });
      }
    });
};

// Business Logic: Get All Assignments (Admin)
exports.getAllAssignments = (req, res) => {
  Assignment.find()
    .populate("studentId")
    .populate("teacherId")
    .populate("courseId")
    .then((assignments) => {
      res.json({ tab: assignments, nbr: assignments.length });
    });
};

