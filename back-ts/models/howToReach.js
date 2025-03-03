const mongoose = require("mongoose");

const HowToReachSchema = new mongoose.Schema({
  temple_id: { type: mongoose.Schema.Types.ObjectId, ref: "Temple", required: true },
  nearest_airport: {
    name: String,
    distance: String,
    transport: [String],
  },
  nearest_train_station: {
    name: String,
    distance: String,
    transport: [String],
  },
  by_road: String,
});

module.exports = mongoose.model("HowToReach", HowToReachSchema);
