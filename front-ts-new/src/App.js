import React, { useEffect } from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import scrollreveal from "scrollreveal";

import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Recommend from "./components/Recommend";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Login from "./components/authentication/login";
import Signup from "./components/authentication/signup";
import ProfilePage from "./components/profile";

import Hinduism from './components/Hinduism';
import Christianity from './components/christianity';
import Islam from './components/islam';
import Jainism from './components/jainism';
import Buddhism from './components/buddhism';
import Sikhism from './components/sikhism';
import BuddhismDetails from './components/BuddhismDetails';
import ChristianityDetails from './components/ChristianityDetails';
import IslamDetails from './components/IslamDetails';
import JainismDetails from './components/JainismDetails';
import HinduismDetails from './components/HinduismDetails';
import SikhismDetails from './components/SikhismDetails';


import TransportDetails from "./components/transportdetails";
import WhereToStayPage from "./components/wheretostay";
import NearbyAttractionsPage from "./components/nearbyattraction";
import NearbyAttractionsChristianPage from "./components/nearbyattractionchristian";
import NearbyAttractionsIslamPage from "./components/nearbyattractionislam";
import NearbyAttractionsJainismPage from "./components/nearbyattractionjainism";
import NearbyAttractionsHinduismPage from "./components/nearbyattractionhinduism";
import NearbyAttractionsSikhismPage from "./components/nearbyattractionsikhism";
import { WishList } from "./components/WishList";

// Test the fetch with credentials on the frontend
// comment below fetch is not the proper way to fetch by Samadhan
// fetch("http://localhost:5000/api/some-endpoint", {
//   method: "GET",
//   credentials: "include",  // Ensure cookies are sent with the request
// })
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.log(error));

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
      !location.pathname.startsWith("/nearby-attractions/")&&
      !location.pathname.startsWith("/nearby-attractions-christian/")&&
      !location.pathname.startsWith("/nearby-attractions-jainism/")&&
      !location.pathname.startsWith("/nearby-attractions-hinduism/")&&
      !location.pathname.startsWith("/nearby-attractions-sikhism/")
      
    );

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
        <Route path="/" element={
          <>
            <Hero />
            <Services />
            <Recommend />
            <Testimonials />
            <Footer />
          </>
        } />

        <Route path="/search/:religion" element={<ReligionPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/temple/:id" element={<BuddhismDetails />} />
        <Route path="/christianity/:id" element={<ChristianityDetails />} />
        <Route path="/islam/:id" element={<IslamDetails />} />
        <Route path="/jainism/:id" element={<JainismDetails />} />
        <Route path="/hinduism/:id" element={<HinduismDetails />} />
        <Route path="/sikhism/:id" element={<SikhismDetails />} />
        <Route path="/transport/:templeId" element={<TransportDetailsWrapper />} />
        <Route path="/stay/:id" element={<WhereToStayPage />} />
        <Route path="/nearby-attractions/:id" element={<NearbyAttractionsPage />} />
        <Route path="/nearby-attractions-christian/:id" element={<NearbyAttractionsChristianPage />} />
        <Route path="/nearby-attractions-islam/:id" element={<NearbyAttractionsIslamPage />} />
        <Route path="/nearby-attractions-jainism/:id" element={<NearbyAttractionsJainismPage />} />
        <Route path="/nearby-attractions-hinduism/:id" element={<NearbyAttractionsHinduismPage />} />
        <Route path="/wishlist" element={<WishList />} />
        
      </Routes>
    </>
  );
}

function ReligionPage() {
  const { religion } = useParams();
  switch (religion) {
    case "Hinduism":
      return <Hinduism />;
    case "Christianity":
      return <Christianity />;
    case "Islam":
      return <Islam />;
    case "Jainism":
      return <Jainism />;
    case "Buddhism":
      return <Buddhism />;
    case "Sikhism":
      return <Sikhism />;
    default:
      return <div>Religion not found</div>;
  }
}

export default App;
