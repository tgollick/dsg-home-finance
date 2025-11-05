// src/app/contact/page.tsx
import { buildMetadata } from "@/lib/metadata";
import NavBar from "@/components/NavBar";
import ContactSection from "./_section/ContactSection";
import { Footer } from "../_sections/components/Footer";
import { Metadata } from "next";

export const metadata:Metadata = buildMetadata({
  title: "Contact Us | DSG Home Finance",
  description:
    "Book a free consultation, ask a question, or request a call-back. We’re here to help.",
  image: `${process.env.NEXT_PUBLIC_SITE_URL}/og-contact.jpg`,
});

export default function Contact() {
  return (
    <main className="w-full h-full">
      <NavBar />
      <ContactSection />
      <Footer />
    </main>
  );
};

