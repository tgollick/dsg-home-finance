"use client";

import type React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { StaticImageData } from "next/image";
import beginningPhoto from "../../../../public/beginning-of-business.png"
import shopfrontPhoto from "../../../../public/opening-shopfront.png"
import digitalPhoto from "../../../../public/going-digital.png"
import stonebridgePhoto from "../../../../public/stonebridge.jpg"

interface Milestone {
  year: number;
  title: string;
  description: string;
  image: StaticImageData;
}

const milestones: Milestone[] = [
  {
    year: 2003,
    title: "Company Founded",
    description:
      "Our journey began with a vision to provide comprehensive financial protection for families and businesses. Starting from my own home, just me and my wife with the dream of providing flexible mortgages so people can purchase their dream homes.",
    image: beginningPhoto,
  },
  {
    year: 2007,
    title: "Opening Shopfront",
    description:
      "As our client base grew, so did our understanding of diverse protection needs. We introduced new products and services, ensuring every client could find the right coverage for their unique situation as well as opening our first shopfront in collaboration with Thomas Jackson.",
    image: shopfrontPhoto,
  },
  {
    year: 2017,
    title: "Digital Transformation",
    description:
      "Embracing technology to better serve our clients, DSG moved to a more digital approach, allowing greater flexibility for clients whilst still providing an excellent service.",
    image: digitalPhoto,
  },
  {
    year: 2025,
    title: "Partnership with Stonebridge",
    description:
      "A new alliance emerged, a new parternship with Stonebridge! This allows DSG to provide a whole of market approach to mortgages with a wide range of products and lenders to chose from.",
    image: stonebridgePhoto,
  },
];

export const TimelineSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-8 text-black">
            From Humble Beginnings to Your{" "}
            <span className="border-b-4 border-[#E5A1B7]">Trusted Partner</span>
          </h2>
          <p className="text-sm sm:text-base font-sans mb-4 max-w-3xl mx-auto text-black">
            What started in 2003 as a one-man mission to simplify mortgages has
            grown into a thriving, FCA-regulated team supporting hundreds of
            families yearly. But at our core, we&apos;re still that same
            homegrown business — driven by David&apos;s belief that honest
            advice and human connection always come first. Explore the
            milestones that shaped us, and see how our journey mirrors yours:
            always forward, always focused on what matters most.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line - hidden on mobile, shown from medium screens up */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#E5A1B7]/20 hidden md:block" />

          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              className="mb-8 sm:mb-12 lg:mb-16 last:mb-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div
                className={`flex flex-col md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse" : ""} items-center`}
              >
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <div
                    className={`relative ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}
                  >
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 font-sans">
                      <CardContent className="p-4 sm:p-6">
                        <div className="inline-flex px-3 py-1 sm:px-4 sm:py-2 bg-[#E5A1B7] text-white rounded-full text-sm sm:text-base font-medium mb-3 sm:mb-4">
                          {milestone.year}
                        </div>
                        <h3 className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-gray-900 font-serif">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                    {/* Timeline dot - hidden on mobile, shown from medium screens up */}
                    <div
                      className={`
                        hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 
                        bg-[#E5A1B7] rounded-full z-10
                        ${index % 2 === 0 ? "right-[-0.5rem]" : "left-[-0.5rem]"}
                      `}
                    />
                  </div>
                </div>
                <div
                  className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-8" : "md:pr-8"}`}
                >
                  <div className="aspect-[16/10] sm:aspect-[4/3] relative rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={milestone.image || "/placeholder.svg"}
                      alt={milestone.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
