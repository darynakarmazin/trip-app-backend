const { Trip } = require("../../models");
const { tripSchema } = require("../../schemas");

const add = async (req, res, next) => {
  try {
    const { error } = tripSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing required field",
      });
      return;
    }
    const { _id } = req.user;
    const newTrip = await Trip.create({ ...req.body, owner: _id });
    res.status(201).json({
      status: "success",
      code: 201,
      data: { result: newTrip },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
