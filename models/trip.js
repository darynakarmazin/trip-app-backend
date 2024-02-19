const { Schema, model } = require("mongoose");

const tripSchema = Schema(
  {
    city: { type: String, required: true },
    imageUrl: { type: String, required: true },
    startData: { type: Date, required: true },
    endData: { type: Date, required: true },
  },
  { versionKey: false, timestamps: true }
);

const Trip = model("trip", tripSchema);

module.exports = Trip;
