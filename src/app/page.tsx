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

export const metadata: Metadata = buildMetadata({
  title: "DSG Home Finance | Expert Mortgage & Protection Advice",
  description:
    "Independent mortgage broker helping you find the best deals. 5-star rated, 20+ years experience, whole-of-market access.",
  image: `${process.env.NEXT_PUBLIC_SITE_URL}/og-home.jpg`,
});

export default async function Home() {
  return (
    <main className="w-full flex flex-col items-center border-none">
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
