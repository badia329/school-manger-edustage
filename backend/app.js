const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
mongoose
.connect("mongodb://127.0.0.1:27017/schoolEdustageDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(err));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Teacher = require("./models/teacher");
const Student = require("./models/student");
//traitemnt logique des reqs

// busines Logic: Add New Course
app.post("/courses", (req, res) => {
  console.log("Business Logic: Add New Course");
  let courseObj = req.body;
  courseObj.id = Date.now();
  courses.push(courseObj);
  res.json({ msg: "Added with success!" });
});

// busines Logic: Get All Courses
app.get("/courses", (req, res) => {
  console.log("Businnes Logic: Get All Courses");
  res.json({ tab: courses, nbr: courses.length });
});

// busines Logic: Get All Teachers
app.get("/teacher", (req, res) => {
  console.log("Businnes Logic: Get All Teachers");
  res.json({ tab: teachers, nbr: teachers.length });
});

// busines Logic: Get TeacherById
app.get("/teacher/:id", (req, res) => {
  console.log("Businnes Logic: Get Teacher By Id");
  let teacherId = req.params.id;
  console.log("Here is Id", teacherId);
  let foundTeacher;
  for (let i = 0; i < teachers.length; i++) {
    if (teachers[i].id === teacherId) {
      foundTeacher = teachers[i];
      break;
    }
  }
  if (foundTeacher) {
    res.json({ obj: foundTeacher });
  } else {
    res.json({ msg: "Teacher is not found" });
  }
});

// busines Logic: Delete TeacherById
app.delete("/teacher/:id", (req, res) => {
  console.log("Businnes Logic: Delete Teacher By Id", req.params.id);
  let teacherId = req.params.id;
  let isDeleted = false;
  for (let i = 0; i < teachers.length; i++) {
    if (teachers[i].id === teacherId) {
      teachers.splice(i, 1);
      isDeleted = true;
      break;
    }
  }
  if (isDeleted) {
    res.json({ msg: "Teacher deleted successfully" });
  } else {
    res.json({ msg: `Teacher N° ${teacherId} not found` });
  }
});

// busines Logic: Delete TeacherById
app.post("/teacher", (req, res) => {
  console.log("Businnes Logic: Add Teacher");
  let teacherObj = req.body;
  console.log("Here is obj", teacherObj);
  teacherObj.id = Date.now();
  teachers.push(teacherObj);
  res.json({ msg: "added with succes!" });
});

// busines Logic: Edit TeacherById
app.put("/teacher", (req, res) => {
  console.log("Businnes Logic: Edit Teacher");
  let newTeacher = req.body;
  for (let i = 0; i < teachers.length; i++) {
    if (teachers[i].id === newTeacher.id) {
      teachers[i] = newTeacher;
    }
  }
  res.json({ msg: "Edited with success!" });
});

// busines Logic: Search Teacher By Speaciality
app.post("/teachers/searchTeacher", (req, res) => {
  console.log("Businnes Logic: Search Teacher By Speciality");
  let teacherSpeciality = req.body.speciality.toLowerCase();
  console.log("Here is object", teacherSpeciality);
  let teacherFilter = [];
  for (let i = 0; i < teachers.length; i++) {
    if (teachers[i].speciality.toLowerCase() == teacherSpeciality) {
      teacherFilter.push(teachers[i]);
    }
  }
  if (teacherFilter.length > 0) {
    res.json({ tab: teacherFilter });
  } else {
    res.json({ msg: "No Teachers Found!" });
  }
});


// busines Logic: Sign up Student
app.use('/student', require('./routes/student.routes'));


//export app
module.exports = app;
