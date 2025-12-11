import express from "express";
import dotenv from "dotenv";

import { sendCurrentBalanceNotificationCron } from "./cron-jobs/cron-setup.js";
dotenv.config(); 
const app = express();

const PORT = process.env.PORT || 4000;
app.get("/",(req,res)=>{
  res.send("Welcome to Electricity Bill Current Balance Notification App");
});
app.get("/health",(req,res)=>{
  res.status(200).send({message:"Healthy instance"})
})
sendCurrentBalanceNotificationCron()
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})