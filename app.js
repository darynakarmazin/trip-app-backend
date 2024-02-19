const express = require("express");
const app = express();

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// API for Google Authentication
app.post("/google-auth", async (req, res) => {
  const { credential, client_id } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });
    const payload = ticket.getPayload();
    console.log(ticket);
    const userid = payload["sub"];
    res.status(200).json({ payload });
  } catch (err) {
    res.status(400).json({ err });
  }
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
