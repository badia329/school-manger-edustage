const express = require("express");
const cors = require("cors");

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
app.use('/uploads', express.static('backend/uploads'));

// Import routes
const courseRoutes = require("./routes/courses.routes");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const gradeRoutes = require("./routes/grade.routes");
const assignmentRoutes = require("./routes/assignment.routes");
const teacherRoutes = require("./routes/teacher.routes");
const parentRoutes = require("./routes/parent.routes");
const studentRoutes = require("./routes/student.routes");

// Use routes
// Auth Users
app.use("/auth", authRoutes);       
// Courses
app.use("/courses", courseRoutes);   
// Admin
app.use("/admin", adminRoutes);
// Grades
app.use("/grades", gradeRoutes);
// Assignments
app.use("/assignments", assignmentRoutes);
// Teachers
app.use("/teachers", teacherRoutes);
// Parents
app.use("/parents", parentRoutes);
// Students
app.use("/students", studentRoutes);

//export app
module.exports = app;
