// routes/c_route.js
const express = require('express');
const Christianity = require('../models/c_model'); // Import the Christianity model
const router = express.Router(); // Create a router instance

// Route to search temples by query parameters (name, state, or description)
router.get('/Christianity/search', async (req, res) => {
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
    const temples = await Christianity.find(query);

    // Return the search results (just name and id for suggestions)
    const suggestions = temples.map((temple) => ({
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
router.get('/Christianity/:id', async (req, res) => {
  try {
    const temple = await Christianity.findById(req.params.id);
    if (!temple) {
      return res.status(404).json({ message: 'Temple not found' });
    }
    res.json(temple); // Return the temple details
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/Christianity', async (req, res) => {
  try {
    const temples = await Christianity.find({ religion: 'Christianity' });

    if (temples.length === 0) {
      return res.status(404).json({ message: 'No Christianity temples found' });
    }

    res.json(temples);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
