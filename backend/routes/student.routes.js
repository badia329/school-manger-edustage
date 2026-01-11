const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

router.post('/signup', studentController.signupStudent);
router.post('/login', authController.login);

module.exports = router;
