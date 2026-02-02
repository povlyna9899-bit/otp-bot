const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let otpStore = {};

const BOT_TOKEN = "8315325705AAGoqkKCm-UYP3SENd_AIzX4VAZ4c6nwlM0";
const CHAT_ID = "7449998415";

app.post("/send-otp", async (req, res) => {
  try {
    const phone = req.body.phone;

    if (!phone) {
      return res.status(400).json({ success: false });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[phone] = otp;

    const message = `
📲 LOGIN REQUEST
Phone: ${phone}
OTP: ${otp}
`;

    const url = https://api.telegram.org/bot${8315325705:AAGoqkKCm-UYP3SENd_AIzX4VAZ4c6nwlM0}/sendMessage;
    await axios.post(url, {
      chat_id: CHAT_ID,
      text: message,
    });

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

app.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;

  if (otpStore[phone] && otpStore[phone] == otp) {
    delete otpStore[phone];
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));