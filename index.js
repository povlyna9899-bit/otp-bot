const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

let otpStore = {};

// 🔐 Get from Render Environment Variables
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// ✅ Home Route (prevent Cannot GET /)
app.get("/", (req, res) => {
  res.send("OTP Bot Server is running 🚀");
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

    // ✅ IMPORTANT: use backticks `
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

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});