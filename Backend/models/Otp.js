const mongoose = require("mongoose");
const mailSender = require("../utils/MailSender");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
  otp: {
    type: String,
    required: true,
  },
});

// function to send email
async function sendVerificationEmail(email, otp) {
  try {
    console.log("reached in send Verifcation Block");
    const messageBody = `
      <h2>Verification Code from CodeFusion</h2>
      <p>Dear User,</p>
      <p>Thank you for choosing CodeFusion. To complete your verification process, please use the OTP provided below:</p>
      <h3 style="color: #2c3e50;">${otp}</h3>
      <p>This code is valid for the next 5 minutes. Please do not share this code with anyone for security reasons.</p>
      <p>If you did not request this verification, please ignore this email.</p>
      <br>
      <p>Best regards,</p>
      <p>CodeFusion Team</p>
    `;

    const mailResponse = await mailSender(
      email,
      "Verification Email from CodeFusion",
      messageBody
    );
    console.log("Email for OTP sent successfully", mailResponse);
  } catch (error) {
    console.log("Error while sending OTP", error);
  }
}

// Pre-save middleware for sending email
otpSchema.pre("save", async function (next) {
  console.log("reached in prehook");
  await sendVerificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
