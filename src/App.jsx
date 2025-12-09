import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Partners from "./components/Partners";
import CourseCarousel from "./components/CourseCarousel";
import HowItWorks from "./components/HowItWorks";
import SelfPaced from "./components/SelfPaced";
import AccreditedDegrees from "./components/AccreditedDegrees";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";

// Import the REAL SignupPage file
import SignupPage from "./components/SignUpPage"; 

// Layout for the Main Landing Page
const LandingPage = () => (
  <>
    <Navbar />
    <Hero />
    <Partners />
    <CourseCarousel />
    <HowItWorks />
    <SelfPaced />
    <AccreditedDegrees />
    <Testimonials />
    <Pricing />
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <div className="bg-[#050505] min-h-screen w-full text-white">
        <Routes>
          {/* Main Home Route */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Signup Route - Uses the imported component */}
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
