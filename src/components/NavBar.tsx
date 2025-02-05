"use client";

import { LucideMenu, LucidePhoneCall } from "lucide-react";
import Image from "next/image";
import React from "react";
import DSGLogoWhite from "../../public/DSGGreyLogo.png";
import { motion } from "motion/react";
import { Button } from "./ui/button";

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  hover: { opacity: 0.8 },
  tap: { scale: 0.95 },
};

const NavBar = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <header className="w-full max-w-[1400px] mx-auto flex items-center justify-between font-sans text-white absolute z-[50] top-0 px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={DSGLogoWhite}
            alt="White DSG Logo"
            className="w-24 sm:w-28"
            priority
          />
        </motion.div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center md:gap-16 gap-4 overflow-hidden">
          {[
            "Home",
            "Mortgages",
            "Protection",
            "Privacy Policy",
            "About Us",
            <Button
              key={6}
              className="w-full md:w-auto bg-[#F49FB7] text-black hover:bg-[#f281a4] transition text-sm md:text-base"
            >
              Book a call
              <LucidePhoneCall />
            </Button>,
          ].map((item, index) => (
            <motion.a
              key={index}
              href=""
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        {/* Mobile Menu Icon */}
        <motion.div
          className="lg:hidden w-8 h-8 cursor-pointer"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LucideMenu />
        </motion.div>
      </header>
    </div>
  );
};

export default NavBar;
