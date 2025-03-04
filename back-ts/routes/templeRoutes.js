  const express = require("express");
  const Temple = require("../models/Temple");
  const NearbyAttractions = require("../models/nearbyAttractions");

  const mongoose = require("mongoose");
  const router = express.Router();

  // GET temples by religion
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


router.get("/:id", async (req, res) => {
  try {
    const templeId = req.params.id;

    // Validate and convert to ObjectId
    if (!mongoose.Types.ObjectId.isValid(templeId)) {
      return res.status(400).json({ error: "Invalid Temple ID format" });
    }

    const temple = await Temple.findById(req.params.id); // ✅ Convert Mongoose object to plain JSON

    if (!temple) {
      return res.status(404).json({ error: "Temple not found" });
    }

    console.log(temple); // ✅ Logs full data
    res.json(temple);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

  
  module.exports = router;
