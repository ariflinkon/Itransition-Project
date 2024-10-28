//Not used now


const db = require("../models");
const User = db.user;

// Helper function to validate ID
const isValidId = (id) => {
  return Number.isInteger(Number(id)) && Number(id) > 0;
};

// Get all users (Admin Only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Block a user
exports.blockUser = async (req, res) => {
  const userId = req.params.id;
  if (!isValidId(userId)) {
    return res.status(400).send({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.isBlocked = true;
    await user.save();

    res.status(200).send({ message: "User blocked successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Unblock a user
exports.unblockUser = async (req, res) => {
  const userId = req.params.id;
  if (!isValidId(userId)) {
    return res.status(400).send({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.isBlocked = false;
    await user.save();

    res.status(200).send({ message: "User unblocked successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  if (!isValidId(userId)) {
    return res.status(400).send({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await user.destroy();
    res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};