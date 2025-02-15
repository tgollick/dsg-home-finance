import React from "react";
import { Card } from "@/components/ui/card";

type Props = {
  value: string;
  title: string;
};

const StatBox = (props: Props) => {
  return (
    <Card className="flex flex-col items-center gap-4 bg-gray-100 text-black p-4 w-full lg:max-w-[200px]">
      <h3 className="text-5xl sm:text-6xl md:text-7xl font-serif">
        {props.value}
      </h3>
      <p className="text-sm lg:text-base font-sans">{props.title}</p>
    </Card>
  );
};

export default StatBox;
