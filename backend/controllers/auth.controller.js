const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Parent = require("../models/parent");

// busines Logic: Sign up Student
exports.signupStudent = (req, res) => {
  console.log("Business Logic: Student Signup", req.body);
  let user = req.body;

  User.findOne({ email: user.email }).then((data) => {
    if (data) {
      console.log("Here is data after search user by email", data);
      res.json({ msg: "Email already exists", isAdded: false });
    } else {
      bcrypt.hash(user.password, 10).then((cryptedPassword) => {
        let userObj = new User({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          tel: user.tel,
          password: cryptedPassword,
          role: "student",
        });

        userObj.save().then((savedUser) => {
          let studentObj = new Student({
            userId: savedUser._id,
            address: user.address,
          });
          studentObj.save();
          res.json({ msg: "Student added successfully!", isAdded: true });
        });
      });
    }
  });
};

// busines Logic: Sign up Teacher
exports.signupTeacher = (req, res) => {
  let user = req.body;

  User.findOne({ email: user.email }).then((data) => {
    if (data) {
      console.log("Here is data after search user by email", data);
      res.json({ msg: "Email already exists", isAdded: false });
    } else {
      bcrypt.hash(user.password, 10).then((cryptedPassword) => {
        console.log("Here is crypted password", cryptedPassword);

        let userObj = new User({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          tel: user.tel,
          password: cryptedPassword,
          role: "teacher",
        });

        userObj.save().then((savedUser) => {
          let teacherObj = new Teacher({
            userId: savedUser._id,
            specialty: user.specialty,
            cv: user.cv,
            isValidated: false,
          });

          teacherObj.save().then(() => {
            res.json({ msg: "Signup request sent to Admin!", isAdded: true });
          });
        });
      });
    }
  });
};

// busines Logic: Sign up Parent
exports.signupParent = (req, res) => {
  let user = req.body;

  User.findOne({ tel: user.childPhone, role: "student" }).then((student) => {
    if (!student) {
      return res.json({
        msg: "Child's phone number not found in our records!",
        isAdded: false,
      });
    }

    User.findOne({ email: user.email }).then((data) => {
      if (data) {
        return res.json({ msg: "Email already exists", isAdded: false });
      } else {
        bcrypt.hash(user.password, 10).then((cryptedPassword) => {
          let userObj = new User({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            tel: user.tel,
            password: cryptedPassword,
            role: "parent",
          });

          userObj.save().then((savedUser) => {
            let parentObj = new Parent({
              userId: savedUser._id,
              childId: student._id,
            });

            parentObj.save().then(() => {
              res.json({
                msg: "Parent account created and linked to child successfully!",
                isAdded: true,
              });
            });
          });
        });
      }
    });
  });
};

// busines Logic: Login
exports.login = (req, res) => {
  const userCredentials = req.body;

  User.findOne({ tel: userCredentials.tel }).then((user) => {
    if (!user) {
      return res.json({
        msg: "Invalid phone or password",
        isLogged: false,
      });
    }

    bcrypt.compare(userCredentials.password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.json({
          msg: "Invalid phone or password",
          isLogged: false,
        });
      }

      let isValidation = true;

      if (user.role === "teacher") {
        Teacher.findOne({ userId: user._id }).then((teacher) => {
          isValidation = teacher ? teacher.isValidated : false;

          const token = jwt.sign(
            { userId: user._id, role: user.role },
            "MY_SECRET_KEY_2024",
            { expiresIn: "24h" }
          );

          res.json({
            msg: "Login success",
            isLogged: true,
            role: user.role,
            userId: user._id,
            token: token,
            isValidation: isValidation,
          });
        });
      } else {
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          "MY_SECRET_KEY_2024",
          { expiresIn: "24h" }
        );

        res.json({
          msg: "Login success",
          isLogged: true,
          role: user.role,
          userId: user._id,
          token: token,
          isValidation: isValidation,
        });
      }
    });
  });
};
