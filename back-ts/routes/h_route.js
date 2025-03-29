const express = require('express');
const Hinduism = require('../models/h_model'); // Import the Buddhism model
const router = express.Router(); // Create a router instance


// Route to search temples by query parameters (name, state, or description)
router.get('/hinduism/search', async (req, res) => {
  try {
    // Extract query parameters from the request
    const { name, state, description } = req.query;

    // Build a query object based on provided search parameters
    const query = {};

    // If the 'name' parameter is provided, search for temples with names that start with the provided name
    if (name) {
      query.name = { $regex: `^${name}`, $options: 'i' }; // Case-insensitive "starts with" search for temple name
    }

    // Optionally, search by 'state' if provided
    if (state) {
      query.state = { $regex: state, $options: 'i' }; // Case-insensitive search for state
    }

    // Optionally, search by 'description' if provided
    if (description) {
      query.description = { $regex: description, $options: 'i' }; // Case-insensitive search for description
    }

    // Perform the search query
    const temples = await Hinduism.find(query);

    // Return the search results (just name and id for suggestions)
    const suggestions = temples.map(temple => ({
      id: temple._id,
      name: temple.name,
    }));

    // Return the search results
    res.json(suggestions); // Send back temple name suggestions
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a temple by ID
router.get('/hinduism/:id', async (req, res) => {
  try {
    const temple = await Hinduism.findById(req.params.id);
    if (!temple) {
      return res.status(404).json({ message: "Temple not found" });
    }
    res.json(temple); // Return the temple details
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get all temples of Buddhism
router.get('/hinduism', async (req, res) => {
  try {
    const temples = await Hinduism.find({ religion: 'Hinduism' });
    res.json(temples); // Return the temples in the response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});

  

module.exports = router;