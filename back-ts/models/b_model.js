const mongoose = require('mongoose');

// Define the schema for the Buddhism temple document
const T = new mongoose.Schema({
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
  interesting_facts: [{
    type: String
  }],
  buddha_association: {
    type: String,
    required: true
  },
  stupa_available: {
    type: Boolean,
    required: true
  },
  main_stupa: {
    height_meters: {
      type: Number,
      required: true
    },
    material: {
      type: String,
      required: true
    },
    year_built: {
      type: String,
      required: true
    }
  },
  special_festival: [{
    type: String
  }],
  architecture_style: {
    type: String,
    required: true
  },
  contact: {
    phone_numbers: [{
      type: String
    }],
    email: {
      type: String,
      required: true
    },
    official_website: {
      type: String,
      required: true
    }
  },
  meditation_center_available: {
    type: Boolean,
    required: true
  },
  meditation_center_details: {
    name: {
      type: String,
      required: true
    },
    timings: {
      type: String,
      required: true
    },
    facilities: [{
      type: String
    }]
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

// Create a model based on the schema and explicitly name the collection "buddhism"
const Buddhism = mongoose.model('Buddhism', T, 'buddhism');  // 'buddhism' is the collection name

module.exports = Buddhism;
