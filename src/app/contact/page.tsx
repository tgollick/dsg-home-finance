import NavBar from "@/components/NavBar";
import React from "react";
import { Footer } from "../_sections/components/Footer";
import ContactSection from "./_section/ContactSection";

// type Props = {}

const Contact = () => {
  return (
    <main className="w-full h-full">
      <NavBar />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Contact;
