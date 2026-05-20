import { buildMetadata } from "@/lib/metadata";
import Hero from "./_sections/Hero";
import { TimelineSection } from "./_sections/TimelineSection";
import NavBar from "@/components/NavBar";
import CTA from "../mortgages/_sections/CTA";
import { Footer } from "../_sections/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "About David Gollick | Mortgage Broker in Margate | DSG Home Finance",
  description:
    "Meet David Gollick, founder of DSG Home Finance. 20+ years arranging mortgages and protection for families across Margate, Broadstairs and Ramsgate. FCA-regulated, 5★ rated independent advice.",
  image: "/og-about.jpg",
  path: "/about",
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

