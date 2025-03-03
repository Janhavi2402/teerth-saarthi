const mongoose = require("mongoose");

const NearbyAttractionsSchema = new mongoose.Schema({
  temple_id: { type: mongoose.Schema.Types.ObjectId, ref: "Temple", required: true },
  attractions: [
    {
      name: String,
      distance: String,
      description: String,
    }
  ]
});

module.exports = mongoose.model("NearbyAttractions", NearbyAttractionsSchema);
