import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchNearbyPlaces } from "../api";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function NearbyAttractionsPage() {
  const { id } = useParams();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNearbyPlaces(id)
      .then((data) => {
        setPlaces(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch nearby places.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <style>{`
        .nearby-attractions-container {
          max-width: 1200px;
          margin: auto;
          padding: 20px;
          text-align: center;
        }

        h1 {
          font-size: 2rem;
          color: #333;
          margin-bottom: 20px;
        }

        .places-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }

        .place-card {
          width: 300px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          background: #fff;
          transition: transform 0.3s ease-in-out;
        }

        .place-card:hover {
          transform: translateY(-5px);
        }

        .place-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .place-info {
          padding: 15px;
          text-align: left;
        }

        .place-info h2 {
          font-size: 1.5rem;
          margin-bottom: 10px;
          color: #444;
        }

        .place-info p {
          font-size: 1rem;
          color: #666;
          margin: 5px 0;
        }

        .icon {
          color: #e44d26;
          margin-right: 5px;
          font-size: 1.2rem;
        }
      `}</style>

      <div className="nearby-attractions-container">
        <h1>Nearby Attractions</h1>
        <div className="places-list">
          {places.length > 0 ? (
            places.map((place) => (
              <div key={place._id} className="place-card">
                <img
                  src={place.image || "default-image.jpg"}
                  alt={place.name}
                  className="place-image"
                />
                <div className="place-info">
                  <h2>{place.name}</h2>
                  <p>{place.description}</p>
                  <p>
                    <FaMapMarkerAlt className="icon" /> Location: {place.location}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No nearby attractions found.</p>
          )}
        </div>
      </div>
    </>
  );
}
