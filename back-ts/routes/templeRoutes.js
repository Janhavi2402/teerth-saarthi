const express = require("express");
const mongoose = require("mongoose");
const Temple = require("../models/Temple");

const router = express.Router();
router.get("/search", async (req, res) => {
  try {
    const { religion } = req.query;
    if (!religion) {
      return res.status(400).json({ message: "Religion is required" });
    }
    const temples = await Temple.find({ religion }).select("name address");
    res.json(temples);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const templeId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(templeId)) {
      return res.status(400).json({ error: "Invalid Temple ID format" });
    }

    const temple = await Temple.findById(templeId);
    if (!temple) {
      return res.status(404).json({ error: "Temple not found" });
    }

    res.json(temple);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
router.get("/:id/nearby-places", async (req, res) => {
  try {
    const templeId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(templeId)) {
      return res.status(400).json({ error: "Invalid Temple ID format" });
    }

    const temple = await Temple.findById(templeId);
    if (!temple) {
      return res.status(404).json({ message: "Temple not found" });
    }
    res.json(temple.nearby_places || []);
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
