const express = require("express");
const router = express.Router();
const axios = require("axios");

// Forward requests to the Python Flask chatbot service
router.post("/message", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:5005/api/message", req.body);
    res.json(response.data);
  } catch (error) {
    console.error("Error forwarding request to chatbot service:", error.message);
    if (error.response) {
      // Return the error from the chatbot service if available
      res.status(error.response.status).json({ 
        response: "Sorry, I couldn't process your request. Please try again later."
      });
    } else {
      // Generic error message if chatbot service is unavailable
      res.status(500).json({ 
        response: "The chatbot service is currently unavailable. Please try again later."
      });
    }
  }
});

router.get("/status", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5005/api/status");
    res.json(response.data);
  } catch (error) {
    console.error("Error checking chatbot status:", error.message);
    res.status(500).json({ status: "Chatbot service is offline" });
  }
});

module.exports = router; 