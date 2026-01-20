const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Public route - Teacher signup
router.post("/signupTeacher", teacherController.signupTeacher);

// Protected routes (require authentication)
router.get("/", authMiddleware.verifyToken, teacherController.getAllTeachers);
router.get("/:id", authMiddleware.verifyToken, teacherController.getTeacherById);
router.put("/:id", authMiddleware.verifyToken, teacherController.updateTeacher);
router.delete("/:id", authMiddleware.verifyToken, teacherController.deleteTeacher);

module.exports = router;

