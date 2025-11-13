import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function sendEmail({ to, subject, text }) {
  try {
    // 1️⃣ Create a transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2️⃣ Send the mail
    const info = await transporter.sendMail({
      from: `"NBPDCL Notifier" <${process.env.EMAIL_USER}>`,
      to, // single email or comma-separated list
      subject,
      text,
    });

    console.log("✅ Email sent:", info.response);
  } catch (err) {
    console.error("❌ Error sending mail:", err);
  }
}
