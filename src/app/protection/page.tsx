import NavBar from "@/components/NavBar";
import React from "react";
import CTA from "../mortgages/_sections/CTA";
import { Footer } from "../_sections/components/Footer";
import Hero from "./_sections/Hero";
import ProtectionExplained from "./_sections/ProtectionExplained";
import ProtectionProducts from "./_sections/ProtectionProducts";
import ProtectionSteps from "./_sections/ProtectionSteps";
import CompaniesAndFAQ from "./_sections/CompaniesAndFAQ";

// type Props = {}

const Protection = () => {
  return (
    <main className="w-full flex flex-col items-center border-none">
      <NavBar />
      <Hero />
      <ProtectionExplained />
      <ProtectionProducts />
      <ProtectionSteps />
      <CompaniesAndFAQ />
      <CTA />
      <Footer />
    </main>
  );
};

export default Protection;
