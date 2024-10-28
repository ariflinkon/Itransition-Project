const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authConfig = require("../config/auth.config");

// User registration
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 8); // Use async bcrypt hashing
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password); // Use async bcrypt comparison
    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: token
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "An error occurred during login" });
  }
};
