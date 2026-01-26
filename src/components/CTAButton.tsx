"use client";

import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {
  route: string;
  icon: ReactNode;
  bgColor: string;
  textColor: string;
  text: string;
  hoverColor: string | null;
};

const CTAButton = (props: Props) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push(props.route)}
      className={`${props.bgColor} ${props.textColor} ${props.hoverColor} text-sm md:text-base w-full md:w-fit font-sans`}
    >
      {props.text}
      {props.icon}
    </Button>
  );
};

export default CTAButton;
