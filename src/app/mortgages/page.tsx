import NavBar from "@/components/NavBar";
import React from "react";
import Hero from "./_sections/Hero";
import PopularProducts from "./_sections/PopularProducts";
import WhyDavid from "./_sections/WhyDavid";
import Reviews from "./_sections/Reviews";
import ExplainProcess from "./_sections/ExplainProcess";
import FAQ from "./_sections/FAQ";
import CTA from "./_sections/CTA";
import { Footer } from "../_sections/components/Footer";

const Mortgages = () => {
  return (
    <main className="w-full flex flex-col items-center border-none">
      <NavBar />
      <Hero />
      <PopularProducts />
      <Reviews />
      <WhyDavid />
      <ExplainProcess />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
};

export default Mortgages;
