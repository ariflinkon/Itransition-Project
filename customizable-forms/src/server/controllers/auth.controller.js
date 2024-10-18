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
      return res.status(400).send({ message: "Email already in use" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user"
    });

    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error during registration:", err); 
    res.status(500).send({ message: "An error occurred during registration" });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken: token
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send({ message: err.message });
  }
};