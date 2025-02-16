"use client";

import { LucideMenu, LucidePhoneCall, LucideX } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import DSGLogoWhite from "../../public/DSGGreyLogo.png";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { MobileNav } from "./MobileNav";
import { usePathname } from "next/navigation";

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  hover: { opacity: 0.8 },
  tap: { scale: 0.95 },
};

const NavBar = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showMobileNav && <MobileNav key="mobileNav" />}
      </AnimatePresence>
      <div
        className={`z-[1001] w-full flex items-center justify-center fixed top-0 ${hasScrolled && !showMobileNav ? "bg-[#1e1e1e]/95" : "bg-transparent"} transition-colors duration-300`}
      >
        <div />
        <header className="w-full max-w-[1400px] mx-auto flex items-center justify-between font-sans text-white px-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={DSGLogoWhite}
              alt="White DSG Logo"
              className="w-20 lg:w-24"
              priority
            />
          </motion.div>

          {/* Navigation Links for Desktop */}
          <nav className="hidden lg:flex items-center md:gap-16 gap-4 overflow-hidden">
            {[
              "Home",
              "Mortgages",
              "Protection",
              "Privacy Policy",
              "About Us",
              <Button
                key="cta"
                className="w-full md:w-auto bg-[#F49FB7] text-white hover:bg-[#f281a4] transition text-sm md:text-base"
              >
                Book a Call
                <LucidePhoneCall />
              </Button>,
            ].map((item, index) => {
              let href = "";
              let activeClass = "";
              if (typeof item === "string") {
                const hrefMapping: Record<string, string> = {
                  Home: "/",
                  Mortgages: "/mortgages",
                  Protection: "/protection",
                  "Privacy Policy": "/privacy",
                  "About Us": "/about",
                };
                href = hrefMapping[item] || "";
                // If the current pathname matches the link's href, highlight it in bold.
                if (pathname === href) {
                  activeClass =
                    " font-bold text-[#F49FB7] hover:text-[#f281a4]";
                }
              }
              return (
                <motion.a
                  key={index}
                  href={href}
                  className={activeClass}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item}
                </motion.a>
              );
            })}
          </nav>

          {/* Mobile Menu Icon */}
          <motion.div
            className="lg:hidden cursor-pointer"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => {
              setShowMobileNav((prev) => !prev);
              setHasScrolled((prev) => !prev);
            }}
          >
            {showMobileNav ? <LucideX size={30} /> : <LucideMenu size={30} />}
          </motion.div>
        </header>
      </div>
    </>
  );
};

export default NavBar;
