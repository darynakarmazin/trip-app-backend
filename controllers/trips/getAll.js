const { Trip } = require("../../models");

const getAll = async (req, res, next) => {
  try {
    const trips = await Trip.find({});
    res.json(
      res.json({
        status: "success",
        code: 200,
        data: { result: trips },
      })
    );
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
