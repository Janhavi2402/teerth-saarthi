// import { useState, useEffect } from "react";

// const TransportDetails = ({ templeId }) => {
//   const [transportOptions, setTransportOptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTransportDetails = async () => {
//       if (!templeId) return; // Avoid fetching if templeId is not provided
//       try {
//         const response = await fetch(`http://localhost:5000/api/how-to-reach/${templeId}`);
//         if (!response.ok) {
//           if (response.status === 404) throw new Error("No transport options found.");
//           throw new Error("Failed to fetch transport details.");
//         }
//         const data = await response.json();
//         setTransportOptions(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransportDetails();
//   }, [templeId]);

//   if (loading) return <p className="text-center text-gray-600">Fetching the transport details...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Transport Options</h2>
//       {transportOptions.length === 0 ? (
//         <p className="text-gray-500">No transport options available.</p>
//       ) : (
//         <div className="space-y-4">
//           {transportOptions.map((option, index) => (
//             <div key={index} className="border p-4 rounded-lg shadow-sm bg-gray-50">
//               <h3 className="text-xl font-semibold text-blue-600">{option.transport_type}</h3>
//               <p><strong>Station:</strong> {option.station_name}</p>
//               <p><strong>Distance:</strong> {option.distance_km} km</p>
//               <p><strong>Fare:</strong> ₹{option.fare}</p>
//               <p><strong>Travel Time:</strong> {option.travel_time}</p>
//               <p><strong>Departure:</strong> {option.departure_times.join(", ")}</p>
//               <p><strong>Service Provider:</strong> {option.service_provider}</p>
//               {option.ticket_booking_url && (
//                 <a
//                   href={option.ticket_booking_url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 hover:underline font-semibold"
//                 >
//                   Book Tickets
//                 </a>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TransportDetails;
import { useState, useEffect } from "react";
import { FaBus, FaTrain, FaTaxi, FaCar } from "react-icons/fa";

const TransportDetails = ({ templeId }) => {
  const [transportOptions, setTransportOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransportDetails = async () => {
      if (!templeId) return;
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

  if (loading)
    return (
      <p style={styles.loading}>Loading transport details...</p>
    );
  if (error)
    return (
      <p style={styles.error}>{error}</p>
    );

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.headerBox}>
        <h1 style={styles.header}>Transport Options</h1>
        <p style={styles.subHeader}>Explore transport options to reach the pilgrim.</p>
      </div>
      <div style={styles.cardGrid}>
        {transportOptions.map((option, index) => (
          <div key={index} style={styles.card} className="transport-card">
            {/* Transport Type Icon and Title */}
            <div style={styles.iconBox}>
              {option.transport_type === "Bus" && <FaBus size={50} color="#1d4ed8" />}
              {option.transport_type === "Train" && <FaTrain size={50} color="#1d4ed8" />}
              {option.transport_type === "Taxi" && <FaTaxi size={50} color="#1d4ed8" />}
              {option.transport_type === "Car" && <FaCar size={50} color="#1d4ed8" />}
              <h3 style={styles.cardTitle}>{option.transport_type}</h3>
            </div>

            {/* Details of the transport option */}
            <div style={styles.metaBox}>
              <p style={styles.cardDesc}><strong>Station:</strong> {option.station_name}</p>
              <p style={styles.cardDesc}><strong>Distance:</strong> {option.distance_km} km</p>
              <p style={styles.cardDesc}><strong>Fare:</strong> ₹{option.fare}</p>
              <p style={styles.cardDesc}><strong>Travel Time:</strong> {option.travel_time}</p>
              <p style={styles.cardDesc}><strong>Departure Times:</strong> {option.departure_times.join(", ")}</p>
              <p style={styles.cardDesc}><strong>Service Provider:</strong> {option.service_provider}</p>

              {option.ticket_booking_url && (
                <a
                  href={option.ticket_booking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.bookButton}
                >
                  Book Tickets
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          .transport-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .transport-card:hover {
            transform: scale(1.05);
            box-shadow: 0 18px 30px rgba(0, 0, 0, 0.12);
            background: linear-gradient(135deg, #ffffff, #f9fbfc);
          }
        `}
      </style>
    </div>
  );
};

export default TransportDetails;

const styles = {
  pageWrapper: {
    padding: '60px 25px',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #ecf0f3, #dfe9f3)',
    fontFamily: '"Segoe UI", sans-serif',
  },
  headerBox: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  header: {
    fontSize: '3rem',
    color: '#2c3e50',
    marginBottom: '10px',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
  },
  subHeader: {
    fontSize: '1.15rem',
    color: '#7f8c8d',
    letterSpacing: '0.5px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.07)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  iconBox: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '1.6rem',
    marginLeft: '20px',
    color: '#34495e',
    fontWeight: '600',
  },
  cardDesc: {
    fontSize: '1rem',
    color: '#616161',
    marginBottom: '14px',
    lineHeight: '1.5',
  },
  metaBox: {
    fontSize: '0.9rem',
    color: '#2d3436',
    marginTop: '10px',
  },
  bookButton: {
    display: 'inline-block',
    backgroundColor: '#0984e3',
    color: '#fff',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: '8px',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  },
  bookButtonHover: {
    backgroundColor: '#74b9ff',
  },
  loading: {
    fontSize: '1.3rem',
    textAlign: 'center',
    paddingTop: '60px',
    color: '#555',
  },
  error: {
    fontSize: '1.2rem',
    textAlign: 'center',
    color: 'red',
    paddingTop: '60px',
  },
};
