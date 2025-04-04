"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import equityReleaseImage from "../../../public/elderly-lady.avif";
import debtConsolidationImage from "../../../public/writing-pen.avif";
import bridgingFinanceImage from "../../../public/bridge.avif";
import commercialMortgageImage from "../../../public/commercial-building.avif";
import {
  LucideCalendar,
  LucideCoins,
  LucideHeart,
  HomeIcon as LucideHouse,
} from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";
import CTAButton from "@/components/CTAButton";

const data = [
  {
    title: "Equity Release",
    content:
      "Unlock the value of your home with a flexible equity release plan tailored to your needs.",
    img: equityReleaseImage,
    alt: "Equity release illustration",
  },
  {
    title: "Debt Consolidation",
    content:
      "Simplify your finances by consolidating multiple debts into one manageable loan.",
    img: debtConsolidationImage,
    alt: "Debt consolidation illustration",
  },
  {
    title: "Bridging Finance",
    content:
      "Access short-term financing solutions to bridge the gap between property transactions.",
    img: bridgingFinanceImage,
    alt: "Bridging finance illustration",
  },
  {
    title: "Commercial Mortgages",
    content:
      "Finance your business property with flexible commercial mortgage solutions.",
    img: commercialMortgageImage,
    alt: "Commercial mortgages illustration",
  },
];

const OtherServices = () => {
  return (
    <div className="w-full bg-white text-black font-sans">
      <section className="max-w-[1400px] mx-auto px-6 sm:px-6 py-14">
        <div className="flex flex-col lg:flex-row lg:gap-10 lg:items-center">
          <div className="lg:w-[60%] space-y-8 mb-8 lg:mb-0">
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

            <div className="text-sm sm:text-base font-sans font-bold flex flex-col gap-4">
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
                <LucideCoins className="w-5 h-5" fill="#f281a4" /> Second Charge
                Mortgages
              </p>
              <p className="text-gray-400">
                With many more products available on referal...
              </p>
            </div>

            <div className="hidden lg:flex lg:items-center">
              <CTAButton
                route={"/contact"}
                text={"Book a Chat"}
                icon={<LucideCalendar />}
                textColor={"text-white"}
                bgColor={"bg-[#F49FB7]"}
                hoverColor={"hover:bg-[#f582a2]"}
              />
            </div>
          </div>

          <div className="lg:w-[40%] md:px-10">
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
                    <Card className="border-gray-200 overflow-hidden transition-shadow hover:shadow-md text-black bg-white">
                      <div className="flex flex-col">
                        <div className="relative w-full h-48 lg:h-72 shrink-0">
                          <Image
                            src={service.img || "/placeholder.svg"}
                            alt={service.alt}
                            className="object-cover w-full h-full"
                            fill
                          />
                        </div>
                        <div className="flex flex-col justify-between p-6">
                          <div className="space-y-2">
                            <h3 className="text-2xl sm:text-3xl font-serif leading-tight">
                              {service.title}
                            </h3>
                            <p className="text-sm sm:text-base text-muted-foreground font-sans line-clamp-3">
                              {service.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden sm:block  text-black">
                <CarouselPrevious className="bg-white" />
                <CarouselNext className="bg-white" />
              </div>
            </Carousel>
          </div>
        </div>

        <div className="block lg:hidden mt-8 w-full">
          <CTAButton
            route={"/contact"}
            text={"Book a Chat"}
            icon={<LucideCalendar />}
            textColor={"text-white w-full"}
            bgColor={"bg-[#F49FB7]"}
            hoverColor={"hover:bg-[#f582a2]"}
          />
        </div>
      </section>
    </div>
  );
};

export default OtherServices;
