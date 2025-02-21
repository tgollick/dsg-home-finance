"use client";

import type React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface Milestone {
  year: number;
  title: string;
  description: string;
  image: string;
}

const milestones: Milestone[] = [
  {
    year: 2010,
    title: "Company Founded",
    description:
      "Our journey began with a vision to provide comprehensive financial protection for families and businesses. Starting with just a small team of dedicated professionals, we set out to revolutionize how people think about financial security.",
    image:
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    year: 2015,
    title: "Expanding Our Protection Solutions",
    description:
      "As our client base grew, so did our understanding of diverse protection needs. We introduced new products and services, ensuring every client could find the right coverage for their unique situation.",
    image:
      "https://images.unsplash.com/photo-1610703415552-d7fca41a8857?q=80&w=2531&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    year: 2018,
    title: "Digital Transformation",
    description:
      "Embracing technology to better serve our clients, we launched our digital platform. This innovation made it easier than ever for clients to understand, choose, and manage their protection products.",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    year: 2020,
    title: "Award-Winning Service",
    description:
      "Our commitment to excellence was recognized with multiple industry awards. But more importantly, we reached a milestone of helping thousands of families secure their financial future.",
    image:
      "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    year: 2023,
    title: "Looking to the Future",
    description:
      "Today, we continue to innovate and expand our protection solutions. Our focus remains unchanged: ensuring every client has the right protection for what matters most in their lives.",
    image:
      "https://images.unsplash.com/photo-1495539406979-bf61750d38ad?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
            families yearly. But at our core, we're still that same homegrown
            business — driven by David's belief that honest advice and human
            connection always come first. Explore the milestones that shaped us,
            and see how our journey mirrors yours: always forward, always
            focused on what matters most.
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
