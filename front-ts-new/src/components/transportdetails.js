import { useState, useEffect } from "react";

const TransportDetails = ({ templeId }) => {
  const [transportOptions, setTransportOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransportDetails = async () => {
      if (!templeId) return; // Avoid fetching if templeId is not provided
      try {
        const response = await fetch(`http://localhost:5000/api/how-to-reach/${templeId}`);
        if (!response.ok) {
          if (response.status === 404) throw new Error("No transport options found.");
          throw new Error("Failed to fetch transport details.");
        }
        const data = await response.json();
        setTransportOptions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransportDetails();
  }, [templeId]);

  if (loading) return <p className="text-center text-gray-600">Fetching the transport details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Transport Options</h2>
      {transportOptions.length === 0 ? (
        <p className="text-gray-500">No transport options available.</p>
      ) : (
        <div className="space-y-4">
          {transportOptions.map((option, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-sm bg-gray-50">
              <h3 className="text-xl font-semibold text-blue-600">{option.transport_type}</h3>
              <p><strong>Station:</strong> {option.station_name}</p>
              <p><strong>Distance:</strong> {option.distance_km} km</p>
              <p><strong>Fare:</strong> ₹{option.fare}</p>
              <p><strong>Travel Time:</strong> {option.travel_time}</p>
              <p><strong>Departure:</strong> {option.departure_times.join(", ")}</p>
              <p><strong>Service Provider:</strong> {option.service_provider}</p>
              {option.ticket_booking_url && (
                <a
                  href={option.ticket_booking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline font-semibold"
                >
                  Book Tickets
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransportDetails;
