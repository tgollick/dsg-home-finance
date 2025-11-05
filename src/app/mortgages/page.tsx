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

export const metadata:Metadata = buildMetadata({
  title: "Mortgages | DSG Home Finance",
  description:
    "First-time buyer, remortgage, buy-to-let or equity release – get a personalised quote in minutes.",
  image: `${process.env.NEXT_PUBLIC_SITE_URL}/og-mortgages.jpg`,
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

