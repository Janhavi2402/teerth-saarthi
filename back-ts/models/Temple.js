const mongoose = require("mongoose");

const TempleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  religion: { type: String, required: true },
  description: { type: String },

  timings: {
    type: Object,
  },

  visiting_info: {
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    visiting_hours: { type: String },
  },

  interesting_facts: { type: [String] },

  art_architecture: { type: String },

  contact: {
    phone_numbers: { type: [String], default: [] }, 
    email: { 
      type: String, 
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"] 
    },
    official_website: { 
      type: String, 
      match: [/^https?:\/\/.+/, "Invalid URL format"] 
    },
  },
  nearby_places: [
    {
      name: { type: String, required: true },
      distance_km: { type: Number, required: true },
      description: { type: String },
    },
  ], 
});
module.exports = mongoose.model("Temple", TempleSchema);
