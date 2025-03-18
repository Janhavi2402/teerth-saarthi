const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  temple_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Temple" }, // Reference to the Temple schema
  images: [{ type: String, required: true }], // Array of Base64 image strings
});

module.exports = mongoose.model("Image", ImageSchema);
