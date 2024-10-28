const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

// Get all users (Admin only)
router.get("/", [authMiddleware, roleMiddleware("admin")], userController.getAllUsers);

// Block a user (Admin only)
router.post("/block/:id", [authMiddleware, roleMiddleware("admin")], userController.blockUser);

// Unblock a user (Admin only)
router.post("/unblock/:id", [authMiddleware, roleMiddleware("admin")], userController.unblockUser);

// Delete a user (Admin only)
router.delete("/delete/:id", [authMiddleware, roleMiddleware("admin")], userController.deleteUser);

module.exports = router;