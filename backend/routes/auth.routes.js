const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const upload = require('../middleware/upload.middleware');

router.post('/login', authController.login);
router.post('/signup/student', upload, authController.signupStudent);
router.post('/signup/teacher', authController.signupTeacher);
router.post('/signup/parent', authController.signupParent);
module.exports = router;
