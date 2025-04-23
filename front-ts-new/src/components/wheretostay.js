// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { FaHotel, FaPhone, FaMoneyBill, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

// export default function WhereToStayPage() {
//   const { id } = useParams();
//   const [stays, setStays] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchWhereToStay = async () => {
//       if (!id) return;
//       try {
//         const response = await fetch(`http://localhost:5000/api/stays/${id}`);
//         if (!response.ok) {
//           if (response.status === 404) throw new Error("No accommodations found.");
//           throw new Error("Failed to fetch stay details.");
//         }
//         const data = await response.json();
//         setStays(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWhereToStay();
//   }, [id]);

//   if (loading) return <p className="text-center text-gray-600">Fetching accommodation details...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Where to Stay Near the Temple</h1>
//       {stays.length === 0 ? (
//         <p className="text-center text-gray-600">No accommodations found.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-6">
//           {stays.map((stay) => (
//             <div key={stay._id} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
//               <h2 className="text-xl font-semibold flex items-center gap-2">
//                 <FaHotel className="text-blue-500" /> {stay.dharamshala_name}
//               </h2>
//               <p className="text-gray-700 flex items-center gap-2">
//                 <FaPhone className="text-green-500" /> <span className="font-medium">Contact:</span> {stay.contact_number}
//               </p>
//               <p className="text-gray-700 flex items-center gap-2">
//                 <FaMoneyBill className="text-yellow-500" /> <span className="font-medium">Cost per Night:</span> ₹{stay.cost_per_night}
//               </p>
//               <p className="text-gray-700 flex items-center gap-2">
//                 <FaMapMarkerAlt className="text-red-500" /> <span className="font-medium">Distance from Temple:</span> {stay.distance_from_temple_km} km
//               </p>
//               <p className="text-gray-700 flex items-center gap-2">
//                 <FaMapMarkerAlt className="text-red-500" /> <span className="font-medium">Distance from Train Station:</span> {stay.distance_from_train_station_km} km
//               </p>
//               <p className="text-gray-700 flex items-center gap-2">
//                 <FaMapMarkerAlt className="text-red-500" /> <span className="font-medium">Distance from Bus Stand:</span> {stay.distance_from_bus_stand_km} km
//               </p>
//               <p className="text-gray-700">
//                 <strong className="font-medium">Facilities:</strong> {stay.facilities?.length ? stay.facilities.join(", ") : "Not available"}
//               </p>
//               {stay.website_url && (
//                 <p className="mt-2">
//                   <a href={stay.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
//                     <FaGlobe /> Visit Website
//                   </a>
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { FaHotel, FaPhone, FaRupeeSign, FaMapMarkerAlt, FaTrain, FaBus, FaGlobe, FaThumbsUp, FaCertificate, FaShieldAlt, FaMapMarkedAlt } from "react-icons/fa";

// // Hardcode image paths for direct use
// const STAY_IMAGES = {
//   dharamshala1: {
//     main: '/images/stays/main1.jpg',
//     gallery: [
//       '/images/stays/gallery1.jpg',
//       '/images/stays/gallery2.jpg',
//       '/images/stays/gallery3.jpg',
//       '/images/stays/gallery4.jpg',
//     ]
//   },
//   dharamshala2: {
//     main: '/images/stays/main2.jpg',
//     gallery: [
//       '/images/stays/gallery2.jpg', 
//       '/images/stays/gallery5.jpg',
//       '/images/stays/gallery3.jpg',
//       '/images/stays/gallery1.jpg',
//     ]
//   },
//   dharamshala3: {
//     main: '/images/stays/gallery5.jpg',
//     gallery: [
//       '/images/stays/gallery4.jpg',
//       '/images/stays/gallery1.jpg',
//       '/images/stays/main1.jpg',
//       '/images/stays/gallery3.jpg',
//     ]
//   }
// };

// export default function WhereToStayPage() {
//   const { id } = useParams();
//   const [stays, setStays] = useState([]);
//   const [loading, setLoading] = useState(false); // Start with loading false to show hardcoded data
//   const [error, setError] = useState(null);
  
