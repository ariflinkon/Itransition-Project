const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

const authMiddleware = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthoried!" });
  }
};

module.exports = authMiddleware;
