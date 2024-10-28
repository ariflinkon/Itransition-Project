const db = require("../models");
const User = db.user;

const roleMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      if (user.role !== requiredRole) {
        return res.status(403).send({ message: "Insufficient permissions" });
      }

      next();
    } catch (err) {
      res.status(500).send({ message: "Error checking user role" });
    }
  };
};

module.exports = roleMiddleware;
