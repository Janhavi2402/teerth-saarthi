const mongoose = require('mongoose');

// Define the schema for the Jainism place of worship document
const JainismSchema = new mongoose.Schema({
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
    parikrama_distance_km: {
      type: Number,
      required: true
    }
  },
  interesting_facts: {
    type: [String],
    required: true
  },
  tirthankar: {
    type: String,
    required: true
  },
  nirvana_place: {
    type: Boolean,
    required: true
  },
  pratishtha_year: {
    type: String,
    required: true
  },
  architecture_style: {
    type: String,
    required: true
  },
  special_festival: {
    type: [String],
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
  dhyan_kendra_available: {
    type: Boolean,
    required: true
  },
  dhyan_kendra_details: {
    name: {
      type: String,
      required: true
    },
    timings: {
      type: String,
      required: true
    },
    facilities: {
      type: [String],
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

// Create a model based on the schema and explicitly name the collection "jainism"
const Jainism = mongoose.model('Jainism', JainismSchema, 'jainism');

module.exports = Jainism;
