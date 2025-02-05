import { LucideStar } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Card } from "@/components/ui/card";

type Props = {
  name: string;
  review_text: string;
  profile_photo: string;
  rating: number;
  date: string;
};

const Review = (props: Props) => {
  return (
    <Card className="flex flex-col gap-4 p-6 font-sans lg:w-full h-fit md:w-[80%] w-full hover:scale-105 hover:cursor-pointer transition ease-in-out duration-200 hover:shadow-xl bg-white text-black border-gray-100">
      <p className="md:text-left text-center md:text-base text-sm italic">
        {props.review_text}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Image
            src={props.profile_photo}
            alt="Profile Photo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <span className="block text-sm sm:text-base font-semibold">
              {props.name}
            </span>
            <span className="block text-xs sm:text-sm text-gray-400">
              {props.date}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-1 mt-2 sm:mt-0">
          {Array.from({ length: props.rating }, (_, i) => (
            <LucideStar
              key={i}
              className="h-10 w-10 text-yellow-400"
              fill={"rgb(250 204 21)"}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Review;
