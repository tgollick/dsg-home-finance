import { Button } from "@/components/ui/button";
import {
  LucideCalendar,
  LucideCoins,
  LucideHeart,
  LucideHouse,
  LucidePackageSearch,
} from "lucide-react";
import React from "react";

const ProtectionExplained = () => {
  return (
    <div className="bg-white w-full h-full">
      <section className="w-full max-w-[1400px] pb-14 pt-56 sm:pt-48 md:pt-42 lg:pt-36 xl:pt-32 px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-10 mx-auto">
        <div className="text-black w-full">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4">
            What Are Protection Products?
          </h2>
          <p className="text-sm sm:text-base font-sans mb-4">
            Protection can be confusing. We want to make sure you have full
            understanding of all products offered to you whilst working with DSG
            Home Finance.
          </p>
          <p className="text-sm sm:text-base font-sans mb-8">
            Check out this short video which breaks down the need for protection
            and explains some of the product we offer such as:
          </p>
          <div className="text-sm sm:text-base font-sans font-bold flex flex-col gap-4 mb-8">
            <p className="flex items-center gap-2">
              <LucideHeart className="w-5 h-5" fill="#F49FB7" /> Family Income
              Benefit
            </p>
            <p className="flex items-center gap-2">
              <LucideCalendar className="w-5 h-5" fill="#F49FB7" /> Life
              Insurance
            </p>
            <p className="flex items-center gap-2">
              <LucideHouse className="w-5 h-5" fill="#F49FB7" /> Critical
              Illness Cover
            </p>
            <p className="flex items-center gap-2">
              <LucideCoins className="w-5 h-5" fill="#F49FB7" /> Income
              Protection
            </p>
            <p className="text-gray-400">
              With many other products to suit your situation...
            </p>
          </div>
          <Button className="w-full md:w-auto bg-[#F49FB7] text-white hover:bg-[#f281a4] transition text-sm md:text-base font-sans">
            Find Your Perfect Protection Solution
            <LucidePackageSearch />
          </Button>
        </div>

        <video
          className="mb-6 lg:mb-0 w-full aspect-video rounded-lg"
          controls
          muted
          autoPlay
          loop
          playsInline
          poster="/images/video-poster.jpg"
        >
          <source src="/protection-explained-hsbc.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
    </div>
  );
};

export default ProtectionExplained;
