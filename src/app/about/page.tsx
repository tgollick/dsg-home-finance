import React from "react";
import Hero from "./_sections/Hero";
import { TimelineSection } from "./_sections/TimelineSection";
import NavBar from "@/components/NavBar";
import CTA from "../mortgages/_sections/CTA";
import { Footer } from "../_sections/components/Footer";

// type Props = {}

const About = () => {
  return (
    <main>
      <NavBar />
      <Hero />
      <TimelineSection />
      <CTA />
      <Footer />
    </main>
  );
};

export default About;
