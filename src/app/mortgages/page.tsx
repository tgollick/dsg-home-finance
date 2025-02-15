import NavBar from "@/components/NavBar";
import React from "react";
import Hero from "./_sections/Hero";
import PopularProducts from "./_sections/PopularProducts";

// type Props = {}

const Mortgages = () => {
  return (
    <main className="w-full flex flex-col items-center border-none">
      <NavBar />
      <Hero />
      <PopularProducts />
    </main>
  );
};

export default Mortgages;
