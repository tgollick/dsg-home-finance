import { Button } from "@/components/ui/button";
import React from "react";
import { LucideShieldQuestion } from "lucide-react";
import { LogoCarousel } from "@/components/ui/logo-carousel";

const Products = () => {
  return (
    <div className="w-full flex items-center justify-center bg-[#1e1e1e] border-none mt-[-1px]">
      <section className="w-full max-w-[1400px] py-20 px-6 flex flex-col items-center text-center md:gap-10 gap-8">
        <div className="w-full max-w-[800px] text-white">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight mb-6">
            With over 10,000+ Products Available
          </h2>
          <p className="text-sm sm:text-base font-sans">
            Here at DSG Home Finance, we are whole-of-market Mortgage Advisors.
            We do the mortgage comparisons and find a good deal for you. With
            access to over 50 lenders and thousands of products, you can be
            confident you are getting the right deal for you.
          </p>
        </div>
        <div className="hidden sm:block">
          <LogoCarousel columns={3} />
        </div>
        <div className="block sm:hidden">
          <LogoCarousel columns={2} />
        </div>
        {/* New component to show off products  */}
        <Button className="w-full md:w-auto text-black bg-white hover:bg-gray-200 transition text-sm md:text-base font-sans">
          How much can I borrow?
          <LucideShieldQuestion />
        </Button>{" "}
      </section>
    </div>
  );
};

export default Products;
