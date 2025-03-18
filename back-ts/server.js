require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const templeRoutes = require("./routes/templeRoutes");
const stayRoutes = require("./routes/stayRoutes");
const howToReachRoutes = require("./routes/howToReachRoutes");
const imageRoutes = require("./routes/imageRoutes"); // Added image routes
const feedbackRoutes = require("./routes/feedbackRoutes");
const cookieParser = require("cookie-parser");


// Connect to MongoDB
connectDB();

const app = express();


// Middleware
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from frontend
  credentials: true // Allow cookies and authentication headers
}));
app.use(cookieParser());

app.use(express.json({ limit: "20mb" })); // Support for large Base64 images

app.use(express.urlencoded({ limit: "20mb", extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/stays", stayRoutes);
app.use("/api/how-to-reach", howToReachRoutes);
app.use("/api/images", imageRoutes); // Image route added
app.use("/api/feedback", feedbackRoutes);
// Default route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Debug: Check MongoDB collections on startup
mongoose.connection.once("open", async () => {
  console.log("MongoDB Connected Successfully!");
  console.log("Collections:", await mongoose.connection.db.listCollections().toArray());
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
