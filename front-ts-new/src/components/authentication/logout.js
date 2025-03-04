import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data (Example: localStorage)
    localStorage.removeItem('authToken'); // Remove token if stored
    sessionStorage.removeItem('authToken'); // Optional: remove from session storage

    // Redirect to login page
    navigate('/');
  };

  return (
    <button 
      onClick={handleLogout} 
      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default Logout;
