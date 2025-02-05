import { Card } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = {
  title: string;
  img: StaticImageData;
  content: string;
  alt: string;
};

const Product = (props: Props) => {
  return (
    <Card className="p-6 bg-white text-black border-gray-200 hover:scale-105 hover:shadow-lg  transition ease-in-out duration-200 md:w-[60%] w-full">
      <Image
        src={props.img}
        width="1000"
        height="1000"
        alt={props.alt}
        className="aspect-auto w-full mb-4 rounded-sm sm:block hidden"
      />
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif leading-tight mb-2">
        {props.title}
      </h3>
      <p className="md:text-base text-sm font-sans">{props.content}</p>
    </Card>
  );
};

export default Product;
