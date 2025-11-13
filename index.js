import express from "express";
import dotenv from "dotenv";

import { sendCurrentBalanceNotificationCron } from "./cron-jobs/cron-setup.js";
dotenv.config(); 
const app = express();

const PORT = process.env.PORT || 4000;
sendCurrentBalanceNotificationCron()
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})