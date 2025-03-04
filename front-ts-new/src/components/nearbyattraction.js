import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function NearbyAttractionsPage() {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/temples/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch temple details.");
        }
        const data = await response.json();
        console.log("Fetched Data:", data); // Debugging output

        setTemple(data.temple);
        setAttractions(data.attractions || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!temple) return <p>Temple not found.</p>;

  return (
    <div className="nearby-attractions-container">
      <h1>{temple.name} - Nearby Attractions</h1>
      <p><strong>Address:</strong> {temple.address}</p>
      <p><strong>Religion:</strong> {temple.religion}</p>

      <div className="attractions-list">
        {attractions.length > 0 ? (
          attractions.map((attraction, index) => (
            <div className="attraction-card" key={index}>
              <FaMapMarkerAlt className="icon" />
              <h2>{attraction.name}</h2>
              <p><strong>Distance:</strong> {attraction.distance}</p>
              <p>{attraction.description}</p>
            </div>
          ))
        ) : (
          <p>No attractions available.</p>
        )}
      </div>
    </div>
  );
}
