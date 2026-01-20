const User = require("../models/user");
const Parent = require("../models/parent");
const bcrypt = require("bcrypt");

// Business Logic: Parent Signup
exports.signupParent = (req, res) => {
  console.log("Business Logic: Parent Signup", req.body);
  let parent = req.body;

  User.findOne({ email: parent.email }).then((data) => {
    if (data) {
      res.json({ msg: "Email already exists", isAdded: false });
    } else {
      bcrypt.hash(parent.password, 10).then((cryptedPassword) => {
        let userObj = new User({
          firstName: parent.firstName,
          lastName: parent.lastName,
          email: parent.email,
          tel: parent.tel,
          password: cryptedPassword,
          role: "parent",
        });

        userObj.save().then((savedUser) => {
          let parentObj = new Parent({
            userId: savedUser._id,
            childId: parent.childId,
          });
          parentObj.save();
          res.json({
            msg: "Parent registered successfully",
            isAdded: true,
          });
        });
      });
    }
  });
};

// Business Logic: Get All Parents
exports.getAllParents = (req, res) => {
  Parent.find()
    .populate("userId", "firstName lastName email tel")
    .populate("childId", "firstName lastName email")
    .then((parents) => {
      res.json({ tab: parents, nbr: parents.length });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error fetching parents", error: err });
    });
};

// Business Logic: Get Parent By Id
exports.getParentById = (req, res) => {
  Parent.findById(req.params.id)
    .populate("userId", "firstName lastName email tel")
    .populate("childId", "firstName lastName email")
    .then((parent) => {
      if (!parent) {
        return res.status(404).json({ msg: "Parent not found" });
      }
      res.json({ tab: parent });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error fetching parent", error: err });
    });
};

// Business Logic: Get Parent By User Id
exports.getParentByUserId = (req, res) => {
  Parent.findOne({ userId: req.params.userId })
    .populate("userId", "firstName lastName email tel")
    .populate("childId", "firstName lastName email")
    .then((parent) => {
      if (!parent) {
        return res.status(404).json({ msg: "Parent not found" });
      }
      res.json({ tab: parent });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error fetching parent", error: err });
    });
};

// Business Logic: Update Parent
exports.updateParent = (req, res) => {
  Parent.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate("userId", "firstName lastName email tel")
    .populate("childId", "firstName lastName email")
    .then((parent) => {
      if (!parent) {
        return res.status(404).json({ msg: "Parent not found" });
      }
      res.json({ msg: "Parent updated successfully", tab: parent });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error updating parent", error: err });
    });
};

// Business Logic: Delete Parent
exports.deleteParent = (req, res) => {
  Parent.findById(req.params.id)
    .then((parent) => {
      if (!parent) {
        return res.status(404).json({ msg: "Parent not found" });
      }
      // Delete associated user
      User.findByIdAndDelete(parent.userId)
        .then(() => {
          Parent.findByIdAndDelete(req.params.id)
            .then(() => {
              res.json({ msg: "Parent deleted successfully" });
            })
            .catch((err) => {
              res.status(500).json({ msg: "Error deleting parent", error: err });
            });
        })
        .catch((err) => {
          res.status(500).json({ msg: "Error deleting user", error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error fetching parent", error: err });
    });
};

