const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const templeRoutes = require("./routes/templeRoutes");
const stayRoutes = require("./routes/stayRoutes");
const howToReachRoutes = require("./routes/howToReachRoutes");
const imageRoutes = require("./routes/imageRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const bRoute = require("./routes/b_route");
const cRoute = require("./routes/c_route");
const iRoute = require("./routes/i_route");
const jRoute = require("./routes/j_route");
const hRoute = require("./routes/h_route");
const sRoute = require("./routes/s_route");
const wishlist=require("./routes/wishlistRoutes")
const chatbotRoutes = require("./routes/chatbotRoutes");

// Connect to MongoDB
connectDB();

const app = express();

// Allow all origins (for development purposes, remove or modify for production)
app.use(cors({
  origin: "http://localhost:3000", // 👈 frontend URL
  credentials: true,
}));

app.use(cookieParser());

// Allow handling of large JSON and URL-encoded payloads
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// Define your API routes
app.use("/auth", authRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/stays", stayRoutes);
app.use("/api/how-to-reach", howToReachRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api", bRoute);
app.use("/api", cRoute);
app.use("/api", iRoute);
app.use("/api", jRoute);
app.use("/api", hRoute);
app.use("/api", sRoute);
app.use("/api",wishlist);
app.use("/api/chatbot", chatbotRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Debug: Check MongoDB collections on startup
mongoose.connection.once("open", async () => {
  console.log("MongoDB Connected Successfully!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
