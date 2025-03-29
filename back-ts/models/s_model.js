const mongoose = require('mongoose');

// Define the schema for the Sikhism place of worship document
const SikhismSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  religion: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  timings: {
   type:Object,
  },
  visiting_info: {
    location: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    },
    visiting_hours: {
      type: String,
      required: true
    }
  },
  interesting_facts: {
    type: [String],
    required: true
  },
  art_architecture: {
    type: String,
    required: true
  },
  contact: {
    phone_numbers: {
      type: [String],
      required: true
    },
    email: {
      type: String,
      required: true
    },
    official_website: {
      type: String,
      required: true
    }
  },
  nearby_places: [
    {
      name: {
        type: String,
        required: true
      },
      distance_km: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }
  ]
});

// Create a model based on the schema and explicitly name the collection "sikhism"
const Sikhism = mongoose.model('Sikhism', SikhismSchema, 'sikhism');

module.exports = Sikhism;
