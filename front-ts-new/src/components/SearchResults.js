import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { fetchTemplesByReligion } from "../api";
import "../styles.css"; // Import the CSS file

export default function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const religion = queryParams.get("religion");

  const [temples, setTemples] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTemples, setFilteredTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (religion) {
      fetchTemplesByReligion(religion)
        .then((data) => {
          setTemples(data);
          setFilteredTemples(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch the pilgrim sites.");
          setLoading(false);
        });
    }
  }, [religion]);

  useEffect(() => {
    setFilteredTemples(
      temples.filter((temple) =>
        temple.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, temples]);

  if (loading) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="container">
      <h1>Temples for {religion}</h1>

      <input
        type="text"
        placeholder="Search pilgrims..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      {filteredTemples.length > 0 ? (
        <ul className="temple-list">
          {filteredTemples.map((temple) => (
            <li key={temple._id} className="temple-item">
              <Link to={`/place/${temple._id}`} className="temple-link">
                <strong>{temple.name}</strong>
                <br />
                {temple.address || "Address not available"}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No temples found.</p>
      )}
    </div>
  );
}
