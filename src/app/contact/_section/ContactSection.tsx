import React from "react";
import Hero from "./Hero";
import BottomContact from "./BottomContact";

type Props = {};

const ContactSection = (props: Props) => {
  return (
    <section>
      <Hero />
      <BottomContact />
    </section>
  );
};

export default ContactSection;
