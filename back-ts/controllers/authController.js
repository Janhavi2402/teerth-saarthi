const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
require("dotenv").config(); 

const secretKey = process.env.JWT_SECRET || "2345";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirm } = req.body;
    if (!name || !email || !password || !confirm) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirm) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });

    
    if (!user) {
      return res.status(500).json({ message: "User registration failed" });
    }
    const token = jwt.sign({ email: user.email }, secretKey);
    res.cookie("token", token);

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

    const token = jwt.sign({ email: user.email, id: user._id}, secretKey, { expiresIn: "1h" });
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
const getUserProfile = async (req, res) => {
  try {
    if (!req.cookies) {
      return res.status(401).json({ message: "No cookies found" });
    }

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];


    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const decoded = jwt.verify(token, secretKey);
    const user = await User.findOne({ email: decoded.email }).select("-password"); 
   
    if (!user) return res.status(404).json({ message: "User not found" });
    console.log("user",user)
    res.json(user);
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};

module.exports = { registerUser, loginUser, logoutUser,getUserProfile };