const { User } = require("../models");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer" || !token) {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
      });
      return;
    }
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
      });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "invalid token") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
