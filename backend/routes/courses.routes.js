const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courses.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", courseController.addCourse);
router.get("/", courseController.getAllCourses);
router.get("/", authMiddleware, courseController.getCourseByIdTeacher);

module.exports = router;
