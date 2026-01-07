import cron from "node-cron";
import { sendEmail } from "../services/email.js";
import { getCurrentBalance } from "../services/get-balance.js";
import dotenv from "dotenv";

dotenv.config();


export function sendCurrentBalanceNotificationCron (){
    // Schedule: “0 8 * * *” → every day at 08:00 AM
    cron.schedule("*/1 * * * *", async () => {
  console.log("⏰ Running daily balance check at", new Date().toLocaleString());

  try {
    const balance = await getCurrentBalance();
    console.log(`💡 Current balance: ₹${balance}`);

    if (balance < 50) {
      // await sendEmail({
      //   to: 'mytechacccount@gmail.com',
      //   subject: "⚠️ Low Electricity Balance Alert",
      //   text: `Your NBPDCL balance is ₹${balance}. Please recharge soon.`,
      // });
      // console.log("📩 Alert email sent");
    } else {
      console.log("✅ Balance above threshold, no alert sent.");
    }
  } catch (err) {
    // await sendEmail({
    //     to: 'mytechacccount@gmail.com',
    //     subject: "⚠️ ERROR Fetching Electricity Balance",
    //     text: `There was an error fetching your NBPDCL balance: ${err}`,
    //   });
    console.error("❌ Error fetching balance or sending mail:", err);
  }
}, {timezone: "Asia/Kolkata"});
}


