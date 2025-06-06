const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const HowToReach = require("../models/howToReach");
router.get("/:temple_id", async (req, res) => {
  try {
    const templeId = req.params.temple_id;
    if (!mongoose.Types.ObjectId.isValid(templeId)) {
      return res.status(400).json({ message: "Invalid Temple ID format" });
    }

    const objectIdTempleId = new mongoose.Types.ObjectId(templeId);
    const transportOptions = await HowToReach.find({ temple_id: objectIdTempleId });
    if (transportOptions.length === 0) {
      return res.status(404).json({ message: "No transport options found for this temple" });
    }
    res.json(transportOptions);
  } catch (error) {
    console.error("Error fetching transport details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
