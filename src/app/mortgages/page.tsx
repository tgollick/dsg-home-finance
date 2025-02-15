import NavBar from "@/components/NavBar";
import React from "react";
import Hero from "./_sections/Hero";
import PopularProducts from "./_sections/PopularProducts";
import WhyDavid from "./_sections/WhyDavid";
import Reviews from "./_sections/Reviews";

// type Props = {}

const Mortgages = () => {
  return (
    <main className="w-full flex flex-col items-center border-none">
      <NavBar />
      <Hero />
      <PopularProducts />
      <Reviews />
      <WhyDavid />
    </main>
  );
};

export default Mortgages;
