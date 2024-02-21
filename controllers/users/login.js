const { User } = require("../../models");
const { userSchema } = require("../../schemas");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: error.message,
      });
      return;
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email not found",
      });
      return;
    }
    const passCompare = bcrypt.compareSync(password, user.password);
    if (!passCompare) {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Password is wrong",
      });
      return;
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      status: "OK",
      code: 200,
      data: {
        token,
        user: {
          email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
