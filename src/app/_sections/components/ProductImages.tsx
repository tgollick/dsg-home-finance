"use client";

import React from "react";
import Image from "next/image";
import HSBC from "../../../../public/HSBC.png";
import Santander from "../../../../public/Santander.png";
import Lloyds from "../../../../public/Lloyds.png";
import Halifax from "../../../../public/Halifax.png";
import Barclays from "../../../../public/Barclays.png";
import Nationwide from "../../../../public/Nationwide.png";
import Natwest from "../../../../public/Natwest.png";

const brands = [
  HSBC,
  Santander,
  Lloyds,
  Halifax,
  Barclays,
  Natwest,
  Nationwide,
];

const ProductImages = () => {
  return (
    <div className="relative w-full overflow-hidden h-fit">
      {/* Marquee container */}
      <div className="flex animate-marquee whitespace-nowrap items-center">
        {brands.concat(brands).map((src, index) => (
          <div key={index} className="mx-8 flex-shrink-0">
            <Image
              src={src}
              alt={`Brand ${index + 1}`}
              width={150}
              className="h-auto"
            />
          </div>
        ))}
      </div>

      {/* Left Fade */}
      <div
        className="pointer-events-none absolute top-0 left-0 h-full"
        style={{
          width: "100px",
          background: "linear-gradient(to right, #1e1e1e, transparent)",
        }}
      />
      {/* Right Fade */}
      <div
        className="pointer-events-none absolute top-0 right-0 h-full"
        style={{
          width: "100px",
          background: "linear-gradient(to left, #1e1e1e, transparent)",
        }}
      />

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ProductImages;
