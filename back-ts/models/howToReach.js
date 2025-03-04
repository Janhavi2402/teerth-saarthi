const mongoose = require("mongoose");
const HowToReachSchema = new mongoose.Schema({
  temple_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Temple", 
    required: true 
  },
  temple_name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  transport_type: { 
    type: String, 
    required: true, 
    enum: ["Train", "Bus", "Flight", "Taxi", "Auto", "Metro"] 
  },
  station_name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  distance_km: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  fare: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  travel_time: { 
    type: String, 
    required: true, 
    trim: true 
  },
  departure_times: { 
    type: [String], 
    required: true 
  },
  ticket_booking_url: { 
    type: String, 
    required: true, 
    match: [/^https?:\/\/.+/, "Invalid URL format"] 
  },
  service_provider: { 
    type: String, 
    required: true, 
    trim: true 
  }
}, { timestamps: true });

module.exports = mongoose.model("HowToReach", HowToReachSchema);
