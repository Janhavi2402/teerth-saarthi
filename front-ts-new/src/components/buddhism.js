import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Buddhism.css'; // Add the CSS file for styling

export default function Buddhism() {
  const [temples, setTemples] = useState([]); // Stores temples for both search and the full list
  const [searchQuery, setSearchQuery] = useState(''); // Stores the current search query
  const [filteredTemples, setFilteredTemples] = useState([]); // Stores the filtered temples based on search

  // Fetch the list of all temples on initial load
  const fetchTemples = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/buddhism');
      const data = await response.json();
      setTemples(data); // Store all temples in the state
      setFilteredTemples(data); // Set the filtered temples to the full list initially
    } catch (error) {
      console.error('Error fetching temples:', error);
    }
  };

  // Load temples initially
  useEffect(() => {
    fetchTemples();
  }, []); // Runs only once on component mount

  // Function to handle the search query and filter temples
  const handleSearch = () => {
    if (searchQuery) {
      const filtered = temples.filter(temple =>
        temple.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter temples by name
      );
      setFilteredTemples(filtered); // Update filtered temples based on search
    } else {
      setFilteredTemples(temples); // Reset to full list if search query is empty
    }
  };

  // Function to handle click on a temple and redirect to its details page (optional)
  const handleTempleClick = (templeId) => {
    console.log(`Temple clicked with ID: ${templeId}`);
    // For now, we are relying on the Link for navigation
  };

  return (
    <div className="container">
      <h1 className="title">Buddhism Temples</h1>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search temples by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {/* List of Filtered Temples */}
      <div className="temples-list">
        <h2>List of Temples</h2>
        {filteredTemples.length > 0 ? (
          <ul className="temple-items">
            {filteredTemples.map((temple) => (
              <li key={temple._id} className="temple-item">
                {/* Link to the temple details page */}
                <Link to={`/temple/${temple._id}`} className="temple-link" onClick={() => handleTempleClick(temple._id)}>
                  {temple.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No temples found</p> // Display this message if no temples match the search
        )}
      </div>
    </div>
  );
}
