import cron from "node-cron";
import { sendEmail } from "../services/email.js";
import { getCurrentBalance } from "../services/get-balance.js";
import dotenv from "dotenv";

dotenv.config();

const CONSUMER_ID = "123456789";  // replace with your ID
const THRESHOLD = 100;            // ₹100 minimum balance
const EMAIL_RECEIVER = "father_email@gmail.com";

export function sendCurrentBalanceNotificationCron (){
    // Schedule: “0 8 * * *” → every day at 08:00 AM
    cron.schedule("*/5 * * * *", async () => {
  console.log("⏰ Running daily balance check at", new Date().toLocaleString());

  try {
    const balance = await getCurrentBalance();
    console.log(`💡 Current balance: ₹${balance}`);

    if (balance < 60) {
      await sendEmail({
        to: 'hv9796923@gmail.com',
        subject: "⚠️ Low Electricity Balance Alert",
        text: `Your NBPDCL balance is ₹${balance}. Please recharge soon.`,
      });
      console.log("📩 Alert email sent");
    } else {
      console.log("✅ Balance above threshold, no alert sent.");
    }
  } catch (err) {
    console.error("❌ Error fetching balance or sending mail:", err);
  }
}, {timezone: "Asia/Kolkata"});
}


