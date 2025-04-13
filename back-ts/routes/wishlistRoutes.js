const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Wishlist = require("../models/wishlist");
const Temple = require("../models/Temple");
const Image = require("../models/Image");
const wishlist = require("../models/wishlist");

router.post("/wishlist", async (req, res) => {
  const { userId, temple_id, name, address, description, state } = req.body;
  console.log(req.body);

  if (!userId || !temple_id || !name || !address || !state) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const imageDoc = await Image.findOne({ temple_id });
    const image = imageDoc?.images?.[0] || "default-image-url";

    let wishlist = await Wishlist.findOne({ userId });

    // If wishlist exists
    if (wishlist) {
      // Check if temple is already in wishlist
      const index = wishlist.places.findIndex(
        (place) => place.temple_id.toString() === temple_id
      );

      if (index > -1) {
        // Temple exists -> remove it
        wishlist.places.splice(index, 1);
        await wishlist.save();
        return res.status(200).json({ message: "Temple removed from wishlist", wishlist });
      } else {
        // Temple doesn't exist -> add it
        const newTemple = {
          temple_id: new mongoose.Types.ObjectId(temple_id),
          name,
          address,
          description,
          state,
          images: image,
        };

        wishlist.places.push(newTemple);
        await wishlist.save();
        return res.status(200).json({ message: "Temple added to wishlist", wishlist });
      }
    } else {
      // No wishlist exists -> create one
      const newTemple = {
        temple_id: new mongoose.Types.ObjectId(temple_id),
        name,
        address,
        description,
        state,
        images: image,
      };

      wishlist = new Wishlist({
        userId,
        places: [newTemple],
      });

      await wishlist.save();
      return res.status(201).json({ message: "New wishlist created", wishlist });
    }
  } catch (error) {
    console.error("Error updating wishlist:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});



router.get("/wishlist/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({ userId }).populate("places");

    if (!wishlist) {
      return res.status(200).json({
        success: true,
        message: "No wishes found in database",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    console.error("Error in fetching the wishlist:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