//   // Hardcoded test data that will always be available
//   const testData = [
//     {
//       _id: "test1",
//       dharamshala_name: "Shree Somnath Trust Dharamshala",
//       description: "Comfortable accommodations that offer a peaceful stay with various room options from standard to deluxe. Perfect location with easy access to nearby attractions and conveniences.",
//       contact_number: "9876543210",
//       cost_per_night: "500 - 1500",
//       distance_from_temple_km: "0.5",
//       distance_from_train_station_km: "6.5",
//       distance_from_bus_stand_km: "1.0",
//       facilities: ["WiFi", "Hot Water", "Parking", "24/7 Reception"],
//       imageSet: {
//         main: STAY_IMAGES.dharamshala1.main,
//         gallery: STAY_IMAGES.dharamshala1.gallery
//       }
//     },
//     {
//       _id: "test2",
//       dharamshala_name: "Swaminarayan Guest House",
//       description: "Located conveniently in a serene setting with spacious rooms and a meditation hall. Ideal for visitors seeking a calm environment and comfortable stay.",
//       contact_number: "9988776655",
//       cost_per_night: "600 - 1800",
//       distance_from_temple_km: "0.8",
//       distance_from_train_station_km: "6.8",
//       distance_from_bus_stand_km: "1.2",
//       facilities: ["Spacious Rooms", "Meditation Hall", "Restaurant", "Parking"],
//       imageSet: {
//         main: STAY_IMAGES.dharamshala2.main,
//         gallery: STAY_IMAGES.dharamshala2.gallery
//       }
//     },
//     {
//       _id: "test3",
//       dharamshala_name: "Gayatri Shaktipeeth Dharamshala",
//       description: "Affordable accommodations with AC rooms and scenic views. Enjoy a comfortable stay with all necessary modern amenities.",
//       contact_number: "9123456789",
//       cost_per_night: "400 - 1200",
//       distance_from_temple_km: "1.0",
//       distance_from_train_station_km: "7.0",
//       distance_from_bus_stand_km: "1.5",
//       facilities: ["AC Rooms", "Canteen", "Parking", "Scenic View"],
//       imageSet: {
//         main: STAY_IMAGES.dharamshala3.main,
//         gallery: STAY_IMAGES.dharamshala3.gallery
//       }
//     }
//   ];

//   useEffect(() => {
//     // Always use the test data first
//     setStays(testData);
    
//     // Only try to fetch API data if there's an ID
//     if (id) {
//       fetchApiData();
//     }
//   }, [id]);

//   const fetchApiData = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/stays/${id}`);
//       if (!response.ok) {
//         if (response.status === 404) throw new Error("No accommodations found.");
//         throw new Error("Failed to fetch stay details.");
//       }
//       const data = await response.json();

//       // Add image data to the API responses
//       const enhancedData = data.map((stay, index) => {
//         // Select a different image set for each dharamshala based on index
//         let imageSet;
//         if (index % 3 === 0) {
//           imageSet = STAY_IMAGES.dharamshala1;
//         } else if (index % 3 === 1) {
//           imageSet = STAY_IMAGES.dharamshala2;
//         } else {
//           imageSet = STAY_IMAGES.dharamshala3;
//         }

//         return {
//           ...stay,
//           imageSet: {
//             main: imageSet.main,
//             gallery: imageSet.gallery
//           }
//         };
//       });

//       setStays(enhancedData);
//     } catch (err) {
//       setError(err.message);
//       // If API call fails, use test data as fallback
//       setStays(testData);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center h-64">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   );
  
//   if (error) return (
//     <div className="max-w-4xl mx-auto p-6 bg-red-50 rounded-lg border border-red-200">
//       <p className="text-center text-red-500 font-medium">{error}</p>
//     </div>
//   );

//   return (
//     <div className="bg-gray-50 min-h-screen py-10 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">Accommodation Options</h1>
        
//         {stays.length === 0 ? (
//           <div className="bg-white p-8 rounded-lg shadow text-center">
//             <p className="text-gray-600 text-lg">No accommodations found for this location.</p>
//             <p className="text-gray-500 mt-2">Please try searching for a different location or contact support for assistance.</p>
//           </div>
//         ) : (
//           <div className="space-y-8">
//             {stays.map((stay, index) => {
//               const isRecommended = index === 0; // First item is recommended
              
//               // Use different accent colors for each accommodation type
//               let accentColor, bgAccentColor;
//               if (index % 3 === 0) {
//                 accentColor = "text-blue-500";
//                 bgAccentColor = "bg-blue-500";
//               } else if (index % 3 === 1) {
//                 accentColor = "text-green-500";
//                 bgAccentColor = "bg-green-500";
//               } else {
//                 accentColor = "text-purple-500";
//                 bgAccentColor = "bg-purple-500";
//               }
              
//               return (
//                 <div key={stay._id || index} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
//                   <div className="md:flex">
//                     <div className="md:w-96 flex-shrink-0">
//                       <img 
//                         src={stay.image_url || (process.env.PUBLIC_URL + stay.imageSet.main)} 
//                         alt={stay.dharamshala_name || "Accommodation"} 
//                         className="h-64 md:h-full w-full object-cover"
//                         onError={(e) => {
//                           e.target.onerror = null;
//                           e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
//                         }}
//                       />
//                     </div>
                    
//                     <div className="p-6 md:p-8 flex-1">
//                       <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
//                         <h2 className="text-2xl font-bold text-gray-800">
//                           {stay.dharamshala_name || "Tibetan Style Accommodation"}
//                         </h2>
                        
