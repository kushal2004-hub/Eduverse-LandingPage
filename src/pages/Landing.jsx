import React from "react";
import MainLayout from "../layouts/MainLayout";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import BenefitsCarousel from "../components/BenefitsCarousel";
import HowItWorks from "../components/HowItWorks";
import SelfPaced from "../components/SelfPaced";
import AccreditedDegrees from "../components/AccreditedDegrees";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <MainLayout>
      <Hero />
      <Partners />
      <BenefitsCarousel />
      <HowItWorks />
      <SelfPaced />
      <AccreditedDegrees />
      <Testimonials />
      <Pricing />
      <Footer />
    </MainLayout>
  );
}
