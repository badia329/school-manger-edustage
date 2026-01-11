const bcrypt = require("bcrypt");
const User = require("../models/user");
const Student = require("../models/student");

exports.signupStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, tel, password, address } = req.body;
    console.log("Received signup data:", req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already exists:", email);
      return res.json({ msg: "Email already exists", isAdded: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    const newUser = new User({
      firstName,
      lastName,
      email,
      tel,
      password: hashedPassword,
      role: "student",
    });

    const savedUser = await newUser.save();
    console.log("Saved User:", savedUser);
    const newStudent = new Student({
      userId: savedUser._id,
      address,
    });

    const savedStudent = await newStudent.save();
    console.log("Saved Student role data:", savedStudent);

    res.json({ msg: "Student registered successfully", isAdded: true });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
