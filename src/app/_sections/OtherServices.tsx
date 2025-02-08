"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import FirstTimeBuyer from "../../../public/FirstTimeBuyer.jpg";
import Remortgage from "../../../public/Remortgage.jpg";
import BuyToLet from "../../../public/BuyToLet.jpg";
import {
  LucideCalendar,
  LucideCoins,
  LucideHeart,
  HomeIcon as LucideHouse,
  LucidePhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";

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
    <div className="w-full bg-white text-black font-sans">
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 py-14">
        <div className="flex flex-col lg:flex-row lg:gap-10 lg:items-center">
          <div className="lg:w-1/2 space-y-8 mb-8 lg:mb-0">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-4">
                Other Services
              </h2>
              <p className="text-sm sm:text-base font-sans mb-2">
                David partners with trusted, FCA-regulated experts to support
                your wider financial needs — from equity release and retirement
                planning to wills and investments.
              </p>
              <p className="text-sm sm:text-base font-sans">
                Every referral complements your mortgage and protection journey,
                with no-pressure advice to keep your goals on track.
              </p>
            </div>

            <div className="text-sm sm:text-base lg:text-lg font-sans font-bold flex flex-col gap-4">
              <p className="flex items-center gap-2">
                <LucideHeart className="w-5 h-5" fill="#f281a4" /> Equity
                Release
              </p>
              <p className="flex items-center gap-2">
                <LucideCalendar className="w-5 h-5" fill="#f281a4" /> Retirement
                & Pension Planning
              </p>
              <p className="flex items-center gap-2">
                <LucideHouse className="w-5 h-5" fill="#f281a4" /> Will &
                Estates Planning
              </p>
              <p className="flex items-center gap-2">
                <LucideCoins className="w-5 h-5" fill="#f281a4" /> Family Income
                Benefit
              </p>
            </div>

            <Button className="w-full sm:w-auto bg-[#F49FB7] text-black hover:bg-[#f281a4] transition text-sm md:text-base hidden lg:flex lg:items-center lg:gap-0">
              Book a call with David
              <LucidePhoneCall className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="lg:w-1/2">
            <Carousel
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
            >
              <CarouselContent>
                {data.map((service, index) => (
                  <CarouselItem key={index}>
                    <Card className="p-4 sm:p-6 text-black bg-white border border-gray-200">
                      <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                        <Image
                          src={service.img || "/placeholder.svg"}
                          alt={service.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-serif mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base">{service.content}</p>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden sm:block">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        </div>

        <div className="block lg:hidden mt-8">
          <Button className="w-full sm:w-auto bg-[#F49FB7] text-black hover:bg-[#f281a4] transition text-sm md:text-base">
            Book a call with David
            <LucidePhoneCall className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default OtherServices;
