import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import { StaticImageData } from "next/image";
import FirstTimeBuyer from "../../../public/FirstTimeBuyer.jpg";
import Remortgage from "../../../public/Remortgage.jpg";
import BuyToLet from "../../../public/BuyToLet.jpg";
import ReferalProduct from "./components/ReferalProduct";
import {
  LucideCalendar,
  LucideCoins,
  LucideHeart,
  LucideHouse,
  LucidePhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const data = [
  {
    title: "Equity Release",
    content:
      "Unlock the value of your home with a flexible equity release plan tailored to your needs.",
    img: Remortgage,
    alt: "Equity release illustration",
  },
  {
    title: "Debt Consolidation",
    content:
      "Simplify your finances by consolidating multiple debts into one manageable loan.",
    img: BuyToLet,
    alt: "Debt consolidation illustration",
  },
  {
    title: "Protection Insurance",
    content:
      "Secure your family's future with comprehensive life, critical illness, and income protection insurance.",
    img: FirstTimeBuyer,
    alt: "Protection insurance illustration",
  },
  {
    title: "Commercial Mortgages",
    content:
      "Finance your business property with flexible commercial mortgage solutions.",
    img: BuyToLet,
    alt: "Commercial mortgages illustration",
  },
];

type Service = {
  title: string;
  content: string;
  img: StaticImageData;
  alt: string;
};

const OtherServices = () => {
  return (
    <div className="w-full bg-white text-black font-sans flex items-center justify-center min-h-fit">
      <section className="w-full h-full max-w-[1400px] px-6 py-14 flex items-center justify-between">
        <div className="w-full flex flex-col  gap-10 lg:text-left text-center lg:items-start items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight mb-4 w-full">
              Other Services
            </h2>
            <p className="text-sm sm:text-base font-sans mb-2">
              David partners with trusted, FCA-regulated experts to support your
              wider financial needs — from equity release and retirement
              planning to wills and investments.
            </p>
            <p className="text-sm sm:text-base font-sans">
              Every referral complements your mortgage and protection journey,
              with no-pressure advice to keep your goals on track.
            </p>
          </div>

          <div className="text-base lg:text-lg font-sans font-bold flex flex-col gap-4">
            <p className="flex items-center gap-2">
              <LucideHeart fill={"#f281a4"} /> Equity Release
            </p>
            <p className="flex items-center gap-2">
              <LucideCalendar fill={"#f281a4"} /> Retirement & Pension Planning
            </p>
            <p className="flex items-center gap-2">
              <LucideHouse fill={"#f281a4"} /> Will & Estates Planning
            </p>
            <p className="flex items-center gap-2">
              <LucideCoins fill={"#f281a4"} /> Family Income Benefit
            </p>
          </div>

          <Button className="w-full md:w-auto bg-[#F49FB7] text-black hover:bg-[#f281a4] transition text-sm md:text-base">
            Book a call with David
            <LucidePhoneCall />
          </Button>
        </div>

        <div className="pl-20 h-full lg:block hidden">
          <div className="max-w-[550px]">
            <Carousel className="w-full">
              <CarouselContent className="w-full">
                {data.map((service: Service, index: number) => (
                  <CarouselItem key={index} className="w-full">
                    <ReferalProduct {...service} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-white" />
              <CarouselNext className="bg-white" />
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OtherServices;
