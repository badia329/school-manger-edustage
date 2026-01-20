const Student = require('../models/student');
const User = require('../models/user');

// Business Logic: Get All Students
exports.getAllStudent = async (req, res) => {
  try {
    console.log('Get All Students');
    const students = await Student.find().populate('userId');
    res.json({ tab: students, nbr: students.length });
  } catch (err) {
    console.error('Error getting students:', err);
    res.status(500).json({ msg: 'Error getting students' });
  }
};

// Business Logic: Add Student
exports.addStudent = async (req, res) => {
  try {
    console.log('Add Student:', req.body);
    const studentObj = new Student(req.body);
    await studentObj.save();
    res.json({ msg: 'Student added successfully' });
  } catch (err) {
    console.error('Error adding student:', err);
    res.status(500).json({ msg: 'Error adding student' });
  }
};

// Business Logic: Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    console.log('Delete Student:', studentId);

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    // Delete user as well
    await User.findByIdAndDelete(student.userId);
    await Student.findByIdAndDelete(studentId);

    res.json({ msg: 'Student deleted successfully' });
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ msg: 'Error deleting student' });
  }
};

// Business Logic: Edit Student
exports.editStudent = async (req, res) => {
  try {
    console.log('Edit Student:', req.body);
    const newObj = req.body;

    await Student.findByIdAndUpdate(newObj._id, newObj);
    await User.findByIdAndUpdate(newObj.userId, {
      firstName: newObj.firstName,
      lastName: newObj.lastName,
      email: newObj.email,
      tel: newObj.tel
    });

    res.json({ msg: 'Student edited successfully' });
  } catch (err) {
    console.error('Error editing student:', err);
    res.status(500).json({ msg: 'Error editing student' });
  }
};

// Business Logic: Get Student by User ID
exports.getStudentByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('Get Student by User ID:', userId);

    const student = await Student.findOne({ userId: userId }).populate('userId');
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    res.json({ tab: student });
  } catch (err) {
    console.error('Error getting student:', err);
    res.status(500).json({ msg: 'Error getting student' });
  }
};

// Business Logic: Get Student by Phone (for parent search)
exports.getStudentByPhone = async (req, res) => {
  try {
    const phone = req.params.phone;
    console.log('Get Student by Phone:', phone);

    // First find user by phone
    const user = await User.findOne({ tel: phone });
    if (!user) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    // Then find student by userId
    const student = await Student.findOne({ userId: user._id }).populate('userId');
    if (!student) {
      return res.status(404).json({ msg: 'Student profile not found' });
    }

    res.json({ tab: { ...student.toObject(), ...user.toObject() } });
  } catch (err) {
    console.error('Error getting student by phone:', err);
    res.status(500).json({ msg: 'Error getting student' });
  }
};

