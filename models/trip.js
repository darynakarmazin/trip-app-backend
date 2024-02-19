const { Schema, model } = require("mongoose");

const tripSchema = Schema(
  {
    // index: String,
    city: String,
    imageUrl: String,
    startData: Date,
    endData: Date,
  },
  { versionKey: false, timestamps: true }
);

const Trip = model("trip", tripSchema);

module.exports = Trip;
