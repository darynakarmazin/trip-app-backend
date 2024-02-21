const { Trip } = require("../../models");

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const trips = await Trip.find({ owner: _id }).populate(
      "owner",
      "_id, email name"
    );
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
