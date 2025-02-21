"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";

export default function CTA() {
  return (
    <div className="w-full relative">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#F49FB7]/10 to-[#1e1e1e]/60"></div>
      <section
        className="min-h-[400px] sm:min-h-[500px] flex items-center justify-center px-4 py-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1464082354059-27db6ce50048?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-4xl mx-auto text-center px-4"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4 text-white">
            Find Your Dream Home Today
          </h2>

          <p className="text-base sm:text-lg text-gray-200 mb-8 max-w-2xl mx-auto font-sans">
            Start your journey to homeownership with our simple mortgage process
          </p>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <button
              className="group relative inline-flex items-center justify-center bg-white font-sans hover:bg-gray-50 
                     text-gray-900 rounded-md px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg 
                     font-semibold transition-all duration-200 ease-in-out
                     shadow-[0_0_0_3px_rgba(255,255,255,0.1)] hover:shadow-[0_0_0_3px_rgba(255,255,255,0.2)]"
              onClick={() => redirect("/contact")}
            >
              Start your Mortgage Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto">
            {["Personalized Rates", "Expert Guidance", "Quick Approval"].map(
              (feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm md:text-base font-sans"
                >
                  {feature}
                </div>
              )
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
