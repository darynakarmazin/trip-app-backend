const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/api/users");
const tripsRouter = require("./routes/api/trips");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/trips", tripsRouter);

// API for Google Authentication
const { User } = require("./models");

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

app.post("/google-auth", async (req, res) => {
  const { credential, client_id } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    const { email, given_name, family_name, picture } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        name: `${given_name} ${family_name}`,
        authSource: "google",
      });
    }
    const payloads = {
      id: user._id,
    };
    const token = jwt.sign(payloads, JWT_SECRET);
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      status: "OK",
      code: 200,
      data: {
        token,
        user: {
          email,
          given_name,
          family_name,
          picture,
        },
      },
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = app;
