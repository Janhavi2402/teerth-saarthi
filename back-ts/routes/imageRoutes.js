const express = require("express");
const router = express.Router();
const Image = require("../models/Image");

// 📌 Route to Fetch Images by templeId
router.get("/:temple_id", async (req, res) => {
  try {
    const { temple_id } = req.params;
    const imagesData = await Image.findOne({ temple_id });

    if (!imagesData) {
      return res.status(404).json({ message: "Images not found" });
    }

    res.json(imagesData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
// 📌 Route to Upload Images (Base64)
router.post("/upload", async (req, res) => {
    try {
      const { temple_id, images } = req.body; // images should be an array of Base64 strings or a single image string
  
      // Validate input
      if (!temple_id || !images) {
        return res.status(400).json({ message: "temple_id and images are required." });
      }
  
      let imagesArray = Array.isArray(images) ? images : [images]; // Convert single image to array
  
      // Check if images already exist for the templeId
      let existingImages = await Image.findOne({ temple_id });
      if (existingImages) {
        existingImages.images = [...existingImages.images, ...images]; // ✅ Append new images
        await existingImages.save();
        return res.json({ message: "Images added successfully", data: existingImages });
      }
      
  
      // Save new images
      const newImageEntry = new Image({ temple_id, images: imagesArray });
      await newImageEntry.save();
  
      res.status(201).json({ message: "Images uploaded successfully", data: newImageEntry });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
  
  module.exports = router;
  