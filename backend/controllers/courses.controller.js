const Course = require("../models/course");

// Business Logic: Add Course
exports.addCourse = (req, res) => {
  console.log("Request body:", req.body);
  let courseObj = new Course(req.body);
  courseObj.save();
  res.json({ msg: "Course added successfully", tab: courseObj });
};

// Business Logic: Get All Courses
exports.getAllCourses = (req, res) => {
  Course.find().then((data) => {
    console.log("Here is data from collection Courses", data);
    res.json({ tab: data, nbr: data.length });
  });
};

// Business Logic: Get Courses By Teacher Id
exports.getCourseByIdTeacher = (req, res) => {
  const teacherId = req.user.id;
  Course.find({ teacherId: teacherId }).then((courses) => {
    res.json({ tab: courses, nbr: courses.length });
  });
};
