import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from "react-router-dom";
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
import Login from "./components/authentication/login";
import Signup from "./components/authentication/signup";
import TransportDetails from "./components/transportdetails";
import WhereToStayPage from "./components/wheretostay";
import NearbyAttractionsPage from "./components/nearbyattraction";

const TransportDetailsWrapper = () => {
  const { templeId } = useParams();
  return <TransportDetails templeId={templeId} />;
};

function App() {
  const location = useLocation();
  
  const showNavbar = location.pathname === "/" || 
                    (!location.pathname.startsWith("/place/") && 
                     !location.pathname.startsWith("/transport/") &&
                     !location.pathname.startsWith("/stay/") &&
                     !location.pathname.startsWith("/nearby-attractions/"));

  useEffect(() => {
    const sr = scrollreveal({
      origin: "top",
      distance: "80px",
      duration: 2000,
      reset: true,
    });

    sr.reveal(".navbar, #hero, #services, #recommend, #testimonials, .footer", {
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/transport/:templeId" element={<TransportDetailsWrapper />} />
        <Route path="/stay/:id" element={<WhereToStayPage />} />
        <Route path="/nearby-attractions/:id" element={<NearbyAttractionsPage />} />
      </Routes>
    </>
  );
}
export default App;
