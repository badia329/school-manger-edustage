const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courses.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Public routes
router.post("/", courseController.addCourse);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);

// Protected routes (require authentication)
router.put("/:id", authMiddleware.verifyToken, courseController.updateCourse);
router.delete("/:id", authMiddleware.verifyToken, courseController.deleteCourse);

// Get courses by teacher (authenticated)
router.get("/teacher/my-courses", authMiddleware.verifyToken, courseController.getCourseByIdTeacher);

module.exports = router;
