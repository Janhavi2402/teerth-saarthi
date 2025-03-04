
const express = require('express');
const cors = require('cors');
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); 
const userRoutes = require("./routes/userRoutes"); 


dotenv.config();
connectDB();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON requests
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);
// Sample Route
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

// API Routes
app.use('/api', userRoutes);

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
