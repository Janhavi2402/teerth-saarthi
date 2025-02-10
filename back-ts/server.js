require('dotenv').config();
const express = require('express');
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON requests

// Sample Route
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

// API Routes
app.use('/api', userRoutes);

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
