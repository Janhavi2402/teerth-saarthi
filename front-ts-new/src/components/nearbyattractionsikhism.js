import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function NearbyAttractionsSikhism() {
  const { id } = useParams();
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [gurudwara, setGurudwara] = useState(null);

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Places' },
    { id: 'historical', name: 'Historical' },
    { id: 'natural', name: 'Natural' },
    { id: 'religious', name: 'Religious' },
    { id: 'culinary', name: 'Food & Dining' }
  ];

  useEffect(() => {
    async function fetchNearbyAttractions() {
      try {
        const response = await fetch(`http://localhost:5000/api/sikhism/${id}`);
        const data = await response.json();

        if (!response.ok) throw new Error('Failed to fetch Sikhism details.');

        // Set Gurudwara details (assumed to be returned from MongoDB)
        if (data?.gurudwara) {
          setGurudwara(data.gurudwara);
        } else {
          setError('Gurudwara details not found.');
          return;
        }

        // Set the nearby attractions if available
        if (data?.nearby_places?.length > 0) {
          setAttractions(data.nearby_places);
        } else {
          setError('No nearby attractions found.');
        }

        setLoading(false);
      } catch (error) {
        setError('Error fetching nearby attractions');
        setLoading(false);
      }
    }

    fetchNearbyAttractions();
  }, [id]);

  // Filter attractions by category
  const filteredAttractions = activeCategory === 'all' 
    ? attractions 
    : attractions.filter(attraction => attraction.category === activeCategory);

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
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Simple Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Nearby Attractions
          </h1>
          <p className="text-gray-600">
            Discover places near {gurudwara ? gurudwara.name : 'this location'}
          </p>
        </div>

        {/* Simple Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeCategory === category.id 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredAttractions.length > 0 ? (
            filteredAttractions.map((place) => (
              <div
                key={place.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                {/* Category Label */}
                <div className="p-4 bg-blue-50 border-b border-blue-100">
                  <span className="text-blue-600 font-medium capitalize">
                    {place.category}
                  </span>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {place.name}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                      {place.rating}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-2">
                    {place.distance_km} km • {place.estimated_time}
                  </div>
                  
                  <p className="text-gray-600 mb-3">
                    {place.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-600">No attractions found in this category.</p>
            </div>
          )}
        </div>

        {/* Simple Footer */}
        <div className="text-center text-gray-500 text-sm py-4">
          <p>© 2023 Teerth Saarthi. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
