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
        console.log("API Response:", data); // Debugging
        setPlaces(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch nearby places.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Nearby Attractions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {places.length > 0 ? (
          places.map((place, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105"
            >
              <div className="h-40 flex items-center justify-center bg-gray-200 rounded-lg">
                <span className="text-gray-500">No Image Available</span>
              </div>
              <div className="text-left mt-4">
                <h2 className="text-xl font-semibold text-gray-700">{place.name || "Unnamed Place"}</h2>
                <p className="text-gray-600 mt-2">{place.description || "No description available."}</p>
                <p className="text-gray-500 mt-2 flex items-center">
                  <FaMapMarkerAlt className="text-red-500 mr-2" /> {place.location || "Unknown"}
                </p>
                <p className="text-gray-500 mt-2">
                  <strong>Distance:</strong> {place.distance_km ? `${place.distance_km} km` : "Unknown"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No nearby attractions found.</p>
        )}
      </div>
    </div>
  );
}
