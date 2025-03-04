const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
require("dotenv").config(); // Load environment variables

const secretKey = process.env.JWT_SECRET; // Load from .env

const registerUser = async (req, res) => {
  try {
    console.log("Incoming Request:", req.body); 
    const { name, email, password, confirm } = req.body;

    // Check for missing fields
    if (!name || !email || !password || !confirm) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure passwords match
    if (password !== confirm) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({ name, email, password: hashedPassword });

    
    if (!user) {
      return res.status(500).json({ message: "User registration failed" });
    }

    // Generate JWT Token
    const token = jwt.sign({ email: user.email }, secretKey);

    // Set token as cookie
    res.cookie("token", token);

    console.log("User registered successfully");
    res.status(201).json({ message: "User registered successfully", token });

  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

const logoutUser = (req, res) => {
  res.cookie("token", "", { expires: new Date(0), httpOnly: true });
  res.json({ message: "Logged out successfully" });
};

module.exports = { registerUser, loginUser, logoutUser };