const express = require("express");
const router = express.Router();
const parentController = require("../controllers/parent.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Public route - Parent signup
router.post("/signupParent", parentController.signupParent);

// Protected routes (require authentication)
router.get("/", authMiddleware.verifyToken, parentController.getAllParents);
router.get("/:id", authMiddleware.verifyToken, parentController.getParentById);
router.get("/user/:userId", authMiddleware.verifyToken, parentController.getParentByUserId);
router.put("/:id", authMiddleware.verifyToken, parentController.updateParent);
router.delete("/:id", authMiddleware.verifyToken, parentController.deleteParent);

module.exports = router;

