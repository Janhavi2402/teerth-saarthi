const express = require("express");
const mongoose = require("mongoose");
const Temple = require("../models/Temple");

const router = express.Router();

// ✅ Fetch temples by religion
router.get("/search", async (req, res) => {
  try {
    const { religion } = req.query;
    if (!religion) {
      return res.status(400).json({ message: "Religion is required" });
    }

    // Fetch full address instead of just state
    const temples = await Temple.find({ religion }).select("name address");
    res.json(temples);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Fetch a temple by ID
router.get("/:id", async (req, res) => {
  try {
    const templeId = req.params.id;

    // Validate and convert to ObjectId
    if (!mongoose.Types.ObjectId.isValid(templeId)) {
      return res.status(400).json({ error: "Invalid Temple ID format" });
    }

    const temple = await Temple.findById(templeId);
    if (!temple) {
      return res.status(404).json({ error: "Temple not found" });
    }

    console.log(temple); // ✅ Logs full data
    res.json(temple);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Fetch nearby places by Temple ID
router.get("/:id/nearby-places", async (req, res) => {
  try {
    const templeId = req.params.id;
    console.log("Fetching nearby places for temple:", templeId);

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(templeId)) {
      return res.status(400).json({ error: "Invalid Temple ID format" });
    }

    // Fetch temple by ID
    const temple = await Temple.findById(templeId);
    if (!temple) {
      return res.status(404).json({ message: "Temple not found" });
    }

    // ✅ Return the nearby_places field or an empty array if it doesn't exist
    res.json(temple.nearby_places || []);
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
