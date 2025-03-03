import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Recommend from "./components/Recommend";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import SearchResults from "./components/SearchResults";
import scrollreveal from "scrollreveal";
import PlacePage from "./components/PlacePage";

function Layout() {
  const location = useLocation();
  const showNavbar = location.pathname === "/"; // Only show navbar on the home page



  useEffect(() => {
    // Scroll Reveal Animation
    const sr = scrollreveal({
      origin: "top",
      distance: "80px",
      duration: 2000,
      reset: true,
    });

    sr.reveal(`nav, #hero, #services, #recommend, #testimonials, footer`, {
      opacity: 0,
      interval: 300,
    });
  }, []);

  return (
    <>
      <ScrollToTop />
      {showNavbar && <Navbar />}
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
        <Route path="/search" element={<SearchResults />} />
        <Route path="/place/:id" element={<PlacePage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
