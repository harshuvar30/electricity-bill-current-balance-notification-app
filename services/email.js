import { Resend } from 'resend';
import dotenv from "dotenv";

dotenv.config();

export async function sendEmail({ to, subject, text }) {
  try {

const resend = new Resend(process.env.RESEND_API_KEY);

const info = await resend.emails.send({
  from: `Electricity Bill  <${process.env.EMAIL_USER}>`,
  to: [to],
  subject: subject,
  html: `<p>${text}</p>`
});
    console.log("✅ Email sent:", info);
  } catch (err) {
    console.error("❌ Error sending mail:", err);
  }
}
