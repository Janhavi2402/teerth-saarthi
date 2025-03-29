const mongoose = require('mongoose');


// Define the schema for the Islamic place of worship document
const IslamSchema = new mongoose.Schema({
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
  country: {
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
  sufi_saint: {
    type: String,
    required: true
  },
  established_year: {
    type: String,
    required: true
  },
  architecture_style: {
    type: String,
    required: true
  },
  timings: {
   type: Object,
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
    },
    special_festival: {
      type: String,
      required: true
    }
  },
  spiritual_ceremonies: {
    type: [String],
    required: true
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
  nearby_places: [{
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
  }]
});

// Create a model based on the schema and explicitly name the collection "islam"
const Islam = mongoose.model('Islam', IslamSchema, 'islam');

module.exports = Islam;
