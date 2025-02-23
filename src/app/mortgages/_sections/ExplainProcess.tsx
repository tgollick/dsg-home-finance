"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { LucidePlane } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Get Started",
    description:
      "Contact us to discuss your needs and goals. We'll help you understand your options and guide you on the next steps.",
  },
  {
    number: 2,
    title: "Agreement In Principle",
    description:
      "Secure a Mortgage Agreement in Principle to understand your budget and show sellers you're a serious buyer.",
  },
  {
    number: 3,
    title: "Apply for Your Mortgage",
    description:
      "Once you've found the right property, we'll help you submit a full mortgage application with the necessary documents.",
  },
  {
    number: 4,
    title: "Approval and Offer",
    description:
      "Once you've found the right property, we'll help you submit a full mortgage application with the necessary documents.",
  },
  {
    number: 5,
    title: "Completion",
    description:
      "Once you've found the right property, we'll help you submit a full mortgage application with the necessary documents.",
  },
];

const ExplainProcess = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const stepIndex = stepsRef.current.findIndex(
          (ref) => ref === entry.target
        );
        if (entry.isIntersecting) {
          setActiveStep(stepIndex);
        }
      });
    }, options);

    // Store the current value of stepsRef in a variable
    const currentStepsRef = stepsRef.current;

    currentStepsRef.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentStepsRef.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1400px] mx-auto pt-14 pb-20 px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4">
            Explaining The Process
          </h2>
          <p className="text-sm sm:text-base font-sans mb-4 max-w-3xl mx-auto">
            Understanding the mortgage process is key to a smooth journey. Our
            simple timeline walks you through each step, from initial inquiry to
            completing your dream home purchase, ensuring you&apos;re informed
            and confident every step of the way.
          </p>
        </div>

        <div className="relative w-full mx-auto">
          {/* Vertical Line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 hidden sm:block"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #F49FB7 20%, #F49FB7 80%, transparent)",
            }}
          />

          <div className="space-y-4 sm:space-y-6 relative">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => {
                  stepsRef.current[index] = el;
                }}
                className={`flex flex-col sm:flex-row gap-4 ${index % 2 === 0 ? "sm:flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex-1 flex ${
                    index % 2 === 0
                      ? "sm:justify-start sm:text-left"
                      : "sm:justify-end sm:text-right"
                  }`}
                >
                  <div
                    className={`bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 w-full relative ${
                      activeStep === index ? "scale-105" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`flex items-center font-serif justify-center w-10 h-10 rounded-full bg-[#F49FB7] text-white text-2xl font-semibold ${
                          index % 2 === 1 ? "sm:order-last" : ""
                        }`}
                      >
                        {step.number}
                      </div>
                      <h3
                        className={`text-2xl font-serif ${index % 2 === 1 ? "sm:text-right sm:flex-grow" : ""}`}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p
                      className={`text-sm md:text-base font-sans text-gray-600 ${
                        index % 2 === 1 ? "sm:text-right" : ""
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block w-0 sm:w-1/2" />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button className="w-full md:w-auto bg-[#1e1e1e] text-white hover:bg-black transition text-sm md:text-base font-sans">
            Lets Chat About Your Mortgage
            <LucidePlane />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExplainProcess;
