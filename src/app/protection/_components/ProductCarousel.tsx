"use client";

import {
  ArrowRight,
  DollarSign,
  Home,
  LucideAlertTriangle,
  LucideHeart,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

const products = [
  {
    title: "Life Insurance",
    icon: <LucideHeart size={30} fill={"#F49FB7"} strokeWidth={0} />,
    description:
      "Pays out a lump sum if you pass away during your mortgage term.",
    forWho: "Essential if you have dependents relying on your income.",
    cost: "£28 per month",
  },
  {
    title: "Critical Illness Cover",
    icon: <LucideAlertTriangle size={30} fill={"#F49FB7"} strokeWidth={0} />,
    description:
      "Provides a tax-free lump sum if diagnosed with a qualifying critical illness, helping cover medical expenses and lifestyle adjustments.",
    forWho:
      "Recommended for those with a family history of serious illnesses who want extra financial security.",
    cost: "£30 per month",
  },
  {
    title: "Income Protection",
    icon: <DollarSign size={30} fill={"#F49FB7"} strokeWidth={0} />,
    description:
      "Replaces a portion of your income if you're unable to work due to illness or injury.",
    forWho:
      "Ideal for individuals who rely on their monthly earnings to meet day-to-day expenses.",
    cost: "£25 per month",
  },
  {
    title: "Mortgage Insurance",
    icon: <Home size={30} fill={"#F49FB7"} strokeWidth={0} />,
    description:
      "Ensures your mortgage repayments are covered in the event of unexpected job loss or health issues.",
    forWho:
      "Great for homeowners looking to safeguard their property investments amidst unforeseen circumstances.",
    cost: "£32 per month",
  },
];

const ProductCarousel = () => {
  return (
    <div className="p-0 lg:px-10">
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
          {products.map((product, index) => (
            <CarouselItem key={index}>
              <Card className="border-gray-200 overflow-hidden transition-shadow hover:shadow-md text-black bg-white space-y-4 font-sans flex flex-col items-end w-full">
                <CardContent className="w-full p-4 space-y-4">
                  <div className="flex h-full items-center gap-2 w-full">
                    {product.icon}
                    <h3 className="text-2xl lg:text-3xl font-serif w-full">
                      {product.title}
                    </h3>
                  </div>

                  <div className="space-y-2 text-sm lg:text-base">
                    <div>
                      <span className="font-semibold">What is it: </span>
                      {product.description}
                    </div>
                    <div>
                      <span className="font-semibold">Who its for: </span>
                      {product.forWho}
                    </div>
                  </div>

                  <div className="w-full flex flex-col lg:flex-row gap-2 items-center justify-between text-sm lg:text-base">
                    <div className="w-full">
                      <span className="font-semibold text-sm lg:text-base">
                        Average Cost:{" "}
                      </span>
                      {product.cost}
                    </div>
                    <Button
                      variant="default"
                      className="bg-black text-[#F49FB7] hover:bg-gray-800 w-full lg:w-auto"
                    >
                      Find out more
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden lg:block  text-black">
          <CarouselPrevious className="bg-white" />
          <CarouselNext className="bg-white" />
        </div>
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
