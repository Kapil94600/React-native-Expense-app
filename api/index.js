require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("../routes/auth");
const expenseRoutes = require("../routes/expense");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Expense Backend Live 🚀");
});

// MongoDB connect (IMPORTANT)
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("✅ MongoDB Connected");
};

connectDB();

// ❌ app.listen() YAHAN BILKUL NAHI
module.exports = app;
