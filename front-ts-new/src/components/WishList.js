import React, { useEffect, useState } from 'react';

export const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const tokenuser = localStorage.getItem("token");
  const decodedtoken = JSON.parse(atob(tokenuser.split(".")[1]));
  const userId = decodedtoken.id;

  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(()=>{
    fetchWishlist();
  },[wishlist])

  const fetchWishlist = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/wishlist/${userId}`);
      const data = await response.json();

      if (data.success) {
        setWishlist(data.data.places || []);
      } else {
        setWishlist([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlist([]);
    }
  };

  const toggleWishlist = async (temple) => {
    try {
      const response = await fetch("http://localhost:5000/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...temple, userId }),
      });

      const data = await response.json();
      if (data.message) {
        fetchWishlist(); // Refresh list after toggle
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600">Your wishlist is empty 🕉️</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((temple, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <img
                src={temple.images}
                alt={temple.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{temple.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{temple.state}</p>
                <p className="text-gray-500 text-sm mb-2">{temple.address}</p>
                <p className="text-gray-700 text-sm mb-4">{temple.description}</p>
                <button
                  onClick={() => toggleWishlist(temple)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
