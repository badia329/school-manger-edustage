const express = require("express");
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/schoolEdustageDB');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Teacher = require("./models/teacher")

let users = [
  {
    id: "1",
    firstName: "Salma",
    lastName: "Rekik",
    email: "salma.rekik@topnet.tn",
    tel: "90111222",
    role: "teacher",
    speciality: "Mathematics",
  },
  {
    id: "2",
    firstName: "Mehdi",
    lastName: "Zouari",
    email: "mehdi.z@gmail.com",
    tel: "90222333",
    role: "teacher",
    speciality: "Physics",
  },
  {
    id: "3",
    firstName: "Hedi",
    lastName: "Gharbi",
    email: "hedi.g@school.tn",
    tel: "90333444",
    role: "teacher",
    speciality: "Chemistry",
  },
  {
    id: "4",
    firstName: "Sonia",
    lastName: "Jlassi",
    email: "sonia.j@school.tn",
    tel: "90444555",
    role: "teacher",
    speciality: "Biology",
  },
  {
    id: "5",
    firstName: "Mounir",
    lastName: "Ben Zid",
    email: "mounir.z@school.tn",
    tel: "90555666",
    role: "teacher",
    speciality: "Mathematics",
  },
  {
    id: "6",
    firstName: "Leila",
    lastName: "Hamdi",
    email: "leila.h@school.tn",
    tel: "90666777",
    role: "teacher",
    speciality: "Physics",
  },
  {
    id: "7",
    firstName: "Anis",
    lastName: "Karray",
    email: "anis.k@school.tn",
    tel: "90777888",
    role: "teacher",
    speciality: "Chemistry",
  },
  {
    id: "8",
    firstName: "Sami",
    lastName: "Loussaief",
    email: "sami.l@school.tn",
    tel: "90888999",
    role: "teacher",
    speciality: "Biology",
  },
  {
    id: "9",
    firstName: "Olfa",
    lastName: "Mbarek",
    email: "olfa.m@school.tn",
    tel: "90999000",
    role: "teacher",
    speciality: "Mathematics",
  },
  {
    id: "10",
    firstName: "Ridha",
    lastName: "Saidani",
    email: "ridha.s@school.tn",
    tel: "91111222",
    role: "teacher",
    speciality: "Physics",
  },
  {
    id: "11",
    firstName: "mohsen",
    lastName: "chadly",
    email: "chadly@gmail.com",
    tel: "78945612",
    role: "teacher",
    speciality: "Chemistry",
  },
  {
    id: "12",
    firstName: "ali",
    lastName: "masode",
    email: "ali@gmail.com",
    tel: "78524159",
    role: "teacher",
    speciality: "Biology",
    password: 123456,
  },
];
let courses = [
  {
    idCourse: "1767906441920",
    name: "Mathematics Basics",
    description: "Algebra, numbers, and basic problem solving.",
    duration: 20,
    type: "Mathematics",
    teacherId: "1767895652048"
  }
];


//traitemnt logiue des reqs

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

// busines Logic: Sign up
app.post("/users/signup", (req, res) => {
  console.log("Business Logic: Signup (Add user)", req.body);
  let user = req.body;
  for (let i = 0; i < users.length; i++) {
    if (user.email == users[i].email) {
      return res.json({ msg: "Email Already Exists!", isAdded: false });
    }
  }
  users.push(user);
  return res.json({ msg: "user added successfully!", isAdded: true });
});

// busines Logic: Login
app.post("/users/login", (req, res) => {
  console.log("Business Logic: Login", req.body);
  let founduser = users.find(
    (elt) => elt.email == req.body.email && elt.password == req.body.password
  );
  if (founduser) {
    return res.json({ msg: "welcome" });
  }
  res.json({ msg: "invalid email or password" });
});
//export app
module.exports = app;
