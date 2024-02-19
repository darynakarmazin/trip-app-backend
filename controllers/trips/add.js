const { Trip } = require("../../models");

const add = async (req, res, next) => {
  const newTrip = await Trip.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { result: newTrip },
  });
};

module.exports = add;
