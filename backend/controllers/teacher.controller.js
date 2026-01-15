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
