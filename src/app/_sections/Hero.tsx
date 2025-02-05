"use client";

import { Button } from "@/components/ui/button";
import { LucidePhoneCall, LucideShieldQuestion } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

const Hero = () => {
  return (
    <div className="w-full h-fit relative bg-[#1e1e1e] bg-[url('/MargateHeroBG.png')] bg-cover bg-bottom flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-t from-[#F49FB7]/25 to-[#404040]/25"></div>
      <section className="relative w-full max-w-[1400px] h-full flex items-center justify-center px-6">
        {/* Content Container with max-width for larger screens */}
        <div className="w-full mx-auto relative lg:py-70 md:py-60 py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center md:items-start gap-8 md:gap-10 text-white text-center md:text-left max-w-2xl"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif leading-tight max-w-xl">
              Mortgage Advice <span className="italic">you</span> can trust
            </h1>
            <p className="text-sm sm:text-base font-sans">
              With years of experience, DSG Home Finance specializes in finding
              the right products to suit your unique needs. No matter your
              circumstances, Dave is committed to pairing you with tailored
              solutions that keep you confident, happy, and protected.
            </p>
            <div className="font-sans flex md:flex-row flex-col items-center gap-3 w-full">
              <Button className="w-full md:w-auto text-black bg-white hover:bg-gray-200 transition text-sm md:text-base">
                How much can I borrow?
                <LucideShieldQuestion />
              </Button>
              <Button className="w-full md:w-auto bg-[#F49FB7] text-black hover:bg-[#f281a4] transition text-sm md:text-base">
                Book a call with David
                <LucidePhoneCall />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <div className="custom-shape-divider-bottom-1738595750">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