//                         {isRecommended && (
//                           <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${bgAccentColor} text-white`}>
//                             <FaThumbsUp className="mr-1" /> Recommended
//                           </span>
//                         )}
//                       </div>
                      
//                       <p className="text-gray-600 mb-6">
//                         {stay.description || `Comfortable accommodations in a traditional Tibetan-style building with beautiful architectural details. 
//                         Offers visitors a peaceful and authentic environment with convenient access to nearby attractions.`}
//                       </p>
                      
//                       <div className="space-y-2 mb-6">
//                         <div className="flex items-center text-gray-700">
//                           <FaPhone className={`${accentColor} mr-3`} />
//                           <span className="font-medium">Contact:</span>
//                           <span className="ml-2">{stay.contact_number || "9876543210"}</span>
//                         </div>
                        
//                         <div className="flex items-center text-gray-700">
//                           <FaRupeeSign className={`${accentColor} mr-3`} />
//                           <span className="font-medium">Cost per Night:</span>
//                           <span className="ml-2">₹{stay.cost_per_night || "800 - 1200"}</span>
//                         </div>
                        
//                         <div className="flex items-center text-gray-700">
//                           <FaMapMarkerAlt className={`${accentColor} mr-3`} />
//                           <span className="font-medium">Distance from Temple:</span>
//                           <span className="ml-2">{stay.distance_from_temple_km || "0.5"} km</span>
//                         </div>
                        
//                         <div className="flex items-center text-gray-700">
//                           <FaTrain className={`${accentColor} mr-3`} />
//                           <span className="font-medium">Distance from Train Station:</span>
//                           <span className="ml-2">{stay.distance_from_train_station_km || "2.5"} km</span>
//                         </div>
                        
//                         <div className="flex items-center text-gray-700">
//                           <FaBus className={`${accentColor} mr-3`} />
//                           <span className="font-medium">Distance from Bus Stand:</span>
//                           <span className="ml-2">{stay.distance_from_bus_stand_km || "1.2"} km</span>
//                         </div>
//                       </div>
                      
//                       <div className="mb-6">
//                         <h3 className="text-lg font-semibold text-gray-800 mb-3">Amenities</h3>
//                         <div className="flex flex-wrap gap-x-6 gap-y-2">
//                           {stay.facilities && stay.facilities.length > 0 ? (
//                             stay.facilities.map((facility, idx) => (
//                               <div key={idx} className={`flex items-center text-gray-600 before:content-['✓'] before:mr-2 before:${accentColor}`}>
//                                 {facility}
//                               </div>
//                             ))
//                           ) : (
//                             <>
//                               <div className={`flex items-center text-gray-600 before:content-['✓'] before:mr-2 before:${accentColor}`}>
//                                 Traditional Architecture
//                               </div>
//                               <div className={`flex items-center text-gray-600 before:content-['✓'] before:mr-2 before:${accentColor}`}>
//                                 Prayer Hall
//                               </div>
//                               <div className={`flex items-center text-gray-600 before:content-['✓'] before:mr-2 before:${accentColor}`}>
//                                 Community Kitchen
//                               </div>
//                               <div className={`flex items-center text-gray-600 before:content-['✓'] before:mr-2 before:${accentColor}`}>
//                                 Cultural Activities
//                               </div>
//                             </>
//                           )}
//                         </div>
//                       </div>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                         <div className="border border-gray-100 rounded-lg p-4 text-center">
//                           <FaCertificate className={`${accentColor} text-xl mx-auto mb-2`} />
//                           <div className="font-semibold text-gray-800">Authentic Experience</div>
//                           <div className="text-sm text-gray-500">Traditional Design</div>
//                         </div>
                        
//                         <div className="border border-gray-100 rounded-lg p-4 text-center">
//                           <FaMapMarkedAlt className={`${accentColor} text-xl mx-auto mb-2`} />
//                           <div className="font-semibold text-gray-800">Location</div>
//                           <div className="text-sm text-gray-500">Convenient</div>
//                         </div>
                        
//                         <div className="border border-gray-100 rounded-lg p-4 text-center">
//                           <FaShieldAlt className={`${accentColor} text-xl mx-auto mb-2`} />
//                           <div className="font-semibold text-gray-800">Safety</div>
//                           <div className="text-sm text-gray-500">Priority</div>
//                         </div>
//                       </div>
                      
//                       <div className="text-center italic text-gray-500 text-sm mb-4">
//                         For more details and booking information, click the details button
//                       </div>
                      
