const mongoose = require("mongoose");

const TempleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  religion: { type: String, required: true },
  description: { type: String },

  timings: {
    type: Object, // ✅ Change Map to Object to allow nested structures
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
    phone_numbers: { type: [String], default: [] }, // ✅ Ensures an array, even if empty
    email: { 
      type: String, 
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"] // ✅ Email validation
    },
    official_website: { 
      type: String, 
      match: [/^https?:\/\/.+/, "Invalid URL format"] // ✅ Ensures valid website URL
    },
  },
});

module.exports = mongoose.model("Temple", TempleSchema);
