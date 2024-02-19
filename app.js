const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const app = express();
const PORT = 3000;

const cors = require("cors");
app.use(cors());

// API for Google Authentication
app.post("/google-auth", async (req, res) => {
  const { credential, client_id } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    res.status(200).json({ payload });
  } catch (err) {
    res.status(400).json({ err });
  }
});

app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));
