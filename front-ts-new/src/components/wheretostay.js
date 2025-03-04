import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHotel, FaPhone, FaMoneyBill, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

export default function WhereToStayPage() {
  const { id } = useParams();
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWhereToStay = async () => {
      if (!id) return;
      try {
        const response = await fetch(`http://localhost:5000/api/stays/${id}`);
        if (!response.ok) {
          if (response.status === 404) throw new Error("No accommodations found.");
          throw new Error("Failed to fetch stay details.");
        }
        const data = await response.json();
        setStays(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWhereToStay();
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Fetching accommodation details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Where to Stay Near the Temple</h1>
      {stays.length === 0 ? (
        <p className="text-center text-gray-600">No accommodations found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {stays.map((stay) => (
            <div key={stay._id} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FaHotel className="text-blue-500" /> {stay.dharamshala_name}
              </h2>
              <p className="text-gray-700 flex items-center gap-2">
                <FaPhone className="text-green-500" /> <span className="font-medium">Contact:</span> {stay.contact_number}
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <FaMoneyBill className="text-yellow-500" /> <span className="font-medium">Cost per Night:</span> ₹{stay.cost_per_night}
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" /> <span className="font-medium">Distance from Temple:</span> {stay.distance_from_temple_km} km
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" /> <span className="font-medium">Distance from Train Station:</span> {stay.distance_from_train_station_km} km
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" /> <span className="font-medium">Distance from Bus Stand:</span> {stay.distance_from_bus_stand_km} km
              </p>
              <p className="text-gray-700">
                <strong className="font-medium">Facilities:</strong> {stay.facilities?.length ? stay.facilities.join(", ") : "Not available"}
              </p>
              {stay.website_url && (
                <p className="mt-2">
                  <a href={stay.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                    <FaGlobe /> Visit Website
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
