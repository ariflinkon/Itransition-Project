const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const authConfig = require("../config/auth.config");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  try {
    const decoded = jwt.verify(token, authConfig.secret);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("Authorization error:", err);
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

module.exports = authMiddleware;
