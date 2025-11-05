import { buildMetadata } from "@/lib/metadata";
import Hero from "./_sections/Hero";
import { TimelineSection } from "./_sections/TimelineSection";
import NavBar from "@/components/NavBar";
import CTA from "../mortgages/_sections/CTA";
import { Footer } from "../_sections/components/Footer";
import { Metadata } from "next";

export const metadata:Metadata = buildMetadata({
  title: "About David Gollick | DSG Home Finance",
  description:
    "20+ years of mortgage & protection expertise. Independent, client-first advice you can trust.",
  image: `${process.env.NEXT_PUBLIC_SITE_URL}/og-about.jpg`,
});

export default function About() {
  return (
    <main>
      <NavBar />
      <Hero />
      <TimelineSection />
      <CTA />
      <Footer />
    </main>
  );
};

