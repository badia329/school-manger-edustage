const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public route - Student signup (handled in auth routes)

// Protected routes (require authentication)
router.get('/', authMiddleware.verifyToken, studentController.getAllStudent);
router.get('/user/:userId', authMiddleware.verifyToken, studentController.getStudentByUserId);
router.get('/phone/:phone', authMiddleware.verifyToken, studentController.getStudentByPhone);
router.post('/', studentController.addStudent);
router.put('/:id', authMiddleware.verifyToken, studentController.editStudent);
router.delete('/:id', authMiddleware.verifyToken, studentController.deleteStudent);

module.exports = router;