//                       <div className="flex justify-end">
//                         {stay.website_url ? (
//                           <a 
//                             href={stay.website_url} 
//                             target="_blank" 
//                             rel="noopener noreferrer" 
//                             className={`inline-block ${bgAccentColor} hover:opacity-90 text-white px-6 py-2 rounded-lg font-semibold transition-colors`}
//                           >
//                             Details
//                           </a>
//                         ) : (
//                           <button className={`${bgAccentColor} hover:opacity-90 text-white px-6 py-2 rounded-lg font-semibold transition-colors`}>
//                             Details
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="grid grid-cols-4 gap-1 p-2 bg-gray-50">
//                     {stay.imageSet.gallery.map((img, idx) => (
//                       <img 
//                         key={idx} 
//                         src={process.env.PUBLIC_URL + img} 
//                         alt={`${stay.dharamshala_name || "Accommodation"} view ${idx + 1}`} 
//                         className="h-24 w-full object-cover rounded"
//                         onError={(e) => {
//                           e.target.onerror = null;
//                           e.target.src = 'https://via.placeholder.com/200x150?text=Image+Not+Found';
//                         }}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
//}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaPhone, FaRupeeSign, FaMapMarkerAlt, FaTrain,
  FaBus, FaThumbsUp, FaCertificate, FaShieldAlt, FaMapMarkedAlt
} from "react-icons/fa";

export default function WhereToStayPage() {
  const { id } = useParams();
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
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

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-4xl mx-auto p-6 bg-red-50 rounded-lg border border-red-200">
      <p className="text-center text-red-500 font-medium">{error}</p>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-blue-50 via-gray-100 to-gray-300 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-10">Accommodation Options</h1>

        {stays.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600 text-lg">No accommodations found for this location.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stays.map((stay, index) => {
              const isRecommended = index === 0;
              const accentColor = index % 3 === 0 ? "text-blue-500" : index % 3 === 1 ? "text-green-500" : "text-purple-500";
              const bgAccentColor = index % 3 === 0 ? "bg-blue-500" : index % 3 === 1 ? "bg-green-500" : "bg-purple-500";

              return (
                <div
                  key={stay._id || index}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition duration-300 overflow-hidden"
                >
                  <div className="p-5 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <h2 className="text-xl font-semibold text-gray-800">{stay.dharamshala_name}</h2>
                      {isRecommended && (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${bgAccentColor} text-white`}>
                          <FaThumbsUp className="mr-1" /> Recommended
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{stay.description}</p>

                    <div className="space-y-1.5 mb-4 text-sm">
                      <div className="flex items-center text-gray-700"><FaPhone className={`${accentColor} mr-2`} /><span className="font-medium">Contact:</span><span className="ml-2">{stay.contact_number}</span></div>
                      <div className="flex items-center text-gray-700"><FaRupeeSign className={`${accentColor} mr-2`} /><span className="font-medium">Cost:</span><span className="ml-2">₹{stay.cost_per_night}</span></div>
                      <div className="flex items-center text-gray-700"><FaMapMarkerAlt className={`${accentColor} mr-2`} /><span className="font-medium">Temple:</span><span className="ml-2">{stay.distance_from_temple_km} km</span></div>
                      <div className="flex items-center text-gray-700"><FaTrain className={`${accentColor} mr-2`} /><span className="font-medium">Train:</span><span className="ml-2">{stay.distance_from_train_station_km} km</span></div>
                      <div className="flex items-center text-gray-700"><FaBus className={`${accentColor} mr-2`} /><span className="font-medium">Bus:</span><span className="ml-2">{stay.distance_from_bus_stand_km} km</span></div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-800 mb-2">Amenities</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
                        {stay.facilities.map((facility, idx) => (
                          <div key={idx} className={`flex items-center before:content-['✓'] before:mr-1 before:${accentColor}`}>{facility}</div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                      <div className="border rounded-md p-3 text-center"><FaCertificate className={`${accentColor} text-base mx-auto mb-1`} /><div className="font-medium text-gray-800">Authentic</div></div>
                      <div className="border rounded-md p-3 text-center"><FaMapMarkedAlt className={`${accentColor} text-base mx-auto mb-1`} /><div className="font-medium text-gray-800">Location</div></div>
                      <div className="border rounded-md p-3 text-center"><FaShieldAlt className={`${accentColor} text-base mx-auto mb-1`} /><div className="font-medium text-gray-800">Safety</div></div>
                    </div>

                    <div className="text-center italic text-gray-400 text-xs mb-3">For more details and booking, click below</div>
                    <div className="flex justify-end">
                      {stay.website_url ? (
                        <a href={stay.website_url} target="_blank" rel="noopener noreferrer" className={`inline-block ${bgAccentColor} hover:opacity-90 text-white px-4 py-1.5 rounded-md text-sm font-semibold`}>
                          Details
                        </a>
                      ) : (
                        <button className={`${bgAccentColor} hover:opacity-90 text-white px-4 py-1.5 rounded-md text-sm font-semibold`}>
                          Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

