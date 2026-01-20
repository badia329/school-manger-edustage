const User = require("../models/user");
const Teacher = require("../models/teacher");
const bcrypt = require("bcrypt");

exports.signupTeacher = (req, res) => {
  console.log("Business Logic: Teacher Signup", req.body);
  let teacher = req.body;

  User.findOne({ email: teacher.email }).then((data) => {
    if (data) {
      res.json({ msg: "Email already exists", isAdded: false });
    } else {
      bcrypt.hash(teacher.password, 10).then((cryptedPassword) => {
        let userObj = new User({
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          email: teacher.email,
          tel: teacher.tel,
          password: cryptedPassword,
          role: "teacher",
        });

        userObj.save().then((savedUser) => {
          let teacherObj = new Teacher({
            userId: savedUser._id,
            speciality: teacher.speciality,
            cv: teacher.cv,
            isValidated: false,
          });
          teacherObj.save();
          res.json({
            msg: "Teacher registered, waiting for admin!",
            isAdded: true,
          });
        });
      });
    }
  });
};

// Business Logic: Get All Teachers
exports.getAllTeachers = (req, res) => {
  Teacher.find()
    .populate("userId", "firstName lastName email tel")
    .then((teachers) => {
      res.json({ tab: teachers, nbr: teachers.length });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error fetching teachers", error: err });
    });
};

// Business Logic: Get Teacher By Id
exports.getTeacherById = (req, res) => {
  Teacher.findById(req.params.id)
    .populate("userId", "firstName lastName email tel")
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).json({ msg: "Teacher not found" });
      }
      res.json({ tab: teacher });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error fetching teacher", error: err });
    });
};

// Business Logic: Update Teacher
exports.updateTeacher = (req, res) => {
  Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate("userId", "firstName lastName email tel")
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).json({ msg: "Teacher not found" });
      }
      res.json({ msg: "Teacher updated successfully", tab: teacher });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error updating teacher", error: err });
    });
};

// Business Logic: Delete Teacher
exports.deleteTeacher = (req, res) => {
  Teacher.findById(req.params.id)
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).json({ msg: "Teacher not found" });
      }
      // Delete associated user
      User.findByIdAndDelete(teacher.userId)
        .then(() => {
          Teacher.findByIdAndDelete(req.params.id)
            .then(() => {
              res.json({ msg: "Teacher deleted successfully" });
            })
            .catch((err) => {
              res.status(500).json({ msg: "Error deleting teacher", error: err });
            });
        })
        .catch((err) => {
          res.status(500).json({ msg: "Error deleting user", error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error fetching teacher", error: err });
    });
};
