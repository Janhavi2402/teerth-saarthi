const express = require("express");
const mongoose = require("mongoose"); // Import mongoose to validate ObjectId
const router = express.Router();
const Feedback = require("../models/feedbackModel");
const User = require("../models/user");


const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

//  Submit Feedback using `userId` (POST /api/feedback/:userId)
router.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { rating, comment } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!rating || !comment) {
      return res.status(400).json({ message: "Rating and comment are required" });
    }

    const newFeedback = new Feedback({ user: userId, rating, comment });
    await newFeedback.save();

    res.status(201).json({ message: "Feedback submitted successfully!" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// Get All Feedback for a Particular User (GET /api/feedback/:userId)
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

 
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const feedbacks = await Feedback.find({ user: userId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
