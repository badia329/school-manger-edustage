const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignment.controller");
const verifyToken = require("../middleware/auth.middleware").verifyToken;

// Add an assignment - Admin only
router.post("/", verifyToken, assignmentController.assignStudent);

// Get all assignments - Admin only
router.get("/", verifyToken, assignmentController.getAllAssignments);

// Get students of a course
router.get("/course/:courseId", verifyToken, assignmentController.getStudentsByCourse);

// Get courses of a student
router.get("/student/:studentId", verifyToken, assignmentController.getCoursesByStudent);

// Get assignments of a teacher
router.get("/teacher/:teacherId", verifyToken, assignmentController.getAssignmentsByTeacher);

// Delete an assignment
router.delete("/:id", verifyToken, assignmentController.deleteAssignment);

module.exports = router;
