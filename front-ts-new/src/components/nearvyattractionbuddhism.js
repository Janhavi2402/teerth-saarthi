import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'; // Import Link and useHistory for navigation
import './Buddhism.css'; // Add the CSS file for styling
import './search.css';

export default function Buddhism() {
  const [temples, setTemples] = useState([]); // Stores temples for both search and the full list
  const [searchQuery, setSearchQuery] = useState(''); // Stores the current search query
  const [filteredTemples, setFilteredTemples] = useState([]); // Stores the filtered temples based on search
  const [wishlist, setWishlist] = useState([]);
  const tokenuser = localStorage.getItem("token");
  const decodedtoken = JSON.parse(atob(tokenuser.split(".")[1]));
  const userId = decodedtoken.id;

  const history = useHistory(); // Use the useHistory hook for navigation

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

  const fetchWishlist = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/wishlist/${userId}`);
      const data = await response.json();
      
      if (data.success) {
        const places = data.data.places; // Get 'places' from the wishlist object
        setWishlist(places);
      } else {
        setWishlist([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlist([]);
    }
  };

  useEffect(() => {
    fetchTemples();
    fetchWishlist(); 
  }, [wishlist]);

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

  // Function to handle click on a temple card and redirect to nearby attractions page
  const handleCardClick = (templeId) => {
    history.push(`/nearby-attraction-buddhism/${templeId}`); // Navigate to the nearby attractions page
  };

  // Function to toggle wishlist
  const handleWishlistToggle = async (temple) => {
    try {
      const body = {
        userId,
        temple_id: temple._id,
        name: temple.name,
        address: temple.address,
        description: temple.description,
        state: temple.state
      };
      const response = await fetch("http://localhost:5000/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const result = await response.json();
      if (!response.ok) {
        console.error("Server error response:", result);
      } else {
        setWishlist(prevWishlist => [...prevWishlist, result]);
      }
    } catch (error) {
      console.error("Error updating wishlist", error);
    }
  };

  return (
    <div className="page-wrapper">
      <h1 className="title">Buddhism</h1>

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
        <h2>List of Temples/Monasteries</h2>
        {filteredTemples.length > 0 ? (
          <ul className="temple-items">
            {filteredTemples.map((temple) => (
              <li key={temple._id} className="flex items-center justify-between bg-white shadow-md p-4 mb-4 rounded-lg">
                {/* Link to the temple details page */}
                <div onClick={() => handleCardClick(temple._id)} className="text-lg font-medium text-blue-700 cursor-pointer hover:underline">
                  {temple.name}
                </div>

                <button
                  onClick={() => handleWishlistToggle(temple)}
                  className={`text-2xl transition-transform duration-200 hover:scale-125 ${
                    wishlist.some(item => item.temple_id === temple._id)
                      ? 'text-red-500'
                      : 'text-gray-400 hover:text-red-400'
                  }`}
                  title="Add to wishlist"
                >
                  {wishlist.some(item => item.temple_id === temple._id) ? '❤' : '🤍'}
                </button>
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
