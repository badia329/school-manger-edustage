const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/signup/student', authController.signupStudent);
router.post('/signup/teacher', authController.signupTeacher);
router.post('/signup/parent', authController.signupParent);
module.exports = router;
