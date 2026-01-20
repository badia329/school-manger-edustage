const express = require("express");
const router = express.Router();
const gradeController = require("../controllers/grade.controller");
const verifyToken = require("../middleware/auth.middleware").verifyToken;

// Routes for grades (marks and evaluations)

// Add a grade - requires authentication
router.post("/", verifyToken, gradeController.addGrade);

// Get grades of a student
router.get("/student/:studentId", verifyToken, gradeController.getGradesByStudent);

// Get grades of a course
router.get("/course/:courseId", verifyToken, gradeController.getGradesByCourse);

// Get grade of a student in a specific course
router.get("/:studentId/:courseId", verifyToken, gradeController.getGradeByStudentAndCourse);

// Update a grade
router.put("/:id", verifyToken, gradeController.updateGrade);

// Delete a grade
router.delete("/:id", verifyToken, gradeController.deleteGrade);

module.exports = router;
