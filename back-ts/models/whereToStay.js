const mongoose = require("mongoose");

const WhereToStaySchema = new mongoose.Schema({
  temple_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Temple", 
    required: true 
  },
  temple_name: { type: String, required: true, trim: true },
  dharamshala_name: { type: String, required: true, trim: true },
  contact_number: { type: String, required: true, match: [/^\d{10,15}$/, "Invalid contact number format"] },
  distance_from_temple_km: { type: Number, required: true, min: 0 },
  distance_from_train_station_km: { type: Number, required: true, min: 0 },
  distance_from_bus_stand_km: { type: Number, required: true, min: 0 },
  cost_per_night: { type: String, required: true, trim: true },
  facilities: { type: [String], required: true, validate: [arr => arr.length > 0, "At least one facility is required"] },
  website_url: { type: String, required: true, match: [/^https?:\/\/.+/, "Invalid URL format"] }
}, { timestamps: true });

module.exports = mongoose.model("WhereToStay", WhereToStaySchema); // ✅ Ensure correct capitalization
