const express = require("express");
const Temple = require("../models/Temple");

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

// ✅ Corrected Route: GET temple by ID
router.get("/:id", async (req, res) => {
  try {
    const templeId = req.params.id;
    const temple = await Temple.findById(templeId);

    if (!temple) {
      return res.status(404).json({ error: "Temple not found" });
    }

    res.json(temple);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
