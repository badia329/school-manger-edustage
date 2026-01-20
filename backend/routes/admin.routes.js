const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Get all users (Admin only)
router.get('/users', verifyToken, adminController.getAllUsers);

// Get all teachers (Admin only)
router.get('/teachers', verifyToken, adminController.getAllTeachers);

// Get all students (Admin only)
router.get('/students', verifyToken, adminController.getAllStudents);

// Validate teacher (Admin only)
router.put('/teachers/:id/validate', verifyToken, adminController.validateTeacher);

// Delete user (Admin only)
router.delete('/users/:id', verifyToken, adminController.deleteUser);

// Get dashboard stats (Admin only)
router.get('/stats', verifyToken, adminController.getStats);

module.exports = router;

