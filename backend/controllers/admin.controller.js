const User = require('../models/user');
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Course = require('../models/course');

// Business Logic: Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    console.log('Admin: Get All Users');
    const users = await User.find().select('-password');
    res.json({ tab: users, nbr: users.length });
  } catch (err) {
    console.error('Error getting users:', err);
    res.status(500).json({ msg: 'Error getting users' });
  }
};

// Business Logic: Get All Teachers
exports.getAllTeachers = async (req, res) => {
  try {
    console.log('Admin: Get All Teachers');
    const teachers = await Teacher.find().populate('userId');
    res.json({ tab: teachers, nbr: teachers.length });
  } catch (err) {
    console.error('Error getting teachers:', err);
    res.status(500).json({ msg: 'Error getting teachers' });
  }
};

// Business Logic: Get All Students
exports.getAllStudents = async (req, res) => {
  try {
    console.log('Admin: Get All Students');
    const students = await Student.find().populate('userId');
    res.json({ tab: students, nbr: students.length });
  } catch (err) {
    console.error('Error getting students:', err);
    res.status(500).json({ msg: 'Error getting students' });
  }
};

// Business Logic: Validate Teacher
exports.validateTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;
    console.log('Admin: Validate Teacher', teacherId);

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ msg: 'Teacher not found' });
    }

    teacher.isValidated = true;
    await teacher.save();

    res.json({ msg: 'Teacher validated successfully' });
  } catch (err) {
    console.error('Error validating teacher:', err);
    res.status(500).json({ msg: 'Error validating teacher' });
  }
};

// Business Logic: Delete User
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log('Admin: Delete User', userId);

    // Find and delete user
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Delete related profile (teacher, student, or parent)
    if (user.role === 'teacher') {
      await Teacher.deleteOne({ userId: userId });
    } else if (user.role === 'student') {
      await Student.deleteOne({ userId: userId });
    } else if (user.role === 'parent') {
      const Parent = require('../models/parent');
      await Parent.deleteOne({ userId: userId });
    }

    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ msg: 'Error deleting user' });
  }
};

// Business Logic: Get Dashboard Stats
exports.getStats = async (req, res) => {
  try {
    console.log('Admin: Get Stats');

    const usersCount = await User.countDocuments();
    const teachersCount = await Teacher.countDocuments();
    const studentsCount = await Student.countDocuments();
    const coursesCount = await Course.countDocuments();

    res.json({
      usersCount,
      teachersCount,
      studentsCount,
      coursesCount
    });
  } catch (err) {
    console.error('Error getting stats:', err);
    res.status(500).json({ msg: 'Error getting stats' });
  }
};

