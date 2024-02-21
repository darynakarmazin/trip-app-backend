const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    password: {
      required: false,
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      required: false,
      type: String,
    },
    authSource: {
      type: String,
      enum: ["self", "google"],
      default: "self",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

module.exports = User;
