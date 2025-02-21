import React from "react";
import Hero from "./Hero";
import BottomContact from "./BottomContact";
import { ContactForm } from "../_components/ContactForm";

type Props = {};

const ContactSection = (props: Props) => {
  return (
    <section className="relative">
      <ContactForm />
      <Hero />
      <BottomContact />
    </section>
  );
};

export default ContactSection;
