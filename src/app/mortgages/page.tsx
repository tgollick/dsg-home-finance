import { buildMetadata } from "@/lib/metadata";
import NavBar from "@/components/NavBar";
import Hero from "./_sections/Hero";
import PopularProducts from "./_sections/PopularProducts";
import WhyDavid from "./_sections/WhyDavid";
import Reviews from "./_sections/Reviews";
import ExplainProcess from "./_sections/ExplainProcess";
import FAQ from "./_sections/FAQ";
import CTA from "./_sections/CTA";
import { Footer } from "../_sections/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Mortgage Advice in Margate & Thanet | First-Time Buyer, Remortgage, Buy-to-Let",
  description:
    "Expert mortgage advice in Margate from David Gollick. First-time buyer mortgages, remortgages, buy-to-let and equity release. Access to 10,000+ products across 50+ lenders.",
  image: "/og-mortgages.jpg",
  path: "/mortgages",
});

export default function Mortgages() {
  return (
    <main className="w-full flex flex-col items-center border-none">
      <NavBar />
      <Hero />
      <PopularProducts />
      <Reviews />
      <WhyDavid />
      <ExplainProcess />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
};

