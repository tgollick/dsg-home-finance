import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LucideMoveRight } from "lucide-react";
import React from "react";

const steps = [
  {
    number: 1,
    title: "Assess Your Risks",
    description:
      "What keeps you up at night? Job stability, health, or family security?",
  },
  {
    number: 2,
    title: "Match to Products",
    description:
      "We'll pair your needs with the right mix of cover &ndash; no jargon, just clarity.",
  },
  {
    number: 3,
    title: "Tailor the Details",
    description: "Adjust coverage amounts and terms to fit your budget.",
  },
];

const ProtectionSteps = () => {
  return (
    <div className="bg-white w-full h-full">
      <section className="w-full h-fit max-w-[1400px] pt-14 pb-20 px-6 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 mx-auto">
        <div className="text-black w-full h-fit">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4">
            How to Choose the Right Protection
          </h2>
          <p className="text-sm sm:text-base font-sans mb-4">
            Your protection plan starts with understanding what matters most.
            Think about your biggest financial responsibilities: your mortgage
            repayments, supporting your family, or covering medical costs if
            you&apos;re unable to work.
          </p>
          <p className="text-sm sm:text-base font-sans font-bold mb-1">
            Ask yourself:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4 text-sm sm:text-base font-sans">
            <li>What would happen if my income stopped suddenly?</li>
            <li>
              How would my family cope if I couldn&apos;t pay the mortgage?
            </li>
            <li>Do I have savings to fall back on?</li>
          </ul>

          <p className="text-sm sm:text-base font-sans mb-8">
            This isn&apos;t about dwelling on the worst-case scenario &mdash;
            it&apos;s about building a safety net so you can live with
            confidence. David will help you pinpoint risks you might not have
            considered.
          </p>

          <Button className="w-full md:w-auto bg-[#F49FB7] text-white hover:bg-[#f281a4] transition text-sm md:text-base font-sans">
            Starting Your Protection Plan
            <LucideMoveRight />
          </Button>
        </div>

        <div className="w-full flex flex-col gap-6">
          {steps.map((step) => (
            <Card
              key={step.title}
              className="p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl lg:text-4xl font-serif text-white w-12 h-12 flex items-center justify-center bg-[#F49FB7] aspect-square rounded-full">
                    {step.number}
                  </span>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-black">
                    {step.title}
                  </h3>
                </div>
                <div className="flex-grow">
                  <p className="text-sm sm:text-base font-sans text-black">
                    {step.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProtectionSteps;
