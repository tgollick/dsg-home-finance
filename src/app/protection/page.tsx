import { buildMetadata } from "@/lib/metadata";
import NavBar from "@/components/NavBar";
import Hero from "./_sections/Hero";
import ProtectionExplained from "./_sections/ProtectionExplained";
import ProtectionProducts from "./_sections/ProtectionProducts";
import ProtectionSteps from "./_sections/ProtectionSteps";
import CompaniesAndFAQ from "./_sections/CompaniesAndFAQ";
import CTA from "../mortgages/_sections/CTA";
import { Footer } from "../_sections/components/Footer";
import { Metadata } from "next";

export const metadata:Metadata = buildMetadata({
  title: "Protection Insurance | DSG Home Finance",
  description:
    "Life cover, critical illness, income protection – safeguard your family with the right policy.",
  image: `${process.env.NEXT_PUBLIC_SITE_URL}/og-protection.jpg`,
});

export default function Protection() {
  return (
    <main className="w-full flex flex-col items-center border-none">
      <NavBar />
      <Hero />
      <ProtectionExplained />
      <ProtectionProducts />
      <ProtectionSteps />
      <CompaniesAndFAQ />
      <CTA />
      <Footer />
    </main>
  );
}

