import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styleH.css';
import './search.css';

export default function Hinduism() {
  const [temples, setTemples] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTemples, setFilteredTemples] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const navigate = useNavigate();

  // Decode token
  const tokenuser = localStorage.getItem('token');
  let userId = null;

  if (tokenuser) {
    try {
      const decodedtoken = JSON.parse(atob(tokenuser.split('.')[1]));
      userId = decodedtoken.id;
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  // Fetch temples on mount
  useEffect(() => {
    fetchTemples();
  }, []);

  // Fetch temples
  const fetchTemples = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/hinduism');
      const data = await response.json();
      setTemples(data);
      setFilteredTemples(data);
    } catch (error) {
      console.error('Error fetching temples:', error);
    }
  };

  // Fetch wishlist
  const fetchWishlist = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/wishlist/${userId}`);
      const data = await response.json();

      if (data.success && Array.isArray(data?.data?.places)) {
        setWishlist(data.data.places);
      } else {
        setWishlist([]);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setWishlist([]);
    }
  };

  // Fetch wishlist if userId is available
  useEffect(() => {
    if (userId) {
      fetchWishlist();
    }
  }, [userId]);

  // Search temples by name
  const handleSearch = () => {
    if (searchQuery.trim()) {
      const filtered = temples.filter((temple) =>
        temple.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTemples(filtered);
    } else {
      setFilteredTemples(temples);
    }
  };

  // Toggle wishlist
  const handleWishlistToggle = async (temple) => {
    if (!userId) {
      alert('Please log in to add temples to your wishlist.');
      navigate('/login');
      return;
    }

    try {
      const body = {
        userId,
        temple_id: temple._id,
        name: temple.name,
        address: temple.address,
        description: temple.description,
        state: temple.state,
      };

      const response = await fetch('http://localhost:5000/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (response.ok) {
        fetchWishlist(); // Refresh wishlist
      } else {
        console.error('Server error response:', result);
      }
    } catch (error) {
      console.error('Error updating wishlist', error);
    }
  };
  return (
    <div className="page-wrapper">
      
        <h1 className="title">Hinduism</h1>
  
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search temples by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
  
        {/* Temples List */}
        <div className="temples-list">
          <h2>List of Temples</h2>
          {filteredTemples.length > 0 ? (
            <ul className="temple-items">
              {filteredTemples.map((temple) => {
                const isWishlisted = Array.isArray(wishlist)
                  ? wishlist.some((item) => item.temple_id === temple._id)
                  : false;
  
                return (
                  <li
                    key={temple._id}
                    className="flex items-center justify-between bg-white shadow-md p-4 mb-4 rounded-lg"
                  >
                    <Link
                      to={`/hinduism/${temple._id}`}
                      className="text-lg font-medium text-blue-700 hover:underline"
                    >
                      {temple.name}
                    </Link>
  
                    <button
                      onClick={() => handleWishlistToggle(temple)}
                      className={`text-2xl transition-transform duration-200 hover:scale-125 ${
                        isWishlisted
                          ? 'text-red-500'
                          : 'text-gray-400 hover:text-red-400'
                      }`}
                      title="Add to wishlist"
                    >
                      <span
                        style={{
                          transition: 'transform 0.2s ease',
                          display: 'inline-block',
                          transform: isWishlisted ? 'scale(1.2)' : 'scale(1)',
                        }}
                      >
                        {isWishlisted ? '❤️' : '🤍'}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      
    </div>
  );
  
}
