const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const WhereToStay = require("../models/whereToStay");
router.get("/:temple_id", async (req, res) => {
  try {
    const templeId = req.params.temple_id;
    console.log("Received temple_id:", templeId);
    if (!mongoose.Types.ObjectId.isValid(templeId)) {
      return res.status(400).json({ message: "Invalid Temple ID format" });
    }
    const objectIdTempleId = new mongoose.Types.ObjectId(templeId);
    const allStays = await WhereToStay.find({});
    console.log("All stays in DB:", allStays);
    const stays = await WhereToStay.find({ temple_id: objectIdTempleId });

    console.log("Filtered stays:", stays);
    if (stays.length === 0) {
      return res.status(404).json({ message: "No stays found for this temple" });
    }
    res.json(stays);
  } catch (error) {
    console.error("Error fetching stays:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
