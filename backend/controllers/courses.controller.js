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

// Business Logic: Get Course By Id
exports.getCourseById = (req, res) => {
  Course.findById(req.params.id).then((course) => {
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.json({ tab: course });
  });
};

// Business Logic: Update Course
exports.updateCourse = (req, res) => {
  Course.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((course) => {
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.json({ msg: "Course updated successfully", tab: course });
  });
};

// Business Logic: Delete Course
exports.deleteCourse = (req, res) => {
  Course.findByIdAndDelete(req.params.id).then((course) => {
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.json({ msg: "Course deleted successfully", tab: course });
  });
};
