import { useEffect, useState } from "react";
import { FaPrayingHands } from "react-icons/fa";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        // console.log("token",token)
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await fetch("http://localhost:5000/auth/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });
     
        const data = await response.json();
        console.log("data", data);
        if (response.ok) {
          setProfile(data);
        } else {
          console.error("Error:", data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile)
    return (
      <div className="flex items-center justify-center min-h-screen bg-yellow-100">
        <p className="text-lg font-semibold text-gray-700 animate-pulse">
          Loading profile...
        </p>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-300 to-orange-500 p-6">
      <div className="w-full max-w-lg p-8 bg-white shadow-2xl rounded-3xl border border-yellow-400">
        <div className="flex justify-center">
          <FaPrayingHands className="text-orange-600 text-5xl mb-4" />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-orange-800 mb-6">
          Teerth Sarthi Profile
        </h2>
        <div className="space-y-6">
          <div className="p-4 bg-yellow-100 rounded-lg shadow-md">
            <p className="text-lg font-semibold text-orange-800">
              <span className="text-orange-600">Full Name:</span> {profile.name}
            </p>
            <p className="text-lg font-semibold text-orange-800">
              <span className="text-orange-600">Email:</span> {profile.email}
            </p>
            <p className="text-lg font-semibold text-orange-800">
              <span className="text-orange-600">Wishlist:</span>{" "}
              {profile.wishlist?.length > 0 ? profile.wishlist.join(", ") : "No items in wishlist"}
            </p>
          </div>

          <div>
            <label className="block text-lg font-semibold text-orange-800 mb-2">
              Your Experience with Teerth Sarthi
            </label>
            <textarea
              className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-yellow-50"
              rows="4"
              placeholder="Share your thoughts or suggestions..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </div>

          <button className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg shadow-lg hover:from-orange-600 hover:to-yellow-600 transition duration-300 transform hover:scale-105">
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
