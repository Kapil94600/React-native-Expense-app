require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expense");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
