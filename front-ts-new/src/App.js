import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Recommend from "./components/Recommend";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Hinduism from "./components/religion_list/hinduism";
import Christianity from "./components/religion_list/christianity";
import Islam from "./components/religion_list/islam";
import Buddhism from "./components/religion_list/buddhism";
import Jainism from "./components/religion_list/jainism";
import Sikhism from "./components/religion_list/sikhism";
import Login from "./components/authentication/login";
import Signup from "./components/authentication/signup";
import scrollreveal from "scrollreveal";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); 
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    setIsAuthenticated(false);
  };
  useEffect(() => {
    // Scroll Reveal Animation
    const sr = scrollreveal({
      origin: "top",
      distance: "80px",
      duration: 2000,
      reset: true,
    });

    sr.reveal(
      `nav, #hero, #services, #recommend, #testimonials, footer`,
      {
        opacity: 0,
        interval: 300,
      }
    );
  }, []); // Dependency array to run effect only once

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Services />
              <Recommend />
              <Testimonials />
              <Footer />
            </>
          }
        />
        <Route path="/religion_list/hinduism" element={<Hinduism />} />
        <Route path="/religion_list/christianity" element={<Christianity />} />
        <Route path="/religion_list/islam" element={<Islam />} />
        <Route path="/religion_list/buddhism" element={<Buddhism />} />
        <Route path="/religion_list/jainism" element={<Jainism />} />
        <Route path="/religion_list/sikhism" element={<Sikhism />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </Router>
  );
}
