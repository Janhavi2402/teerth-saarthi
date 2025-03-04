const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const templeRoutes = require("./routes/templeRoutes");
const stayRoutes = require("./routes/stayRoutes");
const howToReachRoutes = require("./routes/howToReachRoutes"); 


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/stays", stayRoutes);
app.use("/api/how-to-reach", howToReachRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Debug: Check MongoDB collections
mongoose.connection.once("open", async () => {
  console.log("MongoDB Connected Successfully!");
  console.log("Collections:", await mongoose.connection.db.listCollections().toArray());
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
