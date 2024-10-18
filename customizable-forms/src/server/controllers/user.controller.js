const db = require("../models");
const User = db.user;

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
  try {
    const user = await User.findByPk(req.params.id);

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
  try {
    const user = await User.findByPk(req.params.id);

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
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await user.destroy();
    res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
