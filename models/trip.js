const { Schema, model } = require("mongoose");

const tripSchema = Schema(
  {
    city: { type: String, required: true },
    imageUrl: { type: String, required: true },
    startData: { type: Date, required: true },
    endData: { type: Date, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

const Trip = model("trip", tripSchema);

module.exports = Trip;
