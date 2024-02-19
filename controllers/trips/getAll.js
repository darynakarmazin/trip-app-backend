const { Trip } = require("../../models");

const getAll = async (req, res, next) => {
  const trips = await Trip.find({});
  res.json(
    res.json({
      status: "success",
      code: 200,
      data: { result: trips },
    })
  );
};

module.exports = getAll;
