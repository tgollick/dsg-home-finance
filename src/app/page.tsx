// src/app/page.tsx
import { buildMetadata } from "@/lib/metadata";
import NavBar from "@/components/NavBar";
import Hero from "./_sections/Hero";
import Products from "./_sections/Products";
import Testimonials from "./_sections/Testimonials";
import PopularProducts from "./_sections/PopularProducts";
import OtherServices from "./_sections/OtherServices";
import { BlogSection } from "./_sections/Blogs";
import { Footer } from "./_sections/components/Footer";
import CTA from "./mortgages/_sections/CTA";
import { Metadata } from "next";
import { MortgageBrokerSchema } from "@/components/StructuredData";

export const metadata: Metadata = buildMetadata({
  title: "Mortgage Broker in Margate, Kent | DSG Home Finance",
  description:
    "Independent mortgage broker in Margate covering Thanet, Broadstairs and Ramsgate. Whole-of-market access to 50+ lenders, 20+ years' experience, 5★ rated. Book a free chat with David.",
  image: "/og-home.jpg",
  path: "/",
});

export default async function Home() {
  return (
    <main className="w-full flex flex-col items-center border-none">
      <MortgageBrokerSchema />
      <NavBar />
      <Hero />
      <Products />
      <Testimonials />
      <PopularProducts />
      <OtherServices />
      <BlogSection />
      <CTA />
      <Footer />
    </main>
  );
}
